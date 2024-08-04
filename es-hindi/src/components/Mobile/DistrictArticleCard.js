import React, { useEffect, useRef, useState } from 'react';
import Outbrain from 'widgets/Common/Responsive/Outbrain';
import getConfig from 'next/config';
import Byline from 'components/Common/ByLine';
import SocialShare from './SocialShare';
import BylineAuthor from 'components/Common/BylineAuthor';
import ArticleBody from 'components/Common/ArticleBody';
import { useInView } from 'react-intersection-observer';

import { articleBodyParser } from '../../../helper/articleBodyParser';
import DistrictImage from 'components/Common/DistrictImage';
import { logPageView } from 'includes/googleAnalytic';
import DistrictMobileStyle from './DistrictMobile.module.css';

const ArticleMobile = ({
  pageAds = {},
  articleData,
  isMobile,
  isOpen,
  catURL,
  defaultTitle,
}) => {
  const { publicRuntimeConfig } = getConfig();
  const callFired = useRef(false);
  const callURL = useRef(true);
  const firstDisplay = useRef(false);
  const [readMore, setReadMore] = useState(isOpen);
  const [viewT, setViewT] = useState(0.4);

  const {
    headline,
    images: { url: thumbnail, caption } = {},
    youtubeid: youtubeId,
    intro = '',
    timestampUpdateDate,
    updateDate,
    creationDate,
    timestampCreationDate,
    story_id: storyId,
    tags = [],
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = {},
    author,
    weburl = '',
    byline,
    fms_autopublished,
    section,
    story_categories: storyCategories,
    local18_video: local18Video,
    story_tags: storyTags,
    liveblog_api_url,
  } = articleData;

  const { parsedBody, body } = articleBodyParser(
    articleData.body,
    false,
    storyId,
    pageAds.districtAs,
    true,
    articleData.tags,
    articleData.nw_desktop_add,
    articleData.nw_amp_add
  );

  // current url
  let outBrainUrl = (articleData.url || articleData.weburl).replace(
    /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  outBrainUrl = outBrainUrl.replace(publicRuntimeConfig.siteUrl, '/').trim();
  // .replace(/\/.*\//, "");
  const shareUrl = outBrainUrl.substring(1);

  const { ref, inView, entry } = useInView({
    threshold:
      articleData.ff_source == 'Hyperlocal' && articleData.local18_video != ''
        ? viewT
        : 0.1,
  });
  const fireGA = () => {
    // Trigger ga
    logPageView(
      authorByline.language_name,
      byline,
      agency,
      articleData.ff_source == 'Hyperlocal'
        ? 'Local18'
        : authorByline.author_type,
      (Array.isArray(authorByline.roles) ? authorByline.roles : []).includes(
        'contributor'
      ),
      fms_autopublished,
      section,
      storyId,
      true
    );
    self.COMSCORE &&
      COMSCORE.beacon({
        c1: '2',
        c2: '6683813',
      });
    callFired.current = true;
  };
  useEffect(() => {
    if (
      articleData.ff_source == 'Hyperlocal' &&
      articleData.local18_video != ''
    ) {
      if (inView) {
        updateUrl();
        callURL.current = false;
        if (!callFired.current) {
          fireGA();
        }
      } else if (!entry?.isVisible && !callURL.current) {
        callURL.current = true;
        updateUrl(true);
      }
    } else {
      if (inView && !readMore) {
        callURL.current = false;
        updateUrl();
        if (!callFired.current) {
          fireGA();
        }
      } else if (!entry?.isVisible && !readMore && !callURL.current) {
        callURL.current = true;
        updateUrl(true);
      }
    }
  }, [inView, readMore]);
  // Update url in address bar
  const updateUrl = (isDefault = false) => {
    // outBrainUrl = publicRuntimeConfig.siteUrl + url;
    if (isDefault) {
      history.replaceState({}, '', catURL);
      document.title = defaultTitle;
    } else {
      history.replaceState({}, '', `${outBrainUrl}`);
      document.title = articleData.headline;
    }
  };

  return (
    <>
      <div className={`news_pwa`} ref={ref}>
        <div className="news_title_row">
          {!isOpen ? (
            <h1 className="pwanews-hd">{headline}</h1>
          ) : (
            <h2 className="pwanews-hd">{headline}</h2>
          )}
        </div>
        <div className="news_img_link">
          <div style={{ position: 'relative' }}>
            <DistrictImage
              headline={headline}
              image={thumbnail}
              local18Video={local18Video ?? false}
              caption={caption ? caption : ""}
              youtubeId={youtubeId}
              isMobile={isMobile}
              categories={
                storyCategories && storyCategories.length > 0
                  ? storyCategories.toString()
                  : ''
              }
              tags={
                storyTags && storyTags.length > 0 ? storyTags.toString() : ''
              }
              readMore={readMore}
            />
          </div>

          {!isOpen ? (
            <h2 className="seconadaryheading">{intro}</h2>
          ) : (
            <h3 className="seconadaryheading">{intro}</h3>
          )}
        </div>
        <SocialShare
          url={publicRuntimeConfig.siteUrl + shareUrl}
          headline={headline}
          isDistrict={true}
        />
        {/* {!readMore && (
                    <div className="pwa_add">
                        <span id="first">Advertisement</span>
                        <SiteAd
                            slotId={`mobile_atf_320_${storyId}`}
                            adUnit={pageAds.districtAs.header_ATF_320}
                            sizes={[
                                [320, 250],
                                [300, 250],
                                [336, 280],
                            ]}
                            width={300}
                            height={250}
                        />
                    </div>
                )} */}
        <ul className="newbyeline-agency">
          <Byline agency={agency} agencyFull={agencyFull} />
          <li>
            <b>Last Updated:</b>
            <time
              dateTime={
                timestampUpdateDate !== ''
                  ? timestampUpdateDate
                  : timestampCreationDate
              }
            >
              {updateDate !== '' ? updateDate : creationDate}
            </time>
          </li>
          <BylineAuthor
            authorByline={authorByline}
            author={author}
            isMobile={true}
          />
        </ul>

        <div
          className="article_content"
          style={readMore ? { height: 85, overflow: 'hidden' } : {}}
        >
          <ArticleBody
            body={body}
            id={storyId}
            pageAds={pageAds}
            isDesktop={false}
            parsed={parsedBody}
            isDistrict={true}
            categories={
              storyCategories && storyCategories.length > 0
                ? storyCategories.toString()
                : ''
            }
            tags={storyTags && storyTags.length > 0 ? storyTags.toString() : ''}
            caption={caption ? caption : ""}
            headline={headline}
            image={thumbnail}
          />
        </div>

        {!readMore && (
          <>
            <p className={DistrictMobileStyle.read_more}>
              पढ़ें <a href="https://hindi.news18.com/"> Hindi News </a> ऑनलाइन
              और देखें{' '}
              <a href="https://hindi.news18.com/livetv/">Live TV News18 </a>
              हिंदी की वेबसाइट पर. जानिए देश-विदेश और अपने प्रदेश, बॉलीवुड, खेल
              जगत, बिज़नेस से जुड़ी{' '}
              <a href="https://hindi.news18.com/news/">News in Hindi</a>.<br />
              <br />
              हमें{' '}
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://www.facebook.com/News18Hindi/"
              >
                Facebook
              </a>
              ,
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://twitter.com/HindiNews18"
              >
                Twitter
              </a>
              ,{' '}
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://instagram.com/news18hindi"
              >
                Instagram
              </a>
               और
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://t.me/news18hindi"
              >
                Telegram
              </a>{' '}
              पर फॉलो करें.
            </p>
            <div className="page_tag">
              {tags && tags.length
                ? tags.map((tags, key) => {
                    return (
                      <a key={key} href={'/tag/' + tags.slug + '/'}>
                        {tags.name}
                      </a>
                    );
                  })
                : null}
            </div>
            {/* outbrain start here */}
            <div className="outbrain_row">
              <Outbrain
                widgetId="MB_5"
                widgetSrc={articleData.url || articleData.weburl}
              />
              {isOpen && self?.OBR?.extern?.researchWidget()}
            </div>
            {/* Outbrain end here */}
          </>
        )}

        <div
          className={`nwartbx_morebtn ${
            !readMore ? 'nwartbx_morebtn_close' : ''
          }`}
        >
          {liveblog_api_url && liveblog_api_url.blog_url ? (
            <a href={`/news/${outBrainUrl.replace('/news/', '')}`}>
              {!readMore ? 'बंद करें' : 'पूरी खबर पढ़ें'}
            </a>
          ) : (
            <a
              onClick={() => {
                if (!readMore) {
                  setViewT(0.4);
                } else {
                  setViewT(0.1);
                }
                setReadMore((prevState) => !prevState);
              }}
            >
              {!readMore ? 'बंद करें' : 'पूरी खबर पढ़ें'}
            </a>
          )}
        </div>
      </div>

      <style jsx global>
        {`
          .news_pwa {
            // margin-bottom: 10px;
            border-bottom: 15px solid #f5f5f5;
            border-left: none;
            padding-bottom: 10px;
          }
          .pwa_add {
            background: #dbdde3;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            height: 300px;
            text-align: center;
            height: 350px;
          }
          .pwa_add img {
            width: 100%;
            display: block;
          }
          .pwa_add span {
            color: #797e90;
            font-size: 11px;
            text-align: center;
            padding: 2px 0 0;
            display: block;
            line-height: 16px;
            background: #e8e9ed;
          }
          .news_title_row {
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
          }
          .pwanews-hd {
            font-size: 22px;
            color: #303030;
            line-height: 30px;
            font-weight: 700;
            padding: 10px 0;
            display: block;
          }
          * {
            box-sizing: border-box;
          }
          .news_img_link {
            width: 100%;
            position: relative;
            margin-bottom: 0px;
          }
          .news_img_link img {
            width: 100%;
            display: block;
          }
          .newbyeline-agency {
            list-style: none;
            margin: 0;
            -webkit-order: 1;
            -ms-flex-order: 1;
            order: 1;
            width: 90%;
            padding: 0;
            border-bottom: 1px solid #cdcdcd;
            margin: auto;
            margin-bottom: 10px;
            margin-top: 10px;
            margin: 10px auto 0px;
          }
          .newbyeline-agency li {
            border-top: 0;
            padding: 5px 0 6px 14px;
            margin: 0px 0;
            -webkit-order: 1;
            -ms-flex-order: 1;
            -webkit-order: 1;
            -ms-flex-order: 1;
            order: 1;
            width: 100%;
            font-size: 13px;
            position: relative;
            text-transform: uppercase;
            font-weight: bold;
            line-height: 17px;
            color: #949494;
          }
          .newbyeline-agency li span a {
            color: #e1261c;
            font-weight: bold;
            text-decoration: none;
            font-size: 13px;
            line-height: 17px;
            color: #e1261c;
            text-transform: uppercase;
          }
          .newbyeline-agency li:before {
            content: '';
            background: #858585;
            width: 8px;
            height: 8px;
            border-radius: 100%;
            position: absolute;
            top: 8px;
            left: 0px;
          }
          .newbyeline-agency li b {
            color: #4f4f4f;
            padding-right: 10px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
            line-height: 17px;
            color: #4f4f4f;
          }
          .article_content {
            padding: 10px 15px;
            font-size: 16px;
            line-height: 24px;
            color: #212121;
            word-wrap: break-word;
          }
          .page_tag a {
            line-height: 26px;
            padding: 0 16px;
            border-radius: 5px;
            background: #fff;
            font-size: 11px;
            color: #828282;
            border: 1px solid #828282;
            margin: 0 14px 14px 0;
            display: inline-block;
            text-decoration: none;
          }
          .page_tag {
            width: 100%;
            padding: 0 15px;
          }
          .outbrain_row {
            width: 100%;
            padding: 0 15px;
          }
          .share-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid #ccc;
            // margin: 0px 0 15px;
            padding-top: 15px;
          }
          // .share-icon span {
          //   padding-right: 10px;
          // }
          .share-icon a img {
            display: block;
            width: 28px;
            height: 28px;
          }
          .share-icon a {
            margin: 0 4px;
          }
          .article_content .pwa_add {
            margin: 15px 0;
          }

          .seconadaryheading {
            font-size: 18px;
            line-height: 28px;
            font-weight: normal;
            padding: 10px;
          }

          .article_content a {
            color: #0000ff;
            text-decoration: none;
            word-break: break-word;
          }
          .middlead,
          .adbelow {
            display: flex;
            justify-content: center;
            background: #dbdde3 !important;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            // height: 300px;
            margin: 15px 0;
          }

          .adBox {
            //margin: 0 21px;
          }
          .clearfix:after {
            content: '';
            clear: both;
            visibility: hidden;
            opacity: 0;
            display: block;
            width: 100%;
            font-size: 0;
            line-height: 0;
          }
          .fr {
            float: right;
          }

          .article_faq_question {
            letter-spacing: 0;
            color: #666;
            font-size: 17px;
            position: relative;
            line-height: 23px;
            font-weight: 700;
            border-left: 3px #e1261d solid;
            padding: 9px 39px;
            background: #f5f5f5 0 0 no-repeat padding-box;
            padding-right: 0;
          }
          .article_faq_question:after {
            content: 'Q.';
            position: absolute;
            left: 7px;
            top: 8px;
            color: #e1261d;
            font-size: 20px;
          }
          .article_faq_answer {
            letter-spacing: 0;
            color: #666;
            font-size: 16px;
            position: relative;
            line-height: 27px;
            font-weight: 400;
            padding: 9px 39px;
            padding-right: 0;
          }
          .article_faq_answer:before {
            border-left: 3px #666 solid;
            content: '';
            position: absolute;
            left: 0;
            height: 42px;
            top: 0;
          }
          .article_faq_answer:after {
            content: 'A.';
            position: absolute;
            left: 11px;
            top: 8px;
            color: #666;
            font-size: 20px;
          }
          .article_faq ul li {
            padding-bottom: 20px;
          }
          .article_faq ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .article_faq {
            padding: 0 20px;
            box-sizing: border-box;
            font-family: 'Noto Sans', sans-serif;
            width: 100%;
          }
          p.article_faq_line {
            clear: both;
          }

          p.article_faq_line {
            letter-spacing: 0px;
            color: #000000;
            font-size: 20px;
            font-weight: bold;
            line-height: 27px;
            padding: 0;
            margin-bottom: 20px;
          }
          ul.faq_list {
            margin-top: 30px;
            font-family: 'Noto Sans', sans-serif;
            list-style: none;
            padding-left: 10px;
            padding-right: 10px;
          }
          ul.faq_list li {
            counter-increment: my-awesome-counter;
            position: relative;
            padding-bottom: 20px;
            padding-left: 40px;
          }
          p.faq_intro {
            padding: 0;
            margin: 0;
            text-align: left;
            letter-spacing: 0px;
            color: #001636;
            font-size: 16px;
            line-height: 24px;
          }
          ul.faq_list li:after {
            background: #001636;
            width: 26px;
            height: 26px;
            left: 0;
            top: 5px;
            border-radius: 100px;
            content: counter(my-awesome-counter);
            color: #fff;
            text-align: center;
            line-height: 27px;
            font-size: 18px;
            position: absolute;
          }
          strong {
            font-weight: bold;
          }
          img {
            max-width: 100%;
            margin: 0 auto;
            height: auto;
          }
          .adinner_fxbox {
            position: fixed !important;
            top: 0 !important;
            width: 100%;
            left: 0 !important;
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
          .ad_cntainer {
            height: 300px;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
          }
          .article_content iframe {
            width: 100%;
          }
          .share-icon a span {
            background: #f5f5f5
              url(https://images.news18.com/ibnkhabar/uploads/2020/01/article-icons.png)
              0 0 no-repeat;
            width: 35px;
            height: 35px;
            display: block;
            border-radius: 100%;
          }
          .share-icon a span.icon-facebook {
            background-position: 0 0;
          }
          .share-icon a span.icon-twitter {
            background-position: -36px 0;
          }
          .share-icon a span.icon-linkedin2 {
            background-position: -72px 0;
          }
          .share-icon a span.icon-whatsapp {
            background-position: -108px 0;
          }
          .share-icon a span.icon-telegram {
            background-position: -144px 0;
          }
          .newbyeline-author-intro a {
            color: #e1261c;
            font-weight: bold;
            text-decoration: none;
            text-transform: uppercase;
          }
          iframe {
            border: 0;
            outline: 0;
          }
          #infinite-scroll-section .news_pwa {
            margin-top: 35px;
          }
          .article_content .tw-data-text {
            white-space: normal;
          }
          .article_content iframe {
            width: 100% !important;
            box-sizing: border-box;
          }
          .nwartbx_morebtn {
            position: relative;
            left: 0;
            right: 0;
            text-align: center;
            margin-bottom: 5px;
            background: linear-gradient(
              to top,
              rgba(255, 255, 255, 1) 20%,
              rgba(255, 255, 255, 0) 80%
            );
            padding: 110px 0px 0px;
            margin-top: -89px;
          }
          .nwartbx_morebtn a {
            position: relative;
            background: #ee1c25;
            color: #fff;
            display: block;
            margin: auto;
            border-radius: 30px;
            border: 1px solid #fff;
            box-shadow: 0px 0px 8px #ccc;
            font-size: 13px;
            font-weight: bold;
            padding-right: 12px;
            height: 30px;
            cursor: pointer;
            ${readMore && 'width: 110px;'}
            line-height: 30px;
          }
          .nwartbx_morebtn a:hover {
            color: #fff;
          }
          ${!readMore
            ? ''
            : `.nwartbx_morebtn a:before {
                        content: "";
                        width: 4px;
                        height: 4px;
                        border-left: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        display: block;
                        position: absolute;
                        right: 13px;
                        transform: rotate(-45deg);
                        top: 9px;
                    }`}
          ${!readMore
            ? '.nwartbx_morebtn_close  a {display: block;padding: 0px 30px 0 20px;margin: auto;width: 100px;line-height: 20px;}'
            : ''}

                    .nwartbx_morebtn_close a:before {
            content: '';
            width: 4px;
            height: 4px;
            border-left: 2px solid #fff;
            border-bottom: 2px solid #fff;
            display: block;
            position: absolute;
            right: 13px;
            transform: rotate(135deg);
            top: 13px;
          }
        `}
      </style>
    </>
  );
};

export default ArticleMobile;
