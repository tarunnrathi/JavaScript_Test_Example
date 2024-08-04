import getConfig from 'next/config';
import { setDefaultImage } from 'includes/article.util';
import SiteAd from 'widgets/Common/Responsive/SiteAd';
import siteConfig from 'config/site.config';
import MissionPaani from 'widgets/Common/Responsive/MissionPaani';
import SocialShare from './SocialShare';
import { useState } from 'react';
import AuthorListing from 'components/Common/AuthorListing';
import { getArticleList } from "api/global/Common";
import { timeConverter } from 'includes/blogs.util';
import LazyLoadImage from 'components/Common/CustomImage';
import SearchButton from 'components/Common/SearchButton';

const BylineMobile = (props) => {
  const {
    data: { pageAds },
  } = props;

  const { publicRuntimeConfig } = getConfig();
  const [tagData, setTagData] = useState(props.data.tagData);
  const { topic } = props.data;
  const { ct } = props.data;
  let tagDataChunk = [];

  if (topic == 'mission-paani') {
    tagDataChunk = [
      tagData.slice(0, 2),
      tagData.slice(2, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
      tagData.slice(24, tagData.length),
    ];
  } else {
    tagDataChunk = [
      tagData.slice(0, 4),
      tagData.slice(4, 8),
      tagData.slice(8, 24),
      tagData.slice(24, tagData.length),
    ];
  }

  const [loadMore, setLoadMore] = useState(1);

  const { dataLength } = props.data;
  const { paramObj } = props.data;
  const { topicName } = props.data;
  const { imageWidth } = props.data;
  const { imageHeight } = props.data;
  const { bylineUserData } = props.data;

  const outBrainUrl = props.data.currentUrl.replace(/https:\/\/(stg|beta)?hindi.news18.com\//, publicRuntimeConfig.siteUrl);

  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 16;
      const pageLimit = 16;
      const fields = 'weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video';

      let tagResult = [];
      tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: props.data.subString, fields: fields }, true);
      const tagData = tagResult;
      if (tagData?.length === 0) {
        setLoadMore(31);
      } else {
        setLoadMore(currentLoadMore + 1);
      }
      setTagData(
        (prev) => [...prev, ...tagData]
      );
    }
  };

  const noContent = dataLength > 480 && paramObj.page > 30 ? false : true;

  let ctTag = '';

  if (ct == 'news') {
    ctTag = 'खबरें';
  } else if (ct == 'photogallery') {
    ctTag = 'फोटो';
  } else if (ct == 'videos') {
    ctTag = 'वीडियो';
  }

  return (
    <>
      {/* बाइलाइन Page html start */}
      <section className='clearfix wrapper'>
        <div className='breadcum'>
          {tagData.length > 0 && noContent ? (
            ct ? (
              <>
                <a title='Link' href='/'>
                  होम <span> / </span>
                </a>
                <a title='Link' href='/byline/'>
                  बाइलाइन{' '}
                  <span>
                    {''}/{''}
                  </span>
                </a>
                <a
                  title='Link'
                  href={`/byline/${paramObj.topic}-${paramObj.authId}/`}
                >
                  {topicName}{' '}
                  <span>
                    {''}/{''}{' '}
                  </span>
                </a>
                <span>{ctTag}</span>
              </>
            ) : (
              <>
                <a title='Link' href='/'>
                  होम <span>/</span>
                </a>
                <a title='Link' href='/byline/'>
                  बाइलाइन <span>/</span>
                </a>
                <h2>{topicName + ' ' + ctTag}</h2>
              </>
            )
          ) : (
            <>
              <a href='/'>होम <span>/</span></a>  <h2>बाइलाइन</h2>
              {ctTag !== '' ? (
                <>
                  /<h2>{ctTag}</h2>{' '}
                </>
              ) : null}
            </>
          )}
        </div>
        <div className='clearfix add container-ad'>
          <div className='addinner-box addinner_box_300x250'>
            <SiteAd
              width={336}
              height={280}
              slotId={'mobileAdNew300x250_0'}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [300, 250],
                [336, 280]
              ]}
              style={{ padding: "16px" }}
            ></SiteAd>
          </div>
        </div>
        {tagData.length > 0 && noContent ? <div className='tagtop-new noimage'>
          <div className='tagtop-new-intro'>
            <div className='author_detail'>
              {bylineUserData.avtar ? <div className='tagtop-new-img'>
                <LazyLoadImage
                  src={bylineUserData.avtar}
                  alt={topicName}
                  title={topicName}
                  height={70}
                  width={70}
                  onError={setDefaultImage}
                />
              </div> : ""}

              <div className='author_detail_txt'>
                <h1>{topicName != '' ? topicName : 'News18 हिंदी'}</h1>
                <ul className='tag-ocpn'></ul>
                <p>{bylineUserData.author_bio}</p>
              </div>
            </div>
            <SearchButton isMobile={true} pageType={"byline"}/>
            <SocialShare url={outBrainUrl} headline={bylineUserData?.nicename} hideJoin={true} page="byline_author" />
          </div>
        </div> : null}
        <>
          <div
            className='pdngsxtn-lr vsp8 gallery gallery_1'
            rel=''
            data-title=''
          >
            {tagData.length > 0 && noContent ? (
              tagDataChunk.map((element, index) => {
                const tagIdNew = index + 1;
                return (
                  <div key={"tagDataChunk" + tagIdNew}>
                    <ul className='gridview-story nbdr nmrgn'>
                      {element.map((item, ind) => {
                        const listNo = ind + 1;
                        const content_type = item.post_type || '';
                        const { display_headline } = item;
                        const thumbnail = item?.images?.url || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH +
                          '?impolicy=website&width=' +
                          imageWidth +
                          '&height=' +
                          imageHeight;
                        const url = item.weburl_r || '';

                        let category = '';
                        if (item.section) {
                          category = item.section.filter((cat) => !cat.includes('/'));
                          category = category.slice(0, 3)?.join(', ').toString() || '';
                        }

                        return (
                          <li className={`message ${index === 0 && ind === 0 ? "first_li" : ''}`} key={listNo}>
                            <figure className={content_type === 'Videos' ? 'video' : content_type === 'photogallery' ? 'photo' : ""}>
                              {(item?.ff_source && item?.local18_video && item?.ff_source == "Hyperlocal" && item?.local18_video != '') ? <span className="nwvideoicon"></span> : ""}
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
                                <a
                                  title='Link'
                                  href={url}
                                  dangerouslySetInnerHTML={{
                                    __html: display_headline,
                                  }}
                                >
                                </a>
                              </h2>
                              <div className="auth_info">
                                <a href="" className="city_name">{category}</a>
                                {item?.created_at ? timeConverter(item?.created_at) : ''}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {index == 0 && topic == 'mission-paani' ? (
                      <MissionPaani name='desktop-rhs' />
                    ) : index == 0 && topic != 'mission-paani' ? (
                      <>
                        <div className='clearfix add container-ad'>
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
                        <div className='clearfix  add container-ad'>
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
                        <div className='clearfix add container-ad'>
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
              <AuthorListing tab={props.data.tab} authorList={props.data.authorsListData} isMobile={props.data.isMobile} />
            )}
          </div>
        </>
        {tagData.length >= 16 ? loadMore <= 30 ?
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
            margin-bottom: 40px;
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
          .top_links_contnot {
            border-top: 1px solid #ececec;
            border-bottom: 1px solid #ececec;
            background: #f7f7f7;
            position: sticky;
            top: 0px;
            width: 100%;
            height: 38px;
            z-index: 9;
            overflow: hidden;
          }
          .top_links_element {
            display: flex;
            justify-content: space-between;
            overflow-y: hidden;
            align-items: center;
            padding-top: 6px;
          }
          .top_links_contnot a:nth-of-type(2) {
            border-left: 1px solid #ccc;
            margin-left: 2px;
          }
          .top_links_contnot a {
            border-right: 1px solid #ccc;
            padding: 3px 15px 0 15px;
            color: #606060;
            font-size: 16px;
            line-height: 18px;
            text-align: center;
            flex: none;
          }
          .top_links_contnot a:last-child {
            border-right: 0;
          }
          .adclsftr {
            bottom: -70px;
          }
          .breadcum {
            width: 100%;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            font-weight: 400;
            margin-bottom: 10px;
            font-family: Mukta, sans-serif;
            white-space: nowrap;
            padding-top: 5px;
            font-size: 13px;
            overflow-x: scroll;
            color: #e1261d;
          }
          .breadcum a {
            margin: 0 6px;
            font-size: 13px;
            color: #e1261d;
            line-height: 24px;
          }
          .breadcum h2 {
            color: #838383;
            font-size: 13px;
            margin-left: 6px;
            line-height: 14px;
            font-weight: 400;
          }
          
          .add,
          .add2 {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
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
          // ::-webkit-scrollbar {
          //   width: 0;
          //   background: 0 0;
          // }
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
          //   height: 250px;
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
            background:#222;
          }
          .tagtop-new-img {
            line-height: 0;
            width: 100%;
            max-width: 75px;
            flex-shrink: 0;
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
            // max-height: 200px;
            // overflow: scroll;
          }
          .tagtop-new-intro h1 {
            color: #fff;
            font-size: 24px;
            line-height: 36px;
            font-weight: 700;
            margin-top: -5px;
          }
          .tagtop-new-intro p {
            color: #fff;
            font-size: 15px;
            line-height: 26px;
            // margin-top: 8px;
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
            // display: none;
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
            border-top: 1px solid #707070;
            box-sizing: border-box;
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
            padding: 0 15px;
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
float: left;
margin-bottom: 16px;
box-sizing: border-box;
padding-bottom: 8px;
display: flex;
border-bottom: 1px dashed #A2A2A2;
align-items: flex-start;
          }
          .gridview-story li figure {
            width:100%;float:left;line-height:0;position:relative;margin-bottom:8px;max-width: 110px;
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
            width: 110px;
            height: 73px;
          }
          .load_more{width:130px;height:38px;background: #ED1C24; 
            border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer; margin-bottom: 10px;}
          .gridview-story li .lstintro {
            padding: 0 8px;
            cursor: pointer;
            margin: 0;
            clear: both;
            overflow: hidden;
            margin: -5px 0 0 0;padding:0 0 0 10px;
          }
          .gridview-story li h2 {
           
            font:bold 14px/22px Noto Serif;color: #111111;
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
            padding: 10px;
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

          .social_share_sec {
            //margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
          }

          .spriteshare {
            background: url(/images/siteimages/sprite_img_1.svg)
              0 0 no-repeat;
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

          ul.art_social_share {
            font-family: 'Mukta', sans-serif !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          ul.art_social_share li {
            color: #6b6b6b;
            font-size: 14px;
            // margin-left: 15px;
            text-transform: uppercase;
            line-height: 0;
            background-color: #ccc;
          }
          ul.art_social_share li:first-child {
            margin-left: 0px;
          }
          .gn_icon {
            display: inline-flex;
            width: 40px;
            height: 40px;
            background: #fff url(/images/siteimages/sprite_img_1.svg?1.5)no-repeat bottom;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        }
        .fl_txt {
          font: 400 11px/12px Mukta;
          color: #5A5A5A;
          width: 30px;
          text-transform: none;
      }

      .follow_us {
        border-left: #5A5A5A solid 1px;
        padding-left: 8px;
        display: flex;
        align-items: center;
        background: white;
        background-color: #222;

    }

    .gridview-story .first_li{display: block; z-index : 1;margin-top:5px;}
.gridview-story .first_li figure{max-width: unset;}
.gridview-story .first_li figure a{
    position: relative;padding-bottom: 66.67%;
    display: block;
}
.gridview-story .first_li figure a img{
    position: absolute;top: 0;left: 0;width: 100%;height: 100%;
}
.gridview-story .first_li .lstintro{
    padding: 0;
}
.gridview-story .first_li h2{
    font: normal normal bold 20px/28px Noto Serif;
}
.gridview-story .first_li .auth_info{display: flex;align-items: center;font: normal 12px/24px Noto Serif;}
.gridview-story .auth_info{font: normal 11px/16px Noto Serif;}
.gridview-story .first_li a.city_name{margin-right: 8px;padding-right: 9px;position: relative;}
.gridview-story .first_li a.city_name:after{content: '';border-right: #606060 solid 1px;position: absolute;top: 5px;bottom: 5px;right: 0;}

.gridview-story a .city_name{color: #ED1C24;display: block;}
.gridview-story time .time{color: #999999;display: inherit;}

// .tagtop-new.noimage .tagtop-new-intro .follow_us{
//   background-color: #000;
// }
.tagtop-new.noimage .tagtop-new-intro .follow_us .fl_txt{
  color:#fff;
}
ul .gridview-story{
  -webkit-justify-content:space-between;
  -ms-flex-pack:space-between;
  justify-content:space-between;
  margin-bottom: 6px;
}

.gridview-story{
  width:48% remove this line for thsi page only
}

.gridview-story li .auth_info {
  font: normal 11px/16px Noto Serif;
  text-transform: uppercase;
  color: #999999;
}

.gridview-story li a.city_name {
  color: #ED1C24;
  display: block;
  margin-bottom: 2px;
}

.gridview-story li time.time {
  color: #999999;
  display: inherit;
}

// .top_links_cont::-webkit-scrollbar{
//    height:0px;
// }

.author_detail{display:flex;margin-bottom: 15px; border-bottom: #5a5a5a solid 1px;
  padding-bottom: 10px;}

                     .author_detail img{width: 60px;
                      height: 60px;
                      // border-radius: 100%;
                      border: #fff solid 3px;
                      margin-right: 15px;}


                     .gridview-story li.first_li figure a{
                      z-index:1;
                  }
                  
                  
                  .gridview-story li figure.photo:after{
                      content: "";
                      width: 45px;
                      height: 45px !important;
                      position: absolute;
                      top: 50%;
                      left: 0;
                      background: url("/images/byline/photo-byline.svg") no-repeat;
                      background-size: 45px;
                      right: 0;
                      margin: auto;
                      -webkit-transform: translateY(-50%);
                      -ms-transform: translateY(-50%);
                      -webkit-transform: translateY(-50%);
                      -ms-transform: translateY(-50%);
                      transform: translateY(-50%);
                      z-index: 2;
                  }
                  .gridview-story li figure.video:after{
                      content: "";
                      width: 45px;
                      height: 45px !important;
                      position: absolute;
                      top: 50%;
                      left: 0;
                      background: url("/images/byline/video-byline.svg") no-repeat;
                      background-size: 45px;
                      right: 0;
                      margin: auto;
                      -webkit-transform: translateY(-50%);
                      -ms-transform: translateY(-50%);
                      -webkit-transform: translateY(-50%);
                      -ms-transform: translateY(-50%);
                      transform: translateY(-50%);
                      z-index: 2;
                  }
                  .gridview-story li.first_li figure.photo:after,
                  .gridview-story li.first_li figure.video:after{
                      width: 76px;
                      height:76px !important;
                      top:50%;
                      background-size: 100%;
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
                    background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
                }
                .author-list li {
                  padding: 8px 15px;
                }
                .tagtop-new.noimage .tagtop-new-intro .smsrch_btn .icnsrch {
                  width: 15px;
                  height: 15px;
                 }
                .tagtop-new.noimage .tagtop-new-intro .smsrch_btn .icnsrch:before {
                  content: "";
                  top: 7px;
                  left: 13px;
                  height: 10px;
                }
        `}
      </style>
    </>
  );
};
export default BylineMobile;
