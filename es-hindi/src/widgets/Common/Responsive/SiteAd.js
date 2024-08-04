import { useEffect, useState } from "react";
import { AdSlot } from "react-dfp";
import LazyLoad from "react-lazyload";
import ConditionalWrapper from "./ConditionalWrapper";
import { getCookie } from "includes/GoogleOneTap.util";
import { generate_dfp_ppid, generate_dfp_ppid_login_user } from "includes/ppid.helper";

const SiteAd = (props) => {
  const LAZYLOAD_ADS = true;
  const LOAD_ON_SCROLL_ADS = true;
  const lazyload = props.lazyload || false;
  // load ad loading on scroll
  const loadonScrollAd = props.loadonScroll || false;
  const [showAd, setShowAd] = useState(false);
  const REFRESH_KEY = 'refresh';
  const REFRESH_VALUE = 'true';
  const bidder = ({ slotId, sizes, adUnit }) => {
    const FAILSAFE_TIMEOUT = typeof PWT === "undefined" ? 2000 : 1000;
    const requestManager = {
      adserverRequestSent: false,
      aps: false,
      prebid: false,
    };

    window.PWT = window.PWT || {};
    window.googletag = window.googletag || { cmd: [] };
    const ppid_cookie_object = getCookie('NW18_PPID_LOGIC');	/* Get Cookie Value */

    window.slots = window.slots || {};
    if (!window.slots[slotId]) {
      if (adUnit?.includes("_OOP")) {
        if(adUnit?.includes("INSTL_OOP")){
          return
        }else{
          googletag.cmd.push(function () {
            googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);
            const gptSlot = googletag
              .defineOutOfPageSlot(`1039154/${adUnit}`, slotId)
              .addService(googletag.pubads());  
            window.slots[slotId] = gptSlot;
          });
        }        
      } else {
        googletag.cmd.push(function () {
        googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);

          const gptSlot = googletag
            .defineSlot(`1039154/${adUnit}`, sizes, slotId)
            .setTargeting(REFRESH_KEY, REFRESH_VALUE)
            .addService(googletag.pubads());
          window.slots[slotId] = gptSlot;
          // Number of seconds to wait after the slot becomes viewable.
          const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
          if(!window.setImpressionOnce) {
            window.setImpressionOnce = true;
            googletag.pubads().addEventListener('impressionViewable', function(event) {
              const { slot } = event;
              console.log(slot, "impressionViewable slot", slot.getSlotId(), slot.getAdUnitPath());
              const _adUnit = slot.getAdUnitPath();
              if (!(_adUnit?.includes("PG_1x1") || _adUnit?.includes("_1x1"))) {
                if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
                  setTimeout(function() {
                    googletag.pubads().setTargeting('Auto_Refresh', 'News18_Hindi');
                    googletag.pubads().refresh([slot]);
                  }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
                }
              }
            });
          }
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
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
        requestManager.prebid = false;
        sendAdserverRequest();
      }
      return;
    }

    // sends adserver request
    function sendAdserverRequest() {
      if (requestManager.adserverRequestSent === true) {
        return;
      }
      if (getCookie("g_token") === null) {
        generate_dfp_ppid();
      } else {
        if (getCookie("isSignedIn") !== null) {
          generate_dfp_ppid_login_user();
        }
      }
      if(window.googletag._loaded_) {
        const ppid_cookie_object = getCookie('NW18_PPID_LOGIC');	/* Get Cookie Value */
        requestManager.adserverRequestSent = true;
        setTimeout(() => {
          window.googletag.cmd.push(function () {
            googletag.pubads().refresh([window.slots[slotId]]);
            googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);
          });
        }, 1000);
      }
    }

    // sends bid request to APS and Prebid
    function requestHeaderBids() {
      //Ignoring NW18 Internal ads for header bidding
      if (slotId?.includes("_OOP") || slotId?.includes("PG_1x1") || adUnit?.includes("_1x1")) {
        return setTimeout(() => {
          const id = setInterval(() => {
            const call = sendAdserverRequest();
            if(call) {
              clearInterval(id);
            }
          }, 2000);
        }
          , 8000);
      }

      window.googletag.cmd.push(function () {
        if (typeof PWT.requestBids === "function") {
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
  };

	const styleObj = {
    position: "relative",
    minWidth: props.width,
    minHeight: props.height,
    margin: "0 auto",
    overflow: `${ (props.isOverFlow!='undefined' && props.isOverFlow =='visible') ? "visible" : "hidden"}`,
		...(props.style || {})
	};

	if (props.width) {
		styleObj.minWidth = props.width;
	} else if (!props.district) {
		styleObj.width = "100%";
	}

	if (props.pwa) {
		styleObj.display = "flex";
		styleObj.flexDirection = "column";
		styleObj.alignItems = "center";
	}

	const adData = Array.isArray(props.config) ? props.config?.find((item) => item.key == props.slotId) : null;
	let h;

	if (adData) {
		h = adConfig[props.slotId]?.[String(adData.value)];
		if (h) {
			// styleObj.height = (!props.removeAdSpan ? h + 20 : h) + "px"
      styleObj.height = h + "px";
		}
	}

	if (props.height && !h && !props.RhsCommonSideTop) {
		//styleObj.minHeight = !props.removeAdSpan ? (props.height + 20) : props.height;
    styleObj.minHeight = props.height;
	}

	if (props.RhsCommonSideTop) {
		styleObj.height = 250;
		styleObj.position = "relative";
		styleObj.minWidth = 300;
		styleObj.background = "#ccc";
		styleObj.margin = "0 auto";
	}

	if (adData && !adConfig[props.slotId] && adData.value == 'false') {
		return null;
	}

  // Load Ad On Scroll eventlistener
  function handleAdScroll() {
    setShowAd(true);
    //console.log('AD Loaded on scroll', loadonScrollAd, props.slotId);
    window.removeEventListener("scroll", handleAdScroll);
  }
  // Hook for handling delay Ad rendering
  useEffect(() => {
    //Load Ad on scroll
    if(LOAD_ON_SCROLL_ADS && loadonScrollAd) {
      //console.log('AD to be loaded onscroll :|showAd ', loadonScrollAd, props.slotId);
      window.addEventListener('scroll', handleAdScroll);
    }

  }, []);

  // Do not Render Ad if scroll event not fired
  if(LOAD_ON_SCROLL_ADS && loadonScrollAd && !showAd) {
    return null;
  }

  return (
    <>
      <ConditionalWrapper
          condition={lazyload && LAZYLOAD_ADS && !loadonScrollAd}
          wrapper={(children) => (
            <LazyLoad once offset={200}>
              <div data-lazy="ads" className="frexpnd">{children}</div>
            </LazyLoad>
          )}
        >
        <div
          style={styleObj}
        >
          {process.env.siteAd && (
            <AdSlot
              dfpNetworkId="1039154"
              slotId={props.slotId}
              adUnit={props.adUnit}
              sizes={h ? props.sizes.filter((item) => item[1] <= h) : props.sizes}
              className={`myad ${props.className ? props.className : ""}`}
              targetingArguments={
                props.targetingArguments ? props.targetingArguments : {}
              }
              renderOutOfThePage={props.renderOutOfThePage}
              shouldRefresh={() => props.slotId == "sticky_footer_ad"}
              onSlotRegister={(options) => bidder({ ...options, adUnit: props.adUnit })}
            />
          )}
        </div>
      </ConditionalWrapper>
      <style global jsx>{`
        .frexpnd > div{
          overflow:visible!important;
        }
      `}</style>
    </>
  );
};

export default SiteAd;

const adConfig = {
  NW18_HIND_ROS_SECTION_ROS_ATF_728: {
    true: 90,
    false: 90,
  },
};
