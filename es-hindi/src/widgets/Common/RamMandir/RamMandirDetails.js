import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import FakeYTPlayer from "components/Common/FakeYTPlayer";
import { newVidgyorScript } from "includes/article.util";
import React, { useEffect, useState } from "react";
import RamMandirMap from "./RamMandirMap";

const imagesList = [
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-01-2024-01-1c060c97fd60a6a6859034863909725c.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-02-2024-01-3eb007cf32ae79996014b69bd49f3c8c.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-03-2024-01-699fb17c10a78dddc9615df39e666db3.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-04-2024-01-43b14c59821ae1e84ce1584bd9dfa7e7.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-05-2024-01-6596408a34ab0536568def697248e801.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-06-2024-01-fb88aba54aca7fec2db5bd72d231a63a.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-07-2024-01-1944fc11011f1a26a049530d9191d96a.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-08-2024-01-22f3d125af63c073658c5cf8f8757e88.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-09-2024-01-9929ca6171d62af9d53b87dbc7cb540e.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-10-2024-01-c218be2f9b49a9c65dc2d290dced4d86.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-11-2024-01-ab53e83dfb0ab72d948936c9654016f1.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-12-2024-01-afaa5bf10d4374b47f417a17c9e548fc.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-13-2024-01-269b0874d7d1eccaacf6bf1ae2412058.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-14-2024-01-7058f9397540ebf9fd35559a8eae1d2d.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-16-2024-01-25d833c0338f2fd071f5e402174fa616.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-17-2024-01-554fb902cb56fa388dd25b05ad4e3140.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-18-2024-01-fd594da2ae8ff947ff518a4cacdded5d.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-19-2024-01-46db86463073608f6f6e4cce39acca13.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-20-2024-01-540fbcd9f222de346cf17feb7fe33291.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-21-2024-01-bbcafa47838d6145c2cc219db98b7eef.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-22-2024-01-9541d44f5712d016b605aebae1010fcc.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-23-2024-01-5e6f2d7e86dd755eb282a7dbf3491aa2.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-25-2024-01-3f7ce4d5ff71343e3ee035611e8a6430.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-26-2024-01-e9a48cd4e7ccee225cb818b37b4824a9.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-27-2024-01-375c46267a7768ed4eba243c25ec978d.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-29-2024-01-40d719d8a5cb8321f8118fbd357dfb06.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-30-2024-01-8dddacf4e2a895a6d34de38fa1cb7165.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-31-2024-01-8f7ff3da9860aa4c37decf440faa0e04.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-32-2024-01-c3acfc23c640515773780f5477256ea7.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-33-2024-01-b4c2dc299fc241e9affe8d96c844f961.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-34-2024-01-a290c6aafe98997cb13c992b4d4faac8.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-35-2024-01-76cc45cdcac099433286e89e3d3def1e.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-36-2024-01-7e561011682ef96237493ae04f68018d.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-37-2024-01-ac9083289fd314cadc9d3ac94da8c773.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-38-2024-01-45369143967dd227d6a6f94d447b9c7b.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-39-2024-01-1c2c3cfc6962b316136758466e4ca3fc.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/ramayana-2023-hindi-41-2024-01-0300a73e8ddb9bc19a1d29e8705564f2.png"
  ]
