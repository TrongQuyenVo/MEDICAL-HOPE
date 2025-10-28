import { motion } from 'framer-motion';
import { TrendingUp, Users, Heart, Activity, CalendarDays, DollarSign, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ChatBubble from './ChatbotPage';
import ScrollToTop from '@/components/layout/ScrollToTop';

export default function AnalyticsPage() {
  const { t } = useTranslation();

  // Mock analytics data
  const monthlyGrowth = [
    { month: 'T1', users: 120, donations: 45000000, appointments: 89 },
    { month: 'T2', users: 150, donations: 52000000, appointments: 102 },
    { month: 'T3', users: 180, donations: 61000000, appointments: 118 },
    { month: 'T4', users: 210, donations: 58000000, appointments: 134 },
    { month: 'T5', users: 240, donations: 67000000, appointments: 145 },
    { month: 'T6', users: 280, donations: 75000000, appointments: 167 },
    { month: 'T7', users: 320, donations: 83000000, appointments: 189 },
    { month: 'T8', users: 350, donations: 91000000, appointments: 203 },
    { month: 'T9', users: 380, donations: 87000000, appointments: 221 },
    { month: 'T10', users: 420, donations: 95000000, appointments: 245 },
    { month: 'T11', users: 450, donations: 102000000, appointments: 267 },
    { month: 'T12', users: 480, donations: 108000000, appointments: 289 }
  ];

  const userDistribution = [
    { role: 'Bệnh nhân', count: 320, color: '#3b82f6' },
    { role: 'Bác sĩ', count: 85, color: '#10b981' },
    { role: 'Tình nguyện viên', count: 45, color: '#f59e0b' },
    { role: 'Quản trị viên', count: 30, color: '#ef4444' }
  ];

  const donationCategories = [
    { category: 'Điều trị y tế', amount: 450000000, percentage: 45 },
    { category: 'Thuốc men', amount: 250000000, percentage: 25 },
    { category: 'Thiết bị y tế', amount: 150000000, percentage: 15 },
    { category: 'Hỗ trợ khẩn cấp', amount: 100000000, percentage: 10 },
    { category: 'Khác', amount: 50000000, percentage: 5 }
  ];

  const weeklyAppointments = [
    { day: 'T2', appointments: 45, completed: 42 },
    { day: 'T3', appointments: 52, completed: 48 },
    { day: 'T4', appointments: 38, completed: 35 },
    { day: 'T5', appointments: 61, completed: 58 },
    { day: 'T6', appointments: 49, completed: 46 },
    { day: 'T7', appointments: 33, completed: 31 },
    { day: 'CN', appointments: 28, completed: 26 }
  ];

  const topDoctors = [
    { name: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', appointments: 156, rating: 4.9 },
    { name: 'BS. Trần Thị B', specialty: 'Nhi khoa', appointments: 134, rating: 4.8 },
    { name: 'BS. Lê Văn C', specialty: 'Da liễu', appointments: 128, rating: 4.7 },
    { name: 'BS. Phạm Thị D', specialty: 'Thần kinh', appointments: 112, rating: 4.6 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="healthcare-heading text-3xl font-bold">Thống kê & Báo cáo</h1>
        <p className="healthcare-subtitle">Phân tích dữ liệu và hiệu suất hệ thống</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="healthcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">480</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="healthcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng quyên góp</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">1.08B VNĐ</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.5% so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="healthcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn tháng này</CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">289</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15% so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card className="healthcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">94.2%</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2.1% so với tháng trước
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Tăng trưởng người dùng</CardTitle>
            <CardDescription>Thống kê người dùng mới theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution Pie Chart */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Phân bố người dùng</CardTitle>
            <CardDescription>Thống kê theo vai trò</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {userDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.role}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donations Chart */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Quyên góp theo tháng</CardTitle>
            <CardDescription>Thống kê số tiền quyên góp (VNĐ)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString('vi-VN')} VNĐ`, 'Quyên góp']} />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Appointments */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Lịch hẹn trong tuần</CardTitle>
            <CardDescription>Thống kê lịch hẹn và hoàn thành</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyAppointments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="hsl(var(--primary))" name="Tổng lịch hẹn" />
                <Bar dataKey="completed" fill="hsl(var(--success))" name="Đã hoàn thành" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donation Categories */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Phân loại quyên góp</CardTitle>
            <CardDescription>Thống kê theo mục đích sử dụng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {category.amount.toLocaleString('vi-VN')} VNĐ
                    </span>
                    <Badge variant="secondary">{category.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Doctors */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Bác sĩ tiêu biểu</CardTitle>
            <CardDescription>Thống kê theo số lượng lịch hẹn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topDoctors.map((doctor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{doctor.appointments} lịch hẹn</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award className="mr-1 h-3 w-3" />
                    {doctor.rating}/5
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <ChatBubble />
      <ScrollToTop />
    </motion.div>
  );
}