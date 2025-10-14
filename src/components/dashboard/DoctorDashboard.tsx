import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const todayAppointments = [
    {
      id: 1,
      patient: 'Nguyễn Văn A',
      time: '09:00',
      type: 'consultation',
      status: 'confirmed',
    },
    {
      id: 2,
      patient: 'Trần Thị B',
      time: '10:30',
      type: 'follow_up',
      status: 'scheduled',
    },
    {
      id: 3,
      patient: 'Lê Văn C',
      time: '14:00',
      type: 'consultation',
      status: 'confirmed',
    },
  ];

  const stats = [
    {
      title: 'Bệnh nhân hôm nay',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: Users,
    },
    {
      title: 'Lịch hẹn tuần này',
      value: '32',
      change: '+5',
      changeType: 'increase',
      icon: Calendar,
    },
    {
      title: 'Giờ tình nguyện',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: Clock,
    },
    {
      title: 'Bệnh nhân đã khám',
      value: '247',
      change: '+18',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="healthcare-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span> từ tuần trước
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="healthcare-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="healthcare-heading">Lịch khám hôm nay</CardTitle>
                  <CardDescription>
                    {format(new Date(), "EEEE, dd 'tháng' MM 'năm' yyyy", { locale: vi })}
                  </CardDescription>
                </div>
                <Button onClick={() => navigate('/appointments')}>
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="font-medium text-lg text-primary">
                      {appointment.time}
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {appointment.type === 'consultation' ? 'Khám tổng quát' : 'Tái khám'}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      appointment.status === 'confirmed'
                        ? 'status-confirmed'
                        : 'status-scheduled'
                    }
                  >
                    {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Đã đặt lịch'}
                  </Badge>
                </div>
              ))}
              {todayAppointments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Không có lịch hẹn nào hôm nay
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="healthcare-heading">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start btn-healthcare"
                onClick={() => navigate('/appointments')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Quản lý lịch hẹn
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/patients')}
              >
                <Users className="mr-2 h-4 w-4" />
                Danh sách bệnh nhân
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                <Activity className="mr-2 h-4 w-4" />
                Cập nhật hồ sơ
              </Button>
            </CardContent>
          </Card>

          {/* Volunteer Impact */}
          <Card className="healthcare-card mt-6">
            <CardHeader>
              <CardTitle className="healthcare-heading text-success">
                Tác động tình nguyện
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">247</div>
                <div className="text-sm text-muted-foreground">
                  Bệnh nhân đã được hỗ trợ
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">156 giờ</div>
                <div className="text-sm text-muted-foreground">
                  Thời gian tình nguyện
                </div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium text-success">
                  🏆 Bác sĩ tình nguyện xuất sắc tháng này!
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Hoạt động gần đây</CardTitle>
            <CardDescription>Cập nhật từ các bệnh nhân và hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="w-2 h-2 bg-success rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Hoàn thành khám cho bệnh nhân Nguyễn Văn A</div>
                  <div className="text-xs text-muted-foreground">2 giờ trước</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Lịch hẹn mới từ bệnh nhân Trần Thị B</div>
                  <div className="text-xs text-muted-foreground">1 ngày trước</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Cập nhật hồ sơ y tế cho 3 bệnh nhân</div>
                  <div className="text-xs text-muted-foreground">2 ngày trước</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}