const RamMandirDetails = ({ isMobile = false }) => {

    const [popup, setPopup] = useState(false);
    const handlePopup = (active, index) => {
        console.log(index, "vdvdbfbjh")
        setPopup(active)
        active && setTimeout(() => {new Glide(".popshvsld", {
            autoplay: false,
            type: "carousel",
            perView: 1,
            startAt: index,
            gap: 0,
            slidesToScroll: 1,
            }).mount();
        }, 100)
        }
    useEffect(() => {
        newVidgyorScript();
        
    }, []);

    return (<>
    <div className="rmvrtlphvd">
        <div className="rmwrp">
        <div className="rmvrtlphvdl">
            <h2 className="rmgblhd">पूरी राम कथा का आनंद लें</h2>
            <p>यहां देखें राम कथा</p>
            <div className="shvsld">
                <div data-glide-el="track">
                    <div className="shvsldlitm">
                            <figure>
                                <div className="popup-link" onClick={() => handlePopup(true, 0)}><span className="ggmax"></span></div>
                                <LazyLoadImage alt={"ram mandir katha"} width={isMobile ? 293 : 315} height={315} src={imagesList[0]} />
                            </figure>
                       
                        </div>
                    </div>
            </div>
            <div className="morepht"><span onClick={() => handlePopup(true, 0)} >यहां देखें राम कथा</span></div>
           
        </div>
        <RamMandirMap isMobile={isMobile} />
        {/* <div className="rmvrtlphvdr">
            <h2 className="rmgblhd">राम मंदिर का वर्चुअल टूर</h2>
            <p>अंदर जाकर मंदिर को देखें</p>
            <FakeYTPlayer width={ isMobile? 300 : 500} playerId={"vidgyorPlayer9"} height="315" src={"A8tfIMy0O8g"} headline={"Ram Mandir"} />
        </div>  	 */}
        </div>	
        </div>
        {popup && <div className="popup-container popup-style-2">
			<div className="popup-content">
				<span onClick={() => handlePopup(false)} className="close">&times;</span>
				<div className="rmvrtlphvd">
					<div className="popshvsld">
					  <div data-glide-el="track">
						<div className="popshvsldlitm">
                            {imagesList.map(itm => (<div>
                                <figure>
                                    <LazyLoadImage alt={"ram mandir katha"} width={isMobile ? 350 : 500} height={isMobile ? 350 : 500} src={itm} />
                                </figure>
                        
                            </div>))}
						 </div>
					  </div>
					  <div className="shvar" data-glide-el="controls">
						 <button data-glide-dir="<"></button>
						 <button data-glide-dir=">"></button>
					  </div>
				   </div>
				</div>
			</div>
		</div>}
        <style jsx>{`
        .rmgblhd{text-align: center;color: #000000;font-size: 30px;line-height: 22px; margin-bottom: 0;}	
        .rmgblhd:before, .rmgblhd:after{content: ""; display: block; margin: auto;}
        .rmgblhd:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
        .rmgblhd:after{background: url(/images/rammandir/hdbtmarw.svg) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
        .morepht {
            position: relative;
            margin: 5px 0 0;
            text-align: center;
        }
        .ggmax {box-sizing: border-box;position: relative;display: block;transform: scale(var(--ggs,1));width: 14px;height: 14px;box-shadow: -6px -6px 0 -4px, 6px 6px 0 -4px, 6px -6px 0 -4px, -6px 6px 0 -4px}
        .ggmax::after, .ggmax::before {content: "";display: block;box-sizing: border-box;position: absolute;border-radius: 3px;width: 22px;height: 2px;border-left: 9px solid; border-right: 9px solid; transform: rotate(-45deg); bottom: 6px; left: -4px}
        .ggmax::before {transform: rotate(45deg);} 
        .popup-link{display: flex; flex-wrap: wrap; z-index: 1;  position: absolute; right: 5px;top: 4px; background: #fff; padding: 8px; width: 30px; height: 30px; border-radius: 4px;}
        .popup-link span{color: #080707; border-radius: 3px; cursor: pointer; text-decoration: none;}
        .popup-link:hover{background: #d8d8d8;}
        
        .morepht span {
            height: 35px;
            line-height: 35px;
            color: #fff;
            background: transparent linear-gradient(180deg,#f37a1f 0%,#bc5405 100%)0%0%no-repeat padding-box;
            border-radius: 4px;
            font-size: 15px;
            padding: 0 30px;
            display: table;
            margin: auto;
            position: relative;
            cursor: pointer; text-decoration: none;
        }
        
        
        .rmvrtlphvd{position: relative; padding: 20px 0; margin: 30px 0 0; border: 1px solid #eae9ea}
.rmvrtlphvd:before, .rmvrtlphvd:after{content: ""; position: absolute;top: 0; bottom: 0; width: 50%;}
.rmvrtlphvd:before{background: #ffeddf;left: 0}
.rmvrtlphvd:after{background: #fbe1cd; right: 0}
.rmvrtlphvd .rmwrp{display: flex; justify-content: space-between; z-index: 1;} 
.rmvrtlphvdl{width: 50%;  padding: 10px 25px; position: relative;}
.rmvrtlphvdr{width: 50%;padding:10px 25px;}


.shvsld{overflow: hidden; width: 315px;
    margin: 0 auto;}
.shvsldlitm{display: flex; margin-bottom: 10px;}
.shvsldlitm div{overflow: hidden; }
.shvsldlitm div figure{width: 100%; position: relative;overflow: hidden; text-align: center;}
.shvsldlitm div figure img{width: 100%; border-radius: 0px; min-height: 315px;}
.shvsldlitm div p{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0; font-weight: normal;}
.shvar{}
.shvar button{position: absolute;top: 60%;width:35px;height: 35px;background: #f0781d;left: 18%;border-radius: 100%; border: none; outline: none; cursor: pointer;}
.shvar button:last-child{right: 18%;left: auto;transform: rotate(180deg);}
.shvar button:after, .shvar button:before {content: "";position: absolute;width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;transform: rotate(-45deg); top: 13px; left: 12px;}
.shvar button:after{left:17px;}
.shvsldlitm figure img {
    transform: none;
}

.rmvrtlphvdl p, .rmvrtlphvdr p {
    margin-bottom: 30px;
    text-align: center;
    color: #f0781d;
    font-weight: bold;
}
    .popup-container {position: fixed;z-index: 11;left: 0;top: 0;width: 100%;height: 100%;background-color: rgb(21 17 17 / 95%);display: flex;align-items: center;}
    .popup-container{visibility: visible;opacity: 1;transform: scale(1); transition: all 0.3s ease-in-out;}
    .popup-content {margin: auto;width: 50%;}
    .popup-content p{font-size: 17px;padding: 10px;line-height: 20px;}
    .popup-content span.close{color: #ffffff;float: right;font-size: 40px;font-weight: bold;background: none;padding: 0;margin: 0;text-decoration: none;position: absolute;top: 0;right: 1%; z-index: 1111; line-height: 1; cursor: pointer;}
    
    .popup-content .rmvrtlphvd{border:0; margin: 0; padding: 0;}
    .popup-content .rmvrtlphvd:before, .popup-content .rmvrtlphvd:after {
        display: none;
    }
    .popshvsld{overflow: hidden; margin: 0 30px; padding: 5px 0;}
    .popshvsldlitm{display: flex; margin-bottom: 10px;}
    .popshvsldlitm div{overflow: hidden;}
    .popup-content .popshvsldlitm div figure{width: 100%; position: relative;overflow: hidden; margin: 0; text-align: center;}
    .popup-content .popshvsldlitm div figure img{width: 100%; border-radius: 0px; max-height: calc(calc(var(--vh,1vh)*100) - 0); transform: none;}
    .popshvsldlitm div p{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0; font-weight: normal;}
    .popup-content .shvar button{top: 45%; left: -14px;}
    .popup-content .shvar button:last-child{right: -14px; left: unset;}
    
@media (max-width: 769px){
.rmvrtlphvd .rmwrp{display: block;}
.rmvrtlphvdl, .rmvrtlphvdr{width: 100%; padding: 20px 10px;}
.rmvrtlphvd:before, .rmabt:after{display: none;}
.rmvrtlphvdl{background: #FFEDDF;}
.rmvrtlphvdr{background: #FBE1CD;} 
.rmgblhd:after { width: 320px !important; background-size: 320px;}
.rmvrtlphvd:before, .rmvrtlphvd:after{display:none;}
.shvsld{width: fit-content;
    margin: 0 30px;}
.shvar button:last-child{right: 12px; top: 60%;}
.shvar button{left: 10px}
.popup-content{width:100%; padding: 0 20px;}
.popshvsld{margin:0;}
.popup-content .popshvsldlitm div figure img{100%; margin: 0 auto;}
.popup-content span.close{top: 6%; right: 2%;}
.popup-content .shvar button {
    position: relative;
    left: unset !important;
    right: unset !important;
    margin-right: 10px;
}
.popup-content .shvar{text-align: center;} 
}
`}</style>
    </>)
};

export default RamMandirDetails;