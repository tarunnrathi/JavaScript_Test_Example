const Loader = ({ className }) => {
  return (
    <>
      <div className={className || "loader"}></div>
      <style jsx>{`
        .${className || "loader"} {
          border: 4px solid #fff;
          border-top: 4px solid #ccc;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
          left: 50%;
          top: 50%;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
