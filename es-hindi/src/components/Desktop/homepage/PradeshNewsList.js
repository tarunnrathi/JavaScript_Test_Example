import { useEffect, useState } from "react";
import getConfig from "next/config";
import { getCompleteURL } from "util/global/Helper";

const { publicRuntimeConfig } = getConfig();
import Glide from "@glidejs/glide";
import ReadMore from "components/Desktop/common/ReadMore";
import Heading from "../common/Heading";
import Skeleton from "react-loading-skeleton";
import { TEXT } from "constant/global/Constant";
import LazyLoadImage from "components/Common/CustomImage";
import SelectStateNew from "components/Common/SelectStateNew";
import { logEvent } from "includes/googleAnalytic";
import { getArticles } from "api/individual/Home";

const PradeshNewsList = ({ stateList, pradeshNews }) => {
  if (!pradeshNews || pradeshNews.length === 0) {
    return null;
  }
  const [showStates, setShowStates] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState("uttar-pradesh");
  const [data, setData] = useState(pradeshNews);
  const [dataList, setDataList] = useState({
    left: data.slice(0, 6),
    right: data.slice(6, 22),
  });

  useEffect(() => {
    if (document.getElementsByClassName("newpradeshlist").length) {
      new Glide(".newpradeshlist", {
        startAt: 0,
        perView: 7,
        bound: true,
      }).mount();
    }
  }, []);

  const filterDataByState = async(slug) => {
    setActive(slug);
    setLoading(true);
    const result = await getArticles({ count: 22, category: slug }, true);
    if(result.length > 0) {
        setData(result);
        setDataList({
            left: result.slice(0, 6),
            right: result.slice(6, 22),
        });
    }
    setLoading(false);
};

  const handleShowChange = () => {
    setShowStates((prev) => !prev);
    if (!showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "अपना शहर चुनें");
    }
  };
  return (
    <>
      <div className="newglblhdwrap">
        <Heading
          categoryLink={publicRuntimeConfig.siteUrl + "news/states/"}
          heading={`प्रदेश न्यूज़`}
        />
        <a
          className="chsstctbtn-forstatesection hp_local18_select_state"
          onClick={handleShowChange}
        >
          राज्य चुनें
        </a>
      </div>
      {stateList && stateList.length > 0 && (
        <div className="newpradeshlist">
          <div data-glide-el="track">
            <ul>
              {stateList.map((item, index) => (
                <li
                  key={`pradeshBottomMenu` + index}
                  className="hp_local18_state_slider"
                >
                  <a
                    className={
                      active === item.slug
                        ? "active hp_local18_state_slider"
                        : "hp_local18_state_slider"
                    }
                    onClick={() => filterDataByState(item.slug)}
                  >
                    {item.state_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div data-glide-el="controls" className="newpradeshlistarrow">
            <button data-glide-dir="<"></button>
            <button data-glide-dir=">"></button>
          </div>
        </div>
      )}

      {!isLoading ? (
        <>
          <div className="shrwrap">
            <div className="newpradeshwrap">
              <ul className="newpradesh-left">
                {dataList.left &&
                  dataList.left.length === 6 &&
                  dataList.left.map((item, index) => {
                    const width = index >= 5 ? 110 : 205;
                    const height = index >= 5 ? 70 : 137;
                    const imageSrc = item.images.url;
                    const title = item.headline || item.display_headline;
                    return (
                      <li
                        key={`pradeshRightitem-` + index}
                        className="hp_local18_stories_card"
                      >
                        <a
                          href={getCompleteURL(item.weburl_r, item.weburl)}
                          className="hp_local18_stories_card"
                        >
                          <figure width={width} height={height}>
                            <LazyLoadImage
                              src={imageSrc}
                              width={width}
                              height={height}
                              alt={item.title}
                              title={item.title}
                            />
                          </figure>
                          <h3>{title}</h3>
                        </a>
                      </li>
                    );
                  })}
              </ul>
              <ul className="newpradesh-right">
                {dataList.right &&
                  dataList.right.length > 1 &&
                  dataList.right.map((item, index) => (
                    <li key={`pradeshILefttem-` + index} className="hp_local18_news_stories">
                      <a href={getCompleteURL(item.weburl_r, item.weburl)} className="hp_local18_news_stories">
                        <h3>{item.display_headline}</h3>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            {showStates && (
              <SelectStateNew
                showStates={showStates}
                handleShowChange={handleShowChange}
                // districtList={districtList}
              />
            )}
          </div>
        </>
      ) : (
        <Skeleton height={730} />
      )}

      <div className="newpradeshbtn">
        <ReadMore
          link={publicRuntimeConfig.siteUrl + "news/states/"}
          label={TEXT.READ_MORE}
        />
      </div>
      <style jsx global>{`
        .newhdrlnghover {
          position: absolute;
          overflow: hidden;
          background: #fff;
          top: 20px;
          left: -1px;
          box-shadow: 0px 2px 4px #0000001a;
          border: 1px solid #c4c4c4;
          border-radius: 0 0 4px 4px;
          display: none;
          right: -1px;
          border-top: none;
        }
        .newhdrlnghover a {
          font-size: 13px;
          margin: 5px 0;
          font-weight: normal;
          padding: 0 8px;
          color: #6a6a6a;
          display: block;
          cursor: pointer;
        }
        .newhdrlnghover a:hover {
          background: #ec2027;
          color: #fff;
        }
        .newchoosecitywrap {
          position: relative;
          z-index: 1;
        }
        .newchoosecitywrap:hover .newchoosecitybtn {
          border-radius: 4px;
          background: #fff;
        }
        .newchoosecitywrap:hover .newhdrlnghover {
          display: block;
          border-color: #e1271c;
          left: 0;
          right: 0;
          background: #fff;
        }
        .newhdrlnghover div {
          height: 190px;
          overflow: auto;
          width: 111%;
        }
        .newchoosecitybtn {
          width: 120px;
          height: 28px;
          line-height: 26px;
          color: #e1271c;
          font-size: 13px;
          font-weight: bold;
          background: #fafafa;
          box-shadow: 0px 2px 4px #00000029;
          border: 1px solid #e1271c;
          border-radius: 14px;
          display: block;
          padding: 0 12px 0 28px;
          position: relative;
          margin-bottom: 5px;
        }
        .newchoosecitybtn .newiconsprite.choosebtn {
          top: 4px;
          left: 10px;
        }
        .newpradeshlist {
          margin: -4px 15px 0 15px;
          position: relative;
          background: #f4f4f4;
          height: 40px;
        }
        .newpradeshlist:after {
          content: "";
          background: #d3d2d2;
          height: 1px;
          position: absolute;
          left: -15px;
          right: -15px;
          bottom: -2px;
        }
        .newpradeshlist > div {
          overflow: hidden;
        }
        .newpradeshlist ul {
          display: flex;
          height: 40px;
          align-items: center;
        }
        .newpradeshlist ul li {
          flex-shrink: 0;
          width: auto !important;
        }
        .newpradeshlist ul li a {
          color: #2f2f2f;
          font-size: 14px;
          height: 24px;
          line-height: 22px;
          display: block;
          text-align: center;
          padding: 0 12px;
          margin: 0 5px;
          cursor: pointer;
        }
        .newpradeshlist ul li a.active {
          background: #e1271c;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e1261c;
          border-radius: 11px;
          color: #fff;
        }
        .newpradeshlistarrow {
        }
        .newpradeshlistarrow button {
          position: absolute;
          top: 0px;
          width: 14px;
          height: 40px;
          background: #e3e3e3;
          left: -15px;
          border: 0;
          cursor: pointer;
        }
        .newpradeshlistarrow button:last-child {
          right: -15px;
          left: auto;
          transform: rotate(180deg);
        }
        .newpradeshlistarrow button:before {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          border-top: 1px solid #000;
          border-left: 1px solid #000;
          transform: rotate(-45deg);
          top: 17px;
          left: 6px;
        }
        .newpradeshlistarrow button:after {
          left: 8px;
        }
        .newpradesh-left li:last-child a figure,
        .newpradesh-left li:nth-child(5) a figure,
        .newpradesh-left li:last-child a figure img,
        .newpradesh-left li:nth-child(5) a figure img {
          max-width: 104px;
          min-width: 104px;
          min-height: 70px;
          margin-right: 10px;
          border-radius: 4px !important;
        }
        .newpradeshwrap {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }
        .newpradesh-left {
          width: 430px;
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .newpradesh-left li {
          position: relative;
          width: 205px;
          background: #f3f3f3;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          overflow: hidden;
        }
        .newpradesh-left li a figure {
          width: 205px;
          height: 137px;
        }
        .newpradesh-left li a figure img {
          width: 205px;
          height: 137px;
          border-radius: 4px 4px 0 0;
        }
        .newpradesh-left li a h3 {
          color: #000;
          line-height: 22px;
          font-size: 15px;
          padding: 5px 10px 10px 10px;
        }
        .newpradesh-left li:last-child,
        .newpradesh-left li:nth-child(5) {
          width: 100%;
          padding: 10px;
        }
        .newpradesh-left li:last-child a h3,
        .newpradesh-left li:nth-child(5) a h3 {
          padding: 0;
        }
        .newpradesh-left li:last-child a,
        .newpradesh-left li:nth-child(5) a {
          display: flex;
        }
        .newpradesh-left li:last-child a figure,
        .newpradesh-left li:nth-child(5) a figure {
          width: 80px !important;
          height: 54px !important;
          margin-right: 12px;
        }
        .newpradesh-left li:last-child a figure img,
        .newpradesh-left li:nth-child(5) a figure img {
          width: 80px !important;
          height: 54px !important;
          max-width: 80px;
          border-radius: 4px;
        }
        .newpradesh-right {
          width: 470px;
          border-left: 1px solid #e0e0e0;
          padding-left: 20px;
        }
        .newpradesh-right li {
          padding: 10px 15px;
          border-bottom: 1px solid #e0e0e0;
          position: relative;
        }
        .newpradesh-right li:last-child {
          border: none;
        }
        .newpradesh-right li:before {
          content: "";
          background: #707071;
          width: 5px;
          height: 5px;
          position: absolute;
          top: 50%;
          margin-top: -3px;
          left: 0;
          border-radius: 100%;
        }
        .newpradesh-right li a h3 {
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
          line-height: 22px;
          color: #000000;
          font-weight: normal;
        }
        .newpradeshbtn {
          background: #f6f7f7;
          padding: 5px 0 0 0;
          margin-top: 12px;
        }
        .chsstctbtn-forstatesection {
          color: #c6080f;
          font-weight: bold;
          font-size: 16px;
          height: 38px;
          line-height: 38px;
          padding: 0 40px 0 15px;
          box-sizing: border-box;
          background: #fff url(/images/siteimages/pinicon_1607493634.png) 92%
            50% no-repeat;
          position: absolute;
          top: 0px;
          right: 0;
          box-shadow: none;
          border-radius: 8px 8px 0px 0px;
          border-bottom: 2px solid #ee1c25;
          cursor: pointer;
        }
        .chsstctbtn-forstatesection.adclschsstctbtn-forstatesection {
          background: #e3e3e3 url(/images/siteimages/pinicon_1607493634.png) 92%
            50% no-repeat;
          box-shadow: 0px 3px 6px #00000029;
        }
        .shrwrap {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default PradeshNewsList;
