const NewsBlock = ({ title, news = [], inverted, options = {} } = {}) => {
  return (
    <>
      <div className="rswgtnws">
        <h2 className="rswgtnwshd">
          <span>{title}</span>
        </h2>
        <ul>
          {news.map((item) => {
            return (
              <li>
                <a
                  target={options?.mode == "iframe" ? "_parent" : "_blank"}
                  href={!options?.anchor ? "" : item.link}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .rswgtnws {
          background: #${inverted ? "363636" : "f5f5f5"};
          border: ${inverted ? "none" : "1px dashed #acacac"};
          padding: 15px 20px 0 20px;
          width: 100%;
        }
        .rswgtnwshd {
          border-bottom: 2px solid #${inverted ? "FFCE00" : "e1261c"};
          color: #${inverted ? "FFCE00" : "e1261c"};
          font-size: 18px;
          line-height: 18px;
          font-weight: bold;
        }
        .rswgtnws ul li {
          font-size: 14px;
          font-weight: bold;
          font-style: italic;
          margin-top: 14px;
          line-height: 18px;
          position: relative;
          padding-left: 12px;
        }
        .rswgtnwshd span {
          background: #${inverted ? "363636" : "F5F5F5"};
          position: relative;
          top: 4px;
          padding-right: 5px;
          text-transform: uppercase;
        }
        .rswgtnws ul li:before {
          content: "";
          background: #${inverted ? "FFCE00" : "b9b9b9"};
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          top: 5px;
          left: 0px;
        }
        .rswgtnws ul li a {
          color: #${inverted ? "fff" : "001d42"};
          text-decoration: underline;
        }
        @media screen and (max-width: 480px) {
          .rswgtnws,
          .rswgtlvinl {
            padding: 15px 20px 15px 20px;
            margin-bottom: 10px;
          }
          .rswgtnws ul li {
            font-style: normal;
          }
        }
      `}</style>
    </>
  );
};

export default NewsBlock;
