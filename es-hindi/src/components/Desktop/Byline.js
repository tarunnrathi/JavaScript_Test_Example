import React from 'react';
import getConfig from 'next/config';
import RhsCommon from 'widgets/Common/Desktop/RhsCommon';
// import Outbrain from 'widgets/Common/Responsive/Outbrain';
import { setDefaultImage } from 'includes/article.util';
import SocialShare from "components/Desktop/SocialShare";
import { useState } from 'react';
import AuthorListing from 'components/Common/AuthorListing';
import { getArticleList } from "api/global/Common";
import { timeConverter } from 'includes/blogs.util';
import LazyLoadImage from 'components/Common/CustomImage';
import SearchButton from 'components/Common/SearchButton';

const Byline = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { topic } = props.data;
  const { ct } = props.data;
  const { dataLength } = props.data;
  const { paramObj } = props.data;
  const { topicName } = props.data;
  const { imageWidth } = props.data;
  const { imageHeight } = props.data;
  const { photoStories } = props.data;
  const { topStory } = props.data;
  const { topStories } = props.data;
  const outBrainUrl = props.data.currentUrl.replace(/https:\/\/(stg|beta)?hindi.news18.com\//, publicRuntimeConfig.siteUrl);

  const [loadMore, setLoadMore] = useState(1);
  const [tagData, setTagData] = useState(props.data.tagData);

  const { bylineUserData } = props.data;

  const { subString } = props.data;

  let rhsTopStoryListing = [];
  if ('rhsTopStoryListing' in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;

  const noContent = dataLength > 450 && paramObj.page > 30 ? false : true;

  let ctTag = '';
  if (ct == 'news') {
    ctTag = 'खबरें';
  } else if (ct == 'photogallery') {
    ctTag = 'फोटो';
  } else if (ct == 'videos') {
    ctTag = 'वीडियो';
  }

  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 15;
      const pageLimit = 15;
      const fields = 'weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video';

      let tagResult = [];
      tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: subString, fields: fields }, true);
      const tagData = tagResult;
      if (tagData.length === 0) {
        setLoadMore(31);
      } else {
        setLoadMore(currentLoadMore + 1);
      }
      setTagData(
        (prev) => [...prev, ...tagData]
      );
    }
  };

  return (
    <>
      {/* Byline Page html start*/}
      <div className='outer'>
        <div className='section-blog clearfix'>
          <div className='section-blog-left resLiftSideFull'>
            <div className='breadcum'>
              {tagData?.length > 0 && noContent ? (
                ct ? (
                  <>
                    <a href='/'>होम</a> / <a href='/byline/'>बाइलाइन</a> /{' '}
                    <a href={`/byline/${paramObj.topic}-${paramObj.authId}/`}>
                      {topicName}
                    </a>{' '}
                    / <h2>{ctTag}</h2>
                  </>
                ) : (
                  <>
                    <a href='/'>होम</a> / <a href='/byline/'>बाइलाइन</a> /{' '}
                    <h2>{topicName}</h2>
                  </>
                )
              ) : (
                <>
                  <a href='/'>होम</a> / <a>बाइलाइन</a>
                  {ctTag !== '' ? (
                    <>
                      /<h2> {ctTag}</h2>{' '}
                    </>
                  ) : null}
                </>
              )}
            </div>
            <SearchButton  pageType={"byline"}/>
            <div className="byline_srch">
              {tagData?.length > 0 && noContent ?
              <SocialShare
                headline={bylineUserData?.nicename}
                url={outBrainUrl}
              /> : null}
             
            </div>

            <div className={paramObj.authId != '' &&
              bylineUserData.avtar != '' &&
              bylineUserData.author_bio != '' ? 'wdImg search-listing' : "search-listing"}>

              {paramObj.authId != '' &&
                <div className='author-brief'>
                  {bylineUserData.avtar != '' ? <LazyLoadImage
                    src={bylineUserData.avtar}
                    alt={topicName}
                    title={topicName}
                    height={70}
                    width={70}
                    onError={setDefaultImage}
                  /> : ""}

                  <div className='author-brief-txt'>

                    <h1 className='top-heading'>{topicName}</h1>
                    <p>{bylineUserData.author_bio}</p>
                  </div>
                </div>
              }
              <>
                <ul className='listingData'>
                  {tagData?.length > 0 && noContent ? (
                    tagData.map((item, ind) => {
                      const listNo = ind + 1;
                      const { display_headline } = item;
                      const thumbnail = item.images.url || '';
                      const url = item.weburl_r || '';
                      const intro = item.intro || '';
                      let category = '';
                      const content_type = item.post_type || '';

                      category = item?.section?.filter((cat) => !cat.includes('/')) || '';
                      category = category?.slice(0, 3)?.join(', ').toString() || '';
                      return (
                        <React.Fragment key={"tagData" + listNo}>
                          {' '}
                          <li>
                            <figure className={content_type === 'Videos' ? 'video' : content_type === 'photogallery' ? 'photo' : ""}>
                              {(item?.ff_source && item?.local18_video && item?.ff_source == 'Hyperlocal' && item?.local18_video != '') ? <span className="nwvideoicon"></span> : ""}
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

                            <div className='search-listing-details'>
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
                                    __html: intro + '...',
                                  }}
                                ></a>
                              </p>
                              <span className='post-date'>
                                <a> {category}</a>
                                {item?.created_at ? timeConverter(item?.created_at) : ''}
                              </span>
                            </div>
                          </li>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <AuthorListing tab={props.data.tab} authorList={props.data.authorsListData} />
                  )}
                </ul>
              </>
            </div>
            {tagData.length >= 15 ? loadMore <= 30 ?
              <button onClick={() => loadPosts(loadMore, tagData)} className="load_more clearfix">Load More</button> : "" : ""}
          </div>

          {/* Side bar start here */}
          <div className='rightwrap'>
            <RhsCommon
              section='tag'
              pageAds={props.pageAds}
              currentURL={outBrainUrl}
              topicName={topic}
              photoStories={photoStories}
              topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
              }
              isRss={tagData?.length > 0 ? false : true}
            />
            {/* Side bar end here */}
          </div>
        </div>

        {/* <Outbrain widgetId='AR_6' widgetSrc={outBrainUrl} /> */}

      </div>
      {/* Tag Page html End */}
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
            list-style: none;
            outline: 0;
            text-decoration: none;
          }
          .outer {
            margin: auto;
            max-width: 1245px;
            padding: 0px 10px;
            position: relative;
            z-index: 1;
          }

          .section-blog-left {
            width: calc(100% - 320px);
            float: left;
            position: relative;
          }

          .section-blog-left .artclbyeline-share{
            // position: absolute;
            right: 0;
            display: inline-flex;
            top: 59px;
            width: auto;
            border: none;}
        
        .section-blog-left .artclbyeline-share .follow_us{
            background-color: white;
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
          overflow-x: hidden;
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
          #top-area-nav {
            margin: 0px 0px 0px;
            padding: 0px;
            float: left;
            width: 100%;
          }
          ul.parent {
            border-bottom: 1px solid #ccc !important;
            float: left;
            width: 100%;
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
          }
          #top-area-nav ul.parent li {
            float: left !important;
            margin: 4px 11px;
            position: relative;
          }
          #top-area-nav ul.parent li a.act {
            color: #ed1c24;
            border-bottom: solid 3px #ed1c24;
          }
          #top-area-nav ul.parent li a:hover {
            color: #ed1c24;
            border-bottom: solid 3px #ed1c24;
          }

          .search-listing{
            display:inline-block;
            margin-bottom: 10px;
          }
          .search-listing ul li {
            float: left !important;
          }

          .search-listing ul li {
            display: flex;
            justify-content: space-between;
            margin: 25px 0;
            align-items:flex-start;
          }
          // .search-listing ul li figure img {
          //   width: 100%;
          // }
          .search-listing ul li figure {
            margin-right: 20px;
            flex-shrink: 0;
            line-height: 0;
            width: 225px;
            position: relative;
          }
          .search-listing ul li .search-listing-details h2 a,
          .search-listing ul li .search-listing-details h3 a {
            font-size: 24px;
            line-height: 24px;
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
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
            color: #666;
            font-size: 15px;
            line-height: 24px;
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
            margin:0 0 8px 0 !important;
          }

          .search-listing ul li p {
            // max-height: 55px !important;
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
            color: #666;
          }
          .search-listing ul li .search-listing-details span {
            font-size: 12px;
            color: #999;
            display: block;
            text-transform: uppercase;
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
          }
          .search-listing ul li .search-listing-details span a {
            color: #ee1b24;
            padding-right: 10px;
    margin-right: 7px;
    border-right: #606060 solid 1px;
          }
          span .post-date {
            margin: 4px 0;
          }
          .red-text {
            color: #ed1c24 !important;
          }
          // span.post-date a {
          //   padding-right: 5px;
          // }
          .rightwrap {
            width: 300px;
            float: right;
          }
          .top-heading {
            font-size: 32px;
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
            margin-bottom: 3px;
            margin-top: -4px;
            padding-left: 5px;
          }
          .vsp10 {
            margin-top: 10 px;
          }
          .clearfix {
            clear: both;
          }
          .pagination ul li a {
            font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
          }

         ul.pagination{
           display:inline-flex !important;
           padding: 20px 0 30px !important;
           width: 100% !important;
         }
         .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}
          .artclbyeline-share li:first-child {
            margin-left: 0;
          }
          
          .artclbyeline-share li:first-child:before {
            background: #e1261d;
          }
          .artclbyeline-share {
            font-family: "Mukta", sans-serif !important;
            display: flex;
            align-items: center;
            list-style: none;
            width: 100%;
            text-align: left;
            padding: 12px 0;
            border-bottom: 1px dotted #939393;
            margin-top: 0px;
          }
          .artclbyeline-agency li b {
            font-weight: bold;
            color: #454545;
          }
          .artclbyeline-share li {
            color: #6b6b6b;
            font-size: 14px;
            margin-left: 10px;
            text-transform: uppercase;
            line-height: 0;
            background-color: #ccc;
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

          .gn_icon {
            display: inline-flex;
            width: 40px;
            height: 40px;
            background: #fff url(/images/siteimages/sprite_img_1.svg?v1.5)no-repeat bottom;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          }
          .fl_txt {
            font: 400 11px / 12px Mukta;
            color: rgb(90, 90, 90);
            width: 45px;
            text-transform: none;
        }

        .follow_us {
          border-left: 1px solid rgb(90, 90, 90);
          padding-left: 8px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          background-color: rgb(247, 247, 247);
      }

      .listingData li{
        border-bottom:#A2A2A2 dashed 1px;
        padding: 20px 0;
        margin: 0 !important;
    }
    .author-list li {
      padding: 12px 0;
    }

     .artclbyeline-share{
         top: 48px !important;
     }
     .author-brief{
      border-bottom: 1px solid #ccc !important;
     }
   
     .author-brief{display: flex;border-top: 1px solid #ccc;padding-bottom: 40px;padding-top: 20px;}
     .wdImg.search-listing .author-brief img{width:90px;height:90px;border-radius: 100%;border:#dbdbdb solid 1px;margin-right: 15px;}


     .search-listing ul li figure.photo:after{
      content: "";
      width: 75px;
      height: 75px !important;
      position: absolute;
      top: 50%;
      left: 0;
      background: url("/images/byline/photo-byline.svg") no-repeat;
      background-size: 100%;
      right: 0;
      margin: auto;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
  }

  .search-listing ul li figure.video:after{content: "";
         width: 75px;
         height: 75px !important;
         position: absolute;
         top: 50%;
         left: 0;
         background: url("/images/byline/video-byline.svg") no-repeat;
         background-size: 100%;
         right: 0;
         margin: auto;
         -webkit-transform: translateY(-50%);
         -ms-transform: translateY(-50%);
         -webkit-transform: translateY(-50%);
         -ms-transform: translateY(-50%);
         transform: translateY(-50%);}
          


         .author-brief-txt p{
          color: #666;
              font-size: 15px;
              line-height: 24px;
              padding-top: 8px;
          }

          .search-listing ul li .search-listing-details h2 a, .search-listing ul li .search-listing-details h3 a{
            line-height: 34px;
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
          opacity: .7;
          background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
        }
        .byline_srch{
          display: flex;
          position: absolute;
          top: 48px !important;
          right: 0;
          flex-direction: column;
          align-items: flex-end;
        }
        .resLiftSideFull .smsrch_btn {
          top: 3px;
      }
        // .byline_srch .smsrch_btn{position:unset}
        

        `}
      </style>
    </>
  );
};
export default Byline;
