import { setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const AuthorBlogs = ({
  pageContent,
  authorInfo,
  shareTopicUrls,
}) => {
  const {
    red,
    darkRed,
    lightGrey1,
    ash,
    darkSkyBlue,
    lightSkyBlue,
    fadedBlack,
  } = BlogsCssGlobalVariables.colors;

  return (
    <>
      <div className="authorBlogs__authorInfo">
        <div className="authorBlogs__authorInfo--left">
          <a>
            <figure>
              <LazyLoadImage
                src={get_static_img(
                  authorInfo?.avtar,
                  130,
                  130,
                )}
                onError={setDefaultImage}
                alt={authorInfo?.hindi_name}
                title={authorInfo?.hindi_name}
                width={130}
                height={130}
              />
            </figure>
          </a>
          <div className="blogAuthorDetails__left--share">
            {authorInfo?.facebook && (
              <a href={authorInfo?.facebook} target="_blank">
                <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                  alt={`${authorInfo?.hindi_name} Facebook`}
                  title={`${authorInfo?.hindi_name} Facebook`}
                />
              </a>
            )}
            {authorInfo?.twitter && (
              <a href={'https://twitter.com/'+authorInfo?.twitter} target="_blank">
                <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-twitter.png"
                  alt={`${authorInfo?.hindi_name} Twitter`}
                  title={`${authorInfo?.hindi_name} Twitter`}
                />
              </a>
            )}
          </div>
        </div>
        <div className="authorBlogs__authorInfo--right">
          <div className="authorBlogs__authorInfo--rightTop">
            <h3>
              <span>{authorInfo?.hindi_name}</span>
              <p className="com_des">{authorInfo?.designation}</p>
            </h3>
            <div className="authorBlogs__authorInfo--rightShare">
              <span>शेयर करें: </span>
              <a href={shareTopicUrls.facebook} target="_blank">
                <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                  alt="Share this page on Facebook"
                  title="Share this page on Facebook"
                />
              </a>
              <a href={shareTopicUrls.twitter} target="_blank">
                <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-twitter.png"
                  alt="Share this page on Twitter"
                  title="Share this page on Twitter"
                />
              </a>
              <a href={shareTopicUrls.linkedIn} target="_blank">
                <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-linkedin.png"
                  alt="Share this page on LinkedIn"
                  title="Share this page on LinkedIn"
                />
              </a>
            </div>
          </div>
          <p className="authorBlogs__authorInfo--intro">
            {authorInfo.author_bio}
          </p>
        </div>
      </div>
      <h2 className="authorBlogs__list--heading">ब्लॉग</h2>
      <ul className="authorBlogs__list">
        {pageContent &&
          pageContent.map((blog, index) => {
            const blogThumbnail = blog?.images?.url;
            const blogDetailsUrl = BlogsUtil.formTopicUrlParam(blog?.weburl_r);
            return (
              <li key={index}>
                <a href={blogDetailsUrl}>
                  <figure>
                    <LazyLoadImage
                      src={blogThumbnail}
                      onError={setDefaultImage}
                      alt={blog?.display_headline}
                      title={blog?.display_headline}
                      width={225}
                      height={150}
                    />
                  </figure>
                  {blog?.display_headline}
                </a>
              </li>
            );
          })}
      </ul>
      <style jsx>
        {`
          h1,
          h2,
          h3,
          h4,
          p,
          span {
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorBlogs__authorInfo {
            display: flex;
            border-bottom: 1px solid #d4d4d4;
            padding-bottom: 20px;
            margin-bottom: 15px;
          }
          .authorBlogs__authorInfo--left {
            padding-right: 30px;
            margin-right: 30px;
            border-right: 1px solid #ebebeb;
            padding-bottom: 10px;
          }
          .authorBlogs__authorInfo--left figure {
            width: 130px;
            height: 130px;
            overflow: hidden;
            border-radius: 100%;
            margin-bottom: 15px;
          }
          .authorBlogs__authorInfo--left figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .blogAuthorDetails__left--share {
            display: flex;
            justify-content: center;
          }
          .blogAuthorDetails__left--share a:nth-child(1) {
            background: ${lightSkyBlue};
          }
          .blogAuthorDetails__left--share a:nth-child(2) {
            background: ${darkSkyBlue};
          }
          .blogAuthorDetails__left--share a {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 8px;
            border-radius: 5px;
          }

          .blogAuthorDetails__left--share a img {
            filter: brightness(0) invert(1);
          }

          .authorBlogs__authorInfo--right {
            width: 100%;
          }
          .authorBlogs__authorInfo--rightTop {
            display: flex;
            justify-content: space-between;
          }
          .authorBlogs__authorInfo--rightTop h3 {
            color: ${ash};
            font-size: 13px;
            font-weight: 400;
          }
          .authorBlogs__authorInfo--rightTop h3 span {
            color: ${red};
            font-size: 22px;
            font-weight: 700;
          }

          .authorBlogs__authorInfo--rightShare {
            display: flex;
            align-items: center;
            font-size: 18px;
            color: ${ash};
          }
          .authorBlogs__authorInfo--rightShare a {
            margin-left: 18px;
          }

          .authorBlogs__authorInfo--intro {
            color: ${fadedBlack};
            line-height: 28px;
            margin: 15px 0;
            font-size: 18px;
            text-align: justify;
          }

          // author blogs list
          .authorBlogs__list--heading {
            color: ${darkRed};
            font-size: 22px;
            margin-bottom: 15px;
          }

          .authorBlogs__list {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
          }
          .authorBlogs__list li {
            width: calc(25% - 20px);
            margin: 0 10px;
            margin-bottom: 20px;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }

          .authorBlogs__list li a {
            color: ${lightGrey1};
            font-size: 14px;
            line-height: 20px;
            transition: all 0.2s ease-in-out;
          }
          .authorBlogs__list li a:hover {
            color: ${darkRed};
          }

          .authorBlogs__list li a figure {
            line-height: 0;
            overflow: hidden;
            margin-bottom: 12px;
            width: 100%;
            border-radius: 5px;
            min-height: 135px;
          }

          .authorBlogs__list li a figure img {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default AuthorBlogs;
