import React from "react";
import { get_static_img } from "includes/helper";
import AMPHELPER from "includes/Amp/ampHelper";

const LiveBlog = (props) => {
  const createMarkup = (blogLists) => {
    const html = "";
    const titleSEO = ``;
    let titleSEOName = ``;
    let titleListSEO = ``;
    let liveBlogCounter = 1;
    titleListSEO +=
      blogLists.posts &&
      blogLists.posts
        .filter(({ post }) => post.title != "</p>" && post.title != "")
        .map((feedDetails3SEO, key) => {
          let liveBlogListData = "";
          let titleSEOImage = "";
          let fistPostClass = "";
          let liveBlogTitle = "";
          const timeOfPost = feedDetails3SEO.time;
          let time = "";
          if (typeof timeOfPost !== "undefined") {
            time = AMPHELPER.blogNiceDate(timeOfPost);
          }

          titleSEOName += feedDetails3SEO.post.title;
          titleSEOImage = feedDetails3SEO.post.image_path;

          if (liveBlogCounter == 1) {
            fistPostClass = "ptime";
          } else {
            fistPostClass = "ptime";
          }

          liveBlogTitle = feedDetails3SEO.post.title;
          if (liveBlogTitle) {
            if (liveBlogTitle.indexOf("##") !== -1) {
              const hedline_TitleArray = liveBlogTitle.split(/##/);
              liveBlogTitle = hedline_TitleArray[0];
              liveBlogListData = hedline_TitleArray[1];
            }
            if (liveBlogTitle.indexOf("</p>") < 0) {
              liveBlogTitle = liveBlogTitle.replace("<p>", "");
              liveBlogTitle = "<p>" + liveBlogTitle + "</p>";
            }
            liveBlogTitle = liveBlogTitle.replace("-webkit-text-stroke-width: 0px;", "");
            liveBlogTitle = liveBlogTitle.replace("#(<.*?)(style=(\"|')(.*?)(\"|'))(.*?>)#", "\\1\\6");
            liveBlogTitle = liveBlogTitle.replace(
              "/<fonts(.+?)>(.+?)</font>/is",
              '<amp-font layout="nodisplay" font-family="">$2</amp-font>',
            );
            liveBlogTitle = liveBlogTitle.replace(/<img(.*?)\/?>/g, '<amp-img $1  layout="responsive"  width=380 height=285></amp-img>');
            liveBlogTitle.includes("<font") && (liveBlogTitle = liveBlogTitle
              .replace(/<font (.*?)>/gi, ``)
              .replace(/<\/font>/, '')
              .replace(/<span (.*?)>/gi, ``)
              .replace(/<\/span>/, ''));
          }
          if (liveBlogTitle) {
            if (liveBlogTitle.indexOf("<p>") == -1) {
              liveBlogTitle = liveBlogTitle.replace(/<\/p>/gi, "");
              liveBlogTitle = "<p>" + liveBlogTitle + "</p>";
            }
            liveBlogTitle = liveBlogTitle.replace("-webkit-text-stroke-width: 0px;", "");
          }
          let li = `<li class="highlive" id="${timeOfPost}" data-sort-time="${timeOfPost}" >`;
          liveBlogTitle.indexOf("<p>") !== 0 && (liveBlogTitle = "<p>" + liveBlogTitle + "</p>");
          li += `<div class="blog_date_share"><span class="${fistPostClass}" > ${timeOfPost} </span></div> ${liveBlogTitle}`;

          if (titleSEOImage != "") {
            titleSEOImage = get_static_img(titleSEOImage, 380, 253);
            li += `<amp-img src="${titleSEOImage}" width="${380}" height="${285}" layout="responsive" ></amp-img>`;
          }
          if (feedDetails3SEO.type == "twitter" && feedDetails3SEO.post.data_type == "embedded") {
            const _ampTitle = AMPHELPER.getAMPCodes(feedDetails3SEO.post.source);
            li += `<div class="MT3 CTR youtubediv">${_ampTitle}</div>`;
          }
          li += `</li>`;

          li = AMPHELPER.getIFrameCode(li);
          liveBlogCounter++;
          return li;
        })
        .join("");
    return titleListSEO || "";
  };
  return (
    <>
      <div className="live_blog_list">
        <div className="liveblog-data-sldr amp-hidden"></div>
        <amp-live-list layout="container" id="amp-live-list-insert-blog" data-poll-interval="15000" data-max-items-per-page="30">
          <button update="true" id="live-list-update-button" on="tap:amp-live-list-insert-blog.update" className="ampstart-btn caps">
            See New Updates
          </button>
          <ul className="live_blog_list_box" items="true" dangerouslySetInnerHTML={{ __html: createMarkup(props.articleData) }}></ul>
        </amp-live-list>
      </div>
      <style jsx global>{`
      .amp-live-list-item p {
          font-size: 16px;
          word-break: break-word;
          padding: 0 16px 15px;
        }
        .amp-live-list-item p {
          font-size: 16px;
          word-break: break-word;
          padding: 0 16px 15px;
        }
        .amp-live-list-item {
          box-shadow: 0 0 6px #ccc;
          background: #fff;
          margin-bottom: 16px;
          padding-top: 10px;
        }
        .brdcrm ul{display: flex;overflow: scroll;line-height: 19px;white-space: nowrap;}
      `}</style>
    </>
  );
};

export default LiveBlog;
