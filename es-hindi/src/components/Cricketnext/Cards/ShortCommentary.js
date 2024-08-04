import { useEffect, useState, useRef } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import getConfig from "next/config";
import PlaceholderCard from "./PlaceholderCard";

const { publicRuntimeConfig } = getConfig();
let id;

const ShortCommentary = ({
  url,
  // teama = "",
  // teamb = "",
  // id,
  isLive,
  pageAds,
  isFull,
  data = [],
  slug = "",
  showBottomAd = false
}) => {
  const [comments, setComments] = useState(data);
  useEffect(() => {
    if (!isFull) {
      updateLiveData();
    }
  }, []);

  useEffect(() => {
    if(data.length) {
      setComments(data);
    }
  }, [data]);

  const updateLiveData = async () => {
    try {
      let c = await fetch(url, { timeout: 5000 });
      c = await c.json();
      setComments(
        c?.Commentary?.filter(
          (item) => item.Runs && !isNaN(Number(item.Runs))
        ).slice(0, 16) || []
      );
    } catch (error) {
    }
  };

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => updateLiveData();
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (isLive && !id && !isFull) {
      id = setInterval(tick, 10000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, []);

  const fullComments = `${
    publicRuntimeConfig.siteUrl
  }cricket/live-score/${slug}-ball-by-ball-live-commentary-${id}.html`;

  if (comments.length === 0) {
    return <PlaceholderCard />;
  }
  return (
    <>
    <div className="cn-short-commentary">
      {(comments.length ? comments : data).length > 0 && !isFull && (
        <>
          <h3 className="scoreHeading1">लेटेस्ट कॉमेंट्री</h3>
        </>
      )}
      <div className="commentry-list">
        {(comments.length ? comments : data).length && !isFull ? (
          <a href={fullComments} className="full-commentrybtn">
            फुल कॉमेंट्री
          </a>
        ) : null}
        <ul>
          {comments && comments.length > 0 && comments.map((item, dex) => {
            const background =
              item.Runs == 6 || item.Runs == 4
                ? "#579b5e"
                : item.Detail?.trim()?.toLowerCase() === "w"
                ? "#d23534"
                : "white";
            const color = background === "white" ? "black" : "white";
            return (
              <>
                {item.Runs && !isNaN(Number(item.Runs)) ? (
                  <li key={`commentryList-`+dex}>
                    <>
                      <div className="box-l">
                        <div className="ball">{item.Over}</div>
                        <div className="run" style={{ background, color }}>
                          {item.Detail || item.Runs}
                        </div>
                      </div>
                      <div className="box-r">
                        <p>
                          <span>
                            {item.Bowler_Name} to {item.Batsman_Name}:{" "}
                          </span>
                          {item.Commentary}
                        </p>
                      </div>
                    </>
                  </li>
                ) : (
                  <p className="cmntry-dtls" key={dex}>{item.Commentary}</p>
                )}
                {pageAds?.BTF_728 && (item.Summary || item.Iswicket) ? (
                  <div className="ad-container">
                    <SiteAd
                      width={728}
                      height={90}
                      slotId={`commentary-ad-${dex}-0`}
                      adUnit={pageAds.BTF_728}
                      sizes={[[728, 90]]}
                      removeAdSpan={true}
                      loadonScroll={true}
                    ></SiteAd>
                  </div>
                ) : null}
              </>
            );
          })}
        </ul>
        {(comments.length ? comments : data).length && !isFull ? (
          <div className="score-cardbtnwrap">
            <a className="score-cardbtn-1" href={fullComments}>
              फुल कॉमेंट्री
            </a>
          </div>
        ) : null}
      </div>
    </div>

    {pageAds?.BTF_300 && showBottomAd && comments.length && (
      <div className="ad-container">
        <div className="addinner-box">
          <SiteAd
            slotId="mobileAdNew300x250_2"
            adUnit={pageAds.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={280}
            lazyload={true}
          />
        </div>
      </div>
    )}
      <style>{`
      .score-cardbtnwrap {
        display: flex;
        justify-content: center;
      }
        .commentry-list {position: relative;}
        .commentry-list .full-commentrybtn{background: #E1261D;font-size: 12px;text-transform: uppercase;color: #fff;font-family: 'Karma',serif !important;font-weight:bold;padding: 6px 14px;border-radius: 20px;position: absolute;right: 0;bottom: 100%;margin-bottom: 3px;}
        .commentry-list ul > li{display: flex;border-radius: 15px;overflow: hidden;box-shadow: 0 5px 7px #D8D8D8;margin-bottom: 20px;}
        .commentry-list ul > li .box-l{    flex: 0 0 65px;background: #001D42;text-align: center;display: flex;flex-wrap: wrap;justify-content: center;align-items: center;padding: 12px 0;}
        .commentry-list ul > li .box-r{padding: 10px 20px;background: #fff;width:100%;}
        .commentry-list ul > li .box-l .ball{color: #D8D8D8;font-family: 'Karma',serif !important;width: 100%;}
        .commentry-list ul > li .box-l .run{background: #FFFFFF;font-family: 'Karma',serif !important;font-weight:bold;width: 35px;text-align: center;height: 35px;display: flex;justify-content: center;align-items: center;border-radius: 50%;color: #202020;font-size: 12px;transform-text:uppercase;}
        .commentry-list ul > li .box-r p{font-size: 15px;margin: 0;font-family: 'Karma',serif !important;color: #202020;}
        .commentry-list ul > li .box-r p span{color: #202020;font-family: 'Karma',serif !important;font-weight:bold;font-size: 14px;}
        .score-cardbtn-1 {
            background: #E1261D;
            font-size: 12px;
            text-transform: uppercase;
            color: #fff;
            font-family: 'Karma',serif !important;font-weight:bold;
            padding: 6px 14px;
            border-radius: 20px;
        }
        .score-cardbtn-1:hover, .full-commentrybtn:hover {
          color: #fff !important; 
        }
        .CN-PageWrap.CN-Mobile-PageWrap .full-commentrybtn{font-family: 'Karma',serif !important;padding: 3px 14px;}
        .CN-PageWrap.CN-Mobile-PageWrap .commentry-list ul > li .box-r{padding: 10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .commentry-list ul > li .box-r p{font-size: 13px;}
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentry-list ul > li .box-l .ball{margin-bottom: 7px;}
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentry-list ul > li{margin-bottom: 10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .score-cardbtn-1{font-family: 'Karma',serif !important;}
        .CN-PageWrap.CN-Mobile-PageWrap .cn-short-commentary{margin: 20px 0;}
      `}</style>
    </>
  );
};

export default ShortCommentary;
