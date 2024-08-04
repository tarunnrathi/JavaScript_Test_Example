let gptTimeout = 500;
import ADS_CONFIG from "../CommonConfig/ads.common.config";
const initGoogleTag = (load, pageAds, meta) => {
  if(load){
    window.PWT = window.PWT || {};
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      Object.keys(pageAds?.setTargetingValues || {}).forEach(item  => {
        googletag.pubads().setTargeting(item, pageAds.setTargetingValues[item]);
      });
      googletag.pubads().disableInitialLoad();
      googletag.pubads().collapseEmptyDivs(true);
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    })
    if(meta?.apstag){
      function q(c, r) {
        window.apstag._Q.push([c, r]);
      }

      window.apstag = window.apstag || {
        init: function () {
          q("i", arguments);
        },
        fetchBids: function () {
          q("f", arguments);
        },
        setDisplayBids: function () { },
        _Q: [],
      };

      // APS request
      window.apstag.init({
        pubID: "779bdaf2-7955-402f-9476-b0a531d45eaa",
        adServer: "googletag",
      });
    }
  }
}

const getPubmaticJs = (id) => {
  let purl = window.location.href;
  let url = `//ads.pubmatic.com/AdServer/js/pwt/113941/${id ? id : '2060'}`;
  let profileVersionId = "";
  if (purl.indexOf("pwtv=") > 0) {
    var regexp = /pwtv=(.*?)(&|$)/g;
    var matches = regexp.exec(purl);
    if (matches.length >= 2 && matches[1].length > 0) {
      profileVersionId = "/" + matches[1];
    }
  }
  return url + profileVersionId + "/pwt.js";
}

const getAdpushupJs = (id, isCustom = false) => {
  return (isCustom == true) ? `//cdn.adpushup.com/${(id) ? id : '43401' }/custom/adpushup.js` : `//cdn.adpushup.com/${(id) ? id : '43401' }/adpushup.js`;
}

const getApstagJs = () => {
  return "https://c.amazon-adsystem.com/aax2/apstag.js";
}

const loadGpt = () => {
  //console.log("load gpt js", window.gptRan);
  if (!window.gptRan && typeof window !== 'undefined') {
    window.gptRan = true;
    myScriptLoader('https://securepubads.g.doubleclick.net/tag/js/gpt.js');
  }
  return true;
}

function getCookie(name) {
  try{
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch(e) {
    console.log(e);
    return null;
  }
}

export const loadAds = (config) => {
  try{
    const { load, pageAds, adTimeout, meta } = config || ADS_CONFIG.ads_helper;
    const { gpt, pwt, pwtid, apstag, adpushup, adpushupid, adpushupTimeout, adPushupCustom = false } = meta || {};
    initGoogleTag(load, pageAds, meta);
    if(load){
      setTimeout(() => {
        (apstag) && myScriptLoader(getApstagJs());
        (pwt) && myScriptLoader(getPubmaticJs(pwtid), () => {
          //DFPManager.load();
          (gpt) && loadGpt();
          setTimeout(() => {
            if(adpushup && getCookie("_w18_consent") == null){
                adPushupCustom == true ? customScriptLoader(getAdpushupJs(adpushupid, adPushupCustom), () => {
                  window.adpushup = window.adpushup || {que:[]};
                }) : myScriptLoader(getAdpushupJs(adpushupid, adPushupCustom), () => {
                window.adpushup = window.adpushup || {que:[]};
              })
            }
          }, adpushupTimeout ? adpushupTimeout : 1000);
        });
        (gpt) && setTimeout(loadGpt, gptTimeout);
      }, adTimeout);
    }
  } catch(e) {
    console.log(e);
  }
}

const myScriptLoader = (src, onload = () => {}, options = {}) => {
  try{
    if (typeof document !== "undefined") {
      let s = document.createElement("script");
      let el = document.getElementsByTagName("script")[0];
      s.defer = true;
      s.onload = onload;
      s.src = src;
      Object.keys(options).forEach((opt) => {
        if (opt == "attr") {
          Object.keys(options[opt]).forEach((key) => {
            s.setAttribute(key, options[opt][key]);
          });
        } else {
          s[opt] = options[opt];
        }
      });
      el.parentNode.insertBefore(s, el);
    }
  } catch(e) {
    console.log(e);
  }
};

const customScriptLoader = (src, onload = () => {}, options = {}) => {
  try{
    if (typeof document !== "undefined") {
      let s = document.createElement("script");
      let el = document.getElementsByTagName("script")[0];
      s.async = true;
      s.onload = onload;
      s.src = src;
      Object.keys(options).forEach((opt) => {
        if (opt == "attr") {
          Object.keys(options[opt]).forEach((key) => {
            s.setAttribute(key, options[opt][key]);
          });
        } else {
          s[opt] = options[opt];
        }
      });
      el.parentNode.insertBefore(s, el);
    }
  } catch(e) {
    console.log(e);
  }
};
