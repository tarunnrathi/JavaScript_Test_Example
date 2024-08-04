import React from "react";
import articleHelper from "includes/article.helper";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import LiveBlogCricket from "widgets/Desktop/LiveBlogCricket";
import { imageLoader } from "includes/article.util";

function LiveBlog(props) {
  const { currentUrl, articleData, category } = props.topPriorityData;

  return (
    <>
      {/* main contaisner start here */}
      <div className="live_blog_page">
        <div className="live_blog_header">
          <div className="container">
            <div className="live_blog_left">
              <div className="lvnwtxt">
                <img
                  src="https://images.news18.com/ibnkhabar/uploads/assests/img/yellow-blut2.gif"
                  alt="live"
                />
                LIVE NOW
              </div>
              <h1 className="liveblog_heading">{articleData.headline}</h1>
              <h2 className="live_sub_hding"> {articleData.intro} </h2>
              <span className="date_time">
                {articleHelper.bylineAgency(articleData)} |{" "}
                {articleHelper.dateToNiceString(
                  props.topPriorityData.currentBlogDate
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="live_share_row">
          <div className="container">
            <div className="live_share_center">
              <div className="live_share">
                <a
                  href={
                    "https://www.facebook.com/sharer.php?u=" +
                    currentUrl +
                    "&amp;t=" +
                    articleHelper.htmlspecialchars(articleData.headline)
                  }
                  target="_blank"
                >
                  <img
                    src="https://images.news18.com/ibnkhabar/uploads/assests/img/ficon.png"
                    alt="facebook"
                    title="facebook"
                  />
                </a>
                <a
                  href={
                    "https://www.twitter.com/share?text=" +
                    articleHelper.htmlspecialchars(articleData.headline) +
                    "&amp;url=" +
                    currentUrl
                  }
                  target="_blank"
                >
                  <img
                    src="https://images.news18.com/ibnkhabar/uploads/assests/img/ticon.png"
                    alt="Twitter"
                    title="Twitter"
                  />
                </a>
              </div>
              <div className="auto_refesh">
                <span>
                  LAST UPDATED{" "}
                  {new Date(
                    props.topPriorityData.currentBlogDate * 1000
                  ).toDateString()}
                </span>
                {matchStatus && (
                  <div className="auto_refesh_on">
                    <p>AUTO-REFRESH</p>
                    <div className="onoffswitch">
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="myonoffswitch"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                      <label
                        className="onoffswitch-label"
                        htmlFor="myonoffswitch"
                      >
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container clearfix">
          <div
            className="news_page_left"
            itemType="http://schema.org/LiveBlogPosting"
            itemScope="itemScope"
            id={articleData.weburl}
          >
            {articleData.match_id ? (
              <LiveBlogCricket
                match_id={articleData.match_id}
                updateMatchStatus={updateMatchStatus}
                checked={checked}
              />
            ) : (
              ""
            )}
            <meta
              itemProp="coverageStartTime"
              content={
                articleHelper.blogNiceDate(
                  props.topPriorityData.currentBlogDate,
                  true,
                  true
                ) + "+05:30"
              }
            />
            <meta
              itemProp="coverageEndTime"
              content={
                articleHelper.blogNiceDate(
                  props.topPriorityData.currentBlogDate,
                  true,
                  true,
                  20
                ) + "+05:30"
              }
            />
            <meta
              itemProp="datePublished"
              content={
                articleHelper.blogNiceDate(
                  props.topPriorityData.currentBlogDate,
                  true,
                  true
                ) + "+05:30"
              }
            />
            <meta
              itemProp="dateModified"
              content={
                articleHelper.blogNiceDate(
                  props.topPriorityData.currentBlogDate,
                  true,
                  true
                ) + "+05:30"
              }
            />
            <meta itemProp="about" content="event" />
            <meta itemProp="url" content={articleData.weburl} />
            <meta
              itemProp="description"
              content={articleHelper.htmlspecialchars(articleData.intro)}
            />
            <meta
              itemProp="headline"
              content={articleData.headline || articleData.title}
            />

            <div className="event-hline">
              <img
                src={imageLoader(articleData.images.url, 250, 166, false, false)}
              />
              <h2>हाइलाइट्स</h2>
              <ul
                className="liveblog_link"
                dangerouslySetInnerHTML={{ __html: allLiveBlog.hightlight }}
              ></ul>
            </div>
            <div
              className="live_blog_section"
              key="stc"
              dangerouslySetInnerHTML={{ __html: allLiveBlog.stickyList }}
            ></div>

            {Object.keys(props.topPriorityData.liveBlog) > 0 && (
              <>
                {nextBlogData.length > 0 ? (
                  <div
                    className="live_blog_section"
                    key={firstBlogTime}
                    dangerouslySetInnerHTML={{
                      __html: articleHelper.get_blog_list(
                        nextBlogData,
                        articleData
                      ),
                    }}
                  ></div>
                ) : (
                  ""
                )}

                <div
                  className="live_blog_section"
                  key="gh"
                  dangerouslySetInnerHTML={{ __html: allLiveBlog.blogList }}
                ></div>

                {blogData.length > 0 && (
                  <div
                    className="live_blog_section"
                    key={lastBlogTime}
                    dangerouslySetInnerHTML={{
                      __html: articleHelper.get_blog_list(
                        blogData,
                        articleData
                      ),
                    }}
                  ></div>
                )}

                {hasLoadMore && (
                  <button
                    onClick={() => ajxBlog("pre")}
                    className="load_more clearfix"
                  >
                    Load More
                  </button>
                )}
              </>
            )}

            <div
              className="lbcontent clearfix"
              dangerouslySetInnerHTML={articleHelper.storyPara(articleData)}
            ></div>
            <div className="clearfix"></div>
          </div>

          <RhsCommon
            pageAds={props.pageAds}
            rhsPhoto={props.topPriorityData.rhsPhotoGallery}
            rhsTopStory={props.topPriorityData.rhsTopStory}
            currentURL={articleData.weburl}
          />
        </div>
      </div>
      <div className="clearfix"></div>
      <style jsx global>{`
        
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
          display: block;
        }
        body {
          line-height: 1;
          font-family: 'Noto Sans',arial,sans-serif;
        }
        ol, ul {
          list-style: none;
        }
        // blockquote, q {
        //   quotes: none;
        // }
        // blockquote:before, blockquote:after,
        // q:before, q:after {
        //   content: '';
        //   content: none;
        // }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
            .news_page_left {     width: 920px;     float: left;     padding-right: 20px;}  .news_page_right {     width: 300px;     float: right;     position: relative; } .container {     max-width: 1244px;     margin: auto;     padding: 0 20px; }          .live_blog_page {     background: #f2f2f2;     float: left;     width: 100%; }
        
        
        
            .onoffswitch {     position: relative; width: 90px;     -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none; } .onoffswitch-checkbox {     position: absolute;     opacity: 0;     pointer-events: none; } .onoffswitch-label {     display: block; overflow: hidden; cursor: pointer;     border: 2px solid #999999; border-radius: 20px; } .onoffswitch-inner {     display: block; width: 200%; margin-left: -100%;     transition: margin 0.3s ease-in 0s; } .onoffswitch-inner:before, .onoffswitch-inner:after {     display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;     font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;     box-sizing: border-box; } .onoffswitch-inner:before {     content: "ON";     padding-left: 10px;     background-color: #34A7C1; color: #FFFFFF; } .onoffswitch-inner:after {     content: "OFF";     padding-right: 10px;     background-color: #EEEEEE; color: #999999;     text-align: right; } .onoffswitch-switch {     display: block; width: 18px; margin: 6px;     background: #FFFFFF;     position: absolute; top: 0; bottom: 0;     right: 56px;     border: 2px solid #999999; border-radius: 20px;     transition: all 0.3s ease-in 0s; }.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {     margin-left: 0; } .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {     right: 0px; }
            
            
            .date_time {
              display: flex;
              align-items: center;
          }
          
        .ph_heading {
          color: #101010;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
          .date_time a {
              color: #888;
          }
          
          .date_time li {
              padding-right: 3px;
          }
        
          .date_time {
            display: flex;
            align-items: center;
        }
        
        .lbcontent {
            margin-top: 30px;
            width: 637px;
            float: right;
            margin-bottom: 30px;
        }
            
            .live_blog_header {     background: #313131;     color: #fff;     clear: both;     padding: 20px 0; }  .live_blog_left {     width: 74%;     box-sizing: border-box;     position: relative; }  .liveblog_heading {     font-size: 36px;     font-weight: 700;     line-height: 46px;     text-shadow: 1px 1px 1px #000;     padding-bottom: 6px;     color: #fff;     margin: 5px 0; }  .live_sub_hding {     font-size: 18px;     color: #fff;     padding-bottom: 14px; }  .date_time {     font-size: 12px;     color: #888;  }  .lvnwtxt {     font-size: 16px;     font-weight: 700;     color: #fff; }  .lvnwtxt img {     margin-right: 10px; }  .live_share_row {    background: #1e1e1e;     padding: 10px 0;     margin-bottom: 20px;}    .live_share_center {      display: flex;     align-items: center;     justify-content: space-between;     max-width: 884px; }  .auto_refesh {     display: flex;     align-items: center; }  .auto_refesh_on {     display: flex;     align-items: center;     float: left;     border-left: 1px solid #414141;     color: #fff;     font-size: 13px;     padding-left: 15px;:; }  .auto_refesh > span {     border: none;     font-size: 14px;     color: #9b9b9b;     margin-right: 15px; }  .live_share {     display: flex;     align-items: center; }  .live_share a {     margin-right: 10px;     display: block; }  .auto_refesh_on p {     padding-right: 10px; }
            
            
            
            
            
            .event-hline {         width: 26.99115044247788%;     box-sizing: border-box;     background: #fff;     float: left;     margin-right: 10px; }  .event-hline img {     width: 100%;     display: block; }  .event-hline h2 {       font-size: 26px;
              color: #ee1b24;
              text-transform: uppercase;
              font-weight: 700;
              padding: 10px 18px;
              padding-bottom: 0;}  ul.liveblog_link li a {     color: #494949;     text-decoration: none; }  ul.liveblog_link li {     font-size: 16px;      margin: 0 15px;   padding: 12px 0;     line-height: 22px;     color: #494949;     border-bottom: 1px solid #cbcbcb; }  ul.liveblog_link li a:hover {     color: #ee1b24; }
            
            
            
            .live_blog_section { 	    width: 71%;     float: right;}  .live_blog_row {       display: flex;     align-items: end;     border-top: 2px solid #e3e3e3;     margin-top: 20px;     background: #fff;     padding: 10px; }  .live_content {     width: calc(100% - 0px);     padding-left:0px;     font-size: 20px;     line-height: 1.85; }  .live_content a > img {     display: block;     width: 100%;     padding-top: 10px; }  .live_date {     width: 100px;     font-weight: 700;     font-size: 16px;     color: #ee1b24;     display: block;     line-height: 1.45; }  .live_content a {     text-decoration: none;     color: #282828; }  .blog_share {     display: flex;     align-items: center;     padding-top: 10px; }  .blog_share a {     display: block;     margin-right: 10px; } .live_blog_section .live_blog_row:first-child {     border: 0;     margin: 0; }  .load_more {     text-align: center;     width: 100px;     background: #bababa none repeat scroll 0% 0%;     border-radius: 8px;     padding: 10px 20px;     color: white;     margin-left: 40%;     margin-top: 20px;     clear: both;     display: block;     text-decoration: none; }  .live_content a:hover {     color: #ee1b24; }  .load_more:hover {     background: #ee1b24; }
             .lbcontent {     background: #fff;     padding: 20px;     border-top: 2px solid #e3e3e3;     margin-top: 20px;     font-size: 16px;     line-height: 1.9; }
        
            .clearfix {
                clear: both;
            }
            .clearfix:after, .clearfix:before {
              content: "";
              display: block;
              clear: both;
              visibility: hidden;
              line-height: 0;
              height: 0;
            }
        
            .date_time a {
              color: #888;
          }
          
          .date_time li {
              padding-right: 3px;
          }
          
          .load_more {
              border: 0;
              width: 200px;
              margin: auto;
              margin-top: 20px;
              overflow: hidden;
              position: relative;
              float: right;
              margin-right: 220px;
              cursor: pointer;
          }
          
          .live_blog_section {
              padding-bottom: 10px;
          }
          
          .lvblg-scrtab li.act span {
            font-weight: bold;
            background: #d02e35;
            color: #fff;
            overflow: visible;
          }
  
          .lvblg-scrtab li.act span::before {
            content: "";
            border-bottom: 10px solid #d02e35;
            border-right: 10px solid transparent;
            position: absolute;
            bottom: -4px;
            left: 50%;
            margin-left: -4px;
            transform: rotate(-45deg);
          }
          .lblbox {
            width: 15% !important;
            height: 80px;
            font-size: 12px;
            color: #7b7b7b;
            float: left;
            padding-top: 6px;
          }
  
          .live_content {
            width: 80.125% !important;
            float: left;
            position: relative;
            font-size: 20px;
            line-height: 1.65;
          }
  
          .live_date  {
            font-size: 14px;
          }
  
          .articleBody .live_content p {
            color: #404040;
          }
          strong {
            font-weight: bold;
          }
          .event-hline ul li {
            font-size: 16px;
            padding: 12px 0;
            line-height: 22px;
            margin: 0 20px;
            color: #494949;
            border-bottom: 1px solid #cbcbcb;
          }
          .event-hline h2 {
            font-size: 26px;
            color: #ee1b24;
            text-transform: uppercase;
            font-weight: 700;
            margin: 5px 20px 0;
            padding: 6px 0;
          }
          .live_blog_row {
          background: #fff;
          padding: 20px;
          border-top: 2px solid #e3e3e3;
          margin-top: 20px;
          }
          .live_blog_row div {
            width: 100%
          }
          .event-hline {
            padding: 0 0 20px;
          }
      `}</style>
    </>
  );
}
