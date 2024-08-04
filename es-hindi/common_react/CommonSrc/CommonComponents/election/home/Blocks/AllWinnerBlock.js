const AllWinnerBlock = ({
  head = "",
  headNext = "",
  subHead = "",
  url = "",
  options = {},
}) => {
  return (
    <>
      <a
        target={options?.mode == "iframe" ? "_parent" : "_blank"}
        href={!options?.anchor ? "" : url}
        className="rswgtrrbx frwnrs"
      >
        <div className="rswgtwnrs">
          <h3>
            <span>
              {head}
              <br />
              {headNext}
            </span>
            {subHead}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58.391 47.305"
          >
            <defs>
              <filter
                id="winner_icon"
                x="0"
                y="0"
                width="58.391"
                height="47.305"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodOpacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#winner_icon)">
              <path
                id="winner_icon-2"
                data-name="winner_icon"
                d="M5.5-12.8A27.344,27.344,0,0,0-3.652-11Q-8.68-9.2-9.2-5.5v3.7H20.2V-5.5Q19.68-9.2,14.652-11A27.344,27.344,0,0,0,5.5-12.8Zm0-3.7a7.3,7.3,0,0,0,5.156-2.148,7.049,7.049,0,0,0,2.063-5.2,7.049,7.049,0,0,0-2.062-5.2A7,7,0,0,0,5.5-31.109,7,7,0,0,0,.344-29.047a7.049,7.049,0,0,0-2.062,5.2,7.049,7.049,0,0,0,2.063,5.2A7.3,7.3,0,0,0,5.5-16.5Zm-18.3,2.32,4.469,2.75-1.2-5.156L-5.5-20.023l-5.328-.43-1.977-4.9-2.062,4.9-5.328.43,4.039,3.438-1.289,5.156Z"
                transform="translate(29.2 37.11)"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
      </a>
      <style jsx>{`
        .rswgtrrbx {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 153px;
          height: 153px;
          overflow: hidden;
          text-align: center;
          margin-bottom: 1px;
        }
        .frwnrs {
          background: #418100;
        }
        .rswgtwnrs {
          line-height: 0;
        }
        .rswgtwnrs h3 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 28px;
          line-height: 38px;
        }
        .rswgtwnrs h3 span {
          display: block;
          font-size: 14px;
          line-height: 16px;
        }
        .rswgtwnrs svg {
          width: 60px;
        }
        @media screen and (max-width: 480px) {
          .rswgtrrbx {
            width: 49.8%;
          }
        }
      `}</style>
    </>
  );
};

export default AllWinnerBlock;
