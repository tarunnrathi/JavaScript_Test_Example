import Pagination from "widgets/Common/Mobile/Pagination";
import MissionPaani from "widgets/Common/Responsive/MissionPaani";
import ReactHtmlParser from "html-react-parser";
import CrTopScoreWidget from "widgets/Common/Responsive/CrTopScoreWidget";
import React, { useState } from "react";
import { getTagResult } from "api/individual/Tag";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { logEvent } from "includes/googleAnalytic";
import SearchButton from "components/Common/SearchButton";
const TagMobile = (props) => {
  const {
    data: { pageAds },
  } = props;
  const {
    topic,
    dataLength,
    paramObj,
    topicName,
    imageWidth,
    imageHeight,
    topTagStory,
    tagCMSInfo,
    isWomenWorldCupPage,
    tagData: tagInitialData,
  } = props.data;
  const [tagData, setTagData] = useState(tagInitialData);
  const [loadMore, setLoadMore] = useState(1);
  const [ct, setCt] = useState(props.data.ct || "");
  const [loading, setLoading] = useState(false);
  let breadCrumbArray = props?.data?.breadCrumbArray;
  let tagDataChunk = [];
  if (topic == "mission-paani") {
    tagDataChunk = [
      tagData.slice(0, 2),
      tagData.slice(2, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
    ];
  } else {
    tagDataChunk = [
      tagData.slice(0, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
    ];
  }
  const tagImage = tagCMSInfo?.term_image
    ? tagCMSInfo?.term_image.indexOf("https") === 0
      ? tagCMSInfo.term_image
      : "https://images.news18.com/ibnkhabar/uploads/" + tagCMSInfo.term_image
    : "";
  const tagDescription = tagCMSInfo?.term_description
    ? tagCMSInfo.term_description
    : "";
  const shortTagDesc = tagDescription.substring(0, 500);
  const social_headline =
    props.data?.pageSeo?.og_title || topicName + " Tag Page";
  const slug =
    topic != "" && ct != ""
      ? topic + "/" + ct + "/"
      : topic != "" && ct == ""
      ? topic + "/"
      : topic == "" && ct != ""
      ? ct + "/"
      : "";
  const min = 0;
  const viewMax = 50000;
  const likeMax = 5000;
  const rand = (n, precision = 1) => {
    let total = 0;
    let n_format = "";
    if (n < 1000000 && n > 1000) {
      // Anything less than a million
      total = n / 1000;
      n_format = Math.round(total) + "k";
    } else if (n < 1000000000 && n > 1000000) {
      // Anything less than a billion
      n_format = number_format(n / 1000000, precision) + "M";
    } else {
      // At least a billion
      n_format = n;
    }
    return n_format;
  };
  const pageurl =
    paramObj.topic != ""
      ? `/tag/${paramObj.topic}/${paramObj.ct}`
      : `/tag/${paramObj.ct}`;
  let noContent = dataLength > 720 && paramObj.page > 30 ? false : true,
    h1Tagval =
      "News18 हिंदी " +
      (ct != ""
        ? ct == "news"
          ? "की खबरें"
          : ct == "photogallery"
          ? "Photos की खबरें"
          : "Videos की खबरें"
        : "की सभी खबरें");
  if (props?.data?.topicName) {
    h1Tagval = topicName;
  }
  if (topTagStory["seo_h1"] && topTagStory["seo_h1"] != "") {
    h1Tagval = topTagStory["seo_h1"];
  }
  if (
    topicName == "Manipur Elections" ||
    topicName == "Uttar Pradesh Elections" ||
    topicName == "Goa Elections" ||
    topicName == "Punjab Elections" ||
    topicName == "Uttarakhand Elections" ||
    topicName == "Assembly Elections"
  ) {
    //h1Tagval = topicName + " News 2022";
  }
  if (topicName == "Pro Kabaddi") {
    h1Tagval = "Top Pro Kabaddi News 2021";
  }
  const storyLength = tagData.length;
  const socialShareUrl = "https://hindi.news18.com/tag/" + slug;
  const gPublicUrl =
    "https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg";
  const loadPosts = async (d, type) => {
    if (d === 0 || d > 0) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 24;
      const pageLimit = 24;
      const tagResult = (await apiCall(type, offset, pageLimit)) || [];
      if (tagResult?.length > 0) {
        setLoadMore(currentLoadMore + 1);
        setTagData((prev) => [...prev, ...tagResult]);
        setLoading(false);
      }
    } else {
      const currentLoadMore = 0;
      const offset = currentLoadMore * 24;
      const pageLimit = 24;
      const tagResult = (await apiCall(type, offset, pageLimit)) || [];
      if (tagResult?.length > 0) {
        setTagData((prev) => [...prev, ...tagResult]);
        setLoading(false);
      }
    }
  };
  const apiCall = async (type, offset, pageLimit) => {
    let subString = topic ? { "tags.slug": topic } : "";
    if (topic != "" && type == "news") {
      subString = { "tags.slug": topic, post_type: "text" };
    } else if (topic !== "" && type === "videos") {
      subString = { "tags.slug": topic, post_type: "videos" };
    } else if (topic !== "" && type === "photogallery") {
      subString = { "tags.slug": topic, post_type: "photogallery" };
    } else if (topic === "" && type === "news") {
      subString = { post_type: "text" };
    } else if (topic === "" && type === "videos") {
      subString = { post_type: "videos" };
    } else if (topic === "" && type === "photogallery") {
      subString = { post_type: "photogallery" };
    }
    if (topic.toLowerCase() === "ibn7") {
      subString = { post_type: "text" };
    }
    return await getTagResult(
      {
        count: pageLimit,
        offset: offset,
        fields:
          "story_id,images,display_headline,headline,weburl,liveblog_switcher,tags,post_type,weburl_r,images_all_sizes,intro,created_at,weburl,categories",
        filter: subString,
      },
      true
    );
  };
  const [readMore, setReadMore] = useState(false);
  const ctTag = [
    { ct: "", display_name: "सभी" },
    { ct: "news", display_name: "खबरें" },
    { ct: "photogallery", display_name: "फोटो" },
    { ct: "videos", display_name: "वीडियो" },
  ];
  const changeState = (e, state) => {
    e.preventDefault();
    setLoading(true);
    setCt(state);
    setTagData([]);
    loadPosts("", state);
  };
  const arr = {slug:"",value:ctTag.find((i) => i.ct === ct).display_name};  
  breadCrumbArray = ct!=="" ? breadCrumbArray.concat(arr):breadCrumbArray;
  return (
    <>
      {/* Tag Page html start */}
      <section className="clearfix wrapper">
        <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
        {isWomenWorldCupPage ? (
          <>
            <CrTopScoreWidget womenwc="4139" />
          </>
        ) : (
          <></>
        )}
        <div className="clearfix vsp10 add container-ad">
          <div className="addinner-box addinner_box_300x250">
            <NewSiteAd
              slotId={"mobileAdNew300x250_0"}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              style={{ padding: "16px" }}
            />
          </div>
          <NewSiteAd
            slotId={"Slidder_1x1"}
            adUnit={pageAds.PG_Slider_1x1}
            sizes={[[1, 1]]}
            width={336}
            height={280}
            removeAdSpan={true}
            loadOnScroll={true}
            style={{ height: "0" }}
          />
          <NewSiteAd
            slotId={"PG_1x1"}
            adUnit={pageAds.PG_1x1}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
            style={{ height: "0" }}
          />
          <NewSiteAd
            slotId={"PG_1x1_2"}
            adUnit={pageAds.PG_1x1_2}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={false}
            style={{ height: "0" }}
          />
          <NewSiteAd
            slotId={"PG_1x1_3"}
            adUnit={pageAds.PG_1x1_3}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
            style={{ height: "0" }}
          />
        </div>
        {topic == "cryptocurrency" && (
          <div className="clearfix vsp10 add container-ad">
            <div className="bitbns_crypto_sidebar">
              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/crypto_per.png" />
              <a href="https://hindi.news18.com/news/business/cryptocurrency/bitcoin-price-in-india-today-inr/">
                VISIT MARKETPLACE
              </a>
            </div>{" "}
          </div>
        )}
        {paramObj.page == 1 && (
          <>
            <div className="tagtop-new noimage">
              <div className="tagtop-new-intro">
                <h1>{props?.data?.topicName}</h1>
              </div>
            </div>
            {tagCMSInfo && Object.keys(tagCMSInfo).length > 0 && (
              <div>
                <div className="tagInfo">
                  <img className="tagImage" src={tagImage} />
                  <div className={readMore ? "divautoheight" : ""}>
                    {readMore
                      ? ReactHtmlParser(tagDescription)
                      : ReactHtmlParser(shortTagDesc)}
                  </div>
                  {tagDescription.length > 500 && (
                    <a
                      href="javascript:void(0)"
                      onClick={() => setReadMore(!readMore)}
                      // style={{height: readMore? "270px" : "auto",}}
                      className={readMore ? "forless" : "formore"}
                    >
                      {readMore ? "वापस जाएं …" : "आगे पढ़ें …"}
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <div>
          <ul className="phtstrtupdt-shr">
            <li>
              <a
                className="arr_redirect"
                href="javascript:void(0)"
                onClick={async () => {
                  const shareData = {
                    title: "",
                    text: social_headline || "",
                    url: socialShareUrl || "",
                  };
                  try {
                    await navigator.share(shareData);
                  } catch (err) {
                    //resultPara.textContent = `Error: ${err}`;
                  }
                  logEvent("ss_wapi", "tap", "tag_page");
                }}
              >
                <svg
                  id=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="25"
                  viewBox="0 0 32 32"
                >
                  <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                </svg>
              </a>
            </li>
            <li>
              <div className="follow_us">
                <div className="fl_txt">Follow us on</div>
                <a href={gPublicUrl} className="spriteshare gn_icon"></a>
              </div>
            </li>
          </ul>
        </div>
        {topic == "mission-paani" ? <MissionPaani name="mobile" /> : null}
        {topic == "world-heart-day" && (
          <img
            src="https://images.news18.com/ibnkhabar/uploads/2021/09/Artboard%201-100.jpg"
            height="441"
            width="100%"
          />
        )}
        <div className="tgsrch-nav">
          <ul className="tgsrch-nav-list fl">
            {ctTag?.map((item, index) => {
              return (
                <li
                  key={item?.display_name + index}
                  className={item?.ct === ct ? "act" : ""}
                >
                  <a
                    onClick={(e) =>
                      changeState(e, item?.ct === "" ? "" : item?.ct)
                    }
                  >
                    {item?.display_name}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* <a title="Link" href="" className="tgsrch-nav-ar fr">
            <span></span>
          </a> */}
          <SearchButton isMobile={true} pageType={"tag"} />
        </div>
        {tagData.length > 0 && noContent ? (
          <>
            <div className="pdngsxtn-lr vsp8 gallery gallery_1">
              <div className="clearfix"></div>
              <ul className="gridview-story nbdr nmrgn">
                {tagData?.length
                  ? tagData.map((item, ind) => {
                      const listNo = ind + 1;
                      const content_type = item?.post_type || "";
                      const display_headline =
                        item.display_headline || item.title;
                      const images_all_sizes = item?.images_all_sizes?.sizes
                        ? item?.images_all_sizes?.sizes
                        : [];
                      const URL = images_all_sizes;
                      const thumbnail =
                        (URL && URL["4x3"]?.url) || item.thumbnail || "";
                      const url = item?.weburl || "";
                      const category = item.category || "";
                      const viewRandom = Math.round(
                        min + Math.random() * (viewMax - min)
                      );
                      const likeRandom = Math.round(
                        min + Math.random() * (likeMax - min)
                      );
                      const views = rand(viewRandom);
                      const like = rand(likeRandom);
                      return (
                        <>
                          <li
                            className={
                              (item?.post_type || "").toLowerCase() == "videos"
                                ? "forvideoicon"
                                : (item?.post_type || "").toLowerCase() ==
                                  "photogallery"
                                ? "forphotoicon"
                                : "message"
                            }
                            key={listNo}
                            data-currind={ind}
                            data-currloadmore={loadMore}
                          >
                            <figure>
                              {item?.post_type === "videos" && (
                                <span className="nwvideoicon"></span>
                              )}
                              <a title="Link" href={url}>
                                <span className=""></span>
                                <div className="tgtm-shr">
                                  <span className="tpc fl">{category}</span>
                                  <span className="tpc fl">{content_type}</span>
                                  <div className="tshr fr">
                                    <span>
                                      {views}
                                      <em className="sprite eye"></em>
                                    </span>
                                    <span>
                                      {like}
                                      <em className="sprite hrt"></em>
                                    </span>
                                  </div>
                                </div>
                              </a>
                              <a title="Link" href={url}>
                                <LazyLoadImage
                                  height={imageHeight}
                                  width={imageWidth}
                                  src={thumbnail}
                                  alt={display_headline}
                                  title={display_headline}
                                />
                              </a>
                            </figure>
                            <div className="lstintro">
                              <h2>
                                <a title="Link" href={url}>
                                  {display_headline}
                                </a>
                              </h2>
                            </div>
                          </li>
                          {ind == 1 && <MissionPaani name="desktop-rhs" />}
                          {ind == 3 && (
                            <div className="clearfix vsp10 add container-ad">
                              <div className="addinner-box addinner_box_300x250">
                                <NewSiteAd
                                  slotId={"mobileAdNew300x250_" + listNo}
                                  adUnit={pageAds.ATF_300}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  width={300}
                                  height={280}
                                  lazyLoad={true}
                                />
                              </div>
                            </div>
                          )}
                          {ind == 7 && (
                            <div className="clearfix vsp10 add container-ad">
                              <div className="addinner-box addinner_box_300x250">
                                <NewSiteAd
                                  width={300}
                                  height={250}
                                  slotId={"mobileAdNew300x250_" + listNo}
                                  adUnit={pageAds.ATF_300}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  lazyLoad={true}
                                />
                              </div>
                            </div>
                          )}
                          {ind > 23 && ind == 24 * (loadMore - 1) + 1 && (
                            <div className="clearfix vsp10 add container-ad">
                              <div className="addinner-box addinner_box_300x250">
                                <NewSiteAd
                                  width={300}
                                  height={250}
                                  slotId={"mobileAdNew300x250_" + listNo}
                                  adUnit={pageAds.BTF_300}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  lazyLoad={true}
                                />
                              </div>
                            </div>
                          )}
                          {ind > 23 && ind == 24 * (loadMore - 1) + 5 && (
                            <div className="clearfix vsp10 add container-ad">
                              <div className="addinner-box addinner_box_300x250">
                                <NewSiteAd
                                  width={300}
                                  height={250}
                                  slotId={"mobileAdNew300x250_" + listNo}
                                  adUnit={pageAds.BTF_300}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  lazyLoad={true}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })
                  : null}
              </ul>
            </div>
          </>
        ) : (
          <p className="defaultMsg">
            {loading ? "" : "No stories found matching this criteria"}
          </p>
        )}
        {paramObj.page > 1 ? (
          noContent ? (
            <Pagination
              curpage={paramObj.page}
              TotalRecord={dataLength}
              limit={24}
              pageurl={pageurl}
              pageflag={false}
            />
          ) : null
        ) : storyLength > 0 ? (
          loadMore <= 30 ? (
            <button
              onClick={() => loadPosts(loadMore, ct)}
              className="load_more clearfix"
            >
              Load More
            </button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </section>
      {/* Tag Page html End */}
      <style jsx global>
        {`
          body {
            font-family: "Mukta", serif !important;
          }
          .home_strip_ad {
            background: #e5e3e3;
            max-width: 360px;
            height: 60px;
            margin-bottom: 1px;
            margin: auto;
            margin-top: 10px;
          }
          .cnsmpn-hd {
            font-size: 24px;
            line-height: 36px;
          }
          .defaultMsg {
            text-align: center;
          }
          .ftrad {
            position: fixed;
            bottom: 62px;
            align-items: center;
            justify-content: center;
            width: 100%;
            left: 0px;
            background: #fff;
            padding: 6px 0;
            text-align: center;
            margin: 0px auto;
            box-shadow: 0px -1px 0px #ccc;
            z-index: 999999;
            transition: all 0.5s ease-in-out;
          }
          .ftrad.ftradcls {
            bottom: 0;
          }
          .btnvav {
            bottom: 0px;
            height: 65px;
            z-index: 999999;
            transition: all 0.5s ease-in-out;
          }
          .adclsftr {
            bottom: -70px;
          }
          .wrapper {
            margin-bottom: 60px;
          }
          nav {
            z-index: 9999999;
          }
          .add {
            background: #dbdde3 !important;
            margin: 0 auto 10px;
            text-align: center;
          }
          .ad-cntainer {
            height: 300px;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
          }
          .ad-cntainer-fly {
            height: 60vh;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
          }
          .adinner {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            clip: rect(0, auto, auto, 0) !important;
            -webkit-clip-path: polygon(
              0px 0px,
              100% 0px,
              100% 100%,
              0px 100%
            ) !important;
            clip-path: polygon(
              0px 0px,
              100% 0px,
              100% 100%,
              0px 100%
            ) !important;
          }
          .adinner-fxbox {
            position: fixed !important;
            top: 0 !important;
            width: 100%;
            height: 100%;
            -webkit-transform: translateZ(0) !important;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            left: 0 !important;
          }
          .lvtvshr-l a span:before {
            display: none !important;
          }
          body {
            font-size: 100%;
            font-weight: 400;
            margin: auto;
          }
          body.ovrflhdn {
            overflow: hidden;
          }
          article,
          aside,
          figure,
          footer,
          header,
          nav,
          section {
            display: block;
          }
          article,
          aside,
          figure,
          footer,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          nav,
          ol,
          p,
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          a {
            text-decoration: none;
            color: #111;
          }
          a img {
            border: none;
          }
          .fl {
            float: left;
          }
          .fr {
            float: right;
            display: inline !important;
          }
          .clearfix {
            clear: both;
          }
          .clearfix:after,
          .clearfix:before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
          }
          // header {
          //   background: #fff;
          //   width: 100%;
          //   height: 54px;
          //   padding: 0 10px;
          //   z-index: 9999;
          //   position: relative;
          //   display: flex;
          //   justify-content: space-between;
          //   box-sizing: border-box;
          //   align-items: center;
          // }
          .tpnv {
            padding: 30px 8px 0 0;
            height: 25px;
          }
          .tpnv-icn,
          .tpnv-icn:after,
          .tpnv-icn:before {
            content: "";
            background: #000;
            height: 2px;
            position: relative;
            left: 0;
            width: 22px;
            display: block;
            margin: auto;
          }
          .tpnv-icn:before {
            top: -6px;
          }
          .tpnv-icn:after {
            top: 4px;
          }
          .ty-one span {
            font-size: 11px;
            display: block;
            text-align: center;
            color: #000;
            font-weight: 700;
          }
          .top_links_element {
            overflow-y: hidden;
          }
          .top_links_element a.home-icon {
            position: sticky;
            left: 0;
            border-right: 0;
            background: #f7f7f7;
          }
          .top_links_element {
            display: flex;
            justify-content: space-between;
            overflow-y: hidden;
            align-items: center;
            padding-top: 6px;
          }
          .top_links_cont a:nth-of-type(2) {
            border-left: 1px solid #ccc;
            margin-left: 2px;
          }
          .top_links_cont a:last-child {
            border-right: 0;
          }
          .ty-one {
            position: relative;
            top: -2px;
          }
          .add,
          .add2 {
            z-index: 1;
          }
          // div.addinner_box_300x250 {height:250px;width:300px;}
          div.addinner_box_320x50 {
            height: 68px;
            width: 320px;
          }
          div.addinner_box_300x100 {
            height: 118px;
            width: 300px;
          }
          .tagtop-new {
            position: relative;
          }
          .tagtop-new-img {
            line-height: 0;
            width: 100%;
          }
          .tagtop-new-img img {
            width: 100%;
          }
          .tagtop-new-intro {
          }
          .tagtop-new-intro h1 {
            color: #001d42;
            font-size: 26px;
            font-weight: 700;
            line-height: 32px;
          }
          .adcls-tag-ocpn,
          .adcls-tagtop-new-intro h2,
          .adcls-tagtop-new-intro p {
            opacity: 0.2;
          }
          .tagtop-new-share {
            position: absolute;
            top: 10px;
            right: 40px;
            display: flex;
            z-index: 1;
            transform: scale(0);
          }
          .tagtop-new-share a {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            display: flex;
            justify-content: center;
            border-radius: 100%;
            border: 2px solid #c9c9c9;
            align-items: center;
          }
          .tagtop-new-share a span {
            display: block;
          }
          .tagtop-new-share a span.icon-facebook {
            background: url(https://images.news18.com/ibnkhabar/uploads/2020/01/facebook-icon-white.png)
              0 0 no-repeat;
            width: 10px;
            height: 14px;
            background-size: 8px;
          }
          .tagtop-new-share a span.icon-twitter {
            background: url(https://images.news18.com/ibnkhabar/uploads/2020/01/twitter-icon-white.png)
              0 0 no-repeat;
            width: 15px;
            height: 11px;
            background-size: 14px;
          }
          .tagtop-new-share a span.icon-twitter {
            background: url(https://images.news18.com/ibnkhabar/uploads/2020/01/twitter-icon-white.png)
              0 0 no-repeat;
            width: 15px;
            height: 11px;
            background-size: 14px;
          }
          .tagtop-new-share a span.icon-whatsapp {
            background: url(https://images.news18.com/ibnkhabar/uploads/2020/01/whatsapp-icon-white.png)
              0 0 no-repeat;
            width: 17px;
            height: 17px;
            background-size: 17px;
          }
          .adcls-tagtop-new-share {
            transform: scale(1);
          }
          .tagtop-shareicon {
            width: 26px;
            height: 26px;
            text-align: center;
            border-radius: 100%;
            border: 2px solid #c9c9c9;
            display: block;
            position: absolute;
            top: 10px;
            right: 12px;
            background: url(https://images.news18.com/ibnkhabar/uploads/2019/02/share.png)
              4px 5px no-repeat;
            background-size: 13px;
          }
          .adcls-tagtop-shareicon {
            background: url(https://images.news18.com/ibnkhabar/uploads/2019/02/share_red.png)
              4px 5px no-repeat;
            background-size: 11px;
            border-color: #e40600;
          }
          .tagtop-new * {
            transition: all 0.5s ease-in-out;
          }
          .tagtop-new.noimage {
            padding: 15px;
          }
          .tagtop-new.noimage img {
            display: none;
          }
          .tag-ocpn li {
            margin-bottom: 10px;
            font-size: 15px;
            color: #eee;
          }
          .cnsmpn-hd.txtwht {
            color: #303030 !important;
            margin-left: 10px;
            font-size: 18px;
          }
          .tgsrch-nav {
            background: #282828;
            padding: 0 16px;
            width: 100%;
            height: 46px;
            border-top: 1px solid #fff;
            box-sizing: border-box;
            position:relative;
          }
          .tgsrch-nav-list li {
            padding: 0 8px;
            line-height: 46px;
            height: 46px;
            font-size: 18px;
            float: left;
            position: relative;
            margin-right: 8px;
          }
          .tgsrch-nav-list li.act:before {
            content: "";
            position: absolute;
            bottom: 1px;
            height: 3px;
            background: #ee1c25;
            left: 0;
            right: 0;
          }
          .tgsrch-nav-list li a {
            color: #989898;
          }
          .tgsrch-nav-list li.act a {
            color: #fff;
            font-weight: 700;
          }
          .tgsrch-nav-ar {
            width: 30px;
            position: relative;
            margin-top: 14px;
          }
          .tgsrch-nav-ar span,
          .tgsrch-nav-ar span:after,
          .tgsrch-nav-ar span:before {
            content: "";
            height: 3px;
            background: #fff;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
          .tgsrch-nav-ar span:before {
            top: 7px;
            width: 20px;
          }
          .tgsrch-nav-ar span:after {
            top: 14px;
            width: 10px;
          }
          .pdngsxtn-lr {
            padding: 0 16px;
          }
          .gridview-story {
            border-bottom: 1px solid #ccc;
            padding: 0;
            margin-bottom: 16px;
            position: relative;
            clear: both;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .gridview-story.nmrgn {
            margin-bottom: 0;
          }
          .gridview-story.nbdr {
            border-bottom: none;
          }
          .gridview-story li {
            border: 1px solid #ddd;
            background: #fff;
            float: left;
            width: 48%;
            margin-bottom: 16px;
            box-sizing: border-box;
            padding-bottom: 8px;
          }
          .gridview-story li figure {
            width: 100%;
            float: left;
            line-height: 0;
            position: relative;
            margin-bottom: 8px;
          }
          .gridview-story li a {
            color: #404040;
            z-index: 9999;
          }
          .gridview-story li figure .tgtm-shr {
            display: none;
          }
          .cnsmpn-tpphtstr img,
          .gridview-story li figure img {
            width: 100%;
          }
          .gridview-story li .lstintro {
            padding: 0 8px;
            cursor: pointer;
            margin: 0;
            clear: both;
            overflow: hidden;
          }
          .gridview-story li h2 {
            font-size: 16px;
            line-height: 24px;
            clear: both;
            font-weight: bold;
          }
          .vsp8 {
            margin-top: 8px;
          }
          .vsp16 {
            margin-top: 16px;
          }
          .tagtop-new-share a span.icon-linkedin2 {
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/linkediniconnew_1589533700.png)
              0 0 no-repeat;
            width: 13px;
            height: 13px;
            background-size: 14px;
            position: relative;
            top: -1px;
          }
          .myupchar_logo {
            width: 103px;
            padding: 5px 4px;
            position: absolute;
            right: 0;
            border-radius: 0px 0px 0px 10px;
            background: #fff;
            z-index: 1;
          }
          .myupchar_logo img {
            width: 86px;
            height: auto;
          }
          .myupchar_sub_logo {
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .myupchar_sub_logo img {
            width: 70px;
            height: 15px;
          }
          li.forpurplebg {
            position: relative;
            padding-bottom: 21px;
          }
          .myupchar_sub_link a {
            color: #00b19f;
          }
          .sttbs {
            display: flex;
            align-items: center;
            padding: 10px 0;
            margin: 10px 0;
            background: #f4f4f4;
            border-top: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            overflow: scroll;
          }
          .sttbs li {
            margin: 0 20px;
            flex-shrink: 0;
          }
          .sttbs li a {
            font-weight: 300;
            line-height: 24px;
            color: #464646;
            font-size: 18px;
            text-transform: uppercase;
            padding-bottom: 5px;
            position: relative;
            display: block;
          }
          .sttbs li.active a {
            font-weight: 600;
            color: #e1261c;
          }
          .sttbs li.active a::after {
            content: "";
            position: absolute;
            height: 3px;
            width: 100%;
            background: #e1261c;
            left: 0;
            bottom: 0;
          }
          .tagDesc {
            padding: 15px;
          }
          .bitbns_crypto_sidebar * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .bitbns_crypto_sidebar {
            width: 300px;
            height: 100px;
            position: relative;
            margin: auto;
          }
          .bitbns_crypto_sidebar img {
            width: 100%;
          }
          .bitbns_crypto_sidebar a {
            background: #da5c4f;
            padding: 10px 25px 10px 15px;
            border-radius: 4px;
            color: #fff;
            text-transform: uppercase;
            text-decoration: underline;
            position: absolute;
            bottom: 0;
            right: 5px;
            font-size: 13px;
          }
          .bitbns_crypto_sidebar a:after {
            content: "";
            position: absolute;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            top: 14px;
            right: 9px;
          }
          .nwvideoicon {
            width: 45px;
            height: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            margin: -22px 0 0 -22px;
            cursor: pointer;
            opacity: 0.7;
            background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
          }
          .agli_khb_r_sec {
            margin-bottom: 15px;
            position: relative;
          }
          body .agli_khb_r_sec .extra_nws_hdng_sec {
            height: auto;
            padding: 4px 15px 0px;
          }
          .extra_nws_hdng_sec {
            background-color: rgb(6, 24, 54);
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            height: 40px;
            padding: 10px 15px 0px;
          }
          body .agli_khb_r_sec .extra_nws_hdng_sec h2 {
            font-size: 16px;
            line-height: 32px;
            font-weight: bold;
            font-family: Mukta, sans-serif !important;
          }
          .extra_nws_hdng_sec h2 {
            color: rgb(255, 255, 255);
          }
          .forvideoicon:before {
            position: absolute;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Video_Icon_1659522062.svg)
              0 0 no-repeat;
            z-index: 1;
            width: 50px;
            height: 50px;
            content: "";
          }
          .forphotoicon:before {
            position: absolute;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Photo_Icon_1659521957.svg)
              0 0 no-repeat;
            z-index: 1;
            width: 50px;
            height: 50px;
            content: "";
          }
          .load_more {
            width: 130px;
            height: 38px;
            background: #ed1c24;
            border-radius: 19px;
            font-size: 17px;
            color: #ffffff;
            line-height: 38px;
            border: none;
            display: table;
            margin: auto;
            cursor: pointer;
          }
          .section-blog {
            display: flex;
            justify-content: space-between;
          }
          .phtstrtupdt-shr {
            display: flex;
            align-items: center;
            text-align: left;
            border-top: 2px solid #061836;
            margin: 0px 15px;
            justify-content: right;
            padding: 10px 0px;
          }
          .phtstrtupdt-shr li {
            color: #6b6b6b;
            font-size: 14px;
            text-transform: uppercase;
            line-height: 0;
            margin-right: 10px;
          }
          .spriteshare {
            background: url(/images/siteimages/sprite_img_1.svg) 0 0 no-repeat;
            width: 40px;
            height: 40px;
            display: block;
          }
          .spriteshare.art-facebook-icon {
            background-position: 0px 0px;
          }
          .spriteshare.art-twitter-icon {
            background-position: 0px -50px;
          }
          .spriteshare.art-linkedin-icon {
            background-position: 0px -100px;
          }
          .spriteshare.art-whatsapp-icon {
            background-position: 0px -150px;
          }
          .spriteshare.art-telegram-icon {
            background-position: 0 -200px;
          }
          .spriteshare.art-email-icon {
            background-position: 0 -250px;
          }
          .spriteshare.gn_icon {
            background: #fff url(/images/siteimages/sprite_img_1.svg?v1.5)
              no-repeat bottom;
            margin-left: 10px;
          }
          .follow_us {
            border-left: 1px solid rgb(90, 90, 90);
            padding-left: 8px;
            display: flex;
            align-items: center;
          }
          .fl_txt {
            font-size: 11px;
            color: rgb(90, 90, 90);
            width: 30px;
            text-transform: none;
            line-height: 12px;
          }
          .tagInfo img {
            width: 100%;
            background: #000;
          }
          .formore {
            padding: 80px 0px 10px 0px;
            text-align: center;
            color: #e1261d;
            position: relative;
            background: linear-gradient(transparent, #fff);
            z-index: 1;
            display: block;
            margin-top: -90px;
          }
          .forless {
            padding: 0px 0px 10px 0px;
            text-align: center;
            color: #e1261d;
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            z-index: 1;
            display: block;
          }
          .tagInfo {
            font-size: 15px;
            line-height: 24px;
            position: relative;
          }
          .tagInfo p {
            font-size: 16px;
            line-height: 24px;
            margin: 10px 15px;
            color: #333;
          }
          .tagInfo h2 {
            font-size: 18px;
            line-height: 24px;
            margin: 10px 15px;
            color: #111;
            font-weight: bold;
          }
          .divautoheight {
            height: auto;
          }
          .arr_redirect {
            background: #ffffff;
            border: 1px solid #c7c7c7;
            border-radius: 24px;
            color: #343a40;
            display: flex;
            float: left;
            line-height: 16px;
            margin: 0;
            position: relative;
            padding: 0;
            text-transform: capitalize;
            text-align: center;
            align-items: center;
            height: 35px;
            min-width: 35px;
            justify-content: center;
            flex-direction: row;
          }
        `}
      </style>
    </>
  );
};
export default TagMobile;