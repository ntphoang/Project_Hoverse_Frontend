import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">✨</span>
              <span className="logo-text">Hoverse</span>
            </Link>
            <p className="footer-description">
              Khám phá những địa điểm vui chơi thú vị nhất dành cho giới trẻ tại TP.HCM.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-heading">Khám phá</h4>
            <ul className="footer-list">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/">Địa điểm mới</Link></li>
              <li><Link to="/">Phổ biến nhất</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Dự án Portfolio</h4>
            <ul className="footer-list">
              <li><a href="https://github.com/ntphoang" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><Link to="/">Báo cáo lỗi</Link></li>
              <li><Link to="/">Điều khoản</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hoverse.</p>
          <p className="footer-developer">
            Phát triển bởi <strong>Nguyễn Trần Phi Hoàng</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;