import { livePostSourceParser, relatedCard } from "includes/article.util";
import ampHelper from "includes/Amp/ampHelper";
import dynamic from "next/dynamic";
import { photoGallerydateConversion } from "../../../../helper/global";
import { logEvent } from "includes/googleAnalytic";

const RelatedNews = dynamic(() => import("widgets/Common/Mobile/RelatedNews"));

// const LoadStories = () => {
//   useEffect(() => {
//     let selec = document?.querySelector(`.related_nws_slidr`);
//     if (selec) {
//       new Glide(`.related_nws_slidr`, {
//         type: "carousel",
//         perView: 2,
//         // autoplay: 5000,
//         focusAt: 'center',
//         gap: 10,
//       })?.mount();
//     }
//   }, [])

//   return <></>
// }

const LiveFeedRow = ({
  data: {
    ago = "",
    id,
    created_at,
    blog_content = "",
    time,
    blog_title = "",
    updated_at
  } = {},
  isAmp = false,
  articleData: {
    relatedArticles,
    weburl,
    display_headline,
    tags,
    story_id,
  } = {},
  index,
}) => {
  if (ago.includes("days")) {
    ago = ago.replace(" days", "d");
  } else if (ago.includes("hours")) {
    ago = ago.replace(" hours", "h");
  } else if (ago.includes("minutes")) {
    ago = ago.replace(" minutes", "min");
  } else if (ago.includes("seconds")) {
    ago = ago.replace(" seconds", "sec");
  }
  let attr = {};
  if (isAmp) {
    attr = {
      id: `live-item-${id}`,
      "data-sort-time": created_at,

    };
  }

  let css = {};

  if (
    blog_content?.match(/instagram-media/gi) ||
    blog_content?.match(/twitter-tweet/gi)
  ) {
    css = {
      ...css,
      margin: "0 -2px",
      overflowX: "hidden",
    };
  } else if (blog_content?.match(/youtube/gi)) {
    css = {
      ...css,
      margin: "0 auto",
      margin: "0 -2px",
      overflowX: "hidden",
    };
  }

  const relatedArticlesAmp = relatedArticles
    ? relatedCard(relatedArticles, false, true)
    : "";
  blog_content = blog_content.replace(/.png"/g, '.png?im=Resize,width=300,aspect=fit,type=normal"');
  blog_content = blog_content.replace(/.jpg"/g, '.jpg?im=Resize,width=300,aspect=fit,type=normal"');
  blog_content = blog_content.replace(/.jpeg"/g, '.jpeg?im=Resize,width=300,aspect=fit,type=normal"');

  const weburl_id = weburl + "%23" + id;
  const weburl_id_hash = weburl + "#" + id;

  return (
    <>
      <div {...attr}>
        <div className="feedBox_outer" id={id}>
          <div className="feed_inner">
            <div className="feed_timeWrap">
              <div className="feed_time">
                {photoGallerydateConversion(updated_at || created_at)}
                {/* <span>{ago}</span> {data?.onlyTime} */}
              </div>
            </div>
            {blog_title ? (
              <h2 className="feed_heading">
                {blog_title}
              </h2>
            ) : null}
            {!isAmp ? (
              <div className="feed_cont" style={css}>
                {livePostSourceParser(blog_content, id, true, true)}
              </div>
            ) : (
              <p
                className="feed_cont"
                dangerouslySetInnerHTML={{
                  __html: ampHelper.getAMPCodes(blog_content),
                }}
              ></p>
            )}
          </div>
          {isAmp ?
            <div className="feed_ftr">
              <ul className="feed_social">
                <li>
                  <a
                    className="fb"
                    href={`https://www.facebook.com/sharer.php?u=${weburl_id}&t=${blog_title || display_headline
                      }`}
                  ></a>
                </li>
                <li>
                  <a
                    className="tw"
                    href={`https://twitter.com/share?text=${blog_title || display_headline
                      }&url=${weburl_id}`}
                  ></a>
                </li>
                <li>
                  <a
                    className="in"
                    href={`https://www.linkedin.com/cws/share?url=${weburl_id}`}
                  ></a>
                </li>
                <li>
                  <a
                    className="wapp"
                    href={`whatsapp://send?text=${blog_title || display_headline
                      }-${weburl_id}`}
                  ></a>
                </li>
              </ul>
              <a href="#" className="feed_pin"></a>
            </div> :
            <div className="feed_ftr">
              <ul className="">
                <li>
                  <a
                    className="arr_redirect"
                    //href="javascript:void(0)"
                    onClick={async () => {
                      const data = (blog_content || display_headline)?.replace(/<[^>]+>/g, '');
                      const shareData = {
                        title: "",
                        text: data,
                        url: weburl_id_hash
                      };
                      try {
                        await navigator.share(shareData);
                      } catch (err) {
                        //resultPara.textContent = `Error: ${err}`;
                      }
                      logEvent("ss_wapi", "tap", "liveBlogFeed_page");
                    }}
                  >
                    <svg
                      id=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="25"
                      viewBox="0 0 32 32"
                    >
                      <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
              <a href="#" className="feed_pin"></a>
            </div>
          }
        </div>
        {index == 7 && !isAmp ? (
          <>
            {/* <div dangerouslySetInnerHTML={{__html: relatedCard(stories, false, false)}}/>
          <LoadStories/> */}
            <div className="related_nws_sec">
              <RelatedNews
                stories={[]}
                tags={tags}
                isDesktop={false}
                isAmp={false}
                id={story_id}
              />
            </div>
          </>
        ) : null}
        {index == 7 && isAmp && relatedArticlesAmp != "" ? (
          <div dangerouslySetInnerHTML={{ __html: relatedArticlesAmp }}></div>
        ) : null}
      </div>
      <style jsx global>{`
    .arr_redirect {
      background: #ffffff;
      border: 1px solid #c7c7c7;
      border-radius: 24px;
      color: #343a40;
      display: flex;
      float: left;
      line-height: 16px;
      margin: 0;
      position: relative;
      padding: 0;
      text-transform: capitalize;
      text-align: center;
      align-items: center;
      height: 35px;
      min-width: 35px;
      justify-content: center;
      flex-direction: row;
    }
    `}
      </style>
    </>
  );
};

export default LiveFeedRow;
