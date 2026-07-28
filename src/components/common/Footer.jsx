import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {/* === TOP FOOTER: Dùng CSS Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Cột 1 & 2: Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link
              to="/"
              className="flex items-center transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-lg"
              aria-label="Về trang chủ Hoverse"
            >
              {/* Đồng bộ hoàn toàn với Logo trên Header */}
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
                Hoverse
              </h2>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-500 leading-relaxed">
              Khám phá những địa điểm vui chơi thú vị nhất dành cho giới trẻ tại
              TP.HCM. Trải nghiệm thực tế, đánh giá chân thực.
            </p>
          </div>

          {/* Cột 3: Khám phá */}
          <div>
            <h3 className="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider mb-4">
              Khám phá
            </h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {["Trang chủ", "Địa điểm mới", "Phổ biến nhất"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to="/"
                      className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-primary-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Cột 4: Dự án Portfolio */}
          <div>
            <h3 className="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider mb-4">
              Dự án Portfolio
            </h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              <li>
                <a
                  href="https://github.com/ntphoang"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-primary-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-sm"
                >
                  GitHub Profile ↗
                </a>
              </li>
              {["Báo cáo lỗi", "Điều khoản"].map((item, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-primary-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === BOTTOM FOOTER: Copyright & Developer Credit === */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Hoverse. All rights reserved.
          </p>

          <div className="text-sm text-slate-500 flex items-center gap-1.5">
            Phát triển bởi
            <a
              href="https://github.com/ntphoang"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-900 hover:text-primary-600 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-sm"
            >
              Nguyễn Trần Phi Hoàng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
