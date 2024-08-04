import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { get_static_img } from "includes/helper";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import CustomSkeleton from "components/Common/CustomSkeleton";

const SpecialWidgetMobile = (props) => {
  //   console.log({ props });
  // const {
  //   initialData = {},
  //   pageParam = {},
  //   currentUrl = "",
  //   numkey = "",
  // } = props;
  const [NewsData, setNewsData] = useState([]);
  const [loader, setLoader] = useState(true);
  let query_arr = "";
  const section = props.pageNameSlug;
  const pageLimit = 3;
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
    setLoader(false);
  };

  // useEffect(() => {
  //   query_arr && getData();
  // }, []);

  const labelName = props.label;
  const slugCheck = props.slug;
  // const pageNameSlugNew =
  //   props?.pageParam?.page == "lifestyle"
  //     ? "lifestyle/"
  //     : props?.pageParam?.page == "world"
  //     ? "world/"
  //     : "";

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

  if(loader) {
    return (
    <div className="newctgrphoto">
        <CustomSkeleton height="35px" />
    </div>);
  }

  return (
    <>
      <div className="newctgrphoto">
        <div className="newglblhdwrap">
          {/* <a href={"/" + slugCheck + "/"}> */}
          <h2 className="newglblhd">{labelName}</h2>
          {/* </a> */}
          <a href={"/" + slugCheck + "/"} className="moretrndstroy">
            और देखें
          </a>
        </div>

        <div
          className={
            slugCheck === "videos" ? "newctgrvideo-slide" : "newctgrphoto-slide"
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
                            <a href={eachNews?.weburl_r}>
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
                                {slugCheck === "videos" ? (
                                  ""
                                ) : (
                                  <span>
                                    <img
                                      src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png"
                                      alt=""
                                    />
                                    +{eachNews.gallery?.length}
                                  </span>
                                )}
                              </figure>
                              <h3>{eachNews.display_headline || ""}</h3>
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
            <button
              type="button"
              data-glide-dir="=0"
              className="glide__bullet--active"
            ></button>
            <button type="button" data-glide-dir="=1"></button>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
          .newctgrphoto {
            padding: 10px;
            background: #000;
            width: 100%;
            border-radius: 4px;
          }
          .newctgrphoto .newglblhdwrap {
            border-bottom: 1px solid #4a4a4a;
            margin: 0 0 6px 0;
          }
          .newctgrphoto .newglblhdwrap .newglblhd,
          .newctgrphoto .newglblhdwrap .newglblhd a {
            color: #fff;
          }
          .newctgrphoto .moretrndstroy {
            background: #ec2027;
            border-radius: 16px;
            color: #fff;
            padding: 2px 0px 0 8px;
            width: 90px;
            margin: 0;
            height: 20px;
            line-height: 20px;
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
            gap: 10px;
            flex-wrap: wrap;
            flex-shrink: 0;
          }
          .newctgrphoto-slide-in ul li {
            width: 48%;
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
            height: 110px;
          }
          .newctgrphoto-slide-in ul li a h3 {
            font-size: 15px;
            line-height: 22px;
            font-weight: bold;
            color: #fff;
            padding: 10px;
          }
          .newctgrphoto-slide-in ul li a figure span {
            position: absolute;
            background: #ed2129;
            height: 28px;
            line-height: 28px;
            border: 1px solid #fff;
            border-right: none;
            border-radius: 3px 0 0 3px;
            bottom: 3px;
            display: block;
            font-size: 14px;
            color: #fff;
            right: 0;
            padding: 0 5px 0 2px;
          }
          .newctgrphoto-slide-in ul li a figure span img {
            height: 28px !important;
            position: relative;
            vertical-align: middle;
            width: 30px !important;
          }
          .newctgrphoto-slide-in ul li:first-child {
            width: 100%;
            border: none;
            background: none;
            border-bottom: 3px solid #363636;
            border-radius: 0;
          }
          .newctgrphoto-slide-in ul li:first-child a figure,
          .newctgrphoto-slide-in ul li:first-child a figure img {
            height: 235px;
          }
          .newctgrphoto-slide-in ul li:first-child a figure {
            border: 1px solid #4a4a4a;
            border-radius: 4px;
          }
          .newctgrphoto-slide-in ul li:first-child a h3 {
            font-size: 17px;
            line-height: 24px;
            padding: 10px 0;
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
          .newctgrvideo-slide .newctgrphoto-slide-in ul li a figure:after {
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
          .newctgrvideo-slide
            .newctgrphoto-slide-in
            ul
            li:first-child
            a
            figure:before {
            transform: scale(1.2);
          }
          @media (max-width: 768px) {
            .newctgrphoto {
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default SpecialWidgetMobile;
