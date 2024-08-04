import React from "react";
import { useEffect } from "react";
import Glide from '@glidejs/glide';
import { imageLoader } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";

const HomeEventSlider = ({ eventSlider = {} }) => {
	if (!Object.keys(eventSlider).length) {
    return null;
  }
  const { title } = eventSlider;

  useEffect(() => {
    if (eventSlider.result && eventSlider.result.length) {
      callSlider();
    }
  }, []);

  function callSlider() {
    if (document.getElementsByClassName("ayodhyaspecial-slider").length) {
      new Glide(".ayodhyaspecial-slider", {
        autoplay: 4000,
        type: "carousel",
        perView: 5.5,
        rewind: false,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 1.5,
          },
        },
      }).mount();
    }
  }
	return (
		<>

			<div className="ayodhyaspecial">
				{
					eventSlider.display !== "0" ?
						<>
							{title ?
								<>
									<div className="globalhd large">
										<h2>{title}</h2>
									</div>
									<div className="clearfix"></div></> : ""}
							{eventSlider?.image ? <div className="ayodhyabanner">
								<a href={eventSlider.url ? eventSlider.url.replace("https://hindi.news18.com", "") : ''}
									onClick={() => logEvent("event", "Click-home", eventSlider.bannerGa)}>
									<figure>
										<img src={eventSlider.image} />
									</figure>
								</a>
							</div> : ""}
						</> : ''
				}
				<div className="ayodhyaspecial-slider glide__slides">
					<div data-glide-el="track">
						<ul >
							{eventSlider.result?.map((item, index) => {
								const width = 216;
								const height = 144;
								const imageSrc = imageLoader(item.thumbnail, width, height);
								return (
                  <li key={index} className="glide__slide">
                    <a
                      href={
                        item.url
                          ? item.url.replace("https://hindi.news18.com", "")
                          : ""
                      }
                    >
                      {/* <LazyLoadImage src={imageSrc} alt={item.title || ''} width={width} height={'102px'}/> */}
                      <>
                        <img
                          src={imageSrc}
                          alt={item.title || ""}
                          width={width}
                          height={"102px"}
                          loading="lazy"
                        ></img>
                        <figcaption>
                          <h2>{item.display_headline || item.title}</h2>
                        </figcaption>
                      </>
                    </a>
                  </li>
                );
							}
							)}
						</ul>
						<div className="ayodhyaspecial-slider-button" data-glide-el="controls">
							<button data-glide-dir="<"></button>
							<button data-glide-dir=">"></button>
						</div>
					</div>
				</div>

			</div>
			<style jsx global>{`
			.skeleton-background {
				border-radius: 10px;
				padding : 5px;
				background-color: rgba(0,0,0,0.03);
				overflow : hidden;
			}
			.home-event-slider-skeleton ul {
				width : 1000px;
				display: flex;
				flex-direction: row;
				margin-top : 15px;
				
			}
			.home-event-slider-skeleton ul li{
				margin-right: 10px;
				border-radius: 10px;
				width : 153px;
				display: inline-block;
				overflow : hidden;
			}

			.Event-loader {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 600px;
				background-color: rgba(0,0,0,0.05);
				margin-top: 20px;
				border-radius: 10px;
        	}
			.ayodhyaspecial-slider ul li a h3 {
				padding: 15px;
				color: #111;
				font-size: 15px;
				line-height: 20px;
			}
			.ayodhyaspecial-slider ul li:hover h3 {
				color: #fff;
			}
			.ayodhyaspecial{
				max-width:1245px;
				margin:0 auto
			}
			.ayodhyabanner{justify-content:center;line-height:0;border-bottom:2px solid #eee;margin-bottom:15px;position:relative}
			.ayodhyabanner .aurbhi-button{position:absolute;bottom:10px;right:-5px}
			.ayodhyabanner img{width:100%}
			.ayodhyaspecial-slider{position:relative;overflow:hidden;margin-bottom:20px;margin-top:10px}
			.ayodhyaspecial-slider ul{display:-webkit-box}
			.ayodhyaspecial-slider ul li{border-radius:10px;overflow:hidden;border:1px solid #e3e3e3}
			.ayodhyaspecial-slider ul li a figure{width:100%;line-height:0;height:106px;overflow:hidden}
			.ayodhyaspecial-slider ul li a figure img{width:100%; background-color: #8080802e;}
			.ayodhyaspecial-slider ul li a h2{padding:15px;color:#111;font-size:15px;line-height:20px}
			.ayodhyaspecial-slider ul li:hover{background:#ed1b24}
			.ayodhyaspecial-slider ul li:hover a h2{color:#fff}
			.ayodhyaspecial-slider-button button{position:absolute;top:61px;left:0;background:rgba(0,0,0,.8);width:28px;height:40px;border:1px solid #eee;outline:0;border-radius:0 8px 8px 0;margin:-1px;cursor:pointer}
			.ayodhyaspecial-slider-button button:before{content:"";width:12px;height:12px;position:absolute;top:13px;left:10px;border-top:2px solid #fff;border-left:2px solid #fff;transform:rotate(-45deg)}
			.ayodhyaspecial-slider-button button:last-child{left:auto;right:0;transform:rotate(180deg)}
			.ayodhyaspecial-slider-button button:hover{background:#ed1b24}
			
			
      `}</style>
		</>
	);
};

export default HomeEventSlider;
