import React from "react";

const SponserMobile = ({ _1xbetData, isT20 = false }) => {
  const keys = Object.keys(_1xbetData || {}).filter(
    (key) => !key.includes("present")
  );
  const SpnnserArray = [];
  keys?.forEach((item) => {
    _1xbetData[item]?.length > 0 &&
      _1xbetData[item]?.forEach((newData) => {
        SpnnserArray.push(newData);
      });
  });

  return (
    <>
      <div className="electwrapmob">
        {_1xbetData?.["presents"]?.length > 0 && (
          <div className="elecprest">
            <div
              className="heightZero"
              dangerouslySetInnerHTML={{
                __html: _1xbetData?.["presents"][0]?.impression_tracker_logo,
              }}
            />
            <a href={_1xbetData?.["presents"][0]?.click_tracker_logo}>
              <img
                src={_1xbetData?.["presents"][0]?.upload_image_mobile}
                alt="sponser"
                width={"105px"}
                height={"55px"}
              />
              <div className="partnersHeading">
                {_1xbetData?.["presents"][0]?.sponser_label}
              </div>
            </a>
            <a href="/elections/">
              <img
                src="https://images.news18.com/dlxczavtqcctuei/news18/static/images/english/election_logo_115x55.svg"
                width={"105px"}
                height={"55px"}
                alt="election_logo_115x55.svg"
              />
            </a>
          </div>
        )}
        {keys?.length > 0 && (
          <div
            className="associat_partner associat_partner1"
            style={{ maxWidth: "188px" }}
          >
            <div className="glide_slide">
              <div className="track" data-glide-el="track">
                <marquee scrollamount={3}>
                  <ul className="slides">
                    {SpnnserArray?.map((singleData, index) => {
                      return (
                        <li
                          key={index}
                          className="slide"
                          style={{ color: "white" }}
                        >
                          <h3 className="heading">
                            <span style={{ color: "#727272" }}>
                              {singleData?.sponser_label || ""}
                            </span>
                          </h3>
                          <div id="bannerBox">
                            <div
                              className="heightZero"
                              dangerouslySetInnerHTML={{
                                __html: singleData?.impression_tracker_logo,
                              }}
                            />
                            <a
                              href={singleData?.click_tracker_logo}
                              target="_blank"
                              rel="nofollow"
                            >
                              <img
                                src={singleData?.upload_image_mobile}
                                alt={"text"}
                                title=""
                                width={"80px"}
                                height={"34px"}
                              />
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </marquee>
              </div>
            </div>
          </div>
        )}
        {/* <div className="associat_partner associat_partner1">
          <div className="aso_one glide_slide">
            <div className="track" data-glide-el="track">
              <ul className="slides">
                {_1xbetData?.["presenting-partner"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>PRESENTING PARTNER</span>
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
                {_1xbetData?.["presented-by"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>{singleData.sponser_label || "CO PARTNER"}</span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["co-presenting"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>{singleData.sponser_label || "CO PRESENTING"}</span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["co-powered-by"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>{singleData.sponser_label || "CO-POWERED BY"}</span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["lifestyle-partner"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>
                          {singleData.sponser_label || "LIFESTYLE PARTNER"}
                        </span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["technology-partner"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>
                          {singleData.sponser_label || "TECHNOLOGY PARTNER"}
                        </span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["associate-partner"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>
                          {singleData.sponser_label || "ASSOCIATE PARTNER"}
                        </span>
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
                            src={singleData.upload_image_mobile}
                            alt={"text"}
                            title=""
                          />
                        </a>
                      </div>
                    </li>
                  );
                })}
                {_1xbetData?.["car-insurance-partner"]?.map(
                  (singleData, index) => {
                    return (
                      <li
                        key={index}
                        className="slide"
                        style={{ color: "white" }}
                      >
                        <h3 className="heading">
                          <span>
                            {singleData.sponser_label || "CAR INSURANCE PARTNER"}
                          </span>
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
                              src={singleData.upload_image_mobile}
                              alt={"text"}
                              title=""
                            />
                          </a>
                        </div>
                      </li>
                    );
                  }
                )}
                {_1xbetData?.["destination-partner"]?.map(
                  (singleData, index) => {
                    return (
                      <li
                        key={index}
                        className="slide"
                        style={{ color: "white" }}
                      >
                        <h3 className="heading">
                          <span>
                            {singleData.sponser_label || "CAR INSURANCE PARTNER"}
                          </span>
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
                              src={singleData.upload_image_mobile}
                              alt={"text"}
                              title=""
                            />
                          </a>
                        </div>
                      </li>
                    );
                  }
                )}
                {_1xbetData?.["co-partner"]?.map(
                  (singleData, index) => {
                    return (
                      <li
                        key={index}
                        className="slide"
                        style={{ color: "white" }}
                      >
                        <h3 className="heading">
                          <span>
                            {singleData.sponser_label || "CAR INSURANCE PARTNER"}
                          </span>
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
                              src={singleData.upload_image_mobile}
                              alt={"text"}
                              title=""
                            />
                          </a>
                        </div>
                      </li>
                    );
                  }
                )}
                {_1xbetData?.["tyre-partner"]?.map((singleData, index) => {
                  return (
                    <li key={index} className="slide" style={{ color: "white" }}>
                      <h3 className="heading">
                        <span>{singleData.sponser_label || ""}</span>
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
                            src={singleData.upload_image_mobile}
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
        </div> */}
      </div>
      <style jsx global>
        {`
          .electwrapmob {
            display: flex;
            background-color: #f5f5f5;
            padding: 10px;
            border-bottom: 1px solid #000;
            justify-content: ${isT20 ? "right" : "right"};
            max-width: 100px;
            align-items: center;
          }
          .elecprest {
            margin: 0 7px 0 0;
            display: flex;
          }
          .elecprest .partnersHeading {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            margin: 0 2px;
            background: none;
            font-size: 9px;
            color: #727272;
            font-weight: bold;
            letter-spacing: 2.6px;
            transform: rotate(180deg);
          }
          .elecprest a {
            display: flex;
            align-items: center;
          }
          .electwrapmob .associat_partner .slide {
            padding: 0;
            overflow: visible;
            margin-top: 14px;
          }
        `}
      </style>
    </>
  );
};

export default SponserMobile;
