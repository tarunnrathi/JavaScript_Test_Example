import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect, useState } from "react";

const imagesList = [
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi-2024-01-991eb191df74c21b129dff410584c457.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi2-2024-01-5bab957a41fc3196eac2fefc722c971b.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi3-2024-01-c96a5c6c9990bb033d9b9ed06ebfd656.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi4-2024-01-0a07f27753847c99600aba565162f06f.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi5-2024-01-c51331c6cb43b35af31074c0af5d0641.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi6-2024-01-a17a08c40662503ce4104c5e41318302.png"
  ]
const RamMandirMap = ({ isMobile = false }) => {

    const [popup, setPopup] = useState(false);
    const handlePopup = (active, index) => {
        console.log(index, "vdvdbfbjh")
        setPopup(active)
        active && setTimeout(() => {new Glide(".popshvsldnn", {
            autoplay: false,
            type: "carousel",
            perView: 1,
            startAt: index,
            gap: 0,
            slidesToScroll: 1,
            }).mount();
        }, 100)
        }
    return (<>
        <div className="rmpht">
            <h2 className="rmgblhd">पूरा रामायण पथ देखें</h2>
            <p></p>
            <div className="rmwrp">
                <div className="shvsldn">
                    <div data-glide-el="track">
                        <div className="shvsldnlitm">
                                <figure>
                                    <div className="popup-link" onClick={() => handlePopup(true, 0)}><span className="ggmax"></span></div>
                                    <LazyLoadImage alt={"ram mandir katha"} width={isMobile ? 293 : 315} height={315} src={imagesList[0]} />
                                </figure>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="morepht"><span onClick={() => handlePopup(true, 0)} >यहां देखें रामायण पथ</span></div>
            </div>
        {popup && <div className="popup-container popup-style-2">
			<div className="popup-content">
				<span onClick={() => handlePopup(false)} className="close">&times;</span>
				<div className="rmvrtlphvd">
					<div className="popshvsldnn">
					  <div data-glide-el="track">
						<div className="popshvsldnnlitm">
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
        .rmpht{padding: 10px 25px;
            position: relative;
            width: 50%;}
            .rmpht p {
                margin-bottom: 57px;
            }
        @media (max-width: 769px){
        .rmpht {width: 100%;  padding: 20px 10px; background: #fbe1cd;}	
        .rmpht .rmwrp{display: block;}
        .rmgblhd:after { width: 320px !important; background-size: 320px;}
        
        }

        .rmgblhd{text-align: center;color: #000000;font-size: 30px;line-height: 22px; margin-bottom: 0;}	
        .rmgblhd:before, .rmgblhd:after{content: ""; display: block; margin: auto;}
        .rmgblhd:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
        .rmgblhd:after{background: url(/images/rammandir/hdbtmarw.svg) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
        .morepht { position: relative; margin: 5px 0 0; text-align: center;}
        .morepht span { height: 35px;line-height: 35px; color: #fff; background: transparent linear-gradient(180deg,#f37a1f 0%,#bc5405 100%)0%0%no-repeat padding-box; border-radius: 4px; font-size: 15px; padding: 0 30px; display: table; margin: auto; position: relative; cursor: pointer; text-decoration: none;}
        .ggmax {box-sizing: border-box;position: relative;display: block;transform: scale(var(--ggs,1));width: 14px;height: 14px;box-shadow: -6px -6px 0 -4px, 6px 6px 0 -4px, 6px -6px 0 -4px, -6px 6px 0 -4px}
        .ggmax::after, .ggmax::before {content: "";display: block;box-sizing: border-box;position: absolute;border-radius: 3px;width: 22px;height: 2px;border-left: 9px solid; border-right: 9px solid; transform: rotate(-45deg); bottom: 6px; left: -4px}
        .ggmax::before {transform: rotate(45deg);} 
        .popup-link{display: flex; flex-wrap: wrap; z-index: 1;  position: absolute; right: 5px;top: 4px; background: #fff; padding: 8px; width: 30px; height: 30px; border-radius: 4px;}
        .popup-link span{color: #080707; border-radius: 3px; cursor: pointer; text-decoration: none;}
        .popup-link:hover{background: #d8d8d8;}
        
        .rmvrtlphvd{position: relative; padding: 20px 0; margin: 30px 0 0; border: 1px solid #eae9ea}
        .rmvrtlphvd .rmwrp{display: flex; justify-content: space-between; z-index: 1;} 

        .shvsldn{overflow: hidden; width: 500px; margin: 45px; margin-bottom: 0px;}
        .shvsldnlitm{display: flex; margin-bottom: 10px;}
        .shvsldnlitm div{overflow: hidden; }
        .shvsldnlitm div figure{width: 100%; position: relative;overflow: hidden; text-align: center;}
        .shvsldnlitm div figure img{width: 100%; border-radius: 0px; min-height: 315px;}
        .shvsldnlitm div p{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0; font-weight: normal;}
        .shvar button{position: absolute;top: 44%;width:35px;height: 35px;background: #f0781d;left: 10%;border-radius: 100%; border: none; outline: none; cursor: pointer;}
        .shvar button:last-child{right: 10%;left: auto;transform: rotate(180deg);}
        .shvar button:after, .shvar button:before {content: "";position: absolute;width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;transform: rotate(-45deg); top: 13px; left: 12px;}
        .shvar button:after{left:17px;}
        .shvsldnlitm figure img {transform: none;}
        .shvsldnlitm figure {margin: auto;}

        .popup-container {position: fixed;z-index: 11;left: 0;top: 0;width: 100%;height: 100%;background-color: rgb(21 17 17 / 95%);display: flex;align-items: center;}
        .popup-container{visibility: visible;opacity: 1;transform: scale(1); transition: all 0.3s ease-in-out;}
        .popup-content {margin: auto;width: 50%;}
        .popup-content p{font-size: 17px;padding: 10px;line-height: 20px;}
        .popup-content span.close{color: #ffffff;float: right;font-size: 40px;font-weight: bold;background: none;padding: 0;margin: 0;text-decoration: none;position: absolute;top: 0;right: 1%; z-index: 1111; line-height: 1; cursor: pointer;}
        .popup-content .rmvrtlphvd{border:0; margin: 0; padding: 0;}        
        .popshvsldnn{overflow: hidden; margin: 0 30px; padding: 5px 0;}
        .popshvsldnnlitm{display: flex; margin-bottom: 10px;}
        .popshvsldnnlitm div{overflow: hidden;}
        .popup-content .popshvsldnnlitm div figure{width: 100%; position: relative;overflow: hidden; margin: 0; text-align: center;}
        .popup-content .popshvsldnnlitm div figure img{width: 100%; border-radius: 0px; max-height: calc(calc(var(--vh,1vh)*100) - 0); transform: none;}
        .popshvsldnnlitm div p{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0; font-weight: normal;}
        .popup-content .shvar button{top: 45%; left: -14px;}
        .popup-content .shvar button:last-child{right: -14px; left: unset;}
    
        @media (max-width: 769px){
            .rmvrtlphvd .rmwrp{display: block;}
            .rmgblhd:after { width: 320px !important; background-size: 320px;}
            .shvar button:last-child{right: 5px; top: 40%;}
            .shvar button{left: 5px; top: 40%;}
            .popup-content{width:100%;}
            .popshvsldnn{margin:0;}
            .popup-content .popshvsldnnlitm div figure img{100%; margin: 0 auto;}
            .popup-content span.close{top: 6%; right: 2%;}
            .shvsldn {
                width: fit-content;
                margin: 0 auto;
            }
            .rmpht p {
                margin-bottom: 30px;
            }
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

export default RamMandirMap;