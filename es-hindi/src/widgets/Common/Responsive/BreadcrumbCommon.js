import React from "react";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

const BreadcrumbCommon = (props) => {
  const breadCrumbArray = props?.breadCrumbArray || [];
  return (
    <>
      <div className="breadcum ">
        {breadCrumbArray.map((post, index) =>
          post.slug && index < breadCrumbArray.length - 1 ? (
            <React.Fragment key={index}>
              <a className="" href={post.slug} id={`breadcrumb_${index}`} >
                {props?.isCapitalize? post.value:post.value?.toLowerCase()}
              </a>{" "}
              /{" "}
              {props?.isAmp && (
                <AmpAnalyticsGA4Events
                  id={`breadcrumb_${index}`}
                  event_name={"breadcrumb"}
                  cta_name={props?.isCapitalize? post.value:post.value?.toLowerCase()}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
              )}
            </React.Fragment>
          ) : (
            <span key={index}>{post.value}</span>
          ),
        )}
      </div>
      <style jsx global>{`
        .breadcum {
          width: 100%;
          border-bottom: 1px dotted #939393;
          display: flex;
          align-items: center;
          text-transform: capitalize;
          font-weight: 400;
          margin-bottom: 10px;
          font-family: Mukta, sans-serif;
          white-space: nowrap;
          padding-bottom: 5px;
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
        .breadcum span {
          color: #838383;
          font-size: 13px;
          margin-left: 6px;
          line-height: 14px;
          font-weight: 400;
        }
        @media (max-width:768px){
          .breadcum {
            overflow-x: scroll;

          }
      }
        
      `}</style>
    </>
  );
};
export default BreadcrumbCommon;
