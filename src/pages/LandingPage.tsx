import { motion } from 'framer-motion';
import {
  ArrowRight, Heart, Users, Stethoscope, Calendar,
  Home, Building2, HandHeart, Shield, Award, CheckCircle2,
  HeartHandshake, UserPlus, Activity, Sparkles,
  ExternalLink, Bus, Soup, DollarSign,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import volunteerCampImg from '@/assets/volunteer-medical-camp.jpg';
import Khamsuckhoevungcao from '@/assets/Khamsuckhoevungcao.png';
import charityDistImg from '@/assets/Khamvatangqua.png';
import childrenHealthImg from '@/assets/Khammatvatangkinh.jpg';
import elderlyCarelImg from '@/assets/tangquavaphatthuoc.jpg';
import Header from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ChatBubble from './ChatbotPage';
import { useState, useEffect } from 'react';
import DonationForm from '@/components/form/DonationForm';
import { partnersAPI } from '@/lib/api';
import bachmai from '@/assets/bachmai.png';
import choray from '@/assets/choray.png';
import benhvienk from '@/assets/k.png';
import redcross from '@/assets/hoichuthapdo.jpg';
import vinguoingheo from '@/assets/quyvinguoingheo.png';
import unicef from '@/assets/unicef.jpg';
import who from '@/assets/who.png';
import mfs from '@/assets/msf.svg';
import hoiyhoc from '@/assets/hoiyhoc.jpg';
import thientam from '@/assets/thientam.png';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Partner {
  _id: string;
  name: string;
  type: string;
  category: string;
  website?: string;
  logo?: string;
  details?: {
    title?: string;
    phone?: string;
    description?: string;
    location?: string;
    schedule?: string;
    organizer?: string;
  };
  isActive: boolean;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [busPartners, setBusPartners] = useState<Partner[]>([]);
  const [foodDistributionPoints, setFoodDistributionPoints] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_SERVER = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');
  const [partnersFromDB, setPartnersFromDB] = useState<Partner[]>([]);
  const [openTestimonialForm, setOpenTestimonialForm] = useState(false);
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: '',
    age: '',
    location: '',
    treatment: '',
    content: '',
  });
  const [testimonialError, setTestimonialError] = useState<string | null>(null);

  const handleTestimonialFormSubmit = () => {
    // Kiểm tra form
    if (
      !testimonialFormData.name ||
      !testimonialFormData.age ||
      !testimonialFormData.location ||
      !testimonialFormData.treatment ||
      !testimonialFormData.content
    ) {
      setTestimonialError('Vui lòng điền đầy đủ tất cả các trường');
      return;
    }

    // Thêm đánh giá mới vào danh sách (cho mục đích demo)
    setTestimonials((prev) => [
      ...prev,
      {
        name: testimonialFormData.name,
        age: testimonialFormData.age,
        location: testimonialFormData.location,
        treatment: testimonialFormData.treatment,
        content: testimonialFormData.content,
      },
    ]);

    // Reset form và đóng dialog
    setTestimonialFormData({ name: '', age: '', location: '', treatment: '', content: '' });
    setTestimonialError(null);
    setOpenTestimonialForm(false);
  };

  const handleTestimonialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTestimonialFormData({ ...testimonialFormData, [e.target.name]: e.target.value });
    setTestimonialError(null);
  };

  const [testimonials, setTestimonials] = useState([
    {
      name: 'Bà Nguyễn Thị Hoa',
      age: '68 tuổi',
      location: 'Hà Giang',
      content: 'Tôi không thể tin được mình được khám bệnh miễn phí với đội ngũ bác sĩ tận tâm như vậy. Các con đã mang ánh sáng đến với cuộc đời tôi.',
      treatment: 'Phẫu thuật mắt đục thủy tinh thể'
    },
    {
      name: 'Em Trần Văn Minh',
      age: '12 tuổi',
      location: 'Nghệ An',
      content: 'Em rất vui vì được các bác sĩ tặng kính và giúp em nhìn rõ bảng đen hơn. Giờ em học giỏi hơn rất nhiều!',
      treatment: 'Khám mắt và tặng kính cận'
    },
    {
      name: 'Ông Lê Văn Bình',
      age: '75 tuổi',
      location: 'Quảng Trị',
      content: 'Những ngày còn lại của cuộc đời được các bạn chăm sóc, tôi cảm thấy vô cùng ấm lòng. Cảm ơn các bạn rất nhiều.',
      treatment: 'Điều trị tim mạch và tặng thuốc'
    }
  ]);

  // Lấy dữ liệu đối tác từ database
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await partnersAPI.getAll();
        const partners: Partner[] = res.data || [];

        const normalizeLogo = (p: Partner) => ({
          ...p,
          logo: p.logo ? `${API_SERVER}${p.logo}` : undefined,
        });

        // Bus
        setBusPartners(
          partners
            .filter((p) => p.type === 'transportation' && p.isActive)
            .map(normalizeLogo)
        );

        // Food
        setFoodDistributionPoints(
          partners
            .filter((p) => p.type === 'food_distribution' && p.isActive)
            .map(normalizeLogo)
        );

        // Partners (bệnh viện, tổ chức, quỹ...)
        setPartnersFromDB(
          partners
            .filter((p) => (p.type === 'hospital' || p.type === 'charity' || p.type === 'international_organization' || p.type === 'association') && p.isActive)
            .map(normalizeLogo)
        );

        setLoading(false);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'Lỗi khi tải đối tác');
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const volunteerEvents = [
    {
      title: 'Khám sức khỏe miễn phí vùng cao',
      description: 'Đoàn bác sĩ tình nguyện mang y tế đến với đồng bào vùng cao, cung cấp dịch vụ khám bệnh và tư vấn sức khỏe tận tâm.',
      location: 'Hà Giang',
      date: '15/03/2025',
      image: Khamsuckhoevungcao,
      participants: '50+ tình nguyện viên',
      beneficiaries: '500+ người dân'
    },
    {
      title: 'Tặng quà & Khám bệnh cho người già',
      description: 'Chăm sóc sức khỏe và trao yêu thương đến người cao tuổi neo đơn, mang lại niềm vui và hy vọng.',
      location: 'Quảng Trị',
      date: '20/03/2025',
      image: charityDistImg,
      participants: '30+ tình nguyện viên',
      beneficiaries: '200+ người cao tuổi'
    },
    {
      title: 'Khám mắt & Tặng kính học sinh',
      description: 'Giúp các em học sinh có cơ hội học tập tốt hơn với đôi mắt sáng và những chiếc kính phù hợp.',
      location: 'Nghệ An',
      date: '25/03/2025',
      image: childrenHealthImg,
      participants: '40+ tình nguyện viên',
      beneficiaries: '600+ học sinh'
    },
    {
      title: 'Phát quà & Thuốc cho bệnh nhân nghèo',
      description: 'Hỗ trợ thuốc men và quà tặng thiết thực cho bệnh nhân có hoàn cảnh khó khăn, lan tỏa tinh thần nhân ái.',
      location: 'TP. Hồ Chí Minh',
      date: '01/04/2025',
      image: elderlyCarelImg,
      participants: '60+ tình nguyện viên',
      beneficiaries: '300+ bệnh nhân'
    }
  ];

  const quickLinks = [
    {
      icon: Stethoscope,
      title: 'Dịch Vụ Y Tế',
      description: 'Khám chữa bệnh miễn phí với đội ngũ bác sĩ chuyên môn cao',
      path: '/services'
    },
    {
      icon: Heart,
      title: 'Chương Trình',
      description: 'Tham gia các hoạt động thiện nguyện ý nghĩa trên cả nước',
      path: '/programs'
    },
    {
      icon: Building2,
      title: 'Tổ Chức',
      description: 'Kết nối với mạng lưới tổ chức từ thiện uy tín',
      path: '/organizations'
    },
    {
      icon: HandHeart,
      title: 'Tình Nguyện Viên',
      description: 'Đăng ký trở thành tình nguyện viên, lan tỏa yêu thương',
      path: '/register'
    }
  ];

  // Testimonials data is now managed through the testimonials state

  const partners = [
    { name: 'Bệnh viện Bạch Mai', category: 'Bệnh viện', website: 'https://bachmai.gov.vn', logo: bachmai },
    { name: 'Bệnh viện Chợ Rẫy', category: 'Bệnh viện', website: 'https://bvchoray.vn/', logo: choray },
    { name: 'Bệnh viện K', category: 'Bệnh viện', website: 'https://benhvienk.vn', logo: benhvienk },
    { name: 'Hội Chữ thập đỏ VN', category: 'Tổ chức từ thiện', website: 'https://redcross.org.vn', logo: redcross },
    { name: 'Quỹ Vì người nghèo', category: 'Quỹ từ thiện', website: 'https://vinguoingheo.vn/', logo: vinguoingheo },
    { name: 'UNICEF Vietnam', category: 'Tổ chức quốc tế', website: 'https://unicef.org/vietnam', logo: unicef },
    { name: 'WHO Vietnam', category: 'Tổ chức quốc tế', website: 'https://who.int/vietnam', logo: who },
    { name: 'Bác sĩ không biên giới', category: 'Tổ chức quốc tế', website: 'https://msf.org', logo: mfs },
    { name: 'Hội Y học Việt Nam', category: 'Hiệp hội', website: 'http://tonghoiyhoc.vn/', logo: hoiyhoc },
    { name: 'Quỹ Thiện Tâm', category: 'Quỹ từ thiện', website: 'https://vingroup.net/linh-vuc-hoat-dong/thien-nguyen-br-xa-hoi/2476/quy-thien-tam', logo: thientam },
  ];

  const impactStories = [
    {
      number: '2,500+',
      title: 'Ca phẫu thuật mắt',
      description: 'Giúp người nghèo lấy lại ánh sáng và niềm tin vào cuộc sống',
      icon: CheckCircle2
    },
    {
      number: '15,000+',
      title: 'Bệnh nhân tim mạch',
      description: 'Được chăm sóc tận tâm và cấp thuốc miễn phí',
      icon: Heart
    },
    {
      number: '8,000+',
      title: 'Trẻ em khuyết tật',
      description: 'Nhận được hỗ trợ phục hồi chức năng và hòa nhập cộng đồng',
      icon: Users
    },
    {
      number: '50+',
      title: 'Tỉnh thành',
      description: 'Đã có mặt các chương trình y tế thiện nguyện',
      icon: Building2
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Đăng ký thông tin',
      description: 'Người bệnh hoặc tình nguyện viên dễ dàng đăng ký qua hệ thống trực tuyến minh bạch',
      icon: Users
    },
    {
      number: '02',
      title: 'Xác minh & Phân loại',
      description: 'Thông tin được xác thực nhanh chóng, đảm bảo hỗ trợ đúng đối tượng và nhu cầu',
      icon: CheckCircle2
    },
    {
      number: '03',
      title: 'Kết nối bác sĩ',
      description: 'Hệ thống thông minh kết nối bệnh nhân với bác sĩ và tổ chức phù hợp nhất',
      icon: Stethoscope
    },
    {
      number: '04',
      title: 'Khám & Điều trị',
      description: 'Thực hiện khám chữa bệnh miễn phí với sự tận tâm và chuyên nghiệp',
      icon: Heart
    }
  ];

  const coreValues = [
    {
      icon: HeartHandshake,
      title: 'Nhân ái',
      description: 'Mỗi hành động của chúng tôi xuất phát từ trái tim, với mong muốn mang lại hy vọng và sức khỏe cho mọi người.'
    },
    {
      icon: Shield,
      title: 'Uy tín',
      description: 'Cam kết minh bạch, chuyên nghiệp, và đáng tin cậy trong mọi hoạt động y tế thiện nguyện.'
    },
    {
      icon: Activity,
      title: 'Hiệu quả',
      description: 'Tối ưu hóa nguồn lực để hỗ trợ nhiều người nhất có thể, với chất lượng dịch vụ cao nhất.'
    },
    {
      icon: Sparkles,
      title: 'Lan tỏa',
      description: 'Khơi dậy tinh thần thiện nguyện, kết nối cộng đồng để cùng nhau tạo nên thay đổi tích cực.'
    }
  ];

  const supportRequests = [
    {
      name: 'Nguyễn Văn Hùng',
      age: '45 tuổi',
      location: 'Hà Tĩnh',
      need: 'Phẫu thuật tim mạch',
      amount: '50,000,000 VNĐ',
      description: 'Anh Hùng cần hỗ trợ chi phí phẫu thuật tim để tiếp tục làm việc nuôi gia đình.',
      progress: 60
    },
    {
      name: 'Trần Thị Lan',
      age: '62 tuổi',
      location: 'Đà Nẵng',
      need: 'Điều trị ung thư',
      amount: '80,000,000 VNĐ',
      description: 'Bà Lan cần hỗ trợ chi phí hóa trị liệu để chiến đấu với bệnh ung thư giai đoạn sớm.',
      progress: 25
    },
    {
      name: 'Lê Minh Tuấn',
      age: '8 tuổi',
      location: 'Cần Thơ',
      need: 'Phẫu thuật chỉnh hình',
      amount: '30,000,000 VNĐ',
      description: 'Bé Tuấn cần phẫu thuật để khắc phục dị tật chân, giúp em có thể đi lại bình thường.',
      progress: 80
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${volunteerCampImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm border border-white/20"
            >
              <Shield className="h-5 w-5 text-green-300" />
              <span className="text-sm font-medium">Nền tảng y tế từ thiện uy tín #1 Việt Nam</span>
            </motion.div>
            <h1 className="mb-8 text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-7xl">
              Chăm sóc sức khỏe
              <span className="block bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mt-2">
                Miễn phí cho mọi người
              </span>
            </h1>
            <p className="mb-10 text-xl text-white/90 md:text-2xl leading-relaxed max-w-4xl mx-auto">
              MedicalHope+ kết nối những trái tim nhân ái, mang dịch vụ y tế chất lượng cao đến với những người cần giúp đỡ nhất, không phân biệt hoàn cảnh.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center items-center mb-10">
              <Button
                size="lg"
                className="btn-charity text-lg px-10 py-6 h-auto rounded-full shadow-2xl hover:shadow-secondary/40 transition-all duration-300"
                onClick={() => navigate('/register')}
              >
                Tham gia ngay - Miễn phí
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="text-lg px-10 py-6 h-auto rounded-full text-white shadow-2xl hover:bg-white/30 hover:border-white"
                onClick={() => navigate('/services')}
              >
                Khám phá dịch vụ
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span className="text-sm">100% Miễn phí</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Shield className="h-5 w-5 text-blue-300" />
                <span className="text-sm">Bác sĩ chuyên môn cao</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Award className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Được cộng đồng tin cậy</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <HeartHandshake className="h-5 w-5 text-red-300" />
                <span className="text-sm">Tận tâm vì cộng đồng</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Quy trình hoạt động</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4">
              Hành trình mang sức khỏe đến bạn
            </h2>
            <p className="text-xl text-muted-foreground">
              Quy trình của chúng tôi được thiết kế đơn giản, minh bạch và hiệu quả, đảm bảo mọi người đều được tiếp cận dịch vụ y tế chất lượng.
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="healthcare-card h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <step.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
                          <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Events Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Sự kiện thiện nguyện</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4">
              Cùng nhau lan tỏa yêu thương
            </h2>
            <p className="text-xl text-muted-foreground">
              Tham gia các chương trình thiện nguyện của chúng tôi để mang sức khỏe và niềm vui đến cộng đồng.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="healthcare-card h-full overflow-hidden">
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {event.date}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.participants}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="h-4 w-4 text-primary" />
                        <span>{event.beneficiaries}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={() => navigate('/register')}
                    >
                      Tham gia ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/programs')}
            >
              Xem thêm chương trình
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Tác động của chúng tôi</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4">
              Thay đổi cuộc sống
            </h2>
            <p className="text-xl text-muted-foreground">
              Mỗi con số là một câu chuyện, một nụ cười, và một hy vọng được thắp sáng.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="healthcare-card text-center h-full">
                  <CardContent className="pt-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg">
                      <story.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="healthcare-heading text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {story.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground">{story.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Chia sẻ từ trái tim</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4">
              Câu chuyện của những người thụ hưởng
            </h2>
            <p className="text-xl text-muted-foreground">
              Nghe những lời chia sẻ chân thành từ những người đã được MedicalHope+ đồng hành.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="healthcare-card h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <p className="text-muted-foreground italic mb-4">"{testimonial.content}"</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}, {testimonial.age}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-sm text-primary">{testimonial.treatment}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* Form nhập đánh giá */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <Card className="healthcare-card">
              <CardHeader>
                <CardTitle>Chia sẻ câu chuyện của bạn</CardTitle>
                <CardDescription>
                  Hãy chia sẻ trải nghiệm của bạn với MedicalHope+. Thông tin của bạn sẽ giúp lan tỏa tinh thần nhân ái.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonialError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {testimonialError}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={testimonialFormData.name}
                      onChange={handleTestimonialInputChange}
                      placeholder="VD: Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Tuổi *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="text"
                      value={testimonialFormData.age}
                      onChange={handleTestimonialInputChange}
                      placeholder="VD: 45 tuổi"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Địa điểm *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={testimonialFormData.location}
                    onChange={handleTestimonialInputChange}
                    placeholder="VD: Hà Nội"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="treatment">Chương trình được khám miễn phí *</Label>
                  <Input
                    id="treatment"
                    name="treatment"
                    value={testimonialFormData.treatment}
                    onChange={handleTestimonialInputChange}
                    placeholder="VD: Khám tim miễn phí"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Câu chuyện của bạn *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={testimonialFormData.content}
                    onChange={handleTestimonialInputChange}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    rows={5}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setTestimonialFormData({ name: '', age: '', location: '', treatment: '', content: '' })
                    }
                  >
                    Xóa
                  </Button>
                  <Button className="btn-healthcare" onClick={handleTestimonialFormSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi câu chuyện
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Support Requests Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Kêu gọi hỗ trợ</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4">
              Yêu Cầu Hỗ Trợ Cần Ủng Hộ
            </h2>
            <p className="text-xl text-muted-foreground">
              Cùng chung tay giúp đỡ những bệnh nhân cần hỗ trợ tài chính để vượt qua khó khăn và tiếp tục điều trị.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportRequests.map((request, index) => (
              <motion.div
                key={request.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="healthcare-card h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{request.name}, {request.age}</h3>
                      <Badge variant="secondary">{request.location}</Badge>
                    </div>
                    <p className="text-sm text-primary font-semibold mb-2">{request.need}</p>
                    <p className="text-sm text-muted-foreground mb-4">{request.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Số tiền cần hỗ trợ:</span>
                        <span className="font-semibold">{request.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${request.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Đã quyên góp được: {request.progress}%
                      </p>
                    </div>
                    <Button
                      className="bg-red-500 text-white hover:bg-red-600 w-full"
                      onClick={() => setOpenForm(true)}
                    >
                      Ủng hộ ngay
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/donate')}
            >
              Xem thêm yêu cầu hỗ trợ
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bus Partners Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 border border-primary/20">
              <Bus className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Hợp tác vận chuyển</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Các nhà xe hợp tác
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Chúng tôi đã liên hệ hợp tác với các nhà xe uy tín để hỗ trợ bệnh nhân và người nhà di chuyển. Khi đặt xe, bạn sẽ được 1 vé miễn phí, chi phí còn lại sẽ được tính toán và hỗ trợ bởi MedicalHope+.
            </p>
          </motion.div>
          {loading ? (
            <div className="text-center text-muted-foreground">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : busPartners.length === 0 ? (
            <div className="text-center text-muted-foreground">Hiện chưa có đối tác vận chuyển nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {busPartners.map((partner, index) => (
                <motion.div
                  key={partner._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative p-6 bg-background rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={
                          partner.logo
                            ? (partner.logo.startsWith('http') ? partner.logo : `${API_SERVER}${partner.logo}`)
                            : '/default-logo.png'
                        }
                        alt={partner.name}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <p className="text-lg font-semibold text-primary mb-2">{partner.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      SĐT: {partner.details?.phone || 'Chưa cung cấp'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {partner.details?.description || 'Hỗ trợ vận chuyển cho bệnh nhân và người nhà.'}
                    </p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium transition-opacity duration-300"
                      >
                        Tìm hiểu thêm
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
              onClick={() => navigate('/transport')}
            >
              Xem thêm nhà xe
            </Button>
          </div>
        </div>
      </section>

      {/* Food Distribution Points Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 border border-primary/20">
              <Soup className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Hỗ trợ dinh dưỡng</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Các điểm phát đồ ăn
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Chúng tôi liên hệ với các tổ chức và mạnh thường quân chuyên nấu ăn để lên lịch phát đồ ăn miễn phí. Bệnh nhân và người nhà có thể nắm lịch trình cụ thể hàng ngày, tuần, tháng tại các địa điểm sau.
            </p>
          </motion.div>
          {loading ? (
            <div className="text-center text-muted-foreground">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : foodDistributionPoints.length === 0 ? (
            <div className="text-center text-muted-foreground">Hiện chưa có điểm phát đồ ăn nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {foodDistributionPoints.map((point, index) => (
                <motion.div
                  key={point._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative p-6 bg-background rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <Soup className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{point.details?.location || 'Chưa cung cấp địa điểm'}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Lịch: {point.details?.schedule || 'Chưa cung cấp lịch'}</p>
                    <p className="text-sm text-muted-foreground mb-2">Tổ chức: {point.details?.organizer || 'Chưa cung cấp tổ chức'}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {point.details?.description || 'Phát đồ ăn miễn phí cho bệnh nhân và người nhà.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <a
              href="/food-distribution"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Xem nhiều hơn
            </a>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 border border-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Đối tác của chúng tôi</span>
            </div>
            <h2 className="healthcare-heading text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cùng Nhau Tạo Nên Thay Đổi
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Chúng tôi tự hào hợp tác với các tổ chức y tế và từ thiện hàng đầu để mang lại dịch vụ y tế chất lượng nhất cho cộng đồng.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-muted-foreground">Đang tải dữ liệu đối tác...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : partnersFromDB.length === 0 ? (
            <div className="text-center text-muted-foreground">Hiện chưa có đối tác nào được thêm.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-8xl mx-auto">
              {partnersFromDB.map((partner, index) => (
                <motion.div
                  key={partner._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative p-6 bg-background rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={
                          partner.logo
                            ? (partner.logo.startsWith('http') ? partner.logo : `${API_SERVER}${partner.logo}`)
                            : '/default-logo.png'
                        }
                        alt={partner.name}
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/default-logo.png';
                        }}
                      />
                    </div>
                    <p className="text-[15px] font-semibold text-primary mb-2">{partner.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{partner.category}</p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium transition-opacity duration-300"
                      >
                        Tìm hiểu thêm
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
              onClick={() => navigate('/organizations')}
            >
              Xem thêm đối tác
            </Button>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Hãy cùng chúng tôi lan tỏa yêu thương
            </h2>
            <p className="text-xl mb-8">
              Tham gia MedicalHope+ ngay hôm nay để trở thành một phần của hành trình mang sức khỏe và hy vọng đến mọi người.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="btn-charity text-lg px-10 py-6 h-auto rounded-full"
                onClick={() => navigate('/register')}
              >
                Đăng ký tình nguyện
                <UserPlus className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatBubble />
      <ScrollToTop />
      <DonationForm
        open={openForm}
        onOpenChange={setOpenForm}
      />
    </div>
  );
}