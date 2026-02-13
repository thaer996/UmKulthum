
import React, { useState, useRef, useEffect } from 'react';
import { getUmKalthoumResponse } from '../services/geminiService';
import { Language, ChatMessage } from '../types';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';

interface Props {
  lang: Language;
  content: any;
}

export const AIChat: React.FC<Props> = ({ lang, content }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getUmKalthoumResponse(input, lang);
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText || '' }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-md glow-border ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold text-[#FF9D00] ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {content.chatTitle}
          </h3>
          <p className="text-neutral-500 text-sm mt-1">{content.chatDescription}</p>
        </div>
        <Sparkles className="text-[#FF9D00]" size={24} />
      </div>

      <div 
        ref={scrollRef}
        className="h-[400px] overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-4">
             <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
               <Sparkles size={32} />
             </div>
             <p className="text-center italic">{content.chatPlaceholder}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-[#FF9D00]' : 'bg-neutral-800'}`}>
              {m.role === 'user' ? <User size={16} className="text-black" /> : <Sparkles size={16} className="text-[#FF9D00]" />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#FF9D00]/10 text-white' : 'bg-neutral-800/50 text-neutral-300'}`}>
              {m.parts[0].text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center animate-pulse">
              <Sparkles size={16} className="text-[#FF9D00]" />
            </div>
            <div className="p-4 rounded-2xl bg-neutral-800/50 text-neutral-300 flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-xs italic opacity-50">Transcribing the stars...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-neutral-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={content.chatPlaceholder}
            className={`w-full bg-black/50 border border-neutral-800 rounded-full py-3 px-6 pr-14 focus:outline-none focus:border-[#FF9D00]/50 transition-all ${lang === 'ar' ? 'font-arabic' : ''}`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FF9D00] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
