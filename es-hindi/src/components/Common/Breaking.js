import { useEffect } from "react";
import Glide from "@glidejs/glide";
import Slider from "react-slick/lib";
import { getRelativeURL } from "util/global/Helper";

const Breaking = ({ isMobile, data={}, isAmp=false }) => {
    if (!(data.alerts && data.alerts.length)) {
      return null;
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
    };

    useEffect(() => {
        if(data?.alerts?.length > 1 && !isMobile) {
            new Glide(".breakignews-sliderwrap", {
                type: "carousel",
                perView: 1,
                autoplay: 3000,
                startAt: 0
            }).mount();
        }
    }, []);

    return (
        <>
        {!isMobile ? (
            <div className="breakignews">
			<div className="container dflex">
				<h2 className="breakignews-hd">Breaking</h2>
				<div className="breakignews-sliderwrap">
					<div data-glide-el="track">
						<div className="breakignews-slider">
                            {data.alerts.map((item, index) => {
                                return (
                                    <h3 key={index}>
                                        <a className="events_ana breakingall" href={getRelativeURL(isAmp, item?.url)} data-label={item?.label} data-cat="breacking_news_D">{item?.label.replace(/\\/g, '')}</a>
                                    </h3>
                                );
                            })}
                        </div>
					</div>
					{data.alerts.length > 1 && <div className="" data-glide-el="controls"><button id="bkr" aria-label="bk-right" className="breakingarrow breakingarrowprvs" data-glide-dir="<"></button><button id="bkl" aria-label="bk-left" className="breakingarrow breakingarrownxt" data-glide-dir=">"></button></div>}
				</div>
			</div>
            <style jsx global>
            {`.breakignews-sliderwrap{position:relative;overflow:hidden;width:100%}.breakignews{height:40px;width:100%;background:#2f2f2f;line-height:40px;overflow:hidden}.breakignews-hd{background:#464545;padding:0 18px;color:#fff;font-size:20px;font-weight:700;text-transform:uppercase;border-right:1px solid #111}.breakignews-slider{overflow:hidden;display:flex}.breakignews-slider h3{padding-left:22px;border-left:1px solid #555;position:relative;width:100%;box-sizing:border-box}.breakignews-slider h3 a{color:#fff;font-size:16px;font-weight:400;display:block}.breakignews-slider .glider-track{display:flex;overflow:hidden}.exclusivenews{background:#f2f2f2;padding:5px 0;}`}
            </style>
		</div>
            ) :
            (
                <>
                <div id="brknews" style={{ display: "none" }}></div>
                <article className="tpbrknws clearfix">
		            <h2>Breaking News</h2>
		            <Slider className="ticker" {...settings}>
                        {data.alerts.map((item, index) => {
                                return (
                                    <li key={index} className="slick-slide" rel={item?.label}><a href={getRelativeURL(isAmp, item?.url)} onClick={`ga('send', 'event', 'BreakingNews_story', 'Click', ${item?.label}`}>{item?.label.replace(/\\/g, '')}</a></li>
                                );
                            })}
                    </Slider>
		        </article>
                <div className="clearfix vsp10"></div>
                <style jsx global>
                    {`.tpbrknws{background:#ed1c24;box-shadow:-2px 2px 2px #ccc;position:relative;padding:20px 15px 15px 15px;box-sizing:border-box;margin:20px 15px 0 0}.tpbrknws:after{content:"";border-top:12px solid #5e0b0e;border-left:12px solid #5e0b0e;position:absolute;top:0;right:0;border-right:12px solid #fff;border-bottom:12px solid #fff;visibility:visible;transform:rotate(-90deg)}.tpbrknws h2,.tpbrknws h3{font-size:12px;color:#ed1c24;padding:2px 15px;font-weight:800;margin-bottom:8px;position:absolute;border:2px solid #ed1c24;top:-15px;left:0;background:#fff;box-shadow:0 3px 2px #d10d15}.ticker{font-size:14px;overflow:hidden;position:relative}.ticker li a{color:#fff;font-size:16px;line-height:20px;font-weight:700;padding:0 1px;display:block}.ticker .slick-arrow{display:none${!isAmp ? "!important" : ""};}.ticker .slick-track{display:flex}.ticker .slick-dots{display:flex ${!isAmp ? "!important" : ""};justify-content:center;padding-top:5px}.ticker .slick-dots li{width:8px;height:8px;border-radius:100%;background:#a81319;margin-left:4px}.ticker .slick-dots li button{display:none${!isAmp ? "!important" : ""};}.ticker .slick-dots li.slick-active{background:#fff}.tpbrknws-more span:before{left:-7px}.tpbrknws-more span:after{right:-7px}.ticker .slick-slide{position:absolute;}.ticker .slick-slide:first-child{position:relative;}.ticker.slick-initialized .slick-slide,.ticker.slick-initialized .slick-slide:first-child{position:relative;} .ticker .slick-arrow {${isAmp ? "visibility: hidden;" : ""}}`}
                </style>
                </>
            )
        }
    </>
    );
};

export default Breaking;
