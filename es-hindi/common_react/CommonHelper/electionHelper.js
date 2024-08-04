const NodeCache = require('node-cache');

const incache = new NodeCache();

const scriptLoader = (src, onload = () => {}, options = {}) => {
  if (typeof document !== 'undefined') {
    let s = document.createElement('script');
    let el = document.getElementsByTagName('script')[0];
    s.defer = true;
    s.onload = onload;
    s.src = src;
    Object.keys(options).forEach(opt => {
      if (opt == 'attr') {
        Object.keys(options[opt]).forEach(key => {
          s.setAttribute(key, options[opt][key]);
        });
      } else {
        s[opt] = options[opt];
      }
    });
    el.parentNode.insertBefore(s, el);
  }
};

const fetchDataWithCache = async (url, key, ttl, pub) => {
  let data = null;
  // if (key) {
  //   data = await incache.get(key);
  // }
  if (data) {
    return data;
  } else {
    data = await fetch(url);
    data = await data.json();
    // incache.set(key, data, ttl);
    return data;
  }
};

const homeParser = ({
  result,
  widget,
  lang = 'en',
  mode,
  isMobile = false,
  api,
  isFullScreen = false,
}) => {
  try {
    // let fullScreenStateData = [];
    let resultBoard = [];
    let sidesList = ['win', 'winOrLead', 'voteShare', 'strikeRate'];
    let resultChunk = {};

    if (result?.data) {
      result = result?.data;
      let { labels = {} } = result;

      let teams = [
        ...(result?.nation?.alliance?.slice(0, 3) || []),
        ...(result?.assembly?.slice(0, 2) || []),
      ];

      [...(result?.assembly?.slice(0, 2) || []), result?.nation]?.forEach(
        item => {
          if (item?.shortState) {
            resultChunk[item.shortState] = {
              seats: item.seats || '',
              done: item.resultDone || 0,
              stw: item.majorityMark || '',
              slabel: labels?.seatLabel || '',
              stwlabel: labels?.seatsToWin || '',
            };
          }
        }
      );

      resultBoard = teams.map(item => {
        // let parties;
        // const otherParty = item.parties.find(
        //   party => party?.partyAbbr?.toLowerCase() === 'oth'
        // );
        // if (otherParty) {
        //   const restParties = item.parties.filter(
        //     party => party?.partyAbbr?.toLowerCase() !== 'oth'
        //   );
        //   parties = [...restParties, otherParty];
        // }

        let data = (item.parties || item.alliance)
          ?.slice(0, 3)
          .map((party, p) => {
            let sides = (
              widget?.data?.cubeDataPoints?.find(
                i => i.shortState == (item?.allianceAbbr || item?.shortState)
              )?.dataPoints || sidesList
            )
              .map(sl => {
                return {
                  first: party.partyAbbr || party.allianceAbbr || '',
                  second: party[sl] || 0,
                  third: labels[sl] || '',
                  color: party.partyColor || party.allianceColour || '',
                  short: sl,
                };
              })
              .slice(0, 4);

            return {
              type: 'result',
              sides,
            };
          });

        data.push({
          sides: (item.parties || item.alliance)?.slice(3, 7).map(party => {
            return {
              first: party.partyAbbr || party.allianceAbbr || '',
              second: party['winOrLead'] || 0,
              third: widget?.data?.otherParty || '',
              color: party.partyColor || party.allianceColour || '',
              short: 'winOrLead',
            };
          }),
          type: 'result',
        });

        return [
          {
            short: item.allianceAbbr || '',
            head: item.state || '',
            seats: item.seats || '',
            win: item.winOrLead || 0,
            stw: item.winOrLead || 0,
            done: item.resultDone || 0,
            color: item.allianceColour || '',
            resultFirst: item.resultDone || 0,
            resultSecond: `${item.seats} ${labels?.seatLabel}`,
            resultText: `${item.majorityMark} ${labels?.seatsToWin}`,
            resultAS: widget?.data?.labels?.assemblyResults || '',
            resultLS: widget?.data?.labels?.lokSabhaResults || '',
            winLead: labels?.winLeadLabel || '',
            url: widget?.data?.cubeDataPoints?.find(
              i => i.shortState == item?.allianceAbbr
            )?.link || widget?.data?.cubeDataPoints?.find(
              i => i.shortState == item?.shortState
            )?.link || '',
            info:
              widget?.data?.cubeDataPoints?.find(
                i => i.shortState == item?.allianceAbbr
              )?.info || false,
          },
          ...(data || []).slice(0, 4),
        ];
      });

      // for full screen TV widget
      if (isFullScreen) {
        // fullScreenStateData =
        //   createFullScreenStateResult(result?.states || []) || [];
        return {
          resultBoard: { data: resultBoard },
          // fullScreenStateData,
          resultChunk,
        };
      }
    }

    let mapData = {};
    let placeholders = [];
    let sponsors = [];
    let labels = {};
    let liveBlog = {};
    let liveTv = {};
    let fights = {};
    let statusBar = {};
    let dropList = {};
    let switches = {};
    let searchBoxLabel = '';
    if (widget?.data) {
      widget = widget.data;

      if (widget?.mapDropdown) {
        mapData = {
          states: widget?.mapDropdown,
        };
      }

      if (widget?.placeholder) {
        placeholders = widget?.placeholder;
      }

      if (widget?.sponsors) {
        sponsors = widget?.sponsors?.data;
      }

      if (widget?.labels) {
        labels = widget?.labels;
      }

      if (widget?.headLine) {
        liveBlog = widget.headLine;
      }

      if (widget?.live) {
        liveTv = widget?.live;
      }

      if (result?.statusBar) {
        statusBar = result?.statusBar;
      }

      if (widget?.stateListDropdown) {
        dropList.stateListDropdown = widget.stateListDropdown;
      }

      if (widget?.stateListHorizontal) {
        dropList.stateListHorizontal = widget.stateListHorizontal;
      }

      if (widget?.tightFight) {
        fights = widget.tightFight;
      }

      if (widget?.byPoll) {
        switches.byPoll = widget.byPoll;
      }

      if (widget?.tightFight) {
        switches.tightFight = widget.tightFight;
      }

      if (widget?.majorityMark) {
        switches.majorityMark = widget.majorityMark;
      }

      if (widget?.switcher) {
        switches = { ...switches, ...widget.switcher };
      }
      if (widget?.searchBoxStatus) {
        switches.searchBoxStatus = widget.searchBoxStatus;
      }

      if (widget?.voteShare) {
        switches.voteShare = widget.voteShare;
      }

      if (widget?.searchBoxLabel) {
        searchBoxLabel = widget?.searchBoxLabel;
      }
    }

    return {
      resultBoard: { data: resultBoard },
      mapData,
      placeholders,
      sponsors,
      config: {
        lang,
        mode,
      },
      labels,
      liveBlog,
      liveTv,
      fights,
      statusBar,
      dropList,
      switches,
      isMobile,
      api: api || false,
      searchBoxLabel,
      resultChunk,
    };
  } catch (error) {
    console.log(error);

    return {
      resultBoard: { data: [] },
      mapData: {
        states: [],
      },
      placeholders: [],
      sponsors: [],
      config: {
        lang,
        mode,
      },
      labels: {},
      liveBlog: {},
      liveTv: {},
      fights: {},
      dropList: {},
      statusBar: {},
      switches: {},
      isMobile: false,
      api: api || false,
      searchBoxLabel: '',
      resultChunk: {},
    };
  }
};

