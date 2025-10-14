import { motion } from 'framer-motion';
import { Heart, Gift, Users, TrendingUp, HandHeart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function CharityAdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Tổng quyên góp',
      value: '45.2M VNĐ',
      change: '+18.5%',
      icon: Gift,
      color: 'text-success',
    },
    {
      title: 'Bệnh nhân đã hỗ trợ',
      value: '127',
      change: '+23',
      icon: Heart,
      color: 'text-primary',
    },
    {
      title: 'Yêu cầu hỗ trợ',
      value: '89',
      change: '+12',
      icon: HandHeart,
      color: 'text-secondary',
    },
    {
      title: 'Nhà hảo tâm',
      value: '1,234',
      change: '+156',
      icon: Users,
      color: 'text-warning',
    },
  ];

  const pendingAssistance = [
    {
      id: 1,
      patient: 'Nguyễn Thị Lan',
      requestType: 'Phẫu thuật tim',
      amount: '25,000,000 VNĐ',
      urgency: 'high',
      submittedAt: '2 ngày trước',
    },
    {
      id: 2,
      patient: 'Trần Văn Nam',
      requestType: 'Điều trị ung thư',
      amount: '40,000,000 VNĐ',
      urgency: 'medium',
      submittedAt: '3 ngày trước',
    },
    {
      id: 3,
      patient: 'Lê Thị Mai',
      requestType: 'Mua thuốc đặc trị',
      amount: '8,000,000 VNĐ',
      urgency: 'low',
      submittedAt: '5 ngày trước',
    },
  ];

  const recentDonations = [
    {
      id: 1,
      donor: 'Công ty ABC',
      amount: '5,000,000 VNĐ',
      type: 'money',
      time: '2 giờ trước',
    },
    {
      id: 2,
      donor: 'Nguyễn Văn A',
      amount: '500,000 VNĐ',
      type: 'money',
      time: '4 giờ trước',
    },
    {
      id: 3,
      donor: 'Tổ chức XYZ',
      amount: 'Thiết bị y tế',
      type: 'equipment',
      time: '1 ngày trước',
    },
  ];

  const campaigns = [
    {
      title: 'Hỗ trợ phẫu thuật tim cho trẻ em',
      raised: 85000000,
      target: 100000000,
      donors: 234,
    },
    {
      title: 'Mua sắm thiết bị y tế',
      raised: 45000000,
      target: 80000000,
      donors: 156,
    },
    {
      title: 'Hỗ trợ điều trị ung thư',
      raised: 120000000,
      target: 150000000,
      donors: 456,
    },
  ];

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
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span> từ tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Pending Assistance Requests */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="healthcare-heading">Yêu cầu hỗ trợ chờ duyệt</CardTitle>
                  <CardDescription>Các yêu cầu cần được xem xét</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/assistance')}
                >
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingAssistance.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{request.patient}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.requestType}
                      </div>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {getUrgencyLabel(request.urgency)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-success">{request.amount}</div>
                    <div className="text-xs text-muted-foreground">
                      {request.submittedAt}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Campaign Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="healthcare-heading">Chiến dịch quyên góp</CardTitle>
              <CardDescription>Tiến độ các chiến dịch đang diễn ra</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaigns.map((campaign, index) => {
                const progress = (campaign.raised / campaign.target) * 100;
                return (
                  <div key={index} className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">{campaign.title}</div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{campaign.donors} nhà hảo tâm</span>
                        <span>
                          {(campaign.raised / 1000000).toFixed(1)}M / {(campaign.target / 1000000)}M VNĐ
                        </span>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-xs text-success font-medium">
                      {progress.toFixed(1)}% hoàn thành
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Donations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="healthcare-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="healthcare-heading">Quyên góp gần đây</CardTitle>
                  <CardDescription>Các khoản đóng góp mới nhất</CardDescription>
                </div>
                <Button onClick={() => navigate('/donations')}>
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-success flex items-center justify-center">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{donation.donor}</div>
                        <div className="text-sm text-muted-foreground">
                          {donation.type === 'money' ? 'Quyên góp tiền' : 'Quyên góp vật phẩm'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-success">{donation.amount}</div>
                      <div className="text-xs text-muted-foreground">{donation.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="healthcare-heading">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start btn-healthcare"
                onClick={() => navigate('/assistance')}
              >
                <HandHeart className="mr-2 h-4 w-4" />
                Duyệt yêu cầu hỗ trợ
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/donations')}
              >
                <Gift className="mr-2 h-4 w-4" />
                Quản lý quyên góp
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/patients')}
              >
                <Heart className="mr-2 h-4 w-4" />
                Xác minh bệnh nhân
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/charity')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Cập nhật tài nguyên
              </Button>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <Card className="healthcare-card mt-6">
            <CardHeader>
              <CardTitle className="healthcare-heading text-success">
                Tác động tích cực
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold text-success mb-1">127</div>
                <div className="text-sm text-muted-foreground">
                  Bệnh nhân đã được hỗ trợ
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">45.2M VNĐ</div>
                <div className="text-sm text-muted-foreground">
                  Tổng giá trị hỗ trợ
                </div>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <div className="text-sm font-medium text-success">
                  🏆 Tổ chức từ thiện xuất sắc tháng này!
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}