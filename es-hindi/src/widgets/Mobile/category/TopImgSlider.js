import React, { useEffect } from "react";
import Glide from '@glidejs/glide';
import { get_static_img } from 'includes/helper';
// import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";

const TopImgSlider = (props) => {
  useEffect(() => {
    if (props.sliderFlag) {
      new Glide(".section-blog-left-img", { perView: 1, autoplay: 2000, }).mount();
    }

  }, []);

  if(!props.initialData.leftCat) {
    return false;
  }

  return (
    // <topOtherStoriesContext.Provider>
    <>

      <div className="top_story_left">
        <div className="section-hotTopic clearfix">
          <div className="section-blog-left-img">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides section-blog-left-img"> {props.initialData.leftCat.map((topNews, key) => (
                <li key={key} className="glide__slide">

                <a href={ topNews.weburl }>
                  <figure>
                    <div className="top_img">
                      <LazyImage
												src={get_static_img(topNews.images.url, 521, 347)}
												alt={topNews.title || ''}
												title={topNews.title || ''}
												width={521}
												height={347}
											/>
                    </div>
                    <figcaption><h1>{ topNews.title }</h1></figcaption>
                  </figure>
                </a>

                </li>
  ))}</ul>
              {/* <div className="section-blog-left-img-bullets" data-glide-el="controls[nav]">_slidetButton</div> */}
            </div>
          </div>
          {/* {_script} */}
        </div>
      </div>

      {/* <div className="top_story_right">
        <ul>
          {props.initialData.rightCat.map((topNewsRight, key) => (
            <li key={key} className={((topNewsRight.post_type == 'video')? 'video_icon': (topNewsRight.post_type == 'photogallery')? 'photo_icon': '')}><a href={ topNewsRight.weburl }>{ topNewsRight.title }</a></li>
          ))}
        </ul>
      </div> */}

      <style jsx global>{`
        .top_story {     display: flex;     align-items: end;     margin-bottom: 50px; }  .top_story_left {width: 100%;padding-right: 20px;padding-top: 13px;}  .top_story_right {width: 37%;}  .top_story_right ul li {       border-bottom: solid 1px #ccc;
          font-size: 16px;
          line-height: 26px;
          -moz-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -o-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-weight: 700;
          padding: 13px 0;
          position: relative;}  .top_story_right ul li a {        text-decoration: none;
            color: #232323;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 52px; }  .top_img {     width: 100%; }  .top_img img {     width: 100%;     display: block; }  .top_story_left a {     display: block;     position: relative;     color: #fff; }  .top_story_left figcaption {     font-size: 24px;     line-height: 36px;     background: rgba(0,0,0,.7);     position: absolute;     bottom: 0;     left: 0;     width: 100%;     padding: 10px;     box-sizing: border-box;     font-weight: 700; }  .top_story_left figcaption a { }  .top_story_right ul li:first-child {     /* padding-top: 0; */ }  .photo_icon:after {     background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/photo-ss.png) no-repeat;     content: "";     width: 20px;     height: 20px;     display: inline-block;     vertical-align: middle;     left: 0;     position: absolute;     top: 16px; }  .top_story_right ul li a:hover {     color: #ED1B24; }  .video_icon:after {     background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-ss.png) no-repeat;     content: "";     width: 20px;     height: 20px;     display: inline-block;     vertical-align: middle;     left: 0;     position: absolute;     top: 12px; }
        .top_story_right ul li.photo_icon{padding-left: 25px; }
        .top_story_right ul li.video_icon{padding-left: 25px; }
        .top_story_left figcaption h1{font-size:24px;}
        .section-blog-left {width:calc(100% - 315px);float:left;}.outer{margin:auto;max-width:1245px;padding:0 10px;position:relative;z-index:1}.add{position:relative;z-index:99}.foraddshow{width:100%; min-height:250px; background:#f5f5f5; line-height:0px;}.section-hotTopic{margin-bottom:10px}.section-blog-left-img{width:61%;float:left;position:relative;overflow:hidden}.section-blog-left-img ul{display:flex}.section-blog-left-img ul li a{position:relative;display:block}.section-blog-left-img ul li a figure{width:100%;line-height:0}.section-blog-left-img ul li a figure img{width:100%}.section-blog-left-img ul li a h1,.section-blog-left-img ul li a h2{background:linear-gradient(transparent,#000);bottom:0;font-size:26px;left:0;line-height:36px;padding:50px 20px 35px 20px;position:absolute;right:0;color:#fff}.section-blog-left-img ul li a h1 span,.section-blog-left-img ul li a h2 span{font-size:15px;color:#fff;display:block;background:#e1261c;position:absolute;top:-5px;padding:0 10px;height:38px;line-height:38px;left:0}.section-blog-left-img-list{width:36%;float:right}.section-blog-left-img-list ul li{padding:10px 30px 10px 0;font-size:16px;line-height:26px;box-sizing:border-box;font-weight:700;background:#fff;border-bottom:1px solid #eee;position:relative}.section-blog-left-img-list ul li:after{content:"";position:absolute;width:8px;height:8px;border-top:2px solid #ccc;border-right:2px solid #ccc;top:50%;right:3px;transform:rotate(45deg);margin-top:-6px}.section-blog-left-img-list ul li span{font-size:12px;color:#e1261c;display:block}.section-blog-left-img-list ul li:first-child{border-top:1px solid #eee}.section-blog-left-img-list ul li a{color:#232323;display:block;}.section-blog-left-img-list ul li:hover a{color:#ed1b24}.section-blog-left-img-list ul li:hover:after{border-top:2px solid #ed1b24;border-right:2px solid #ed1b24}.section-blog-left-img-list.forstates ul li{padding:8px 30px 8px 0}.section-blog-left-img-bullets{position:absolute;bottom:15px;left:0;right:0;display:flex;justify-content:center}.section-blog-left-img-bullets button{width:10px;height:10px;border-radius:100%;margin:0 6px;padding:0;outline:0;border:none}.section-blog-left-img-bullets button.glide__bullet--active{opacity:.5}.blog-list{display:flex;flex-wrap:wrap;justify-content:space-between}.blog-list .blog-list-blog{width:32%;margin-bottom:20px;position:relative;}
      `}</style>
    </>
    // </topOtherStoriesContext.Provider>
  );
};

export default TopImgSlider;
