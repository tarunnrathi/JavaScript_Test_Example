import React from "react";
import AuthorListComponent from "./AuthorListComponent";
import SearchButton from "./SearchButton";

const AuthorListing = ({ isMobile = false, authorList, tab }) => {
  return (
    <>
      <div className="topicWrapper">
            <div className="author-intro">
                <div className="heading_title">
                    <h2>लेखक<span>सूची</span></h2>
                </div>
                <p>लेखकों और योगदानकर्ताओं की सूची</p>
            </div>
            {isMobile && <SearchButton isMobile={isMobile}  pageType={"byline"}/>}
        </div>
        <AuthorListComponent authorList={authorList} isMobile={isMobile} tab={tab}/>
      <style jsx global>
        {`
        .heading_title {font-weight: 600; padding: 0; position: relative; margin-bottom: 10px; font-size: 22px; color: #E1261D; margin-right: 20px; }
        .heading_title h2 {font-weight: 600; font-size: 22px; background: #f5f5f5; position: relative; z-index: 1; display: inline-block; }
        .heading_title:after {content: ''; position: absolute; width: 100%; height: 3px; background: #FF0000; bottom: 5px; left: 0; }
        .author-intro {width: 100%; margin-bottom: 20px; border-top: 1px #ccc dotted; padding: 5px 10px;}
        .author-intro p {letter-spacing: 0px; color: #424242; font-size: 16px; line-height: 22px; }
        .topicWrapper {
        margin-bottom: 30px;
        background: #f5f5f5;     position: relative;
        }
        @media (max-width:768px){
        .topicWrapper .smsrch_btn{background-color: transparent;right: 21px;width: fit-content; top: 5px;}
         .topicWrapper .smsrch_btn .icnsrch:before{background: #000;}
         .topicWrapper .smsrch_btn .icnsrch{border-color: #000;}
        }
        `}
      </style>
    </>
  );
};

export default React.memo(AuthorListing);
