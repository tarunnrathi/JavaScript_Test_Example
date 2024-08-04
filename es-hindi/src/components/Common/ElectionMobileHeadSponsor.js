import React, { useMemo, useEffect } from "react";
import Glide from "@glidejs/glide";

function HeaderSponsors({ sponData, isAmp }) {
  const mapSponData = (spoData) => {
    const data = [];
    if (spoData && Object.keys(spoData).length) {
      const keys = [
        "co-presenting",
        "co-powered-by",
        "lifestyle-partner",
        "technology-partner",
        "associate-partner",
        "car-insurance-partner",
      ];

      keys.map((eachData) => {
        if (spoData[eachData] && spoData[eachData].length) {
          sponData[eachData].forEach((e) => {
            data.push(e);
          });
        }
      });
    }
    return data;
  };

  const sponserData = useMemo(() => [...mapSponData(sponData)], []);

  const processImpression = (item, isAmp = false) => {
    try {
      const script = document.createElement("script");
      const showscript = document.createElement("script");
      const div = document.createElement("div");
      script.defer = true;

      const data = /googletag.defineSlot\('(.*?),(.*?]),(.*?)\)/gim.exec(
        item.impression_tracker_sponser
      );
      if (data && data[0]) {
        const i = data[3] ? data[3].replace(/'/gim, "").trim() : "";
        script.innerHTML = `
      window.googletag = window.googletag || {cmd: []};
      window.googletag.cmd.push(function() {
        ${data[0]}.addService(window.googletag.pubads());
        googletag.display(${i});
      });
    `;

        div.setAttribute("id", i);
        showscript.innerHTML = `
      window.googletag = window.googletag || {cmd: []};
      window.googletag.cmd.push(function() {
        googletag.display('${i}');
      });
      `;
        div.appendChild(showscript);
        document.head.appendChild(script);
        document.head.appendChild(div);
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    if (!isAmp && sponserData && sponserData.length) {
      new Glide(".election-sponsors-head-mobile", {
        type: "carousel",
        perView: 1,
        autoplay: 2000,
        gap: 0,
      }).mount();
    }
  }, [sponserData]);

  return (
    <>
      {!isAmp ? (
        <>
          {sponserData && sponserData.length ? (
            <>
              <div className="election-sponsors-head-mobile">
                <div
                  data-glide-el="track"
                  className={`${!isAmp ? "glide__track" : ""}`}
                >
                  <ul className={`${!isAmp ? "glide__slides" : ""}`}>
                    {sponserData.map((eachData, index) => {
                      return (
                        <>
                          <li
                            key={`spons${index}`}
                            className={`${!isAmp ? "glide__slide" : ""}`}
                          >
                            {processImpression(eachData)}
                            <span>
                              {eachData?.sponser_label?.toUpperCase() || ""}
                            </span>
                            <a
                              rel="nofollow"
                              href={eachData.click_tracker_logo}
                              target="_blank"
                            >
                              {!isAmp ? (
                                <img
                                  src={eachData.upload_image_mobile}
                                  // src={`https://via.placeholder.com/105x45`}
                                  alt="logo"
                                />
                              ) : (
                                <amp-img
                                  src={eachData.upload_image_mobile}
                                  // src={`https://via.placeholder.com/105x45`}
                                  width="105"
                                  height="45"
                                  layout="responsive"
                                ></amp-img>
                              )}
                            </a>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <style jsx global>{`
                .wapper {
                  overflow: hidden;
                }
                .election-sponsors-head-mobile {
                  max-width: 115px;
                  max-height: 70px;
                  overflow: hidden;
                }
                .election-sponsors-head-mobile li {
                  display: inline-block;
                  width: ${isAmp ? `105px` : ""};
                }
                .election-sponsors-head-mobile > div {
                  width: ${isAmp ? `105px` : "110px"};
                  overflow: ${isAmp ? `scroll` : "hidden"};
                  ${!isAmp ? "max-height: 69px;" : ""}
                }

                .election-sponsors-head-mobile ul {
                  width: ${isAmp ? `${105 * sponserData.length}px` : ""};
                  display: ${isAmp ? "flex" : ""};
                  justify-content: ${isAmp ? "flex-start" : ""};
                }
                .election-sponsors-head-mobile > div span {
                  font-size: 7px;
                  text-align: center;
                  display: block;
                  margin-right: 5px;
                  line-height: 10px;
                }
                .election-sponsors-head-mobile > div img {
                  width: 105px;
                  height: 45px;
                  margin-right: 5px;
                  margin-bottom: ${isAmp ? `5px` : ""};
                }
              `}</style>
            </>
          ) : null}
        </>
      ) : (
        <>
          <div className="sponsor-div">
            <div className="spnsrd-slider">
              <amp-carousel
                width="105"
                height="60"
                layout="responsive"
                autoplay=""
                type="slides"
                delay="2000"
                role="region"
                aria-label="Carousel with autoplay"
              >
                {sponserData.map((eachData, dex) => (
                  <a
                    rel="nofollow"
                    className="slide"
                    href={eachData.click_tracker_logo}
                    target="_blank"
                  >
                    {processImpression(eachData, true)}
                    <span>{eachData?.sponser_label?.toUpperCase() || ""}</span>
                    {/* <div className="caption">{eachData?.sponser_label?.toUpperCase() || ""}</div> */}
                    <amp-img
                      src={eachData.upload_image_mobile}
                      // src={`https://via.placeholder.com/105x45`}
                      width="105"
                      height="45"
                      alt="logo"
                      layout="responsive"
                    ></amp-img>
                  </a>
                ))}
              </amp-carousel>
            </div>
          </div>
          <style jsx global>{`
            .sponsor-div > div span {
              font-size: 7px;
              text-align: center;
              display: block;
              margin-right: 5px;
              line-height: 10px;
            }
            .sponsor-div {
              border-bottom: 1px solid #ececec;
              display: flex;
              justify-content: flex-end;
              padding: 3px 0;
              transform: translateX(6px);
              max-width: 115px;
              max-height: 70px;
              overflow: hidden;
            }
            .spnsrd-slider ul li a span {
              background: none;
              color: #fff;
              font-size: 9px;
            }
            .spnsrd-slider ul li {
              text-align: center;
            }
            .spnsrd-slider {
              height: 55px;
              width: 105px;
              // margin-right: 5px;
              color: #fff;
            }
            .spnsrd-slider .amp-carousel-button {
              display: none;
            }
            .spnsrd-slider .caption {
              display: block;
              text-transform: uppercase;
              font-size: 7px;
              line-height: 10px;
              text-align: center;
              color: #fff;
            }
          `}</style>
        </>
      )}
    </>
  );
}

export default React.memo(HeaderSponsors);
