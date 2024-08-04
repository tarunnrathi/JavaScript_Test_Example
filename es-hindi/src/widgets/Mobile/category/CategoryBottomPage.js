import React, { useEffect, useState } from "react";
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
// import SITE_HELPER from "includes/helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import categoryHelper from "includes/category.helper";

import {
  getArticleList,
} from "api/global/Common";

const CategoryBottomPage = (props) => {

  const {
    pageParam = {},
    pageAds = {},
    numkey = ""
  } = props;

  const [NewsData, setNewsData] = useState([]);
  const [storyListData, setStoryListData] = useState([]);
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
  if(category_id) {
    if (changecat.indexOf(section) >= 0 || subsection == "culture") {
      // query_arr +=
      //   "category_id: (" +
      //   category_id +
      //   ")%20OR%20sub_category_id:(" +
      //   category_id +
      //   ")";
        query_arr = {
          "categories.id": category_id,
          status: 1,
        };
    } else {
      if (category_parent == 0) {
        if (section == "videos") {
          // query_arr += `content_type:("Videos")%20AND%20category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "post_type": "videos",
            status: 1,
          };
        } else if (section == "photogallery") {
          // query_arr += `content_type:("photogallery")%20AND%20category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "post_type": "photogallery",
            "status": 1,
          };
        } else {
          // query_arr += `category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "status": 1,
          };
        }
      } else {
        if (section == "videos") {
          // query_arr += `content_type:("Videos")%20AND%20sub_category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "post_type": "videos",
            "status": 1,
            not: { "categories.parent": 0 },
          };
        } else if (section == "photogallery") {
          // query_arr += `content_type:("photogallery")%20AND%20sub_category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "post_type": "photogallery",
            "status": 1,
            not: { "categories.parent": 0 },
          };
        } else {
          // query_arr += `sub_category_id:(${category_id})`;
          query_arr = {
            "categories.id": category_id,
            "status": 1,
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
      const films = (subsection == "film-review") ? true : false;
      data.map((element, key) => {
        const { story_id } = element;
        let article_data_filtered_data = {};
        if(films) {
          article_data_filtered_data = {
            movie_cast: element["movie_cast"] || "",
            movie_date: element["movie_date"] || "",
            movie_genre: element["movie_genre"] || "",
            headline: element["headline"] || "",
          };
        }else{
          article_data_filtered_data = {
            movie_cast: "",
            movie_date: "",
            movie_genre: "",
            headline: "",
          };
        }
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

  const getData = async () => {
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

  const cricketVideoCheck = category_id===29 && props.initialData.sectionName==="videos";
  return (
    <>
      {NewsData && NewsData.length && !cricketVideoCheck ? (
        <>
          <div className="pdngsxtn">
            {/* {categoryBoxRecord && categoryBoxRecord.length && categoryBoxRecord.map(renderHTML)} */}
            <div className="glblbghd-sts">
              <h2 className="hd">
                <a href={props.initialData.slug + firstPage}>
                  {props.initialData.name}
                </a>
              </h2>
            </div>

            {props.initialData.type != "undefined" &&
            props.initialData.type == "box"
              ? topRecord.map((listNews, key) => (
                  <div className="pgtbox vsp16">
                    <ul>
                      <li>
                        <figure>
                          <a href={listNews.url}>
                            <LazyImage
                              width={364}
                              height={288}
                              src={imageLoader(listNews["image"], 360, 288)}
                              alt={listNews["title"] || ""}
                              title={listNews["title"] || ""}
                              unoptimized={true}
                              className="lazyload"
                              isRes={true}
                            />
                          </a>
                          <div className="chmpntpnwshd">
                            <a href={listNews.url}>
                              <div className="tpall">
                                <span className="tpc">
                                  {listNews.sectionName}
                                </span>
                              </div>
                            </a>
                            <h3>
                              <a href={listNews.url}>{listNews.title}</a>
                            </h3>
                          </div>
                        </figure>
                      </li>
                    </ul>
                  </div>
                ))
              : ""}

            <div className="vsp16">
              <ul
                className={`gridview-story ${
                  subsection == "film-review" ? "film-review-news" : ""
                }`}
              >
                {categoryBoxRecord && categoryBoxRecord.length
                  ? categoryBoxRecord.map((listNews, key) => (
                      <li key={key}>
                        <figure>
                          {subsection == "film-review" &&
                          listNews["movie_rating"] ? (
                            <div className="mvrtng-uponpht">
                              <div className="mvrtng-xsm">
                                <div className="mvrtng-str fl">
                                  <div className="star-nmbr formvxsm fl">
                                    <span
                                      className={`starsprite ${
                                        Math.floor(listNews["movie_rating"]) >=
                                        1
                                          ? "mvsm-full"
                                          : listNews["movie_rating"] > 0 &&
                                            listNews["movie_rating"] < 1
                                          ? "mvsm-half"
                                          : "mvsm"
                                      }`}
                                    ></span>
                                    <span
                                      className={`starsprite ${
                                        Math.floor(listNews["movie_rating"]) >=
                                        2
                                          ? "mvsm-full"
                                          : listNews["movie_rating"] > 1 &&
                                            listNews["movie_rating"] < 2
                                          ? "mvsm-half"
                                          : "mvsm"
                                      }`}
                                    ></span>
                                    <span
                                      className={`starsprite ${
                                        Math.floor(listNews["movie_rating"]) >=
                                        3
                                          ? "mvsm-full"
                                          : listNews["movie_rating"] > 2 &&
                                            listNews["movie_rating"] < 3
                                          ? "mvsm-half"
                                          : "mvsm"
                                      }`}
                                    ></span>
                                    <span
                                      className={`starsprite ${
                                        Math.floor(listNews["movie_rating"]) >=
                                        4
                                          ? "mvsm-full"
                                          : listNews["movie_rating"] > 3 &&
                                            listNews["movie_rating"] < 4
                                          ? "mvsm-half"
                                          : "mvsm"
                                      }`}
                                    ></span>
                                    <span
                                      className={`starsprite ${
                                        Math.floor(listNews["movie_rating"]) >=
                                        5
                                          ? "mvsm-full"
                                          : listNews["movie_rating"] > 4 &&
                                            listNews["movie_rating"] < 5
                                          ? "mvsm-half"
                                          : "mvsm"
                                      }`}
                                    ></span>
                                  </div>
                                  <div className="star-pnts fl">
                                    {listNews.movie_rating || "0"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <a href={listNews.url}>
                            <div className="tgtm-shr">
                              <span className="tpc fl">
                                {listNews.sectionName}
                              </span>
                            </div>
                          </a>
                          <a href={listNews.url}>
                            <LazyImage
                              width={164}
                              height={109}
                              src={imageLoader(listNews["image"], 360, 288)}
                              alt={listNews["title"] || ""}
                              title={listNews["title"] || ""}
                              unoptimized={true}
                              className="lazyload"
                              isRes={true}
                            />
                          </a>
                        </figure>
                        {subsection == "film-review" ? (
                          <>
                            <div className="lstintro txt10 txtdarkgrey">
                              <div>
                                <b>{listNews?.article_data["movie_genre"]}</b>
                              </div>
                              <h4 className="txt12 vsp4">
                                <b>
                                  Review: {listNews?.article_data["headline"]}
                                </b>
                              </h4>
                              <div className="txtlgtgrey vsp4">
                                कास्ट : {listNews?.article_data["movie_cast"]}
                              </div>{" "}
                              <div className="vsp4">
                                <b>पर्दे पर </b> :{" "}
                                {listNews?.article_data["movie_date"]}
                              </div>{" "}
                            </div>
                          </>
                        ) : (
                          <div className="lstintro test">
                            {pageParam.isStatePage ? <><span>{props.initialData.name}</span></> : ""}
                            <h3>
                              <a href={listNews.url}>{listNews.title}</a>
                            </h3>
                          </div>
                        )}
                      </li>
                    ))
                  : ""}
              </ul>
              <a
                href={props.initialData.slug + firstPage}
                className="glblbghd-sts-mrnav"
              >
                और भी पढ़ें...
              </a>
            </div>
          </div>
          {numkey == 0 || numkey == 3 ? (
            <div className="clearfix add cat-top-ad">
              <div className="addinner-box">
                <SiteAd
                  slotId={
                    numkey == 0
                      ? `mobile_atf_300`
                      : numkey == 3
                      ? "mobile_btf_300"
                      : ""
                  }
                  adUnit={
                    numkey == 0
                      ? pageAds.ATF_300
                      : numkey == 3
                      ? pageAds.BTF_300
                      : ""
                  }
                  sizes={
                    numkey == 0
                      ? [[300, 250], [336, 280]]
                      : numkey == 3
                      ? [[300, 250], [336, 280]]
                      : []
                    }
                  width={300}
                  height={280}
                  lazyload={true}
                />
                {numkey == 0 ? <SiteAd
                  slotId="PG_Slider_1x1"
                  adUnit={
                    "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
                  }
                  sizes={[[1, 1]]}
                  renderOutOfThePage={true}
                  removeAdSpan={true}
                  loadonScroll={true}
                />
                : null}
              </div>
            </div>
          ) : (
            ""
          )}
          {sub_section == "tv" || sub_section == "youtube" ? (
            <>
              <div className="pwa_add manoranjan-bottom-ad">
                <div className="addinner-box">
                  <SiteAd
                    slotId={
                      sub_section == "tv" ? "mobile_atf_300" : "mobile_btf_300"
                    }
                    adUnit={
                      sub_section == "tv"
                        ? "NW18_HIND_PWA/NW18_HIND_MANORANJAN_PWA/NW18_HIND_MANORANJAN_PWA_AL/NW18_HIND_MANO_AL_PWA_ROS_ATF_300"
                        : "NW18_HIND_PWA/NW18_HIND_MANORANJAN_PWA/NW18_HIND_MANORANJAN_PWA_AL/NW18_HIND_MANO_AL_PWA_ROS_BTF_300"
                    }
                    sizes={[

                      [300, 250],
                      [336, 280]
                    ]}
                    width={300}
                    height={250}
                    lazyload={true}
                  />
                  {sub_section == "tv" ? <SiteAd
                    slotId="PG_Slider_1x1"
                    adUnit={
                      "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
                    }
                    sizes={[[1, 1]]}
                    renderOutOfThePage={true}
                    removeAdSpan={true}
                    loadonScroll={true}
                  />
                  : null}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
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
          `}</style>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CategoryBottomPage;
