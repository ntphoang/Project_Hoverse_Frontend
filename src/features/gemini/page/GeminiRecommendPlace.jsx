import { useState, useRef, useEffect } from "react";
import useRecommendPlace from "../hooks/useRecommendPlace";
import Layout from "@/layouts/Layout";
import GeminiPlaceItem from "../components/GeminiPlaceItem";
import { Sparkles, Send, Loader2, Bot, Map } from "lucide-react";
import { useAuthStore } from "@/store";

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
    "Quán cà phê yên tĩnh để học bài ở Gò Vấp",
    "Địa điểm hẹn hò lãng mạn cuối tuần",
    "Quán trà sữa có view đẹp sống ảo",
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
    <Layout>
      <main className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col relative">
        <div className="flex-1 overflow-y-auto pt-10 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* TRẠNG THÁI 1: CHƯA CHAT */}
            {!hasStartedChat && (
              <div className="flex flex-col items-center text-center mt-10 md:mt-20 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-2xl mb-6 border border-primary-100 shadow-sm">
                  <Bot className="w-10 h-10 text-primary-600" />
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight mb-4">
                  Xin chào, {user.fullName}!
                </h1>
                <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  Bạn muốn tìm địa điểm như thế nào hôm nay? Hãy mô tả phong
                  cách, không gian hoặc vị trí bạn mong muốn.
                </p>

                {/* Gợi ý tĩnh khi chưa chat */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserPrompt(sug);
                        sendPrompt(sug);
                      }}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-full shadow-sm hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 hover:-translate-y-0.5 transition-all"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TRẠNG THÁI 2: ĐANG TẢI */}
            {isPending && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-in fade-in duration-300">
                <Sparkles className="w-10 h-10 animate-pulse text-primary-500 mb-4" />
                <p className="font-heading font-bold text-slate-700 text-lg">
                  Gemini đang phân tích dữ liệu...
                </p>
                <p className="text-sm mt-1">
                  Đang tìm kiếm những địa điểm phù hợp nhất với yêu cầu của bạn.
                </p>
              </div>
            )}

            {/* TRẠNG THÁI 3: ĐÃ CÓ KẾT QUẢ */}
            {isSuccess && places.length > 0 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  <h2 className="text-xl font-heading font-bold text-slate-900">
                    Đây là các gợi ý tốt nhất dành cho bạn:
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {places.map((place) => (
                    <GeminiPlaceItem key={place.id} place={place} />
                  ))}
                </div>
              </div>
            )}

            {/* TRẠNG THÁI 4: KHÔNG TÌM THẤY */}
            {isSuccess && places.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Map className="w-8 h-8 text-slate-300" />
                </div>
                <p className="font-heading font-bold text-slate-900 text-lg mb-1">
                  Chưa tìm thấy địa điểm phù hợp
                </p>
                <p className="text-sm font-medium text-slate-500 max-w-sm text-center">
                  Rất tiếc, hệ thống chưa có dữ liệu khớp với mô tả của bạn. Hãy
                  thử một từ khóa khác nhé.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* KHU VỰC NHẬP LIỆU */}
        <div className="fixed bottom-0 left-0 right-0 z-30 pt-10 pb-6 px-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
          <div className="max-w-3xl mx-auto w-full">
            <div className="relative w-full shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-white border border-slate-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-primary-50 rounded-lg">
                <Sparkles className="w-4 h-4 text-primary-600" />
              </div>

              <input
                ref={inputRef}
                type="text"
                className="w-full h-14 md:h-16 pl-14 pr-16 bg-transparent rounded-2xl text-slate-900 text-sm md:text-base font-medium placeholder:text-slate-400 focus:outline-none"
                placeholder="Hỏi Gemini tìm quán cafe, trà sữa, quán ăn..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isPending}
              />

              <button
                type="button"
                onClick={handleSendRequest}
                disabled={userPrompt.trim().length === 0 || isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 ml-0.5" />
                )}
              </button>
            </div>

            <p className="text-center text-[11px] font-medium text-slate-400 mt-3">
              Gemini có thể đưa ra thông tin không chính xác, vì vậy hãy kiểm
              chứng lại đánh giá của cộng đồng.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default GeminiRecommendPlace;
