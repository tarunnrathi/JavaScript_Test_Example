import { setDefaultImage } from 'includes/article.util';
import SiteAd from 'widgets/Common/Responsive/SiteAd';
import siteConfig from 'config/site.config';
import MissionPaani from 'widgets/Common/Responsive/MissionPaani';
import React, { useState } from "react";
import { getArticleList } from "api/global/Common";
import { getQuery } from 'includes/blogs.util';
import LazyLoadImage from "components/Common/CustomImage";
import BreadcrumbCommon from 'widgets/Common/Responsive/BreadcrumbCommon';
import { logEvent } from 'includes/googleAnalytic';
import { additionalText } from "includes/_app.util";
import SearchButton from 'components/Common/SearchButton';

const AgencyMobile = (props) => {
  const { data: { pageAds } } = props;
  const { topic } = props.data;
  const { currentUrl } = props.data;
  const { urlParam } = props.data;
  const [tagData, setTagData] = useState(props.data.tagData);
  const [loadMore, setLoadMore] = useState(1);
  const [ct, setCt] = useState(props.data.ct || "");

  let tagDataChunkval = [];
  if (topic == 'mission-paani') {
    tagDataChunkval = [
      tagData.slice(0, 2),
      tagData.slice(2, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
    ];
  } else {
    tagDataChunkval = [
      tagData.slice(0, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
    ];
  }

  const [tagDataChunk, setTagDataChunk] = useState(tagDataChunkval);

  const { dataLength } = props.data;
  const { paramObj } = props.data;
  const { topicName } = props.data;
  const { imageWidth } = props.data;
  const { imageHeight } = props.data;

  const slug =
    topic !== '' && ct !== ''
      ? topic + '/' + ct + '/'
      : topic !== '' && ct === ''
      ? topic + '/'
      : topic === '' && ct !== ''
      ? ct + '/'
      : '';

  const fbUrl =
    'https://www.facebook.com/sharer.php?u=https://hindi.news18.com/agency/' +
    slug;
  const twUrl =
    'https://twitter.com/share?url=https://hindi.news18.com/agency/' + slug;
  const lkdUrl =
    'https://www.linkedin.com/shareArticle/?mini=true&url=https://hindi.news18.com/agency/' +
    slug;
  const whtasAppUrl =
    'whatsapp://send?text=https://hindi.news18.com/agency/' + slug;

  const noContent = dataLength > 480 && paramObj.page > 30 ? false : true;

  let ctTag = '';
  if (ct == 'news') {
    ctTag = 'खबरें';
  } else if (ct == 'photogallery') {
    ctTag = 'फोटो';
  } else if (ct == 'videos') {
    ctTag = 'वीडियो';
  }

  const fields = 'weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video';

  const loadPosts = async (d) => {
    if (d) {
        const currentLoadMore = d;
        const offset = currentLoadMore*16;
        const pageLimit = 16;

        const subString = getQuery(ct, topic, urlParam);
        let tagResult = [];

        tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: subString, fields: fields }, true);

        const tagData = tagResult;
        (tagData.length === 0 || tagData.length < 16) ? setLoadMore(31) : setLoadMore(currentLoadMore + 1);
        let tagDataChunkval= [];
        tagDataChunkval = [tagData];
        setTagDataChunk((prev) => [...prev, ...tagDataChunkval]);
        setTagData((prev) => [...prev, ...tagData]);
    }
  };

  const storyLength = tagData.length;

  const changeState = (e, state) => {
    e.preventDefault();
    if (state !== ct) {
        setCt(state);
        getData(state);

    }
  };

  const getData = async (cat) => {
    const subString = getQuery(cat, topic, urlParam);
    let tagResult = [];
    const pageLimit = 16;
    const offset = 0;

    tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: subString, fields: fields }, true);

    const tagData = tagResult;
    let tagDataChunkval = [];
     if (topic === 'mission-paani') {
          tagDataChunkval = [
            tagData.slice(0, 2),
            tagData.slice(2, 4),
            tagData.slice(4, 8),
            tagData.slice(8, 24),
          ];
        } else {
          tagDataChunkval = [
            tagData.slice(0, 4),
            tagData.slice(4, 8),
            tagData.slice(8, 24),
          ];
        }
    setTagDataChunk(tagDataChunkval);
    setLoadMore(1);
    setTagData(tagData);
  };

  const breadCrumbArray = [
    {value: "होम", slug: "/"},
    {value: "एजेंसी", slug: "/agency/"}
  ]
  if(topicName && ct) {
    breadCrumbArray.push(
      {value: topicName, slug: `/agency/${paramObj.topic}/`},
    )
    breadCrumbArray.push(
      {value: ctTag},
    )
  } else if(topicName) {
    breadCrumbArray.push(
      {value: topicName},
    )
  } else if(ctTag) {
    breadCrumbArray.push(
      {value: ctTag},
    )
  }
  return (
    <>
      <section className='clearfix wrapper'>
        <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
        <div className='clearfix vsp10 add container-ad'>
          <div className='addinner-box addinner_box_300x250'>
            <SiteAd
              width={336}
              height={280}
              slotId={'mobileAdNew300x250_0'}
              adUnit={pageAds.header_ATF_320}
              sizes={[[300, 250], [336, 280]]}
              style={{ padding: "16px" }}
            ></SiteAd>
          </div>
        </div>
        <div className='tagtop-new noimage'>
          <div className='tagtop-new-img'>
            <img alt='Image' src='' title='' />
          </div>
          <div className='tagtop-new-intro'>
            <h1>{topicName != '' ? topicName : 'News18 हिंदी'}</h1>
            <a
              className="arr_redirect"
              href="javascript:void(0)"
              onClick={async () => {
                const shareData = {
                  title: "",
                  text: `${currentUrl}\n\n ${additionalText}`,
                };    
                try {
                  await navigator.share(shareData);
                } catch (err) {
                  //resultPara.textContent = `Error: ${err}`;
                }
                logEvent("ss_wapi","tap","agency_page");
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
          </div>
        </div>
        <>
          <div className='tgsrch-nav'>
            <ul className='tgsrch-nav-list fl'>
              <li className={ct == '' ? 'act' : ''}>
                <a
                  onClick={(e) => changeState(e, '')}>सभी</a>
              </li>
              <li className={ct == 'news' ? 'act' : ''}>
                <a
                  onClick={(e) => changeState(e, 'news')}>खबरें</a>
              </li>
              <li className={ct == 'photogallery' ? 'act' : ''}>
                <a
                  onClick={(e) => changeState(e, 'photogallery')}>फोटो</a>
              </li>
              <li className={ct == 'videos' ? 'act' : ''}>
                <a
                onClick={(e) => changeState(e, 'videos')}>वीडियो</a>
              </li>
            </ul>
            {/* <a title='Link' href='' className='tgsrch-nav-ar fr'>
              <span></span>
            </a> */}
            <SearchButton isMobile={true} pageType={"agency"}/>
          </div>
          <div
            className='pdngsxtn-lr vsp8 gallery gallery_1'
            rel=''
            data-title=''
          >
            {tagData.length > 0 && noContent ? (
              tagDataChunk.map((element, index) => {
                const tagIdNew = index + 1;
                return (
                  <div id={tagIdNew}>
                    <ul className='gridview-story nbdr nmrgn'>
                      {element.map((item, ind) => {
                        const listNo = ind + 1;
                        const { display_headline } = item;
                        const thumbnail =
                          item.images?.url ||
                          siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH +
                            '?impolicy=website&width=' +
                            imageWidth +
                            '&height=' +
                            imageHeight;
                        const url = item.weburl_r || '';

                        return (
                          <li className='message' key={listNo}>
                            <figure>
                            {(item?.ff_source && item?.local18_video && item?.ff_source=="Hyperlocal" && item?.local18_video !='')?<span className="nwvideoicon"></span>:""}
                              <a title='Link' href={url}>
                                <span className=''></span>
                              </a>
                              <a title='Link' href={url}>
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

                            <div className='lstintro'>
                              <h2>
                                <a title='Link' href={url}>
                                  {display_headline}
                                </a>
                              </h2>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {index == 0 && topic == 'mission-paani' ? (
                      <MissionPaani name='desktop-rhs' />
                    ) : index == 0 && topic != 'mission-paani' ? (
                      <>
                        <div className='clearfix vsp10 add container-ad'>
                          <div className='addinner-box addinner_box_300x250'>
                            <SiteAd
                              width={300}
                              height={280}
                              slotId={'mobileAdNew300x250_' + tagIdNew}
                              adUnit={pageAds.ATF_300}
                              lazyload={true}
                              sizes={[
                                [300, 250],
                                [336, 280],
                              ]}
                            ></SiteAd>
                          </div>
                        </div>
                        <div className='vsp8 clearfix'></div>
                      </>
                    ) : index == 1 ? (
                      <>
                        <div className='clearfix vsp10 add container-ad'>
                          <div className='addinner-box addinner_box_300x250'>
                            <SiteAd
                              width={300}
                              height={250}
                              slotId={'mobileAdNew300x250_' + tagIdNew}
                              adUnit={pageAds.BTF_300}
                              sizes={[
                                [300, 250],
                                [336, 280],
                              ]}
                              lazyload={true}
                            ></SiteAd>
                          </div>
                        </div>
                        <div className='vsp8 clearfix'></div>
                      </>
                    ) : index == 2 && topic == 'mission-paani' ? (
                      <>
                        <div className='clearfix vsp10 add container-ad'>
                          <div className='addinner-box addinner_box_300x250'>
                            <SiteAd
                              width={300}
                              height={250}
                              slotId={'mobileAdNew300x250_' + tagIdNew}
                              adUnit={pageAds.BTF_300}
                              sizes={[
                                [300, 250],
                                [336, 280],
                              ]}
                              lazyload={true}
                            ></SiteAd>
                          </div>
                        </div>
                        <div className='vsp8 clearfix'></div>
                      </>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className='defaultMsg'>
                {' '}
                No stories found matching this criteria
              </p>
            )}
          </div>
        </>
        { storyLength >= 16 ? loadMore<=30 ?
          <button onClick={() => loadPosts(loadMore, tagData)} className="load_more clearfix">
              Load More
          </button> : "" : ""
        }
      </section>
      <style jsx global>
        {`
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
            content: '';
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
            content: '';
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

          .btnvav {
            background: #1a1a1a;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 60px;
            z-index: 9999;
          }
          .adclsftr,
          .btnvav {
            transition: all 0.8s ease-in-out;
          }
          .btnvav li {
            height: 60px;
            float: left;
            width: 25%;
            line-height: 15px;
            padding-top: 8px;
            box-sizing: border-box;
            text-align: center;
          }
          .btnvav li a {
            color: #fff;
            font-size: 12px;
            margin: auto;
            text-transform: uppercase;
          }
          .btnvav li a span {
            height: 28px;
            display: block;
            margin: auto;
            background: none;
          }
          .btnvav li a span.footer-icon-news {
            background-position: -1020px 0;
            width: 18px;
          }
          .btnvav li a span.footer-icon-photo {
            background-position: -1039px 0;
            width: 24px;
          }
          .btnvav li a span.footer-icon-video {
            background-position: -1066px 0;
            width: 21px;
          }
          .btnvav li a span.footer-icon-livetv {
            background-position: -1087px 0;
            width: 21px;
          }
          .btnvav li.active {
            opacity: 1;
            border-bottom: 3px solid #fff;
          }
          .adclsftr {
            bottom: -70px;
          }
          .brdcrm {
            padding: 4px 16px;
            color: #000;
            font-size: 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background-position: #fff;
          }
          .brdcrm a {
            color: #757575;
            font-weight: 400;
          }
          .brdcrm a:last-of-type {
            font-weight: 700;
          }
          .brdcrm a:last-of-type:hover {
            color: #757575;
          }
          .add,
          .add2 {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
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
          }
          .addinner-box span {
            color: #797e90;
            font-size: 11px;
            text-align: center;
            padding: 2px 0 0;
            display: block;
            line-height: 16px;
          }
          .lg-mbl {
            margin-top: 7px;
          }
          .dflx {
            display: flex;
          }
          .jstcntspcbtwn {
            justify-content: space-between;
          }
          .flxwrp {
            flex-wrap: wrap;
          }
          .alignitemcenter {
            align-items: center;
          }
          .container {
            padding: 0 10px;
            position: relative;
          }
          img {
            max-width: 100%;
          }
          ::-webkit-scrollbar {
            width: 0;
            background: 0 0;
          }
          .vsp5 {
            margin-top: 5px;
          }
          .vsp10 {
            margin-top: 10px;
          }
          .vsp15 {
            margin-top: 15px;
          }
          .vsp20 {
            margin-top: 20px;
          }
          .vsp30 {
            margin-top: 30px;
          }
          .vsp40 {
            margin-top: 40px;
          }
          .ty-one {
            position: relative;
            top: -2px;
          }
          .add,
          .add2 {
            z-index: 1;
          }
          // div.addinner_box_300x250 {
          //   height: 268px;
          //   width: 300px;
          // }
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
            background: #000
              url(https://images.news18.com/ibnkhabar/uploads/2017/10/dummyimg.jpg)
              no-repeat 0px 0px;
          }
          .tagtop-new-img {
            line-height: 0;
            width: 100%;
          }
          .tagtop-new-img img {
            width: 100%;
          }
          .tagtop-new-intro {
            padding: 16px 30px 0px 10px;
            position: relative;
            bottom: 10px;
            right: 0;
            box-sizing: border-box;
            margin: -40px 0 0 20px;
            max-height: 200px;
            // overflow: scroll;
          }
          .tagtop-new-intro h1 {
            color: #fff;
            font-size: 24px;
            line-height: 36px;
            font-weight: 700;
          }
          .tagtop-new-intro p {
            color: #fff;
            font-size: 15px;
            line-height: 26px;
            margin-top: 8px;
            overflow: auto;
            height: 85%;
          }
          .adcls-tag-ocpn,
          .adcls-tagtop-new-intro h2,
          .adcls-tagtop-new-intro p {
            opacity: 0.2;
          }
          .tagtop-new-share {
            position: relative;
            text-align: left;
            padding: 10px 0;
          }
          .tagtop-new-share a {
            width: 35px;
            height: 35px;
            margin-right: 15px;
            display: inline-block;
            border-radius: 100%;
            vertical-align: middle;
            text-decoration: none;
            color: #111;
          }
          .tagtop-new-share a span {
            background: #f5f5f5
              url(https://images.news18.com/ibnkhabar/uploads/2020/01/article-icons.png)
              0 0 no-repeat;
            background-position-x: 0px;
            background-position-y: 0px;
            width: 35px;
            height: 35px;
            display: block;
            border-radius: 100%;
          }
          .tagtop-new-share a span.icon-facebook {
            background-position: 0 0;
          }
          .tagtop-new-share a span.icon-twitter {
            background-position: -36px 0;
          }
          .tagtop-new-share a span.icon-linkedin2 {
            background-position: -72px 0;
          }
          .tagtop-new-share a span.icon-whatsapp {
            background-position: -108px 0;
          }
          .adcls-tagtop-new-share {
            transform: scale(1);
          }
          .tagtop-shareicon {
            width: 24px;
            height: 24px;
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
            background-size: 13px;
            border-color: #e40600;
          }
          .tagtop-new * {
            transition: all 0.5s ease-in-out;
          }
          //   .tagtop-new.noimage {
          //     padding: 15px;
          //   }
          .tagtop-new.noimage img {
            display: none;
          }
          .tagtop-new.noimage .tagtop-new-intro {
            // background: #222;
            position: static;
            width: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 20px 16px 10px 16px;
          }
          //   .tagtop-new.noimage .tagtop-shareicon {
          //     top: 24px;
          //     right: 22px;
          //   }
          //   .tagtop-new.noimage .tagtop-new-share {
          //     top: 24px;
          //     right: 45px;
          //   }
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
            position: relative;
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
            content: '';
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
            content: '';
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
            color: #000;
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
            line-height: 1.45;
            clear: both;
            font-weight: 400;
          }
          .vsp8 {
            margin-top: 8px;
          }
          .vsp16 {
            margin-top: 16px;
          }
          //   .tagtop-new-share a span.icon-linkedin2 {
          //     background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/linkediniconnew_1589533700.png)
          //       0 0 no-repeat;
          //     width: 13px;
          //     height: 13px;
          //     background-size: 14px;
          //     position: relative;
          //     top: -1px;
          //   }

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
          .brdcrm h1 {
            font-size: 13px;
            color: #757575;
          }
          .brdcrm {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px 16px;
            font-size: 15px;
          }
          .brdcrm a + a {
            margin-left: 5px;
          }
          .brdcrm a {
            margin-right: 5px;
          }
          .ctTag-text {
            margin-left: 5px;
            color: black !important;
            font-size: 15px;
            font-weight: 700 !important;
          }
          .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}
          .nwvideoicon {
            width: 45px;
            height: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            margin: -22px 0 0 -22px;
            cursor: pointer;
            background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: right;
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
          margin-top: -37px;
        }
        `}
      </style>
    </>
  );
};
export default AgencyMobile;
