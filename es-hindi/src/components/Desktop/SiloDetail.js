import { logEvent } from "includes/googleAnalytic";
import React from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { topicParser, topicParserContent } from "../../includes/silo.utils";
import RelatedNews from "widgets/Common/Mobile/RelatedNews";
import { timeConverter } from "includes/blogs.util";

const TopicDetails = (props) => {
  const {
    siloListing = [],
    currentUrl = "",
    pageAds = {},
    rhsTopStoryListing = [],
    urlParam: { topic = "" } = {},
    photoStories,
    topStories,
  } = props.data || {};
  const checkKeys = (obj = {}, key = "") => {
    return obj && Object.keys(obj).includes(key);
  };
  const currentTopic = siloListing[0] || {};
  const {
    updated_at = "",
    title = "",
    id = "",
    sub_heading = "",
  } = currentTopic;
  const { intro = "", body } = currentTopic?.intro || {};
  const bookMarkList = checkKeys(currentTopic, "manage_data_heading")
    ? currentTopic?.manage_data_heading
    : [];
  const bookMarkedBody = checkKeys(currentTopic, "manage_data_list")
    ? currentTopic?.manage_data_list
    : [];
  const related_silo = checkKeys(currentTopic, "related_silo")
    ? currentTopic?.related_silo
    : [];
  const [activeQuestion, setActiveQuestion] = React.useState({
    id: 0,
    isActive: false,
  });
  const tags = checkKeys(currentTopic, "tags")
    ? currentTopic?.tags.map((itm) => ({ slug: itm.slug }))
    : [];

  const filteredBody = bookMarkList.length
    ? bookMarkList.filter((item) => !item?.includes("FAQs"))
    : [];
  const data_list = bookMarkedBody.length
    ? bookMarkedBody.filter((item) => !item?.blog_title?.includes("FAQs"))
    : [];
  const faq_list = bookMarkedBody.length
    ? bookMarkedBody.filter((item) => item?.blog_title?.includes("FAQs"))
    : [];
  if (faq_list && faq_list.length) {
    if (filteredBody.length) filteredBody.push("FAQs");
  }
  const reorderedBody = [];
  if (data_list.length) reorderedBody.push(...data_list);
  if (faq_list.length) reorderedBody.push(faq_list[0]);
  const createRefs = (bodyP) => {
    return bodyP && bodyP.length
      ? bodyP.map((acc, value) => {
          acc[value] = React.createRef();
          return acc;
        })
      : [];
  };

  const refs = createRefs(reorderedBody);
  const handleClick = (ids) => {
    const headerOffset = 56;
    const elementPosition = refs[ids].current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
      // block: 'start',
    });
  };

  return (
    <>
      <section className="container clearfix">
        <div className="left_wrap">
          <div className="bredcru_m">
            <div className="bredcrum_containr">
              <a href="/">
                <span>Home</span>
              </a>
              »<span>{topic}</span>
            </div>
            <div className="aadhar_byline">
              <b>Last Updated : </b>
              <time dateTime={updated_at}>{timeConverter(updated_at)}</time>
            </div>
          </div>

          <div className="page_layout">
            <div className="uppr_pag_layut">
              <h1 className="pag_main_hdng">{topicParserContent(title)}</h1>
              <ul className="phtstrtupdt-shr">
                <li>
                  <a
                    className="for-whatsapp"
                    href={"https://wa.me/?text=" + currentUrl + "&t=" + title}
                    target="_blank"
                    onClick={() =>
                      logEvent(
                        "Social_Share",
                        "Click",
                        `${title},${id},whatsapp`,
                      )
                    }
                  >
                    <span className="spriteshare art-whatsapp-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      "https://www.facebook.com/sharer.php?u=" +
                      currentUrl +
                      "&t=" +
                      title
                    }
                    target="_blank"
                    onClick={() =>
                      logEvent(
                        "Social_Share",
                        "Click",
                        `${title},${id},facebook`,
                      )
                    }
                  >
                    <span className="spriteshare art-facebook-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      "https://telegram.me/share/url?url=?mini=true&url=" +
                      currentUrl +
                      "&t=" +
                      title
                    }
                    target="_blank"
                    onClick={() =>
                      logEvent(
                        "Social_Share",
                        "Click",
                        `${title},${id},telegram`,
                      )
                    }
                  >
                    <span className="spriteshare art-telegram-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      "https://twitter.com/share?text=" +
                      currentUrl +
                      "&t=" +
                      title
                    }
                    target="_blank"
                    onClick={() =>
                      logEvent(
                        "Social_Share",
                        "Click",
                        `${title},${id},twitter`,
                      )
                    }
                  >
                    <span className="spriteshare art-twitter-icon"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: topicParserContent(intro) }}
            ></div>
            <div className="info_lists_sec">
              <div className="subsect_list_sec">
                <h4>विषयसूची</h4>
                <ul className="subsect_lists">
                  {data_list
                    ? data_list.map((item, index) => {
                        return (
                          <li onClick={() => handleClick(index)} key={index}>
                            <a href="javascript:void(0)">
                              {topicParserContent(item.blog_title)}
                            </a>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
              <div className="aadharcard_info_sec">
                <h4>{topicParserContent(sub_heading)}</h4>
                <ul className="aadharcard_info">
                  {related_silo && related_silo?.length
                    ? related_silo.map((item, index) => {
                        return (
                          <li key={index}>
                            <a href={`/${item.weburl}`} className="inf_act">
                              {topicParserContent(item.title)}
                            </a>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
            <div
              className="aadhar_desc_sec"
              dangerouslySetInnerHTML={{ __html: body }}
            ></div>
            {data_list
              ? data_list.map((item, index) => {
                  return (
                    <div
                      ref={refs[index]}
                      key={index}
                      className="aadhar_desc_sec"
                      dangerouslySetInnerHTML={{
                        __html: topicParser(
                          item?.blog_content,
                          item?.blog_title,
                        ),
                      }}
                    ></div>
                  );
                })
              : ""}
            {faq_list && faq_list.length ? (
              <div
                className="aadhar_desc_sec"
                ref={refs[reorderedBody.length - 1]}
              >
                <h3>
                  {topicParserContent(sub_heading)} से संबंधित अक्सर पूछे जाने
                  वाले प्रश्न
                </h3>
                <ol className="info_ol_lists accrdians_lists">
                  {faq_list
                    ? faq_list.map((faqItem) => {
                        const faqItems =
                          faqItem?.blog_content.split(/\[\/ans\]/);
                        return faqItems.map((item, index) => {
                          const question = item
                            .split(/\[\/q\]/gi)[0]
                            ?.replace(/\[q\]/gi, "");
                          const answer = item
                            .split(/\[\/q\]/gi)[1]
                            ?.replace(/\[\ans\]/gi, "");
                          return answer ? (
                            <li key={index}>
                              <button
                                type="button"
                                className={
                                  activeQuestion.isActive &&
                                  activeQuestion.id === index
                                    ? "accordion active"
                                    : "accordion"
                                }
                                onClick={() =>
                                  setActiveQuestion({
                                    id: index,
                                    isActive: !activeQuestion.isActive,
                                  })
                                }
                              >
                                {" "}
                                <strong>प्र.</strong>{" "}
                                {topicParserContent(question)}{" "}
                              </button>
                              <div className="panel">
                                <p>{topicParserContent(answer)}</p>
                              </div>
                            </li>
                          ) : (
                            ""
                          );
                        });
                      })
                    : ""}
                </ol>
              </div>
            ) : null}
          </div>
          {tags.length > 0 && (
            <RelatedNews
              isDesktop={true}
              tags={tags}
              id={currentTopic?.id}
            />
          )}

          <SiteAd
            width={728}
            height={90}
            slotId={"Desktop_Static_Ad_2"}
            adUnit={pageAds.BTF_728}
            sizes={[
              [728, 90],
              [1, 1],
            ]}
            loadonScroll={true}
          ></SiteAd>
        </div>
        <RhsCommon
          pageAds={pageAds}
          currentURL={currentUrl}
          photoStories={photoStories}
          isRss={true}
          topStories={
            rhsTopStoryListing.length ? rhsTopStoryListing : topStories
          }
        />
      </section>
      <style jsx global>
        {`
          /* devanagari start*/
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
              format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2)
              format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }
          /* devanagari end*/
          /* latin start*/
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 400;
            src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 700;
            src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin end*/
          /* default css (ignore it while implementing) */
          * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            list-style: none;
            text-decoration: none;
            outline: 0px;
          }
          .aadhar_byline {
            color: #949494;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 400;
            line-height: 21px;
          }
          .aadhar_byline b {
            color: #454545;
            font-weight: 700;
          }
          /* section css (use it while implementing) */
          .upper_sec {
            position: relative;
            // background-color: #f2f2f2;
            width: 100%;
          }
          .left_wrap * {
            font-family: "Mukta";
          }
          .content_wrapper {
            max-width: 1284px;
            background: #fff;
            margin: auto;
            padding: 20px;
          }
          .upper_sec {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 0px 0px 25px;
          }
          .aadhar_desc_sec table {
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: "Eczar", serif;
          }
          .aadhar_desc_sec table td {
            padding: 8px;
            vertical-align: top;
            font-size: 12px;
            line-height: 32px;
            border: 1px solid #eee;
            text-align: left;
            font-family: "Eczar", serif;
          }
          .aadhar_desc_sec table td p {
            line-height: 9px;
          }
          .aadhar_desc_sec table td h2 {
            padding-top: 10px;
            color: white;
            text-align: center;
            font-size: 21px;
          }
          .aadhar_desc_sec table tr:first-of-type td {
            background: #666;
            color: #fff;
            font-weight: 700;
          }
          .aadhar_desc_sec table {
            width: 100%;
            border-collapse: collapse;
            overflow: auto;
          }

          .left_wrap {
            width: calc(100% - 325px);
            float: left;
            position: relative;
            font-family: "Mukta", sans-serif;
          }
          .right_wrap {
            width: 300px;
          }
          .rght_containr {
            position: sticky;
            top: 10px;
            z-index: 1;
          }
          /* breadcrumb section css */
          .bredcru_m {
            border-bottom: 1px dotted #939393;
            padding-bottom: 5px;
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
          }
          .aadhar_desc_sec iframe {
            height: 434px;
            margin: 12px auto 12px auto;
            display: block;
            width: 643px;
          }
          .bredcrum_containr {
            font-weight: 400;
            font-size: 13px;
            min-height: 24px;
            align-items: center;
            line-height: 15px;
            color: #3e3e3e;
          }
          .bredcrum_containr a {
            margin: 0 2px;
            color: #3e3e3e;
          }
          .bredcrum_containr .act {
            color: #838383;
          }
          .rlt_d_nw_s_sec {
            margin-bottom: 10px;
            width: 924px;
            background: rgb(62, 62, 62);
            flex-shrink: 0;
            overflow: hidden;
            margin-right: 0;
            height: max-content;
          }
          .rlt_d_nw_hdng {
            font-size: 20px;
            justify-content: center;
            line-height: 21px;
            padding-top: 7px;
            padding-bottom: 2px;
            color: rgb(255, 255, 255);
            font-weight: bold;
            background-color: rgb(225, 38, 29);
            display: flex;
            align-items: center;
          }
          .rlt_d_nw_lis_ts {
            width: 924px;
            display: flex;
            justify-content: space-evenly;
            margin: 20px auto 0px;
          }
          .rlt_d_nw_lis_ts li {
            margin-bottom: 0px;
            width: 156px;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts .rlt_d_nw_lis_ts_img {
            width: 156px;
            max-height: 111px;
            overflow: hidden;
            border: 1px solid #9b9b9b;
            box-shadow: initial;
            background: none;
            padding: 0px;
            object-fit: cover;
            line-height: initial;
            position: relative;
            margin: auto auto 10px auto;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts .rlt_d_nw_lis_ts_img img {
            width: 100%;
            display: block;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts li p {
            color: #fff;
            font-size: 15px;
            line-height: 20px;
            font-weight: 700;
            padding-top: 0px;
          }
          /* ************** glide slider section *********** */
          .aadhaar_slider_section {
            width: 560px;
            margin: 12px auto 12px auto;
            display: block;
            border: 1px solid #cecece;
            background: #fff;
            box-shadow: 0px 3px 6px #00000029;
          }
          .aadhaar_slider_section .aadhaar_slider {
            overflow: hidden;
            margin: 0px 10px;
            padding: 10px 0px;
            box-sizing: border-box;
          }
          .aadhaar_slider .aadhaar_slides {
            display: flex;
            justify-content: space-between;
          }
          .aadhaar_slider .aadhaar_slides li {
            position: relative;
          }
          .aadhaar_slider .aadhaar_slides li .over_lay {
            left: 0px;
          }
          /* ********** slider bullets and arrow *********** */
          .aadhaar_slider .glide_arrw_buttons {
            position: relative;
            top: 25px;
            display: flex;
            justify-content: space-between;
            padding: 0px 170px;
          }
          .aadhaar_slider .left-arrow,
          .aadhaar_slider .right-arrow {
            width: 10px;
            height: 15px;
            transform: translate(0, -50%);
            border: none;
            outline: none;
            cursor: pointer;
          }
          .aadhaar_slider .left-arrow::before {
            content: "";
            border-top: 2px solid #707070;
            border-left: 2px solid #707070;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            left: 2px;
            top: 3px;
          }
          .aadhaar_slider .left-arrow::after {
            content: "";
            width: 10px;
            height: 2px;
            background: #707070;
            position: absolute;
            left: 3px;
            top: 7px;
          }
          .aadhaar_slider .right-arrow::before {
            content: "";
            border-bottom: 2px solid #707070;
            border-right: 2px solid #707070;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            right: 2px;
            top: 3px;
          }
          .aadhaar_slider .right-arrow::after {
            content: "";
            height: 2px;
            width: 10px;
            position: absolute;
            right: 3px;
            top: 7px;
            background: #707070;
          }
          .aadhaar_slider .glide__bullets {
            display: inline-flex;
            justify-content: center;
            position: relative;
            top: -1px;
            margin: 0 auto;
            text-align: center;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%);
          }
          .aadhaar_slider .glide__bullets .glide__bullet {
            width: 6px;
            height: 6px;
            background: #bababa;
            display: block;
            margin-right: 8px;
            border-radius: 50%;
            overflow: hidden !important;
            outline: none;
            border: none;
            cursor: pointer;
          }
          .aadhaar_slider .glide__bullets .glide__bullet--active {
            background: #e1261d !important;
            width: 18px;
            height: 6px;
            border-radius: 8px;
          }

          /* *********** social icons section ********** */
          .page_layout .uppr_pag_layut {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0px;
          }
          .youTubeVideoPlayer {
            width: 560px;
            height: 360px;
            margin: 20px auto;
          }
          .pag_main_hdng {
            width: calc(100% - 250px);
            font-size: 36px;
            line-height: 44px;
            color: #001d42;
            font-weight: 800;
          }
          .news_page_right {
            width: 300px;
            float: right;
            position: sticky;
            top: -55px;
            margin-left: -295px;
          }
          .phtstrtupdt-shr {
            display: flex;
            align-items: center;
            text-align: left;
            width: 240px;
          }
          .phtstrtupdt-shr li {
            color: #6b6b6b;
            font-size: 14px;
            margin-left: 10px;
            text-transform: uppercase;
            line-height: 0;
          }
          .phtstrtupdt-shr li:first-child {
            margin-left: 0px;
          }
          .spriteshare {
            background: url(/images/siteimages/sprite_img_1.svg)
              0 0 no-repeat;
            width: 40px;
            height: 40px;
            display: block;
          }
          .spriteshare.art-whatsapp-icon {
            background-position: 0px -150px;
          }
          .spriteshare.art-facebook-icon {
            background-position: 0px 0px;
          }
          .spriteshare.art-telegram-icon {
            background-position: 0 -200px;
          }
          .spriteshare.art-twitter-icon {
            background-position: 0px -50px;
          }
          .spriteshare.art-linkedin-icon {
            background-position: 0px -100px;
          }
          /* *********** Subject Index section ************* */
          .cont_nt {
            font-size: 17px;
            line-height: 28px;
            color: #404040;
            font-weight: 400;
            padding: 0px 0px 10px;
          }
          .info_lists_sec {
            background: #f5f5f5;
            border-top: 1px dotted #939393;
            padding: 10px 20px;
            min-height: 360px;
            display: flex;
            justify-content: space-between;
            border-bottom: 3px solid #e1261d;
            margin-bottom: 10px;
          }
          .subsect_list_sec {
            width: calc(100% - 330px);
          }
          .aadharcard_info_sec {
            width: 322px;
            background: #ffffff;
            padding: 10px;
          }
          .subsect_list_sec h4 {
            font-size: 16px;
            line-height: 28px;
            font-weight: 700;
            color: #e1261d;
            padding-top: 10px;
          }
          .subsect_lists {
            position: relative;
            padding-left: 20px;
          }
          .subsect_lists:before {
            content: "";
            position: absolute;
            left: 5px;
            width: 1px;
            display: block;
            z-index: 1;
            top: 16px;
            background: #707070;
            height: calc(100% - 32px);
          }
          .subsect_lists li {
            margin-bottom: 0px;
          }
          .subsect_lists li a {
            font-size: 16px;
            color: #007fce;
            line-height: 28px;
            font-weight: 400;
            display: inline-block;
            position: relative;
            border-bottom: 1px solid #007fce;
            margin-bottom: 0px;
          }
          .subsect_lists li a:before {
            content: "";
            width: 7px;
            height: 7px;
            border: 1px solid #707070;
            position: absolute;
            z-index: 2;
            border-radius: 100%;
            top: 8px;
            left: -19px;
            background: #ffffff;
          }
          .aadharcard_info_sec h4 {
            font-size: 16px;
            line-height: 28px;
            font-weight: 700;
            color: #001d42;
          }
          .aadharcard_info {
            height: 319px;
            overflow: auto;
          }
          .aadharcard_info li a.inf_act {
            color: #e1261d;
          }
          .aadharcard_info li {
            margin-bottom: 0px;
          }
          .adunitContainer {
            text-align: center;
          }
          .aadharcard_info li a {
            font-size: 16px;
            color: #3c3c3c;
            line-height: 28px;
            font-weight: 400;
            position: relative;
            margin-left: 15px;
            margin-bottom: 0px;
            display: inline-block;
            border-bottom: 1px solid #3c3c3c;
          }
          .aadharcard_info li a:before {
            content: "";
            position: absolute;
            top: 10px;
            width: 4px;
            left: -15px;
            height: 4px;
            border-top: 1px solid #3c3c3c;
            border-right: 1px solid #3c3c3c;
            display: block;
            transform: rotate(45deg);
          }
          /* ******** custom scrollbar ********** */
          ul.aadharcard_info::-webkit-scrollbar {
            width: 6px;
          }
          ul.aadharcard_info::-webkit-scrollbar-track {
            background: #d6d6d6 0% 0% no-repeat padding-box;
            border-radius: 10px;
            overflow: hidden;
          }
          ul.aadharcard_info::-webkit-scrollbar-thumb {
            background: #898989 0% 0% no-repeat padding-box;
            border-radius: 10px;
            overflow: hidden;
          }
          /* *********** description sections ************* */
          .aadhar_desc_sec {
            border-bottom: 3px solid #d3d3d3;
            padding: 0px 0px 20px;
            margin-bottom: 20px;
          }
          .aadhar_desc_sec h3 {
            font-size: 19px;
            line-height: 28px;
            color: #e1261d;
            font-weight: 700;
          }
          .aadhar_desc_sec p {
            font-size: 17px;
            line-height: 28px;
            color: #000;
            font-weight: 400;
            padding: 0px 0px 10px;
          }
          .aadhar_desc_sec img {
            width: 560px;
            line-height: 0;
            height: 360px;
            display: block;
            overflow: hidden;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #cecece;
            background: #fff;
            padding: 10px;
            position: relative;
            margin: 12px auto 12px auto;
          }
          .aadhar_desc_sec h3 {
            font-size: 19px;
            line-height: 28px;
            color: #e1261d;
            font-weight: 700;
          }
          .aadhar_desc_sec li {
            font-size: 17px;
            line-height: 28px;
            color: #000;
            font-weight: 400;
            padding-left: 20px;
            position: relative;
          }
          .aadhar_desc_sec li:before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #e1261d;
            position: absolute;
            left: 0px;
            top: 10px;
          }
          .aadhar_desc_sec .info_lists {
            margin-top: -10px;
          }
          .aadhar_desc_sec .lists_des_c {
            margin-top: 10px;
          }
          .aadhar_desc_sec .info_lists + .lists_des_c {
            margin-top: 20px;
          }
          .ply_btn {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 2;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
          }
          .ply_btn img {
            width: 60px;
            height: 60px;
            display: block;
            cursor: pointer;
          }
          .aadhar_desc_sec .info_ol_lists {
            margin-top: 10px;
          }
          .aadhar_desc_sec .info_ol_lists li {
            font-size: 17px;
            line-height: 28px;
            color: #000;
            font-weight: 400;
            padding-left: 10px;
            position: relative;
            margin-left: 20px;
            margin-bottom: 20px;
            list-style: auto;
          }
          .aadhar_desc_sec .info_ol_lists li:last-child {
            margin-bottom: 0px;
          }
          .aadhar_desc_sec .special_list {
            color: #061836;
          }
          .aadhar_desc_sec .info_ol_lists .info_lists {
            margin-top: 0px;
          }
          .aadhar_desc_sec .info_ol_lists .info_lists li {
            margin-left: 0px;
            padding-left: 20px;
            margin-bottom: 0px;
            list-style: none;
            color: #061836;
          }
          .aadhar_desc_sec .info_ol_lists li strong {
            display: block;
          }
          .aadhar_desc_sec ol li .lists_img {
            box-shadow: initial;
            border: none;
            padding: initial;
            width: initial;
            line-height: initial;
            overflow: initial;
            background: none;
            margin: 20px auto 0px;
            text-align: center;
            position: relative;
          }
          .aadhar_desc_sec ol li .lists_img:after {
            content: "";
            width: 630px;
            height: 32px;
            display: table;
            margin: -12px auto;
            background: url("https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/images/silo_structure/video_bg.png")
              center bottom no-repeat padding-box !important;
          }
          .aadhar_desc_sec .info_ol_lists li::marker {
            color: #e1261d;
            font-size: 17px;
            line-height: 30px;
            font-weight: 700;
          }
          .aadhar_desc_sec .info_ol_lists .no_ol {
            margin-bottom: 30px !important;
          }
          .over_lay {
            position: absolute;
            background: transparent
              linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0%
              no-repeat padding-box;
            padding: 10px;
            bottom: 10px;
            left: 10px;
            right: 10px;
            top: 10px;
            width: 540px;
            height: 360px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            color: #fff;
            z-index: 1;
            font-size: 14px;
            line-height: 21px;
            font-weight: 700;
            color: #ffffff;
          }
          .vid_os_ovr_lay {
            background: #000000 0% 0% no-repeat padding-box;
            position: absolute;
            padding: 10px;
            width: 560px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 315px;
            display: flex;
            margin: -14px auto auto auto;
            align-items: flex-end;
            justify-content: center;
            color: #fff;
            opacity: 0.3;
            z-index: 1;
          }
          .data_count {
            position: absolute;
            top: -11px;
            left: 45%;
            width: 52px;
            z-index: 2;
            font-size: 14px;
            background: #ff4a4a 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #ffffff;
            border-radius: 0px 0px 6px 6px;
            height: 30px;
            line-height: 40px;
            display: flex;
            font-weight: 700;
            color: #ffffff;
            align-items: center;
            justify-content: center;
          }
          /* ********** table section *********** */
          .table_info_s {
            margin-top: -12px;
          }
          .table_info_s table {
            border-collapse: collapse;
            width: 100%;
            border: none;
            position: relative;
            top: 8px;
          }
          .table_info_s table th,
          .table_info_s table td {
            border: 1px solid #d8d8d8;
            line-height: 28px;
            text-align: left;
            width: 33%;
            padding: 5px 10px;
            font-size: 17px;
          }
          .table_info_s table th {
            background: #061836;
            color: #fff;
            border-right: none !important;
            text-transform: uppercase;
            font-weight: 700;
            border-left: none !important;
          }
          .table_info_s table td {
            color: #000000;
            padding: 10px 10px;
            background: #f5f5f5;
            font-weight: 400;
            position: relative;
          }
          /* *************** accordian section ************** */
          .accrdians_lists {
            margin-bottom: 20px;
            border: 1px solid #d8d8d8;
          }
          .aadhar_desc_sec .accrdians_lists li {
            background: #f5f5f5 0% 0% no-repeat padding-box;
            border-bottom: 1px solid #d8d8d8;
            padding-left: 0px;
            margin-bottom: 0px;
            list-style: none;
            margin-left: 0px;
          }
          .aadhar_desc_sec .accrdians_lists li:last-child {
            border-bottom: none;
          }
          .accordion {
            background: #fff 0% 0% no-repeat padding-box;
            font-size: 17px;
            line-height: 28px;
            font-weight: 700;
            color: #000;
            cursor: pointer;
            position: relative;
            padding: 10px 15px 10px 36px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            transition: 0.4s;
          }
          strong {
            display: block;
          }
          blockquote {
            position: relative;
            text-align: center;
            padding: 10px;
            width: 80%;
            margin: auto;
            font-weight: 700;
            font-style: italic;
            font-size: 17px;
          }

          blockquote:before {
            position: absolute;
            content: open-quote;
            font-size: 1em;
            padding: -2px;
            margin-left: -0.3em;
            margin-top: -0.4em;
            font-style: italic;
          }
          blockquote:after {
            position: absolute;
            content: close-quote;
            font-size: 1em;
            bottom: 9px;
            padding: 3px;
          }
          button.accordion.active {
            background: #f5f5f5 0% 0% no-repeat padding-box;
            padding: 10px 15px 0px 36px;
          }
          .accordion:after {
            content: "";
            background: url("https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/images/silo_structure/plus_icon.svg");
            width: 20px;
            height: 20px;
            float: right;
            margin-left: 0px;
            position: absolute;
            right: 12px;
            top: 14px;
          }
          .active:after {
            content: "";
            background: url("https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/images/silo_structure/minus_icon.svg");
            width: 20px;
            height: 20px;
          }
          .panel {
            padding: 0 38px;
            background-color: #f5f5f5;
            height: 0px;
            overflow: hidden;
            transition: 0.5s ease-out;
          }
          button.accordion.active + .panel {
            height: 90px;
            transition: 0.5s ease-out;
          }
          .accrdians_lists li .accordion strong {
            font-size: 17px;
            line-height: 30px;
            font-weight: 700;
            color: #e1261d;
            display: inline-block;
            margin-right: 0px;
            margin-left: -5px;
            position: absolute;
            left: 20px;
            top: 8px;
          }
          /* *************** related news section **************** */
          .rlt_d_nw_s_sec {
            width: 924px;
            background: rgb(62, 62, 62);
            flex-shrink: 0;
            overflow: hidden;
            margin-right: 0;
            height: max-content;
          }
          .rlt_d_nw_hdng {
            font-size: 20px;
            justify-content: center;
            line-height: 21px;
            padding-top: 7px;
            padding-bottom: 2px;
            color: rgb(255, 255, 255);
            font-weight: bold;
            background-color: rgb(225, 38, 29);
            display: flex;
            align-items: center;
          }
          .rlt_d_nw_lis_ts {
            width: 924px;
            display: flex;
            justify-content: space-evenly;
            margin: 20px auto 0px;
          }
          .rlt_d_nw_lis_ts li {
            margin-bottom: 0px;
            width: 156px;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts .rlt_d_nw_lis_ts_img {
            width: 156px;
            max-height: 111px;
            overflow: hidden;
            border: 1px solid #9b9b9b;
            box-shadow: initial;
            background: none;
            padding: 0px;
            object-fit: cover;
            line-height: initial;
            position: relative;
            margin: auto auto 10px auto;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts .rlt_d_nw_lis_ts_img img {
            width: 100%;
            display: block;
          }
          .rlt_d_nw_s_sec .rlt_d_nw_lis_ts li p {
            color: #fff;
            font-size: 15px;
            line-height: 20px;
            font-weight: 700;
            padding-top: 0px;
          }
          /* ************** glide slider section *********** */
          .aadhaar_slider_section {
            width: 560px;
            margin: 12px auto 12px auto;
            display: block;
            border: 1px solid #cecece;
            background: #fff;
            box-shadow: 0px 3px 6px #00000029;
          }
          .aadhaar_slider_section .aadhaar_slider {
            overflow: hidden;
            margin: 0px 10px;
            padding: 10px 0px;
            box-sizing: border-box;
          }
          .aadhaar_slider .aadhaar_slides {
            display: flex;
            justify-content: space-between;
          }
          .aadhaar_slider .aadhaar_slides li {
            position: relative;
          }
          .aadhaar_slider .aadhaar_slides li .over_lay {
            left: 0px;
          }
          /* ********** slider bullets and arrow *********** */
          .aadhaar_slider .glide_arrw_buttons {
            position: relative;
            top: 25px;
            display: flex;
            justify-content: space-between;
            padding: 0px 170px;
          }
          .aadhaar_slider .left-arrow,
          .aadhaar_slider .right-arrow {
            width: 10px;
            height: 15px;
            transform: translate(0, -50%);
            border: none;
            outline: none;
            cursor: pointer;
          }
          .aadhaar_slider .left-arrow::before {
            content: "";
            border-top: 2px solid #707070;
            border-left: 2px solid #707070;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            left: 2px;
            top: 3px;
          }
          .aadhaar_slider .left-arrow::after {
            content: "";
            width: 10px;
            height: 2px;
            background: #707070;
            position: absolute;
            left: 3px;
            top: 7px;
          }
          .aadhaar_slider .right-arrow::before {
            content: "";
            border-bottom: 2px solid #707070;
            border-right: 2px solid #707070;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            right: 2px;
            top: 3px;
          }
          .aadhaar_slider .right-arrow::after {
            content: "";
            height: 2px;
            width: 10px;
            position: absolute;
            right: 3px;
            top: 7px;
            background: #707070;
          }
          .swiper-wrapper {
            height: 100px !important;
          }
          .swiper-slide swiper-slide-active img {
            height: 290px !important;
          }
          .aadhaar_slider .glide__bullets {
            display: inline-flex;
            justify-content: center;
            position: relative;
            top: -1px;
            margin: 0 auto;
            text-align: center;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%);
          }
          .aadhaar_slider .glide__bullets .glide__bullet {
            width: 6px;
            height: 6px;
            background: #bababa;
            display: block;
            margin-right: 8px;
            border-radius: 50%;
            overflow: hidden !important;
            outline: none;
            border: none;
            cursor: pointer;
          }
          .aadhaar_slider .glide__bullets .glide__bullet--active {
            background: #e1261d !important;
            width: 18px;
            height: 6px;
            border-radius: 8px;
          }

          .ifrm_desgn {
            text-align: center;
          }

          .alignnone.size-full {
            width: 100%;
          }

          .page_layout .info_lists {
            margin-bottom: 10px;
          }
          .page_layout .table_info_s {
            margin: 12px 0px 15px !important;
          }
          .page_layout .info_lists li {
            font-size: 17px;
            line-height: 28px;
            color: #000;
            font-weight: 400;
            padding-left: 20px;
            position: relative;
          }
          .page_layout .info_lists li:before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #e1261d;
            position: absolute;
            left: 0px;
            top: 10px;
          }
        `}
      </style>
    </>
  );
};

export default TopicDetails;
