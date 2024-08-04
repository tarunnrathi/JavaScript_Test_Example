import React, { useContext } from "react";
import { GlobalContext } from "../../../GlobalStore";
//import { imageLoader } from "includes/article.util";
import { getRelativeURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

const RhsTopStoryPhotoGallery = ({ isAmp = false, topStories = [],GA4Data={} }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { pgts = [] } = globalState;

  if(!(topStories.length || pgts.length)) {
    return null;
  }

  if(!pgts.length) {
    updateData(topStories, "pgts");
  } else {
    topStories = pgts;
  }

  return (
    <>
      <div className="rhs-top-galleries">
        <h2 className="ph_heading">
          <a href="/photogallery/">Top Galleries</a>
        </h2>
        <ul className="nwrgtpht-list clearfix">
          {topStories?.length && (
            topStories.map((item,index) => (
              <li key={"sbtl-" + index}>
                <a href={item.weburl? getRelativeURL(false,item.weburl):''} id={"sbtll-" + index}>
                  {
                  !isAmp ?
                    <img loading="lazy" width={144} height={96} 
                    //src={imageLoader(item.images?.url, 144, 96)} 
                    src={item.images?.url? item.images?.url+"?impolicy=website&width=144&height=96":"https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=144&height=96"} 
                    alt={item.display_headline} title={item.display_headline} />
                  //  <LazyLoadImage
                  //     width={144}
                  //     height={96}
                  //     src={item.images?.url}
                  //     alt={item.display_headline||''}
                  //     title={item.display_headline||''}                                
                  //   />
                    :
                    <amp-img width={144} height={96} 
                    // src={imageLoader(item.images?.url, 144, 96)}
                    src={item.images?.url? item.images?.url+"?impolicy=website&width=144&height=96":"https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=144&height=96"}
                    alt={item.display_headline} title={item.display_headline} layout="responsive"/>
                    // <LazyLoadImage
                    //   width={144}
                    //   height={96}
                    //   src={item.images?.url}
                    //   alt={item.display_headline||''}
                    //   title={item.display_headline||''}
                    //   isAMP={true}      
                    //   layout="responsive"                          
                    // />
                  }
                  <p>{item.display_headline}</p>
                </a>
                <AmpAnalyticsGA4Events
                  id={"sbtll-" + index}
                  event_name={"rhs_topstory_widget_cp"}
                  cta_name={item.display_headline}
                  section={GA4Data?.section || ""}
                  subsection={GA4Data?.sub_section || ""}
                  article_id={GA4Data?.article_id}
                  type_of_article={GA4Data?.type_of_article || ""}
                  local18_district={GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
              </li>
            ))
          )}
        </ul>
      </div>
      <style jsx>{`
        .rhs-top-galleries {
          position: relative;
          min-height:380px;
          margin: 15px;
        }
        .ph_heading {
          color: #101010;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .nwrgtpht-list {
          margin-top: 10px;
        }
        .nwrgtpht-list li {
          width: 48%;
          margin-right: 4%;
          float: left;
          min-height: 170px;
          margin-bottom: 10px;
        }
        .nwrgtpht-list li:nth-child(2n) {
          margin-right: 0;
        }
        .nwrgtpht-list li img {
          width: 100%;
        }
        .nwrgtpht-list li p {
          font-size: 13px;
          font-weight: 700;
          line-height: 18px;
          margin-top: 5px;
          color:#4f4f4f;
        }
        .nwrgtpht-list li:nth-child(2n) {
          margin-right: 0;
        }
        .nwrgtpht-list li:last-child {
          display:none;
        }
        amp-img {
          background-color: #dbdbdb;
        }
      `}</style>
    </>
  );
};
export default RhsTopStoryPhotoGallery;
