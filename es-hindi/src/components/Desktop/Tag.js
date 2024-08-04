import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import Pagination from "widgets/Common/Desktop/Pagination";
import ReactHtmlParser from "html-react-parser";
import MissionPaani from "widgets/Common/Responsive/MissionPaani";
import TagEventCommon from "widgets/Common/Responsive/TagEventWidget";
import CrTopScoreWidget from "widgets/Common/Responsive/CrTopScoreWidget";
import React, { useState } from "react";
import { getTagResult } from "api/individual/Tag";
import LazyLoadImage from "components/Common/CustomImage";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { timeConverter } from "includes/blogs.util";
import { truncateString } from "includes/newsFeed.helper";
import SearchButton from "components/Common/SearchButton";
const Tag = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { topic } = props.data;
  const [ct, setCt] = useState(props.data.ct || "");
  const [loading, setLoading] = useState(false);
  const [tagData, setTagData] = useState(props.data.tagData);
  const [loadMore, setLoadMore] = useState(1);
  const { dataLength } = props.data;
  const { paramObj } = props.data;
  const { pageLimit } = props.data;
  const { topicName } = props.data;
  const { imageWidth } = props.data;
  const { imageHeight } = props.data;
  const { photoStories } = props.data;
  const { topStory } = props.data;
  const { topStories } = props.data;
  let breadCrumbArray = props?.data?.breadCrumbArray;
  const outBrainUrl = props.data.currentUrl.replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  const { topTagStory } = props.data;
  const { tagCMSInfo } = props.data;
  const tagImage = tagCMSInfo?.term_image
    ? tagCMSInfo?.term_image.indexOf("https") === 0
      ? tagCMSInfo.term_image
      : "https://images.news18.com/ibnkhabar/uploads/" + tagCMSInfo.term_image
    : "";
  const tagDescription = tagCMSInfo?.term_description
    ? tagCMSInfo.term_description
    : "";
  const shortTagDesc = tagDescription.substring(0, 600);
  let isImageExists = true;
  let isDescExists = true;
  const social_headline =
    props.data?.pageSeo?.og_title || topicName + " Tag Page";
  if (tagDescription == "") {
    isDescExists = false;
  }
  if (tagImage == "") {
    isImageExists = false;
  }
  const slug =
    topic != "" && ct != ""
      ? topic + "/" + ct + "/"
      : topic != "" && ct == ""
      ? topic + "/"
      : topic == "" && ct != ""
      ? ct + "/"
      : "";
  const { isWomenWorldCupPage } = props.data;
  const socialShareUrl = "https://hindi.news18.com/tag/" + slug;
  const fbUrl =
    "https://www.facebook.com/sharer.php?u=" +
    socialShareUrl +
    "&t=" +
    social_headline;
  const twUrl =
    "https://twitter.com/intent/tweet?mini=true&url=" + socialShareUrl;
  const whatspUrl =
    "https://web.whatsapp.com/send?text=" +
    social_headline +
    " - " +
    socialShareUrl;
  const telegUrl =
    "https://telegram.me/share/url?url=?mini=true&url=" +
    social_headline +
    "&url=" +
    socialShareUrl;
  const gPublicUrl =
    "https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg";
  const setDefaultImage = ({ target }) => {
    target.src = target.dataset?.src;
    target.srcset = target.dataset?.src;
    target.onError = "";
  };
  let rhsTopStoryListing = [];
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
  if ("rhsTopStoryListing" in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;
  const pageurl =
    paramObj.topic != ""
      ? `/tag/${paramObj.topic}/${paramObj.ct}`
      : `/tag/${paramObj.ct}`;
  const noContent = dataLength > 720 && paramObj.page > 30 ? false : true;
  let h1Tagval = "News18 हिंदी ";
  if (topicName) {
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
    //h1Tagval = (topicName) + " News 2022";
  }
  if (topicName == "Pro Kabaddi") {
    h1Tagval = "Top Pro Kabaddi News 2021";
  }
  const [readMore, setReadMore] = useState(false);
  const storyLength = tagData.length;
  const changeState = (e, state) => {
    e.preventDefault();
    setLoading(true);
    setCt(state);
    setTagData([]);
    loadPosts("", state);
  };
  const ctTag = [
    { ct: "", display_name: "सभी" },
    { ct: "news", display_name: "खबरें" },
    { ct: "photogallery", display_name: "फोटो" },
    { ct: "videos", display_name: "वीडियो" },
  ];
  const arr = {slug:"",value:ctTag.find((i) => i.ct === ct).display_name};  
  breadCrumbArray = ct!=="" ? breadCrumbArray.concat(arr):breadCrumbArray;  
  return (
    <>
      {/* Tag Page html start*/}
      {topic == "mission-paani" && <MissionPaani name="desktop" />}
      <div className="outer">
        <div className="section-blog">
          {isWomenWorldCupPage && (
            <>
              <CrTopScoreWidget womenwc="4139" />
            </>
          )}
          <div className="section-blog-left resLiftSideFull">
            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
            <TagEventCommon
              name="desktop"
              dataList={topTagStory}
              topic={topic}
            />
            <div className="clearfix"></div>
            <div className="tag-with-intro-sharewrap">
              <h1>{h1Tagval}</h1>
              <ul className="phtstrtupdt-shr">
                <li>
                  <a className="for-whatsapp" href={whatspUrl} target="_blank">
                    <span className="spriteshare art-whatsapp-icon"></span>
                  </a>
                </li>
                <li>
                  <a href={fbUrl} target="_blank">
                    <span className="spriteshare art-facebook-icon"></span>
                  </a>
                </li>
                <li>
                  <a href={telegUrl} target="_blank">
                    <span className="spriteshare art-telegram-icon"></span>
                  </a>
                </li>
                <li>
                  <a href={twUrl} target="_blank">
                    <span className="spriteshare art-twitter-icon"></span>
                  </a>
                </li>
                {/* <li><a href={kooUrl} target="_blank"><span className="spriteshare art-linkedin-icon"></span></a></li> */}
                <li>
                  <div className="follow_us">
                    <div className="fl_txt">Follow us on</div>
                    <a href={gPublicUrl} className="spriteshare gn_icon"></a>
                  </div>
                </li>
              </ul>
            </div>
            {paramObj.page == 1 &&
              ct == "" &&
              (isDescExists || isImageExists) && (
                <div className="tag-with-heading-intro noimage">
                  <figure>
                    <a href="#">
                      <img
                        src="https://images.news18.com/ibnkhabar/uploads/2017/04/greyimg.jpg"
                        className="fader"
                        data-original="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                        alt=""
                        title=""
                      />
                    </a>
                  </figure>
                  <div className="tag-with-intro">
                    <div>
                      <div className="tagInfo">
                        {isImageExists && (
                          <img className="tagImage" src={tagImage} />
                        )}
                        <div className={readMore ? "divautoheight" : ""}>
                          {readMore
                            ? ReactHtmlParser(tagDescription)
                            : ReactHtmlParser(shortTagDesc)}
                        </div>
                        {tagDescription.length > 600 && (
                          <a
                            href="javascript:void(0)"
                            onClick={() => setReadMore(!readMore)}
                            // style={{display: tagCMSInfo?.term_description.length > 50 ? "block" : "none",}}
                            className={readMore ? "formore" : "formore"}
                          >
                            {readMore ? "वापस जाएं …" : "आगे पढ़ें  …"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {topic == "uttar-pradesh-elections" ||
            topic == "punjab-elections" ||
            topic == "uttarakhand-elections" ||
            topic == "assembly-elections" ||
            topic == "goa-elections" ||
            topic == "manipur-elections" ? (
              <></>
            ) : null}
            <div className="search-listing">
              <>
                <div id="top-nav">
                  <ul className="parent">
                    {ctTag?.map((item, index) => {
                      return (
                        <li key={item?.display_name + index}>
                          <a
                            className={item?.ct === ct ? "act" : ""}
                            onClick={(e) =>
                              changeState(e, item?.ct === "" ? "" : item?.ct)
                            }
                          >
                            {item?.display_name}
                          </a>
                        </li>
                      );
                    })}
                     <SearchButton pageType={"tag"}/>
                  </ul>
                 
                </div>
                <ul className="listingData">
                  {tagData?.length > 0 && noContent ? (
                    tagData.map((item, ind) => {
                      const listNo = ind + 1;
                      const { display_headline } = item;
                      const thumbnail = item.images.url || "";
                      const url = item.weburl || "";
                      const intro = item.intro || "";
                      let category = "";
                      if (item?.categories && item.categories.length > 0) {
                        category = item.categories
                          .map((u) => u.name)
                          .join(", ");
                      } else {
                        category = "";
                      }
                      return (
                        <>
                          {" "}
                          <li
                            key={display_headline + listNo}
                            style={{ justifyContent: "flex-start" }}
                          >
                            <figure>
                            {item?.post_type === "videos" && (
                                <span className="nwvideoicon"></span>
                              )}
                              <a href={url}>
                                <LazyLoadImage
                                  src={thumbnail}
                                  width={imageWidth}
                                  height={imageHeight}
                                  onError={setDefaultImage}
                                  alt={display_headline}
                                  title={display_headline}
                                />
                              </a>
                            </figure>
                            <div
                              className="search-listing-details"
                              style={{ width: "100%" }}
                            >
                              <h2>
                                <a
                                  href={url}
                                  dangerouslySetInnerHTML={{
                                    __html: display_headline,
                                  }}
                                ></a>
                              </h2>
                              <p>
                                <a
                                  href={url}
                                  dangerouslySetInnerHTML={{
                                    __html: truncateString(intro, 250),
                                  }}
                                ></a>
                              </p>
                              <span className="post-date">
                                <a href="javascript:void(0)"> {category}</a>
                                {"|"}{" "}
                                {item?.created_at
                                  ? timeConverter(item?.created_at)
                                  : ""}
                              </span>
                            </div>
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <p>
                      {loading ? "" : "No stories found matching this criteria"}
                    </p>
                  )}
                </ul>
              </>
            </div>
            {paramObj.page == 1 && storyLength > 0 && (
              <>
                <NewSiteAd
                  slotId={"Desktop_Static_Ad_2"}
                  adUnit={props.pageAds.BTF_728}
                  sizes={[
                    [728, 90],
                    [1, 1],
                  ]}
                  width={728}
                  height={90}
                  loadOnScroll={true}
                />
                <div className="clearfix vsp10"></div>
              </>
            )}
            {paramObj.page > 1 ? (
              noContent ? (
                <Pagination
                  curpage={paramObj.page}
                  TotalRecord={dataLength}
                  limit={pageLimit}
                  pageurl={pageurl}
                  pageflag={false}
                />
              ) : null
            ) : (
              storyLength > 0 &&
              loadMore <= 30 && (
                <button
                  onClick={() => loadPosts(loadMore, ct)}
                  className="load_more clearfix"
                >
                  Load More
                </button>
              )
            )}
          </div>
          {/* Side bar start here */}
          <RhsCommon
            section="tag"
            pageAds={props.pageAds}
            currentURL={outBrainUrl}
            topicName={topic}
            photoStories={photoStories}
            topStories={
              rhsTopStoryListing.length ? rhsTopStoryListing : topStories
            }
          />
          {/* Side bar end here */}
        </div>
      </div>
      {/* Tag Page html End */}
      <style jsx global>
        {`
                    .home_strip_ad{
                        background: #e5e3e3;
                        max-width: 1244px;
                        height: 60px;
                        margin-bottom: 1px;
                        margin: auto;
                        margin-top: 10px;
                    }
                    body{margin:0;padding:0;list-style:none;outline:0;text-decoration:none;font-family: 'Mukta', serif;!important}figure,footer,h1,h2,h3,h4,h5,h6,nav,ol,p,ul{margin:0;padding:0}li{list-style:none}a{text-decoration:none;color:#111}a img{border:none}.clearfix{clear:both}.clearfix:after,.clearfix:before{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0}.container{margin:auto;max-width:1244px;padding:0 10px;position:relative}.fleft{float:left;}.fright{float:right;}.dflex{display:flex}.justify-space-betwwen{justify-content:space-between}.justify-space-center{justify-content:center}.flex-wrap{flex-wrap:wrap}.leftwrap{width:calc(100% - 325px);float:left;position:relative}.rightwrap{width:300px;float:right;}.n18nheader{position:relative;z-index:3}.n18thder{text-align:center;padding:15px 0}.n18bhdr .n18hcontainer{width:1244px;position:relative;margin:0 auto;display:flex;justify-content:space-between}.n18bhdr .logonsection{display:flex;padding-top:20px;position:absolute;left:0}.nhhdr-nav{position:absolute;right:0;top:0}.n18bhdr .logonsection h2{font-size:30px;margin-top:5px;color:#fff;padding:5px 0 0 15px;border-left:1px solid #374b48;height:52px}.n18bhdr .logonsection .nhlogo{padding-right:15px}.n18bhdr .lnlivetv{display:flex;justify-content:space-between}.n18bhdr .lnlivetv .languagebox{background:#e1261d;padding-left:10px;box-sizing:border-box;height:27px;border-radius:0 0 7px 7px;display:flex;justify-content:space-between;font-size:13px;color:#fff;line-height:27px;font-weight:700;box-shadow:2px 2px 4px rgba(00,00,00,.2)}.n18bhdr .lnlivetv .languagebox .linner{background:#fff;height:100%;margin-left:10px;padding-left:10px;line-height:27px;box-sizing:border-box;width:130px;color:#3c3c3c;font-size:12px;position:relative;border-radius:0 0 7px 7px}.n18bhdr .lnlivetv .languagebox .linner a{color:#3c3c3c;display:block}.n18bhdr .lnlivetv .languagebox .linner .lddnav{font-size:12px;background:#fff;width:100%;box-sizing:border-box;position:absolute;top:21px;left:0;display:none;box-shadow:2px 2px 4px rgba(00,00,00,.2)}.n18bhdr .lnlivetv .languagebox .linner:hover .lddnav{display:block}.n18bhdr .lnlivetv .languagebox .linner .lddnav.adcls{display:block}.n18bhdr .lnlivetv .languagebox .linner .lddnav a{display:block;margin:5px 0;color:#3c3c3c}.n18bhdr .lnlivetv .languagebox .linner .lddnav a:hover{background:#e1261d;color:#fff}.n18bhdr .lnlivetv:hover .lnlapp strong{border-bottom:none}
                    .n18bhdr .nhtranding{border-radius:20px;line-height:26px;height:26px;padding:0 15px;background:#fff;font-size:13px;color:#e1261d;margin-top:26px;display:inline-block;font-weight:700;float:right}.nhtranding p{display:inline-block}.n18bhdr .nhtranding a{color:#646464;padding-left:20px;font-weight:400}
                    .n18bhdr .nhtranding a:hover{color:#e1261d}
                    .n18bhdr .nhsocial{background:#fff;border-radius:0 0 7px 7px;box-shadow:2px 2px 4px rgba(00,00,00,.2);height:27px;padding:0 10px;line-height:27px}
                    .n18bhdr .nhsocial strong{font-size:13px;position:relative;font-weight:400;color:#666;padding-right:25px;position:relative}
                    .n18bhdr .nhsocial strong:after{content:'';width:5px;height:5px;position:absolute;border-left:1px solid #7a7a7a;border-top:1px solid #7a7a7a;right:13px;top:4px;transform:rotate(132deg)}
                    .hsocial-sprite{background:url(https://images.news18.com/ibnkhabar/uploads/2020/02/social-sprite-img.png) no-repeat;display:inline-block}
                    .nhlanguate-arrow{background-position:-64px -1px;width:12px;height:15px;position:absolute;top:5px;right:10px}
                    .nhlivetv-icon{background-position:0px -2px;width:18px;height:16px;position:relative;top:2px}
                    .nhltv-arrow{background-position:-66px -21px;width:12px;height:15px;position:relative;top:2px}
                    .nhapp-icon{background-position:-24px -2px;width:10px;height:18px;position:relative;top:6px}
                    .nhfb-icon{background-position:-45px -1px;width:8px;height:16px;position:relative;top:2px}
                    .nhtw-icon{background-position:-1px -22px;width:17px;height:15px;position:relative;top:2px;margin:0 15px}
                    .nhig-icon{background-position:-24px -20px;width:17px;height:18px;position:relative;top:2px;margin-right:15px}
                    .nhutb-icon{background-position:-45px -21px;width:17px;height:16px;position:relative;top:2px}
                    .vsp10{margin-top:10px}
                    .vsp15{margin-top:15px}.vsp20{margin-top:20px}
                    .vsp30{margin-top:30px}
                    .brdacrum{font-size:13px;color:#3E3E3E;line-height:18px;font-weight:700;margin:0 0 15px 0;border-bottom: 1px dotted #3E3E3E;
    padding-bottom: 8px;}
    .brdacrum h1{display:inline-block;font-size:14px;}.brdacrum a{color:#404040;font-weight:400;margin-right:2px}.middlead{display:flex;justify-content:center;margin:15px 0}figure{line-height:0;position:relative}figure img{width:100%}.globalhd{border-bottom:1px solid #001536;padding-bottom:4px;position:relative}.globalhd h2{color:#111;font-size:16px;font-weight:700;line-height:28px;flex-shrink:0;margin-right:20px;text-transform:uppercase}.globalhd h2 a{color:#001536}.globalhd.large h2{font-size:18px;line-height:28px}.globalhd:after{content:"";width:25px;height:4px;position:absolute;bottom:-2px;left:0;background:#ed1c24}/*nav start */.topnav{background:#f5f5f5;width:100%;border-top:1px solid #eee;border-bottom:1px solid #eee;position:sticky;top:0;z-index:2}nav ul li{position:relative}
    // nav ul li a{font-size:16px;color:#000;font-weight:700;padding:8px 15px;display:block}
    // nav ul li:hover{box-shadow:0 2px 0 red}
    // nav ul li:last-child{display:flex;align-items:center;padding-right:8px}
    // nav ul li:last-child a{margin:auto;position:relative;padding:2px 20px}
    nav ul li:last-child span,nav ul li:last-child span:after,nav ul li:last-child span:before{position:absolute;width:6px;height:6px;background:#000;border-radius:100%;display:block;content:"";top:0}
    nav ul li:last-child span:before{left:-10px}
    nav ul li:last-child span:after{right:-10px}
    // nav ul li:hover{box-shadow:0 2px 0 red}
    nav ul li:last-child:hover span,nav ul li:last-child:hover span:after,nav ul li:last-child:hover span:before{background:#ed1c24}
    nav ul li:last-child:hover .more-topnav{display:block}
    nav ul .more-topnav{width:100px;display:none;position:absolute;left:0;top:35px;background:#fff;padding:5px 15px;box-shadow:0 20px 25px -5px rgba(0,0,0,.4),0 10px 10px -5px rgba(0,0,0,.04);z-index:1}nav ul .more-topnav a{padding:10px 0!important;font-weight:400}nav ul .more-topnav a:hover{font-weight:700;color:#ed1c24}.morestorywrap{width:500px;display:none;position:absolute;left:0;top:37px;background:#ececec;box-shadow:0 20px 25px -5px rgba(0,0,0,.4),0 10px 10px -5px rgba(0,0,0,.04);z-index:1}.morestorywrap.nomoredropdown{width:350px}.morestorywrap.nomoredropdown .morestory-left .morestory-left-item .morestory-right{left:0}nav ul li:hover .morestorywrap{display:block}.morestory-left{width:165px;box-sizing:border-box;background:#fff;padding:10px 0;height:235px;overflow-y:scroll;overflow-x:hidden}.morestory-left .morestory-left-item{height:30px;line-height:30px;color:#000;width:150px;font-size:14px}.morestory-left .morestory-left-item a{color:#000;font-weight:400;padding:0;font-size:13px;position:relative;margin-right:5px}.morestory-left .morestory-left-item a span{position:relative;z-index:1;padding-left:10px}.morestory-left .morestory-left-item a:after,.morestory-left .morestory-left-item a:before{content:"";position:absolute;transition:all .3s ease-in-out;z-index:1}.morestory-left .morestory-left-item a:before{background:#ed1c24;width:0%;top:0;bottom:0}.morestory-left .morestory-left-item a:after{border-top:16px solid transparent;border-bottom:16px solid transparent;border-right:16px solid #fff;left:0;margin-left:-16px;top:0}.morestory-left .morestory-left-item:hover a{font-weight:700;color:#ed1c24}.morestory-left .morestory-left-item:hover a:before{width:100%;transition:all .3s ease-in-out}.morestory-left .morestory-left-item:hover a:after{transition:all .3s ease-in-out;left:100%}.morestory-left .morestory-left-item:hover a span{color:#fff}.morestory-right{position:absolute;left:153px;right:0;top:0;bottom:0;min-height:210px;display:none;background:#fff;padding-left:10px;padding-top:5px}.morestory-left .morestory-left-item:hover .morestory-right{display:block}.morestory-left .morestory-left-item:first-child{height:0;line-height:0}.morestory-left .morestory-left-item:first-child .morestory-right{display:block}.morestory-right-box{border-top:1px solid #fbf9f9;border-bottom:1px solid #e0e0e0;padding:6px 0;margin-right:10px}.morestory-right-box:first-child{border-top:none}.morestory-right-box:last-child{border-bottom:none}
    .morestory-right-box:first-child a{border:0;display:flex}.morestory-right-box:first-child a figure{width:78px;flex-shrink:0;margin-right:10px}
    .morestory-right-box a{font-size:14px;line-height:20px;font-weight:400!important;color:#000!important}
    .morestory-right-box a:after,.morestory-right-box a:before{display:none}
    .morestory-right-box:first-child a{font-weight:700!important}.topnav-right{align-items:center}
                    .top-search{position: relative; border-right: 1px solid #ccc; height: 36px; padding: 0 20px; border-left: 1px solid #ccc;}.top-search:after,.top-search:before{content:"";position:absolute}.top-search:before{width: 12px; height: 12px; border-radius: 100%;border: 2px solid #666666;  left: 10px; top: 8px;}.top-search:after{width: 2px;height: 8px;background: #666666;border-radius: 30px;left: 24px;transform: rotate(-45deg);top: 20px;}
                    #search-box{position:absolute;top:48px;background:#fff;width:400px;padding:10px 10px 0 10px;right:0;display:none;box-shadow:0 1px 2px #ccc}.secondarynav{background:#fff;border-top:1px solid #d4d4d4;box-shadow:2px 2px 18px rgba(00,00,00,.4);margin-bottom:15px}.secondarynav ul li a{font-size:16px;color:#1c1c1c;padding:8px 15px;display:block}.secondarynav ul li:first-child a{padding-left:0}.top-livetvbtn{background:#ed1c24;height:26px;line-height:26px;margin-left:15px;color:#fff!important;text-transform:uppercase;font-size:14px;font-weight:700;display:block;padding:0 10px 0 30px;border-radius:25px;position:relative}.top-livetvbtn:after,.top-livetvbtn:before{content:"";position:absolute}.top-livetvbtn:before{width:11px;height:7px;border-radius:4px;border:2px solid #fff;left:10px;top:9px}.top-livetvbtn:after{width:4px;height:5px;left:14px;transform:rotate(-45deg);top:3px;border-left:2px solid #fff;border-bottom:2px solid #fff}.section-blog-left {width:calc(100% - 315px);float:left;}.outer{margin:auto;max-width:1245px;padding:0 10px;position:relative;z-index:1}.add{position:relative;z-index:99}.foraddshow{width:100%; min-height:250px; background:#f5f5f5; line-height:0px;}ul.tag-listing-new{display:flex;justify-content:space-between;flex-wrap:wrap}ul.tag-listing-new li{font-size:16px;width:24%;line-height:24px;font-weight:700;padding:0 0 15px 0;position:relative;margin-bottom:5px}ul.tag-listing-new li a figure{width:100%;height:165px;background:#eee;position:relative}ul.tag-listing-new li a figure img{width:100%}ul.tag-listing-new li a h2{padding:10px 0px;font-size:17px;line-height:24px;font-weight:bold;color:#404040;}.tag-with-intro-sharewrap{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.tag-with-intro-sharewrap h1{color:#001D42;font-size:36px;font-weight:700;line-height:44px}.tag-with-heading-intro{display:flex;margin-bottom:30px;position:relative}.tag-with-heading-intro figure{width:542px;height:363px;flex-shrink:0;line-height:0}.tag-with-heading-intro figure img{width:100%}.tag-with-intro{position:absolute;background:#f5f5f5;padding:20px;top:20px;right:0;left:45%;box-sizing:border-box;bottom:20px;z-index:1;border-bottom:3px solid #e1261c;box-shadow:-3px 3px 6px rgba(0,0,0,.1)}.tag-with-intro p{font-size:16px;line-height:24px;color:#000;text-align:justify;padding-right:15px}.tag-with-intro-share{display:flex}.tag-with-intro-share a{width:30px;height:30px;margin-left:12px;border:1px solid #666;border-radius:100%;align-items:center;display:flex}.tag-with-intro-share a:hover{border:1px solid rgba(0,0,0,.05);background:rgba(0,0,0,.05)}.tag-with-intro-share a:hover img{filter:grayscale(0)}.tag-with-intro-share a img{height:16px;margin:auto;filter:grayscale(100%)}.tag-secondaryhd{color:#111;font-size:24px;font-weight:700;margin-bottom:10px}.tag-with-heading-intro.noimage .tag-with-intro{position:static;box-shadow:none;width:100%;padding:10px}.tag-with-heading-intro.noimage .tag-with-intro-sharewrap{margin-bottom:0}.tag-with-heading-intro.noimage figure{display:none}.section-blog-left .brade_crum{font-weight:400}.section-blog{float:none!important}.tag-ocpn{padding-right:15px}.tag-ocpn li{margin-bottom:8px;font-size:14px;color:#333}.photo_icon_s{background:url(https://images.news18.com/ibnkhabar/uploads/2018/01/photoS.png) no-repeat;position:absolute;width:35px;height:35px;left:6px;top:6px}.scrollforcontent{max-height:238px;overflow:hidden}.scrollforcontent-in{width:103%;overflow:auto;max-height:238px;box-sizing:border-box}.tag-with-heading-intro.noimage .scrollforcontent-in{width:101.4%}h1.top-heading{font-size:24px;line-height:20px;text-transform:none;font-weight:700;color:#111;margin-bottom:20px}.coronacat_border{height:5px;width:calc(100% - 420px);margin-left:50px;clear:both;display:block;background-color:#e1261d;position:static}.corona_cat_script{width:calc(100% - 360px)}.data-list-cat{height:270px}#top-area-nav ul.parent li a{padding-bottom:4px;display:block}#top-area-nav{margin:0 0 0;padding:0;float:left;width:100%}#top-area-nav ul.parent{border-bottom:1px solid #ccc;float:left;width:100%}#top-area-nav ul.parent li{float:left;margin:4px 11px;position:relative}#top-area-nav ul.parent li a.act,#top-area-nav ul.parent li a:hover,a.list-active{color:#ed1c24;border-bottom:solid 3px #ed1c24}.section-blog-left{width:calc(100% - 315px);float:left}.rhs-fexed{position:relative!important;width:300px;float:right}.ph_heading{color:#101010;font-size:22px;font-weight:700;margin-bottom:10px}.rgtgallery li{width:48%;margin-bottom:10px;position:relative}.rgtgallery li a figure{line-height:0;width:100%;position:relative}.rgtgallery li a figure img{width:100%}.rgtgallery li a figure:before{content:"";background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB-hover.png) no-repeat 0 0;width:42px;height:42px;position:absolute;background-size:41px;top:50%;left:50%;margin:-21px 0 0 -21px;transform:scale(.7);filter:grayscale(1)}.rgtgallery li:first-child{width:100%}.rgtgallery li:first-child a figure:before{transform:scale(1);top:40%}.rgtgallery li:hover a figure:before{filter:grayscale(0)}.rgtgallery li a h2{font-size:15px;line-height:22px;margin-bottom:10px;font-weight:400;margin-top:8px}.rgtgallery li:hover a h2{color:#ed1b24}.rgtgallery li:first-child a h2{margin-bottom:0;background:rgba(0,0,0,.7);position:absolute;bottom:0;padding:5px 10px 7px 10px;width:100%;box-sizing:border-box;color:#fff;font-size:16px}.myupchar_logo{position:absolute;right:0;background:#fff;border-radius:0 0 0 10px;top:0;padding:7px 10px;width:140px;box-sizing:border-box;z-index:1}.myupchar_logo img{width:100%;display:block}.myupchar_sub_logo img{width:80px;text-align:right}.myupchar_sub_logo{position:absolute;right:0}li.myupchar_sub_article{position:relative;padding-bottom:20px!important}li.myupchar_sub_article a:hover{color:#00b19f!important}.pagination{margin:20px 0;padding:0;float:left;width:100%;clear:both;text-align:center}.pagination ul{display:inline-block}.pagination ul li{display:inline-block;text-transform:uppercase;background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -195px -947px;width:33px;height:33px;margin:0 2px}.pagination ul li a{text-decoration:none;color:#fff;display:block;width:33px;height:33px;text-align:center;color:#000;line-height:33px}.pagination ul li a:hover{text-decoration:none;color:#fff;display:block;width:33px;height:33px;text-align:center;color:#000;line-height:33px}.pagination ul li.prev a{background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -152px -825px;width:20px}.pagination ul li.prev a:hover{background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -89px -825px;width:20px}.pagination ul li.next a{background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -178px -825px;width:20px}.pagination ul li.next a:hover{background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -117px -825px;width:20px}.pagination ul li a.selected{background:url(https://images.news18.com/ibnkhabar/uploads/assests/img/icon.png) no-repeat -254px -947px;color:#fff}.pagination.mobile-pagination {display: none;}
                    .tagDesc{
                    float:right;
                    width:58%
                    }
                    .tagImage{
                    float:left;
                    width:360px;
                    height: 270px;
                    background: #000;
                    margin-right:15px;
                    }
                    .tagInfo p{
                        font-size: 16px;
                        line-height: 24px;
                        color: #333;
                        margin-bottom:20px;
                    }
                    .tagInfo h2{
                        font-size: 20px;
                        line-height: 24px;
                        color: #333;
                        margin-bottom:10px;
                        font-weight:bold;
                    }
					.sttbs{ display: flex; align-items: center; padding: 10px 0; margin: 10px 0; background: #F4F4F4; 
                border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc;}
.sttbs li { margin: 0 20px; flex-shrink: 0}
.sttbs li a{font-weight: 300; line-height: 24px; color:#464646;font-size: 20px;text-transform: uppercase;padding-bottom: 5px;position: relative;display: block;}
.sttbs li.active a{font-weight: 600;color: #e1261c;}
.sttbs li.active a::after {content: '';position: absolute;height:3px;width: 100%;background: #e1261c;left: 0;bottom: 0;}
.sub_navigation_li{flex-shrink: 0;}
.nwvideoicon {
    width: 45px;
    height: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    margin: -22px 0 0 -22px;
    cursor: pointer;
    opacity: .7;
    background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
}
    .agli_khb_r_sec {
        margin-bottom: 5px;
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
    .phtstrtupdt-shr{display: flex;-webkit-box-align: center;align-items: center;text-align: left;}
.phtstrtupdt-shr li{color:#6b6b6b;font-size:14px;margin-left:10px;text-transform:uppercase;line-height:0;}
.spriteshare{background:url(/images/siteimages/sprite_img_1.svg) 0 0 no-repeat;width:40px;height:40px;display:block;}
.spriteshare.art-facebook-icon{background-position:0px 0px;}
.spriteshare.art-twitter-icon{background-position:0px -50px;}
.spriteshare.art-linkedin-icon{background-position:0px -100px;}
.spriteshare.art-whatsapp-icon{background-position:0px -150px;}
.spriteshare.art-telegram-icon{background-position:0 -200px;}
.spriteshare.art-email-icon{background-position:0 -250px;}
.spriteshare.gn_icon{background: #fff url(/images/siteimages/sprite_img_1.svg?v1.5)no-repeat bottom; margin-left: 10px;}
.follow_us {border-left: 1px solid rgb(90, 90, 90);padding-left: 8px;display: flex;align-items: center;}
.fl_txt {font-size: 11px;color: rgb(90, 90, 90);width: 30px;text-transform: none;line-height: 12px;}
.formore {
    padding: 100px 0px 10px 0px;
    text-align: center;
    color: #E1261D;
    position: absolute;
    bottom: 3px;
    left: ${isImageExists ? "375px" : "0px"};
    right: 0;
    background: linear-gradient(transparent,#fff);
    z-index: 1;
}
.formore.readless{padding: 0;left: 0;background: #f5f5f5;position:relative;display:block;}
.forvideoicon:before{position: absolute;
    top: 0;
    right: 0;
    background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Video_Icon_1659522062.svg) 0 0 no-repeat;
    z-index: 1;
    width: 50px;
    height: 50px;
    content: "";
}
.forphotoicon:before{position: absolute;
    top: 0;
    right: 0;
    background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Photo_Icon_1659521957.svg) 0 0 no-repeat;
    z-index: 1;
    width: 50px;
    height: 50px; content: "";}
    .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}
    .section-blog {
        display: flex;
        justify-content: space-between;
    }
    .divautoheight{height:auto;}
    .search-listing ul li {
        // float: left !important;
      }
      .search-listing ul li {
        display: flex;
        justify-content: space-between;
        margin: 25px 0;
      }
      // .search-listing ul li figure img {
      //   width: 100%;
      // }
      .search-listing ul li figure {
        margin-right: 15px;
        flex-shrink: 0;
        line-height: 0;
        width: 220px;
        position: relative;
      }
      .search-listing ul li .search-listing-details h2 a,
      .search-listing ul li .search-listing-details h3 a {
        font-size: 24px;
        line-height: 24px;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
      }
      // .search-listing ul li .search-listing-details h2 a:hover,
      // .search-listing ul li .search-listing-details h3 a:hover {
      //   color: black;
      // }
      a {
        text-decoration: none;
        color: #111;
      }
      .search-listing ul li .search-listing-details p {
        color: #222;
        font-size: 16px;
        line-height: 24px;
        margin: 8px 0px !important;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
      }
      .search-listing ul li p {
        // max-height: 45px !important;
        overflow: hidden;
      }
      .search-listing ul li {
        display: flex;
        justify-content: space-between;
        // margin: 25px 0px;
      }
      .search-listing-details h2 a :hover {
        color: black;
      }
      .search-listing ul li:first-child {
        margin-top: 10px;
      }
      .search-listing ul li .search-listing-details p a {
        color: #222;
      }
      .search-listing ul li .search-listing-details span {
        font-size: 12px;
        color: #999;
        display: block;
        text-transform: uppercase;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
      }
      .search-listing ul li .search-listing-details span a {
        color: #ee1b24;
      }
      span .post-date {
        margin: 4px 0;
      }
      .red-text {
        color: #ed1c24 !important;
      }
      span.post-date a {
        padding-right: 5px;
      }
      .rightwrap {
        width: 300px;
        float: right;
      }
      .top-heading {
        letter-spacing: 2px;
        color: #ee1b24;
        font-size: 1.6em;
        margin: 0 0 10px !important;
        text-transform: uppercase;
        padding: 10px 0 !important;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
      }
      .vsp10 {
        margin-top: 10 px;
      }
      .clearfix {
        clear: both;
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
        margin-left: 400px;
        cursor: pointer;
      }
      .nwvideoicon {
        width: 45px;
        height: 45px;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        margin: -22px 0 0 -22px;
        cursor: pointer;
        background: url(/images/siteimages/video-iconnew.png)
          0 0 no-repeat;
      }
      #top-nav {
        margin: 0px 0px 0px;
        padding: 0px;
        width: 100%;
      }
      ul.parent {
        border-bottom: 1px solid #ccc !important;
        display:flex;
        width: 100%;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
        position:relative;
      }
      #top-nav ul.parent li {
        margin: 4px 11px;
        position: relative;
        font-family: "Noto Serif", "Droid Serif", sans-serif !important;
      }
      #top-nav ul.parent li a.act {
        color: #ed1c24;
        border-bottom: solid 3px #ed1c24;
      }
      #top-nav ul.parent li a:hover {
        color: #ed1c24;
        border-bottom: solid 3px #ed1c24;
        cursor: pointer;
      }`}
      </style>
    </>
  );
};
export default Tag;