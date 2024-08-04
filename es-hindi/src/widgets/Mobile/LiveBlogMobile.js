import React, { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import parser from "html-react-parser";
import { getArticleSocials, livePostSourceParser, Wrapper } from "includes/article.util";
import fetchUtility from "includes/sFetchUtility";
import LazyLoad from "react-lazyload";
import Head from "next/head";
import ArticleBody from "components/Common/ArticleBody";

const { publicRuntimeConfig } = getConfig();

const LiveBlogMobile = (props) => {
  const { articleData = {}, liveBlog, isLiveNow } = props.allData;
  const { fbshare, twshare, whtsup } = getArticleSocials(articleData);
  const {
    images: { url: thumbnail, caption } = {},
    headline,
    intro = '',
    story_id: storyId,
    tags = [],
    body,
    parsedBody,
  } = articleData;
  const count = 10;
  const [blogData, setBlogData] = useState({ ...liveBlog });
  const [hasLoadMore, setHasLoadMore] = useState(
    blogData.sticky && blogData.posts ? !(blogData.sticky.length + blogData.posts.length < count) : false,
  );

  const loadPosts = async (d) => {
    const { tag } = blogData;

    if (d == "pre") {
      const stamp = blogData.prev;
      const data = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}/live?d=${d}&time=${stamp}&tag=${tag}`, {});
      if (Object.keys(data).length) {
        setBlogData((prevData) => {
          const sticked = prevData?.sticky.map((item) => item.stamp) || [];
          const sticky = data.sticky.filter((item) => !sticked.includes(item.stamp));
          return {
            ...prevData,
            highlights: [...prevData.highlights, ...data.highlights],
            posts: [...prevData.posts, ...data.posts],
            sticky: [...prevData.sticky, ...sticky],
            prev: data.prev,
          };
        });

        if (data.sticky.length + data.posts.length < count) {
          setHasLoadMore(false);
        }
      }
    } else if (d == "next") {
      const data = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}/live?d=${d}&time=${blogData.next}&tag=${tag}`, {});

      if (data.next == blogData.next) {
        return;
      }

      if (Object.keys(data).length) {
        setBlogData((prevData) => {
          const sticked = prevData?.sticky.map((item) => item.stamp) || [];
          const sticky = data.sticky.filter((item) => !sticked.includes(item.stamp));

          const stickedh = prevData?.highlights.map((item) => item.stamp) || [];
          const stickyh = data.highlights.filter((item) => !stickedh.includes(item.stamp));

          const stickedp = prevData?.posts.map((item) => item.stamp) || [];
          const stickyp = data.posts.filter((item) => !stickedp.includes(item.stamp));

          return {
          ...prevData,
          highlights: [...stickyh, ...prevData.highlights],
          posts: [...stickyp, ...prevData.posts],
          sticky: [...sticky, ...prevData.sticky],
          next: data.next != "" ? data.next : prevData.next,
        };});
      }
    }
  };

  // Auto loadposts
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = () => loadPosts("next");
    const frame = document.querySelector("#iframe-introfirst");
    if(frame && !frame.getAttribute("src")) {
      frame.setAttribute("src", frame.getAttribute("data-src"));
    }
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id;

    if (isLiveNow && !id) {
      id = setInterval(tick, 5000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [isLiveNow]);

  // cards markup
  const card = (item) => {
    const { time, stamp, post } = item;
    return (
      <li
        key={`blog-${stamp}`}
        className="live_blog_row clearfix"
        rel={stamp}
      >
        <div itemProp="articleBody">
          <div className="blog_date_share">
            <span className="blog-time">{time}</span>
            <div className="share_icon">
              <a title="Link" href={fbshare} target="_blank">
                <span className="icon_facebook"></span>
              </a>
              <a title="Link" href={twshare} target="_blank">
                <span className="icon_twitter"></span>
              </a>
              <a title="Link" href={whtsup} target="_blank">
                <span className="icon_whatsapp"></span>
              </a>
            </div>
          </div>
          <Wrapper
            wrap={post.url}
            wrapper={(child) => (
              <a href={post.url} target="_blank">
                {child}
              </a>
            )}
          >
            {parser(post.title)}
            {post.image_path && (
              <>
                <br />
                <img
                  loading="lazy"
                  width={187}
                  height={"auto"}
                  isRes={true}
                  src={post.image_path.replace("http://lbimg.in.com/", "https://lbimg.in.com/")}
                  dontAlter={true}
                ></img>
              </>
            )}
          </Wrapper>
          {post.source && <LazyLoad once>{livePostSourceParser(post.source, stamp)}</LazyLoad>}
        </div>
      </li>
    );
  };

  return (
    <React.Fragment>
      <Head>

      </Head>
      <div className="live_update">
        <p className="live_update_hd">हाइलाइट्स</p>
        <ul className="live_update_list">
          {blogData.highlights?.length ? (
            blogData.highlights.map(({ stamp, time, title }, idx) => (
              <li key={stamp} className={`${idx === 0 && "highlive"}`}>
                <a className="hrefhighlight" data-cnt={idx} rel={stamp} href={`#${stamp}`}>
                  <span>{time}</span>
                  {title && parser(title)}
                </a>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="live_blog_list" id={articleData.weburl}>
        {/* Sticky List Start */}
        <ul className="live_blog_list_box">{blogData.sticky?.length ? blogData.sticky.map(card) : <></>}</ul>
        {/* Sticky List End */}
        {/* Main Blog List Start */}
        <ul className="live_blog_list_box">{blogData.posts?.length ? blogData.posts.filter(({ post }) => post.title != "</p>" && post.title != "").map(card) : <></>}</ul>
        {/* Main Blog List End */}
        {hasLoadMore && (
          <button onClick={() => loadPosts("pre")} className="load_more clearfix">
            Load More
          </button>
        )}
        <div id="gotobody" className="vpacer20 hideCont clearfix paragraph">
        <ArticleBody
              body={body}
              id={storyId}
              pageAds={{}}
              isDesktop={false}
              parsed={parsedBody}
              headline={headline}
              image={thumbnail}
              caption={caption ? caption : ""}
              tags={tags}
              isAjax={false}
            />
        </div>
      </div>

      <style jsx global>{`
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        
        ol,
        ul {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: "";
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        ul.live_update_list {
          display: flex;
          overflow-y: auto;
        }
        ul.live_update_list li {
          border: 1px solid silver;
          position: relative;
          font-size: 14px;
          color: #000;
          line-height: 27px;
          box-sizing: border-box;
          flex-basis: 275px;
          padding: 16px;
          opacity: 0.4;
          background: #e8e8e8;
          display: flex;
          flex-wrap: wrap;
          flex-shrink: 0;
          margin-right: 16px;
          padding-bottom: 0;
        }
        .live_update {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
        }
        * {
          box-sizing: border-box;
        }
        .live_update_hd {
          font-size: 17px;
          padding-bottom: 15px;
        }
        ul.live_update_list li.highlive {
          background: #fff;
          opacity: 1;
        }
        li.highlive span {
          color: #ff0101;
          font-weight: 700;
        }

        .live_blog_list_box {
          padding: 0px 15px;
          margin: 0 -15px;
        }
        ul.live_blog_list_box li {
          background: #fff;
          box-shadow: 0 0 6px #ccc;
          margin-bottom: 20px;
          float: left;
        }
        ul.live_blog_list_box > li a > img {
          width: 100%;
          display: block;
          padding-bottom: 10px;
        }
        .live_blog_list {
          width: 100%;
          padding: 20px;
        }
        .blog_date_share {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e3e3e3;
          margin-bottom: 16px;
          padding: 10px 10px;
        }
        .blog_date_share .share-icon img {
          width: auto;
          padding: 0;
        }
        .blog_date_share .share-icon {
          margin: 0;
          padding: 0;
          border: 0;
        }
        ul.live_blog_list_box p {
          color: #212121;
          font-size: 17px;
          padding: 15px;
          padding-top: 0;
        }
        ul.live_blog_list_box a {
          text-decoration: none;
          line-height: 28px;
          color: #212121;
          display: block;
        }

        a.load_more {
          background: #000;
          padding-bottom: 5px;
          text-align: center;
          display: block;
          padding: 14px 0;
          border-radius: 4px;
          clear: both;
          color: #fff;
          text-decoration: none;
          font-size: 18px;
        }
        .load_more:hover {
          background: #ee1b24;
        }
        .blod_content {
          line-height: 24px;
          color: #212121;
          font-size: 16px;
          padding: 15px;
          padding-top: 0;
        }

        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }

        .share_icon a span.icon_facebook {
          background-position: 0 0;
        }
        .share_icon a span.icon_twitter {
          background-position: -36px 0;
        }
        .share_icon a span.icon_whatsapp {
          background-position: -108px 0;
        }
        .share_icon a span {
          background: #f5f5f5 url(https://images.news18.com/ibnkhabar/uploads/2020/01/article-icons.png) 0 0 no-repeat;
          width: 35px;
          height: 35px;
          display: block;
          border-radius: 100%;
        }
        .share_icon span {
          font-size: 14px;
          color: #555;
        }
        .share_icon {
          padding: 0 10px 0 0;
          display: flex !important;
          align-items: center;
          justify-content: center;
          margin: auto;
        }
        .share_icon a {
          width: 35px;
          height: 35px;
          font-size: 18px;
          margin-right: 0;
          border-radius: 0;
          margin-left: 14px;
        }

        a.blog-a {
          padding: 10px;
        }

        .blog_date_share .share_icon {
          margin: 0;
          padding-right: 0;
        }

        .blog_date_share .share_icon a:last-child {
          padding: 0;
          margin-right: 0;
        }

        ul.live_blog_list_box p {
          line-height: 28px;
        }

        li.live_blog_row {
          color: #212121;
          font-size: 17px;
          padding: 8px;
          line-height: 28px;
          padding-bottom: 0;
        }

        ul.live_update_list li a {
          text-decoration: none;
          color: #000;
        }

        .load_more {
          border: 0;
          width: 200px;
          margin: auto;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          text-align: center;
          background: #bababa none repeat scroll 0% 0%;
          border-radius: 8px;
          padding: 10px 20px;
          color: white;
          width: 100%;
        }

        .article_content {
          clear: both;
        }

        ul.live_blog_list_box li iframe {
          width: 100%;
        }

        ul.live_blog_list_box li {
          width: 100%;
        }

        ul.live_blog_list_box p a {
          color: red;
        }
        .mtch-hgt-in h3 {
          font-size: 14px;
          color: #737373;
          padding: 0;
          font-weight: 400;
          line-height: 30px;
        }

        .mtch-hgt-dtl h2 {
          font-size: 27px;
          color: #111;
          font-weight: bold;
        }

        .fl h2 ~ span {
          font-size: 18px;
          color: #111;
        }

        .fl p,
        .fr p {
          line-height: 28px;
          font-size: 20px;
          word-break: break-word;
          color: #212121;
        }

        .mtch-hgt-dtl {
          line-height: 28px;
          font-size: 18px;
          word-break: break-word;
          text-decoration: none;
        }

        .mtch-hgt-dtl a {
          text-decoration: none;
        }
        .hrefhighlight {
          word-break: break-all;
        }
        .blog-time {
          color: #ff0101;
          font-weight: 600;
        }
        .vpacer20 {
          margin-top: 20px;
        }
        .paragraph {
          color: #212121;
          font-size: 17px;
          line-height: 28px;
        }
        .brdcrm ul {line-height: 19px;white-space: nowrap;}
        .artcl_container .content_sec ul li{
         list-style: none !important;
          margin: 0 !important;
          margin-bottom: 20px !important;
          font-size: 17px !important;
          font-size: 17px;
          line-height: 28px !important;
        }

        body .content_sec p strong{
          font-weight: 600;
        }

        strong{
          font-weight: 600;

        }
      `}</style>
    </React.Fragment>
  );
};

export default LiveBlogMobile;
