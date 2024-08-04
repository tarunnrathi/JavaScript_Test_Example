import React from "react";

const CricketSponser = ({
  _1xbetData,
  impression_tracker_logo,
  upload_image_mobile,
  click_tracker_logo,
  sponser_label,
}) => {
  return (
    <>
      {_1xbetData?.["associate-partner"]?.length > 0 && (
        <div className="betLogo">
          <ul>
            <li>
              <div
                className="heightZero"
                dangerouslySetInnerHTML={{
                  __html: impression_tracker_logo,
                }}
              />
              <a href={click_tracker_logo} target="_blank" rel="nofollow">
                <h3 className="heading"> {sponser_label}</h3>
                <img
                  style={{ height: "40px" }}
                  src={upload_image_mobile}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      )}
      {_1xbetData?.["co-presenting"]?.length > 0 && (
        <div className="betLogo">
          <ul>
            <li>
              <div
                className="heightZero"
                dangerouslySetInnerHTML={{
                  __html: impression_tracker_logo,
                }}
              />
              <a href={click_tracker_logo} target="_blank" rel="nofollow">
                <h3 className="heading"> {sponser_label}</h3>
                <img
                  style={{ height: "40px" }}
                  src={upload_image_mobile}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      )}
      <style jsx global>
        {
          `.heightZero {
             height: 0px;
          }`
        }
      </style>
    </>
  );
};

export default CricketSponser;
