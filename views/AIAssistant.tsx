import React, { useState, useRef, useEffect } from 'react';
import { ViewState, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User, ArrowLeft, Loader2 } from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const AIAssistantView: React.FC<Props> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm Dr. Bashir's virtual assistant. I can help with clinic timings, location, or general health questions. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm z-10">
        <button onClick={() => onNavigate(ViewState.HOME)} className="text-slate-500">
           <ArrowLeft size={24} />
        </button>
        <div>
           <h2 className="font-bold text-slate-800 flex items-center gap-2">
             <Bot size={20} className="text-primary-600" /> Virtual Assistant
           </h2>
           <p className="text-xs text-slate-500">Powered by Gemini AI</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-32"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
              <Loader2 className="animate-spin text-primary-500" size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[70px] left-0 right-0 p-4 bg-white border-t border-slate-200 max-w-md mx-auto">
        <div className="flex items-center gap-2">
           <input 
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Ask a question..."
             className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
           />
           <button 
             onClick={handleSend}
             disabled={isLoading || !input.trim()}
             className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 disabled:opacity-50 transition-colors"
           >
             <Send size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};