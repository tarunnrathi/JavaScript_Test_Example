import { BlogsUtil } from "includes/blogs.util";
import SITE_CONfIG from "config/site.config";
import articleHelper from "includes/article.helper";
import { youtubeParser, anchorParser } from "../../../../helper/articleBodyParser";
import InstallAppIcon from "widgets/Mobile/InstallAppIcon";

const BlogDetailsAMP = (props) => {
  const {
    pageContent,
    authorInfo,
    liveTime,
    shareTopicUrls,
    articleData,
  } = props;

  const authorBlogsUrl = BlogsUtil.formAuthorAMPBlogsUrl(
    authorInfo?.nicename,
    authorInfo?.id
  );

  const articleBody = (body) => {
    body = articleHelper.storyPara(
      articleData,
      false,
      false,
      articleData?.liveblog_api_url?.blog_url,
      true,
    );
    let contentArray = anchorParser(youtubeParser(body.__html, true), true);

    let placedState = false;
    contentArray = contentArray.split(/\r|\n/);
    let html = '';

    for (const [index, value] of contentArray.entries()) {
      let bodyPart = value.replace(/\r?\n?<\/?br ?\/?>/gim, '');
      bodyPart = bodyPart.replace(/.jpeg/g, '.jpeg?impolicy=website&width=360&height=240');
      bodyPart.includes('<link') && bodyPart.includes('rel="stylesheet"') && (bodyPart = '');
      if (bodyPart!=='<style>' && !bodyPart.includes('<iframe') && !placedState) {
        html += `<p>${bodyPart}</p>`;
        if(index === 0) {
          html += `<p><div class="clearfix_child add_child">
          <div class="addinner-box-child addinner_box_300x250-child">
            <amp-ad
                width=${330}
                height=${280}
                type="doubleclick"                 
                data-multi-size="300x250,336x280"
                data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_BLOG_AMP/NW18_HIND_BLOG_AMP_AS/NW18_HIND_BLG_AS_AMP_ROS_ATF_300"              
                json=\'${props?.targetting}'\
                rtc-config='{
                  "vendors": {
                    "openwrap": {
                    "PROFILE_ID" : "2059",
                    "PUB_ID" : "113941"
                    }
                  },
                  "timeoutMillis": 1000
                }'
                data-loading-strategy="prefer-viewability-over-views"
                data-lazy-fetch="true"
                data-multi-size-validation="false"
              >
            </amp-ad>
          </div>
        </div></p> 
        `;}
        if(index === 1) {
          html += `<p><div class="clearfix_child add_child">
          <div class="addinner-box-child addinner_box_300x250-child">
            <amp-ad
                width=${330}
                height=${280}
                type="doubleclick"                
                data-multi-size="300x250,336x280"
                data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_BLOG_AMP/NW18_HIND_BLOG_AMP_AS/NW18_HIND_BLG_AS_AMP_ROS_BTF_300"              
                json=\'${props?.targetting}'\
                rtc-config='{
                  "vendors": {
                    "openwrap": {
                    "PROFILE_ID" : "2059",
                    "PUB_ID" : "113941"
                    }
                  },
                  "timeoutMillis": 1000
                }'
                data-loading-strategy="prefer-viewability-over-views"
                data-lazy-fetch="true"
                data-multi-size-validation="false" 
              >
            </amp-ad>
          </div>
        </div></p> 
        `;}
      }
      if(bodyPart ==='<style>') {
        placedState = true;
      }
      if(bodyPart ==='</style>') {
        placedState = false;
      }
    }
    return { __html: html };
  };

  return (
    <>
        <div className="container">
          <div className="headline__container">
            <h1>{articleData?.display_headline}</h1>
            <div className="blogAuthorDetails__top">
              <h3 className="blogAuthorDetails__intro">{articleData?.intro}</h3>
              <div className="blogAuthorDetails__top--wrapper">
                <div className="blogAuthorDetails__share">
                  <span className="icon-facebook">
                    <amp-social-share
                      data-param-app_id="561222041954546"
                      className="icon"
                      type="facebook"
                      width="40"
                      height="40"
                      data-param-text="facebook"
                      data-param-url={shareTopicUrls.facebook+`&t=${articleData?.display_headline}`}
                      aria-label="Share on Facebook"
                    ></amp-social-share>
                  </span>
                  <span className="icon-twitter">
                    <amp-social-share
                    data-param-app_id="561222041954546"
                      type="twitter"
                      className="icon"
                      width="40"
                      height="40"
                      data-param-text=""
                      data-param-url={`${articleData?.display_headline +" "+shareTopicUrls?.twitter?.split('?url=')[1]}`}
                      aria-label="Share on Twitter"
                    ></amp-social-share>
                  </span>
                  <span className="icon-linkedIn">
                    <amp-social-share
                      data-param-app_id="561222041954546"
                      className="icon"
                      type="linkedin"
                      width="40"
                      height="40"
                      data-param-text={`${articleData?.display_headline}`}
                      data-param-url={`${shareTopicUrls?.twitter?.split('?url=')[1]}`}
                    ></amp-social-share>
                  </span>
                  <span className="icon-whatsapp">
                    <amp-social-share
                    data-param-app_id="561222041954546"
                      className="icon"
                      type="whatsapp"
                      width="40"
                      height="40"
                      data-param-text={articleData?.display_headline +" "+ shareTopicUrls?.twitter?.split('?url=')[1]}
                      data-param-url={shareTopicUrls?.whatsapp?.split('?')[0]+`?text=${articleData?.display_headline}&url=${shareTopicUrls?.whatsapp?.split('?')[1]}`}
                      aria-label="Share on Whatsapp"
                    ></amp-social-share>
                  </span>
                  <span className="icon-telegram">
                    <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href={`https://telegram.me/share/url?${shareTopicUrls?.twitter?.split('?')[1]}&text=${articleData?.display_headline}`}
                    >
                    <amp-img
                      className="icon"
                      alt='Telegram'
                      height='40'
                      width='40'
                      layout='fixed'
                      src='https://1.bp.blogspot.com/-LDF6TD0uVQo/WEthSG0TWWI/AAAAAAAAILw/2h_iQKVv4cgQIltzE-raaU7wV6DvtuFcQCK4B/s1600/telegram.png?impolicy=website&width=360&height=240' />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <figure className="articleimg">
            <amp-img
              height={'240'}
              src={articleData?.images?.url +'?impolicy=website&width=360&height=240' || SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH+'?impolicy=website&width=360&height=240'}
              alt={pageContent?.display_headline}
              title={pageContent?.display_headline}
            ></amp-img>
            <h5>{articleData?.images?.caption}</h5>
          </figure>
          <div className="blog__headline">
            <ul className="blog__headline--text">
              <li>
                  <a href="/agency/News18Hindi">News18Hindi</a>
              </li>
              {
                pageContent?.updated_at
                ?<li>
                  <b>Last updated:</b>
                  {liveTime(pageContent?.updated_at)}
                </li>
                :null
              }
              {
                authorBlogsUrl && authorInfo?.hindi_name
                ? <li>
                      <a href={authorBlogsUrl}>{authorInfo?.hindi_name}</a>
                  </li>
                :null
              }
            </ul>
          </div>
          <div
            className="blog__description"
            dangerouslySetInnerHTML={articleBody(articleData?.body)}
          ></div>
          <strong
            className="blog__description"
            style={{ display: "inline-block" }}
          >
            (डिस्क्लेमर: ये लेखक के निजी विचार हैं. लेख में दी गई किसी भी
            जानकारी की सत्यता/सटीकता के प्रति लेखक स्वयं जवाबदेह है. इसके लिए
            News18Hindi उत्तरदायी नहीं है.)
          </strong>
          <div className="tag">
            {articleData &&
              articleData?.tags &&
              articleData?.tags.map((tag, index) => (
                <a key={index} href={`/tag/${tag.slug}/`}>
                  {tag?.name}
                </a>
              ))}
          </div>
        </div>
        <div className="wtsap_fxd">
          <amp-social-share
            data-param-app_id="561222041954546"
            className="icon-whatsapp_fixed"
            type="whatsapp"
            width="40"
            height="40"
            data-param-text={articleData?.display_headline +" "+ shareTopicUrls?.twitter?.split('?url=')[1]}
            data-param-url={shareTopicUrls?.whatsapp?.split('?')[0]+`?text=${articleData?.display_headline}&url=${shareTopicUrls?.whatsapp?.split('?')[1]}`}
            aria-label="Share on Whatsapp"
            ></amp-social-share>
          </div>
         <amp-iframe width="400" height="550"
            title="Jio Savan"
            layout="responsive"
            sandbox="allow-scripts allow-same-origin allow-popups"
            frameborder="0"
            src="https://images.news18.com/static_news18/pix/gujarati/jiosavan.html"
            >
            <amp-img layout="fill" width="400" height="550" src="https://images.news18.com/static_news18/pix/gujarati/jiosavan.html" placeholder></amp-img>
          </amp-iframe>
          {/* <InstallAppIcon category={'APPdownload_Mweb_Blog'} label={'Mobile Blog'} /> */}
      <style jsx global>{`

        body {
          font-family: "Mukta",sans-serif;
        }        
        .icon{
        border-radius: 100%;
        }
        // .wauto{
        //   height:240px;
        // }
        .blog__description p iframe{
          width:343px;
          height:285px;
        }

        // ADS
        .add_child {
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
        .addinner-box-child {
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

        div.addinner_box_300x250-child {
          height: 250px;
          width: 300px;
          float:left;
          display:contents;
        }
        //ADS END
        .headline__container {
          padding: 0 10px;
          font-family: "Mukta",sans-serif;
        }
        .container {
          padding: 0;
        }
        .headline__container h1 {
          font-size: 22px;
          line-height: 30px;
          color: #303030;
          font-weight: 700;
          margin: 8px 0;
        }

        .blogAuthorDetails__top {
         // border-top: 1px solid #d4d4d4;
         // border-bottom: 1px solid #d4d4d4;
          padding: 0;
          margin-bottom: 15px;
          font-family: "Mukta",sans-serif;
        }

        .blogAuthorDetails__intro {
          font-size: 18px;
          line-height: 24px;
          font-weight: 400;
          color: #666;
          margin-bottom: 15px;
        }
        .blogAuthorDetails__top--wrapper {
          display: flex;
          justify-content:center;
        }
        .blogAuthorDetails__top--wrapper figure {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 100%;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .blogAuthorDetails__top--wrapper figure a img {
          // height: 100%;
          width: 100%;
          object-fit: cover;
        }

        a {
          text-decoration: none;
          color: #111;
        }

        .blogAuthorDetails__top--right {
          width: 100%;
        }

        .blogAuthorDetails__top--right h3 {
          color: #bebdbd;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }

        .blogAuthorDetails__top--right h3 span {
          color: #c0221f;
          font-size: 18px;
          font-weight: 700;
          display: block;
        }

        .blogAuthorDetails__source {
          font-size: 14px;
          color: #888;
        }
        .blogAuthorDetails__source span {
          display: block;
          margin: 10px 0;
        }
        .blogAuthorDetails__source span b {
          font-weight: 700;
        }
        .blogAuthorDetails__topRight--topshare {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #bebdbd;
        }

        .blogAuthorDetails__topRight--topshare a {
          margin-left: 18px;
        }

        .articleimg {
          background: #444;
          min-height: 240px;
          padding-bottom: 0;
          line-height: 0;
          position: relative;
          margin: 15px 0;
        }
        .articleimg img {
          width: 100%;
        }

        .articleimg h5 {
          font-size: 0.83em;
          line-height: 20px;
          color: #eee;
          padding: 10px;
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.6);
          font-weight: normal;
        }

        .blog__headline--text {
          //border-top: 1px solid #cdcdcd;
          padding: 0;
          margin: 0 16px 16px 16px;
          border-bottom: 1px solid #cdcdcd;
          font-family: "Mukta",sans-serif;
        }
        .blog__headline--text li {
          font-size: 12px;
          padding: 5px 0 6px 14px;
          position: relative;
          color: #949494;
          text-transform: uppercase;
        }
        .blog__headline--text li b{
          color: #4f4f4f;
          font-weight: 700;
        }
        .blog__headline--text li a {
          color:#e1261c;
          font-weight: 700;
          font-size: 12px;
        }
        .blog__headline--text li::before {
          content: "";
          background: #858585;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          position: absolute;
          top: 8px;
          left: 0;
        }

        .blog__description {
          line-height: 28px;
          font-size: 18px;          
          word-break: break-word;
          color: #212121;
          padding: 10px 21px;
          font-family: "Mukta",sans-serif;
          overflow: hidden;
          margin: 10px 10px 0 px;
        }

        .blog__description p {
          font-size: 18px;
          line-height: 32px;
          margin-bottom: 20px;
        }

        .blog__description p img {
          width: 100%;
          height: auto;
        }

        .blog__description .articleimg {
          width: 100%;
          position: relative;
          margin: 10px auto;
          overflow: hidden;
        }

        .blog__description .articleimg img {
          border: none;
          box-shadow: none;
          height: 100%;
          margin: unset;
          padding: unset;
          width: 100%;
        }
        .blog__description .special-text{
          font-family: Mukta,sans-serif;
          font-size: 18px;
          line-height: 1.4;
          color: #000;
          border-left: 0 solid#ee1b24;
          margin-left: 0px;
          min-width: 100%;          
          padding: 0px;
          font-style: inherit;
          font-weight: 400
        }

        .blogAuthorDetails__bottom--wrapper {
          line-height: 28px;
          font-size: 18px;
          word-break: break-word;
          color: #212121;
          padding: 10px 16px;
        }
        .blogAuthorDetails__bottom {
          background: transparent;
          border-radius: 10px;
          padding: 50px 20px 0 20px;
          margin: 0px 0;
          position: relative;
          font-family: "Mukta",sans-serif;
        }
        .blogAuthorDetails__bottom--topbtn {
          position: absolute;
          top: 0;
          height: 44px;
          line-height: 44px;
          padding: 0;
          border-radius: 4px;
          font-size: 20px;
          color: #000;
          background: #fff;
          font-weight: bold;
        }
        .blogAuthorDetails__bottom--headline a {
          display: flex;
          align-items: center;
        }
        .blogAuthorDetails__bottom--headline a figure {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 100%;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .blogAuthorDetails__bottom--headline a figure img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .blogAuthorDetails__bottom--headline a h3 {
          font-size: 20px;
          color: #e33128;
          font-weight: 700;
          line-height: 26px;
        }

        .blogAuthorDetails__bottom--headline a h3 span {
          font-size: 14px;
          font-weight: 400;
          color: #777;
          display: block;
        }

        .blogAuthorDetails__bottom p {
          margin: 15px 0 20px 0;
          font-size: 14px;
          line-height: 26px;
          color: #333;
        }

        .readMoreBtn {
          color: #e33128;
          text-align: end;
          width: 100%;
          display: inline-block;
          font-size: 15px;
        }

        .blogAuthorDetails__share {
          margin-bottom: 20px;
          padding: 0 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Mukta",sans-serif;
        }

        .blogAuthorDetails__share span {
          font-size: 14px;
          color: #555;
        }

        .blogAuthorDetails__share a {
          width: 35px;
          height: 35px;
          font-size: 18px;
          margin-right: 0;
          border-radius: 0;
          margin-left: 14px;
        }

        .blogAuthorDetails__share a span {
          background: #f5f5f5
            url(https://images.news18.com/ibnkhabar/uploads/2020/01/article-icons.png)
            0 0 no-repeat;
          width: 35px;
          height: 35px;
          display: block;
          border-radius: 100%;
        }

        .icon-facebook {
          background-position: 0 0;
          padding: 5px;
        }
        .icon-twitter {
          background-position: -36px 0;
          padding: 5px;
        }
        .icon-linkedIn {
          background-position: -72px 0;
          padding: 5px;
        }
        .icon-whatsapp {
          background-position: -108px 0;
          padding: 5px;
        }
        .icon-telegram {
          background-position: -144px 0;          
        }
        .wtsap_fxd{
          position: fixed;
          right: 0;
          top: 50%;
          z-index: 111;
          border-radius: 6px 0 0 6px;
          border-right: 0;
        }
        .icon-whatsapp_fixed{
          box-shadow: 0 3px 6px#0006;
          border: 1px solid #fff;
          border-radius: 6px 0 0 6px;
        }

        .tag a {
          height: 26px;
          line-height: 26px;
          font-size: 11px;
          padding: 0 16px;
          border-radius: 5px;
          background: #fff;
          color: #828282;
          border: 1px solid #828282;
          margin: 0 14px 14px 0;
          display: inline-block;
          font-family: "Mukta",sans-serif;
        }

        .bynow-text {
          font-size: 15px;
          color: #626262;
          padding-bottom: 15px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          line-height: 22px;
          font-family: "Mukta",sans-serif;
        }

        .decrease__sectionHeight {
          height: 900px;
          padding-bottom: 45px;
          overflow: hidden;
          position: relative;
        }
        .remove__decrease--sectionHeight {
          height: auto;
        }

        .next__article {
          border-bottom: 2px solid #ee1c25;
          font-size: 17px;
          font-weight: 700;
          color: #000;
          padding: 0 0 0 16px;
          position: relative;
          margin-bottom: 16px;
          line-height: 28px;
          height: 32px;
          width: 100%;
          clear: both;
          float: left;
          box-sizing: border-box;
        }
        .next__article::before {
          content: "";
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #ee1c25;
          position: absolute;
          bottom: -10px;
          left: 20px;
        }
        .readFullArticle__btn {
          background: -webkit-linear-gradient(
            top,
            transparent,
            transparent,
            #fff
          );
          padding: 50px 0 15px 0;
          margin: 0 16px;
          height: 30px;
          text-align: center;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          box-sizing: content-box;
        }
        .readFullArticle__btn span {
          height: 42px;
          line-height: 45px;
          color: #fff;
          margin: auto;
          font-weight: 700;
          display: inline-block;
          font-size: 15px;
          background: #498fcd;
          border-radius: 30px;
          text-align: center;
          padding: 0 40px 0 20px;
          position: relative;
        }
        .readFullArticle__btn span:after {
          content: "";
          position: absolute;
          top: 16px;
          right: 20px;
          width: 5px;
          height: 5px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-135deg);
          display: block;
          animation: animateDownArrow 2s infinite;
          transition: 1s ease-in-out;
        }
        .clearfix_child {
          clear: both;
        }
      `}</style>
    </>
  );
};

export default BlogDetailsAMP;
