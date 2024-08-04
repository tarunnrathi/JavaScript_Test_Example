import React, { useEffect, useState } from "react";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
import { imageLoader } from "includes/article.util";
// import LazyImage from "components/Common/LazyImage";
import categoryHelper from "includes/category.helper";
import {
  // getRedisDataByKey,
  getArticleList,
} from "api/global/Common";
import SheherChune from "./SheherChune";

const StateLandingBottomPage = (props) => {
  const {
    // initialData = {},
    pageParam = {},
    // currentUrl = "",
    // pageAds = {},
    numkey = "",
  } = props;
  // console.log({numkey});
  const [NewsData, setNewsData] = useState([]);
  const [storyListData, setStoryListData] = useState([]);
  const pageNameSlug = pageParam.category;
  let firstPage = "";
  if (
    props.initialData.sectionName == "bollywood" ||
    props.initialData.sectionName == "hollywood" ||
    props.initialData.sectionName == "tv" ||
    pageParam.isStatePage
  ) {
    firstPage = "page-1/";
  } else {
    firstPage = "";
  }

  let query_arr = "";
  const section = props.initialData.sectionName;
  // section = (section == 'photogallery') ? 'photo' : section
  let sub_section,
    subsection = "";
  //Find the section exists or not
  let category = "";
  const { categoryListData } = props.pageParam;
  let category_id = "";
  let category_parent = "";
  let category_name = "";
  if (section == "videos" || section == "photogallery" || section == "news") {
    category_id = props.pageParam.get_section.id;
    category_parent = props.pageParam.get_section.parent;
    category_name = props.pageParam.get_section.name;
  } else {
    category = categoryHelper.get_section(section, categoryListData);
    category_id = category.id;
    category_parent = category.parent;
    category_name = category.name;
  }

  const changecat = ["auto", "culture"];
  const pageLimit = 5;
  const offset = 0;
  if (category_id) {
    if (changecat.indexOf(section) >= 0 || subsection == "culture") {
      query_arr = {
        "categories.id": category_id,
        status: 1,
      };
    } else {
      if (category_parent == 0) {
        if (section == "videos") {
          query_arr = {
            "categories.id": category_id,
            post_type: "videos",
            status: 1,
          };
        } else if (section == "photogallery") {
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
        if (section == "videos") {
          query_arr = {
            "categories.id": category_id,
            post_type: "videos",
            status: 1,
          };
        } else if (section == "photogallery") {
          query_arr = {
            "categories.id": category_id,
            post_type: "photogallery",
            status: 1,
          };
        } else {
          query_arr = {
            "categories.id": category_id,
            status: 1,
            not: { "categories.parent": 0 },
          };
        }
      }
    }
  }

  const priorityData = 0;

  const filteredData = (data) => {
    if (data.length) {
      const storyListData = [];
      let tempObj = {};
      const films = subsection == "film-review" ? true : false;
      data.map((element, key) => {
        const { story_id } = element;
        let article_data_filtered_data = {};
        if (films) {
          article_data = JSON.parse(element.article_data);
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
        if (priorityData == 1) {
          tempObj = {
            image: element.images.url,
            createdTime: element.insert_date,
            sectionName: element?.category?.[element?.category?.length - 1],
            url: element.url,
            title: element.display_headline || element.title,
            storyID: story_id,
            ff_source: element?.ff_source || "",
            local18_video_s: element?.local18_video_s || "",
            movie_rating: eval(element.movie_rating || 0),
            // article_data: JSON.parse(element.article_data),
            article_data: article_data_filtered_data,
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
            ff_source: element?.ff_source || "",
            local18_video_s: element?.local18_video || "",
            movie_rating: eval(element.movie_rating || 0),
            article_data: article_data_filtered_data,
          };
        }
        storyListData.push(tempObj);
      });
      setStoryListData(storyListData);
    }
  };

  // we are using article_dat gere , its uses show movie details like cast and ratings
  const getData = async () => {
    // let film = subsection == "film-review" ? ",article_data" : "";
    const fields =
      "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source";
    const NewsData = await getArticleList(
      { count: pageLimit, offset: offset, fields: fields, filter: query_arr },
      true
    );
    if (NewsData && NewsData.length) {
      setNewsData(NewsData);
      filteredData(NewsData);
    }
  };

  useEffect(() => {
    query_arr && getData();
  }, []);

  let topRecord = [];
  let categoryBoxRecord = [];
  if (
    props.initialData.type != "undefined" &&
    props.initialData.type == "box"
  ) {
    topRecord = storyListData.slice(0, 1);
    categoryBoxRecord = storyListData.slice(1, 5);
  } else {
    categoryBoxRecord = storyListData.slice(0, 4);
  }
  return (
    <>
      {NewsData && NewsData.length ? (
        <>
          {/* <div className="artcl_lft"> */}
          {/* {categoryBoxRecord && categoryBoxRecord.length && categoryBoxRecord.map(renderHTML)} */}
          <ul className="statelistingnews" key={numkey}>
            <li>
              <h2>
                <a href={props.initialData.slug}>{props.initialData.name}</a>
              </h2>
              {pageNameSlug == "states" ? (
                <SheherChune initialData={props.initialData} />
              ) : (
                ""
              )}
              {categoryBoxRecord && categoryBoxRecord.length
                ? categoryBoxRecord.map((listNews, key) =>
                    //   {key}
                    key == 0 ? (
                      <>
                        <a href={listNews.url}>
                          <img
                            width={364}
                            height={200}
                            src={imageLoader(listNews["image"], 360, 200)}
                            alt={listNews["title"] || ""}
                            title={listNews["title"] || ""}
                            unoptimized={true}
                            isRes={true}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=200";
                            }}
                          />
                          <h3>{listNews["title"] || ""}</h3>
                        </a>
                      </>
                    ) : (
                      <a href={listNews.url}>
                        <h4>{listNews["title"] || ""}</h4>
                      </a>
                    )
                  )
                : ""}
              <h5>
                <a href={props.initialData.slug}>और भी पढ़ें...</a>
              </h5>
            </li>
          </ul>
          <style jsx global>{`
            .pdngsxtn {
              padding: 16px;
            }
            .gridview-story li .lstintro {
              padding: 0 8px;
              cursor: pointer;
              margin: 0;
              clear: both;
              overflow: hidden;
            }
            .mvrtng-xsm,
            .txt10 {
              font-size: 12px !important;
            }
            .mvrtng-xsm,
            .txt10 {
              font-size: 10px;
            }
            .txtdarkgrey {
              color: #313131;
            }
            .gridview-story li .lstintro h4 {
              font-size: 16px !important;
              line-height: 1.45 !important;
            }
            .vsp4 {
              margin-top: 4px;
            }
            .gridview-story li .lstintro h4 b {
              color: #111 !important;
              font-weight: 400 !important;
            }
            .txtlgtgrey {
              color: #828282;
            }
            .film-review-news li figure {
              margin-bottom: 2px;
            }
            .mvrtng-uponpht,
            .phtcrdt {
              position: absolute;
              right: 0;
            }
            .mvrtng-uponpht {
              background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
              bottom: 0;
              left: 0;
              padding: 32px 8px 8px;
              cursor: pointer;
              color: #fff;
              z-index: 9;
            }
            .mvrtng-xsm,
            .txt10 {
              font-size: 12px !important;
            }
            .fl {
              float: left;
            }
            .star-nmbr {
              display: flex;
              margin-right: 5px;
            }
            .starsprite.mvsm-full {
              background-position: -26px -19px;
            }
            .starsprite.mvsm-half {
              background-position: -13px -19px;
            }
            .starsprite.mvsm {
              background-position: 0 -19px;
            }
            .formvxsm span {
              width: 12px;
              height: 12px;
              display: inline-block;
              margin-right: 2px;
            }
            .starsprite.mvsm {
              background-position: 0 -19px;
            }
            .star-pnts {
              color: #fff;
              font-size: 11px;
            }
            .starsprite {
              background: url(https://images.news18.com/ibnkhabar/uploads/assests/pwa/images/star-sprite.png)
                no-repeat;
              display: block;
            }
            .manoranjan-bottom-ad {
              width: 92%;
              margin: 0 4%;
            }
            .gridview-story li h3 {
              font-size: 16px;
              line-height: 1.45;
              clear: both;
              font-weight: 400;
            }
            .gridview-story li a {
              color: #000;
              z-index: 9999;
            }

            .gridview-story li figure .tgtm-shr .tpc {
              display: none !important;
            }
            .pwa_add .addinner-box {
              height: 268px;
              width: 300px;
              margin: 0 auto;
            }
            .nwvideoicon {
              width: 45px;
              height: 45px;
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 1;
              margin: -22px 0 0 -22px;
              cursor: pointer;
              opacity: 0.7;
              background: url(/images/siteimages/video-iconnew.png)
                0 0 no-repeat;
            }
            .statelistingnewswrap {
              display: flex;
              flex-wrap: wrap;
            }
            .statelistingnews {
              width: 31%;
              margin-bottom: 30px;
              margin-right: 2%;
            }

            .statelistingnews li {
              position: relative;
            }
            .statelistingnews li {
              margin-bottom: 30px;
              margin-right: 2%;
            }

            .statelistingnews:nth-child(3n +) {
              margin-right: 0px;
            }

            .statelistingnews li a figure {
              margin-bottom: 10px;
            }
            .statelistingnews li a:hover {
              color: #ee1c25;
            }
            .statelistingnews li h2 {
              border-bottom: 2px solid #e1261c;
              margin-bottom: 12px;
            }
            .statelistingnews li h2 a {
              font-size: 24px;
              font-weight: bold;
              line-height: 24px;
            }
            .statelistingnews li a h3 {
              font-size: 18px;
              line-height: 24px;
              font-weight: bold;
              margin-bottom: 10px;
              display: block;
            }
            .statelistingnews li a img {
              width: 100%;
              height: 200px;
            }
            .statelistingnews li a h4 {
              height: 55px;
              overflow: hidden;
              font-size: 16px;
              line-height: 24px;
              border-top: 1px solid #ccc;
              padding: 10px 0;
              font-weight: normal;
              display: block;
            }
            .statelistingnews li h5 a {
              line-height: 22px;
              font-size: 14px;
              text-align: right;
              padding: 10px 0;
              color: #ee1c25;
              font-weight: bold;
              border-top: 1px solid #ccc;
              display: block;
            }
            .artcl_container {
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              padding-top: 10px;
            }
            .artcl_container .artcl_lft {
              width: calc(100% - 320px);
            }
            .artcl_container .artcl_rght {
              width: 300px;
            }
            .scrollbar {
              white-space: nowrap;
              overflow-x: scroll;
              --scroll-color: #c6c6c6;
              --scroll--hover-color: #666;
              position: relative;
            }
            .scrollbar::-webkit-scrollbar {
              height: 5px;
            }
            .scrollbar::-webkit-scrollbar-thumb {
              background-color: var(--scroll-color);
              border-radius: 4px;
            }
            .dflthdr {
              line-height: 0;
              text-align: center;
            }
          `}</style>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default StateLandingBottomPage;
