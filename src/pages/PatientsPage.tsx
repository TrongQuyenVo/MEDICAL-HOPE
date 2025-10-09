import { motion } from 'framer-motion';
import { Heart, CheckCircle, Clock, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';

export default function PatientsPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const mockPatients = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      age: 45,
      condition: 'Bệnh tim bẩm sinh',
      economicStatus: 'Nghèo',
      isVerified: true,
      registeredAt: '2024-01-15',
      lastVisit: '2024-12-20'
    },
    {
      id: 2,
      name: 'Trần Văn Nam',
      age: 62,
      condition: 'Ung thư phổi',
      economicStatus: 'Cận nghèo',
      isVerified: false,
      registeredAt: '2024-02-10',
      lastVisit: '2024-12-18'
    },
    {
      id: 3,
      name: 'Lê Thị Mai',
      age: 28,
      condition: 'Tiểu đường type 1',
      economicStatus: 'Nghèo',
      isVerified: true,
      registeredAt: '2024-03-05',
      lastVisit: '2024-12-22'
    },
    {
      id: 4,
      name: 'Phạm Văn Hòa',
      age: 35,
      condition: 'Khỏe mạnh',
      economicStatus: 'Trung bình',
      isVerified: true,
      registeredAt: '2024-01-20',
      lastVisit: '2024-12-15'
    },
  ];

  const getPageTitle = () => {
    switch (user.role) {
      case 'doctor':
        return 'Danh sách bệnh nhân';
      case 'admin':
        return 'Quản lý bệnh nhân';
      case 'charity_admin':
        return 'Bệnh nhân cần hỗ trợ';
      default:
        return 'Bệnh nhân';
    }
  };

  const getPageSubtitle = () => {
    switch (user.role) {
      case 'doctor':
        return 'Các bệnh nhân đã khám và theo dõi';
      case 'admin':
        return 'Quản lý thông tin và xác thực bệnh nhân';
      case 'charity_admin':
        return 'Danh sách bệnh nhân có hoàn cảnh khó khăn cần hỗ trợ';
      default:
        return 'Danh sách bệnh nhân';
    }
  };

  const getVisiblePatients = () => {
    switch (user.role) {
      case 'doctor':
        // Doctor only sees patients they have treated or are treating
        return mockPatients.filter(patient => patient.condition !== 'Khỏe mạnh');
      case 'charity_admin':
        // Charity admin only sees patients needing financial support
        return mockPatients.filter(patient =>
          patient.economicStatus === 'Nghèo' || patient.economicStatus === 'Cận nghèo'
        );
      case 'admin':
        return mockPatients; // Admin sees all patients
      default:
        return []; // Patients and others don't access this page
    }
  };

  const visiblePatients = getVisiblePatients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nghèo': return 'bg-destructive text-destructive-foreground';
      case 'Cận nghèo': return 'bg-warning text-warning-foreground';
      case 'Trung bình': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleVerifyPatient = (patientId: number) => {
    console.log('Xác thực bệnh nhân:', patientId);
    // TODO: API call to verify patient
  };

  // Redirect patients and other unauthorized roles
  if (user.role === 'patient') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không có quyền truy cập</h2>
          <p className="text-muted-foreground">Bạn không có quyền xem trang này.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="healthcare-heading text-3xl font-bold">{getPageTitle()}</h1>
          <p className="healthcare-subtitle">{getPageSubtitle()}</p>
        </div>
        {user.role === 'admin' && (
          <Button className="btn-healthcare">
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm bệnh nhân
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePatients.length > 0 ? (
          visiblePatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="healthcare-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg bg-gradient-primary text-white">
                        {patient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold healthcare-heading flex items-center">
                            {patient.name}
                            {patient.isVerified ? (
                              <CheckCircle className="ml-2 h-5 w-5 text-success" />
                            ) : (
                              <Clock className="ml-2 h-5 w-5 text-warning" />
                            )}
                          </h3>
                          <p className="text-muted-foreground">
                            {patient.age} tuổi • {patient.condition}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Đăng ký: </span>
                          <span className="font-medium">
                            {new Date(patient.registeredAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Khám gần nhất: </span>
                          <span className="font-medium">
                            {new Date(patient.lastVisit).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(patient.economicStatus)}>
                          {patient.economicStatus}
                        </Badge>

                        {/* Action buttons based on role */}
                        {user.role === 'admin' && !patient.isVerified && (
                          <Button
                            size="sm"
                            onClick={() => handleVerifyPatient(patient.id)}
                            className="btn-healthcare text-xs"
                          >
                            Xác thực
                          </Button>
                        )}

                        {user.role === 'charity_admin' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Hỗ trợ
                          </Button>
                        )}

                        {user.role === 'doctor' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Xem hồ sơ
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            {user.role === 'charity_admin'
              ? 'Không có bệnh nhân nào cần hỗ trợ'
              : 'Không có bệnh nhân nào'
            }
          </div>
        )}
      </div>
    </motion.div>
  );
}