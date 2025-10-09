import { motion } from 'framer-motion';
import {
  ArrowRight, Heart, Users, Stethoscope, Calendar,
  Home, Building2, HandHeart, Shield, Award, CheckCircle2,
  HeartHandshake, UserPlus, Activity, Sparkles,
  ExternalLink
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

export default function LandingPage() {
  const navigate = useNavigate();

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

  const stats = [
    { number: '50,000+', label: 'Bệnh nhân được hỗ trợ', icon: Users },
    { number: '1,500+', label: 'Bác sĩ tình nguyện', icon: Stethoscope },
    { number: '12,000+', label: 'Ca khám hoàn thành', icon: CheckCircle2 },
    { number: '120+', label: 'Tổ chức từ thiện', icon: Building2 },
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

  const testimonials = [
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
              HealthCare+ kết nối những trái tim nhân ái, mang dịch vụ y tế chất lượng cao đến với những người cần giúp đỡ nhất, không phân biệt hoàn cảnh.
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

      {/* Stats Section */}
      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="healthcare-heading text-3xl font-bold mb-4">Hành trình của chúng tôi</h2>
            <p className="text-lg text-muted-foreground">Những con số thể hiện nỗ lực không ngừng nghỉ để mang sức khỏe đến mọi người</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="healthcare-heading text-4xl font-bold mb-2">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
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
              Nghe những lời chia sẻ chân thành từ những người đã được HealthCare+ đồng hành.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="healthcare-card h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Heart key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-4">
                        "{testimonial.content}"
                      </p>
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
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-8xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative p-6 bg-background rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{partner.category}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Tìm hiểu thêm
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="/organizations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Xem thêm
            </a>
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
              Tham gia HealthCare+ ngay hôm nay để trở thành một phần của hành trình mang sức khỏe và hy vọng đến mọi người.
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
      <ScrollToTop />
    </div>
  );
}