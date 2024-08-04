import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from "includes/article.util";

const StateList = [
    { name: "Bangla", width: 120, height: 83, name_hi: "বাংলা", img: "/images/districts/G564.png",target:"_blank", url: "https://bengali.news18.com/"},
	{ name: "Marathi", width: 120, height: 83, name_hi: "मराठी", img: "/images/districts/G576.png",target:"_blank", url: "https://news18marathi.com/"},
    { name: "Gujarati", width: 51, height: 79, name_hi: "ગુજરાતી", img: "/images/districts/G558.png", target:"_blank", url: "https://gujarati.news18.com/"},
    { name: "Telugu", width: 55, height: 79, name_hi: "తెలుగు", img: "/images/districts/G573.png",target:"_blank", url: "https://telugu.news18.com/"},
    { name: "Tamil", width: 62, height: 78, name_hi: "தமிழ்", img: "/images/districts/G567.png", target:"_blank", url: "https://tamil.news18.com/"},
	{ name: "Kannada", width: 120, height: 83, name_hi: "ಕನ್ನಡ", img: "/images/districts/G579.png", target:"_blank", url: "https://kannada.news18.com/"},
	{ name: "Assamese", width: 120, height: 83, name_hi: "অসমীয়া", img: "/images/districts/G603.png", target:"_blank", url: "https://assam.news18.com/"},
	{ name: "Malayalam", width: 120, height: 83, name_hi: "മലയാളം", img: "/images/districts/G597.png", target:"_blank", url: "https://malayalam.news18.com/"},
    { name: "Punjabi", width: 80, height: 79, name_hi: "ਪੰਜਾਬੀ", img: "/images/districts/G561.png", target:"_blank", url: "https://punjabi.news18.com/"},
    { name: "Odia", width: 120, height: 83, name_hi: "ଓଡିଆ", img: "/images/districts/G26592.png",target:"_blank", url: "https://odia.news18.com/"},
]
const StatesSlider = ({ isMobile }) => {

    useEffect(() => {
        new Glide(document.querySelector('.state-slider-slide-in'),{
            autoplay:false,
            type:'carousel',
            perView: isMobile ? 4.3 : 8,
            rewind:false,
            gap:10,
            focusAt: 0,
            slidesToScroll:1,
            }).mount();
    }, []);
    return (<>
    <div className="state-slider">
		   <div className="state-slider-slide">
			  <div className="state-slider-slide-in">
				 <div data-glide-el="track">
					<ul>
                        {StateList.map((item, index) => (
                        <li key={`stat-${index}`} className="lp_local18_select_district">
                            <a href={item.url} target={item.target} className="lp_local18_select_district">
                                {!isMobile && <div>
                                    <LazyLoadImage
                                        src={imageLoader(item.img, item.width, item.height, true)}
                                        width={item.width}
                                        height={item.height}
										isLazyLoad={true}
                                    />
                                </div>}
                                <h3>{item.name}</h3>
                                <span>{item.name_hi}</span>
                            </a>
                        </li>
                        ))}
					</ul>
				 </div>
				 <div className="state-sliderarw" data-glide-el="controls">
					<button data-glide-dir="<"></button>
					<button data-glide-dir=">"></button>
				 </div>
				 <div data-glide-el="controls[nav]" className="state-sliderblt">
					<button type="button" data-glide-dir="=0"></button>
					<button type="button" data-glide-dir="=1"></button>
					<button type="button" data-glide-dir="=2"></button>
					<button type="button" data-glide-dir="=3"></button>
					<button type="button" data-glide-dir="=4"></button>
					<button type="button" data-glide-dir="=5"></button>
					<button type="button" data-glide-dir="=6"></button>
				 </div>
			  </div>
		   </div>
		</div>
    <style jsx>{`
        .state-slider{background:#F5F5F5;border: 1px solid #E8E8E8; padding: 0px 10px 13px 10px; margin: 10px 0 0; border-radius: 6px;}	

		.state-slider-slide{position: relative;}
		.state-slider-slide-in{margin: 0 22px; overflow: hidden;height: 168px; padding-top: 70px;}
		.state-slider-slide ul{display: flex;counter-reset: section;}
		.state-slider-slide ul li{background: #FFFFFF;box-shadow: 0px 0px 4px #0000001A;border: 1px solid #DBDBDB; border-radius: 6px; padding: 9px; position: relative; margin-bottom: 5px;}		
		.state-slider-slide ul li a{display: flex;justify-content: center;align-items: center; align-content: space-around;    flex-direction: column; color: #101010; font-size: 15px; line-height: 16px;     font-weight: normal;}
		.state-slider-slide ul li a div {vertical-align: bottom; height: 81px; position: absolute; top: -24px;left: 50%;  transform: translate(-50%, -50%); display: inline-flex;}
		.state-slider-slide ul li a img {align-self: self-end;}
		.state-slider-slide ul li a h3{font-size: 15px; line-height: 16px;margin-top: 20px; font-weight: normal;}
		.state-slider-slide ul li a span{ font-size: 15px; line-height: 16px;margin-top: 5px; font-weight: normal;}
		.state-sliderarw button{position: absolute;top: 50%;width: 25px;height: 32px;background: #FF0000;left: -10px;border-radius: 0px 4px 4px 0px;}
		.state-sliderarw button:last-child{right: -10px;left: auto;transform: rotate(180deg);}
		.state-sliderarw button:after, .state-sliderarw button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #fff;border-left: 1px solid #fff;transform: rotate(-45deg);top: 13px;}
		.state-sliderarw button:after{left:8px}
		.state-sliderblt{display: flex; gap:10px; justify-content: center; margin-top: 9px;}
		.state-sliderblt button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
		.state-sliderblt button.glide__bullet--active{background: #ED1C24;}
		@media (max-width:768px){
			.state-sliderarw{display:none;}
			.state-slider-slide-in{    
				margin: 0;
				height: 100px;
				padding-top: 10px;}
			.state-slider-slide ul li{
				padding: 10px;
				box-shadow: 0px 3px 6px #00000029;
				border: 0;
			}
			.state-sliderblt{margin-top: 12px;}
			.state-slider-slide ul li a h3{
				margin:0
			}
		}
    `}</style>
    </>)
};

export default StatesSlider;