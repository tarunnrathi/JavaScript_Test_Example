import LazyImage from "components/Common/LazyImage";
import React from "react";

const BlogSection = ({ iplBlogData }) => {
  return (
    <>
      <div className="chronicles_section">
        <div className="ipl_podcast_top">
          <h3 className="ipl_headin_g">
            IPL<span> ब्लॉग</span>
          </h3>
        </div>
        <div className="chronicles_row">
          <div className="chronicles_row_right" style={{ overflowX: "scroll" }}>
            <ul>
              {iplBlogData.map((blogData, index) => (
                <li key={index}>
                  <a href={blogData.author_url}>
                    <div className="chronicles_img">
                      <LazyImage
                        className=""
                        loading="lazy"
                        src={blogData.author_image_url}
                        data-src={blogData.author_image_url}
                        alt={blogData.author_title}
                        title={blogData.author_title}
                        width={195}
                        height={195}
                      />
                    </div>
                    <h3 className="chronicles_hdng">{blogData.author_name}</h3>
                    <strong className="chronicles_sub_hdng">
                      {blogData.author_title}
                    </strong>
                    <h3 className="chronicles_title">
                      {blogData.aurthor_description}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cn-morebtn2">
          <a href="/blogs/">और ब्लॉग पढ़ें</a>
        </div>
      </div>
      <style jsx global>{`
        .chronicles_section .cn-morebtn2 a {
          color: #ff0000;
          background: #fff;
          padding: 4px 6px;
          display: table;
          text-decoration: none;
          outline: 0;
        }
        .chronicles_section .cn-morebtn2 {
          background: #f5f5f5;
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }
        .chronicles_img:hover {
          border: 10px solid #fff;
          box-shadow: 0px 3px 6px #00000029;
        }
        body .ipl_headin_g span {
          padding-left: 6px;
        }
        .ipl_headin_g span,
        .ipl_headin_g a span {
          color: #202020;
        }
        .chronicles_row_right {
          width: 100%;
          margin-left: 0px;
        }
        body .chronicles_row_right ul {
          justify-content: initial;
        }
        .chronicles_row_right ul {
          display: flex;
          justify-content: space-between;
        }
        .chronicles_row_right ul li {
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
          width: 18%;
          text-align: center;
        }
        h3.chronicles_hdng {
          font-size: 20px;
          line-height: 24px;
          color: #08151f;
        }
        .chronicles_title {
          width: 100%;
          text-align: left;
          margin-left: 0px;
          font-size: 13px;
          font-weight: normal;
          line-height: 20px;
          margin: 0;
          color: #292929;
          max-height: 55px;
          overflow: hidden;
        }
        strong.chronicles_sub_hdng {
          font-size: 15px;
          line-height: 24px;
          color: #e1261d;
        }
        .chronicles_img img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .chronicles_img {
          width: 150px;
          border: 10px solid #f5f5f5;
          border-radius: 100%;
          height: 150px;
          overflow: hidden;
          text-align: center;
          margin: 0px auto 15px;
        }
        body .chronicles_row_right ul li {
          margin-right: 20px;
        }
        li {
          list-style: none;
        }
        .chronicles_row_right ul li a {
          display: block;
        }
      `}</style>
    </>
  );
};

export default BlogSection;
