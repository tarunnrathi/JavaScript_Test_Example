import LazyLoadImage from "components/Common/CustomImage";
import React from "react";

export default function UltimatePerformerOfTheDay({ performerOfTheDay = [] }) {
  if (!performerOfTheDay.length) return null;

  const [performanceData] = performerOfTheDay;
  return (
    <>
      <div className="ultiPrfom_outer">
        <div className="olympupd">
          <div className="medalHopeHeadingInner">
            <h3 className="heading-1">Paris olympics 2024</h3>
            <h2 className="heading-2">Ultimate performance OF THE DAY</h2>
          </div>

          <div className="ultiPrfom_inner_1">
            <div className="imgbox">
              <LazyLoadImage
                src={performanceData.player_image}
                width={120}
                height={90}
                isLazyLoad={true}
              />
              {/* <img src="https://images.news18.com/ibnlive/uploads/2022/08/avinash-sable-1-1-16598776553x2.jpg?impolicy=website&width=150&height=100" /> */}
            </div>
            <div className="discriptionWrap">
              <div className="discriptionInner">
                <div className="headingBox">
                  <h3 className="heading1">{performanceData.player_name}</h3>
                  <h4 className="subHeading">{performanceData.country}</h4>
                </div>
                <div className="ultiPrfom_Game">
                  <ul className="gamesIcon">
                    <li className={performanceData.game}></li>
                  </ul>
                  <span>{performanceData.game}</span>
                </div>
              </div>
              <div className="discription">
                {performanceData.player_description}
              </div>
              <a className="updmore" href={performanceData.url}>
                More Details
              </a>
            </div>
          </div>
          <div className="discription mb">
            {performanceData.player_description}
          </div>
          <a className="updmore mb" href={performanceData.url}>
            More Details
          </a>
        </div>
      </div>
      <style jsx>{`
        .ultiPrfom_outer {
          margin-bottom: 22px;
          padding: 20px 0 20px 30px;
          position: relative;
          background-image: url(/images/olympics/updbannr.svg);
          background-repeat: no-repeat;
          background-size: contain;
          background-color: #fefef6;
          border: 1px solid #ffe5a7;
        }
        .olympInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .ultiPrfom_inner_1 {
          display: flex;
        }
        .ultiPrfom_inner_1 .imgbox {
          width: 120px;
          flex-shrink: 0;
          margin-right: 30px;
          height: 90px;
        }
        .ultiPrfom_inner_1 .imgbox img {
          display: block;
          width: 100%;
          height: 100%;
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
          font-weight: 400;
          color: #202020;
          display: block;
        }
        .ultiPrfom_inner_1 .ultiPrfrom_presenting .heading {
          font-size: 10px;
          font-weight: 400;
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
          color: #000;
          font-size: 13px;
          font-weight: 700;
        }
        .ultiPrfom_Game .gamesIcon {
          width: 40px;
          margin-right: 4px;
          transform: scale(0.8);
          overflow: hidden;
        }
        .ultiPrfom_Game .gamesIcon li {
          margin: 0;
          background-color: #ef4e37;
        }
        .discriptionWrap .discriptionInner {
          display: flex;
          margin-bottom: 10px;
          justify-content: space-between;
        }
        .discriptionWrap .discriptionInner .headingBox {
          padding-top: 5px;
          padding-bottom: 5px;
          text-align: right;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .discriptionWrap .heading1 {
          color: #111;
          text-transform: uppercase;
          font-size: 20px;
          line-height: 25px;
        }
        .discriptionWrap .subHeading {
          color: #000;
          text-transform: uppercase;
          font-size: 13px;
          line-height: 15px;
          font-weight: 700;
        }
        .discriptionWrap .discription {
          color: #636363;
          font-size: 13px;
          line-height: 20px;
        }
        .discriptionWrap .updmore,
        .updmore.mb {
          white-space: nowrap;
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid;
          position: relative;
          margin-left: 11px;
          font-weight: 700;
        }
        .discriptionWrap .updmore::before,
        .updmore.mb::before {
          content: "+";
          position: absolute;
          left: -10px;
          top: 0;
        }
        .olympupd {
          display: flex;
          padding: 0 3% 0 35%;
          flex-direction: column;
        }
        .olympupd .medalHopeHeadingInner {
          max-width: 100%;
          margin: 0 0 15px;
          padding: 0;
        }
        .discription.mb,
        .updmore.mb {
          display: none;
        }

        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }

        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin-bottom: 7px;
          padding: 0 0 6px;
          line-height: 33px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .ultiPrfom_outer,
          .olympupd {
            padding: 0;
          }
          .ultiPrfom_outer {
            background-image: none;
            padding-bottom: 15px;
          }
          .olympupd .medalHopeHeadingInner .heading-2 {
            font-size: 22px;
            line-height: 26px;
            margin: 0;
            border: 0;
          }
          .discription.mb,
          .updmore.mb {
            display: block;
            padding: 0 10px;
          }
          .discriptionWrap .discription,
          .discriptionWrap .updmore {
            display: none;
          }
          .ultiPrfom_inner_1 {
            padding: 0 10px;
          }
          .ultiPrfom_inner_1 .imgbox {
            width: 88px;
            margin-right: 15px;
            height: 62px;
          }
          .discriptionWrap .discriptionInner {
            flex-direction: column;
          }
          .discriptionWrap .discriptionInner .headingBox {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 0;
          }
          .ultiPrfom_Game .gamesIcon {
            display: none;
          }
          .discriptionWrap .heading1 {
            font-size: 16px;
            line-height: 19px;
          }
          .discriptionWrap .subHeading {
            color: #464646;
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;
          }
          .ultiPrfom_Game {
            margin-top: 7px;
          }
          .discription.mb {
            font-size: 13px;
            line-height: 20px;
            color: #636363;
          }
          .updmore.mb {
            width: fit-content;
            margin-top: 10px;
          }
          .discriptionWrap .updmore::before,
          .updmore.mb::before {
            content: "+";
            position: absolute;
            left: 0px;
            top: -1px;
          }
          .olympupd .medalHopeHeadingInner {
            background-image: url(/images/olympics/mbupdbnr.svg);
            padding: 10px 5px 0 28%;
            background-repeat: no-repeat;
            border-bottom: 1px solid #d2d2d2;
          }
        }
      `}</style>
    </>
  );
}
