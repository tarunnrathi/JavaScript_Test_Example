import React from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
// import {setDefaultImage } from "includes/article.util";
// import Image from 'next/image';
import LazyLoadImage from "./CustomImage";
import { getRelativeURL } from "util/global/Helper";
import SearchWidget from "widgets/Common/Search/SearchWidget";

export default function NotFound(props) {
  let { homeStories } = props?.topPriorityData;
  if(homeStories && homeStories?.stories) {
    homeStories =homeStories?.stories;
  }
//  console.log("homeStories",homeStories);
  return (
    <>
      <div className="container clearfix error-block">
        <div
          className={`${
            props.isDesktop ? "error-container-desk" : "error-container-mob"
          }`}
        >
          <h1 className="top-heading">पेज नहीं मिला</h1>
          <h3 style={{ fontSize: "1.1em" }}>
            माफ कीजिए! यह पेज उपलब्ध नहीं है। कृपया{" "}
            <a
              href="/"
              style={{ color: "#003399", textDecoration: "none" }}
            >
              News18 India
            </a>{" "}
            के होम पेज पर जाएं
          </h3>
          <SearchWidget isMobile={!props.isDesktop} />
          {homeStories && homeStories.length ? (
            <>
            <div className="hd_heading">
              TOP <h1>HINDI NEWS</h1>
            </div>
             <ul className="error-news">
             {homeStories.map((item, key) => {
              let href = item?.weburl ?getRelativeURL(false,item?.weburl):'';
               return (
                   <li key={key} className={!props.isDesktop && key === 0 ? "lead-story" : ""}>
                     <a href={href}>
                       <div className="image-wrap">

                       {/* <Image
                        src={item?.images?.url}
                        width={!props.isDesktop ? 355 : 217}
                        height={!props.isDesktop ? 226 : 144}
                        alt={item?.display_headline}                                                                 
                        onError={setDefaultImage}
                        loading="lazy"
                      /> */}
                        <LazyLoadImage                      
                          src={item?.images?.url}
                          width={!props.isDesktop ? 355 : 217}
                          height={!props.isDesktop ? 226 : 144}
                          alt={item?.display_headline} 
                          title={item?.display_headline}
                          isLazyLoad={true}
                        />
                        </div>
                       <div className="content-box">
                         <p className="discription">{item?.display_headline}</p>
                       </div>
                     </a>
                  </li>);
             })}
             </ul>
             </>
          ) : null}
        </div>
        {props.isDesktop && (
          <RhsCommon
            pageAds={props?.pageAds}
            photoStories={props?.topPriorityData?.photoStories}
            topStories={props?.topPriorityData?.topStories}
            rhsPhoto={props?.topPriorityData?.rhsPhotoGallery}
            rhsTopStory={props?.topPriorityData?.rhsTopStory}
            currentURL={
              "https://hindi.news18.com/news/nation/aiims-director-dr-randeep-guleria-receives-covid-19-vaccine-live-on-television-3419090.html"
            }
          />
        )}
      </div>
      <style jsx global>
        {`
          .top-heading {
            letter-spacing: 2px;
            color: #ee1b24;
            font-size: 1.6em;
            margin: 0 0 10px;
            text-transform: uppercase;
          }
          body {
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .error-container-desk {
            width: calc(100% - 315px);
            float: left;
          }
          .error-container-mob {
            padding: 0 10px;
          }
          .error-block {
            margin-top: 43px;
          }
          .error-news {
            display: grid;
            grid-template-columns: ${props.isDesktop ? "210px 210px 210px 210px;" : "none;"}
            column-gap: 19px;
            row-gap: 40px;
            margin-bottom: 20px;
          }
          .error-news li a {
            display: block;
          } 
          .error-news li a .image-wrap {
            position: relative;
          }
          .error-news li a .content-box {
            margin-top: 7px;
          }
          .error-news li a .content-box .discription {
            font-size: 16px;
            font-family: 'Karma',serif !important;
            line-height: 1.5;
            color: #292929;
            margin-bottom: 0;
            font-weight: 300;
            white-space: break-spaces;
            word-break: break-all;
          }
          .hd_heading {
            font-size: 20px;
            font-weight: bold;
            margin: 6px 0;
            display: block;
            width: 100%;
            background: #fff;
            font-family: Khand;
            line-height: 18px;
            margin-top: 50px;
            margin-bottom: 10px;
            text-decoration: underline;
          }
          .hd_heading h1 {
            font-weight: bold;
            font-size: 20px;
            display: inline-block;
            text-decoration: underline;
          }

          .error-news li.lead-story {
            padding-bottom: 0;
            margin-bottom: 0;
            border-bottom: 0;
          }
          .error-news li.lead-story a {
            flex-direction: column;
          }
          .error-news li.lead-story a .content-box {
            background: #001e44;
            padding: 20px 10px 15px 10px;
            position: relative;
          }
          .error-news li.lead-story a .content-box .discription {
            color: #fff;
            font-size: 18px;
            line-height: 24px;
          }
          .error-news li.lead-story .content-box:before {
            content: "";
            position: absolute;
            width: 40px;
            background: #e1261c;
            height: 6px;
            top: 10px;
            left: 0;
          }
          .error-news li.lead-story a .image-wrap {
            height: 100%;
            margin-left: 0;
          }
          .error-news li.lead-story a .image-wrap img {
            width: 100%;
        }
        .error-news li a .image-wrap img {
          width: 100%;
      }
  
        `}
      </style>
    </>
  );
}
