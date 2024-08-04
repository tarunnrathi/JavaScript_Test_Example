// StatelandingBottomCommon.js
import React, { useEffect, useState } from "react";
import { imageLoader } from "includes/article.util";
import categoryHelper from "includes/category.helper";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
// import SheherChuneCommon from "./ShehrChuneCommon";
// import SheherChune from "./SheherChune";
// import SpecialWidget from "../Desktop/SpecialWidget";

const CategoryPageTempBottomOne = (props) => {
  const {
    // initialData = {},
    // pageParam = {},
    // currentUrl = "",
    // pageAds = {},
    // numkey = "",
    isMobile,
  } = props;
  const [NewsData, setNewsData] = useState([]);
  const [storyListData, setStoryListData] = useState([]);
  // const pageNameSlug = pageParam.category;

  let query_arr = "";
  const section = props.initialData.sectionName;
  const subsection = "";
  //Find the section exists or not
  let category = "";
  const { categoryListData } = props.pageParam;
  let category_id = "";
  let category_parent = "";
  // let category_name = "";
  if (
    section === "videos" ||
    section === "photogallery" ||
    section === "news"
  ) {
    category_id = props.pageParam.get_section.id;
    category_parent = props.pageParam.get_section.parent;
    // category_name = props.pageParam.get_section.name;
  } else {
    category = categoryHelper.get_section(section, categoryListData);
    category_id = category.id;
    category_parent = category.parent;
    // category_name = category.name;
  }

  const changecat = ["auto", "culture"];
  const pageLimit = props.pageParam?.query === 'news/sports/' && category_id === 29 ? 13 : 5;
  const offset = 0;
  if (category_id) {
    if (changecat.indexOf(section) >= 0 || subsection === "culture") {
      query_arr = {
        "categories.id": category_id,
        status: 1,
      };
    } else {
      if (category_parent === 0) {
        if (section === "videos") {
          query_arr = {
            "categories.id": category_id,
            post_type: "videos",
            status: 1,
          };
        } else if (section === "photogallery") {
          query_arr = {
            "categories.id": category_id,
            post_type: "photogallery",
            status: 1,
          };
        } else {
          query_arr = {
            "categories.id": category_id,
            status: 1,
          };
        }
      } else {
        if (section === "videos") {
          query_arr = {
            "categories.id": category_id,
            post_type: "videos",
            status: 1,
          };
        } else if (section === "photogallery") {
          query_arr = {
            "categories.id": category_id,
            post_type: "photogallery",
            status: 1,
          };
        } else {
          query_arr = {
            "categories.id": category_id,
            status: 1,
            // not: { "categories.parent": 0 },
          };
        }
      }
    }
  }

  const priorityData = 0;

  // const filteredData = (data) => {
  //   if (data.length) {
  //     const storyListDatas = [];
  //     let tempObj = {};
  //     const films = subsection === "film-review" ? true : false;
  //     data.map((element, key) => {
  //       const { story_id } = element;
  //       let article_data_filtered_data = {};
  //       if (films) {
  //         article_data = JSON.parse(element.article_data);
  //         article_data_filtered_data = {
  //           movie_cast: article_data["movie_cast"] || "",
  //           movie_date: article_data["movie_date"] || "",
  //           movie_genre: article_data["movie_genre"] || "",
  //           headline: article_data["headline"] || "",
  //         };
  //       } else {
  //         article_data_filtered_data = {
  //           movie_cast: "",
  //           movie_date: "",
  //           movie_genre: "",
  //           headline: "",
  //         };
  //       }
  //       //   console.log('element.category',element.category)
  //       if (priorityData === 1) {
  //         tempObj = {
  //           image: element.images.url,
  //           createdTime: element.insert_date,
  //           sectionName: element?.category?.[element?.category?.length - 1],
  //           url: element.weburl_r,
  //           title: element.display_headline || element.title,
  //           storyID: story_id,
  //           ff_source: element?.ff_source || "",
  //           local18_video_s: element?.local18_video_s || "",
  //           movie_rating: parseInt(element.movie_rating || 0, 10),
  //           // article_data: JSON.parse(element.article_data),
  //           article_data: article_data_filtered_data,
  //           list_key: key,
  //         };
  //       } else {
  //         tempObj = {
  //           image: element.images.url,
  //           createdTime: element.created_at,
  //           sectionName:
  //             element?.categories?.[element?.categories?.length - 1].name,
  //           url: element.weburl_r,
  //           title: element.display_headline || element.headline,
  //           storyID: story_id,
  //           ff_source: element?.ff_source || "",
  //           local18_video_s: element?.local18_video || "",
  //           movie_rating: parseInt(element.movie_rating || 0, 10),
  //           article_data: article_data_filtered_data,
  //           list_key: key,
  //         };
  //       }
  //       storyListDatas.push(tempObj);
  //     });
  //     setStoryListData(storyListDatas);
  //   }
  // };

  const filteredData = (data) => {
    if (data.length) {
      const storyListDatas = [];
      let tempObj = {};
      const films = subsection === "film-review" ? true : false;
      data.forEach((element, key) => {
        // Rest of your code remains unchanged...
        const { story_id } = element;
        let article_data_filtered_data = {};
        if (films) {
          const article_data = JSON.parse(element.article_data);
          article_data_filtered_data = {
            movie_cast: article_data["movie_cast"] || "",
            movie_date: article_data["movie_date"] || "",
            movie_genre: article_data["movie_genre"] || "",
            headline: article_data["headline"] || "",
          };
        } else {
          article_data_filtered_data = {
            movie_cast: "",
            movie_date: "",
            movie_genre: "",
            headline: "",
          };
        }
        //   console.log('element.category',element.category)
        if (priorityData === 1) {
          tempObj = {
            image: element.images.url,
            createdTime: element.insert_date,
            sectionName: element?.category?.[element?.category?.length - 1],
            url: element.weburl_r,
            title: element.display_headline || element.title,
            storyID: story_id,
            post_type: element?.post_type || "",
            ff_source: element?.ff_source || "",
            local18_video: element?.local18_video || "",
            gallery: element?.gallery || "",
            movie_rating: parseInt(element.movie_rating || 0, 10),
            article_data: article_data_filtered_data,
            list_key: key,
          };
        } else {
          tempObj = {
            image: element.images.url,
            createdTime: element.created_at,
            sectionName:
              element?.categories?.[element?.categories?.length - 1].name,
            url: element.weburl_r,
            title: element.display_headline || element.headline,
            storyID: story_id,
            post_type: element?.post_type || "",
            ff_source: element?.ff_source || "",
            local18_video: element?.local18_video || "",
            gallery: element?.gallery || "",
            movie_rating: parseInt(element.movie_rating || 0, 10),
            article_data: article_data_filtered_data,
            list_key: key,
          };
        }
        storyListDatas.push(tempObj);
      });
      setStoryListData(storyListDatas);
    }
  };

  // we are using article_dat gere , its uses show movie details like cast and ratings
  const getData = async () => {
    // let film = subsection == "film-review" ? ",article_data" : "";
    const fields =
      "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source,gallery";
    const NewsDataList = await getArticleList({
      count: pageLimit,
      offset: offset,
      fields: fields,
      filter: query_arr,
    }, true);
    if (NewsDataList && NewsDataList.length) {
      setNewsData(NewsDataList);
      filteredData(NewsDataList);
    }
  };

  useEffect(() => {
    query_arr && getData();
  }, []);

  // let topRecord = [];
  let categoryBoxRecord = [];
  if (
    props.initialData.type !== "undefined" &&
    props.initialData.type === "box"
  ) {
    // topRecord = storyListData.slice(0, 1);
    categoryBoxRecord = storyListData.slice(1, pageLimit);
  } else {
    categoryBoxRecord = storyListData.slice(0, 4);
  }

  return (
    <>
      {NewsData && NewsData.length ? (
        <>
          <div className="newbottomsection">
            <div className="newglblhdwrap newsml">
              <h2 className="newglblhd">
                <a href={props.initialData.slug}>{props.initialData.name}</a>
              </h2>
            </div>
            <ul className="newbottomsectionlist">
              {categoryBoxRecord && categoryBoxRecord.length
                ? categoryBoxRecord.map((listNews, key) =>
                    isMobile ? (
                      key === 0 ? (
                        <li
                          key={`li2` + key}
                          className={
                            listNews?.ff_source === "Hyperlocal" &&
                            listNews?.local18_video !== ""
                              ? "ifvideo"
                              : listNews?.post_type === "photogallery"
                              ? "ifphoto"
                              : ""
                          }
                        >
                          <a href={listNews.url}>
                            <figure>
                              <LazyLoadImage
                                width={340}
                                height={227}
                                src={imageLoader(listNews["image"], 340, 227)}
                                alt={listNews["title"] || ""}
                                title={listNews["title"] || ""}
                              />
                            </figure>
                            <h3>{listNews["title"] || ""}</h3>
                          </a>
                        </li>
                      ) : (
                        <li
                          key={`li2` + key}
                          className={
                            listNews?.ff_source === "Hyperlocal" &&
                            listNews?.local18_video !== ""
                              ? "ifvideo"
                              : listNews?.post_type === "photogallery"
                              ? "ifphoto"
                              : ""
                          }
                        >
                          <a href={listNews.url}>
                            <h3>
                              {listNews["title"] || ""}{" "}
                            </h3>
                            <figure>
                              <LazyLoadImage
                                width={90}
                                height={60}
                                src={imageLoader(listNews["image"], 90, 60)}
                                alt={listNews["title"] || ""}
                                title={listNews["title"] || ""}
                              />
                            </figure>
                          </a>
                        </li>
                      )
                    ) : (
                      <li key={`li2` + key}>
                        <a href={listNews.url}>
                          <figure>
                            <LazyLoadImage
                              width={364}
                              height={200}
                              src={imageLoader(listNews["image"], 216, 144)}
                              alt={listNews["title"] || ""}
                              title={listNews["title"] || ""}
                            />

                            {listNews?.ff_source === "Hyperlocal" &&
                            listNews?.local18_video !== "" ? (
                              <span className="newvdsicon"></span>
                            ) : (
                              ""
                            )}
                            {listNews?.post_type === "photogallery" ? (
                              <span className="newphticoncount">
                                <LazyLoadImage
                                  src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png"
                                  alt="Video"
                                  width={60}
                                  height={28}
                                  unoptimized={true}
                                />
                                {/* +{listNews?.gallery.length || "1"} */}
                                {Array.isArray(listNews?.gallery)
                                  ? "+" + listNews.gallery.length
                                  : "+0"}
                              </span>
                            ) : (
                              ""
                            )}
                          </figure>
                          <h3>{listNews["title"] || ""}</h3>
                        </a>
                      </li>
                    ),
                  )
                : ""}
            </ul>
            <div className="moretrndstroy-secion stripes">
              <div>
                <a href={props.initialData.slug}>
                  <span className="moretrndstroy">और भी पढ़ें</span>
                </a>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .newbottomsectionlist {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            }
            .newbottomsectionswrap {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .newbottomsection {
              width: 100%;
              flex-shrink: 0;
              background: #fff;
              margin: 20px 0 25px;
            }
            .newbottomsection .newglblhdwrap {
              margin: 0 0px 10px;
              box-shadow: 0px 5px 0px #fff;
            }
            .newbottomsectionlist {
              display: flex;
              justify-content: space-between;
            }
            .newbottomsectionlist li {
              padding: 10px 0;
              position: relative;
              width: 23%;
            }
            .newbottomsectionlist li a figure {
              width: 216px;
              height: 144px;
              position: relative;
            }
            .newbottomsectionlist li a figure img {
              width: 100%;
              height: 144px;
            }
            .newbottomsectionlist li a h3 {
              padding: 5px 0 0;
              font-weight: bold;
              font-size: 16px;
              line-height: 23px;
              margin-bottom: 7px;
              color: #000000;
            }

            .newbottomsectionlist li a .counter {
              position: absolute;
              bottom: 7px;
              right: 0;
              width: 55px;
              height: 26px;
              background-color: #ed2129;
              border: 1px solid#fff;
              border-radius: 4px 0px 0px 4px;
              z-index: 11;
              border-right: 0;
            }
            .newbottomsectionlist li a .counter h3 {
              text-align: center;
              font-family: Mukta;
              letter-spacing: 0px;
              font-size: 14px;
              font-weight: bold;
              line-height: 11px;
              display: inline-block;
              vertical-align: top;
              background: none;
              color: #ffffff;
              text-shadow: 0px 3px 6px #00000029;
              margin-left: -6px;
              padding: 7px 0;
            }
            .newbottomsectionlist li.pht a figure:after {
              content: "";
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              opacity: 0.4;
              border-radius: 4px;
              background-color: #000000;
            }
            .newbottomsectionlist li.vid a figure:before {
              content: "";
              background: url(images/Video.png);
              width: 40px;
              height: 40px;
              display: block;
              position: absolute;
              top: 37%;
              left: 0;
              background-size: 100%;
              z-index: 11;
              margin: 0 auto;
              right: 0;
            }
            .newbottomsectionlist li.vid a figure:after {
              background-color: #000000;
              content: "";
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              opacity: 0.4;
              border-radius: 4px;
            }

            @media (max-width: 768px) {
              .newbottomsection {
                width: 100%;
              }
              .newbottomsectionlist {
                margin-bottom: 10px;
                display: block;
              }
              .newbottomsectionlist li {
                width: 100%;
                padding: 10.4px 0;
                font-size: 17px;
                line-height: 1.45;
                border-bottom: 1px solid #ccc;
              }
              .newbottomsectionlist li a {
                color: #000;
                display: flex;
              }
              .newbottomsectionlist li a figure {
                margin-left: 10px;
                height: 60px;
                width: 90px;
              }
              .newbottomsectionlist li a figure img {
                width: 90px;
                height: 60px;
                flex-shrink: 0;
                margin-right: 15px;
              }
              .newbottomsectionlist li a h3 {
                font-size: 15px;
                width: calc(100% - 90px);
              }
              .newbottomsectionlist li:first-child {
                padding: 0;
                background: #ffffff;
              }
              .newbottomsectionlist li:first-child a {
                display: block;
              }
              .newbottomsectionlist li:first-child a h3 {
                padding: 5px 0 0;
                height: 70px;
                font-weight: bold;
                font-size: 18px;
                line-height: 23px;
                margin-bottom: 7px;
                width: 100%;
              }
              .newbottomsectionlist li:first-child a figure {
                width: 100%;
                height: 227px;
                margin-left: 0;
              }
              .newbottomsectionlist li:first-child a figure img {
                width: 100%;
                height: 227px;
              }

              .newbottomsectionlist li a .counter {
                display: none;
              }
              .newbottomsectionlist li.vid a figure:before,
              .newbottomsectionlist li.vid a figure:after {
                display: none;
              }

              figure {
                position: relative;
                line-height: 0;
                flex-shrink: 0;
                overflow: hidden;
              }
            }
          `}</style>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CategoryPageTempBottomOne;
