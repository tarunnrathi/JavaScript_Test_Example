import { useEffect, useState } from "react";
import { AdSlot } from "react-dfp";
import LazyLoad from "react-lazyload";
import ADS_CONFIG from "../../../CommonConfig/ads.common.config";
import ConditionalWrapper from "./ConditionalWrapper";

const SiteAd = (props) => {
  const LAZYLOAD_ADS = true;
  const LOAD_ON_SCROLL_ADS = true;
  const lazyload = props?.lazyload || false;
  const loadonScrollAd = props?.loadonScroll || false;
  const [showAd, setShowAd] = useState(false);
  var REFRESH_KEY = 'refresh';
  var REFRESH_VALUE = 'true';
  let newConfig = props?.extra || ADS_CONFIG.sitead;
  let styleObj = {
    minWidth: props.width,
    minHeight: props.height,
    position: "relative",
    margin: "0 auto",
    lineHeight: "0px",
    ...(props.style || {}),
  };

  if (props.width) {
    styleObj.minWidth = props.width;
  } else {
    styleObj.width = "100%";
  }

  if (props.pwa) {
    styleObj.display = "flex";
    styleObj.flexDirection = "column";
    styleObj.alignItems = "center";
  }

  let adData = Array.isArray(props.config)
    ? props.config?.find((item) => item.key == props.slotId)
    : null;
  let h;

  if (adData) {
    h = adConfig[props.slotId]?.[String(adData.value)];
    if (h) {
      styleObj.height = (!props.removeAdSpan ? h + 20 : h) + "px";
    }
  }

  if (props.height && !h) {
    styleObj.minHeight = !props.removeAdSpan ? props.height + 20 : props.height;
  }

  if (adData && !adConfig[props.slotId] && adData.value == "false") {
    return null;
  }

  const isInternal =  props.slotId?.includes("_OOP") || props.slotId?.includes("PG_1x1") || props.slotId?.includes("PG_SLIDER_1x1") || props.adUnit?.includes("_1x1");
  const bidder = ({ slotId, sizes, adElementRef = {}, adUnit, isInternal }) => {
    if(newConfig?.stopBidding){
      return;
    }
    var FAILSAFE_TIMEOUT = typeof PWT == "undefined" ? 3000 : 1000;
    var requestManager = {
      adserverRequestSent: false,
      aps: false,
      prebid: false,
    };
    window.PWT = window.PWT || {};
    window.googletag = window.googletag || { cmd: [] };
    window.slots = window.slots || {};
    if (!window.slots[slotId]) {
      if (adUnit && adUnit.includes("_OOP")) {
        googletag.cmd.push(function () {
          let gptSlot = googletag
            .defineOutOfPageSlot(`1039154/${adUnit}`, slotId)
            .addService(googletag.pubads());
          window.slots[slotId] = gptSlot;
        });
      } else {
        if(newConfig?.customRefresh){
          googletag.cmd.push(function () {
            let gptSlot = googletag
              .defineSlot(`1039154/${adUnit}`, sizes, slotId)
              .setTargeting(REFRESH_KEY, REFRESH_VALUE)
              .addService(googletag.pubads());
            window.slots[slotId] = gptSlot;
            // Number of seconds to wait after the slot becomes viewable.
            var SECONDS_TO_WAIT_AFTER_VIEWABILITY = (newConfig?.refresh_time) ? newConfig?.refresh_time : 30;
            if(!window.setImpressionOnce){
              window.setImpressionOnce = true;
              googletag.pubads().addEventListener('impressionViewable', function(event) {
                var slot = event.slot;
                //console.log(slot, "impressionViewable slot", slot.getSlotId(), slot.getAdUnitPath());
                let _adUnit = slot.getAdUnitPath();
                if (!(_adUnit?.includes("PG_1x1") || _adUnit?.includes("_1x1"))) {
                  if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
                    setTimeout(function() {    
                      googletag.pubads().setTargeting('Auto_Refresh', `News18_${props.language}`);
                      googletag.pubads().refresh([slot]);
                    }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
                  }
                }
              });
            }
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        } else {
          googletag.cmd.push(function () {
            let gptSlot = googletag
              .defineSlot(`1039154/${adUnit}`, sizes, slotId)
              .addService(googletag.pubads());
            window.slots[slotId] = gptSlot;
          });
        }
      }
    }
    // initiate bid request
    requestHeaderBids();
    // set failsafe timeout
    setTimeout(function () {
      sendAdserverRequest();
    }, FAILSAFE_TIMEOUT);
    // when both APS and Prebid have returned, initiate ad request
    function biddersBack() {
      if (requestManager.prebid) {
        sendAdserverRequest();
      } else if(requestManager.aps){
        sendAdserverRequest();
      }
      return;
    }
    // sends adserver request
    function sendAdserverRequest() {
      if (requestManager.adserverRequestSent === true) {
        return;
      }
      if(window.googletag._loaded_) {
        requestManager.adserverRequestSent = true;
        window.googletag.cmd.push(function () {
          googletag.pubads().refresh([window.slots[slotId]]);
          // googletag.display(window.slots[slotId]);
        });
      }
    }
    // sends bid request to APS and Prebid
    function requestHeaderBids() {
      //Ignoring NW18 Internal ads for header bidding
      if (isInternal) {
        return setTimeout(() => {
          let id = setInterval(() => {
            let call = sendAdserverRequest();
            if(call) {
              clearInterval(id);
            }
          }, 1000);
        }
          , 500);
      }
      // APS request
      if(newConfig?.apstag){
        window.googletag.cmd.push(function () {
          window?.apstag?.fetchBids(
            {
              slots: [
                {
                  slotID: slotId,
                  slotName: adUnit,
                  sizes: sizes,
                },
              ],
            },
            function (bids) {
              window.googletag.cmd.push(function () {
                window.apstag.setDisplayBids();
                requestManager.aps = true;
                biddersBack();
              });
            }
          );
        });
      }
      if(newConfig?.pwt){
        window.googletag.cmd.push(function () {
          if (typeof PWT.requestBids === "function") {
            let requestSlots = googletag.pubads().getSlots();
            PWT.requestBids(
              PWT.generateConfForGPT([window.slots[slotId]]),
              function (adUnitArray) {
                PWT.addKeyValuePairsToGPTSlots(adUnitArray);
                requestManager.prebid = true;
                biddersBack();
              }
            );
          } else {
            requestManager.prebid = true;
            biddersBack();
          }
        });
      }
    }
  };

  // Load Ad On Scroll eventlistener
  function handleAdScroll() {
    setShowAd(true);
    window.removeEventListener("scroll", handleAdScroll);
  }

  // Hook for handling delay Ad rendering
  useEffect(() => {
    //Load Ad on scroll
    if (LOAD_ON_SCROLL_ADS && loadonScrollAd) {
      window.addEventListener("scroll", handleAdScroll);
    }
  }, []);

  // Do not Render Ad if scroll event not fired
  if (LOAD_ON_SCROLL_ADS && loadonScrollAd && !showAd) {
    return null;
  }

  return (
    <>
      <ConditionalWrapper
        condition={lazyload && LAZYLOAD_ADS && !loadonScrollAd}
        wrapper={(children) => (
          <LazyLoad once offset={(newConfig?.offset) ? newConfig?.offset : 200}>
            <div data-lazy="ads">{children}</div>
          </LazyLoad>
        )}
      >
        <div style={styleObj}>
          {/* {!props.removeAdSpan ? <span className="ad_span">Advertisement</span> : ''} */}
          {/* <Placeholder
            ref={placeRef}
            width={props.width || 0}
            height={props.height || 0}
            ads={true}
          /> */}
          {process.env.siteAd && (
            <AdSlot
              dfpNetworkId="1039154"
              slotId={props.slotId}
              adUnit={props.adUnit}
              sizes={props.sizes}
              className={`myad ${props.className ? props.className : ""}`}
              targetingArguments={
                props.targetingArguments ? props.targetingArguments : {}
              }
              renderOutOfThePage={props.renderOutOfThePage}
              onSlotRegister={(options) => bidder({ ...options, adUnit: props.adUnit, isInternal })}
              //onSlotRender={() => placeRef.current?.remove()}
              shouldRefresh={() => props.slotId == "sticky_footer_ad"}
            />
          )}
        </div>
      </ConditionalWrapper>
    </>
  );
};

export default SiteAd;
