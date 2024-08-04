import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { get_static_img } from "includes/helper";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";

const SpecialWidget = (props) => {
  //   console.log({ props });
  // const {
  //   initialData = {},
  //   pageParam = {},
  //   currentUrl = "",
  //   numkey = "",
  // } = props;
  const [NewsData, setNewsData] = useState([]);

  let query_arr = "";
  const section = props.pageNameSlug;
  const pageLimit = 6;
  const offset = 0;

  if (section === "videos") {
    query_arr = {
      post_type: "videos",
      status: 1,
    };
  } else if (section === "photogallery") {
    query_arr = {
      post_type: "photogallery",
      status: 1,
    };
  } else {
    query_arr = {
      status: 1,
    };
  }

  function chunkArray(arr, chunkSize) {
    const chunks = [];
    let index = 0;

    while (index < arr.length) {
      chunks.push(arr.slice(index, index + chunkSize));
      index += chunkSize;
    }

    return chunks;
  }

  const getData = async () => {
    const fields =
      "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source,gallery";
    const NewsDataList = await getArticleList({
      count: pageLimit,
      offset: offset,
      fields: fields,
      filter: query_arr,
    }, true);
    if (NewsDataList && NewsDataList.length) {
      const chunkedArray = chunkArray(NewsDataList, 3);
      setNewsData(chunkedArray);
      // console.log({chunkedArray})
    }
  };
  const labelName = props.label;
  const slugCheck = props.slug;
  useEffect(() => {
    if (Array.isArray(NewsData) && NewsData.length) {
      if (slugCheck === "videos") {
        new Glide(document.querySelector(".newctgrvideo-slide"), {
          autoplay: false,
          type: "carousel",
          perView: 1,
          gap: 0,
          slidesToScroll: 1,
        }).mount();
      } else if (slugCheck === "photogallery") {
        new Glide(document.querySelector(".newctgrphoto-slide"), {
          autoplay: false,
          type: "carousel",
          perView: 1,
          gap: 0,
          slidesToScroll: 1,
        }).mount();
      } else {
        // console.log('no run')
      }
    }
  }, [NewsData]);

  useEffect(() => {
    query_arr && getData();
  }, [slugCheck]);
  // const pageNameSlugNew =
  //   props?.pageParam?.page === "lifestyle"
  //     ? "lifestyle/"
  //     : props?.pageParam?.page === "world"
  //     ? "world/"
  //     : "";

  // useEffect(() => {
  //   setTimeout(() => {
  //     // if (Array.isArray(NewsData) && NewsData.length) {
  //     if (slugCheck === "videos") {
  //       new Glide(document.querySelector(".newctgrvideo-slide"), {
  //         autoplay: false,
  //         type: "carousel",
  //         perView: 1,
  //         gap: 0,
  //         slidesToScroll: 1,
  //       }).mount();
  //     } else if (slugCheck === "photogallery") {
  //       new Glide(document.querySelector(".newctgrphoto-slide"), {
  //         autoplay: false,
  //         type: "carousel",
  //         perView: 1,
  //         gap: 0,
  //         slidesToScroll: 1,
  //       }).mount();
  //     } else {
  //       // console.log('no run')
  //     }
  //     // }
  //   }, 1000); // 1000 milliseconds = 1 second
  // }, []);

  return (
    <>
      {NewsData.length > 1 ? (
        <div className="newctgrphoto">
          <div className="newglblhdwrap">
            <a href={"/" + slugCheck + "/"}>
              <h2 className="newglblhd">{labelName}</h2>
            </a>

            {/* <div> */}
            <a href={"/" + slugCheck + "/"} className="moretrndstroy">
              और देखें
            </a>
            {/* </div> */}
          </div>
          <div
            className={
              slugCheck === "videos"
                ? "newctgrvideo-slide glide--ltr glide--carousel glide--swipeable"
                : "newctgrphoto-slide glide--ltr glide--carousel glide--swipeable"
            }
          >
            <div data-glide-el="track">
              <div className="newctgrphoto-slide-in">
                {NewsData.map((eachNewss, index) => {
                  return (
                    <ul key={index}>
                      {eachNewss.map((eachNews, key) => {
                        return (
                          <React.Fragment key={key + "fragment"}>
                            <li>
                              <a href={eachNews.weburl_r || ""}>
                                <figure>
                                  <LazyLoadImage
                                    src={get_static_img(
                                      eachNews?.images?.url,
                                      561,
                                      374,
                                    )}
                                    alt={eachNews.display_headline || ""}
                                    title={eachNews.display_headline || ""}
                                    width={561}
                                    height={374}
                                  />
                                </figure>
                                <h3>
                                  {eachNews?.post_type === "photogallery" ? (
                                    <span className="newphticoncount">
                                      <img
                                        src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png"
                                        alt="Video"
                                      />
                                      +{eachNews?.gallery.length || "1"}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {eachNews.display_headline || ""}
                                </h3>
                              </a>
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>

            <div data-glide-el="controls[nav]" className="trndstorynewbullet">
              <button type="button" data-glide-dir="=0"></button>
              <button type="button" data-glide-dir="=1"></button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <style jsx global>
        {`
          .newctgrphoto {
            padding: 10px 20px;
            background: #000;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 40px;
          }
          .newctgrphoto .newglblhdwrap {
            border-bottom: 1px solid #4a4a4a;
          }
          .newctgrphoto .newglblhdwrap .newglblhd,
          .newctgrphoto .newglblhdwrap .newglblhd a {
            color: #fff;
          }
          .newctgrphoto .moretrndstroy {
            background: #ec2027;
            border-radius: 16px;
            color: #fff;
            padding: 0 12px;
          }
          .newctgrphoto .moretrndstroy:after {
            filter: brightness(0) invert(1);
          }
          .newctgrphoto-slide {
            position: relative;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .newctgrphoto-slide-in {
            display: flex;
          }
          .newctgrphoto-slide-in ul {
            display: flex;
            gap: 20px;
            flex-shrink: 0;
          }
          .newctgrphoto-slide-in ul li {
            width: 22.5%;
            flex-shrink: 0;
            background: #1d1d1d;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #4a4a4a;
            border-radius: 4px;
            position: relative;
            overflow: hidden;
          }
          .newctgrphoto-slide-in ul li a {
          }
          .newctgrphoto-slide-in ul li a figure,
          .newctgrphoto-slide-in ul li a figure img {
            width: 100%;
            height: 136px;
          }
          .newctgrphoto-slide-in ul li a figure:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: #000000;
            border-radius: 4px 4px 0px 0px;
            opacity: 0.3;
            content: "";
          }
          .newctgrphoto-slide-in ul li a h3 {
            font-size: 15px;
            line-height: 22px;
            font-weight: bold;
            color: #fff;
            padding: 10px;
          }
          .newctgrphoto-slide-in ul li a h3 span {
            position: absolute;
            background: #ed2129;
            height: 28px;
            line-height: 28px;
            border: 1px solid #fff;
            border-right: none;
            border-radius: 3px 0 0 3px;
            top: 105px;
            display: block;
            font-size: 14px;
            color: #fff;
            right: 0;
            padding: 0 2px 0 2px;
          }
          .newctgrphoto-slide-in ul li a h3 span b {
            display: none;
          }
          .newctgrphoto-slide-in ul li a h3 span img {
            height: 28px;
            position: relative;
            vertical-align: middle;
          }
          .newctgrphoto-slide-in ul li:first-child {
            width: 50%;
          }
          .newctgrphoto-slide-in ul li:first-child a figure,
          .newctgrphoto-slide-in ul li:first-child a figure img {
            height: 290px;
          }
          .newctgrphoto-slide-in ul li:first-child a h3 {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, #000);
            padding-top: 100px;
            font-size: 17px;
            line-height: 24px;
          }
          .newctgrphoto-slide-in ul li:first-child a h3 span {
            height: 40px;
            line-height: 30px;
            top: 50px;
            font-size: 16px;
            color: #fff;
            right: 0;
            padding-right: 10px;
            width: auto;
          }
          .newctgrphoto-slide-in ul li:first-child a h3 span b {
            font-weight: normal;
            font-size: 11px;
            display: block;
            line-height: 10px;
            position: relative;
            top: -18px;
            right: -40px;
          }
          .newctgrphoto-slide-in ul li:first-child a h3 span img {
            height: 40px !important;
            vertical-align: top;
          }
          .trndstorynewbullet {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 15px;
          }
          .trndstorynewbullet button {
            width: 20px;
            height: 4px;
            background: #d6d6d6;
            border-radius: 3px;
            display: block;
          }
          .trndstorynewbullet button.glide__bullet--active {
            background: #ed1c24;
          }
          .newctgrvideo-slide {
            position: relative;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .newctgrvideo-slide .newctgrphoto-slide-in ul li a figure:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            background: url(images/videoicon.svg) 0 0 no-repeat;
            width: 32px;
            height: 32px;
            margin: -16px 0 0 -16px;
            z-index: 1;
          }
          .newctgrvideo-slide
            .newctgrphoto-slide-in
            ul
            li:first-child
            a
            figure:before {
            transform: scale(1.2);
          }

          .newctgrphoto .moretrndstroy {
            background: #ec2027;
            border-radius: 16px;
            color: #fff;
            padding: 0 12px;
          }
          .moretrndstroy {
            color: #e82d2e;
            font-size: 14px;
            display: block;
            text-align: center;
            line-height: 24px;
            font-weight: bold;
          }
          .moretrndstroy:after {
            content: "";
            background: url(images/newiconsprite.png) -164px 0px no-repeat;
            width: 11px;
            height: 11px;
            display: inline-block;
            margin-left: 6px;
          }
        `}
      </style>
    </>
  );
};

export default SpecialWidget;
