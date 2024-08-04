// StatelandingBottomCommon.js
import React, { useEffect, useState } from "react";
import { imageLoader } from "includes/article.util";
import categoryHelper from "includes/category.helper";
import { getArticleList } from "api/global/Common";
import SheherChuneCommon from "./ShehrChuneCommon";
import LazyLoadImage from "components/Common/CustomImage";
import CustomSkeleton from "components/Common/CustomSkeleton";
// import SheherChune from "./SheherChune";
// import SpecialWidget from "../Desktop/SpecialWidget";

const StateLandingBottomCommonPage = (props) => {
  const {
    // initialData = {},
    pageParam = {},
    // currentUrl = "",
    // pageAds = {},
    // numkey = "",
  } = props;
  const [NewsData, setNewsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [storyListData, setStoryListData] = useState([]);
  const pageNameSlug = pageParam.category;

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
  const pageLimit = 5;
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

  const filteredData = (data) => {
    if (data.length) {
      const newstoryListData = [];
      let tempObj = {};
      const films = subsection === "film-review" ? true : false;
      data.map((element) => {
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
            url: element.url,
            title: element.display_headline || element.title,
            storyID: story_id,
            ff_source: element?.ff_source || "",
            local18_video_s: element?.local18_video_s || "",
            movie_rating: parseFloat(element.movie_rating || 0),
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
            movie_rating: parseFloat(element.movie_rating),
            article_data: article_data_filtered_data,
          };
        }
        newstoryListData.push(tempObj);
      });
      setStoryListData(newstoryListData);
    }
  };

  // we are using article_dat gere , its uses show movie details like cast and ratings
  const getData = async () => {
    // let film = subsection == "film-review" ? ",article_data" : "";
    const fields =
      "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source,gallery";
    const newNewsData = await getArticleList({
      count: pageLimit,
      offset: offset,
      fields: fields,
      filter: query_arr,
    }, true);
    if (newNewsData && newNewsData.length) {
      setNewsData(newNewsData);
      setLoader(false);
      filteredData(newNewsData);
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
    categoryBoxRecord = storyListData.slice(1, 5);
  } else {
    categoryBoxRecord = storyListData.slice(0, 4);
  }

  if(loader) {
    return (
    <div className="newbottomsection">
      <div className=" newsml">
        <CustomSkeleton height="35px" />
      </div>
      <CustomSkeleton height="439px" />
    </div>);
  }
  //   SheherChuneCommon
  return (
    <>
      {NewsData && NewsData.length ? (
        <>
          <div className="newbottomsection">
            <div className="newglblhdwrap newsml">
              <h2 className="newglblhd">
                <a href={props.initialData.slug}>{props.initialData.name}</a>
              </h2>

              {pageNameSlug === "states" ? (
                <SheherChuneCommon
                  stateData={{...props.initialData, slug: section}}
                  withBg={false}
                />
              ) : (
                ""
              )}
            </div>
            <ul className="newbottomsectionlist">
              {categoryBoxRecord && categoryBoxRecord.length
                ? categoryBoxRecord.map((listNews, key) =>
                    key === 0 ? (
                      <li key={"list" + key}>
                        <a href={listNews.url}>
                          <figure>
                            <LazyLoadImage
                              width={364}
                              height={200}
                              src={imageLoader(listNews["image"], 360, 200)}
                              alt={listNews["title"] || ""}
                              title={listNews["title"] || ""}
                            />
                          </figure>
                          <h3>{listNews["title"] || ""}</h3>
                        </a>
                      </li>
                    ) : (
                      <li key={"list" + key}>
                        <a href={listNews.url}>
                          <h3>{listNews["title"] || ""}</h3>
                        </a>
                      </li>
                    ),
                  )
                : ""}
            </ul>
            <div className="moretrndstroy-secion">
              <div>
                <a href={props.initialData.slug}>
                  <span className="moretrndstroy">और भी पढ़ें</span>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default StateLandingBottomCommonPage;
