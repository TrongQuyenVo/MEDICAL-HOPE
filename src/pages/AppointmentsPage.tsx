import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle, XCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookAppointmentForm from '@/components/form/BookAppointmentForm';

export default function AppointmentsPage() {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
        }

        const response = await axios.get('/api/appointments', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: pagination.page, limit: pagination.limit },
        });

        const appointmentsData = Array.isArray(response.data.appointments)
          ? response.data.appointments
          : [];
        setAppointments(appointmentsData);
        setPagination(response.data.pagination || { total: 0, pages: 1, page: 1, limit: 10 });
      } catch (error) {
        console.error('Lỗi tải danh sách lịch hẹn:', error);
        setError(error.response?.data?.message || 'Không thể tải danh sách lịch hẹn');
        toast.error(error.response?.data?.message || 'Không thể tải danh sách lịch hẹn');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [pagination.page, pagination.limit]);

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/appointments/${appointmentId}/status`,
        { status: 'confirmed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: 'confirmed' } : apt
        )
      );
      toast.success('Đã xác nhận lịch hẹn');
    } catch (error) {
      console.error('Lỗi xác nhận lịch hẹn:', error);
      toast.error(error.response?.data?.message || 'Không thể xác nhận lịch hẹn');
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/appointments/${appointmentId}/status`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );
      toast.success('Đã từ chối lịch hẹn');
    } catch (error) {
      console.error('Lỗi từ chối lịch hẹn:', error);
      toast.error(error.response?.data?.message || 'Không thể từ chối lịch hẹn');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const getPageTitle = () => {
    switch (user?.role) {
      case 'patient':
        return 'Lịch hẹn của tôi';
      case 'doctor':
        return 'Lịch khám bệnh';
      default:
        return 'Quản lý lịch hẹn';
    }
  };

  const getPageSubtitle = () => {
    switch (user?.role) {
      case 'patient':
        return 'Các cuộc hẹn khám bệnh của bạn';
      case 'doctor':
        return 'Lịch khám của bệnh nhân';
      default:
        return 'Quản lý tất cả các cuộc hẹn khám bệnh';
    }
  };

  if (!user) return null;

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="healthcare-heading text-3xl font-bold">{getPageTitle()}</h1>
          <p className="healthcare-subtitle">{getPageSubtitle()}</p>
        </div>
        {user.role === 'patient' && (
          <Button className="btn-healthcare" onClick={() => setOpenDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Đặt lịch mới
          </Button>
        )}
      </div>

      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle>Danh sách lịch hẹn</CardTitle>
          <CardDescription>Tất cả các cuộc hẹn của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      {user.role === 'doctor' ? (
                        <>
                          <div className="font-medium flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {appointment.patientId?.userId?.fullName || 'Không xác định'}
                          </div>
                          <div className="text-sm text-muted-foreground">{appointment.appointmentType}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(appointment.scheduledTime).toLocaleString('vi-VN')}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-medium">{appointment.doctorId?.userId?.fullName || 'Không xác định'}</div>
                          <div className="text-sm text-muted-foreground">{appointment.appointmentType}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(appointment.scheduledTime).toLocaleString('vi-VN')}
                          </div>
                          {(user.role === 'admin' || user.role === 'charity_admin') && (
                            <div className="text-sm text-muted-foreground">
                              Bệnh nhân: {appointment.patientId?.userId?.fullName || 'Không xác định'}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        appointment.status === 'confirmed'
                          ? 'status-confirmed'
                          : appointment.status === 'scheduled'
                            ? 'status-scheduled'
                            : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {appointment.status === 'confirmed' && 'Đã xác nhận'}
                      {appointment.status === 'scheduled' && 'Đã đặt lịch'}
                      {appointment.status === 'pending' && 'Chờ xác nhận'}
                    </Badge>

                    {user.role === 'doctor' && appointment.status === 'scheduled' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConfirmAppointment(appointment._id)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectAppointment(appointment._id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  Trước
                </Button>
                <span>
                  Trang {pagination.page} / {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.pages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  Tiếp
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {user.role === 'patient' ? 'Bạn chưa có lịch hẹn nào' : 'Không có lịch hẹn nào'}
            </div>
          )}
        </CardContent>
      </Card>
      {openDialog && (
        <BookAppointmentForm
          open={openDialog}
          onOpenChange={setOpenDialog}
          doctor={null}
        />
      )}
    </motion.div>
  );
}