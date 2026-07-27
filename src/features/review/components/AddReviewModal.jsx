import React, { useState } from "react";
import "./AddReviewModal.css";

const AddReviewModal = ({ onClose, onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);

  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...newFiles]);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveFile = (indexToRemove) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);

    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleClose = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    onClose();
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Vui lòng chọn số sao!");
      return;
    }
    if (content.trim() === "") {
      setError("Vui lòng viết một chút đánh giá!");
      return;
    }
    await onSubmit({ rating, content, files });
  };

  console.log("isSubmitting bên trong Modal =", isSubmitting);

  return (
    <div className="rm-overlay" onClick={handleClose}>
      <div className="rm-container" onClick={(e) => e.stopPropagation()}>
        <div className="rm-header">
          <h2 className="rm-title">Viết đánh giá của cậu</h2>
          <button
            className="rm-close-btn"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

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
            if (error) setError("");
          }}
          disabled={isSubmitting}
        />

        {/* Hiển thị lỗi ngay dưới textarea */}
        {error && <span className="rm-error-text">{error}</span>}

        {/* Khu vực chọn ảnh */}
        <div className="rm-upload-section">
          <input
            type="file"
            multiple
            
            onChange={handleFileChange}
            className="rm-file-input"
            disabled={isSubmitting}
          />

          {previewUrls.length > 0 && (
            <div className="rm-preview-grid">
              {previewUrls.map((url, index) => (
                <div key={index} className="rm-preview-item">
                  <button
                    type="button"
                    className="rm-btn-remove-img"
                    onClick={() => handleRemoveFile(index)}
                    title="Xóa ảnh này"
                    disabled={isSubmitting}
                  >
                    &times;
                  </button>
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="rm-preview-img"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
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
