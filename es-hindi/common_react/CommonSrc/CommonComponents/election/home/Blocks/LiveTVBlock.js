import { scriptLoader } from '../../../../../CommonHelper/electionHelper';
import { useEffect, useRef } from 'react';

const LiveTVBlock = ({
  head = '',
  subHead = '',
  channels = [],
  streamingSponsorLogo = '',
  streamingSponsor = '',
  streamingSponsorUrl = '',
  lang,
  livetvAd = () => {},
  switches
}) => {
  const loaded = useRef(false);
  const channelMapper = {
    en: {
      c: 'cnnibn_home',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    tl: {
      c: 'cnnibn_home',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    hi: {
      c: 'news18india_home',
      p: 'https://images.news18.com/ibnkhabar/uploads/2019/09/livetv.jpg?impolicy=website&width=360&height=190',
    },
    pa: {
      c: 'news18haryana',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    gu: {
      c: 'news18gujrathi_home',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    bn: {
      c: 'news18bangla',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    ur: {
      c: 'news18urdu',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    kn: {
      c: 'news18kannada_home',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    ta: {
      c: 'news18tamil',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    or: {
      c: 'news18odia_home',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    as: {
      c: 'news18assam',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    ml: {
      c: 'news18kerala',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
    mr: {
      c: 'news18lokmat',
      p: 'https://images.news18.com/static_news18/pix/ibnhome/news18/LIVE_TV_bg.png?impolicy=website&width=360&height=190',
    },
  };

  const loadTvfn = (lang = 'en') => {
    scriptLoader(
      'https://static.vidgyor.com/player/account/n18/js/n18.js',
      function () {
        var vgr_options = {
          accountId: 'n18',
          videoId: channelMapper[lang]?.c,
          isAutoPlay: true,
          isMute: true,
          posterImageUrl: channelMapper[lang]?.p,
          tapToUnmute: false,
          disableAds: false,
          pip: '0',
        };
        VIDGYOR.initPlayer(vgr_options);
        scriptLoader(
          'https://static.vidgyor.com/player/static/js/vgr_util_src_v8.min.js'
        );
      }
    );
  };

  useEffect(() => {
    try {
      if (!loaded.current) {
        loadTvfn(lang);
        loaded.current = true;
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="rswgtltv">
        <div className="rswgtltvtp">
          <h3 className="rswgtltvh">
            <span>{subHead}</span>
            {head}
          </h3>
          <select
            onChange={e => {
              if (e.target.value) {
                window.location.href = e.target.value;
              }
            }}>
            {channels && channels?.length
              ? channels.map(eachChannel => (
                  <option key={eachChannel.name} value={eachChannel?.liveTvUrl}>
                    {eachChannel.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className={'livetv-play'}>
          <div id="vidgyor_parent" style={{ height: '190px', width: '100%' }}>
            <div
              style={{ height: '100%', width: '100%' }}
              id="vidgyor_container">
              <div id="closeButtonContainer"></div>
            </div>
          </div>
        </div>
        {!switches?.sponsorAd ? (
          <div className="rswgtltvspnsr">
            <span>{streamingSponsor}</span>
            <a href={streamingSponsorUrl}>
              <img
                src={
                  streamingSponsorLogo ||
                  'https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/streamingsponsor_1691158515.png'
                }
                alt=""
              />
            </a>
          </div>
        ) : (
          livetvAd()
        )}
      </div>
      <style jsx>{`
        .rswgtltv {
          background: #fff;
          border: 1px solid #e2e2e2;
        }

        .rswgtltv .livetv-play {
          width: 100%;
          height: 188px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          padding: 10px;
          margin-bottom: 0;
          padding-top: 0;
          margin-top: 10px;
        }
        #vidgyor_parent {
          background: #000 url(${channelMapper[lang]?.p});
          background-size: contain:
        }

        .rswgtltvh {
          position: relative;
          color: #e1261c;
          font-size: 22px;
          font-weight: bold;
          line-height: 18px;
          padding-left: 15px;
        }
        .rswgtltvh span {
          display: block;
          color: #464646;
          font-size: 13px;
          font-weight: normal;
        }
        .rswgtltvh:before {
          content: "";
          background: #e1261c;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          position: absolute;
          left: 0;
          bottom: 5px;
          animation: rslvdt 0.5s infinite;
        }

        .rswgtltvspnsr {
          background: #f4f4f4;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 5px 5px 5px;
          line-height: 17px;
        }
        .rswgtltvspnsr span {
          color: #000000;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 12px;
          line-height: 14px;
          margin: 0 10px;
        }
        .rswgtltvspnsr img {
          width: 218px;
          height: 42px;
          box-shadow: 0px 3px 6px #00000029;
        }

        .rswgtltvtp {
          display: flex;
          justify-content: space-between;
          padding: 10px 10px 0 10px;
          align-items: self-end;
        }

        .rswgtltvtp select {
          background: rgba(225, 38, 28, 1)
            url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/slctwhtar_1691154391.png)
            no-repeat 97% 50%;
          height: 26px;
          border-radius: 4px;
          color: #fff;
          padding: 0 8px;
          appearance: none;
          font-size: 12px;
          width: 150px;
        }

        @media screen and (max-width: 480px) {
          .rswgtltv .livetv-play {
            width: auto;
            height: 235px;
            background: #000;
            align-items: center;
            padding: 0;
            margin-top: 10px;
            margin-bottom: 0;
          }
          .rswgtltv {
            margin-top: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default LiveTVBlock;