const homeWidget = async ({
  data = {},
  fetchIt,
  lang = 'en',
  mode = 'prod',
  pub,
  ttl = 10,
  isMobile = false,
  isFullScreen = false,
  useBlob = false,
} = {}) => {
  try {
    let result, widget, resultApi, widgetApi, timeStart, timeEnd, totalTime;
    let { domain, dry, csrDomain } = APIConfig || {};

    if (fetchIt) {
      resultApi = pub
        ? `https://elections-v3-gcs-json.news18.com/${dry}feed/${lang}/ls/results-live.json`
        : `http://elections-v3-api.news18.internal/api/${lang}/ls/results-live`;

      widgetApi = pub
        ? `https://elections-v3-gcs-json.news18.com/${dry}feed/${lang}/home-widget.json`
        : `http://elections-v3-api.news18.internal/api/${lang}/home-widget`;

      // if (useBlob) {
      //   widgetApi = `https://${domain}/${dry}feed/${lang}/home-widget.json`;
      // }

      timeStart = Date.now();
      [result = {}, widget = {}] = await Promise.all(
        [
          fetchDataWithCache(resultApi, `results-live-2_${lang}`, ttl),
          fetchDataWithCache(widgetApi, `home-widget_${lang}`, ttl),
        ].map(p => p.catch(() => {}))
      );
      timeEnd = Date.now();
      totalTime = (timeEnd - timeStart) / 100;
    } else {
      [result = {}, widget = {}] = data || {};
    }

    return homeParser({
      result,
      widget,
      lang,
      mode,
      isMobile,
      isFullScreen,
      api: { resultApi, widgetApi, totalTime },
    });
  } catch (error) {
    console.log(error);
    return {
      resultBoard: { data: [] },
      inNews: [],
      topNews: [],
      mapData: {
        states: [],
      },
      placeholders: [],
      synopsis: {},
      sponsors: [],
      config: {
        lang,
        mode,
      },
      labels: {},
      liveBlog: {},
      liveTv: {},
      fights: {},
      winsandleads: false,
      isMobile: false,
      switches: {},
    };
  }
};

