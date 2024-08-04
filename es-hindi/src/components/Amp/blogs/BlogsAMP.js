import BlogDetailsAMP from "./BlogDetailsAMP";
import { timeConverter, BlogsUtil } from 'includes/blogs.util';

const BlogsAMP = (props) => {
  const {
    paramObj,
    imageWidth,
    imageHeight,
    authorInfo,
    pageContent,
    pageAds,
    articleData,
  } = props.data;
  const { author, topic, requestURL } = paramObj;
  const pageData = pageContent[0] || [];

  let whatsappUrl = "";
  if (pageData && pageData?.display_headline && pageData?.weburl) {
    whatsappUrl = `whatsapp://send?text=${pageData?.display_headline} - ${BlogsUtil.formTopicUrlParam(pageData?.weburl)}`;
  }

  const shareTopicUrls = {
    facebook:
      `https://www.facebook.com/sharer.php?u=${requestURL}`,
    twitter:
      `https://twitter.com/share?url=${requestURL}`,
    linkedIn:
      `https://www.linkedin.com/shareArticle/?mini=true&amp;url=${requestURL}`,
    whatsapp: whatsappUrl,
  };

  const targetting = {
    targeting: pageAds.setTargetingValues,
  };
  return (
    <>
      <div className="clearfix add">
        <div className="addinner-box addinner_box_300x250">
          <amp-ad
              width={336}
              height={280}
              type="doubleclick"
              data-lazy-fetch="true"
              data-loading-strategy="1"
              data-multi-size="300x250,336x280"
              data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_BLOG_AMP/NW18_HIND_BLOG_AMP_AS/NW18_HIND_BLG_AS_AMP_ROS_ATF_320"
              json={JSON.stringify(targetting || "")}
              rtc-config='{
                "vendors": {
                  "openwrap": {
                  "PROFILE_ID" : "2059",
                  "PUB_ID" : "113941"
                  }
                },
                "timeoutMillis": 1000
              }'
            ></amp-ad>
        </div>
      </div>
      <div className={`${author && topic ? "" : "container"}`}>
        {author && topic ? (
            <BlogDetailsAMP
              pageContent={pageData}
              authorInfo={authorInfo}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
              liveTime={timeConverter}
              shareTopicUrls={shareTopicUrls}
              pageAds={pageAds}
              articleData={articleData}
            />
          ) : null
        }
      </div>
      <style jsx >
        {`
          body {
            margin: 0;
            padding: 0;
            list-style: none;
            outline: 0;
            text-decoration: none;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .container {
            padding: 10px;
          }

          .add {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
            z-index: 1;
            color: #797e90;
          }
          .addinner-box {
            //background: #e8e9ed;
            background: #dbdde3;
            min-width: 250px;
            display: inline-block;
            margin: 0 auto;
            text-align: center;
            min-height: auto;
            padding: 0;
            box-sizing: border-box;
            color: #797e90;
            font-size: 11px;
            line-height: 16px;
          }

          .section-blog-left {
            width: calc(100% - 315px);
            float: left;
          }

          .breadcrumb {
            padding: 10px 16px;
            font-size: 15px;
            color: #000;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-weight: 700;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }

          .brdcrm a:first-child {
            padding: 0 5px 0 0;
            flex-shrink: 0;
          }
          .breadcrumb a {
            color: #757575;
            font-weight: 400;
          }
          .breadcrumb h1 {
            text-align: left;
            display: inline;
            font-size: inherit;
            color: #757575;
          }

          a {
            text-decoration: none;
            color: #111;
          }

          .clearfix {
            clear: both;
          }
        `}
      </style>
    </>
  );
};
export default BlogsAMP;
