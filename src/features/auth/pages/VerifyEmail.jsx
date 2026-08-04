import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import useVerifyEmail from "../hooks/useVerifyEmail";
import Layout from "@/layouts/Layout";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isVerify, isLoading, error } = useVerifyEmail(token);

  // Tạo một wrapper để tái sử dụng layout ở giữa màn hình cho cả 3 state
  const StateContainer = ({ children }) => (
    <Layout>
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-[2rem] shadow-sm flex flex-col items-center text-center max-w-md w-full transition-all duration-300 hover:shadow-md">
          {children}
        </div>
      </div>
    </Layout>
  );

  // 1. STATE: LOADING
  if (isLoading) {
    return (
      <StateContainer>
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
        <h1 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
          Đang xác thực tài khoản...
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Hệ thống đang kiểm tra thông tin của bạn. Quá trình này chỉ mất vài giây.
        </p>
      </StateContainer>
    );
  }

  // 2. STATE: ERROR
  if (error) {
    return (
      <StateContainer>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
          Xác thực thất bại
        </h1>
        <p className="text-sm text-slate-500 mt-2 mb-8 px-4">
          {error || "Link xác thực đã hết hạn hoặc không hợp lệ. Vui lòng thử lại."}
        </p>
        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-full hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          <ArrowLeft size={16} />
          Quay lại trang Đăng ký
        </Link>
      </StateContainer>
    );
  }

  // 3. STATE: SUCCESS
  return (
    <StateContainer>
      {isVerify && (
        <>
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
            Xác thực thành công
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-8 px-4">
            Tuyệt vời! Tài khoản của bạn đã được kích hoạt thành công. Bây giờ bạn có thể khám phá Hoverse.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-slate-900 text-white font-semibold text-sm rounded-full hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Đến trang Đăng nhập
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </StateContainer>
  );
};

export default VerifyEmail;