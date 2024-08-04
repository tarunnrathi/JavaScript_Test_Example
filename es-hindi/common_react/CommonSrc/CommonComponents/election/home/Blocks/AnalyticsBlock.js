const AnalyticsBlock = ({ head, subHead, url, options }) => {
  return (
    <>
      <a
        target={options?.mode == "iframe" ? "_parent" : "_blank"}
        href={!options?.anchor ? "" : url}
        className="rswgtrrbx fralxa"
      >
        <div className="rswgtelxa">
          <h3>
            {head}
            <span>{subHead}</span>
          </h3>
          <svg
            id="Elexa_icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 55 57.05"
          >
            <defs>
              <filter
                id="Path_30"
                x="6.42"
                y="36.614"
                width="42.233"
                height="20.436"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodOpacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_30)">
              <path
                id="Path_30-2"
                data-name="Path 30"
                d="M36.465,38.926l-.625-.949a22.4,22.4,0,0,0-4.885-.75h0V36.94H17.939v.287h0a22.4,22.4,0,0,0-4.885.75l-.625.949c-.25.162,0,.45.412.45H36.053C36.453,39.376,36.715,39.089,36.465,38.926Z"
                transform="translate(3.09 5.67)"
                fill="#cfd8dc"
              />
            </g>
            <path
              id="Path_25"
              data-name="Path 25"
              d="M28.169,30.745l-5.084-.675L18,30.745l-.35,1.986H28.518Z"
              transform="translate(4.416 3.956)"
              fill="#90a4ae"
            />
            <path
              id="Path_26"
              data-name="Path 26"
              d="M28.725,32.2H17.857L16.82,38.121H29.762Z"
              transform="translate(4.209 4.493)"
              fill="#b0bec5"
            />
            <path
              id="Path_27"
              data-name="Path 27"
              d="M36.465,38.926l-.625-.949a22.4,22.4,0,0,0-4.885-.75h0V36.94H17.939v.287h0a22.4,22.4,0,0,0-4.885.75l-.625.949c-.25.162,0,.45.412.45H36.053C36.453,39.376,36.715,39.089,36.465,38.926Z"
              transform="translate(3.09 5.674)"
              fill="#cfd8dc"
            />
            <rect
              id="Rectangle_42"
              data-name="Rectangle 42"
              width="55"
              height="34.881"
              rx="0.17"
              fill="#edf3f5"
            />
            <rect
              id="Rectangle_43"
              data-name="Rectangle 43"
              width="49.104"
              height="30.032"
              transform="translate(2.948 2.411)"
              fill="#68787a"
            />
            <path
              id="Path_28"
              data-name="Path 28"
              d="M37.443,5.25H2.94V33.957h47.5V5.25Z"
              transform="translate(0.733 -2.252)"
              fill="#2a445d"
            />
            <path
              id="Path_29"
              data-name="Path 29"
              d="M2.94,5.6V33.87h47.5v-.212Z"
              transform="translate(0.733 -2.165)"
              fill="#bdbdbd"
              opacity="0.41"
              style={{ mixBlendMode: "overlay", isolation: "isolate" }}
            />
            <rect
              id="Rectangle_44"
              data-name="Rectangle 44"
              width="5.846"
              height="10.106"
              transform="translate(6.484 18.366)"
              fill="#a6dae8"
            />
            <rect
              id="Rectangle_45"
              data-name="Rectangle 45"
              width="5.846"
              height="15.391"
              transform="translate(13.501 13.067)"
              fill="#f94e63"
            />
            <rect
              id="Rectangle_46"
              data-name="Rectangle 46"
              width="5.846"
              height="20.288"
              transform="translate(20.514 8.167)"
              fill="#17c5cc"
            />
            <rect
              id="Rectangle_47"
              data-name="Rectangle 47"
              width="5.846"
              height="11.593"
              transform="translate(27.515 16.866)"
              fill="#ffd740"
            />
            <rect
              id="Rectangle_48"
              data-name="Rectangle 48"
              width="5.846"
              height="16.19"
              transform="translate(34.928 12.279)"
              fill="#fff"
            />
            <rect
              id="Rectangle_49"
              data-name="Rectangle 49"
              width="5.846"
              height="11.83"
              transform="translate(41.945 16.629)"
              fill="#ff6f00"
            />
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
        .fralxa {
          background: #ff465d;
        }
        .rswgtelxa {
          line-height: 0;
        }
        .rswgtelxa h3 {
          color: #ffffff;
          font-size: 28px;
          line-height: 38px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .rswgtelxa h3 span {
          display: block;
          font-size: 14px;
          line-height: 16px;
        }
        .rswgtelxa svg {
          width: 55px;
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

export default AnalyticsBlock;
