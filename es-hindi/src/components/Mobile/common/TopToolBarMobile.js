import { logEvent } from "includes/googleAnalytic";
import React, { useState, useContext } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import dynamic from "next/dynamic";
const NotificationPopup = dynamic(() => import("components/Responsive/NotificationPopUp"));
import HindiGlobalContext from "HindiGlobalContext";
const TopToolBarMobile = (props) => {
    const [fontActive, setFontActive] = useState(false)
    const [active, setActive] = useState(false)
    const { setSearchBar } = useContext(HindiGlobalContext);
    const shareWebAPI = async () => {
        const shareData = {
            title: "",
            text: props.headline,
            url: props.url,
          };
        try {
          await navigator.share(shareData);
          logEvent("ttb_article","click",`share_button,${props.headline}, ${props.articleId}, ${props.url}, NA, mobile, non-amp`);
        } catch (err) {
          //resultPara.textContent = `Error: ${err}`;
        }
      };
    const handleFollowUs = () => {
        logEvent("ttb_article", "click", `whatsapp_follow,mobile`)
        var link = document.createElement('a');
        link.href = "https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
    };
    const handleBackClick = () => {
      logEvent("ttb_article", "click", "back_button,mobile");
      if(document.referrer.split('/')[2]!=location.hostname){
          window.location.href = publicRuntimeConfig.siteUrl;
          //User came from other domain or from direct
      }else{
          window.history.back();
          //User came from another page on your site
      }
    };
    const handleTextSizeClick = (size) => {
        setActive(size);
        logEvent("ttb_article", "click", `font_resize_button,${size},mobile`);
        document.getElementById("artcle_content").setAttribute("class", "")
        // document.getElementById("artcle_content").classList.toggle(size === "small" ? "large,medium" : size === "medium" ? "large,small" : "medium,small");
        document.getElementById("artcle_content").classList.add(size);
        // setFontActive(false);
    };
    return (<>  
		<div className="fixtb_wrap">
			<div className="prog_bar"></div>
			<span onClick={handleBackClick} className="fixtb_arr cp_action_bar_back_btn"></span>
			<span className="fixtb_txt">{props.category}</span>
			<div className={`toolbr ${props?.pageType === "article"? "artoolbr":""}`}>
          {(props?.pageType === "photogallery" || props?.pageType === "videos" || props?.pageType === "article")
            ?<NotificationPopup isMobile={true} />
            : <div onClick={handleFollowUs}><img src="/images/toolbar/whatsapp.svg" width={"18px"} height={"18px"} />FOLLOW US</div>
          }
        <div className="discvr header_search_icon" onClick={()=>setSearchBar(props?.pageType)}><img className="header_search_icon" src="/images/toolbar/discover.svg" />DISCOVER</div>
          {(props?.pageType !== "photogallery" && props?.pageType !== "videos") &&
            <div onClick={() => { logEvent("ttb_article", "click", "font_resize_button,NA,mobile"); setFontActive(!fontActive) }}><img className="cp_action_text_size" src="/images/toolbar/letter_l.svg" width={"14px"} height={"14px"} />TEXT SIZE</div>
          }
				<div className="cp_action_bar_share" onClick={shareWebAPI}><img className="cp_action_bar_share" src="/images/toolbar/share.svg" width={"14px"} height={"16px"} />SHARE</div>
			</div>
		</div>
		
		<div className={`btm_toolbr ${fontActive ? "active" : ""}`}>
			<div className="btmtlbr_cont">
				<span className={`${active === "small" ? "active cp_action_text_size" : "cp_action_text_size"}`} onClick={() => handleTextSizeClick("small")}><img src="/images/toolbar/letter_s_gry.svg"  width={"11px"} height={"11px"} />Small</span>
				<span className={`${active === "medium" ? "active cp_action_text_size" : "cp_action_text_size"}`} onClick={() => handleTextSizeClick("medium")}><img src="/images/toolbar/letter_m.svg"  width={"12px"} height={"12px"} />Medium</span>
				<span className={`${active === "large" ? "active cp_action_text_size" : "cp_action_text_size"}`} onClick={() => handleTextSizeClick("large")}><img src="/images/toolbar/letter_l_gry.svg"  width={"14px"} height={"14px"} />Large</span>
			</div>
			<div onClick={() =>setFontActive(false)} className="btncncl">Cancel</div>
		</div> 
    <style jsx global>{`
        .fixtb_wrap{top: 0; z-index: 1111;position:fixed;left:0;height:47px;right:0;padding:8px 10px;box-shadow:0 3px 3px #0000001a;display:none;justify-content:flex-start;align-items:center; background-color:#fff}
        .fixtb_arr,.fixtb_wrap h3,.toolbr>div{display:inline-block;}
        .fixtb_wrap .fixtb_txt{font-size:16px;line-height:27px;margin-left:17px;z-index:0;} .fixtb_arr{box-sizing:border-box;position:relative;transform:scale(var(--ggs,1));width:22px;height:22px;vertical-align:middle;}			.fixtb_arr::after,.fixtb_arr::before{content:"";display:block;box-sizing:border-box;position:absolute;left:3px;}
        .fixtb_arr::after{width:8px;height:8px;border-bottom:2px solid;border-left:2px solid;transform:rotate(45deg);bottom:7px;}
        .fixtb_arr::before{width:16px;height:2px;bottom:10px;background:currentColor}
        .toolbr{position:absolute;right:20px;top:7px; display: flex; justify-content: center; align-items: center;}
        .toolbr>div{text-align:center;font-size:10px;color:#838383;line-height:16px;margin-right:10px;}
        .toolbr > div:last-child {
            margin-right: 0 !important;
        }
        .toolbr>div>img{display:block;margin:0 auto 3px;}.drptool{position:relative;}		
        .prog_bar{position:absolute;top:0;bottom:0;left:0;height:47px;width:20%;background-color:#fff3f4;border-bottom:2px solid #d7111b;}
        .toolbr > div > div {
            line-height: 32px;
            text-align: initial;
        }
        .btm_toolbr {position: fixed; bottom: -144px; left: 0; right: 0; background-color: #FFFFFF; box-shadow: 0px -7px 6px #000000b5; border-radius: 10px 10px 0px 0px; height: 144px; display: flex; align-items: center; flex-direction: column; justify-content: space-evenly;padding: 25px 0 7px;
        opacity: 0; transition: opacity 0.3s ease-out, bottom 0.3s ease-out;}
        .btm_toolbr.active{opacity: 1; bottom: 80px; z-index:9999999;}
        .btmtlbr_cont { background-color: #F2F2F2; box-shadow: 0px 3px 6px #00000029; border: 1px solid #D9E1E9; border-radius: 24px;max-height: 48px; display: flex; flex-wrap: nowrap; align-items: center;text-align: center;}
        .btmtlbr_cont span {text-align: center;color: #536379; text-transform: uppercase; padding: 0 30px; font-size: 12px; line-height: 20px; font-weight: 600;}
        .btmtlbr_cont span img {display: block; margin: 11px auto 3px;}
        .btmtlbr_cont .active {background-color: #fff;color: #032142;border: 1px solid #002145;}
        .btncncl { width: 90px; height: 30px; background: #7F7F7F 0% 0% no-repeat padding-box; border: 1px solid #D9E1E9; border-radius: 20px; color: #FFFFFF; text-transform: uppercase; font-size: 14px;line-height: 29px; text-align: center; margin-top: 15px;}
        .toolbr > .notifications {margin-top: -7px;}
        .toolbr > .notifications .notification_dd{right: -100px;}
        .toolbr.artoolbr > .notifications .notification_dd{right: -155px;}
        
        .spriteshare{background:url(/images/siteimages/news18-hn-sprite-icons.svg) no-repeat;width:40px;height:40px;display:block}
        .spriteshare.art-facebook-icon{background-position:-97px -4px}
        .spriteshare.art-whatsapp-icon{background-position:-9px -113px}
        .spriteshare.art-telegram-icon{background-position:-226px -4px}
        .spriteshare.art-twitter-icon{background-position:-139px -4px}
        .discvr{margin-top: -4px;}
         .toolbr .discvr img{margin-bottom: 1px;}
         
        `}</style>
    </>);
};
export default TopToolBarMobile;