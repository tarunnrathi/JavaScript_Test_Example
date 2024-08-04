// import Glide from "@glidejs/glide";
// import { useEffect } from "react";

import LazyImage from "components/Common/LazyLoadImage";

const UltimatePerformance = ({ asianUltimatePerformer = [] }) => {
  if (!asianUltimatePerformer.length) return null;
  // useEffect(() => {
  //   if (document.querySelector(".presenting_partner")) {
  //     new Glide(document.querySelector(".presenting_partner"), {
  //       type: "slider",
  //       autoplay: 2000,
  //       perView: 1,
  //       slidesToScroll: 1,
  //       gap: 0,
  //     }).mount();
  //   }
  // }, []);
  const ultimatePerformerOftheDay = asianUltimatePerformer[0] || {};

  return (
    <>
      <div className="ultiPrfom_outer">
        <a href="/tag/asian-games/" className="more">
          <span>और पढ़े</span>
        </a>
        <div className="ultiPrfom_inner_1">
          <div className="content">
            <h3 className="heading_1">
              Ultimate Performance <span>OF THE DAY</span>
            </h3>
            {/* <div className="ultiPrfrom_presenting">
              <p className="heading">Presenting Partner</p>
              <div className="presenting_partner">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    <li className="slide">Partner logo</li>
                    <li className="slide">Partner logo</li>
                    <li className="slide">Partner logo</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
          <div className="imgbox">
            <LazyImage
              src={ultimatePerformerOftheDay.image}
              // {`${
              //   playerData.thumbnail
              // }?impolicy=website&width=${98}&height=${147}`}
              alt={ultimatePerformerOftheDay.title}
              title={ultimatePerformerOftheDay.title}
              width={98}
              height={147}
              // loading="lazy"
              lazyLoad={true}
            />
          </div>
          <div className="discriptionWrap">
            <div className="discriptionInner">
              <div className="headingBox">
                <h3 className="heading1">{ultimatePerformerOftheDay.title}</h3>
                <h4 className="subHeading">
                  {ultimatePerformerOftheDay.country_name}
                </h4>
              </div>
              <div className="ultiPrfom_Game">
                <ul className="gamesIcon">
                  <li className={ultimatePerformerOftheDay.t_name}></li>
                </ul>
                <span>{ultimatePerformerOftheDay.t_name}</span>
              </div>
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
      </div>
      <style jsx>{`
        // Ultimate performance
        .ultiPrfom_outer {
          background: #f5f5f5;
          border: 1px solid #e5e5e5;
          margin-bottom: 22px;
          padding: 20px 0 20px 30px;
          position: relative;
        }
        .ultiPrfom_outer .more {
          width: 102px;
          height: 30px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 10px 0 0 10px;
          position: absolute;
          top: 30px;
          right: -1px;
          padding: 4px 0 4px 10px;
          cursor: pointer;
        }
        .ultiPrfom_outer .more span {
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.24px;
          color: red;
          text-transform: uppercase;
          border-bottom: #f00 solid 1px;
        }
        .ultiPrfom_inner_1 {
          display: flex;
        }
        .ultiPrfom_inner_1 .imgbox {
          width: 120px;
          border: 1px solid #707070;
          padding: 10px;
          flex-shrink: 0;
          margin-right: 30px;
          align-self: flex-start;
          background: white;
        }
        .ultiPrfom_inner_1 .imgbox img {
          display: block;
          width: 100%;
        }
        .ultiPrfom_inner_1 .content {
          width: 150px;
          margin-right: 32px;
        }
        .ultiPrfom_inner_1 .heading_1 {
          font-family: "Oswald";
          color: #e1261d;
          font-size: 22px;
          text-transform: uppercase;
          line-height: 27px;
          border-bottom: 3px solid;
          padding-bottom: 3px;
          margin-bottom: 10px;
        }
        .ultiPrfom_inner_1 .heading_1 span {
          font-weight: normal;
          color: #202020;
          display: block;
        }
        .ultiPrfom_inner_1 .ultiPrfrom_presenting .heading {
          font-size: 10px;
          font-weight: normal;
          margin-bottom: 2px;
          color: #747474;
          line-height: 15px;
          text-decoration: underline;
        }
        .ultiPrfom_inner_1 .ultiPrfrom_presenting img {
          width: 94px;
        }
        .ultiPrfom_Game {
          display: flex;
          align-items: center;
        }
        .ultiPrfom_Game span {
          text-transform: uppercase;
          color: #c1c1c1;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid #c1c1c1;
        }
        .ultiPrfom_Game .gamesIcon {
          width: 40px;
          margin-right: 8px;
        }
        .ultiPrfom_Game .gamesIcon li {
          margin: 0;
        }
        .discriptionWrap .discriptionInner {
          display: flex;
          margin-bottom: 10px;
        }
        .discriptionWrap .discriptionInner .headingBox {
          margin-right: 20px;
          padding-right: 20px;
          border-right: 1px solid #d8d8d8;
          padding-top: 5px;
          padding-bottom: 5px;
          text-align: right;
        }
        .discriptionWrap .heading1 {
          color: #3279ba;
          text-transform: uppercase;
          font-size: 20px;
          line-height: 25px;
        }
        .discriptionWrap .subHeading {
          color: #464646;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
          font-weight: normal;
        }
        .discriptionWrap .discription {
          color: #292929;
          font-size: 13px;
          line-height: 20px;
          padding-right: 30px;
        }
        .discriptionWrap .discription a {
          white-space: nowrap;
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid;
          position: relative;
          margin-left: 15px;
        }
        .discriptionWrap .discription a::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .presenting_partner .slides {
          display: flex;
        }
        .presenting_partner .track {
          overflow: hidden;
        }
        .presenting_partner {
          width: 94px;
        }
        .presenting_partner .slide {
          width: 94px;
          height: 40px;
          background: #747474;
        }
      `}</style>
    </>
  );
};

export default UltimatePerformance;
