
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { Language, Content, ChatMessage } from '../types';
import { getUmKalthoumResponse } from '../services/geminiService';

interface Props {
  lang: Language;
  content: Content;
}

export const AIChat: React.FC<Props> = ({ lang, content }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await getUmKalthoumResponse(input, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: lang === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'I apologize, an error occurred. Please try again.'
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="glass-strong rounded-3xl overflow-hidden relative">
      {/* AI label for transparency */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5">
        <Bot size={14} className="text-[#FF9D00]" />
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
          {lang === 'ar' ? 'مساعد ذكاء اصطناعي — لأغراض ترفيهية' : 'AI Assistant — For Entertainment Purposes'}
        </span>
      </div>

      {/* Messages area */}
      <div className="h-[400px] overflow-y-auto p-6 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF9D00]/10 flex items-center justify-center mb-4">
              <Sparkles className="text-[#FF9D00]" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {lang === 'ar' ? 'أهلاً بك، يا حبيبي' : 'Welcome, Habibi'}
            </h3>
            <p className="text-neutral-500 text-sm max-w-xs">
              {lang === 'ar'
                ? 'اسألني عن الموسيقى، حياتي، أو أغنياتي المحبوبة'
                : 'Ask me about my music, my life, or my beloved songs'}
            </p>
            <div className="flex gap-2 mt-6 flex-wrap justify-center">
              {[
                lang === 'ar' ? 'أخبريني عن إنت عمري' : 'Tell me about Enta Omri',
                lang === 'ar' ? 'ما هي فلسفتك في الغناء؟' : 'What is your singing philosophy?',
              ].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}
                  className="text-xs px-4 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-[#FF9D00] hover:border-[#FF9D00]/30 transition-all duration-200 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end chat-msg-user' : 'chat-msg-ai'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#FF9D00]/10 flex-shrink-0 flex items-center justify-center mt-1">
                <Sparkles size={14} className="text-[#FF9D00]" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
              ? 'bg-[#FF9D00] text-black rounded-tr-sm font-medium'
              : 'bg-white/5 text-neutral-300 rounded-tl-sm border border-white/5'
              }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mt-1">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 chat-msg-ai">
            <div className="w-8 h-8 rounded-full bg-[#FF9D00]/10 flex-shrink-0 flex items-center justify-center">
              <Sparkles size={14} className="text-[#FF9D00]" />
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-[#FF9D00]/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#FF9D00]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#FF9D00]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-white/5">
        <div className="flex gap-3 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'ar' ? 'اسأل أم كلثوم...' : 'Ask Um Kalthoum...'}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF9D00]/40 transition-colors"
            disabled={isLoading}
            aria-label={lang === 'ar' ? 'اكتب رسالتك' : 'Type your message'}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: input.trim() ? 'linear-gradient(135deg, #FF9D00, #D4AF37)' : 'rgba(255,255,255,0.05)' }}
            aria-label={lang === 'ar' ? 'إرسال' : 'Send message'}
          >
            <Send size={16} className={input.trim() ? 'text-black' : 'text-neutral-600'} />
          </button>
        </div>
      </div>
    </div>
  );
};
