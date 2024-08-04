import LazyLoadImage from "components/Common/CustomImage";
import { logEvent } from "includes/googleAnalytic";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import React,{useContext} from "react";
import dynamic from "next/dynamic";
const NotificationPopup = dynamic(() => import("components/Responsive/NotificationPopUp"));
import HindiGlobalContext from "HindiGlobalContext";

const TopToolBar = ({ headline = "", url = "", articleId = "", pageType = "" }) => {
    const [isShareWrapOpen, setShareWrapOpen] = React.useState(false);
    const { setSearchBar } = useContext(HindiGlobalContext);

    const handleFollowUs = () => {
        logEvent("ttb_article", "click", `whatsapp_follow,desktop`)
        var link = document.createElement('a');
        link.href = "https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
    };
    const handleTextSizeClick = (size) => {
        logEvent("ttb_article", "click", `font_resize_button,${size},desktop`);
        document.getElementById("artcle_content").setAttribute("class", "")

        // document.getElementById("artcle_content").classList.remove(size === "small" ? "large,medium" : size === "medium" ? "large,small" : "medium,small");
        document.getElementById("artcle_content").classList.add(size);
    };
    const handleBackClick = () => {
        logEvent("ttb_article", "click", "back_button,desktop");
        if(document.referrer.split('/')[2]!=location.hostname){
            window.location.href = publicRuntimeConfig.siteUrl;
            //User came from other domain or from direct
        }else{
            window.history.back();
            //User came from another page on your site
        }
    };
    return (<>
        <div className="fixtb_wrap">
            <div className="prog_bar" style={{ "width": "0%" }}></div>
            <span className="fixtb_arr cp_action_bar_back_btn" onClick={handleBackClick}></span>
            <span className="fixtb_txt">{headline}</span>
            <div className="toolbr">
                {/* <div><a href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l" target="_blank"><img src="/images/toolbar/whatsapp.svg" />FOLLOW US</a></div> */}
                {(pageType === "photogallery" || pageType === "videos" || pageType === "article" )
                ?<NotificationPopup pageType={pageType}/>
                :<div onClick={handleFollowUs}><img src="/images/toolbar/whatsapp.svg" />FOLLOW US</div>
                }
                <div className="discvr header_search_icon" onClick={()=>setSearchBar(pageType)}><img src="/images/toolbar/discover.svg" />DISCOVER</div>
                {(pageType !== "photogallery" && pageType !== "videos") &&
                    <div className="drptool cp_action_text_size">
                        <img className="cp_action_text_size" src="/images/toolbar/letter_l.svg" />TEXT SIZE
                        <div className="drptool_cont cp_action_text_size">
                            <span onClick={() => handleTextSizeClick("small")}><img src="/images/toolbar/letter_s.svg" />Small</span>
                            <span onClick={() => handleTextSizeClick("medium")}><img src="/images/toolbar/letter_m.svg" />Medium</span>
                            <span onClick={() => handleTextSizeClick("large")}><img src="/images/toolbar/letter_l.svg" />Large</span>
                        </div>
                    </div>
                }


                <div className="shar cp_action_bar_share" onClick={() => setShareWrapOpen((prev) => !prev)}><img src="/images/toolbar/share.svg" />SHARE
                    <span
                        className={`shr_wrp shr_wrp_opn`}
                    >
                        <span className="shr_lst">
                            <a
                                className="facebk shr_icn cp_action_bar_share"
                                href={
                                    "https://www.facebook.com/sharer.php?u=" + url + "&t=" + headline
                                }
                                target="_blank"
                                onClick={() => logEvent("ttb_article","click",`share_button,${headline}, ${articleId}, ${url}, facebook, desktop, non-amp`)}
                            >
                                <span className="spriteshare art-facebook-icon"></span>

                            </a>
                            <a
                                className="facebk shr_icn cp_action_bar_share"
                                href={
                                    "https://web.whatsapp.com/send?text=" + headline + "-" + url
                                }
                                target="_blank"
                                onClick={() => logEvent("ttb_article","click",`share_button,${headline}, ${articleId}, ${url}, whatsapp, desktop, non-amp`)}
                            >
                                <span className="spriteshare art-whatsapp-icon"></span>

                            </a>
                            <a
                                href={
                                    "https://telegram.me/share/url?url=?mini=true&url=" +
                                    url + "&t=" + headline
                                }
                                className="facebk shr_icn cp_action_bar_share"

                                target="_blank"
                                onClick={() => logEvent("ttb_article","click",`share_button,${headline}, ${articleId}, ${url}, facebook, desktop, non-amp`)}
                            >
                                <span className="spriteshare art-telegram-icon"></span>
                            </a>
                            <a
                                href={"https://twitter.com/share?text=" + headline + "&url=" + url}
                                className="facebk shr_icn"
                                target="_blank"
                                onClick={() => logEvent("ttb_article","click",`share_button,${headline}, ${articleId}, ${url}, twitter, desktop, non-amp`)}
                            >
                                <span className="spriteshare art-twitter-icon cp_action_bar_share"></span>
                            </a>
                        </span>
                    </span>
                </div>
                
                {/* <div><img src="/images/toolbar/share.svg" />SHARE</div> */}
            </div>
        </div>
        <style jsx global>{`
                .shr {
                    width: 32px;
                    height: 32px;
                    background-color: #f04b46;
                    border-radius: 50%;
                    display: block;
                    position: relative;
                }
                .shr:before {
                    content: "";
                    background-image: url(/images/impactShort/Share.svg);
                    width: 17px;
                    height: 17px;
                    display: block;
                    position: absolute;
                    left: -3px;
                    top: 7px;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                    margin: 0 auto;
                    right: 0;
                    bottom: 0;
                }
                .shr_wrp {
                    background-color: #fff;
                    border: 1px solid #c2cde3;
                    border-radius: 6px;
                    box-shadow: 0px 3px 6px #00000029;
                    display: block;
                    padding: 10px;
                    position: absolute;
                    left: auto;
                    right: 0;
                    bottom: 45px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
                    transform-origin: 100% 0;
                    transform: scale(0.9) translate(10px, 40px);
                  }
                  .shr_lst {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-width: 32px;
                  }
                  .shr_icn {
                    display: block;
                    margin: 0 0 10px;
                  }
                  .shr_icn img {
                    height: auto;
                    width: auto;
                    object-fit: cover;
                    display: block;
                  }
                  .shar{position:relative;}
                  .shar:hover .shr_wrp_opn{ display:block;}
                  
                  .shr_wrp_opn.shr_wrp {
                    opacity: 1;
                    visibility: visible;
                    transform: scale(1) translate(0px, 0px);
                    bottom: -222px;
                    right: -18px;
                    position:absolute;
                    display:none;   
                  }
    			.drptool_cont>span:nth-child(2),.fixtb_wrap{background-color:#fff}
                .fixtb_wrap{position:fixed;top: 0; z-index: 1111;left:0;height:47px;right:0;padding:8px 20px;box-shadow:0 3px 3px #0000001a;display:none;justify-content:flex-start;align-items:center}
                .fixtb_arr,.fixtb_wrap h3,.toolbr>div{display:inline-block; cursor: pointer;}
                .fixtb_wrap .fixtb_txt{font-size:16px;line-height:27px;margin-left:17px;z-index:0} .fixtb_arr{box-sizing:border-box;position:relative;transform:scale(var(--ggs,1));width:22px;height:22px;vertical-align:middle}			.fixtb_arr::after,.fixtb_arr::before{content:"";display:block;box-sizing:border-box;position:absolute;left:3px}
                .fixtb_arr::after{width:8px;height:8px;border-bottom:2px solid;border-left:2px solid;transform:rotate(45deg);bottom:7px}
                .fixtb_arr::before{width:16px;height:2px;bottom:10px;background:currentColor}
                .toolbr{position:absolute;right:20px;top:7px;display: flex; justify-content: center; align-items: center;}
                .toolbr>div{text-align:center;font-size:10px;color:#838383;line-height:16px;margin-right:16px}
                .toolbr>div>img{display:block;margin:0 auto 3px}.drptool{position:relative}			.drptool_cont{bottom:-128px;display:none; cursor: pointer; position:absolute;min-width:112px;z-index:1;text-align:left;background-color:#f2f2f2;box-shadow:0 3px 6px #00000029;border:1px solid #d9e1e9;border-radius:0 0 10px 10px;border-top:1px solid #ee1c25;left:-34px}
                .drptool_cont:before{content:"";position:absolute;top:-15px;left:43%;border:7px solid;border-color:transparent transparent #ee1c25}
                .drptool:hover .drptool_cont{display:block}			.drptool_cont>span{display:flex;justify-content:space-evenly;color:#545454;text-transform:uppercase;font-size:12px;line-height:20px;padding:10px;border-bottom:1px solid #707070;font-weight:700}
                .drptool_cont>span:last-child{border:0}			.prog_bar{position:absolute;top:0;bottom:0;left:0;height:47px;width:20%;background-color:#fff3f4;border-bottom:2px solid #d7111b}    
                .toolbr > .notifications {margin-top: -7px;}
                .spriteshare{background:url(/images/siteimages/news18-hn-sprite-icons.svg) no-repeat;width:40px;height:40px;display:block}
                .spriteshare.art-facebook-icon{background-position:-97px -4px}
                .spriteshare.art-whatsapp-icon{background-position:-9px -113px}
                .spriteshare.art-telegram-icon{background-position:-226px -4px}
                .spriteshare.art-twitter-icon{background-position:-139px -4px}
                .discvr{margin-top: -4px;}
                .notify{margin-top: -4px;}
                .toolbr .discvr img{margin-bottom: 1px;}
                .toolbr > div > div {
            line-height: 32px;
            text-align: initial;
        }
    

    `}</style>
    </>);
};

export default TopToolBar;