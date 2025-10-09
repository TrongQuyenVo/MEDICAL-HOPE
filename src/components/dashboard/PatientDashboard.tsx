import { motion } from 'framer-motion';
import { Calendar, Stethoscope, Gift, HandHeart, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ upcoming: 0, history: 0, support: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
        }

        const [appointmentsRes, notificationsRes] = await Promise.all([
          axios.get('/api/appointments', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/notifications', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const appointmentsData = Array.isArray(appointmentsRes.data.appointments)
          ? appointmentsRes.data.appointments
          : [];
        const notificationsData = Array.isArray(notificationsRes.data.notifications)
          ? notificationsRes.data.notifications
          : [];

        setAppointments(appointmentsData);
        setNotifications(notificationsData);
        setStats({
          upcoming: appointmentsData.filter(
            (apt) => new Date(apt.scheduledTime) > new Date()
          ).length,
          history: appointmentsData.length,
          support: notificationsData.filter((n) => n.type === 'donation').length,
          messages: notificationsData.filter((n) => n.type === 'system' || n.type === 'message').length,
        });
      } catch (error) {
        console.error('Lỗi tải dữ liệu dashboard:', error);
        setError(error.response?.data?.message || 'Không thể tải dữ liệu dashboard');
        toast.error(error.response?.data?.message || 'Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const quickActions = [
    {
      title: 'Đặt lịch khám',
      description: 'Với bác sĩ tình nguyện',
      icon: Calendar,
      action: () => navigate('/appointments'),
      color: 'bg-gradient-primary',
    },
    {
      title: 'Tìm bác sĩ',
      description: 'Danh sách bác sĩ chuyên khoa',
      icon: Stethoscope,
      action: () => navigate('/doctors'),
      color: 'bg-gradient-secondary',
    },
    {
      title: 'Quyên góp',
      description: 'Xem các chiến dịch quyên góp',
      icon: Gift,
      action: () => navigate('/donations'),
      color: 'bg-gradient-success',
    },
    {
      title: 'Yêu cầu hỗ trợ',
      description: 'Tạo yêu cầu hỗ trợ y tế',
      icon: HandHeart,
      action: () => navigate('/assistance'),
      color: 'bg-orange-500',
    },
  ];

  if (error) {
    return (
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="healthcare-heading">Có lỗi xảy ra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch hẹn sắp tới</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">Các cuộc hẹn trong tuần tới</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch sử khám</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.history}</div>
              <p className="text-xs text-muted-foreground">Tổng số lần khám</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hỗ trợ nhận được</CardTitle>
              <HandHeart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.support}</div>
              <p className="text-xs text-muted-foreground">VNĐ trong năm nay</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tin nhắn mới</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.messages}</div>
              <p className="text-xs text-muted-foreground">Từ bác sĩ và hệ thống</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="healthcare-heading">Thao tác nhanh</CardTitle>
            <CardDescription>Các chức năng bạn thường sử dụng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <Button
                    onClick={action.action}
                    className="h-auto w-full justify-start p-4 text-left"
                    variant="outline"
                  >
                    <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="healthcare-heading">Lịch hẹn sắp tới</CardTitle>
              <CardDescription>Các cuộc hẹn trong tuần tới</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-8">Đang tải...</div>
              ) : appointments && appointments.length > 0 ? (
                appointments
                  .filter((apt) => new Date(apt.scheduledTime) > new Date())
                  .map((appointment) => (
                    <div
                      key={appointment._id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <div className="font-medium">{appointment.doctorId?.userId?.fullName || 'Không xác định'}</div>
                        <div className="text-sm text-muted-foreground">{appointment.appointmentType}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.scheduledTime).toLocaleString('vi-VN')}
                        </div>
                      </div>
                      <Badge
                        className={
                          appointment.status === 'confirmed'
                            ? 'status-confirmed'
                            : appointment.status === 'scheduled'
                              ? 'status-scheduled'
                              : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {appointment.status === 'confirmed' ? 'Đã xác nhận' :
                          appointment.status === 'scheduled' ? 'Đã đặt lịch' :
                            'Chờ xác nhận'}
                      </Badge>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">Bạn chưa có lịch hẹn nào</div>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/appointments')}
              >
                Xem tất cả lịch hẹn
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="healthcare-heading">Hoạt động gần đây</CardTitle>
              <CardDescription>Cập nhật mới nhất từ hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-8">Đang tải...</div>
              ) : notifications && notifications.length > 0 ? (
                notifications.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start space-x-3 rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <div className="text-sm">{activity.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">Không có hoạt động gần đây</div>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/notifications')}
              >
                Xem tất cả thông báo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}