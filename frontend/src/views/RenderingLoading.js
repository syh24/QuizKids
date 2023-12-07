import React from 'react';
import './LoadingSpinner.css'; // 스타일 파일 import

const RenderingLoading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading System Usage..</p>
    </div>
  );
};

export default RenderingLoading;