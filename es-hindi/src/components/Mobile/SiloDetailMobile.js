import { topicParser, topicParserContent } from "../../includes/silo.utils";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import RelatedNews from "widgets/Common/Mobile/RelatedNews";
import { logEvent } from "includes/googleAnalytic";
import { timeConverter } from "includes/blogs.util";

const SiloDetailMobile = (props) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const {
    siloListing = [],
    currentUrl = "",
    pageAds = {},
    urlParam: { topic = "" } = {},
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
  const { intro = "", body } = currentTopic.intro;
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
      <div className="mob_home_wrapper">
        <div className="mob_content_wrapper">
          <div className="bredcru_m">
            <div className="bredcrum_containr">
              <a href="/">
                <span>Home</span>
              </a>{" "}
              /{<span className="act">{topic}</span>}
            </div>
          </div>
          <div className="page_layout">
            <div className="uppr_pag_layut">
              <h1 className="pag_main_hdng">{topicParserContent(title)}</h1>
              <div
                className="cont_nt"
                dangerouslySetInnerHTML={{ __html: topicParserContent(intro) }}
              ></div>
              <div className="related-main-cont">
                {related_silo.length > 0 ? (
                  <>
                    {" "}
                    <div
                      className="custom_cl_S"
                      onClick={() => {
                        setShowOptions(!showOptions);
                      }}
                    >
                      <span className="select_hd_ing">
                        {topicParserContent(title)}
                      </span>
                    </div>
                    {showOptions && (
                      <ul className="all_states_list">
                        {related_silo.map((item, index) => {
                          return (
                            <li key={index}>
                              <a href={`/${item.weburl}`}>
                                {topicParserContent(item.title)}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <ul className="phtstrtupdt-shr">
              <li>
                <a
                  className="for-whatsapp"
                  href={"https://wa.me/?text=" + currentUrl + "&t=" + title}
                  target="_blank"
                  onClick={() =>
                    logEvent("Social_Share", "Click", `${title},${id},whatsapp`)
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
                    logEvent("Social_Share", "Click", `${title},${id},facebook`)
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
                    logEvent("Social_Share", "Click", `${title},${id},telegram`)
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
                    logEvent("Social_Share", "Click", `${title},${id},twitter`)
                  }
                >
                  <span className="spriteshare art-twitter-icon"></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="pwa_add">
            <span id="first">Advertisement</span>
            <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [320, 250],
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
            />
          </div>
        </div>

        <ul className="artcl_byeline">
          {/* <Byline
                    agency={agency}
                    agencyFull={agencyFull}
                    // translated
                    // by={translatedBy}
                  /> */}

          <li>
            <b>Last Updated : </b>
            <time dateTime={updated_at}>{timeConverter(updated_at)}</time>
          </li>
        </ul>

        <div>
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
          </div>
          <div className="mob_content_wrapper">
            <div
              className="aadhar_desc_sec"
              dangerouslySetInnerHTML={{ __html: body }}
            ></div>
          </div>

          {data_list && data_list.length
            ? data_list.map((item, index) => {
                return (
                  <div
                    className="mob_content_wrapper"
                    ref={refs[index]}
                    key={index}
                  >
                    <div
                      className="aadhar_desc_sec"
                      dangerouslySetInnerHTML={{
                        __html: topicParser(
                          item?.blog_content,
                          item?.blog_title,
                        ),
                      }}
                    ></div>
                  </div>
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
                  ? faq_list.map((faqItems) => {
                      const faqItem = faqItems?.blog_content.split(/\[\/ans\]/);
                      return faqItem.map((item, index) => {
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
        <div className="mob_content_wrapper">
          {tags.length > 0 && (
            <RelatedNews
              isDesktop={false}
              tags={tags}
              id={currentTopic?.id}
            />
          )}
          <div className="pwa_add">
            <span id="first">Advertisement</span>
            <SiteAd
              slotId={`mobile_btf_320`}
              adUnit={pageAds.BTF_300}
              sizes={[
                [320, 250],
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
            />
          </div>
        </div>
        <style jsx global>
          {`
            /* default css (ignore it while implementing) */
            * {
              margin: 0px;
              padding: 0px;
              box-sizing: border-box;
              list-style: none;
              text-decoration: none;
              outline: 0px;
            }
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
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
                U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
              font-family: "Mukta";
              font-style: normal;
              font-weight: 700;
              src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122,
                U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* latin end*/
            /* section css (use it while implementing) */
            .mob_home_wrapper {
              position: relative;
              width: 100%;
            }
            .mob_home_wrapper * {
              font-family: "Mukta";
            }
            .mob_content_wrapper {
              background: #fff;
              margin: auto;
              padding: 0px 15px;
            }
            /* breadcrumb section css */
            .bredcru_m {
              border-bottom: 1px dotted #939393;
              padding-bottom: 1px;
              margin-top: 10px;
              text-transform: uppercase;
              display: flex;
              justify-content: space-between;
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
            .pwa_add {
              background: #dbdde3;
              width: 100%;
              padding: 10px;
              box-sizing: border-box;
              height: 300px;
              text-align: center;
              margin: 5px;
            }
            .artcl_byeline {
              border-bottom: 1px dotted #939393;
              padding: 10px 0px 5px;
              list-style: none;
              margin: 0px 22px 15px;
              font-size: 13px;
            }
            strong {
              display: block;
            }
            blockquote {
              position: relative;
              text-align: center;
              padding: 10px;
              width: 90%;
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

            .artcl_byeline li {
              position: relative;
              color: #949494;
              text-transform: uppercase;
              font-size: 13px;
              padding: 3px 0px 3px 10px;
              font-weight: 400;
              line-height: 21px;
            }
            .artcl_byeline li:first-child::before {
              background: rgb(225, 38, 29);
            }
            .artcl_byeline li::before {
              content: "";
              background: rgb(133, 133, 133);
              width: 4px;
              height: 4px;
              border-radius: 100%;
              position: absolute;
              top: 10px;
              left: 0px;
            }
            .pwa_add img {
              width: 100%;
              display: block;
            }
            .aadhar_desc_sec iframe {
              height: 425px;
              width: 100%;
            }
            //Update
            .artcl_sldr .custom_artcl_sldr li figure {
              height: 240px;
            }
            .artcl_sldr .custom_artcl_sldr li figure {
              height: 240px;
            }
            .related-main-cont {
              position: relative;
            }
            .custom_cl_S {
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              margin-right: 0px;
              padding: 5px 15px;
              margin-bottom: 15px;
              position: relative;
              font-weight: 400;
              cursor: pointer;
              background: #e1251d 0% 0% no-repeat padding-box;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #e2e2e2;
              border-radius: 19px;
            }

            .custom_cl_S:before {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(45deg);
              top: 12px;
              transition: all 0.5s ease-in-out;
            }

            .custom_cl_S:after {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(-135deg);
              top: 17px;
              transition: all 0.5s ease-in-out;
            }

            .pwa_add span {
              color: #797e90;
              font-size: 11px;
              text-align: center;
              padding: 2px 0 0;
              display: block;
              line-height: 16px;
              background: #e8e9ed;
            }

            /* *********** social icons section ********** */
            .page_layout .uppr_pag_layut {
              padding-top: 8px;
              border-bottom: 3px solid #061836;
            }
            .pag_main_hdng {
              font-size: 26px;
              line-height: 32px;
              color: #001d42;
              font-weight: 800;
              padding: 5px 0px;
            }
            .phtstrtupdt-shr {
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: center;
              margin: 10px 0px 15px;
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
              min-height: 360px;
              margin-bottom: 10px;
              background: #f5f5f5 0% 0% no-repeat padding-box;
              border: 1px solid #e2e2e2;
              padding: 15px 15px 20px;
            }
            .subsect_list_sec {
              width: 100%;
            }
            .aadharcard_info_sec {
              width: 100%;
              background: #ffffff;
              padding: 10px;
            }
            .subsect_list_sec h4 {
              font-size: 16px;
              line-height: 28px;
              font-weight: 700;
              color: #e1261d;
              padding-top: 0px;
            }
            .subsect_lists {
              position: relative;
              padding-left: 12px;
              margin-top: 0px;
            }
            .subsect_lists:before {
              content: "";
              background: #707070;
              position: absolute;
              top: 15px;
              left: -1px;
              width: 1px;
              bottom: 13px;
            }
            .subsect_lists li {
              margin-bottom: 5px;
            }
            .subsect_lists li a {
              font-size: 16px;
              color: #007fce;
              line-height: 28px;
              font-weight: 400;
              border-bottom: 1px solid #007fce;
              display: block;
              margin-top: 0px;
              position: relative;
            }
            .subsect_lists li a:before {
              content: "";
              width: 7px;
              height: 7px;
              border: 1px solid #707070;
              position: absolute;
              border-radius: 100%;
              top: 8px;
              left: -17px;
              background: #ffffff;
            }

            .alignnone.size-full {
              width: 100%;
              height: auto;
            }
            .info_lists {
              margin-bottom: 10px;
            }
            .table_info_s {
              margin: 12px 0px 15px !important;
            }
            .info_lists li {
              font-size: 17px;
              line-height: 28px;
              color: #000;
              font-weight: 400;
              padding-left: 20px;
              position: relative;
            }
            .info_lists li:before {
              content: "";
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #e1261d;
              position: absolute;
              left: 0px;
              top: 10px;
            }
            .ifrm_desgn {
              width: 100%;
              overflow: auto;
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
            iframe.youtubevideo {
              height: 240px;
            }
            .aadhar_desc_sec table tr:first-of-type td {
              background: #666;
              color: #fff;
              font-weight: 700;
            }
            .aadhar_desc_sec table {
              width: 100%;
              border-collapse: collapse;
              overflow: scroll;
            }
            /* *********** description sections ************* */
            .aadhar_desc_sec {
              border-bottom: 3px solid #d3d3d3;
              padding: 0px 0px 20px;
              margin-bottom: 20px;
            }
            .aadhar_desc_sec p {
              font-size: 17px;
              line-height: 28px;
              color: #000;
              font-weight: 400;
              padding: 0px 0px 10px;
            }
            .aadhar_desc_sec img {
              width: 100%;
              height: 300px;
              line-height: 0;
              margin: auto auto 12px auto;
              width: 100%;
              display: block;
            }
            .tex_ts {
              font-size: 14px;
              line-height: 21px;
              color: #5a5a5a;
              background: #f2f2f2 0% 0% no-repeat padding-box;
              font-weight: 400;
              height: 43px;
              border-bottom: 1px solid #c4c4c4;
              display: flex;
              align-items: center;
              justify-content: center;
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
            // .aadhar_desc_sec ul {margin-top: -10px;}
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
              width: 35px;
              height: 35px;
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
            .aadhar_desc_sec .tbl_ol_lists {
              margin-top: 0px;
            }
            .realted-container {
              border: 1px solid red;
              padding: 12px 0px 10px 36px;
              width: 76%;
              margin-left: 14%;
              margin-top: 6%;
              border-radius: 25px;
              background: #ec0a0a;
              color: #fff;
              font-weight: 600;
            }
            .realted-heading:after {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(-135deg);
              top: 17px;
              transition: all 0.5s ease-in-out;
            }
            .realted-heading:before {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(45deg);
              top: 12px;
              transition: all 0.5s ease-in-out;
            }
            .related-list {
              /* border: 1px solid grey; */
              width: 75%;
              margin-bottom: 13px;
              margin-left: 15%;
              height: auto;
              z-index: 999;
              padding-left: 10px;
              padding-top: 5px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
              box-shadow: 0px 0px 5px 1px grey;
            }
            .related-list li {
              font-weight: 500;
            }
            .tbl_hdr {
              background: #061836 0% 0% no-repeat padding-box;
              color: #fff;
              height: 40px;
              width: 100%;
              display: flex;
              padding: 0px 10px 0px 10px;
              align-items: center;
              justify-content: flex-start;
              margin: 0px 0px 0px 0px;
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
              margin: 20px -15px 0px -45px;
              text-align: center;
              position: relative;
              display: flex;
              justify-content: center;
              background: #000000 0% 0% no-repeat padding-box;
              padding: 20px 0px;
            }
            .aadhar_desc_sec ol li .lists_img img {
              width: 100%;
              display: block;
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
            .globl_para {
              font-size: 17px;
              line-height: 28px;
              font-weight: 400;
              color: #000;
              margin-bottom: 15px;
            }
            .data_count {
              position: absolute;
              bottom: 32px;
              left: 45%;
              width: 58px;
              z-index: 2;
              font-size: 15px;
              background: #ff4a4a 0% 0% no-repeat padding-box;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #ffffff;
              border-radius: 6px;
              height: 35px;
              line-height: 40px;
              display: flex;
              font-weight: 700;
              color: #ffffff;
              align-items: center;
              justify-content: center;
            }
            h5.okok {
              font-size: 14px;
              line-height: 21px;
              color: #5a5a5a;
              font-weight: 400;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 23px;
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
              padding-left: 0px;
              margin-bottom: 0px;
              list-style: none;
              margin-left: 0px;
              border-bottom: 1px solid #d8d8d8;
            }
            .aadhar_desc_sec .accrdians_lists li:last-child {
              border-bottom: none;
            }
            .accordion {
              background: #fff 0% 0% no-repeat padding-box;
              border: 1px solid #d8d8d8;
              font-size: 17px;
              line-height: 28px;
              font-weight: 700;
              color: #000;
              cursor: pointer;
              position: relative;
              padding: 10px 38px 10px 38px;
              width: 100%;
              border: none;
              text-align: left;
              outline: none;
              transition: 0.4s;
            }
            button.accordion.active {
              background: #f5f5f5 0% 0% no-repeat padding-box;
              padding: 10px 38px 0px 38px;
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
              padding: 0px 12px 0px 38px;
              background-color: #f5f5f5;
              height: 0;
              overflow: hidden;
              transition: 0.5s ease-out;
            }
            button.accordion.active + .panel {
              height: 207px;
              transition: 0.5s ease-out;
              overflow-y: auto;
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
            .related_nws_sec {
              background: #3e3e3e;
              margin: 0px -15px 20px;
            }
            .rltd_nws_hdng {
              font-size: 18px;
              line-height: 18px;
              padding-top: 5px;
              padding-left: 15px;
              height: 36px;
              color: #fff;
              font-weight: 700;
              background-color: #e1261d;
              display: flex;
              align-items: center;
            }
            .rltd_lists_sldr {
              display: flex;
              padding: 15px;
            }
            .rltd_lists_sldr li {
              border: 1px solid #9b9b9b;
              width: 173px !important;
            }
            .rltd_lists_sldr_img {
              width: 171px;
              overflow: hidden;
            }
            .rltd_lists_sldr_img img {
              width: 100%;
              display: block;
            }
            .rltd_lists_sldr p {
              margin-bottom: 0px;
              color: #fff;
              min-height: 107px;
              font-size: 15px;
              background: #1a1a1a;
              line-height: 1.5;
              padding: 8px;
              font-weight: bold;
              font-family: "Mukta", sans-serif !important;
              text-align: left;
            }
            .rltd_lists_sldr li:last-child {
              margin-right: 0px;
            }
            .related_nws_slidr {
              width: 100%;
              overflow: hidden;
            }
            .related_nws_slidr .glide__bullets {
              display: inline-flex;
              justify-content: center;
              position: relative;
              top: -10px;
              margin: 0 auto;
              text-align: center;
              left: 50%;
              right: 50%;
              transform: translate(-50%, -50%);
            }
            .related_nws_slidr .glide__bullets button.glide__bullet {
              width: 8px !important;
              height: 8px !important;
              background: #bababa;
              display: block;
              margin-right: 8px;
              border-radius: 50%;
              overflow: hidden !important;
              outline: none;
              border: none;
              cursor: pointer;
            }
            .related_nws_slidr .glide_arroe_buttons {
              position: relative;
              top: 13px;
              display: flex;
              justify-content: space-between;
              padding: 0px 70px;
            }
            .related_nws_slidr .left-arrow,
            .related_nws_slidr .right-arrow {
              width: 15px;
              height: 15px;
              transform: translate(0, -50%);
            }
            .related_nws_slidr .left-arrow::before {
              content: "";
              border-top: 2px solid #fff;
              border-left: 2px solid #fff;
              width: 8px;
              height: 8px;
              transform: rotate(-45deg);
              position: absolute;
              left: 2px;
              top: 3px;
            }
            .related_nws_slidr .left-arrow::after {
              content: "";
              width: 10px;
              height: 2px;
              background: #fff;
              position: absolute;
              left: 3px;
              top: 7px;
            }
            .related_nws_slidr .right-arrow::before {
              content: "";
              border-bottom: 2px solid #fff;
              border-right: 2px solid #fff;
              width: 8px;
              height: 8px;
              transform: rotate(-45deg);
              position: absolute;
              right: 2px;
              top: 3px;
            }
            .related_nws_slidr .right-arrow::after {
              content: "";
              height: 2px;
              width: 10px;
              position: absolute;
              right: 3px;
              top: 7px;
              background: #fff;
            }
            .glide__bullets .glide__bullet--active {
              background: #e1261d !important;
            }
            /* ************** glide slider section *********** */
            .aadhaar_slider_section {
              width: 100%;
              margin: auto auto auto auto;
              display: block;
            }
            .aadhaar_slider_section .aadhaar_slider {
              overflow: hidden;
              margin: auto;
              background: #f2f2f2 0% 0% no-repeat padding-box;
              padding: 0px 0px 15px;
              box-sizing: border-box;
            }
            .aadhaar_slider .aadhaar_slides {
              display: flex;
            }
            .aadhaar_slider .aadhaar_slides li {
              position: relative;
            }
            .aadhaar_slider .aadhaar_slides li figure {
              padding-bottom: 25px;
            }
            .aadhaar_slider .aadhaar_slides li figure img {
              width: 100%;
              display: block;
            }
            .reduce_tp {
              border-bottom: 1px solid #c4c4c4;
              padding-bottom: 0px;
            }
            /* ********** slider bullets and arrow *********** */
            .aadhaar_slider .glide_arrw_buttons {
              position: relative;
              top: 25px;
              display: flex;
              justify-content: space-between;
              padding: 0px 50px;
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
            .custom_class {
              width: 100%;
              height: 38px;
              display: flex;
              align-items: center;
              margin-right: 0px;
              padding: 5px 15px;
              margin-bottom: 15px;
              position: relative;
              font-weight: 400;
              cursor: pointer;
              background: #e1251d 0% 0% no-repeat padding-box;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #e2e2e2;
              border-radius: 19px;
            }
            .custom_class:before {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(45deg);
              top: 12px;
              transition: all 0.5s ease-in-out;
            }
            .custom_class:after {
              content: "";
              width: 5px;
              height: 5px;
              border-top: 1px solid #fff;
              border-left: 1px solid #fff;
              position: absolute;
              right: 15px;
              transform: rotate(-135deg);
              top: 17px;
              transition: all 0.5s ease-in-out;
            }
            .select_hd_ing {
              color: #fff;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;
              box-sizing: border-box;
              display: block;
              width: 100%;
              padding-top: 2px;
              text-transform: uppercase;
            }
            .all_states_list {
              position: absolute;
              left: 0;
              border-radius: 0 0 10px 10px;
              right: 0;
              box-shadow: 0 0 6px #c3c3c3;
              z-index: 3;
              font-size: 14px;
              border: 1px solid #ccc;
              background: #fff;
              height: 240px;
              overflow: auto;
            }
            .custom_class:hover .all_states_list {
              display: block;
            }
            .all_states_list li a {
              font-size: 14px;
              line-height: 30px;
              font-weight: bold;
              color: #061836;
              padding: 0px 15px;
              box-sizing: border-box;
              display: block;
              width: 100%;
            }

            /* ************** add section ************* */
            .add_s {
              width: 100%;
              overflow: hidden;
              display: flex;
              background: #f5f5f5;
              padding: 15px 30px;
              justify-content: center;
              margin: 0px auto 0px;
              text-align: center;
              flex-direction: column;
              align-items: center;
            }
            .add_s span {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff;
              padding-top: 4px;
              width: 100%;
              font-size: 11px;
              line-height: 14px;
              color: #000;
              font-weight: 400;
            }
            .add_s a img {
              width: 100%;
              display: block;
            }
            /* ************* byeline css ************* */
            .aadhaar_byline_agncy {
              border-bottom: 1px dotted #939393;
              padding: 10px 0px 5px;
              list-style: none;
              margin: 0px 0px 15px;
              font-size: 13px;
            }
            .aadhaar_byline_agncy li {
              position: relative;
              color: #949494;
              text-transform: uppercase;
              font-size: 13px;
              padding: 3px 0px 3px 10px;
              font-weight: 400;
              line-height: 21px;
            }
            .aadhaar_byline_agncy li::before {
              content: "";
              background: rgb(133, 133, 133);
              width: 4px;
              height: 4px;
              border-radius: 100%;
              position: absolute;
              top: 10px;
              left: 0px;
            }
            .aadhaar_byline_agncy li:first-child::before {
              background: rgb(225, 38, 29);
            }
            .aadhaar_byline_agncy li a {
              color: #e1261d;
              text-decoration: none;
              position: relative;
              font-weight: bold;
            }
            .aadhaar_byline_agncy li b {
              color: #454545;
              font-weight: 700;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SiloDetailMobile;
