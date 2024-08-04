import React, { Fragment, useEffect } from "react";
import Glide from "@glidejs/glide";
import ReactHtmlParser from "html-react-parser";
import Head from "next/head";

function SponDynamic({
  once = false,
  sponData = {},
  isDesktop = true,
  isAmp,
  exclude,
  only,
}) {
  return (
    <>
      {sponData &&
        Object.keys(sponData).length > 0 &&
        Object.keys(sponData)
          .filter((label) => sponData[label].length > 0)
          .filter((label) =>
            only
              ? label.toLowerCase() === exclude
              : !(label.toLowerCase() === exclude)
          )
          .map((label, index) => (
            <Fragment key={index}>
              {!isAmp ? (
                <ul className={!isDesktop ? "glide__slides" : ""}>
                  {isDesktop && (
                    <li>
                      {
                        <span>
                          {sponData[label]?.[0]?.sponser_label ||
                            (label || "").replace(/-/, " ").toUpperCase()}
                        </span>
                      }
                    </li>
                  )}
                  {(index === 0 && sponData[label].length > 1) ||
                  (index === 1 && sponData[label].length > 2) ||
                  (index === 2 && sponData[label].length > 3) ||
                  (index > 2 && sponData[label].length > 1) ? (
                    <>
                      {!isDesktop ? (
                        <>
                          {sponData[label].map((item, dex) => {
                            return (
                              <li
                                key={`li-sponser-${dex}`}
                                className="glide__slide"
                              >
                                <span>
                                  {item?.sponser_label || item?.label}
                                </span>
                                <img
                                  src={
                                    item.upload_image_mobile ||
                                    item.mobile_img ||
                                    item.uploaded_img_path ||
                                    item.desktop_img
                                  }
                                  alt={item.sponser_label}
                                  title=""
                                />
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <li>
                          <div
                            className={`glide ${label} glide-sponsors-${index}`}
                          >
                            <div data-glide-el="track" className="glide__track">
                              <div className="glide__slides">
                                {sponData[label].map((item, ind) => {
                                  return (
                                    <div
                                      key={`sponser-${ind}-${index}`}
                                      className="glide__slide test"
                                    >
                                      {processImpression(item)}
                                      <a
                                        rel="nofollow"
                                        href={item.click_tracker_logo}
                                        target="_blank"
                                        style={{ marginRight: "5px" }}
                                      >
                                        {!isDesktop && !once && (
                                          <span>
                                            {item?.sponser_label || item?.label}
                                          </span>
                                        )}
                                        <img
                                          src={
                                            isDesktop
                                              ? item.uploaded_img_path ||
                                                item.desktop_img ||
                                                item.upload_image_mobile ||
                                                item.mobile_img
                                              : item.upload_image_mobile ||
                                                item.mobile_img ||
                                                item.uploaded_img_path ||
                                                item.desktop_img
                                          }
                                          alt={item.sponser_label}
                                          title=""
                                        />
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {sponData[label].map((item, dex) => (
                    <>
                      {((index === 0 && sponData[label].length <= 1) ||
                        (index === 1 && sponData[label].length <= 2) ||
                        (index === 2 && sponData[label].length <= 3) ||
                        (index > 2 && sponData[label].length === 1)) &&
                      sponData[label].length ? (
                        <>
                          {!isAmp && (
                            <Head>
                              <link
                                rel="preload"
                                href={
                                  isDesktop ? item.desktop_img : item.mobile_img
                                }
                                as="image"
                              />
                            </Head>
                          )}
                          <li key={dex}>
                            {processImpression(item)}
                            <a
                              rel="nofollow"
                              href={item.click_tracker_logo}
                              target="_blank"
                            >
                              {!isDesktop && !once && (
                                <span>
                                  {item?.sponser_label || item?.label}
                                </span>
                              )}
                              <img
                                src={
                                  isDesktop
                                    ? item.uploaded_img_path ||
                                      item.desktop_img ||
                                      item.upload_image_mobile ||
                                      item.mobile_img
                                    : item.upload_image_mobile ||
                                      item.mobile_img ||
                                      item.uploaded_img_path ||
                                      item.desktop_img
                                }
                                alt={item.sponser_label}
                                title="Test"
                              />
                            </a>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </ul>
              ) : (
                <>
                  {sponData[label].map((item, dex) => (
                    <a
                      className="slide"
                      href={item.click_tracker_logo}
                      target="_blank"
                      key={dex}
                    >
                      <div className="caption">
                        {item?.sponser_label || item.label}
                      </div>
                      <amp-img
                        src={item.upload_image_mobile}
                        width="105"
                        height="45"
                        layout="responsive"
                      ></amp-img>
                    </a>
                  ))}
                </>
              )}
            </Fragment>
          ))}
    </>
  );
}

const processImpression = (item) => {
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

function HeaderSponsors({
  sponData,
  isDesktop,
  isMobile,
  isAmp,
  exclude,
  only,
  background,
  isWomenWorldCupPage = false,
}) {
  if (sponData == "" || !sponData || !Object.keys(sponData).length) {
    return null;
  }

  sponData = Object.keys(sponData).reduce(
    (p, i) =>
      Object.assign(p, {
        [i]: sponData[i].filter((k) => k.uploaded_img_on_off == "1"),
      }),
    {}
  );

  const sponArr = Object.keys(sponData).filter(
    (label) => sponData[label].length > 0
  );
  const sponsorSize = sponArr.length;
  let oneSize, sponOne, sponTwo;

  if (sponsorSize == 1) {
    oneSize = sponData[Object.keys(sponData)[0]].length;
  } else {
    sponOne = { data: [] };
    sponTwo = { data: [] };
    sponArr.forEach((item, index) => {
      const d = sponData[item].map((i) => ({ ...i, label: item }));

      if (index % 2 == 0) {
        sponOne["data"].push(...d);
      } else {
        sponTwo["data"].push(...d);
      }
    });
  }

  const ampTrackerList = [];
  if (isAmp) {
    Object.keys(sponData).forEach((item) => {
      sponData[item].forEach((val) => {
        if (val.amp_tracker_sponser && val.amp_tracker_sponser != "") {
          ampTrackerList.push(val.amp_tracker_sponser);
        }
      });
    });
  }

  useEffect(() => {
    if (!isMobile) {
      document.querySelector(".glide.glide-sponsors-0") &&
        new Glide(".glide.glide-sponsors-0", {
          type: "carousel",
          perView: 1,
          autoplay: 2000,
          gap: 0,
        })?.mount();

      document.querySelector(".glide.glide-sponsors-1") &&
        new Glide(".glide.glide-sponsors-1", {
          type: "carousel",
          perView: 2,
          autoplay: 2000,
          gap: 0,
        })?.mount();

      document.querySelector(".glide.glide-sponsors-2") &&
        new Glide(".glide.glide-sponsors-2", {
          type: "carousel",
          perView: 3,
          autoplay: 2000,
          gap: 0,
        })?.mount();

      document.querySelector(".glide.glide-sponsors-3") &&
        new Glide(".glide.glide-sponsors-3", {
          type: "carousel",
          perView: 1,
          autoplay: 2000,
          gap: 0,
        })?.mount();
    }

    if (isMobile) {
      new Glide(".spnsrd-slider-one", {
        type: "carousel",
        perView: isWomenWorldCupPage ? 1 : oneSize && oneSize > 1 ? 2 : 1,
        autoplay:
          sponOne && sponOne["data"] && sponOne["data"].length < 2
            ? 0
            : oneSize && oneSize <= 2
            ? 0
            : 2000,
        gap: 0,
      }).mount();
    }

    if (isMobile && sponTwo) {
      new Glide(".spnsrd-slider-two", {
        type: "carousel",
        perView: 1,
        autoplay: sponTwo["data"].length > 1 ? 2000 : 0,
        gap: 0,
      }).mount();
    }
  }, []);

  return (
    <>
      {isDesktop && !only && (
        <div className="iplhdr-sponsors">
          <SponDynamic
            sponData={sponData}
            exclude={exclude}
            only={only}
            isDesktop={true}
          />
        </div>
      )}
      {/* {isDesktop && only && (
        <div className="iplhdr-sponsors solo-spon">
          <div data-glide-el="track">
            <SponDynamic sponData={sponData} exclude={exclude} only={only}/>
          </div>
        </div>
      )} */}
      {isMobile && (
        <div className="outer-spnsrd-slider">
          <div className="spnsrd-slider spnsrd-slider-one">
            {oneSize && (
              <span>
                {(Object.keys(sponData)[0] || "")
                  .replace(/-/, " ")
                  .toUpperCase()}
              </span>
            )}
            <div data-glide-el="track">
              <SponDynamic
                sponData={sponOne ? sponOne : sponData}
                once={oneSize}
                isDesktop={false}
              />
            </div>
          </div>
          {sponTwo && (
            <div className="spnsrd-slider spnsrd-slider-two">
              <div data-glide-el="track">
                <SponDynamic
                  sponData={sponTwo}
                  once={false}
                  isDesktop={false}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {isAmp && (
        <>
          <div className="hidesp">
            {ampTrackerList.map((item) => ReactHtmlParser(item))}
          </div>
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
                <SponDynamic
                  sponData={sponOne ? sponOne : sponData}
                  once={false}
                  isDesktop={false}
                  isAmp={true}
                />
              </amp-carousel>
            </div>
            {sponTwo && (
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
                  <SponDynamic
                    sponData={sponTwo}
                    once={false}
                    isDesktop={false}
                    isAmp={true}
                  />
                </amp-carousel>
              </div>
            )}
          </div>
        </>
      )}
      {!isAmp ? (
        <style jsx global>
          {`
            .glide__track {
              ${isWomenWorldCupPage ? "height: 55px;overflow: hidden;" : ""}
            }
            .iplhdr-sponsors {
              font-size: 0px;
              // max-width: 250px;
              margin-left: auto;
              display: flex;
              justify-content: flex-end;
              margin-top: 25px;
              font-size: 0px;
              align-items: baseline;
            }
            .iplhdr-sponsors ul {
              justify-content: flex-start;
              display: flex;
              position: relative;
              margin-left: 22px;
            }
            .iplhdr-sponsors ul li:last-child a {
              margin-right: 0;
            }
            .iplhdr-sponsors ul:first-child {
              margin-left: 0px;
            }
            .iplhdr-sponsors ul li img {
              width: 105px;
              height: 45px;
            }
            .iplhdr-sponsors ul:first-child li img {
              width: 140px;
              height: 60px;
            }
            .iplhdr-sponsors ul:nth-child(2) li img {
              width: 126px;
              height: 54px;
            }
            .iplhdr-sponsors ul:nth-child(3) li img {
              width: 105px;
              height: 45px;
            }
            .iplhdr-sponsors ul:nth-child(4) li img {
              width: 105px;
              height: 45px;
            }
            .iplhdr-sponsors ul li:first-child {
              position: absolute;
              top: -18px;
              left: 0;
              right: 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .iplhdr-sponsors ul li {
              margin-left: 0;
            }
            .iplhdr-sponsors ul li {
              color: #fff;
              font-size: 11px;
              text-transform: uppercase;
            }
            .iplhdr-sponsors ul li:first-child:after {
              content: "";
              width: 100%;
              height: 2px;
              background: rgba(225, 225, 225, 0.7);
              margin-right: 5px;
            }
            li a img {
              background: #fff;
            }

            .iplhdr-sponsors ul li a img {
              width: 105px;
              height: 45px;
            }
            a img {
              border: none;
            }
            .iplhdr-sponsors ul li a {
              display: block;
              overflow: hidden;
              background: #fff;
              margin-right: 5px;
            }

            .iplhdr-sponsors ul li a {
              line-height: 0;
            }
            .iplhdr-sponsors ul li:first-child span {
              margin-right: 5px;
              flex-shrink: 0;
            }

            .spnsrd-slider {
              position: relative;
              overflow: hidden;
              width: ${oneSize && oneSize > 1 ? "215px" : "105px"};
              ${!isWomenWorldCupPage ? "margin-left: 10px;" : ""}
              font-size: 0px;
              background-color: ${isMobile ? "none" : "#ffffff"};
              // right: -10px;
            }
            #header {
              height: 60px !important;
            }
            .spnsrd-slider ul {
              display: flex;
              font-size: 0px;
            }
            .spnsrd-slider ul li {
              margin: 0px !important;
              ${isMobile ? "text-align: center;" : ""}
            }
            .spnsrd-slider ul li a {
              line-height: 0;
            }
            .spnsrd-slider ul li a span,
            .spnsrd-slider span {
              display: block;
              color: ${isMobile ? "#fff" : "#000"};
              text-transform: uppercase;
              font-size: 9px;
              line-height: 13px;
              text-align: center;
            }

            .spnsrd-slider span {
              width: ${oneSize && oneSize > 1 ? "50%" : "100%"};
            }

            .spnsrd-slider ul li a img {
              ${isDesktop
                ? `width: auto;
                display: block;`
                : `              
                width: 95px;
                `}
              height: auto;
              margin: auto;
            }
            ${isMobile
              ? `img {
                max-width:100%;
            }`
              : ""}
            .outer-spnsrd-slider {
              display: flex;
              justify-content: flex-end;
              ${!isWomenWorldCupPage ? "padding: 10px 0;" : ""}
              border-bottom: 1px solid #ececec;
              ${isWomenWorldCupPage
                ? "background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Women_World_Cup_2022_bg_M.jpg) no-repeat top center; height:60px;"
                : ""}
            }
            .outer-spnsrd-slider .spnsrd-slider span {
              margin: 0 auto;
            }
            .iplhdr-sponsors .glide__track {
              width: 110px;
              max-height: 46px;
              overflow: hidden;
              padding: 0;
            }
            .iplhdr-sponsors .glide-sponsors-0 .glide__track {
              width: 145px;
              max-height: 62px;
              overflow: hidden;
              padding: 0;
            }
            .iplhdr-sponsors .glide-sponsors-1 .glide__track {
              width: 252px;
              max-height: 56px;
              overflow: hidden;
              padding: 0;
            }
            .iplhdr-sponsors .glide-sponsors-2 .glide__track {
              width: 315px;
              max-height: 46px;
              overflow: hidden;
              padding: 0;
            }
            .iplhdr-sponsors .glide-sponsors-3 .glide__track {
              width: 110px;
              max-height: 46px;
              overflow: hidden;
              padding: 0;
            }
            .glide-sponsors-0 .glide__slide,
            .glide-sponsors-1 .glide__slide,
            .glide-sponsors-2 .glide__slide,
            .glide-sponsors-3 .glide__slide,
            .iplhdr-sponsors .glide__slide {
              display: inline-block;
            }
          `}
        </style>
      ) : (
        <style jsx global>
          {`
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
              margin-right: 5px;
              color: #fff;
            }
            .spnsrd-slider .amp-carousel-button {
              display: none;
            }
            .spnsrd-slider .caption {
              display: block;
              text-transform: uppercase;
              font-size: 9px;
              line-height: 13px;
              text-align: center;
            }
            .sponsor-div {
              border-bottom: 1px solid #ececec;
              display: flex;
              justify-content: flex-end;
              padding: 10px 0;
            }

            .sponsor-div {
              ${background?.mob ? background.mob : ""}
              background-size: cover;
            }
            .hidesp {
              height: 0px;
              overflow: hidden;
            }
            .sponsor-div .caption {
              color: #fff;
            }
          `}
        </style>
      )}
    </>
  );
}

export default React.memo(HeaderSponsors);
