import LazyImage from "components/Common/LazyImage";
import { imageLoader, setDefaultImage } from "includes/article.util";
import { useState } from "react";
import getConfig from "next/config";
import { getCompleteURL } from "util/global/Helper";

const { publicRuntimeConfig } = getConfig();
import Skeleton from "components/Common/CustomSkeleton";
import { getArticles } from "api/individual/Home";
import Heading from "components/Desktop/common/Heading";
import ReadMore from "../common/ReadMore";
import SelectStateNew from "components/Common/SelectStateNew";

const PradeshNewsList = ({
  stateList,
  pradeshNews,
  // districtList,
  isAmp = false,
}) => {
  if (!pradeshNews || pradeshNews.length === 0) {
    return null;
  }
  const [showStates, setShowStates] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState("uttar-pradesh");
  const [data, setData] = useState(pradeshNews);
  const [dataList, setDataList] = useState({
    left: data.slice(0, 3),
    right: data.slice(3, 11),
  });

  const filterDataByState = async (slug) => {
    setActive(slug);
    setLoading(true);
    const result = await getArticles({ count: 11, category: slug }, true);
    if (result.length > 0) {
      setData(result);
      setDataList({
        left: result.slice(0, 3),
        right: result.slice(3, 11),
      });
    }
    setLoading(false);
  };

  const handleShowChange = () => {
    setShowStates((prev) => !prev);
  };

  return (
    <>
      <div className="newglblhdwrap">
        <Heading
          categoryLink={publicRuntimeConfig.siteUrl + "news/states/"}
          heading={`प्रदेश न्यूज़`}
        />
        <div className="newchoosecitywrap hp_local18_select_state">
          <a className="newchoosecitybtn hp_local18_select_state" onClick={handleShowChange}>
            <em className="newiconsprite choosebtn"></em>शहर चुनें
            <em className="newiconsprite newarrow"></em>
          </a>
        </div>
      </div>
      <ul className="listnavitem">
        {stateList &&
          stateList.length > 0 &&
          stateList.map((item, index) => (
            <li
              className={active === item.slug ? "active hp_local18_state_slider" : "hp_local18_state_slider"}
              key={`pradeshBottomMenu` + index}
            >
              <a onClick={() => filterDataByState(item.slug)} className="hp_local18_state_slider">
                {item.state_name}
              </a>
            </li>
          ))}
      </ul>
      {!isLoading ? (
        <>
          <div className="shrmobwrap">
            <div className="mrg10">
              <ul className="newpradesh-stories">
                {dataList.left &&
                  dataList.left.length === 3 &&
                  dataList.left.map((item, index) => {
                    // let width = index === 2 ? 220 : 172;
                    // let height = index === 2 ? 54 : 105;

                    const width = index === 2 ? 104 : 172;
                    const height = index === 2 ? 70 : 137;

                    const imageSrc = imageLoader(
                      item.images.url,
                      width,
                      height,
                    );
                    const title = item.headline || item.display_headline;
                    return (
                      <li key={`pradeshRightitem-` + index} className="hp_local18_stories_card">
                        <a href={getCompleteURL(item.weburl_r, item.weburl)} className="hp_local18_stories_card">
                          {isAmp ? (
                            <figure className="expand">
                              <amp-img
                                src={imageSrc}
                                width={width}
                                height={height}
                                alt={title}
                                title={title}
                                layout="responsive"
                                data-hero=""
                              ></amp-img>
                            </figure>
                          ) : (
                            <LazyImage
                              width={width}
                              height={height}
                              src={imageSrc}
                              alt={title}
                              title={title}
                              isRes={true}
                              onError={setDefaultImage}
                            />
                          )}
                          <h3>{title}</h3>
                        </a>
                      </li>
                    );
                  })}
              </ul>

              <ul className="nwdotstorieslist">
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
            <SelectStateNew
              showStates={showStates}
              handleShowChange={handleShowChange}
              // districtList={districtList}
            />
          </div>
        </>
      ) : (
        <Skeleton height={358} />
      )}
      <ReadMore
        categoryLink={publicRuntimeConfig.siteUrl + "news/states/"}
        heading={`और भी पढ़ें`}
      />

      <style jsx global>{`
        .newchoosecitybtn {
          width: 120px;
          height: 26px;
          line-height: 28px;
          color: #e1271c;
          font-size: 13px;
          font-weight: bold;
          background: #fafafa;
          box-shadow: 0px 2px 4px #00000029;
          border: 1px solid #e1271c;
          border-radius: 14px;
          display: block;
          padding: 0 12px 0 35px;
          position: relative;
        }

        .newchoosecitybtn .newiconsprite.choosebtn {
          position: absolute;
          top: 3px;
          left: 15px;
        }

        .newiconsprite.choosebtn {
          width: 12px;
          height: 17px;
          display: block;
          background-position: -126px 0px;
        }
        .newiconsprite {
          background: url(/images/siteimages/newiconsprite_1669351342.svg)
            0 0 no-repeat;
        }
        .newiconsprite.newarrow {
          width: 8px;
          height: 13px;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .newchoosecitybtn .newiconsprite.newarrow {
          top: 6px;
        }

        .newpradesh-stories {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 5px;
        }

        .newpradesh-stories li {
          position: relative;
          width: 49%;
          background: #f3f3f3;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
        }

        .newpradesh-stories li a figure {
          width: 100%;
          height: 110px;
        }

        .newpradesh-stories li a figure img {
          width: 100%;
          height: 110px !important;
          border-radius: 4px 4px 0 0;
        }

        .newpradesh-stories li a h3 {
          color: #000;
          line-height: 22px;
          font-size: 15px;
          padding: 10px;
        }

        .newpradesh-stories li:last-child {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
        }

        .newpradesh-stories li:last-child a h3 {
          padding: 0;
        }

        .newpradesh-stories li:last-child a {
          display: flex;
          flex-direction: row-reverse;
        }

        .newpradesh-stories li:last-child a figure {
          width: 148px ${!isAmp ? " !important" : ""};
          height: 70px ${!isAmp ? " !important" : ""};
          margin-left: 12px;
        }

        .newpradesh-stories li:last-child a figure img {
          width: 100%;
          height: 70px ${!isAmp ? " !important" : ""};
          max-width: 104px;
          border-radius: 4px;
        }

        .nwdotstorieslist {
        }

        .nwdotstorieslist li {
          padding: 10px 15px;
          border-bottom: 1px solid #e0e0e0;
          position: relative;
        }

        .nwdotstorieslist li:before {
          content: "";
          background: #707071;
          width: 5px;
          height: 5px;
          position: absolute;
          top: 20px;
          margin-top: -3px;
          left: 0;
          border-radius: 100%;
        }

        .nwdotstorieslist li a h3 {
          font-size: 15px;
          line-height: 22px;
          color: #000000;
          font-weight: normal;
        }

        .listnavitem {
          display: flex;
          height: 40px;
          background: #f4f4f4;
          overflow: scroll;
          padding: 0 10px;
          align-items: center;
          border-bottom: 1px solid #d3d2d2;
        }

        .listnavitem li {
          flex-shrink: 0;
          height: 22px;
          margin-right: 20px;
        }

        .listnavitem li a {
          color: #2f2f2f;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          display: block;
          text-align: center;
          cursor: pointer;
        }

        .listnavitem li.active a {
          background: #e1271c;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e1261c;
          border-radius: 11px;
          color: #fff;
          padding: 0 12px;
        }
        .shrmobwrap {
          position: relative;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default PradeshNewsList;
