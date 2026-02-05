import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm the AuthentiView AI assistant. I can help you understand how our fake review detection works, explain analysis results, or answer any questions about our methodology. What would you like to know?",
  },
];

const quickQuestions = [
  "How accurate is the detection?",
  "What makes a review suspicious?",
  "How does rating analysis work?",
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses (will be replaced with Lovable AI integration)
  const getSimulatedResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes("accurate") || lowerQ.includes("accuracy")) {
      return "Our system achieves 98.7% accuracy on our test dataset by combining multiple analysis layers: NLP text analysis, behavioral pattern detection, rating time-series analysis, and graph-based collusion detection. Each layer contributes to a weighted final score.";
    }
    
    if (lowerQ.includes("suspicious") || lowerQ.includes("fake")) {
      return "Reviews are flagged as suspicious based on several factors:\n\n• **Templated Language**: Generic phrases copied across reviews\n• **Extreme Sentiment**: Overly positive without specific details\n• **Timing Patterns**: Reviews posted in coordinated bursts\n• **Reviewer History**: Account shows unusual behavior patterns\n\nEach factor is explained in our analysis results.";
    }
    
    if (lowerQ.includes("rating")) {
      return "Rating analysis examines the distribution and timing of ratings for a product:\n\n• **Spike Detection**: Unusual surges in reviews over short periods\n• **Distribution Analysis**: Whether ratings follow natural patterns\n• **Stability Score**: How consistent ratings are over time\n\nManipulated products often show sudden rating changes that don't correlate with normal market events.";
    }
    
    if (lowerQ.includes("collusion") || lowerQ.includes("ring")) {
      return "We use graph-based analysis to detect reviewer collusion:\n\n• Create a network of reviewers and products they've reviewed\n• Identify communities of reviewers who consistently review the same products\n• Flag unusual overlap patterns suggesting coordinated behavior\n\nThis helps identify fake review rings operating together.";
    }
    
    if (lowerQ.includes("data") || lowerQ.includes("privacy")) {
      return "AuthentiView only analyzes publicly available review data. We don't store personal information, and all analysis is done in real-time. Our system is designed with privacy and ethical AI principles in mind.";
    }
    
    return "That's a great question! Our system uses a multi-layered approach combining NLP, behavioral analysis, and graph algorithms. Each analysis includes explanations so you can understand why decisions were made. Is there a specific aspect you'd like me to elaborate on?";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = getSimulatedResponse(input);
    const assistantMessage: Message = { role: "assistant", content: response };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-trust shadow-glow flex items-center justify-center z-50 transition-all duration-300 hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageSquare className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[500px] rounded-2xl glass shadow-elevated z-50 flex flex-col overflow-hidden transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-trust">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground">AuthentiView AI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-2",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "user" ? "bg-primary" : "bg-accent"
                )}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[75%] p-3 rounded-xl text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-secondary p-3 rounded-xl rounded-bl-sm">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleQuickQuestion(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about our analysis..."
              className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
