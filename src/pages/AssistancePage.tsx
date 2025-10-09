import { useState } from 'react';
import { motion } from 'framer-motion';
import { HandHeart, AlertCircle, CheckCircle, Clock, XCircle, Heart, DollarSign, FileText, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/stores/authStore';
import AssistanceRequestForm from '@/components/form/AssistanceRequestForm';

export default function AssistancePage() {
  const { user } = useAuthStore();
  const [showRequestForm, setShowRequestForm] = useState(false);

  if (!user) return null;

  // Mock assistance requests data
  const assistanceRequests = [
    {
      id: 1,
      patientName: 'Nguyễn Thị Lan',
      type: 'medical_treatment',
      description: 'Cần hỗ trợ chi phí phẫu thuật tim bẩm sinh khẩn cấp',
      targetAmount: 50000000,
      raisedAmount: 35000000,
      status: 'approved',
      urgency: 'high',
      submittedAt: '2024-12-20',
      approvedBy: 'Admin System'
    },
    {
      id: 2,
      patientName: 'Trần Văn Nam',
      type: 'medication',
      description: 'Cần thuốc đặc trị cho bệnh ung thư phổi',
      targetAmount: 15000000,
      raisedAmount: 8000000,
      status: 'approved',
      urgency: 'medium',
      submittedAt: '2024-12-18',
      approvedBy: 'BS. Nguyễn Văn A'
    },
    {
      id: 3,
      patientName: 'Lê Thị Mai',
      type: 'equipment',
      description: 'Cần máy đo đường huyết và que thử cho bệnh tiểu đường',
      targetAmount: 3000000,
      raisedAmount: 0,
      status: 'pending',
      urgency: 'low',
      submittedAt: '2024-12-22',
      approvedBy: null
    },
  ];

  const getPageTitle = () => {
    switch (user.role) {
      case 'patient':
        return 'Yêu cầu hỗ trợ y tế';
      case 'admin':
      case 'charity_admin':
        return 'Quản lý yêu cầu hỗ trợ';
      default:
        return 'Hỗ trợ y tế từ thiện';
    }
  };

  const getPageSubtitle = () => {
    switch (user.role) {
      case 'patient':
        return 'Gửi yêu cầu hỗ trợ chi phí y tế và xem các trường hợp khác';
      case 'admin':
      case 'charity_admin':
        return 'Duyệt và quản lý các yêu cầu hỗ trợ y tế';
      default:
        return 'Xem và ủng hộ các trường hợp cần hỗ trợ y tế';
    }
  };

  const getVisibleRequests = () => {
    switch (user.role) {
      case 'patient':
        // Patient sees all approved requests (for donation) + their own requests
        return assistanceRequests.filter(req =>
          req.status === 'approved' || req.patientName === user.fullName
        );
      case 'admin':
      case 'charity_admin':
        return assistanceRequests; // See all requests including pending
      default:
        // Doctor and others see only approved requests for donation
        return assistanceRequests.filter(req => req.status === 'approved');
    }
  };

  const visibleRequests = getVisibleRequests();

  const handleApproveRequest = (requestId: number) => {
    console.log('Duyệt yêu cầu:', requestId);
    // TODO: API call to approve request
  };

  const handleRejectRequest = (requestId: number) => {
    console.log('Từ chối yêu cầu:', requestId);
    // TODO: API call to reject request
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'in_progress': return Clock;
      case 'pending': return AlertCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'status-completed';
      case 'in_progress': return 'status-confirmed';
      case 'pending': return 'status-scheduled';
      case 'rejected': return 'status-cancelled';
      default: return 'status-scheduled';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Đã duyệt';
      case 'in_progress': return 'Đang thực hiện';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      default: return 'Không xác định';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Khẩn cấp';
      case 'medium': return 'Trung bình';
      case 'low': return 'Bình thường';
      default: return 'Không xác định';
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'medical_treatment': return 'Điều trị y tế';
      case 'medication': return 'Thuốc men';
      case 'equipment': return 'Thiết bị y tế';
      case 'financial_aid': return 'Hỗ trợ tài chính';
      default: return 'Khác';
    }
  };

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
          <Button
            className="btn-assistance"
            onClick={() => setShowRequestForm(true)}
          >
            <HandHeart className="mr-2 h-4 w-4" />
            Gửi yêu cầu hỗ trợ
          </Button>
        )}
      </div>

      {/* Stats Overview - Only show to admin and charity_admin */}
      {(user.role === 'admin' || user.role === 'charity_admin') && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng yêu cầu</CardTitle>
              <HandHeart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">125</div>
              <p className="text-xs text-muted-foreground">+12 yêu cầu mới tuần này</p>
            </CardContent>
          </Card>
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">23</div>
              <p className="text-xs text-muted-foreground">Cần xem xét</p>
            </CardContent>
          </Card>
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">89</div>
              <p className="text-xs text-muted-foreground">Tỷ lệ 71.2%</p>
            </CardContent>
          </Card>
          <Card className="healthcare-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng hỗ trợ</CardTitle>
              <HandHeart className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">68M VNĐ</div>
              <p className="text-xs text-muted-foreground">Trong tháng này</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Assistance Requests */}
      <div className="space-y-6">
        <h2 className="healthcare-heading text-2xl font-bold">
          {(user.role === 'admin' || user.role === 'charity_admin') ? 'Tất cả yêu cầu hỗ trợ' : 'Danh sách yêu cầu hỗ trợ'}
        </h2>
        {visibleRequests.length > 0 ? (
          visibleRequests.map((request, index) => {
            const progress = (request.raisedAmount / request.targetAmount) * 100;
            const StatusIcon = getStatusIcon(request.status);

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="healthcare-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold healthcare-heading">
                            {request.patientName}
                          </h3>
                          <Badge className={getStatusColor(request.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusLabel(request.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span>Loại: {getRequestTypeLabel(request.type)}</span>
                          <span>Ngày gửi: {new Date(request.submittedAt).toLocaleDateString('vi-VN')}</span>
                          {request.approvedBy && (
                            <span>Duyệt bởi: {request.approvedBy}</span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{request.description}</p>
                      </div>
                    </div>

                    {request.status !== 'pending' && (
                      <Progress
                        value={(request.raisedAmount / request.targetAmount) * 100}
                        className="mb-4"
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {getUrgencyLabel(request.urgency)}
                        </Badge>
                        <Badge variant="outline">
                          {getRequestTypeLabel(request.type)}
                        </Badge>
                      </div>

                      {/* Action buttons based on role and status */}
                      <div className="flex space-x-2">
                        {(user.role === 'admin' || user.role === 'charity_admin') && request.status === 'pending' ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApproveRequest(request.id)}
                              className="btn-healthcare"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectRequest(request.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Từ chối
                            </Button>
                          </>
                        ) : (user.role === 'admin' || user.role === 'charity_admin') ? (
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            Chi tiết
                          </Button>
                        ) : request.status === 'approved' && user.role !== 'patient' ? (
                          <Button
                            size="sm"
                            className="btn-charity"
                          >
                            <Heart className="mr-1 h-4 w-4" />
                            Ủng hộ
                          </Button>
                        ) : request.status === 'approved' && user.role === 'patient' && request.patientName !== user.fullName ? (
                          <Button
                            size="sm"
                            className="btn-charity"
                          >
                            <Heart className="mr-1 h-4 w-4" />
                            Ủng hộ
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {user.role === 'patient'
              ? 'Chưa có yêu cầu hỗ trợ nào'
              : 'Không có yêu cầu hỗ trợ nào'
            }
          </div>
        )}
      </div>

      {/* Only show form to patients */}
      {user.role === 'patient' && (
        <AssistanceRequestForm
          open={showRequestForm}
          onOpenChange={setShowRequestForm}
        />
      )}
    </motion.div>
  );
}