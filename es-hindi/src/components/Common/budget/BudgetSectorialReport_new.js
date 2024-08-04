import React from "react";
import Slider from "react-slick";
import LazyLoadImage from "../CustomImage";

const IMAGEURL = "https://images.news18.com/static_news18/pix/ibnhome/news18/";
const BudgetSectorialReport = ({
  sectorialReports: sectorialData,
  sponsor,
  isMobile = false,
}) => {
  const sliderSettings = {
    slidesToShow:
      sectorialData && sectorialData?.length > 5 ? 5 : sectorialData?.length,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          variableWidth: false,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };
  const sponsorSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    dots: false,
    autoplay: 1000,
  };

  return (
    <>
      <div className="budget_container sectorial_report">
        <div className="sectoral_report_section">
          <p className="sectoral_report_title">
            <span>Sectoral Report</span>
          </p>
          <div className="sectoral_report_slider">
            <Slider {...sliderSettings}>
              {sectorialData.map((sectorFinalData, index) => {
                const tagSponsorName = `sectorial-widget-${sectorFinalData.tagName}`;
                let sectorialSponsor = sponsor?.[tagSponsorName] || [];
                if (
                  typeof sectorialSponsor === "object" &&
                  !Array.isArray(sectorialSponsor)
                ) {
                  sectorialSponsor = Object.values(sectorialSponsor).map(
                    (data) => (Array.isArray(data) ? data[0] : data)
                  );
                }
                return (
                  <div className="sectoral_slider_row" key={index}>
                    <div className="sectoral_row_top">
                      <a
                        href={`/tag/${sectorFinalData.tagName}/`}
                        className="report_title"
                        tabindex="0"
                      >
                        {sectorFinalData.heading}
                      </a>
                      <Slider {...sponsorSliderSettings}>
                        {(sectorialSponsor || []).map(
                          (sponsorPartner, subIndex) => {
                            return (
                              <React.Fragment key={subIndex}>
                                {Boolean(
                                  sponsorPartner?.uploaded_img_on_off
                                ) && (
                                  <a
                                    href={sponsorPartner.click_tracker_sponser}
                                    target="_blank"
                                    className="report_logo"
                                    key={subIndex}
                                  >
                                    <img
                                      src={
                                        isMobile
                                          ? sponsorPartner.mobile_img
                                          : sponsorPartner.desktop_img
                                      }
                                      width={80}
                                      height={35}
                                      alt={sponsorPartner?.sponser_name}
                                      title={sponsorPartner?.sponser_name}
                                    />
                                  </a>
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </Slider>
                    </div>
                    <ul className="sectoral_content">
                      {sectorFinalData.tagData.map((sectorData, tagIndex) => {
                        let title = "";
                        let imageUrl = "";
                        let url = "";
                        title = sectorData?.headline || "";
                        imageUrl =
                          typeof sectorData?.images.url !== "undefined" &&
                          sectorData?.images.url !== ""
                            ? sectorData?.images.url
                            : IMAGEURL + "images/default-218x145.jpg";
                        url = sectorData?.weburl_r || "";
                        return (
                          <>
                            {tagIndex === 0 ? (
                              <li>
                                <a href={url} tabindex="0" key={tagIndex}>
                                  <LazyLoadImage
                                    src={imageUrl}
                                    alt={title}
                                    title={title}
                                    height={150}
                                    width={220}
                                  />
                                  <h3 className="sectoral_content_title">
                                    {title}
                                  </h3>
                                </a>
                              </li>
                            ) : (
                              <li>
                                <a href={url} tabindex="0">
                                  <h3 className="sectoral_content_title">
                                    {title}
                                  </h3>
                                </a>
                              </li>
                            )}
                          </>
                        );
                      })}
                    </ul>
                    <a
                      href={`/tag/${sectorFinalData.tagName}/`}
                      className="sectoral_readmore"
                    >
                      + आगे पढ़ें
                    </a>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sectoral_report_title {
            font-weight: 800;
            background: #f6f6f6 0 0 no-repeat padding-box;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0;
            color: #003b5b;
            font-size: 46px;
            text-transform: uppercase;
            line-height: 40px;
            margin-bottom: 25px;
            position: relative;
          }
          .sectoral_report_title:after {
            content: "";
            width: 40px;
            height: 6px;
            background: #ff5b13 0 0 no-repeat padding-box;
            position: absolute;
            bottom: -15px;
            left: 0;
            right: 0;
            margin: auto;
          }
          ul.sectoral_content a {
            color: #001d42;
            text-decoration: none;
          }
          .sectoral_content_title {
            color: #282828;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            min-height: 60px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .tav_calculate iframe {
            width: 100%;
            height: 480px;
          }
          a.report_logo {
            height: 30px;
          }
          .sectoral_row_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            min-height: 44px;
          }
          .sectoral_row_top .slick-slider {
            min-width: 0;
            min-height: 30px;
            max-width: 80px;
          }
          .tracker {
            display: none;
          }
          .report_title {
            color: #e1261c;
            text-decoration: none;
            font-size: 16px;
            font-weight: 700;
          }
          ul.sectoral_content {
            list-style-type: none;
          }
          .sectoral_report_slider {
            width: 100%;
            outline: 0;
            overflow: hidden;
          }
          .sectoral_report_slider .slick-track {
            overflow: hidden;
            display: flex;
            outline: 0;
          }
          .sectoral_report_section {
            width: 100%;
            overflow: hidden;
            margin-top: 40px;
            position: relative;
            padding-bottom: 90px;
            border-bottom: 6px solid #d2d2d2;
            margin-bottom: 40px;
          }
          .sectoral_content img {
            width: 100%;
            display: block;
          }
          .sectoral_slider_row {
            margin: 0 0;
            outline: 0;
            border-right: 1px dashed #707070;
            padding: 0 10px;
          }
          ul.sectoral_content li {
            border-bottom: 1px solid #e0e0e0;
            padding: 10px 0;
          }
          ul.sectoral_content li:first-child {
            padding-top: 2px;
          }
          .sectoral_content li:first-child .sectoral_content_title {
            font-size: 16px;
            line-height: 22px;
            padding-top: 10px;
            color: #001d42;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            height: 76px;
            overflow: hidden;
            font-weight: 700;
          }
          .sectoral_readmore {
            letter-spacing: 0.22px;
            color: #e1261d;
            text-transform: uppercase;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            font-size: 11px;
            margin-top: 10px;
            position: relative;
            padding-bottom: 6px;
            font-weight: 700;
          }
          .sectoral_readmore:after {
            content: "";
            width: 69px;
            height: 1px;
            background: #e1261c 0 0 no-repeat padding-box;
            position: absolute;
            bottom: 4px;
            left: -1px;
            right: -10px;
            margin: auto;
          }
          .sectoral_report_title span {
            background: #fff;
            padding: 0 10px;
          }
          .sectoral_report_slider .slick-arrow {
            position: absolute;
            bottom: 0;
            margin: auto;
            left: 0;
            right: 0;
            width: 23px;
            height: 36px;
            font-size: 0;
            outline: 0;
            cursor: pointer;
            margin-bottom: 20px;
            background: #000;
            border: none;
          }
          .sectoral_report_slider .slick-next.slick-arrow {
            left: 36px;
            background: #000;
            border-radius: 0 4px 4px 0;
            border-left: 1px #a29e9e solid;
          }
          .sectoral_report_slider .slick-prev.slick-arrow {
            right: 10px;
            border-radius: 4px 0 0 4px;
          }
          .sectoral_report_slider .slick-arrow:focus {
            background: #ff5b13;
          }
          .sectoral_report_slider .slick-next.slick-arrow:after {
            border-right: 2px solid #fff;
            border-top: 2px solid #fff;
            width: 4px;
            height: 4px;
            transform: rotate(45deg);
            top: 17px;
            right: 5px;
            content: "";
            position: absolute;
            display: block;
          }
          .sectoral_report_slider .slick-next.slick-arrow:before {
            content: "";
            position: absolute;
            display: block;
            width: 10px;
            height: 2px;
            background: #fff;
            right: 7px;
            top: 19px;
          }
          .sectoral_report_slider .slick-prev.slick-arrow:after {
            border-right: 2px solid #fff;
            border-top: 2px solid #fff;
            width: 4px;
            height: 4px;
            transform: rotate(226deg);
            top: 17px;
            left: 6px;
            content: "";
            position: absolute;
            display: block;
          }
          .sectoral_report_slider .slick-prev.slick-arrow:before {
            content: "";
            position: absolute;
            display: block;
            width: 10px;
            height: 2px;
            background: #fff;
            right: 5px;
            top: 19px;
          }
        `}
      </style>
    </>
  );
};

export default BudgetSectorialReport;
