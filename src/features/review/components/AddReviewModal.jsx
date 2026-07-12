import React, { useState } from "react";
import "./AddReviewModal.css";

const AddReviewModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Cậu quên chọn số sao đánh giá kìa!");
      return;
    }
    if (content.trim().length === 0) {
      setError("Viết thêm chút cảm nhận nhé!");
      return;
    }

    setError("");
    onSubmit({ rating, content });
  };

  const handleClose = () => {
    // Reset lại form khi đóng
    setRating(0);
    setContent("");
    setError("");
    onClose();
  };

  return (
    <div className="rm-overlay" onClick={handleClose}>
      {/* Ngăn việc click vào khung trắng bên trong làm đóng Modal */}
      <div className="rm-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="rm-header">
          <h2 className="rm-title">Viết đánh giá của cậu</h2>
          <button className="rm-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* Khu vực chọn sao */}
        <div className="rm-star-group">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`rm-star ${(hover || rating) >= star ? "active" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Textarea nhập nội dung */}
        <textarea
          className="rm-textarea"
          placeholder="Cậu thấy quán này thế nào? Không gian, đồ uống..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError(""); // Đang gõ thì ẩn lỗi đi
          }}
        />
        
        {/* Hiển thị lỗi nếu có */}
        {error && <span className="rm-error-text">{error}</span>}

        <div className="rm-footer">
          <button 
            className="rm-btn rm-btn-cancel" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </button>
          <button 
            className="rm-btn rm-btn-submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AddReviewModal;