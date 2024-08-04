import React from "react";
import ampHelper from "includes/Amp/ampHelper";
import getConfig from "next/config";
import ReactHtmlParser from "html-react-parser";
import SocialShare from "widgets/Amp/SocialShare";
import Head from "next/head";
// import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const { publicRuntimeConfig } = getConfig();

const Video = (props) => {
  const { articleData, paramObj, moreVideos } = props.data;

  let {
    headline,
    images: { url: thumbnail /* caption */ } = {},
    updated_at,
    intro,
    // story_id: storyId,
    weburl,
    // auto_youtube_import: autoYoutubeImport,
    // dm_video_id: dmVideoId,
    youtubeid: youtubeId,
    // youtube_thumbnail:youtubeThumbnail,
    // tags = [],
    hola_player = false,
    videoUrl = "",
    relatedVideoUrl = "",
    external_video: externalVideo,
    auto_youtube_import,
    disclaimer
  } = articleData;
  const updateDate = updated_at.slice(0, 10);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const tempdate = new Date(updateDate);
  let dateNew =
    months[tempdate.getMonth()] +" "+
    tempdate.getDate() +
    ", " +
    tempdate.getFullYear() +
    ", " +
    updated_at.slice(11, 16) +
    " IST";

  const ampAds = ampHelper.get_amp_ad_article(
    paramObj.subCategory,
    paramObj.category,
    "article",
  );

  const adTarget = ampHelper.get_ad_targetting(
    articleData,
    paramObj,
    props.pageSeo,
    "news",
  );

  const ampVideo = `<amp-video width="380" height="253" poster=${thumbnail} layout="responsive" controls autoplay >
                        <div fallback>
                            <p>Your browser doesn't support HTML5 video.</p>
                        </div>
                        <source type="application/vnd.apple.mpegurl" src=${videoUrl} />
                        <source type="video/mp4" src=${relatedVideoUrl} />
                    </amp-video>`;

  if (youtubeId == "") {
    // extract youtubeId from body
    const youtubeData = articleData.body.match(
      /youtube.com\/embed\/([A-Za-z0-9-_]+)/,
    );
    youtubeId =
      youtubeData != null && typeof youtubeData !== "undefined"
        ? youtubeData[1]
        : null;
    if (!youtubeId && externalVideo) {
      const IFrameBlock = externalVideo.match(/<iframe(.*?)>(.*?)<\/iframe>/gs);
      if (IFrameBlock) {
        for (let x = 0; x < IFrameBlock.length; x++) {
          const tempIFrame = IFrameBlock[x];
          const IFrameDet = tempIFrame.match(/(src)=(("|')[^"]*("|'))/gims);
          if (IFrameDet) {
            for (let y = 0; y < IFrameDet.length; y++) {
              const IFrameURL = IFrameDet[y]
                .trim('"')
                .trim("'")
                .replace(/src=("|')/, "")
                .replace(/("|')/, "")
                .split(/(;| )/)[0];
              if (IFrameURL.indexOf("https://") !== -1) {
                if (IFrameURL.indexOf("https://www.youtube.com/") !== -1) {
                  const SplitIFrameURL = IFrameURL.split("/embed/");
                  youtubeId =
                    SplitIFrameURL[parseInt(SplitIFrameURL.length) - 1];
                  if (youtubeId != "") {
                    youtubeId = youtubeId.replace(/\"$/, "");
                    youtubeId = youtubeId.split(/[\&?]/)[0];
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const ampSrc = `https://images.news18.com/dlxczavtqcctuei/news18/prod/pubstack_hindi_prod.html?guid=${auto_youtube_import?.nw_auto_yt_feed_id || youtubeId || articleData?.video_details?.mongo_id
    }&article_id=${articleData?.story_id
    }&language=hi&video_type=non-local18&video_event=Video&section_name=${paramObj?.subCat || paramObj?.category
    }&domain=hindi.news18.com&data-article-date=${articleData?.created_at}&data-publish-time=${articleData?.created_at}&}
  data-article-type=${articleData?.post_type}&data-tag=${articleData?.tags?.length > 0 ? articleData?.tags?.map(x => x.slug).join(',') : ""}&data-taboola=${"Yes"}&data-video-identifier=${"Videos"}
  &data-author-type=${articleData?.publish_by?.length > 0 ? articleData?.publish_by[0]?.english_name : ""}&data-desk-video=${articleData?.video_details?.type === "desk" ? 1 : 0}
  &data-page-url=${articleData?.weburl}&data-amp-filter=${"amp-hin"}&data-video-title=${articleData?.headline}`;
  return (
    <>
      <>
        <Head>
          <meta name="robots" content="max-image-preview:large" />
        </Head>
        

        <div className="video_page_cont">
          <BreadcrumbCommon breadCrumbArray={props.data?.breadCrumbArray} />
          <div className="video_cont">
            {/* amp-youtube tag */}
            {
              hola_player ? (
                ReactHtmlParser(ampVideo)
              ) : (youtubeId || articleData?.video_details?.mongo_id ) ? (
                <figure className="ifParent">
                  <amp-iframe
                    allowfullscreen=""
                    layout="responsive"
                    frameborder="0"
                    height="270"
                    width="300"
                    sandbox="allow-scripts allow-same-origin"
                    src={ampSrc}
                  >
                    <amp-img
                      layout="fill"
                      src="https://foo.com/foo.png"
                      placeholder
                    ></amp-img>
                  </amp-iframe>
                </figure>
              ) : <amp-img
                src={
                  articleData?.video_details?.video_desk_image?.url +
                  "?impolicy=website&width=372&height=273"
                }
                alt={articleData?.video_details?.title}
                title={articleData?.video_details?.title}
                width="372"
                height="273"
                layout="responsive"
              ></amp-img>
              // youtubeId?<amp-youtube
              //     data-videoid={youtubeId}
              //     layout="fixed-height"
              //     height="270"
              // ></amp-youtube>:null
            }
            <div className="video_info_cont">
              <div className="video_info">
                <time className="byline" dateTime={updated_at}>
                  {dateNew}
                </time>
              </div>
              <h1>{headline}</h1>
              <SocialShare headline={headline} url={weburl} />
              <div className="newdscrt-add newdscrt-add-top ">
                <span>विज्ञापन</span>
                <div className="newdscrt-add-in">
                  <amp-ad
                    width={375}
                    height={300}
                    type="doubleclick"
                    data-slot={ampAds.topAd}
                    data-multi-size="300x250,300x300,320x50,320x100,336x280,360x60,375x50,300x50"
                    data-lazy-fetch="true"
                    data-loading-strategy="2"
                    data-multi-size-validation="false"
                    rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
                    json={adTarget}
                  ></amp-ad>
                </div>
              </div>
              <p>{intro}</p>
              <div className="ad-container">
                <amp-ad
                  width={336}
                  height={280}
                  type="doubleclick"
                  data-slot={ampAds.middleAd1}
                  data-multi-size="300x250"
                  data-lazy-fetch="true"
                  data-loading-strategy="2"
                  data-multi-size-validation="false"
                  rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" } ,"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'
                  json={adTarget}
                ></amp-ad>
              </div>
              <div className="ampScorecard"></div>
            </div>
          </div>
          <div className="disclaimerText">
            {disclaimer}
          </div>
          <div
            style={{
              height: "335px",
              overflow: "hidden",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <amp-embed
              width="100"
              height="335"
              type="taboola"
              layout="responsive"
              data-publisher="network18media-news18hindi"
              data-mode="thumbnails-mid-article"
              data-placement="Mid Video Thumbnails AMP"
              data-loading-strategy="prefer-viewability-over-views"
              data-lazy-fetch="true"
              data-target_type="mix"
              data-video="auto"
              data-url=""
            ></amp-embed>
          </div>
          {moreVideos.length > 0 && (
            <div className="more_data_cont">
              <div className="data_head">
                <h2>मनोरंजन</h2>
                <a title="link" href="/videos/">
                  और भी देखें...
                </a>
              </div>
              <div className="video_grid">
                {moreVideos.map((video,index) => {
                  return (
                    <a
                      href={ampHelper.customize_url(
                        video.weburl,
                        publicRuntimeConfig.siteUrl,
                      )}
                      key={"more"+index}
                    >
                      <div className="for_video_info for_v_icon">
                        <amp-img
                          src={
                            video.images?.url +
                            "?impolicy=website&width=180&height=110"
                          }
                          alt={video.title}
                          title={video.title}
                          width="157"
                          height="100"
                          layout="responsive"
                          data-lazy-fetch="true"
                          
                          data-loading-strategy="prefer-viewability-over-views"
                        ></amp-img>
                        <strong>{video.post_type}</strong>
                      </div>
                      <p>{video.headline || video.display_headline}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* <amp-embed width="100" height="100" type="outbrain" layout="responsive" data-widgetIds="AMP_5"></amp-embed> */}
        <amp-embed
          width="100"
          height="100"
          data-loading-strategy="prefer-viewability-over-views"
          data-lazy-fetch="true"
          type="taboola"
          layout="responsive"
          data-publisher="network18media-news18hindi"
          data-mode="thumbnails-a"
          data-placement="Below Video Thumbnails AMP"
          data-target_type="mix"
          data-video="auto"
          data-url=""
        ></amp-embed>
      </>
      {/* <InstallAppIcon
        category={"APPdownload_Mweb_Video"}
        label={"Mobile Video"}
        isAMP={true}
      /> */}
      <style jsx global>{`
        .disclaimerText { padding: 10px; color:#000; font-weight: bold; font-style: italic; }
        .video_cont {
          background: #161616;
        }
        .video_info_cont {
          padding: 12px 16px;
        }
        .video_info {
          display: flex;
          justify-content: space-between;
        }
        .byline {
          color: #948f8f;
          text-transform: capitalize;
        }
        .video_info_cont h1 {
          font-size: 22px;
          color: #fff;
          margin: 8px 0;
        }
        .video_info_cont p {
          color: #fff;
          font-size: 16px;
          margin: 10px 0;
          font-weight: normal;
          word-break: break-word;
          line-height: 1.5;
        }
        .share-icon {
          padding: 12px 0;
          text-align: center;
        }

        a.forfb {
          background: #3a5899;
        }
        .share-icon a {
          width: 31px;
          height: 31px;
          margin: 0 7px;
          display: inline-block;
          color: #fff;
          border-radius: 100%;
          font-size: 18px;
          padding-top: 4px;
          vertical-align: middle;
        }
        [class*=" icon-"],
        [class^="icon-"] {
          font-family: icomoon;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .icon-facebook:before {
          content: "\ea90";
        }
        a.fortw {
          background: #00adef;
        }
        .icon-twitter:before {
          content: "\ea96";
        }
        a.forlk {
          background: #0e76a9;
        }
        .icon-linkedin2:before {
          content: "\eaca";
        }
        a.forwp {
          background: #29a71a;
        }
        .icon-whatsapp:before {
          content: "\ea93";
        }
        .more_data_cont {
          padding: 16px;
        }
        .data_head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .data_head h2 {
          font-size: 22px;
          color: #000;
          margin: 10px 0;
        }
        .data_head a {
          height: 26px;
          line-height: 26px;
          padding: 0 16px;
          border-radius: 5px;
          background: #fff;
          font-size: 12px;
          color: #828282;
          border: 1px solid #828282;
        }
        .video_grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
          justify-content: space-between;
        }
        .video_grid a {
          color: #000;
        }
        .video_grid > a {
          border: 1px solid #ddd;
        }
        .for_video_info {
          position: relative;
        }
        .for_video_info strong {
          position: absolute;
          color: #fff;
          left: 5px;
          bottom: 5px;
          font-weight: normal;
          font-size: 14px;
        }
        .video_grid p {
          font-size: 15px;
          margin: 10px 0;
          line-height: 1.4;
          padding: 0 5px;
        }

        .newdscrt-add {
          width: 100%;
          text-align: center;
          background: #e3e3e3;
          padding: 15px 0 20px 0;
        }

        .newdscrt-add span {
          font-size: 12px;
          color: #606060;
          line-height: 16px;
          font-family: "Montserrat", sans-serif;
          display: block;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .newdscrt-add-in {
          display: flex;
          justify-content: center;
        }

        .newdscrt-morehd {
          font-weight: 800;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 16px;
          font-family: "Montserrat", sans-serif;
          border-bottom: 1px solid #dedede;
          margin-bottom: 10px;
          padding: 25px 10px 10px 10px;
          position: relative;
        }

        .newdscrt-morehd:after {
          content: "";
          width: 115px;
          height: 4px;
          background: #ee1c25;
          position: absolute;
          bottom: 0;
          left: 10px;
        }

        .newdscrt-morelist {
          padding: 0 10px;
        }

        .newdscrt-morelist li a {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #dedede;
          padding: 20px 0;
        }

        .newdscrt-morelist li:first-child a {
          border-top: none;
          padding-top: 0px;
        }

        .newdscrt-morelist li a figure {
          line-height: 0;
          background: #eee;
          width: 120px;
          margin-right: 12px;
          height: 96px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .newdscrt-morelist li a figure img {
          height: 100%;
        }

        .newdscrt-morelist li a h2,
        .newdscrt-morelist li a h3 {
          width: 100%;
          font-size: 13px;
          line-height: 20px;
          color: #000000;
          font-weight: bold;
        }

        .newdscrt-morelist li a h2 span,
        .newdscrt-morelist li a h3 span {
          display: block;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          color: #ee1c25;
          margin-top: 2px;
          font-weight: 500;
        }

        .newdscrt-morelistbtn {
          border-bottom: 1px solid #dedede;
          display: block;
          margin: 15px 0;
          padding: 0 10px;
        }

        .newdscrt-morelistbtn a {
          position: relative;
          display: block;
          border-bottom: 3px solid #000000;
          text-align: right;
          padding-bottom: 10px;
          font-size: 14px;
          font-weight: bold;
          color: #ee1c25;
          font-family: "Montserrat", sans-serif;
          padding-right: 15px;
        }

        .newdscrt-morelistbtn a:before,
        .newdscrt-morelistbtn a:after {
          content: "";
          position: absolute;
        }

        .newdscrt-morelistbtn a:before {
          width: 10px;
          height: 2px;
          background: #ee1c25;
          right: 0px;
          top: 9px;
        }

        .newdscrt-morelistbtn a:after {
          width: 6px;
          height: 6px;
          border-top: 2px solid #ee1c25;
          border-right: 2px solid #ee1c25;
          transform: rotate(45deg);
          right: 0px;
          top: 6px;
        }
        .newdscrtcardbox-btmmore.newdscrtcardbox-btmmore-rotate:after {
          transform: rotate(225deg);
          top: 3.5px;
        }
        
        .ifParent {
          height: 235px;
          overflow: hidden;
          position: relative;
          display: block;
        }
        .ad-container {
          height: 255px;
        }
      `}</style>
    </>
  );
};

export default Video;
