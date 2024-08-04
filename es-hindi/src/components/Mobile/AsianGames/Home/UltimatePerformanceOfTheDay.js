// import Glide from "@glidejs/glide";

import LazyImage from "components/Common/CustomImage";

const UltimatePerformanceOfTheDay = ({ asianUltimatePerformer = [] }) => {
  if (!asianUltimatePerformer.length) return null;
  // useEffect(() => {
  //   if (document.querySelector(".ULpartnersSlider")) {
  //     new Glide(document.querySelector(".ULpartnersSlider"), {
  //       type: "carousel",
  //       autoplay: 2000,
  //       perView: 1,
  //       slidesToScroll: 1,
  //     }).mount();
  //   }
  // });
  const ultimatePerformerOftheDay = asianUltimatePerformer[0] || {};

  return (
    <>
      <div className="ultiPrfom_outer">
        <div className="ultiPrfom_sec">
          <div className="ultiPrfom_inner_1">
            <div className="imgbox">
              <LazyImage
                src={ultimatePerformerOftheDay.image}
                alt={ultimatePerformerOftheDay.title}
                title={ultimatePerformerOftheDay.title}
                width={98}
                height={147}
              />
            </div>
            <div className="content">
              <h3 className="heading_1">
                Ultimate performance <span>OF THE DAY</span>
              </h3>
              {/* <div className="ultiPrfrom_presenting">
                <p className="heading">Presenting Partner</p>
                <div className="ULpartnersSlider">
                  <div className="track" data-glide-el="track">
                    <ul className="slides">
                      <li className="slide">partner logo</li>
                      <li className="slide">partner logo</li>
                      <li className="slide">partner logo</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="ultiPrfom_inner_2">
            <h3 className="heading_1">{ultimatePerformerOftheDay.title}</h3>
            <h4 className="subHeading">
              {ultimatePerformerOftheDay.country_name}
            </h4>
            <div className="ultiPrfom_Game">
              <ul className="gamesIcon">
                <li className={ultimatePerformerOftheDay.t_name}></li>
              </ul>
              <span>{ultimatePerformerOftheDay.t_name}</span>
            </div>
            <div className="discription">
              {ultimatePerformerOftheDay.olydesc}
              {ultimatePerformerOftheDay.link &&
                ultimatePerformerOftheDay.link !== "#" && (
                  <a href={ultimatePerformerOftheDay.link}>अधिक पढ़ें</a>
                )}
            </div>
          </div>
        </div>
        <div className="ultiPrfom_morewrap">
          <a href="/tag/asian-games/">
            <span>और पढ़े</span>
          </a>
        </div>
      </div>
      <style jsx>{`
        //  ultimate performance
        .ultiPrfom_outer {
          background: #f5f5f5;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 22px;
        }
        .ultiPrfom_sec {
          padding: 20px 30px 15px;
        }
        .ultiPrfom_inner_1 {
          border-bottom: 5px solid #e3e3e3;
          margin-bottom: 10px;
          padding-bottom: 16px;
          display: flex;
        }
        .ultiPrfom_inner_1 .imgbox {
          width: 120px;
          border: 1px solid #707070;
          padding: 10px;
          flex-shrink: 0;
          margin-right: 15px;
          background: #fff;
        }
        .ultiPrfom_inner_1 .imgbox img {
          display: block;
          width: 100%;
        }
        .ultiPrfom_inner_1 .content {
          width: 100%;
        }
        .ultiPrfom_inner_1 .heading_1 {
          color: #e1261d;
          font-size: 23px;
          text-transform: uppercase;
          line-height: 27px;
          border-bottom: 3px solid;
          padding-bottom: 3px;
          margin-bottom: 10px;
        }
        .ultiPrfom_inner_1 .heading_1 span {
          font-weight: normal;
          color: #202020;
        }
        .ultiPrfom_inner_1 .ultiPrfrom_presenting .heading {
          font-size: 10px;
          font-weight: normal;
          color: #747474;
          text-decoration: underline;
        }
        .ultiPrfom_inner_2 .heading_1 {
          color: #3279ba;
          text-transform: uppercase;
          font-size: 20px;
          line-height: 25px;
        }
        .ultiPrfom_inner_2 .subHeading {
          color: #464646;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
          font-weight: normal;
          margin-bottom: 5px;
        }
        .ultiPrfom_inner_1 .ultiPrfrom_presenting img {
          width: 94px;
        }
        .ultiPrfom_Game {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .ultiPrfom_Game span {
          text-transform: uppercase;
          color: #c1c1c1;
          font-size: 16px;
          font-weight: 600;
          text-decoration: underline;
        }
        .ultiPrfom_Game .gamesIcon {
          display: block;
          width: 35px;
          margin-right: 8px;
        }
        .ultiPrfom_inner_2 .discription {
          color: #292929;
          font-size: 13px;
          line-height: 20px;
        }
        .ultiPrfom_inner_2 .discription a {
          white-space: nowrap;
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid;
          position: relative;
          margin-left: 15px;
          display: inline;
        }
        .ultiPrfom_inner_2 .discription a::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .ultiPrfom_morewrap {
          border-top: 5px solid #fff;
          text-align: center;
          padding: 13px 0 10px;
        }
        .ultiPrfom_morewrap a {
          color: #ff0000;
          width: 110px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          background: #ffffff;
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 600;
          border: 2px solid #e1261c;
          border-radius: 30px;
          line-height: 27px;
        }
        .ULpartnersSlider {
          width: 94px;
        }
        .ULpartnersSlider .track {
          overflow: hidden;
        }
        .ULpartnersSlider .slides {
          display: flex;
        }
        .ULpartnersSlider li {
          background: #e3e3e3;
          border: 1px solid #e3e3e3;
          width: 94px;
          height: 40px;
        }
      `}</style>
    </>
  );
};

export default UltimatePerformanceOfTheDay;
