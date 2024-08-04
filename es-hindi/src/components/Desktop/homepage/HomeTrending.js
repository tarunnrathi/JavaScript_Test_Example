import { Fragment, useEffect } from "react";
import Glide from '@glidejs/glide';
import { imageLoader } from "includes/article.util";

const HomeTrending = ({ trendstory={} }) => {
   function callSlider() {
     new Glide(document.querySelector(".trndstorynew-slide-in"), {
       autoplay: false,
       type: "carousel",
       perView: 3,
       gap: 10,
       slidesToScroll: 1,
     }).mount();
   }
   useEffect(() => {
     if (trendstory?.storyArr?.length >= 3 && trendstory?.showWidget) {
       callSlider();
     }
   }, []);

return (
<>
{trendstory?.storyArr?.length>=3 && trendstory?.showWidget ?
<div className="trndstorynew">
   <div className="trndstorynewtp">
      <h2 className="trndstorynewhd">ट्रेंडिंग</h2>
      <a href={`/news/`} className="moretrndstorynew" onClick={() => ga('send', 'event', "Trending_home", 'Click', "Read more")}>और भी पढ़ें <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/trendingarrowmore_1659358270.svg" alt=""/></a>
   </div>

   <div className="trndstorynew-slide">
      <div className="trndstorynew-slide-in">
         <div data-glide-el="track">
            <ul>
               {trendstory?.storyArr?.length>=3 && trendstory?.storyArr?.map((item, index) => {
               const width = 216;
               const height = 144;
               const imageSrc = imageLoader(item?.thumbnail, width, height);
               return <Fragment key={index}>
               {(item?.display_headline || item?.title) !=null ?
               <li className="glide__slide">
                  <a href={item?.url ? item.url.replace("https://hindi.news18.com", "") : ''} onClick={() => ga('send', 'event', `Trending_Home`, 'Click', `${item?.display_headline || item?.title},${item.id}`)}>
                  <div className="counterwrap">
                     <img src={imageSrc} alt={item?.title || ''} width={width} height={'102px'} loading="lazy"></img>
                     <span className="counter">{index+1}</span>
                  </div>
                  <h3>{item?.display_headline || item?.title}</h3>
                  </a>
               </li>
               : ""}
               </Fragment>;
               })}
            </ul>
         </div>
         <div className="trndstorynewarw" data-glide-el="controls">
            <button data-glide-dir="<"></button>
            <button data-glide-dir=">"></button>
         </div>
      </div>
   </div>
</div>
: "" }
<style jsx global>{` 
   .trndstorynew{background:#F5F5F5;border: 1px solid #E8E8E8; border-bottom:3px solid #001D42; padding: 10px;  font-family: "Mukta",sans-serif;} 
   .trndstorynew *{ font-weight: bold;}
   .trndstorynewtp{display:flex; justify-content:space-between; margin-bottom:2px;padding-left: 20px;}
   .trndstorynewhd{color: #000000; font-size: 18px; line-height: 22px;}
   .trndstorynew-slide{position: relative;}
   .trndstorynew-slide-in{margin: 0 22px; overflow: hidden; padding-top:3px; height:82px; overflow:hidden}
   .trndstorynew-slide ul{display: flex;counter-reset: section -5;}
   .trndstorynew-slide ul li{background: #FFFFFF;box-shadow: 0px 0px 4px #0000001A;border: 1px solid #DBDBDB; border-radius: 4px; padding: 10px 10px 1px 10px; position: relative;}
   .trndstorynew-slide ul li a{display: flex;}
   .trndstorynew-slide ul li a img{width: 67px; height: 50px; flex-shrink: 0;}
   .trndstorynew-slide ul li a h2, .trndstorynew-slide ul li a h3{color: #404040; font-size: 14px; line-height: 17px; height: 51px;overflow: hidden; margin-left: 15px;}
   .trndstorynewarw{}
   .trndstorynewarw button{position: absolute;top: 25px;width: 22px;height: 22px;border:none;background: none;box-sizing: border-box;margin: 0;padding: 0;outline: 0;cursor: pointer;left: 0px;}
   .trndstorynewarw button:last-child{right: 0px;left: auto;transform: rotate(180deg);}
   .trndstorynewarw button:after, .trndstorynewarw button:before {content: ""; position: absolute; width: 6px; height: 6px; border-top: 1px solid #E82D2E;border-left: 1px solid #E82D2E;transform: rotate(-45deg);}
   .trndstorynewarw button:after{left:6px}
   .moretrndstorynew{color: #E82D2E; font-size: 14px;display: block; text-align: center; line-height: 24px;}
   .moretrndstorynew img{margin-left: 2px;}
   .counterwrap{
   position:relative;
   }
   .counter{
   position:absolute;
   width: 13px;
   height: 13px;
   background: #FFFFFF;
   box-shadow: 0px 0px 2px #00000029;
   position: absolute;
   border-radius: 2px;
   color: #E1261D;
   font-size: 10px;
   text-align: center;
   bottom: 5px;
   right: -5px;
   }
   `
   }
</style>
</>
);
};
export default HomeTrending;
