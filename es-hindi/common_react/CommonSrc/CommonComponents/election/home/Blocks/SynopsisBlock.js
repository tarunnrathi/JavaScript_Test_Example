const SynopsisBlock = ({ label = "", text = "", synopsisLink = "" }) => {
  return (
    <>
      <div className="rswgtrsy">
        <h2>{label}</h2>
        <p>{text}</p>
      </div>
      <style jsx>{`
        .rswgtrsy {
          width: 100%;
          background: #2b85be;
          padding: 10px 20px;
          text-align: center;
          position: relative;
          top: -2px;
          min-height: 148px;
        }
        .rswgtrsy h2,
        .rswgtrsy h3 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 28px;
          line-height: 20px;
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .rswgtrsy p {
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
};

export default SynopsisBlock;
