import { useState, useRef, useEffect } from "react";
import useRecommendPlace from "../hooks/useRecommendPlace";
import Layout from "@/layouts/Layout";
import GeminiPlaceItem from "../components/GeminiPlaceItem";
import { Sparkles, Send, Loader2, Bot, Map } from "lucide-react";
import { useAuthStore } from "@/store";
import Header from "@/components/common/Header";

const GeminiRecommendPlace = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const {
    mutate: sendPrompt,
    data,
    isPending,
    isSuccess,
  } = useRecommendPlace();
  const inputRef = useRef(null);
  const user = useAuthStore((state) => state.user);

  const places =
    data?.map((place) => ({
      ...place.placeContextRequestDTO,
      reason: place.reason,
    })) || [];

  const SUGGESTIONS = [
    "Bánh tráng trộn gần IUH",
    "Tiệm lạp xưởng nướng đá",
    "Trà trái cây, sinh tố",
  ];

  const handleSendRequest = () => {
    if (userPrompt.trim().length === 0 || isPending) return;
    sendPrompt(userPrompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendRequest();
  };

  useEffect(() => {
    if (isSuccess && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSuccess]);

  const hasStartedChat = isPending || isSuccess;

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col min-h-0 relative z-0 mt-2 md:mt-4">
        {/* KHU VỰC HIỂN THỊ KẾT QUẢ / LỜI CHÀO */}
        <div className={`flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 custom-scrollbar ${!hasStartedChat ? 'flex flex-col justify-center pb-20' : 'pt-2 pb-4'}`}>
          <div className="max-w-5xl mx-auto w-full">
            
            {!hasStartedChat && (
              <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500 px-2">
                <div className="inline-flex items-center justify-center p-3 md:p-4 bg-primary-50 rounded-2xl mb-4 md:mb-6 border border-primary-100 shadow-sm">
                  <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight mb-3 md:mb-4">
                  Xin chào, {user.fullName || (user.email).split("@")[0]}!
                </h1>
                <p className="text-slate-500 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                  Bạn muốn tìm địa điểm như thế nào hôm nay? Hãy mô tả phong cách, không gian hoặc vị trí bạn mong muốn.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 md:mt-8 max-w-2xl">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserPrompt(sug);
                        sendPrompt(sug);
                      }}
                      className="px-3.5 py-1.5 md:px-4 md:py-2 bg-white border border-slate-200 text-slate-600 text-xs md:text-sm font-medium rounded-full shadow-sm hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isPending && (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 animate-in fade-in duration-300">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 animate-pulse text-primary-500 mb-3" />
                <p className="font-heading font-bold text-slate-700 text-base md:text-lg text-center">Gemini đang phân tích dữ liệu...</p>
              </div>
            )}

            {isSuccess && places.length > 0 && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-500 h-full justify-center">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {places.map((place) => (
                    <GeminiPlaceItem key={place.id} place={place} />
                  ))}
                </div>
              </div>
            )}

            {isSuccess && places.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 bg-white rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-300 px-4">
                <Map className="w-10 h-10 text-slate-300 mb-3" />
                <p className="font-heading font-bold text-slate-900 text-base mb-1 text-center">Chưa tìm thấy địa điểm</p>
                <p className="text-xs font-medium text-slate-500 text-center">Rất tiếc, hãy thử một từ khóa khác nhé.</p>
              </div>
            )}
          </div>
        </div>

        {/* KHU VỰC NHẬP LIỆU */}
        <div className="shrink-0 w-full px-4 sm:px-6 lg:px-8 pt-2 pb-4 md:pb-6 bg-slate-50">
          <div className="max-w-3xl mx-auto w-full relative">
            <div className="relative w-full shadow-sm hover:shadow-md transition-shadow rounded-2xl md:rounded-full bg-white border border-slate-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
              
              <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 p-1.5 bg-primary-50 rounded-lg md:rounded-full">
                <Sparkles className="w-4 h-4 text-primary-600" />
              </div>

              <input
                ref={inputRef}
                type="text"
                className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-14 md:pr-16 bg-transparent rounded-2xl md:rounded-full text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none"
                placeholder="Hỏi Gemini tìm quán cafe, trà sữa..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isPending}
              />

              <button
                type="button"
                onClick={handleSendRequest}
                disabled={userPrompt.trim().length === 0 || isPending}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 md:p-2.5 bg-slate-900 text-white rounded-xl md:rounded-full hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </div>
            <p className="text-center text-[10px] md:text-[11px] font-medium text-slate-400 mt-2 px-2">
              Gemini có thể đưa ra thông tin không chính xác, vì vậy hãy kiểm chứng lại.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeminiRecommendPlace;