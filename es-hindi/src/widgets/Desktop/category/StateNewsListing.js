import React from "react";
import "lazysizes";
import { get_static_img } from "includes/helper";
import SheherChune from "./SheherChune";

const StateNewsListing = (props) => {
  const NewsData = props.initialData;
  const pageNameSlug = props?.pageParam?.page == 'lifestyle' ? 'lifestyle/' : props?.pageParam?.page == 'world' ? 'world/' : '';

  return (
    <>
      {/* News Listing start here */}
      <ul className="statelisting-news dflex flex-wrap">
        {NewsData.map((ele, index) => {
          //console.log(ele.label, ele.result.length);
          return ele.result.length > 0 ? (
            <React.Fragment key={index + "fragment"}>
              <li>
                <h2>
                  <a href={(ele.slug == 'photogallery') ? "/" + ele.slug + "/" + pageNameSlug : (ele.slug == 'videos') ? '/videos/' : "/news/" + pageNameSlug + ele.slug + "/"}>{ele.label}</a>
                </h2>
                {pageNameSlug == '' ? <SheherChune initialData={ele} /> : ''}
                {ele?.result
                  .filter((filterEle) => filterEle && filterEle)
                  .map((eachNews, key) => {
                    const { images, display_headline, headline, weburl_r, intro, post_type, ff_source, local18_video, categories } = eachNews.article_details || eachNews || {};
                    // let fdata = NewsData[index].result;
                    // console.log(key, index, fdata[key].id)
                    return key == 0 ? (
                      <React.Fragment key={key + "fragment"}>
                        <a href={weburl_r || ''}>
                          {/* <figure> */}
                          {(ff_source == 'Hyperlocal' && local18_video != '') ? <span className="nwvideoicon"></span> : ""}
                          <img
                            style={{ width: '100%' }}
                            src={get_static_img(
                              images?.url || "",
                              300,
                              200
                            )}
                            alt={display_headline || headline || ""}
                            title={display_headline || headline || ""}
                            height={200}
                            className="lazyload"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=300&height=200";
                            }}
                          />
                          {/* </figure> */}
                          <h3>{display_headline || headline || "News"}</h3>
                        </a>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={key + "fragment"}>
                        <a href={weburl_r}>
                          <h4>{display_headline || headline || ""}</h4>
                        </a>
                      </React.Fragment>
                    );
                  })}

                <a
                  href={(ele.slug == 'photogallery') ? "/" + ele.slug + "/" + pageNameSlug : (ele.slug == 'videos') ? '/videos/' : "/news/" + pageNameSlug + ele.slug + "/"}>
                  <h5>और भी...</h5>
                </a>
              </li>
            </React.Fragment>
          ) : (
            ""
          );
        })}
      </ul>
      {/* News Listing end here */}
      <style jsx global>{`
        .flex-wrap {
            flex-wrap: wrap;
        }
        .statelisting-news li {
            position: relative;
        }
        .statelisting-news li {
            width: 31%;
            margin-bottom: 30px;
            margin-right: 2%;
        }
        .statelisting-news li h2 {
            border-bottom: 2px solid #e1261c;
            margin-bottom: 12px;
        }
        .statelisting-news li h2 a {
            font-size: 24px;
            font-weight: 700;
            display: inline-block;
            position: relative;
            top: 0px;
            background: #fff;
            padding-right: 10px;
            line-height: 24px;
        }
        

        .statelisting-news li a figure {
            width: 100%;
            line-height: 0;
        }
        .statelisting-news li a figure img {
            width: 100%;
            height: auto;
        }
        .statelisting-news li a h3 {
            font-size: 18px;
            line-height: 24px;
            padding: 0px 0 5px 0;
            font-weight: 700;
            height: 70px;
            overflow: hidden;
            position: relative;
            margin-bottom: 10px;
        }
        .statelisting-news li a h4 {
            height: 55px;
            overflow: hidden;
            font-size: 16px;
            line-height: 24px;
            border-top: 1px solid #ccc;
            padding: 10px 0 8px 0;
            font-weight: 400;
            margin-top: 8px;
        }
        .statelisting-news li a h5 {
          line-height: 22px;
          font-size: 14px;
          text-align: right;
          padding: 10px 0;
          color: #ee1c25;
          font-weight: 700;
          margin-top: 10px;
          border-top: 1px solid #ccc;
      }

        .page_outbrain {margin-bottom: 20px;}
        .statelisting-news li.adclsallcities-forstatesection .allcities-forstatesection {
          transform: scale(1);
          transition: all .5s ease-in-out;
        }
                
.statelisting-news li{position: relative;}

.chsstct-forstatepage-inside-city{color: #C6080F;font-size: 15px;position: absolute;top: 4px;right: 0;font-weight: bold;padding-right: 20px;}
.chsstct-forstatepage-inside-city:after {position: absolute;content: "";width: 6px;height: 6px;border-top: 2px solid #EE1C25;border-left: 2px solid #EE1C25;transform: rotate(-136deg);top: 5px;right: 5px;}
.allcities-forstatesection{position: absolute;background: #F7F7F7;box-shadow: 0px 3px 6px #00000029;border-radius: 8px 0px 8px 8px;top: 30px;z-index: 1;width: 170px;box-sizing: border-box;padding: 0 12px;right: 0; transform: scale(0); transition: all .5s ease-in-out}
/* .allcities-forstatesection.adclsallcities-forstatesection{transform: scale(1); transition: all .5s ease-in-out} */
.statelisting-news li.adclsallcities-forstatesection .allcities-forstatesection{transform: scale(1); transition: all .5s ease-in-out}
.allcities-forstatesection > div{height: 240px; overflow: hidden;}
.allcities-forstatesection > div ul{height: 240px;overflow: auto;width: 109%;}
.allcities-forstatesection > div ul li{width: 100%; margin: 0px;}
.allcities-forstatesection > div ul li a{display: block;color: #333333;font-size: 14px;padding: 10px 2px;border-bottom: 1px dotted #ccc;}
.allcities-close{ position: relative;background: #C6080F;border-radius: 0 0 8px 8px;height: 36px!important;margin: 0 -15px;line-height: 36px;color: #fff;font-size: 15px;padding-left: 30px; cursor: pointer;}
.allcities-close:before, .allcities-close:after{content: "";width: 2px;height: 16px;background: #fff;position: absolute;top: 9px;right: 18px;}
.allcities-close:before{transform: rotate(45deg);}
.allcities-close:after{transform: rotate(-45deg);}
.allcities-close span{position: relative;}
.allcities-close span:before{content: "";width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;position: absolute;transform: rotate(-45deg);top: 4px;left: -15px;}
.citiesname-forstatesection{position: relative; overflow:hidden; background: #F7F7F7;box-shadow: 0px 3px 6px #00000029;
border-radius: 0px 0px 10px 10px;}
.citiesname-forstatesection > div{overflow: hidden;margin: 0 30px;}
.citiesname-forstatesection ul{display: flex; height: 42px; line-height: 42px;  overflow: hidden; }
.citiesname-forstatesection ul li{margin: 0px 20px!important;width: auto!important;flex-shrink: 0;font-size: 15px;}
.citiesname-forstatesection ul li:first-child{margin-left: 0px!important}
.citiesname-forstatesection ul li a{color: #494949}
.contorls-forstatesection{}
.contorls-forstatesection button{background: #F7F7F7;border: none;outline: none;position: absolute;top: 5px;left: 0;width: 30px;height: 30px; cursor: pointer; }
.contorls-forstatesection button:before{content: "";position: absolute;width: 8px;height: 8px;border-top: 2px solid #333333;border-left: 2px solid #333333;transform: rotate(-45deg);top: 11px;left: 13px;}
.contorls-forstatesection button:last-child{left: auto;right: 0; transform: rotate(180deg);}	
.nwvideoicon {
  width: 45px;
  height: 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin: -22px 0 0 -22px;
  cursor: pointer;
  opacity: .7;
  background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
}

      `}</style>
    </>
  );
};

export default StateNewsListing;
