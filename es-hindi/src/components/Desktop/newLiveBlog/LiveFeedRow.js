import { livePostSourceParser } from "includes/article.util";
import { blogTimeConversionForLiceBlog } from "../../../../helper/global";
// const moment = require("moment-timezone");
const LiveFeedRow = ({
  data: {
    id,
    blog_content = "",
    // time,
    blog_title = "",
    updated_at,
  } = {},
  articleData: { weburl, display_headline } = {},
}) => {
  let css = {
    width: "100%",
  };

  if (
    blog_content?.match(/instagram-media/gi) ||
    blog_content?.match(/twitter-tweet/gi)
  ) {
    css = {
      ...css,
      // height: 600,
    };
  } else if (blog_content?.match(/youtube/gi)) {
    css = {
      ...css,
      margin: "0 auto",
    };
  }
  blog_content = blog_content
    .replace(/.png"/g, '.png?im=Resize,width=600,aspect=fit,type=normal"')
    .replace(/.jpg"/g, '.jpg?im=Resize,width=600,aspect=fit,type=normal"')
    .replace(/.jpeg"/g, '.jpeg?im=Resize,width=380,aspect=fit,type=normal"');

  // const liveTime = (time) => {
  //   return time.replace(
  //     /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
  //     "$1-$2-$3 $4:$5:$6"
  //   );
  // };
  //  //const Date = moment(created_at ? liveTime(String(created_at)) : "")

  //   .tz("Asia/Kolkata")
  //   .format("DD MMM YYYY HH:mm (z)");
  const Date = updated_at ? blogTimeConversionForLiceBlog(updated_at) : "";
  const weburl_id = weburl + "%23" + id;
  return (
    <>
      <div className="live_feed_row" id={id}>
        <span className="live_feed_date">{Date}</span>
        {blog_title ? <h2 className="feed_title">{blog_title}</h2> : null}
        <div className="live_feed_intro" style={css}>
          {livePostSourceParser(blog_content, id, true, true)}
        </div>
        <div className="social_ping">
          <ul className="social_icon">
            <li>
              <a
                className="fb sprite_cls"
                href={`https://www.facebook.com/sharer.php?u=${weburl_id}&t=${
                  blog_title || display_headline
                }`}
                target="_blank"
                rel="nofollow"
              ></a>
            </li>
            <li>
              <a
                className="nhtwicon-lv-post hsocialsprite-post"
                href={`https://twitter.com/share?text=${
                  blog_title || display_headline
                }&url=${weburl_id}`}
                target="_blank"
                rel="nofollow"
              ></a>
            </li>
            <li>
              <a
                className="linkedin sprite_cls"
                href={`https://www.linkedin.com/cws/share?url=${weburl_id}`}
              ></a>
            </li>
            <li>
              <a
                className="whatsup sprite_cls"
                href={`https://web.whatsapp.com/send?text=${
                  blog_title || display_headline
                }-${weburl_id}`}
                target="_blank"
                rel="nofollow"
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .hsocialsprite-post {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)
            no-repeat;
          vertical-align: top;
        }
        .nhtwicon-lv-post {
          background-position: -4px -22px;
          width: 30px;
          height: 20px;
          margin: 5px 0;
        }
      `}</style>
    </>
  );
};

export default LiveFeedRow;
