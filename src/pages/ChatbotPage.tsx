import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage if available
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages
      ? JSON.parse(savedMessages, (key, value) => {
        if (key === 'timestamp') return new Date(value);
        return value;
      })
      : [
        {
          id: '1',
          type: 'bot',
          content:
            'Xin chào! Tôi là trợ lý ảo của MedicalHope+. Tôi có thể giúp bạn về:\n\n' +
            '• Tìm hiểu về dịch vụ y tế miễn phí\n' +
            '• Đặt lịch khám bệnh\n' +
            '• Thông tin về bác sĩ tình nguyện\n' +
            '• Quyên góp và hỗ trợ y tế\n' +
            '• Hướng dẫn sử dụng hệ thống\n' +
            '• Hoặc bất kỳ câu hỏi nào khác!\n\n' +
            'Bạn cần hỗ trợ gì hôm nay?',
          timestamp: new Date(),
        },
      ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  // Initialize Google Generative AI
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('VITE_GEMINI_API_KEY không được định nghĩa trong .env');
  }
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  // Available models
  const [availableModel, setAvailableModel] = useState<string>('gemini-1.5-pro');

  // Check available models
  useEffect(() => {
    const listAvailableModels = async () => {
      if (!genAI) {
        console.error('Không thể liệt kê mô hình: Khóa API Gemini bị thiếu.');
        return;
      }
      try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey, {
          method: 'GET',
        });
        const data = await response.json();
        const models = data.models || [];
        const preferredModel = models.find((m: any) => m.name.includes('gemini-1.5-pro')) || models.find((m: any) => m.name.includes('gemini-pro'));
        setAvailableModel(preferredModel ? preferredModel.name : 'gemini-pro');
      } catch (error) {
        console.error('Lỗi khi liệt kê mô hình:', error);
      }
    };
    listAvailableModels();
  }, [genAI]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

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

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!genAI) {
        throw new Error('Khóa API Gemini bị thiếu. Vui lòng liên hệ hỗ trợ.');
      }

      const model = genAI.getGenerativeModel({
        model: availableModel,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          },
        ],
      });

      const conversationHistory = messages
        .slice(-5)
        .map((msg) => `${msg.type === 'user' ? 'Người dùng' : 'MedicalHope+'}: ${msg.content}`)
        .join('\n');

      const prompt = `
        Bạn là trợ lý y tế tên MedicalHope+, trả lời bằng tiếng Việt, ngắn gọn, thân thiện, và đúng ngữ cảnh. 
        Nếu câu hỏi liên quan đến y tế hoặc hệ thống MedicalHope+ (dịch vụ y tế miễn phí, đặt lịch khám, bác sĩ tình nguyện, quyên góp, hỗ trợ y tế), hãy trả lời chi tiết và hướng dẫn cụ thể:
        - Đặt lịch khám: Hướng dẫn vào mục "Bác sĩ" để chọn bác sĩ và thời gian.
        - Quyên góp: Đề cập đến các chiến dịch trong mục "Quyên góp".
        - Hỗ trợ y tế: Hướng dẫn tạo yêu cầu trong mục "Hỗ trợ".
        - Nếu người dùng chưa đăng nhập, nhắc họ đăng ký hoặc đăng nhập.
        Nếu câu hỏi không liên quan đến y tế, hãy trả lời một cách tự nhiên, chính xác, và hữu ích, phù hợp với ngữ cảnh.
        Ngôn ngữ đầu vào có thể không phải tiếng Việt, nhưng luôn trả lời bằng tiếng Việt.
        Lịch sử hội thoại:
        ${conversationHistory}
        User: ${user ? user.fullName : 'Khách'} (role: ${user?.role || 'none'})
        Câu hỏi: ${userMessage.content}
      `;

      let retryCount = 0;
      const maxRetries = 2;
      let responseText = '';

      while (retryCount <= maxRetries) {
        try {
          const result = await model.generateContent(prompt);
          responseText = await result.response.text();
          break;
        } catch (error) {
          if (retryCount === maxRetries) throw error;
          retryCount++;
          console.warn(`Thử lại lần ${retryCount} do lỗi:`, error);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Lỗi khi gọi AI:', error);
      const errorMessage =
        error.message.includes('API key')
          ? 'Hệ thống AI hiện không khả dụng. Vui lòng liên hệ hỗ trợ.'
          : error.message.includes('400')
            ? 'Yêu cầu AI không hợp lệ. Vui lòng thử lại hoặc liên hệ hỗ trợ.'
            : error.message.includes('404')
              ? 'Mô hình AI không khả dụng. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.'
              : 'Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu. Bạn có thể hỏi lại hoặc liên hệ hỗ trợ!';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
    'Thông tin sức khỏe chung',
  ];

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-3 right-4 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="rounded-full w-14 h-14 bg-gradient-primary text-white shadow-lg hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-3 right-3 w-80 md:w-96 h-[32rem] z-50"
          >
            <Card className="healthcare-card h-full flex flex-col shadow-xl">
              <CardHeader className="p-2 bg-gradient-primary text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center text-base">
                    <Bot className="mr-2 h-5 w-5" />
                    Trợ lý ảo MedicalHope+
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white/80"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
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
                      onClick={() => {
                        setInputValue(action);
                        handleSendMessage();
                      }}
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