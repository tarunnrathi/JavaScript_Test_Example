import React from "react";

const Predictor = ({ data }) => {
  const predictor = data?.length ? data[0] : false;
  return (
    <>
      {predictor && <div className="daily_predictor">
        <div className="daily_predictor_tab">
          <div className="tab_link">
            <button className="w3-red">
              <p>{predictor.title}</p>
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: predictor?.iframe_code }}></div>
        </div>
      </div>}
      <style jsx>{`
        .daily_predictor {
          width: 300px;
          height: auto;
          background: #003e66 0% 0% no-repeat padding-box;
          margin: 10px 0;
        }
        .daily_predictor_tab {
          width: 100%;
        }
        .daily_predictor_tab iframe {
          width: 100%;
          height: 421px;
          border: 0;
          outline: none;
        }
        .tab_link {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px #4f91cd solid;
        }
        .tab_link button {
          width: 100%;
          background: transparent;
          outline: none;
          cursor: pointer;
          border: 0;
          font-family: "Lato", sans-serif;
          color: #ffffff;
          font-size: 14px;
          height: 35px;
          font-weight: bold;
        }
        .tab_link button span {
          font-size: 10px;
          color: #fff;
          font-weight: 300;
          opacity: 0.8;
        }
        .tab_link button p {
          color: #fff;
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 14px;
          font-weight: bold;
        }
        .tab_link button.w3-red {
            background: #4F91CD;
        }
      `}</style>
    </>
  );
};

export default Predictor;