// const createFullScreenStateResult = (states = []) => {
//   const statesData = states
//     .map(eachState => {
//       let mappedAlliances = eachState?.alliance;
//       if (
//         mappedAlliances &&
//         Array.isArray(mappedAlliances) &&
//         mappedAlliances.length
//       ) {
//         mappedAlliances.sort((a, b) => {
//           if (a.allianceAbbr === 'OTH') {
//             return Number.POSITIVE_INFINITY;
//           } else if (b.allianceAbbr === 'OTH') {
//             return Number.NEGATIVE_INFINITY;
//           }
//           return eachState?.resultDone
//             ? b['winOrLead'] - a['winOrLead']
//             : a['allianceOrder'] - b['allianceOrder'];
//         });
//         mappedAlliances =
//           mappedAlliances?.length > 2
//             ? [
//                 ...mappedAlliances.slice(0, 2),
//                 mappedAlliances[mappedAlliances.length - 1],
//               ]
//             : mappedAlliances;
//       } else {
//         return null;
//       }
//       return {
//         totalSeats: eachState?.seats || '',
//         stateName: eachState?.state || '',
//         alliance: mappedAlliances,
//       };
//     })
//     .filter(Boolean);
//   return statesData;
// };

const electionUrlList = {
  exit: {
    js: 'https://elections-v3-json.news18.com/feed/iframe/exit_poll_across_site.js',
    amp: 'https://elections-v3-json.news18.com/feed/iframe/AMP_Exit_Poll_Iframe.html',
    detail:
      'https://elections-v3-json.news18.com/feed/iframe/LS_Exit_poll_Detail.html',
    ls: 'https://elections-v3-json.news18.com/feed/iframe/LS_Exit_Poll_Iframe.html',
  },
};

const electionAPIs = ({ pub = true, lang = 'en', mode = 'prod' } = {}) => {
  let { domain, dry, csrDomain } = APIConfig || {};
  // let resultApi = pub
  //   ? `https://${domain}/${
  //       mode === 'stg' ? '' : ''
  //     }${dry}feed/${lang}/ls/results-live.json`
  //   : `${mode === 'stg' ? 'http://' : 'http://'}elections-v3-api.news18${
  //       mode === 'stg' ? '.internal' : '.internal'
  //     }/api/${lang}/ls/results-live`;

  // let widgetApi = pub
  //   ? `https://${
  //       mode === '' ? '' : ''
  //     }${domain}/${dry}feed/${lang}/home-widget.json`
  //   : `${mode === 'stg' ? 'http://' : 'http://'}elections-v3-api.news18${
  //       mode === 'stg' ? '.internal' : '.internal'
  //     }/api/${lang}/home-widget`;
  if (pub) {
    return {
      resultApi: `https://${csrDomain}/${dry}feed/${lang}/ls/results-live.json`,
      widgetApi: `https://${csrDomain}/${dry}feed/${lang}/home-widget.json`,
      exit: `https://${csrDomain}/${dry}feed/${lang}/ls/in/exitpoll.json`,
    };
  }
  return {
    resultApi: `${domain}${lang}/ls/results-live`,
    widgetApi: `${domain}${lang}/home-widget`,
    exit: `${domain}${lang}/ls/in/exitpoll`,
  };
};

const APIConfig = {
// dry: 'dry-',
   dry: '',
  domain: 'http://elections-v3-api.news18.internal/api/',
  csrDomain: 'elections-v3-gcs-json.news18.com',
};

export {
  scriptLoader,
  homeWidget,
  homeParser,
  electionUrlList,
  electionAPIs,
  APIConfig,
};
