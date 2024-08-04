import React from "react";

const EntertainmentLifestyleSponser = ({ _1xbetData }) => {
  return (
    <div className="sponsors_Wrp">
      <div className="associat_partner associat_partner1">
        <div className="aso_new glide_slide">
          <div className="track" data-glide-el="track">
            <ul className="slides">
              {_1xbetData?.["partner"]?.map((singleData, index) => {
                return (
                  <li key={index} className="slide" style={{ color: "white" }}>
                    <h3 className="heading">
                      <span>PARTNER</span>
                    </h3>
                    <div id="bannerBox">
                      <div
                        className="heightZero"
                        dangerouslySetInnerHTML={{
                          __html: singleData.impression_tracker_logo,
                        }}
                      />
                      <a
                        href={singleData.click_tracker_logo}
                        target="_blank"
                        rel="nofollow"
                      >
                        <img
                          src={singleData.uploaded_img_path}
                          alt={"text"}
                          title=""
                        />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentLifestyleSponser;
