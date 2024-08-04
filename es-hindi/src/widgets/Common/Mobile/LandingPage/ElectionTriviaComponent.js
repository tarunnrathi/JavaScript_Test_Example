import Slider from "react-slick";
import getConfig from "next/config";

const ElectionTrivia = ({ triviaData, elecSponserData }) => {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  let sponsorDataForWidgetsTrivia = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsTrivia = Object.values(elecSponserData);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsClass: "highlight__bar",
  };

  const fetchElectionTriviaData = async () => {
    // try {
    //   let url = mainData;
    //   let stateData = [];
    //   if (subcat && subcat !== undefined) {
    //     triviaData.map((data, i) => {
    //       if (subcat === data.state.replace("_", "")) {
    //         stateData.push(data);
    //         setdata(stateData);
    //       }
    //     });
    //   }

    // } catch (error) {
    //   console.log(error);
    // }
  };

  try {
    if (triviaData.length==0||!triviaData || triviaData === undefined || triviaData === null || triviaData === [] || triviaData === {}) {
      return null;
    } else {
      return (
        <>
          {/* <!-- trivia start--> */}
          <div className="elec-glblhd elec-glblhd-highlight under_border">
            <div>
              <a href={`/assembly-elections/trivia${mainUrlParam}`} target="_blank">
                <h2>चुनाव <span>से जुड़ी सामान्य जानकारी</span></h2>
              </a>
            </div>
            { sponsorDataForWidgetsTrivia != "" && sponsorDataForWidgetsTrivia != undefined && sponsorDataForWidgetsTrivia[0] != undefined &&
            sponsorDataForWidgetsTrivia[0][0].uploaded_img_on_off == "1" &&
              <div className="add_rhs">
                <span>{sponsorDataForWidgetsTrivia[0][0].sponser_name}</span>
                <div className="add_rhs_row">
                  <a href={sponsorDataForWidgetsTrivia[0][0].click_tracker_sponser}>
                    <img src={sponsorDataForWidgetsTrivia[0][0].desktop_img} alt={sponsorDataForWidgetsTrivia[0][0].sponser_name} title={sponsorDataForWidgetsTrivia[0][0].sponser_name} />
                  </a>
                  {sponsorDataForWidgetsTrivia[0][0].impression_tracker_sponser !== "" ? (
                    <div dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsTrivia[0][0].impression_tracker_sponser }}></div>
                  ) : ("")}
                </div>
              </div>
            }
          </div>
          <div className="triviaSliderOuter">
            <div className="triviaSlider">
              <Slider {...settings}>
                {triviaData.map((data, index) => {
                  return (
                    <div className="slider-st" key={index}>
                      {/* <span className="highlight-date">
                        {moment(data.date_time).format('MMMM DD,YYYY')}
                      </span> */}
                      <a href={data.story_url || ""} target="_blank">
                        {data.headline || ""}
                      </a>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <style jsx global>{`
              .slick-slider {
                position: relative;

                display: block;
                box-sizing: border-box;

                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;

                -webkit-touch-callout: none;
                -khtml-user-select: none;
                -ms-touch-action: pan-y;
                touch-action: pan-y;
                -webkit-tap-highlight-color: transparent;
              }

              .slick-list {
                position: relative;

                display: block;
                overflow: hidden;

                margin: 0;
                padding: 0;
              }
              .slick-list:focus {
                outline: none;
              }
              .slick-list.dragging {
                cursor: pointer;
                cursor: hand;
              }

              .slick-slider .slick-track,
              .slick-slider .slick-list {
                -webkit-transform: translate3d(0, 0, 0);
                -moz-transform: translate3d(0, 0, 0);
                -ms-transform: translate3d(0, 0, 0);
                -o-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
              }

              .slick-track {
                position: relative;
                top: 0;
                left: 0;

                display: block;
                margin-left: auto;
                margin-right: auto;
              }
              .slick-track:before,
              .slick-track:after {
                display: table;

                content: "";
              }
              .slick-track:after {
                clear: both;
              }
              .slick-loading .slick-track {
                visibility: hidden;
              }

              .slick-slide {
                display: none;
                float: left;

                height: 100%;
                min-height: 1px;
              }
              [dir="rtl"] .slick-slide {
                float: right;
              }
              .slick-slide img {
                display: block;
              }
              .slick-slide.slick-loading img {
                display: none;
              }
              .slick-slide.dragging img {
                pointer-events: none;
              }
              .slick-initialized .slick-slide {
                display: block;
              }
              .slick-loading .slick-slide {
                visibility: hidden;
              }
              .slick-vertical .slick-slide {
                display: block;

                height: auto;

                border: 1px solid transparent;
              }
              .slick-arrow.slick-hidden {
                display: none;
              }
              @charset 'UTF-8';
              /* Slider */
              .slick-loading .slick-list {
                background: #fff url("./ajax-loader.gif") center center
                  no-repeat;
              }

              /* Icons */
              @font-face {
                font-family: "slick";
                font-weight: normal;
                font-style: normal;

                src: url("./fonts/slick.eot");
                src: url("./fonts/slick.eot?#iefix") format("embedded-opentype"),
                  // url("./fonts/slick.woff") format("woff"),
                  // url("./fonts/slick.ttf") format("truetype"),
                  url("./fonts/slick.svg#slick") format("svg");
              }
              /* Arrows */
              .slick-prev,
              .slick-next {
                font-size: 0;
                line-height: 0;

                position: absolute;
                top: 50%;

                display: block;

                width: 20px;
                height: 20px;
                padding: 0;
                -webkit-transform: translate(0, -50%);
                -ms-transform: translate(0, -50%);
                transform: translate(0, -50%);

                cursor: pointer;

                color: transparent;
                border: none;
                outline: none;
                background: transparent;
              }
              .slick-prev:hover,
              .slick-prev:focus,
              .slick-next:hover,
              .slick-next:focus {
                color: transparent;
                outline: none;
                background: transparent;
              }
              .slick-prev:hover:before,
              .slick-prev:focus:before,
              .slick-next:hover:before,
              .slick-next:focus:before {
                opacity: 1;
              }
              .slick-prev.slick-disabled:before,
              .slick-next.slick-disabled:before {
                opacity: 0.25;
              }

              .slick-prev:before,
              .slick-next:before {
                font-family: "slick";
                font-size: 20px;
                line-height: 1;

                opacity: 0.75;
                color: white;

                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }

              .slick-prev {
                left: -25px;
              }
              [dir="rtl"] .slick-prev {
                right: -25px;
                left: auto;
              }
              .slick-prev:before {
                content: "←";
              }
              [dir="rtl"] .slick-prev:before {
                content: "→";
              }

              .slick-next {
                right: -25px;
              }
              [dir="rtl"] .slick-next {
                right: auto;
                left: -25px;
              }
              .slick-next:before {
                content: "→";
              }
              [dir="rtl"] .slick-next:before {
                content: "←";
              }

              /* Dots */
              .slick-dotted.slick-slider {
                margin-bottom: 30px;
              }

              .slick-dots {
                position: absolute;
                bottom: -25px;

                display: block;

                width: 100%;
                padding: 0;
                margin: 0;

                list-style: none;

                text-align: center;
              }
              .slick-dots li {
                position: relative;

                display: inline-block;

                width: 20px;
                height: 20px;
                margin: 0 5px;
                padding: 0;

                cursor: pointer;
              }
              .slick-dots li button {
                font-size: 0;
                line-height: 0;

                display: block;

                width: 20px;
                height: 20px;
                padding: 5px;

                cursor: pointer;

                color: transparent;
                border: 0;
                outline: none;
                background: transparent;
              }
              .slick-dots li button:hover,
              .slick-dots li button:focus {
                outline: none;
              }
              .slick-dots li button:hover:before,
              .slick-dots li button:focus:before {
                opacity: 1;
              }
              .slick-dots li button:before {
                font-family: "slick";
                font-size: 6px;
                line-height: 20px;

                position: absolute;
                top: 0;
                left: 0;

                width: 20px;
                height: 20px;

                content: "•";
                text-align: center;

                opacity: 0.25;
                color: black;

                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .slick-dots li.slick-active button:before {
                opacity: 0.75;
                color: black;
              }

              .highlight__bar {
                display: flex !important;
                justify-content: center;
              }

              .highlight__bar li {
                display: flex;
                padding: 0;
                border: none;
                background: #b0b0b0;
                width: 16px;
                height: 4px;
                border-radius: 20px;
                margin: 0 3px;
                cursor: pointer;
              }

              .highlight__bar li button {
                border: none;
                color: transparent;
                padding: 0px;
                display: block;
                background: #b0b0b0;
                width: 16px;
                height: 4px;
                border-radius: 20px;
                cursor: pointer;
              }

              .highlight__bar li.slick-active button {
                background-color: #e1261c;
              }
              .triviaSliderOuter {
                border: 1px solid #b6b4b4;
                position: relative;
                margin-bottom: 30px;
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
                font-weight: 600;
                display: block;
                overflow: hidden;
                font-size: 14px;
                color: rgb(0, 29, 66);
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
            `}</style>
            <style jsx>{`
              .elec-glblhd {
                margin-bottom: 4px;
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
              .hindifont .elec-glblhd, .hindifont .elec-glblhd a h2,
        .elec-glblhd a {
          font-size: 18px !important;
          font-family:'khand';
        }
            `}</style>
          </div>
          {/* <!-- trivia end--> */}
        </>
      );
    }
  } catch (e) {
    console.log("ElectionTrivia error ", e);
    return null;
  }
};

export default ElectionTrivia;
