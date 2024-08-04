const moment = require("moment");

import getConfig from "next/config";

export default function ElectionTrivia({ triviaData, elecSponserData }) {
  if (triviaData === undefined || Object.keys(triviaData).length === 0 || triviaData === []) {
    return null;
  }
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  let sponsorDataForWidgetsTrivia = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsTrivia = Object.values(elecSponserData);
  }

  return (
    <>
      <div className="elec-glblhd under_border">
        <a href={`/assembly-elections/trivia${mainUrlParam}`} target="_blank">
          <h2>चुनाव <span>से जुड़ी सामान्य जानकारी</span></h2>
        </a>
        { sponsorDataForWidgetsTrivia != "" && sponsorDataForWidgetsTrivia != undefined && sponsorDataForWidgetsTrivia[0] != undefined &&
        sponsorDataForWidgetsTrivia[0][0].uploaded_img_on_off == "1" &&
          <div className="add_rhs">
            <span>{sponsorDataForWidgetsTrivia[0][0].sponser_name}</span>
            <div className="add_rhs_row">
              <a href={sponsorDataForWidgetsTrivia[0][0].click_tracker_sponser}>
                <amp-img src={sponsorDataForWidgetsTrivia[0][0].desktop_img} alt={sponsorDataForWidgetsTrivia[0][0].sponser_name} title={sponsorDataForWidgetsTrivia[0][0].sponser_name} width={94} height={40} />
              </a>
              {sponsorDataForWidgetsTrivia[0][0].amp_tracker_sponser !== "" ? (
                <div style={{ height: "1px" }} dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsTrivia[0][0].amp_tracker_sponser }}></div>
              ) : ("")}
            </div>
          </div>
        }
      </div>
      <div className="triviaSliderOuter">
        <div className="triviaSlider">
          <amp-carousel
            id="custom-button"
            width="400"
            height="150"
            layout="responsive"
            type="slides"
            loop=""
            autoplay=""
            delay="2000"
            role="region"
            aria-label="Carousel with custom button styles"
          >
            {triviaData.map((trivia) => {
              return (
                <div>
                  <span className="highlight-date">{moment(trivia.date_time).format("MMMM DD,YYYY")}</span>
                  <a href={trivia.story_url || ""} target="_blank">{trivia.headline}</a>
                </div>
              );
            })}
          </amp-carousel>
        </div>
      </div>

      <style jsx>{`
        .triviaSliderOuter {
          border: 1px solid #b6b4b4;
          position: relative;
          margin-bottom:20px;
        }
        .triwid_icon {
          position: absolute;
          right: -14px;
          background: #ffffff;
          top: -24px;
          padding: 0 8px 8px;
        }
        .triwid_icon span {
          background: #ebebeb;
          width: 50px;
          height: 50px;
          display: flex;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
        }
        .triviaSlider {
          position: relative;
          overflow: hidden;
          margin: 10px 15px;
        }
        .triviaSlider ul {
          display: flex;
          margin-bottom: 10px;
        }
        .triviaSlider ul li a {
          font-weight: 600;
          display: block;
          overflow: hidden;
          font-size: 14px;
          color: #001d42;
          line-height: 22px;
          text-align: center;
        }
        .triviaSlider ul li a:hover {
          color: #e1261c;
        }
        .triviaSliderBullets {
          display: flex;
          justify-content: center;
        }
        .triviaSliderBullets button {
          border: none;
          padding: 0px;
          background: #b0b0b0;
          width: 16px;
          height: 4px;
          border-radius: 20px;
          margin: 0 3px;
          cursor: pointer;
        }
        .triviaSliderBullets button.glide__bullet--active {
          background: #e1261c;
        }
        .highlight-date {
          display: block;
          color: #949494;
          font-weight: 300;
          font-size: 12px;
          font-style: normal;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 5px;
        }
        // slider css
        .slider-st a {
          font-weight: 500;
          display: block;
          overflow: hidden;
          font-size: 14px;
          color: rgb(0, 29, 66);
          font-style: italic;
          line-height: 22px;
          text-align: center;
          margin-bottom: 15px;
        }
        .slider-st a:hover {
          color: #e1261c;
        }

        .stel-battlenews {
          padding: 10px 20px 20px 20px;
          border-top: 5px solid #001d42;
          text-align: center;
          margin-bottom: 20px;
          background: #f5f5f5;
          border-bottom: 1px solid #dddddd;
          box-sizing: border-box;
        }
        .stel-battlenews span {
          display: block;
          color: #e1261c;
          font-size: 15px;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .stel-battlenews span:after {
          content: "";
          width: 40px;
          height: 1px;
          background: #e1261c;
          display: block;
          margin: 5px auto auto auto;
        }
        .stel-battlenews-slider {
          position: relative;
          overflow: hidden;
        }
        .stel-battlenews-slider ul {
          display: flex;
          margin-bottom: 20px;
        }
        .stel-battlenews-slider ul li a {
          display: block;
          color: #001d42;
          font-size: 26px;
          line-height: 32px;
          font-style: italic;
          font-weight: 500;
          text-align: center;
        }
        .stel-battlenews-slider ul li a:hover {
          color: #e1261c;
        }
        .stel-battlenews-bullets {
          display: flex;
          justify-content: center;
        }
        .stel-battlenews-bullets button {
          border: none;
          padding: 0px;
          background: #b0b0b0;
          width: 16px;
          height: 4px;
          border-radius: 20px;
          margin: 0 3px;
          cursor: pointer;
        }
        .stel-battlenews-bullets button.glide__bullet--active {
          background: #e1261c;
        }
        .elecsprite.blb {
          width: 29px;
          background-position: -209px -1px;
          height: 29px;
        }
        .elecsprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hdrsprite_1632473468.svg)
            0 0 no-repeat;
          display: inline-block;
        }
      `}</style>
      <style jsx global>{`
        .elec-glblhd {
          margin-bottom: 10px;
          font-size: 17px;
          color: #e1261c;
          font-weight: 600;
          position: relative;
        }
        .elec-glblhd,
        .elec-glblhd a h2 {
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
          font-size: 17px;
        }
        .elec-glblhd span,
        .elec-glblhd a span {
          color: #001d42;
          position: relative;
        }
      `}</style>
    </>
  );
}
