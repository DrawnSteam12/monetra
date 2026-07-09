import "./loading-spinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>

      <p className="loading-spinner-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
