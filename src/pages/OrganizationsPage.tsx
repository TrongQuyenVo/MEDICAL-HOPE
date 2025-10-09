import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

// Import logo
import redcross from '@/assets/hoichuthapdo.jpg';
import tamlongviet from '@/assets/tamlongviet.png';
import hoibtbn from '@/assets/hoibtbn.png';
import vnvcf from '@/assets/vnvcf.png';
import bacsitinhnguyen from '@/assets/bacsitinhnguyen.jpg';
import vinguoingheo from '@/assets/quyvinguoingheo.png';
import hoicsnct from '@/assets/hoicsnct.jpg';
import operationsmile from '@/assets/operationsmile.png';
import vac from '@/assets/vac.png';
import thientam from '@/assets/thientam.png';
import unicef from '@/assets/unicef.jpg';
import who from '@/assets/who.png';
import msf from '@/assets/msf.svg';
import hoiyhoc from '@/assets/hoiyhoc.jpg';

export default function OrganizationsPage() {
  const navigate = useNavigate();
  const shortenLink = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    const half = Math.floor((maxLength - 3) / 2);
    return url.slice(0, half) + "..." + url.slice(-half);
  };
  const organizations = [
    {
      name: 'Hội Chữ Thập Đỏ Việt Nam',
      logo: redcross,
      description: 'Tổ chức nhân đạo hàng đầu, hoạt động từ thiện y tế trên toàn quốc với hơn 70 năm kinh nghiệm.',
      location: 'Hà Nội, Việt Nam',
      phone: '024-3942-2030',
      email: 'info@redcross.org.vn',
      website: 'https://redcross.org.vn',
      activities: ['Cứu trợ khẩn cấp', 'Y tế cộng đồng', 'Hiến máu nhân đạo'],
    },
    {
      name: 'Quỹ Tấm Lòng Việt',
      logo: tamlongviet,
      description: 'Hỗ trợ phẫu thuật tim bẩm sinh cho trẻ em nghèo, đã thực hiện hơn 3000 ca phẫu thuật thành công.',
      location: 'TP. Hồ Chí Minh',
      phone: '028-3930-3003',
      email: 'contact@tamlongviet.org.vn',
      website: 'https://vtv.vn/tam-long-viet.htm',
      activities: ['Phẫu thuật tim', 'Hỗ trợ điều trị', 'Tư vấn y tế'],
    },
    {
      name: 'Hội Bảo Trợ Bệnh Nhân Nghèo TP. Đà Nẵng',
      logo: hoibtbn,
      description: 'Hỗ trợ chi phí điều trị cho bệnh nhân có hoàn cảnh khó khăn, hoạt động tại các bệnh viện lớn.',
      location: 'Toàn quốc',
      phone: '024-3943-7744',
      email: 'info@hoibtbn.org.vn',
      website: 'https://hoibaotrodanang.vn/',
      activities: ['Hỗ trợ viện phí', 'Cấp phát thuốc', 'Chăm sóc bệnh nhân'],
    },
    {
      name: 'Quỹ Bảo Trợ Trẻ Em Việt Nam',
      logo: vnvcf,
      description: 'Chăm sóc sức khỏe và giáo dục cho trẻ em vùng sâu vùng xa, mồ côi và có hoàn cảnh đặc biệt khó khăn.',
      location: 'Hà Nội, Việt Nam',
      phone: '024-3944-6126',
      email: 'info@vnvcf.org',
      website: 'https://nfvc.molisa.gov.vn/',
      activities: ['Y tế trẻ em', 'Dinh dưỡng', 'Giáo dục'],
    },
    {
      name: 'Hội Bác Sĩ Tình Nguyện',
      logo: bacsitinhnguyen,
      description: 'Mạng lưới bác sĩ tình nguyện khám chữa bệnh miễn phí, với hơn 5000 thành viên trên cả nước.',
      location: 'Toàn quốc',
      phone: '024-3826-9999',
      email: 'contact@bstn.org.vn',
      website: 'https://www.facebook.com/HoiBacSyTinhNguyen/',
      activities: ['Khám bệnh miễn phí', 'Tư vấn y tế', 'Đào tạo'],
    },
    {
      name: 'Quỹ Vì Người Nghèo',
      logo: vinguoingheo,
      description: 'Hỗ trợ y tế, thuốc men và phẫu thuật cho người nghèo, hoạt động mạnh tại miền Nam.',
      location: 'TP. Hồ Chí Minh',
      phone: '028-3822-6122',
      email: 'info@quyvinguoingheo.org',
      website: 'https://vinguoingheo.vn/',
      activities: ['Phẫu thuật miễn phí', 'Cấp thuốc', 'Hỗ trợ viện phí'],
    },
    {
      name: 'Hội Chăm Sóc Người Cao Tuổi',
      logo: hoicsnct,
      description: 'Chuyên về chăm sóc sức khỏe người cao tuổi, đặc biệt là những người neo đơn không nơi nương tựa.',
      location: 'Các tỉnh thành',
      phone: '024-3756-4321',
      email: 'info@hoicsnct.vn',
      website: 'https://hoinguoicaotuoi.vn/',
      activities: ['Khám định kỳ', 'Chăm sóc tại nhà', 'Phục hồi chức năng'],
    },
    {
      name: 'Operation Smile Việt Nam',
      logo: operationsmile,
      description: 'Chuyên phẫu thuật miễn phí dị tật hở môi, hở hàm ếch cho trẻ em nghèo.',
      location: 'Toàn quốc',
      phone: '024-3974-3198',
      email: 'vietnam@operationsmile.org',
      website: 'https://operationsmile.org.vn',
      activities: ['Phẫu thuật thẩm mỹ', 'Phục hồi chức năng', 'Hỗ trợ tâm lý'],
    },
    {
      name: 'Hội Phòng Chống Ung Thư',
      logo: vac,
      description: 'Hỗ trợ điều trị và chăm sóc bệnh nhân ung thư, tuyên truyền phòng bệnh trong cộng đồng.',
      location: 'Hà Nội & TP.HCM',
      phone: '024-3514-3165',
      email: 'info@vac.org.vn',
      website: 'https://hoiungthu.vn/',
      activities: ['Hỗ trợ điều trị', 'Tư vấn dinh dưỡng', 'Khám tầm soát'],
    },
    {
      name: 'Quỹ Thiện Tâm',
      logo: thientam,
      description: 'Quỹ thiện nguyện hỗ trợ y tế và giáo dục cho trẻ em và người nghèo.',
      location: 'Việt Nam',
      phone: '024-3838-8888',
      email: 'contact@thientam.org',
      website: 'https://vingroup.net/linh-vuc-hoat-dong/thien-nguyen-br-xa-hoi/2476/quy-thien-tam',
      activities: ['Giúp đỡ trẻ em', 'Hỗ trợ học bổng', 'Y tế cộng đồng'],
    },
    {
      name: 'UNICEF Việt Nam',
      logo: unicef,
      description: 'Tổ chức quốc tế bảo vệ quyền trẻ em, chăm sóc y tế và giáo dục.',
      location: 'Hà Nội, Việt Nam',
      phone: '024-3850-0100',
      email: 'hanoi@unicef.org',
      website: 'https://unicef.org/vietnam',
      activities: ['Quyền trẻ em', 'Y tế trẻ em', 'Giáo dục'],
    },
    {
      name: 'WHO Việt Nam',
      logo: who,
      description: 'Tổ chức Y tế Thế giới hỗ trợ y tế công cộng tại Việt Nam.',
      location: 'Hà Nội, Việt Nam',
      phone: '024-3943-3734',
      email: 'info@who.int',
      website: 'https://who.int/vietnam',
      activities: ['Y tế cộng đồng', 'Phòng chống dịch', 'Chăm sóc sức khỏe'],
    },
    {
      name: 'Bác Sĩ Không Biên Giới (MSF)',
      logo: msf,
      description: 'Tổ chức quốc tế cung cấp cứu trợ y tế khẩn cấp trên toàn cầu.',
      location: 'Quốc tế',
      phone: '---',
      email: 'contact@msf.org',
      website: 'https://msf.org',
      activities: ['Cứu trợ y tế', 'Khẩn cấp thiên tai', 'Hỗ trợ tị nạn'],
    },
    {
      name: 'Hội Y học Việt Nam',
      logo: hoiyhoc,
      description: 'Hiệp hội nghề nghiệp quy tụ đội ngũ bác sĩ, y tá và chuyên gia y tế.',
      location: 'Hà Nội, Việt Nam',
      phone: '024-3211-5678',
      email: 'info@hoyhocvn.org',
      website: 'http://tonghoiyhoc.vn/',
      activities: ['Đào tạo', 'Nghiên cứu', 'Hội thảo y tế'],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-6 py-2">
            <Building2 className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">Đối tác từ thiện</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Các Tổ Chức Từ Thiện Uy Tín</h2>
          <p className="text-xl text-muted-foreground">
            Mạng lưới các tổ chức từ thiện y tế hàng đầu Việt Nam, cùng chung tay vì sức khỏe cộng đồng
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="healthcare-card h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow overflow-hidden">
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-secondary" />
                    )}
                  </div>
                  <CardTitle className="text-center text-lg">{org.name}</CardTitle>
                  <CardDescription className="text-center">{org.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{org.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{org.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="break-all">{org.email}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-start gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-primary hover:underline"
                        title={org.website} // hiển thị full link khi hover
                      >
                        {shortenLink(org.website)}
                      </a>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <p className="text-xs font-semibold mb-2">Hoạt động chính:</p>
                    <div className="flex flex-wrap gap-1">
                      {org.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-muted-foreground">Bạn muốn trở thành đối tác từ thiện của chúng tôi?</p>
          <Button size="lg" className="btn-healthcare" onClick={() => navigate('/register')}>
            Đăng ký hợp tác
          </Button>
        </motion.div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
