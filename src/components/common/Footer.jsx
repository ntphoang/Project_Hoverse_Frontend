import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10">
        {/* === TOP FOOTER === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {/* Cột 1: Cộng đồng Zalo */}
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider mb-4">
              Cộng đồng Hoverse
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 p-3.5 w-full max-w-sm">
              <img
                src="https://res.cloudinary.com/ty4mmnvd/image/upload/v1792943166/1792942709515_2133962965037564730_g4520870598449709082_0ed7bde1e28dde30fbe41702b9f8e4d6_iib1ga.jpg"
                alt="QR Code Zalo Hoverse"
                className="w-16 h-16 shrink-0 object-cover rounded-xl shadow-sm border border-slate-200 bg-white"
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  Tham gia nhóm Zalo để cùng đóng góp ý kiến phát triển dự án.
                </p>
                <a
                  href="https://zalo.me/g/p5ynttcsehelodsui98e"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  Tham gia ngay
                </a>
              </div>
            </div>
          </div>

          {/* Cột 2: Khám phá */}
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
                      className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Cột 3: Dự án Portfolio */}
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
                  className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-sm"
                >
                  GitHub Profile ↗
                </a>
              </li>
              <li>
                <a
                  href="https://zalo.me/g/p5ynttcsehelodsui98e"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-sm"
                >
                  Báo cáo lỗi ↗
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="inline-block text-sm text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-sm"
                >
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* === BOTTOM FOOTER: Copyright & Developer Credit === */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Hoverse. All rights reserved.
          </p>

          <div className="text-sm text-slate-500 flex items-center gap-1.5">
            Phát triển bởi
            <a
              href="https://github.com/ntphoang"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-sm"
            >
              Nguyễn Trần Phi Hoàng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
