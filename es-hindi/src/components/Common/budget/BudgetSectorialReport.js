import React from "react";
import Slider from "react-slick";
import BudgetSectorialSponsorSlider from "./BudgetSectorialSponsorSlider";
import LazyLoadImage from "../CustomImage";

const BudgetSectorialReport = ({
  sectorialReports,
  sponsor = {},
  isMobile = false,
}) => {
  const sectorialSliderSettings = {
    slidesToShow:
      sectorialReports && sectorialReports?.length > 5
        ? 5
        : sectorialReports?.length,
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

  return (
    <>
      <div className="budget_container">
        <div className="sectoral_report_section">
          <p className="sectoral_report_title">
            <span>सेक्टोरल रिपोर्ट</span>
          </p>
          <div className="sectoral_report_slider">
            <Slider {...sectorialSliderSettings}>
              {sectorialReports &&
                sectorialReports.length !== 0 &&
                sectorialReports.map((sectorialReport, index) => {
                  const topBanner = sectorialReport?.tagData[0];
                  const bottomArticles = sectorialReport?.tagData.slice(1);
                  const tagSponsorName = `sectorial-widget-${sectorialReport.tagName}`;
                  const sectorialSponsor = sponsor[tagSponsorName];
                  return (
                    sectorialReport.tagData &&
                    sectorialReport.tagData.length !== 0 && (
                      <div className="sectoral_slider_row">
                        <div className="sectoral_row_top">
                          <a
                            href={`/tag/${sectorialReport.tagName}/`}
                            className="report_title"
                          >
                            {sectorialReport.heading}
                          </a>
                          {/* IMPRESSION TRACKER SCRIPTS ARE NOT WORKING FOR SLIDER INSIDE A SLIDER DUE TO THIS WE ARE RUNNING SCRIPTS SEPARATELY */}
                          {sectorialSponsor && (
                            <BudgetSectorialSponsorSlider
                              sliderId={`sectorialSlide-${index}`}
                              sponsor={sectorialSponsor}
                              isMobile={isMobile}
                            />
                          )}
                        </div>
                        <ul className="sectoral_content">
                          <li>
                            <a href={topBanner.weburl_r} target="_blank">
                              <LazyLoadImage
                                src={topBanner.images.url}
                                alt={topBanner.display_headline}
                                title={topBanner.display_headline}
                                height={150}
                                width={220}
                              />
                              <h3 className="sectoral_content_title">
                                {topBanner.display_headline}
                              </h3>
                            </a>
                          </li>
                          {bottomArticles &&
                            bottomArticles.length !== 0 &&
                            bottomArticles.map((tag, i) => {
                              return (
                                <li key={tag.story_id}>
                                  <a href={tag.weburl_r} target="_blank">
                                    <h3 className="sectoral_content_title">
                                      {tag.display_headline}
                                    </h3>
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                        <a
                          href={`/tag/${sectorialReport.tagName}/`}
                          className="sectoral_readmore"
                        >
                          + आगे पढ़ें
                        </a>
                      </div>
                    )
                  );
                })}
            </Slider>
          </div>
          {sectorialReports &&
            sectorialReports.length !== 0 &&
            sectorialReports.map((sectorialReport, index) => {
              const tagSponsorName = `sectorial-widget-${sectorialReport.tagName}`;
              const sectorialSponsor = sponsor[tagSponsorName];
              return (
                sectorialReport.tagData &&
                sectorialReport.tagData.length !== 0 &&
                sectorialSponsor && (
                  <BudgetSectorialSponsorSlider
                    sliderId={`sectorialSlide-${index}`}
                    sponsor={sectorialSponsor}
                    isMobile={isMobile}
                    runScripts={true}
                  />
                )
              );
            })}
        </div>
      </div>
      <style jsx global>{`
        .report_logo {
          width: 110px;
          text-align: center;
          position: relative;
        }

        .report_logo_slider {
          width: 100%;
          overflow: hidden;
        }

        .report_logo_slider .slick-track {
          display: flex;
          overflow: hidden;
        }

        .report_logo_slider .slick-list {
          overflow: hidden;
        }

        .report_logo_slider .slick-arrow:before,
        .report_logo_slider .slick-arrow:before,
        .report_logo_slider .slick-arrow:after,
        .report_logo_slider .slick-arrow:after {
          display: none !important;
        }

        .sectoral_report_title {
          background: #f6f6f6 0% 0% no-repeat padding-box;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #003b5b;
          text-transform: uppercase;
          margin-bottom: 40px;
          font-weight: bold;
          height: 42px;
          line-height: 42px;
        }
        ul.sectoral_content a {
          color: #001d42;
          text-decoration: none;
        }
        .sectoral_content_title {
          color: #282828;
          font-size: 14px;
          line-height: 20px;
          font-weight: normal;
          min-height: 60px;
        }
        .sectoral_row_top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .report_title {
          color: #e1261c;
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
        }
        ul.sectoral_content {
          list-style-type: none;
        }
        .sectoral_report_slider {
          width: 100%;
          outline: none;
        }
        .sectoral_report_slider .slick-track {
          overflow: hidden;
          display: flex;
          outline: none;
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
          margin: 0 0px;
          outline: none;
          border-right: 1px dashed #707070;
          padding: 0 10px !important;
        }
        ul.sectoral_content li {
          border-bottom: 1px solid #e0e0e0;
          padding: 10px 0;
        }
        .sectoral_content li:first-child .sectoral_content_title {
          font-size: 16px;
          font-weight: bold;
          line-height: 22px;
          padding-top: 10px;
          color: #001d42;
          min-height: 76px;
        }
        .sectoral_readmore {
          color: #e1261d;
          text-transform: uppercase;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          font-size: 13px;
          margin-top: 10px;
          position: relative;
          padding-bottom: 6px;
          font-weight: bold;
        }
        .sectoral_report_title span {
          background: #fff;
          padding: 0 15px;
          font-size: 28px;
          position: relative;
        }
        .sectoral_report_title span:after {
          content: "";
          background: #ff5b13;
          height: 3px;
          width: 50px;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -25px;
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
          outline: none;
          cursor: pointer;
          margin-bottom: 20px;
          background: #000000;
        }

        .sectoral_report_slider .slick-next {
          left: 36px;
          background: #ff5b13;
          border-radius: 0px 4px 4px 0px;
          border-left: 1px #a29e9e solid;
        }

        .sectoral_report_slider .slick-prev {
          right: 10px;
          border-radius: 4px 0px 0px 4px;
        }

        .sectoral_report_slider .slick-next:after {
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

        .sectoral_report_slider .slick-next:before {
          content: "";
          position: absolute;
          display: block;
          width: 10px;
          height: 2px;
          background: #fff;
          right: 7px;
          top: 19px;
        }

        .sectoral_report_slider .slick-prev:after {
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

        .sectoral_report_slider .slick-prev:before {
          content: "";
          position: absolute;
          display: block;
          width: 10px;
          height: 2px;
          background: #fff;
          right: 5px;
          top: 19px;
        }

        .report_logo_slider .slick-next {
          content: "";
          border-right: 2px solid #6e6e6e;
          border-top: 2px solid #6e6e6e;
          width: 8px;
          height: 8px;
          transform: rotate(45deg);
          cursor: pointer;
          display: block;
          right: 3%;
          top: 38%;
          left: unset !important;
          background: transparent !important;
          border-radius: unset !important;
          border-left: unset !important;
        }

        .report_logo_slider .slick-prev {
          content: "";
          border-left: 2px solid #6e6e6e;
          border-bottom: 2px solid #6e6e6e;
          width: 8px;
          height: 8px;
          transform: rotate(45deg);
          cursor: pointer;
          display: block;
          left: 3%;
          border-radius: unset !important;
          background: transparent !important;
          margin: unset;
          top: 29%;
          z-index: 1111;
        }

        .sectoral_row_top .report_slide {
          margin: auto !important;
        }

        @media screen and (max-width: 800px) {
          .report_title {
            font-size: 16px;
          }
          .sectoral_content_title {
            min-height: unset;
          }
          .sectoral_slider_row {
            border-right: none;
          }
          .sectoral_content figure {
            border-radius: 5px;
          }
          .sectoral_report_slider {
            padding: 0 10px;
          }
          .sectoral_report_slider .slick-list {
            padding: 0px 40px 0 120px !important;
          }
          .sectoral_report_title {
            margin-bottom: 20px;
          }
          .sectoral_report_title span {
            font-size: 20px;
          }
          .sectoral_report_section {
            margin-top: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default BudgetSectorialReport;
