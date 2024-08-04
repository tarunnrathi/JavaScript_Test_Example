import { useEffect, useState } from 'react';
import ConditionalWrapper from "./ConditionalWrapper";
import { InView } from "react-intersection-observer";
import { getCookie } from "includes/GoogleOneTap.util";
import { generate_dfp_ppid, generate_dfp_ppid_login_user } from "includes/ppid.helper";

const NewSiteAd = ({
    slotId,
    adUnit,
    sizes,
    width,
    height,
    lazyLoad = false,
    loadOnScroll,
    style = {},
    isOverFlow,
    district,
    pwa = false,
    RhsCommonSideTop = false,
    removeAdSpan = false,
    className
}) =>{
    const [showAd, setShowAd] = useState(false);
    const LAZYLOAD_ADS = true;
    const LAZY_OFFSET = 400;
    const REFRESH_KEY = 'refresh';
    const REFRESH_VALUE = 'true';
    const INHOUSE_AD_REFRESH = false; 
    const styleObj = {
        position: "relative",
        // minWidth: width,
        minHeight: removeAdSpan ? "0px": height,
        margin: "0 auto",
        overflow: `${ (isOverFlow!='undefined' && isOverFlow =='visible') ? "visible" : ""}`,
        ...(style || {})
    };
    if (!district) {
		styleObj.width = "100%";
	}
    if (pwa) {
		styleObj.display = "flex";
		styleObj.flexDirection = "column";
		styleObj.alignItems = "center";
	}
    if (RhsCommonSideTop) {
		styleObj.height = 250;
		styleObj.position = "relative";
		styleObj.minWidth = 300;
		styleObj.background = "#ccc";
		styleObj.margin = "0 auto";
	}

    // Load Ad On Scroll eventlistener
    function handleAdScroll() {
        setShowAd(true);       
        window.removeEventListener("scroll", handleAdScroll);
    }

    // Hook for handling delay Ad rendering
    useEffect(() => {
        //Load Ad on scroll        
        if(loadOnScroll) {          
          window.addEventListener('scroll', handleAdScroll);
        }
        if(!(lazyLoad || loadOnScroll)) {            
            bidder(slotId, sizes, adUnit);
        }         
    }, []);
    
    useEffect(() => {
        if(showAd) {
            bidder(slotId, sizes, adUnit);
        } 
      }, [showAd]);

    const bidder = (slotId, sizes, adUnit) =>{       
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
        let requestSlot = '';
        
        //console.log("window.googletag.cmd =",window.googletag.cmd);
        // console.log("window.slots[slotId] =",window.slots[slotId],adUnit);
        if (!window.slots[slotId]){
            if(adUnit?.includes('_OOP')) {                
                window.googletag.cmd.push(function () {
                    //requestSlot = googletag.pubads().getSlots().filter(item => item.getSlotElementId() == divid);
                    googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);
                    let gptSlot = window.googletag
                        .defineOutOfPageSlot(`1039154/${adUnit}`, slotId)
                        .addService(window.googletag.pubads());                       
                    window.slots[slotId] = gptSlot;
                });               
            }
            else{                
                    window.googletag.cmd.push(function () {
                        // googletag.pubads().getSlots().filter(item => console.log("item.getSlotElementId() in NewSiteAd =" ,item.getSlotElementId() === slotId));
                        googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);
                        requestSlot = googletag.pubads().getSlots().filter(item => item.getSlotElementId() === slotId);
                        const gptSlot = INHOUSE_AD_REFRESH 
                        ? window.googletag
                            .defineSlot(`1039154/${adUnit}`, sizes, slotId)
                            .setTargeting(REFRESH_KEY, REFRESH_VALUE)
                            .addService(googletag.pubads()) 
                        : window.googletag
                            .defineSlot(`1039154/${adUnit}`, sizes, slotId)                       
                            .addService(window.googletag.pubads());                      
                        // console.log("gptSlot =",gptSlot);
                        // if(adUnit?.includes('ATF_728x400')){
                        //     googletag.display(slotId);
                        // }                   
                        window.slots[slotId] = gptSlot;

                         // Number of seconds to wait after the slot becomes viewable.
                        const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
                        if(INHOUSE_AD_REFRESH && !window.setImpressionOnce){
                            window.setImpressionOnce = true;
                            googletag.pubads().addEventListener('impressionViewable', function(event){
                                const { slot } = event;
                                const _adUnit = slot.getAdUnitPath();
                                if (!(_adUnit?.includes("PG_1x1") || _adUnit?.includes("_1x1"))){
                                    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1){
                                        setTimeout(function() {
                                            // googletag.pubads().setTargeting('Auto_Refresh', 'News18_Hindi');
                                            googletag.pubads().refresh([slot]);
                                          }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
                                    }
                                }
                            });
                        }
                        //googletag.pubads().enableSingleRequest();
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
            }else {
                if (getCookie("isSignedIn") !== null) {                    
                  generate_dfp_ppid_login_user();
                }
            }    
            if (window.googletag._loaded_) {
                let ppid_cookie_object = getCookie("NW18_PPID_LOGIC"); /* Get Cookie Value */             
                requestManager.adserverRequestSent = true;
                setTimeout(() => {                    
                    window.googletag.cmd.push(function () {
                        //console.log("window.slots[slotId] =",window.slots[slotId]);
                        window.googletag.pubads().refresh([window.slots[slotId]]);
                        googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);                        
                    });
                }, 1000);
            }    
            return false;
        }

        // sends bid request to APS and Prebid
        // function requestHeaderBids(){
        //     //Ignoring NW18 Internal ads for header bidding
        //     if(
        //         slotId?.includes('_OOP') ||
        //         slotId?.includes('PG_1x1') ||                
        //         adUnit?.includes('_1x1')
        //     ){
        //         return setTimeout(() => {
        //             const id = setInterval(() => {
        //                 const call = sendAdserverRequest();
        //                 if(call) {
        //                   clearInterval(id);
        //                 }
        //             }, 2000);
        //         }, 8000);
        //     }
        // }

        function requestHeaderBids(){            
            if(slotId?.includes('_OOP') || slotId?.includes('PG_1x1') || adUnit?.includes('_1x1')){
                //return sendAdserverRequest();
                return setTimeout(() => {
                    let id = setInterval(() => {
                        let call = sendAdserverRequest();
                        if (call) {
                            clearInterval(id);
                        }
                    }, 3000);
                }, 5000);
            }            
            window.googletag.cmd.push(function () {     
                if (typeof PWT.requestBids === "function") {
                 // PWT.requestBids(PWT.generateConfForGPT(requestSlot),function (adUnitArray) {
                    PWT.requestBids(PWT.generateConfForGPT([window.slots[slotId]]),function (adUnitArray) {
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

    if (loadOnScroll && !showAd) {
        return null;
    }
    return(
        <>
            <ConditionalWrapper
                condition={lazyLoad && LAZYLOAD_ADS}
                wrapper={(children) => (
                    <InView
                        fallbackInView={true}
                        threshold={0}
                        rootMargin={`${LAZY_OFFSET}px 0px`}
                        triggerOnce={true}
                        onChange={(inView, entry) => {                                                    
                            if (inView) {
                                bidder(slotId, sizes, adUnit)
                            }
                        }}
                        as="div"
                    >
                        <div data-lazy="ads">{children}</div>
                    </InView>
            )}
            >
                <div className = { className ? className :''}
                    style={styleObj}>
                    <div id={slotId}></div>
                </div>
            </ConditionalWrapper>
            <style global jsx>{`
                .frexpnd > div{
                overflow:visible!important;
                }
            `}
            </style>
        </>
    )
}
export default NewSiteAd;