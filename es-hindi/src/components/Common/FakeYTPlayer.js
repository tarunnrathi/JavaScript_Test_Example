import LazyImage from './LazyImage';
import { InView } from 'react-intersection-observer';
import { logEventNew } from 'includes/googleAnalytic';

export default function FakeYTPlayer({
  height,
  width,
  src,
  style,
  headline,
  image,
  // caption,
  tags,
  categories,
  isRes,
  isAmp=false,
  id,
  category,
  marginBottom = 15,
  playerId= "",
  event = "",
  className="contnt_img",
  controls = false
}) {

  return (
    <>
      <div className={className}>
        <InView
        as="div"
        threshold={0.1}
        onChange={(inView, _, entry) => {
          if(inView) {
            // console.log(`%cVideo_Feature_Impression_Article_JSPlayer , Impression ,${headline}, ${src}, ${category} , ${id}`, 'color:green;background-color: white');
            logEventNew('Video_Embed_Impression_Article_Youtube', 'Impression', `${headline},${src} , ${category} ,  ${id}`);
          }
        }
        }
        >
        <div
        data-youtube="true"
        data-youtube-id={src}
        data-youtube-title={headline}
        data-youtube-category={category || categories}
        data-youtube-width={width}
        data-youtube-height= {height}
        data-youtube-keywords={tags}
        data-youtube-platform={isRes ? "mobile" : "desktop"}
        style={{ width: width, maxHeight: `${height}px`, height:`${height}px`, margin: '0 auto', marginBottom: marginBottom }}
        data-video-event = {event || 'Article_Youtube'}
        data-video-type = {event ? "Non-local18" : ""}
        data-disable-controls={controls ? "true": "false"}
        id={playerId || "vidgyorPlayer8"}
      >
        <LazyImage
            width={width}
            height={height}
            src={image}
            alt={headline}
            title={headline}
            isRes={isRes}
            isSmartPlayer={true}
            isAmp={isAmp}
            filterOut={false}
          />
      </div>
        </InView>

      </div>
      {/* {!loadVideo ? (
        <div className={`fakeYtPlayer-${src}`}>
          <LazyLoad once offset={100} height={height}>
            <img
              onError={setDefaultImage}
              src={`https://img.youtube.com/vi/${src}/hqdefault.jpg`}
              width={width}
              height={height}
              title="Youtube Video"
              alt="Youtube Video"
            />
          </LazyLoad>
          <button className="playButton" onClick={() => setLoadVideo(true)}>
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                className="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#424242"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </button>
        </div>
      ) : (
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <iframe
            src={`https://youtube.com/embed/${src}?autoplay=1`}
            defer={true}
            width={width}
            height={height}
          />
        </div>
      )} */}
      <style jsx>{`
        .youTubeVideoPlayer iframe {
          background: #ddd;
        }

        .fakeYtPlayer-${src} {
          position: relative;
          height: ${height}px;
          width: ${(/(px|%)/).test(width) ? width : `${width}px`};
          margin: 0 auto;
          ${style}
        }

        .fakeYtPlayer-${src} img {
          height: ${height}px;
        }

        .playButton {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-60%) translateY(-50%);
          border: 0;
          width: 75px;
          height: 75px;
          padding: 0;
          margin: 0;
          background: transparent;
          border-radius: 5px;
          fill-opacity: 0.8;
          cursor: pointer;
          outline: 0;
        }

        .ytp-large-play-button-bg:hover {
          fill: #f00;
          fill-opacity: 1;
        }
      `}</style>
    </>
  );
}
