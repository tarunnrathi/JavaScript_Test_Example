import React, { useEffect } from "react";

const BudgetIframePage = ({ device = "mobile" }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Start acrossScript Script
      const acrossScript = document.createElement("script");
      if (device === "desktop") {
        acrossScript.src = "/images/budgetAcrossSiteWidget_v9.js";
      } else {
        acrossScript.src = "/images/budgetAcrossSiteWidgetMobile_v9.js";
      }
      acrossScript.defer = true;
      document.body.appendChild(acrossScript);
      // End acrossScript Script
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="budgetWidgetWrap">
        <div id="budgetWidgetScrossSite">
          <div className="skele-2">
            <div className="skele-3 skeleton" />
            <ul className="skele-4">
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
              <li className="skeleton" />
            </ul>
            <div className="skele-5 skeleton" />
          </div>
        </div>
      </div>
      <style jsx>
        {`

        @font-face {
            font-family: 'Poppins-Regular';
            font-style: normal;
            font-weight: normal;
            src: local('Poppins-Regular'), url('/fonts/Poppins-Regular.ttf') format('woff');
        }

        @font-face {
            font-family: 'Poppins-Bold';
            font-style: bold;
            font-weight: bold;
            src: local('Poppins-Bold'), url('/fonts/Poppins-Bold.ttf') format('woff');
        }
          .budgetWidgetWrap {
            width: 1244px;
            margin: 20px auto 0;
            font-family: "Fira Sans", sans-serif;
          }

          @keyframes loader {
            from {
              background-position: -100% 0;
            }
            to {
              background-position: 100% 0;
            }
          }

          .skeleton {
            background: linear-gradient(
              90deg,
              hsl(210, 15%, 88%),
              hsl(210, 15%, 95%),
              hsl(210, 15%, 88%)
            );
            background-size: 200%;
            animation: loader 1s infinite reverse;
          }

          .skele-1 {
            width: 100%;
            height: 59px;
            border-bottom: 1px solid #fff;
          }

          .skele-2 {
            display: flex;
            height: 62px;
          }

          .skele-3 {
            width: 160px;
          }

          .skele-4 {
            width: 984px;
            background: #ddd;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .skele-4 li {
            width: 112px;
            height: 48px;
            margin: 0 5px;
            border-radius: 6px;
            flex-shrink: 0;
            list-style: none;
          }

          .skele-5 {
            flex-grow: 1;
          }

          @media screen and (max-width: 768px) {
            .budgetWidgetWrap {
              width: 100%;
            }

            /**skeleton start**/
            .skele-1 {
              height: 50px;
            }

            .skele-2 {
              flex-direction: column;
              height: auto;
            }

            .skele-3 {
              width: 100%;
              height: 38px;
              border-bottom: 1px solid #fff;
            }

            .skele-4 {
              width: 100%;
              height: 68px;
              border-bottom: 1px solid #fff;
            }

            .skele-5 {
              height: 29px;
            }

            /**skeleton end**/
          }
        `}
      </style>
    </>
  );
};

export default React.memo(BudgetIframePage);
