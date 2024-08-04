import React from 'react';
import ampHelper from 'includes/Amp/ampHelper';
import validator from 'includes/Amp/validator';
import getConfig from 'next/config';
import { imageLoader } from 'includes/article.util';
import SocialShare from 'widgets/Amp/SocialShare';
import ArticleImage from 'components/Common/ArticleImage';
import Byline from 'components/Common/ByLine';
import BylineAuthor from 'components/Common/BylineAuthor';
import { youtubeParser } from '../../../helper/articleBodyParser';

const { publicRuntimeConfig } = getConfig();

const DistrictArticleCard = (props) => {
  // const { currentUrl, articleData = {}, urlParam = {}, liveBlogFlag } = topPriorityData || {};
  const {
    article,
    index,
    isMobile,
    activeDistrict,
    currentUrl,
    adTarget,
    ampAds,
  } = props;
  const {
    images: { url: thumbnail, caption } = {},
    display_headline,
    images,
    updateDate,
    headline,
    url,
    weburl,
    youtubeid,
    intro,
    ff_source,
    tags = [],
    timestampUpdateDate,
    creationDate,
    timestampCreationDate,
    agency,
    author_byline,
    author,
    agency_full,
    nw_amp_add: nad,
    liveblog_api_url,
    story_id,
  } = article || {};
  const body = validator(ampHelper.getAMPCodes(article.body));
  const showSanjivaniAd =
    Array.isArray(tags) && tags.some((tag) => tag.name === 'Sanjeevani');

  function getAd(pos) {
    switch (pos) {
      case 1: {
        return `<p class="ampaddcntr"><div class="ad-container go">
            <amp-ad 
            width=${336} 
            height=${280} 
            type="doubleclick" 
            data-slot="${ampAds.middleAd1}" 
            json=\'${adTarget}\' 
            data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false" 
            data-multi-size="300x250"  
            rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'>
            </amp-ad>
        </div></p>`;
      }
      case 2: {
        return `<p class="ampaddcntr"><div class="amp-flying-carpet-text-border"></div>
            <amp-fx-flying-carpet height="600px">
            <amp-ad width="${300}"
                height="${600}"
                layout="fixed"
                type="doubleclick" data-multi-size="120x600,300x600" 
                data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP_AS/NW18_HIND_AS_AMP_ROS_FLY_300" 
                json=\'${adTarget}\' 
                data-loading-strategy="prefer-viewability-over-views" 
                data-multi-size-validation="false" 
                rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'
            >
            </amp-ad>
            </amp-fx-flying-carpet>
            <div class="amp-flying-carpet-text-border"></div></p>`;
      }
      case 5: {
        if (showSanjivaniAd) {
          return `<figure id="new_ad_sanjivani">
                <amp-ad
                layout="fluid"
                type="doubleclick"
                json=\'${adTarget}\' 
                data-slot="/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_Sanjeevani', [300, 120]"
                height="fluid">
                </amp-ad></figure>`;
        }
      }

      default: {
        return `<p class="ampaddcntr"><div class="ad-container go">
            <amp-ad 
                width=${336} 
                height=${280} 
                type="doubleclick" 
                data-slot="${ampAds.middleAd2}" 
                json=\'${adTarget}\' 
                data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false"
                data-lazy-fetch="true"
                data-multi-size="300x250"  
                rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'>
            </amp-ad>
            </div></p>`;
      }
    }
  }

  function articleBody(body) {
    let contentArray = youtubeParser(body, true);
    let check;

    if (nad && typeof nad === 'object' && Object.keys(nad).length > 0) {
      check = true;
      const nkeys = Object.keys(nad).map((n) => Number(n));
      const paras = contentArray.matchAll(/<p[\S\s]*?<\/p>/gim);
      // let paras = contentArray;
      let dex = 1;
      for (const para of paras) {
        if (para[0].includes('amp-twitter')) {
          continue;
        }

        if (nkeys.includes(dex)) {
          contentArray = contentArray.replace(
            para[0],
            `${para[0]}${getAd(nkeys.indexOf(dex) + 1)}`
          );
        }

        dex += 1;
      }
    }

    contentArray = contentArray.split(/\r|\n/);

    const firstAdPlace =
      contentArray.length > 10 ? Math.floor(contentArray.length / 3) : 1;
    const secondAdPlace =
      contentArray.length > 10 ? Math.floor((contentArray.length / 3) * 2) : 4;
    const thirdAdPlace =
      contentArray.length > 10 ? contentArray.length - 2 : contentArray.length;
    let html = '';
    for (const [index, value] of contentArray.entries()) {
      let bodyPart = value.replace(/\r?\n?<\/?br ?\/?>/gim, '');
      bodyPart = bodyPart.replace(/<img/gim, '<amp-img');
      bodyPart.includes('<link') &&
        bodyPart.includes('rel="stylesheet"') &&
        (bodyPart = '');
      if (bodyPart.includes('<style') && bodyPart.includes('</style>')) {
        bodyPart = bodyPart.split('</style>')[1];
      }

      if (bodyPart && !check) {
        html += `<p>${bodyPart}</p>`;
      } else {
        html += bodyPart;
      }

      if (index == firstAdPlace && !check) {
        html += `<p class="ampaddcntr"><div class="ad-container go">
                    <amp-ad 
                        width=${336} 
                        height=${280} 
                        type="doubleclick" 
                        data-slot="${ampAds.middleAd1}" 
                        json=\'${adTarget}\' 
                        data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false" 
                        data-multi-size="300x250"  
                        rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'>
                    </amp-ad>
                    </div></p>`;
      }
      if (index == secondAdPlace && !check) {
        html += `<p class="ampaddcntr"><div class="amp-flying-carpet-text-border"></div>
                        <amp-fx-flying-carpet height="600px">
                        <amp-ad width="${300}"
                            height="${600}"
                            layout="fixed"
                            type="doubleclick" data-multi-size="120x600,160x600,300x600" 
                            data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP_AS/NW18_HIND_AS_AMP_ROS_FLY_300" 
                            json=\'${adTarget}\' 
                            data-loading-strategy="prefer-viewability-over-views" 
                            data-multi-size-validation="false" 
                            rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'
                        >
                        </amp-ad>
                        </amp-fx-flying-carpet>
                        <div class="amp-flying-carpet-text-border"></div></p>`;
      }
      if (index == thirdAdPlace && !check) {
        html += `<p class="ampaddcntr"><div class="ad-container go">
                <amp-ad
                    width=${336}
                    height=${280}
                    type="doubleclick"
                    data-slot="${ampAds.middleAd2}"
                    json=\'${adTarget}\'
                    data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false"
                    data-lazy-fetch="true"
                    data-multi-size="300x250"
                    rtc-config=\'{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'>
                </amp-ad>
                </div></p>`;
      }
    }
    return { __html: html };
  }

  const firstHalf = body.length > 200 ? body.slice(0, 200) : body;

  const outBrainUrl = (url || weburl).replace(
    /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  // outBrainUrl =
  // publicRuntimeConfig.siteUrl+"amp" + outBrainUrl.replace(publicRuntimeConfig.siteUrl, "/").trim();
  const shareUrl = outBrainUrl.substring(1);

  return (
    <>
      <div className="newdscrtcardbox">
        <div className="news_title_row">
          <h1 className="pwanews-hd">{headline}</h1>
        </div>
        <div className="news_img_link">
          <div style={{ position: 'relative' }}>
            <ArticleImage
              headline={headline}
              image={
                imageLoader(
                  images.url,
                  // props.isFill ? props.imgw : props.width,
                  // props.isFill ? props.imgh : props.height,
                  '360',
                  '240'
                ) || publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
              }
              caption={caption ? caption : ""}
              youtubeId={youtubeid}
              isMobile={true}
              isAjax={false}
              isAmp={true}
            />
          </div>
          <h2 className="seconadaryheading">{intro}</h2>
        </div>
        <div className={'social-share-amp'}>
          <SocialShare headline={headline} url={props.currentUrl} />
        </div>
        <ul className="newbyeline-agency">
          <Byline agency={agency} agencyFull={agency_full} />
          <li>
            Last Updated:
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
            authorByline={author_byline}
            author={author}
            isMobile={true}
          />
        </ul>
        <div className="newdscrtcardbox-contentparra read_less_full">
          <div
            id={`fullcontent${story_id}`}
            className={
              index == 0 ? 'full-content' : 'full-content nwartbx_intxt_close'
            }
            data-amp-bind-class="visible ? 'full-content' : 'full-content nwartbx_intxt_close'"
          >
            <div dangerouslySetInnerHTML={articleBody(body)} />

            <span className="read-more">
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
            </span>

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
            {/* <amp-embed
              width="100"
              height="100"
              type="outbrain"
              layout="responsive"
              data-widgetIds="AMP_5"
            ></amp-embed> */}
          </div>
          {body.length > 200 && index !== 0 ? (
            <div className="ftr_readfullstory">
              {liveblog_api_url && liveblog_api_url.blog_url ? (
                <a href={`/amp/news/${outBrainUrl.replace('/news/', '')}`}>
                  पूरी खबर पढ़ें
                </a>
              ) : (
                <a
                  className="buttonGrp rd_full newdscrtcardbox-btmmore"
                  data-amp-bind-class="visible ? 'newdscrtcardbox-btmmore newdscrtcardbox-btmmore-rotate': 'newdscrtcardbox-btmmore'"
                  on={`tap:AMP.setState({visible: !visible})`}
                  tabIndex="0"
                >
                  पूरी खबर पढ़ें
                </a>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        .pwanews-hd {
          margin: 15px;
          color: rgba(0, 0, 0, 0.7);
          font-size: 22px;
          line-height: 30px;
          font-weight: 700;
          display: block;
          color: #303030;
        }
        .news_img_link {
          width: 100%;
        }
        .news_img_link img {
          width: 100%;
          display: block;
        }
        .news_img_link {
          position: relative;
          margin-bottom: 15px;
        }
        .seconadaryheading {
          font-size: 18px;
          line-height: 28px;
          font-weight: normal;
          padding: 10px;
          color: #000;
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
        .newdscrtcardbox .share-icon a.for-facebook,
        .newdscrtcardbox .share-icon a.for-twitter,
        .newdscrtcardbox .share-icon a.for-linkedin2,
        .newdscrtcardbox .share-icon a.for-whatsapp,
        .newdscrtcardbox .share-icon a.for-telegram {
          margin: 0 0 0 9px;
        }
        .newbyeline-agency {
          padding: 10px 10px;
          list-style: none;
          margin: 0px;
          width: 100%;
          border-bottom: 1px solid #cdcdcd;
          border-top: 1px solid #cdcdcd;
          text-transform: uppercase;
        }
        .newbyeline-agency li {
          border-top: 0;
          padding: 3px 0 3px 14px;
          margin: 0px 0;
          width: 100%;
          font-size: 14px;
          position: relative;
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
        .newbyeline-agency li span a {
          font-weight: bold;
          text-decoration: none;
          font-size: 13px;
          line-height: 17px;
          color: #e1261c;
          text-transform: uppercase;
        }
        .newbyeline-agency li b {
          color: #4f4f4f;
          padding-right: 10px;
          font-weight: bold;
        }
        .newbyeline-agency li:nth-child(2) {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 13px;
          line-height: 17px;
          padding-right: 10px;
          color: #4f4f4f;
        }
        .newbyeline-agency li:nth-child(2) time {
          font-size: 13px;
          padding-left: 10px;
          text-transform: uppercase;
          font-weight: 700;
          line-height: 17px;
          color: #949494;
        }
        .newbyeline-author-intro a {
          color: #e1261c;
          font-weight: 700;
        }
        .newdscrtcardbox-contentparra {
          font-size: 16px;
          line-height: 28px;
          font-weight: 600;
          padding: 10px;
          color: rgba(0, 0, 0, 0.7);
          position: relative;
        }
        .buttonGrp button {
          background-color: #eb3d3c;
          text-transform: capitalize;
          border: none;
          width: 100%;
          padding: 10px 15px 10px 0px;
          box-sizing: border-box;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          line-height: 19px;
          font-family: 'Noto Sans', devanagari;
          font-weight: 400;
          outline: none;
        }
        .buttonGrp {
          position: relative;
          margin: 0px auto 5px;
        }
        .buttonGrp .arrows:before,
        .buttonGrp .arrows:after {
          content: '';
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        .buttonGrp .arrows {
          position: absolute;
          top: 20px;
          right: 12px;
          width: 12px;
          height: 1px;
          background-color: #fff;
        }
        .read_less_full .buttonGrp .arrows {
          width: 13px;
          transform: rotate(89deg);
        }
        .buttonGrp .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
        .read_full_containr {
          height: auto;
        }
        .read_full_containr:after {
          background: none;
          pointer-events: visible;
        }
        .read_less_full .rd_less button {
          background-color: #707070;
        }
        .read_less_full .buttonGrp.rd_less .arrows {
          width: 13px;
          transform: rotate(-89deg);
        }

                .ftr_readfullstory {
                    position: absolute;
                    width: 93%;
                    bottom: 5px;
                    display: flex;
                    justify-content: center;
                    background-image: linear-gradient(
                        rgba(255, 255, 255, 0),
                        rgba(255, 255, 255, 1)
                    );
                }
                .ftr_readfullstory a {
                    background: red;
                    padding: 2px 25px 2px 15px;
                    display: block;
                    border-radius: 21px;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: #fff;
                    font-weight: bold;
                    margin-top: 50px;
                }
                .newdscrtcardbox-btmmore:after {
                    border-bottom: 2px solid #fff;
                    border-right: 2px solid #fff;
                }
                .newdscrtcardbox-btmmore:before {
                    background: #fff;
                }
                .full-content {
                    margin-bottom: 45px;
                }
                .read-more {
                    padding: 0 0 20px 0;
                    font-family: 'Mukta',sans-serif;
                    color: #404040;
                    margin: 0;
                    font-size: 16px;
                    line-height: 28px;
                    word-wrap: break-word;
                    font-weight: 600;
                    display: block;
                }
                .read-more a {
                    color: #e1261c;
                    border-bottom: dotted 1px #e1261c;
                }
                .page_tag a {
                    line-height: 26px;
                    padding: 2px 15px;
                    border-radius: 5px;
                    background: #fff;
                    font-size: 14px;
                    color: #888;
                    border: 1px solid #ccc;
                    margin: 0 10px 10px 0;
                    display: inline-block;
                    text-decoration: none;
                }
                .page_tag {
                    width: 100%;
                }
                .nwartbx_intxt_close {
                    height: 85px;
                    overflow: hidden;
                }
                .social-share-amp {
                    border-top: 1px solid #cdcdcd;
                }
            `}</style>
        </>
    );
};

export default DistrictArticleCard;
