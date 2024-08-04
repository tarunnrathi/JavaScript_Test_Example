import { useEffect, useState } from "react";
import { getArticleList } from "api/global/Common";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import LazyLoadImage from "components/Common/CustomImage";
import Glide from "@glidejs/glide";

const MovieReviewWidget = ({ data = [] }) => {
    const [getData, setGetData] = useState(data);

    useEffect(() => {
        getReviewData();
    }, []);
    const getReviewData = async () => {
        const result = await getArticleList({
            count: 6,
            offset: 0,
            filter: { 'categories.slug': 'film-review' },
            fields: `story_id,headline,images,display_headline,weburl,intro,movie_review`
        }, true);
        if (result.length > 0) {
            setGetData(result);
        }
    }
    useEffect(() => {
        const reviewGlide = document.querySelector('.movreview-slide-in');
        if (!reviewGlide) return;
            let glide = new Glide(reviewGlide, {
                autoplay: false,
                type: 'carousel',
                perView: 1.3,
                rewind: false,
                gap: 20,
                focusAt: 0,
                slidesToScroll: 1,
            });
        

        const left = document.querySelector('.arrow_left');
        const right = document.querySelector('.arrow_right');
    
        glide.mount();
    
        const updateArrows = () => {
          if (left) {
            if (glide.index === 0) {
              left.disabled = true; // Disable on first slide
              left.classList.remove('active');
            } else {
              left.disabled = false; // Enable on other slides
              left.classList.add('active');
            }
          }
    
          if (right) {
            if (glide.index == getData.length-1) {
              right.disabled = true; // Disable on last slide
              right.classList.remove('active');
            } else {
              right.disabled = false; // Enable on other slides
              right.classList.add('active');
            }
          }
        };
    
        glide.on(['mount.after', 'run'], updateArrows);
    
        // Initial arrow state
        updateArrows();
    
        return () => {
          glide.destroy();
        };
    },[getData])
    return (
        <>
            {getData?.length ?
                <>
                    <div className="newglblhdwrap"><h2 className="newglblhd">मूवी रिव्यु</h2></div>

                    <div className="movreview">
                        <div className="movreview-slide">
                            <div className="movreview-slide-in">
                                <div data-glide-el="track">
                                    <ul>
                                        {getData.map((data, idx) =>
                                            <li key={`movieReview_${idx}`}>
                                                <a href={data?.weburl}>
                                                    {
                                                        data?.images?.url &&

                                                        <figure width={218}
                                                            height={145}>
                                                            <LazyLoadImage
                                                                src={data?.images?.url}
                                                                width={210}
                                                                height={145}
                                                                alt={data.display_headline}
                                                                title={data.display_headline}
                                                            />
                                                        </figure>

                                                    }
                                                    <figcaption>
                                                        <span className="catg1">{data.movie_review?.movie_name}</span>
                                                        <h3>{data.intro.substring(0, 100)+(data.intro.length>100?'...':'')}</h3>
                                                        {data.movie_review?.movie_rating?.length ?
                                                            <div className="btm_wrap">
                                                            <span className="catg2">यूजर रेटिंग</span>
                                                            <div className="rate"><img src="/images/icons/star.svg" />{data.movie_review?.movie_rating}</div>
                                                        </div>
                                                        :null}
                                                    </figcaption>
                                                </a>
                                            </li>
                                        )
                                        }
                                    </ul>
                                </div>

                                <div className="movreviewarw" data-glide-el="controls">
                                    <button className='arrow_left' data-glide-dir="<"></button>
                                    <button className="arrow_right" data-glide-dir=">"></button>
                                </div>

                                {/* <div data-glide-el="controls[nav]" className="movreviewbullet">
                                    {getData?.length && getData.map((data, idx) => (
                                        <button type="button" data-glide-dir={`=${idx}`} key={`movie-review-btn_${idx}`}
                                        ></button>))}
                                </div> */}
                                <a href={publicRuntimeConfig.siteUrl + 'news/entertainment/film-review/'} className="moretrndstroy">और भी पढ़ें</a>

                            </div>
                        </div>
                    </div>
                </>
                : null}
                <style jsx global>
                    {
                        `
                        .movreview-slide ul li a figure img{width: 100%; height: 100%;}
                        `
                    }

                </style>
            <style jsx>
                {
                    `
                    .movreview{background:#F3F3F3; padding: 20px 0 20px 10px;  font-family: "Mukta",sans-serif;} 

		.movreview-slide{position: relative;}
		// .movreview-slide-in{margin: 0 22px; overflow: hidden; padding-top:3px;}
		.movreview-slide ul{display: flex;counter-reset: section;}
		.movreview-slide ul li{position: relative; }
		
		// .movreview-slide ul li a{display: flex;}
		// .movreview-slide ul li a figure{width: 190px; height: 127px; flex-shrink: 0; margin-right: 15px;}
		
		// .movreview-slide ul li a h3{color: #000000; font-size: 14px; line-height: 23px; font-weight: normal}
		// .catg1 {  font-size: 20px;line-height: 34px; color: #000; font-weight: bold;}
		.catg2 {font-size: 14px; line-height: 23px; color: #000; font-weight: bold;}
		.btm_wrap {display: flex; align-items: center;}
		.rate {width: 55px; height: 18px; border-radius: 20px; background-color: #F00004;color: #fff;font-weight: bold; font-size: 14px;line-height: 18px; margin-left: 15px; display: flex; justify-content: center;align-items: center;}
		.rate img {width: 10px; height: 10px;     margin-right: 5px;}

		// .movreviewarw button{position: absolute;top: 35%;width: 25px;height: 32px;background: #EA3323;left: -10px;border-radius: 0px 4px 4px 0px;}
		.movreviewarw button:last-child{right: 7px;left: auto;transform: rotate(180deg);}
		// .movreviewarw button:before {content: ""; position: absolute; width: 10px; height: 10px; border-top: 2px solid #fff;   border-left: 2px solid #fff; transform: rotate(-45deg); top: 10px; left: 9px;}
		// .movreviewbullet{ display: none; }

			.movreview-slide ul li a {display: flex; flex-direction: column;}
			.movreview-slide ul li a figure {width: 100%;height: 100%; margin-right: 0; flex-shrink: 0; }
			.movreview-slide-in{margin: 0;overflow: hidden; padding-top:3px;}
			.catg1{font-size: 16px; line-height: 27px;color: #000; font-weight: bold;}
			.movreview-slide ul li a figcaption {margin: 10px 0;}
			.movreview-slide ul li a h3{line-height: 20px; margin: 5px 0;  display: -webkit-box; 
                -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: #000;
                font-size: 14px; font-weight: normal;}
			.movreviewbullet{display: flex; gap:10px; justify-content: center; margin: 15px 0 20px;}
			.movreviewbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; border: 0; cursor: pointer;}
			.movreviewbullet button.glide__bullet--active{background: #ED1C24;}
			// .movreview{padding: 20px 0 20px 10px;}

			.movreviewarw button {background: #ea3323; position: absolute;  top: -58px;  width: 24px;  height: 24px;  background-color: #A0A0A0; right: 37px;border-radius: 50%;left: auto;border: 0;
                cursor: pointer;}
			// .movreviewarw button:last-child {right: 7px;}
			.movreviewarw button:before {width: 8px;height: 8px; top: 7px; left: 9px;content: "";
            position: absolute;border-top: 2px solid #fff;
            border-left: 2px solid #fff;transform: rotate(-45deg);}
			.movreviewarw button.active{background-color: #E1261D;}

			/*This is default CSS */
			.newglblhdwrap{border-bottom: 1px solid #d9d9d9; position: relative; margin:10px 10px 6px 10px; display: flex; justify-content: space-between; align-items: center;}
			.newglblhdwrap:before{content: ""; background: #ED1C24; width: 25px; height: 4px; position: absolute; left: 0; bottom: 0;}
			.newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{font-size: 20px;line-height: 38px; color: #000; font-weight: bold; display: flex;align-items: end;}
			.newglblhdwrap .newglblhd span, .newglblhdwrap .newglblhd a span{color:#ED1C24; margin-right: 5px;}
			.newglblhdwrap .newglblhd em, .newglblhdwrap .newglblhd a em{color: #868686;font-weight: normal;text-transform: uppercase;font-style: normal;font-size: 12px; margin-left: 8px; position: relative; top: 2px}

			.moretrndstroy{color: #fff;font-size: 14px;text-align: center;font-weight: bold;background: #E1261C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #FFFFFF;border-radius: 16px;display: table;margin: 10px auto;width: 140px;height: 32px;line-height: 32px;}
			.moretrndstroy:after{content: "";background: url(images/newiconsprite.png) -164px 0px no-repeat;width: 11px;height: 11px;display: inline-block;margin-left: 8px; filter: brightness(0) invert(1);}
			/*This is default CSS*/
            `
                }
            </style>
        </>
    )

}

export default MovieReviewWidget;