import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Soup } from 'lucide-react';
import Header from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ChatBubble from './ChatbotPage';

// Hàm tạo danh sách giờ phát đồ ăn cụ thể
const generateOperatingHours = (start, end, interval) => {
  const hours = [];
  const startTime = new Date(`2025-10-16 ${start}`);
  const endTime = new Date(`2025-10-16 ${end}`);
  const intervalMinutes = interval * 60;

  while (startTime <= endTime) {
    hours.push(startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
  }
  return hours.join(', ');
};

const ExtendedFoodDistributionList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState('location');

  // Dữ liệu mock cho các điểm phát đồ ăn
  const foodDistributionPoints = [
    {
      location: 'Bệnh viện Bạch Mai, Hà Nội',
      operatingHours: { start: '11:00', end: '13:00', interval: 1 },
      description: 'Phát cơm miễn phí cho bệnh nhân và người nhà, hợp tác với Hội Chữ thập đỏ.',
      organizer: 'Hội Chữ thập đỏ VN',
    },
    {
      location: 'Bệnh viện Chợ Rẫy, TP.HCM',
      operatingHours: { start: '12:00', end: '14:00', interval: 1, days: 'Thứ 2 - Thứ 6' },
      operatingHoursWeekend: { start: '11:30', end: '13:30', interval: 1, days: 'Cuối tuần' },
      description: 'Cung cấp suất ăn dinh dưỡng, liên hệ với Quỹ Thiện Tâm.',
      organizer: 'Quỹ Thiện Tâm',
    },
    {
      location: 'Bệnh viện K, Hà Nội',
      operatingHours: { start: '11:30', end: '13:00', interval: 1, days: 'Thứ 3, Thứ 5' },
      description: 'Phát đồ ăn cho bệnh nhân ung thư, hỗ trợ từ mạnh thường quân địa phương.',
      organizer: 'Mạnh thường quân địa phương',
    },
    {
      location: 'Trung tâm y tế Quảng Trị',
      operatingHours: { start: '12:00', end: '14:00', interval: 1, days: 'Ngày 15, 30' },
      description: 'Suất ăn miễn phí cho người cao tuổi và trẻ em, hợp tác với UNICEF.',
      organizer: 'UNICEF Vietnam',
    },
    {
      location: 'Bệnh viện Nghệ An',
      operatingHours: { start: '11:00', end: '12:30', interval: 0.5 },
      description: 'Phát cháo và đồ ăn nhẹ, do các tổ chức từ thiện địa phương tổ chức.',
      organizer: 'Tổ chức từ thiện địa phương',
    },
    {
      location: 'Bệnh viện Đà Nẵng, Đà Nẵng',
      operatingHours: { start: '11:00', end: '13:00', interval: 1, days: 'Thứ 4, Chủ nhật' },
      description: 'Phát suất ăn miễn phí cho bệnh nhân và người nhà, hợp tác với các tổ chức từ thiện.',
      organizer: 'Tổ chức từ thiện Đà Nẵng',
    },
    {
      location: 'Trung tâm y tế Cần Thơ',
      operatingHours: { start: '12:00', end: '13:30', interval: 0.5 },
      description: 'Cung cấp cơm và nước uống miễn phí, hỗ trợ bởi Quỹ Vì người nghèo.',
      organizer: 'Quỹ Vì người nghèo',
    },
    {
      location: 'Bệnh viện Huế, Huế',
      operatingHours: { start: '11:30', end: '13:00', interval: 1, days: 'Thứ 2, Thứ 6' },
      description: 'Phát cháo dinh dưỡng và đồ ăn nhẹ cho bệnh nhân, hợp tác với các tình nguyện viên địa phương.',
      organizer: 'Tình nguyện viên Huế',
    },
  ];

  // Lấy danh sách thành phố duy nhất từ dữ liệu
  const cities = [
    ...new Set(
      foodDistributionPoints.map((point) =>
        point.location.match(/(TP\.HCM|Hà Nội|Đà Nẵng|Huế|Cần Thơ|Quảng Trị|Nghệ An)/)?.[1] || 'Khác'
      )
    ),
  ];

  // Lọc và sắp xếp dữ liệu
  const filteredPoints = foodDistributionPoints
    .filter(
      (point) =>
        (point.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          point.organizer.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!cityFilter || point.location.includes(cityFilter))
    )
    .sort((a, b) => {
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      if (sortBy === 'organizer') return a.organizer.localeCompare(b.organizer);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 border border-primary/20">
              <Soup className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Danh sách điểm phát đồ ăn chi tiết</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Điểm phát đồ ăn toàn quốc
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Tìm kiếm và lọc danh sách các điểm phát đồ ăn miễn phí theo địa điểm, tổ chức hoặc thành phố. Các điểm phát đồ ăn cung cấp suất ăn miễn phí cho bệnh nhân và người nhà.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="text"
                placeholder="Tìm kiếm điểm phát đồ ăn, tổ chức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-md px-4 py-2 rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
              />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
              >
                <option value="">Tất cả thành phố</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
              >
                <option value="location">Sắp xếp theo địa điểm</option>
                <option value="organizer">Sắp xếp theo tổ chức</option>
              </select>
            </div>
          </motion.div>

          {/* Bảng hiển thị trên màn hình lớn */}
          <div className="hidden lg:block max-w-7xl mx-auto overflow-x-auto rounded-2xl shadow-lg border border-primary/10">
            <table className="w-full bg-background">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-4 text-left text-sm font-semibold text-primary w-16">Biểu tượng</th>
                  <th className="p-4 text-left text-sm font-semibold text-primary w-56">Địa điểm</th>
                  <th className="p-4 text-left text-sm font-semibold text-primary w-64">Giờ phát</th>
                  <th className="p-4 text-left text-sm font-semibold text-primary w-32">Tổ chức</th>
                  <th className="p-4 text-left text-sm font-semibold text-primary">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {filteredPoints.map((point, index) => (
                  <motion.tr
                    key={point.location}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-primary/10 hover:bg-orange-50/50 transition-all duration-300"
                  >
                    <td className="p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md overflow-hidden">
                        <Soup className="h-10 w-10 text-primary" />
                      </div>
                    </td>
                    <td className="p-5 text-foreground font-medium">{point.location}</td>
                    <td className="p-5 text-muted-foreground">
                      {point.operatingHours.days ? `${point.operatingHours.days}: ` : ''}
                      {generateOperatingHours(
                        point.operatingHours.start,
                        point.operatingHours.end,
                        point.operatingHours.interval
                      )}
                      {point.operatingHoursWeekend && (
                        <>
                          <br />
                          {`${point.operatingHoursWeekend.days}: `}
                          {generateOperatingHours(
                            point.operatingHoursWeekend.start,
                            point.operatingHoursWeekend.end,
                            point.operatingHoursWeekend.interval
                          )}
                        </>
                      )}
                    </td>
                    <td className="p-5 text-muted-foreground">{point.organizer}</td>
                    <td className="p-5 text-muted-foreground">{point.description}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hiển thị dạng thẻ trên màn hình nhỏ */}
          <div className="lg:hidden space-y-4">
            {filteredPoints.map((point, index) => (
              <motion.div
                key={point.location}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 bg-background rounded-lg shadow-md border border-primary/10 hover:bg-orange-50/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md overflow-hidden">
                    <Soup className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{point.location}</h3>
                    <p className="text-sm text-muted-foreground">{point.organizer}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <p>
                    <span className="font-medium">Giờ phát:</span>{' '}
                    {point.operatingHours.days ? `${point.operatingHours.days}: ` : ''}
                    {generateOperatingHours(
                      point.operatingHours.start,
                      point.operatingHours.end,
                      point.operatingHours.interval
                    )}
                    {point.operatingHoursWeekend && (
                      <>
                        <br />
                        {`${point.operatingHoursWeekend.days}: `}
                        {generateOperatingHours(
                          point.operatingHoursWeekend.start,
                          point.operatingHoursWeekend.end,
                          point.operatingHoursWeekend.interval
                        )}
                      </>
                    )}
                  </p>
                  <p><span className="font-medium">Tổ chức:</span> {point.organizer}</p>
                  <p><span className="font-medium">Mô tả:</span> {point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <ChatBubble />
      <ScrollToTop />
    </div>
  );
};

export default ExtendedFoodDistributionList;