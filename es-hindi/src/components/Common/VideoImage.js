import { holaPlayer, scriptLoader } from "includes/article.util";
import { useEffect, memo } from "react";

export default memo(function VideoImage({
  headline = "News18",
  // channelLogo,
  videoId,
  isMobile = false,
  categories,
  tags,
  hola_player = false,
  videoUrl = "",
  articleData = {},
  youtubeid = "",
  youtubeId = "",
  videosList = false,
  catVideoTrack,
  image,
  caption,
  eventName="Video",
  slotIndex="1",
  isTopVideo=false,
}) {
  const { story_id, vidStreamData, vid_exist } = articleData;
  const height = isMobile ? 275 : videosList ? 263 : 511;
  // const width = isMobile ? 360 : 911;
  useEffect(() => {
    if (hola_player) {
      setTimeout(() => {
        scriptLoader(
          "https://cdnjs.cloudflare.com/ajax/libs/hola_player/1.1.4/hola_player.js",
          () => holaPlayer(articleData, videoUrl, isMobile, '')
        );
      }, 4000);
    }
    const videoNews = document.querySelectorAll(".localvideopl");
    const closer = document.querySelectorAll(".closevdsnew");
    if(closer) {
        closer.forEach((close) => close.addEventListener("click", () => {
        document.removeEventListener('scroll', addClass);
        videoNews.forEach((v) => {
          if(v.classList.contains('adclssticktatbtm')) {
            v.classList.remove('adclssticktatbtm');
          }
        });
      }));
    }
    const posMapper = {};
    const getOffset = (el, p) => {
      if(posMapper[p]) {
        return posMapper[p];
      }
      const rect = el.getBoundingClientRect();
      const v = rect.top + window.scrollY;
      if(!posMapper[p]) {
        posMapper[p] = v;
      }
      return v;
    };
    const addClass = () => {
      videoNews.forEach((v, index) => {
        const windowOffset = parseInt(window.pageYOffset);
        const x = getOffset(v, index) + v.offsetHeight;
        v.classList.remove('adclssticktatbtm');
        if(windowOffset >= x && !v.classList.contains('adclssticktatbtm')) {
          v.classList.add('adclssticktatbtm');
        }
      });
    };
    // if(local18Video && !isAjax) {
      document.addEventListener('scroll', addClass);
    // }

    if (videoId || (youtubeId || youtubeid)) {
      !(function () {
        var e = setInterval(function () {
          try {
            if(window.pubstackJSLoaded) {
              clearInterval(e);
              window.refreshPubstackPlayers(vid_exist ? vidStreamData : "");
            }
          } catch (error) {}
        }, 1e3);
      })();
    }
    return () => {
      // if(local18Video && !isAjax) {
        document.removeEventListener('scroll', addClass);
      // }
    };
  }, []);

  if (videoId) {
    return (
      <>
      <div className="localvideopl diss1">
        <a className="closevdsnew">X</a>
        <div
          id={`vidgyorPlayer${slotIndex}`}
          data-pubstack-player="true"
          data-pubstack-config="video-embed"
          style={{ background: "#ddd", width: "100%", height }}
          data-pubstack-guid={videoId}
          data-property-category={catVideoTrack || categories}
          data-property-platform={isMobile ? "mobile" : "desktop"}
          data-property-keywords={tags}
          data-embed-mode="manual"
          data-article-id={story_id}
          data-video-slot={slotIndex}
          data-video-event={eventName}
          data-video-type={"non-local18"}
          dangerouslySetInnerHTML={{
            __html: `
          <img style="height:${height}px" src="${image
            }" width="100%" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
              clearInterval(e)
              window.refreshPubstackPlayers()
            }},1e3)}();"
          alt=${caption}
          title=${caption} />
          <h3 class="article_title">${caption}</h3>`,
          }}

          data-article-date={articleData?.created_at}
          data-publish-time={articleData?.created_at}
          data-article-type={articleData?.post_type}
          data-tag={articleData?.tags?.length>0?articleData?.tags?.map(x=>x.slug).join(','):""}
          data-taboola={"Yes"}
          data-video-identifier={isTopVideo?"Top Videos":"Videos"}
          data-author-type={articleData?.publish_by?.length>0?articleData?.publish_by[0]?.english_name:""}
          data-desk-video={articleData?.video_details?.type === "desk" ? 1:0}
          data-page-url={articleData?.weburl}
          data-domain-name="https://hindi.news18.com/"
          data-amp-filter={"non-amp-hin"}
          data-video-title={articleData?.headline}
        >
        </div>

        </div>
      </>
    );
  } else if (hola_player) {
    return (
      <>
        <div
          id={"holaPlayerContainer_" + articleData.story_id}
          className="holaPlayerContainer"
          style={{ background: "#ddd", width: "100%", height }}
        ></div>
      </>
    );
  } else if (youtubeId || youtubeid) {
    return (
      <div className="localvideopl diss2">
      <a className="closevdsnew">X</a>
      <div
        id={`vidgyorPlayerYoutube${slotIndex}`}
        data-youtube="true"
        data-youtube-id={youtubeId}
        data-youtube-title={headline}
        // data-youtube-category={category}
        data-youtube-category={catVideoTrack || categories}
        data-youtube-width={"100%"}
        data-youtube-height={height}
        data-article-id={story_id}
        data-video-event = 'Video_Youtube'
        style={{ background: "#ddd", width: "100%", height, margin: "0 auto" }}

        data-article-date={articleData?.created_at}
        data-publish-time={articleData?.created_at}
        data-article-type={articleData?.post_type}
        data-tag={articleData?.tags?.length>0?articleData?.tags?.map(x=>x.slug).join(','):""}
        data-taboola={"Yes"}
        data-video-identifier={isTopVideo?"Top Videos":"Videos"}
        data-author-type={articleData?.publish_by?.length>0?articleData?.publish_by[0]?.english_name:""}
        data-desk-video={articleData?.video_details?.type === "desk" ? 1:0}
        data-page-url={articleData?.weburl}
        data-domain-name="https://hindi.news18.com/"
        data-amp-filter={"non-amp-hin"}
        data-video-title={articleData?.headline}
      >
        {/* <div className="svgloader"><img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Loader_1651473410.svg" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
			clearInterval(e)
			window.refreshPubstackPlayers()
		}},1e3)}();"/></div> */}
        {/* <FakeYTPlayer
          src={youtubeId}
          width={width}
          height={`${height}px`}
        ></FakeYTPlayer> */}
      </div>
      </div>
    );
  } else {
    return null;
  }
});
