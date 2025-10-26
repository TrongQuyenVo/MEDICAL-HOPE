import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý ảo của MedicalHope+. Tôi có thể giúp bạn về:\n\n• Tìm hiểu về dịch vụ y tế miễn phí\n• Đặt lịch khám bệnh\n• Thông tin về bác sĩ tình nguyện\n• Quyên góp và hỗ trợ y tế\n• Hướng dẫn sử dụng hệ thống\n\nBạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const loginPrompt = user ? '' : '\n\nĐể sử dụng tính năng này, bạn cần [đăng ký](#/register) hoặc [đăng nhập](#/login).';

    if (input.includes('đặt lịch') || input.includes('appointment') || input.includes('lịch hẹn')) {
      if (!user) {
        return 'Để đặt lịch khám, bạn cần đăng ký tài khoản hoặc đăng nhập. Sau khi đăng nhập, bạn có thể:\n\n1. Vào mục "Bác sĩ" để tìm bác sĩ phù hợp\n2. Chọn bác sĩ và nhấn "Đặt lịch hẹn"\n3. Chọn thời gian phù hợp\n4. Điền thông tin và xác nhận\n\nBạn muốn tôi hướng dẫn cách đăng ký không?';
      }
      return `Để đặt lịch khám, ${user.fullName}, bạn có thể:\n\n1. Vào mục "Bác sĩ" để tìm bác sĩ phù hợp\n2. Chọn bác sĩ và nhấn "Đặt lịch hẹn"\n3. Chọn thời gian phù hợp\n4. Điền thông tin và xác nhận\n\nBạn có muốn tôi hướng dẫn chi tiết hơn không?`;
    }

    if (input.includes('bác sĩ') || input.includes('doctor')) {
      return 'Hệ thống có nhiều bác sĩ tình nguyện chuyên khoa:\n\n• Tim mạch\n• Da liễu\n• Nhi khoa\n• Thần kinh\n• Đa khoa\n\nTất cả đều là các bác sĩ giàu kinh nghiệm tình nguyện hỗ trợ miễn phí.' + (user ? `\n\n${user.fullName}, bạn muốn tìm bác sĩ chuyên khoa nào?` : '\n\nBạn có thể xem danh sách bác sĩ sau khi [đăng ký](#/register) hoặc [đăng nhập](#/login).');
    }

    if (input.includes('quyên góp') || input.includes('donation') || input.includes('ủng hộ')) {
      return 'Cảm ơn bạn muốn quyên góp! Bạn có thể:\n\n• Quyên góp tiền mặt\n• Quyên góp thiết bị y tế\n• Quyên góp thuốc men\n• Tình nguyện thời gian\n\nVào mục "Quyên góp" để xem các chiến dịch hiện tại. Mọi đóng góp đều được ghi nhận và sử dụng minh bạch.' + loginPrompt;
    }

    if (input.includes('hỗ trợ') || input.includes('giúp đỡ') || input.includes('assistance')) {
      if (!user) {
        return 'Để yêu cầu hỗ trợ y tế, bạn cần đăng ký tài khoản hoặc đăng nhập. Sau khi đăng nhập, bạn có thể:\n\n1. Tạo yêu cầu hỗ trợ trong mục "Hỗ trợ"\n2. Mô tả tình trạng và nhu cầu của bạn\n3. Đợi phê duyệt từ tổ chức từ thiện\n4. Nhận hỗ trợ sau khi được duyệt\n\nBạn muốn tôi hướng dẫn cách đăng ký không?';
      }
      return `Nếu bạn cần hỗ trợ y tế, ${user.fullName}, bạn có thể:\n\n1. Tạo yêu cầu hỗ trợ trong mục "Hỗ trợ"\n2. Mô tả tình trạng và nhu cầu của bạn\n3. Đợi phê duyệt từ tổ chức từ thiện\n4. Nhận hỗ trợ sau khi được duyệt\n\nChúng tôi sẽ kết nối bạn với các nguồn hỗ trợ phù hợp nhất.`;
    }

    if (input.includes('cảm ơn') || input.includes('thank')) {
      return `Rất vui được hỗ trợ${user ? `, ${user.fullName}` : ''}! 😊\n\nNếu bạn có thêm câu hỏi nào khác, đừng ngần ngại hỏi tôi. Chúc bạn sức khỏe!`;
    }

    if (input.includes('đăng ký') || input.includes('register') || input.includes('sign up')) {
      return 'Để đăng ký tài khoản trên MedicalHope+, bạn có thể:\n\n1. Nhấn vào nút "Đăng ký" trên trang chủ\n2. Điền thông tin cá nhân (họ tên, email, mật khẩu)\n3. Xác nhận email để kích hoạt tài khoản\n4. Đăng nhập và bắt đầu sử dụng các dịch vụ\n\nBạn muốn tôi hướng dẫn chi tiết hơn không?';
    }

    if (input.includes('đăng nhập') || input.includes('login') || input.includes('sign in')) {
      return 'Để đăng nhập vào MedicalHope+, bạn có thể:\n\n1. Nhấn vào nút "Đăng nhập" trên trang chủ\n2. Nhập email và mật khẩu\n3. Nhấn "Đăng nhập" để truy cập tài khoản\n\nNếu bạn chưa có tài khoản, bạn có thể [đăng ký](#/register). Bạn cần hỗ trợ thêm không?';
    }

    return `Tôi hiểu bạn đang cần hỗ trợ${user ? `, ${user.fullName}` : ''}. Tôi có thể giúp bạn về:\n\n• Tìm hiểu về dịch vụ y tế miễn phí\n• Đặt lịch khám với bác sĩ\n• Thông tin về các chuyên khoa\n• Quyên góp và nhận hỗ trợ\n• Sử dụng các tính năng của hệ thống\n\n${user ? 'Bạn có thể nói rõ hơn về vấn đề cần hỗ trợ không?' : 'Bạn có thể nói rõ hơn về vấn đề cần hỗ trợ, hoặc muốn tìm hiểu về cách đăng ký tài khoản không?'}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    'Đặt lịch khám bệnh',
    'Tìm bác sĩ chuyên khoa',
    'Quyên góp từ thiện',
    'Yêu cầu hỗ trợ y tế',
    ...(user ? [] : ['Đăng ký tài khoản']),
  ];

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.div
        className="fixed bottom-3 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="rounded-full w-14 h-14 bg-gradient-primary text-white shadow-lg hover:bg-primary/90"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-[32rem] z-50"
          >
            <Card className="healthcare-card h-full flex flex-col shadow-xl">
              <CardHeader className="p-4 bg-gradient-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center text-base">
                  <Bot className="mr-2 h-5 w-5" />
                  Trợ lý ảo MedicalHope+
                </CardTitle>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-start space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'bot' && (
                          <Avatar className="w-6 h-6 bg-gradient-primary">
                            <AvatarFallback>
                              <Bot className="h-3 w-3 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[70%] px-3 py-1.5 rounded-lg whitespace-pre-line text-sm ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        >
                          {message.content}
                        </div>

                        {message.type === 'user' && (
                          <Avatar className="w-6 h-6 bg-gradient-secondary">
                            <AvatarFallback>
                              <User className="h-3 w-3 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <Avatar className="w-6 h-6 bg-gradient-primary">
                        <AvatarFallback>
                          <Bot className="h-3 w-3 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted px-3 py-1.5 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" />
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex items-center space-x-2 mt-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 text-sm h-9"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="btn-healthcare h-9 w-9 p-0"
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs h-8 py-1 px-2"
                      onClick={() => setInputValue(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}