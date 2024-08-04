import React, { useState } from "react";
import SubEntertainmentPage from "widgets/Mobile/category/SubEntertainmentPage";
import ScoresWidgetCommon from "widgets/Mobile/category/ScoresWidgetCommon";
import CategoryTopPage from "widgets/Mobile/category/CategoryTopPage";
import CategoryGeneralPage from "widgets/Mobile/category/CategoryGeneralPage";
import RhsPhoto from "widgets/Common/Mobile/RhsPhoto";
import RhsTopStory from "widgets/Common/Mobile/RhsTopStory";
// import Pagination from "widgets/Common/Mobile/Pagination";
import SelectState from "components/Common/SelectState";
import { districtList } from "includes/district.helper";
import { logEvent } from 'includes/googleAnalytic';
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import useLoadMore from "hooks/useLoadMore";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

//import Head from "next/head";

const SubCategoryMobile = (props) => {
  const {
    data: {
      _pageParam: { curr_page_no, sub_cat, sub_cat_slug, subCategory, category, query_arr, pageLimit }
    }
  } = props;
  const [showStates, setShowStates] = useState(false);
  const [active, setActive] = useState(false);
  const noContent = props.data._pageParam.curr_page_no > 30 ? false : true;

  const { categoryStoriesList } = props.data;
  const { dataLength } = props.data;

  const { loadMore, categoryData, hasMoreData } = useLoadMore(categoryStoriesList, pageLimit, dataLength, query_arr);

  const sectionname = props.data?._pageParam?.category;
  const handleShowChange = () => {
    setShowStates((prev) => !prev);
    if(!showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "राज्य/शहर चुनें");
    }
  };

  const getDistrictList = () => {
    const districts = [];
    districtList.map((itm) => {
        districts.push({ name: itm.hi, url: "/news/"+ itm.href });
    });
    return districts;
  };
  const subPage = () => {
    switch (sub_cat) {
      case "entertainment":
        // return <SubEntertainmentPage data={props.data} />;
        return curr_page_no > 1 ? (
          <CategoryGeneralPage data={props.data} categoryStoriesList={categoryData}/>
        ) : (
          <SubEntertainmentPage data={props.data} categoryStoriesList={categoryData}/>
        );

      default:
        return curr_page_no > 1 ? (
          <CategoryGeneralPage data={props.data} key={1234111} categoryStoriesList={categoryData}/>
        ) : (
          <CategoryTopPage data={props.data} categoryStoriesList={categoryData}/>
        );
    }
  };
  const getDistrictListData=getDistrictList();

  return (
    <>
      <section className="clearfix wrapper">
        <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} />

        {/* <div className="brdcrm">
        {props.data?.mainCat != "photogallery" ? (
          props.data.breadCrumbArray.map(post =>
            post.slug != "" ? (
              <a href={post.slug}>{post.value + " »"}</a>
            ) : (
              <span>{post.value}</span>
            )
          )
        ) : (
          <div>
            <a href="/">Home</a> » <a>Photogallery</a>
          </div>
        )}
      </div> */}
          <SelectState
            showStates={showStates}
            handleShowChange={handleShowChange}
            districtList={props.data.districtList}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <div className="p-2" dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}></div> */}
            <div className="chsstctstrip">
              {
                getDistrictListData && getDistrictListData.length ?
                <>
                <div onClick={() => setActive(!active)} className={`chsstct-frstinsdlft ${active ? "adclschsstct-frstinsdlft" : ""}`}>
                  <div className="top-name" dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}/>
                <div className={`allcities-forstatesection ${active ? "adclsallcities-forstatesection" : ""}`}>
                <div>
                  <ul>
                      {getDistrictListData?.map((itm) => (
                      <li><a href={itm.url}>{itm.name}</a></li>
                      ))}
                  </ul>
                </div>
                <div className="allcities-close" onClick={() => setActive(false)}><span>पीछे</span></div>
                </div>
                </div>
                </>
                :
                <div dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}/>
              }

              </div>
            <div className="chs-stct p-2" onClick={handleShowChange}>
                  राज्य/शहर चुनें
                  <svg
                    version="1.1"
                    id=""
                    x="0px"
                    y="0px"
                    width="17px"
                    height="20px"
                    viewBox="0 0 17 20"
                    style={{
                      enableBackground: "new 0 0 17 20",
                      // display: "block",
                      margin: "8px 3px -4px",
                    }}
                  >
                    <path
                      className="st0"
                      d="M15.8,16c-0.1,1.1-0.8,1.9-2.1,2.6s-3.1,1-5.2,1c-2.1,0-3.8-0.3-5.2-1S1.2,17,1.2,16c0-0.6,0.3-1.1,0.8-1.6
      c0.5-0.5,1.2-0.9,2.1-1.3l0.6,0.8c-1,0.4-1.6,1-1.6,1.6c0,0.6,0.6,1.2,1.6,1.6c1,0.4,2.3,0.6,3.9,0.6s2.8-0.2,3.9-0.6
      c1-0.4,1.6-1,1.6-1.6c0-0.7-0.6-1.2-1.6-1.6l0.6-0.8c0.9,0.3,1.6,0.8,2.1,1.3C15.6,14.8,15.8,15.4,15.8,16z M8.5,0.4
      C10,0.4,11.3,1,12.4,2c1,1,1.6,2.3,1.6,3.9c-0.2,2.2-1.1,4.4-2.8,6.6c-1.6,2.2-2.5,3.4-2.8,3.5c-0.2-0.1-1.1-1.3-2.8-3.5
      C4.1,10.3,3.2,8.1,3,5.9C3,4.3,3.6,3,4.6,2C5.7,1,7,0.4,8.5,0.4z M8.5,4C8,4,7.6,4.2,7.2,4.6C6.9,4.9,6.7,5.4,6.7,5.9
      s0.2,0.9,0.5,1.3S8,7.7,8.5,7.7s0.9-0.2,1.3-0.5s0.5-0.8,0.5-1.3s-0.2-1-0.5-1.3C9.4,4.2,9,4,8.5,4z"
                    />
                  </svg>
            </div>
          </div>
        {/* Score card widget */}
        {subCategory == "cricket" ||
          (category == "sports" && subCategory == "") ? (
          <ScoresWidgetCommon />
        ) : (
          ""
        )}
        {noContent ? (
          subPage()
        ) : (
          <p> No stories found matching this criteria</p>
        )}

        {hasMoreData && <button onClick={loadMore} className="load_more">Load More</button>}

        {sectionname != "photogallery" && sectionname != "latestnews" && noContent && (
          <div className="astro_section">
            <Taboola
                mode={TaboolaList.category.center.mode}
                id={TaboolaList.category.center.id}
                container={TaboolaList.category.center.container}
                placement={TaboolaList.category.center.placement}
                isMobile ={true}
                position = {true}
              />
            <RhsPhoto photoStories={props.data.photoStories} />
          </div>
        )}

        {sectionname != "photogallery" && noContent && (
          <div className="astro_section">
            <RhsTopStory topStories={props.data.topStories} />
          </div>
        )}

        <div className="vsp10"></div>
        {/* {noContent ? (
          <Pagination
            curpage={props.data._pageParam.curr_page_no}
            TotalRecord={props.data.dataLength}
            limit={props.data._pageParam.pageLimit}
            pageurl={"/" + props.data._pageParam.query}
            pageflag={false}
          />
        ) : null} */}
      </section>

      <div className="outbrain_row">
        {/* <Outbrain widgetId="MB_9" widgetSrc={siteConfig.mainUrl} /> */}
        <Taboola
          mode={TaboolaList.category.bottom.mode}
          id={TaboolaList.category.bottom.id}
          container={TaboolaList.category.bottom.container}
          placement={TaboolaList.category.bottom.placement}
        />
      </div>
      {/* Outbrain end here */}

      <style jsx global>{`
        header,
        .top_links_cont,
        .wrapper {
          font-family: "Mukta", sans-serif;
        }
        .p-2 {
          padding: 5px 5px 0px 3px;
        }
        .top_links_cont_child {
          height: 34px;
          line-height: 34px;
          font-size: 16px;
        }
        ul.pagination {
          display: flex;
          clear: both;
        }
        .h1_brdcrumb {
          text-align: left;
          display: inline;
          font-size: inherit;
          color: #757575;
        }
        .top_links_cont a {
          padding: 3px 15px 0px 15px;
        }
        .brdcrm {
          padding: 10px 16px;
          font-size: 15px;
        }
        .brdcrm a {
          padding: 0 5px;
        }
        .brdcrm a:first-child {
          padding: 0 5px 0 0;
        }
        .img_caption {
          font-size: 18px;
        }
        .img_caption h5 {
          font-weight: normal;
        }
        .liveblog-twtrlist li .tphd .tphd-tm {
          font-size: 16px;
        }
        .pracontener,
        .pracontener p {
          line-height: 28px;
          font-size: 18px;
          word-break: break-word;
        }
        .newbyeline-agency li {
          font-size: 14px;
          padding: 5px 0 6px 14px;
        }
        .liveblog-hglt-sldr span {
          font-size: 16px;
        }
        .headline_cont h2 {
          line-height: 28px;
        }
        .byln,
        .byln a {
          font-size: 15px;
          line-height: 22px;
        }
        .cttag a {
          height: 28px;
          line-height: 28px;
          font-size: 14px;
        }
        .cnsmpn-hd {
          font-size: 24px;
          line-height: 36px;
        }
        .dlel-advertise {
          margin: 0px !important;
        }
        .top-name:after {
          content: "";
          position: absolute;
          border-bottom: 1px solid #EE1C25;
          border-right: 1px solid #EE1C25;
          width: 7px;
          height: 7px;
          top: 11px;
          right: 14px;
          transform: rotate(45deg);
      }
        .chsstctstrip{display: flex; justify-content: space-between; margin: 2px 10px 0 1px}
        .chsstct-frstinsdlft{color: #606060; font-weight: bold; font-size: 14px; height: 34px; line-height: 34px; padding: 0 28px 0 7px; box-sizing: border-box; position: relative;  cursor: pointer;border-radius: 8px 8px 0 0;}
        .chsstct-frstinsdlft.adclschsstct-frstinsdlft{background: #E2E2E2; color: #C6080F}
        .chsstct-frstinsdlft.adclschsstct-frstinsdlft:after{transform: rotate(-135deg); top: 15px;}
        .chsstct-frstinsdrgt{color: #C6080F; font-weight: bold; font-size: 14px; height: 34px; line-height: 34px; padding: 0 35px 0 8px;  box-sizing: border-box; background: #fff url(/images/siteimages/pinicon_1607493634.png) 92% 50% no-repeat;}
        .allcities-forstatesection{position: absolute; background: #F2F2F2; box-shadow: 0px 3px 6px #00000029; border-radius: 0px 0px 8px 8px; top: 38px; z-index: 1; width: 135px; box-sizing: border-box; padding: 0 12px; left: 0; transform: scale(0); transition: all .5s ease-in-out;}
        .allcities-forstatesection.adclsallcities-forstatesection{transform: scale(1); transition: all .5s ease-in-out}
        .allcities-forstatesection > div{height: 200px; overflow: hidden;}
        .allcities-forstatesection > div ul{height: 200px;overflow: auto;width: 109%;}
        .allcities-forstatesection > div ul li a{display: block; color: #333333; font-size: 13px; padding: 6px 10px; border-bottom: 1px dotted #ccc;font-weight: normal;}
        .allcities-close{ position: relative;background: #C6080F;border-radius: 0 0 8px 8px;height: 36px!important;margin: 0 -15px;line-height: 36px;color: #fff;font-size: 15px;padding-left: 30px; cursor: pointer;}
        .allcities-close:before, .allcities-close:after{content: "";width: 2px;height: 16px;background: #fff;position: absolute;top: 9px;right: 18px;}
        .allcities-close:before{transform: rotate(45deg);}
        .allcities-close:after{transform: rotate(-45deg);}
        .allcities-close span{position: relative;}
        .allcities-close span:before{content: "";width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;position: absolute;transform: rotate(-45deg);top: 4px;left: -15px;}
        .biharelec-logo {
          display: block;
          float: left;
          margin-top: 5px;
          padding-left: 5px;
          position: relative;
          margin-left: 5px;
          line-height: 0;
        }
        .biharelec-logo:after {
          content: "";
          position: absolute;
          width: 1px;
          top: 0px;
          height: 48px;
          left: 0px;
          background: #ccc;
          opacity: 0.7;
        }
        .biharelec-nhlogo {
          float: left;
          margin-top: 5px;
          line-height: 0;
        }
        .spnsrd-slider {
          position: absolute !important;
          top: 2px;
          right: 5px;
        }
        .spnsrd-slider ul li a span {
          background: none !important;
          color: #4d4d4d !important;
          font-size: 9px !important;
        }

        .wrapper {
          margin-bottom: 40px;
          font-family: "Mukta", sans-serif;
        }
        .glbl-insdnav,
        .tabnav {
          justify-content: flex-start;
        }
        .glbl-insdnav {
          position: relative;
          clear: both;
          height: 38px;
        }
        .glbl-insdnav.hdr-entertainment .insdnav-hd {
          background: #a6214d;
        }
        .glbl-insdnav.hdr-lifestyle .insdnav-hd {
          background: #a621a6;
        }
        .glbl-insdnav.hdr-photos .insdnav-hd {
          background: #828282;
        }
        .glbl-insdnav.hdr-states .insdnav-hd {
          background: #a64d21;
        }
        .glbl-insdnav.hdr-videos .insdnav-hd {
          background: #a62121;
        }
        .glbl-insdnav.hdr-sports .insdnav-hd {
          background: #37a621;
        }
        .glbl-insdnav .insdnav-hd {
          height: 38px;
          line-height: 38px;
          display: block;
          padding: 0 16px;
          margin-right: 16px;
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          float: left;
          position: relative;
        }
        .glbl-insdnav .insdnav-hd a {
          color: #fff;
        }
        .glbl-insdnav.hdr-business .insdnav-hd {
          background: #2163a6;
        }
        .glbl-insdnav .insdnav {
          overflow: scroll;
          display: flex;
          justify-content: flex-start;
        }
        .glbl-insdnav .insdnav li {
          flex-shrink: 0;
        }
        .glbl-insdnav .insdnav li a {
          height: 36px;
          line-height: 35px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 14px;
          color: #757575;
        }

        .pwa_add {
          background: #dbdde3;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          height: 300px;
          text-align: center;
        }
        .pwa_add img {
          width: 100%;
          display: block;
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

        .brdcrm {
          color: #000;
          font-size: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          clear: both;
          padding: 10px 10px;
        }
        .brdcrm a {
          color: #757575;
          font-weight: 400;
          text-decoration: none;
          margin: 0px;
        }

        .brdcrm li {
          font-size: 12px;
          padding: 0 5px;
          color: #757575;
          list-style: none;
          display: inline;
          text-transform: capitalize;
        }

        .brdcrm li:first-child {
          padding-left: 0;
        }

        .brdcrm h1 {
          display: inline-block;
          font-size: 15px;
        }

        .read-more {
          padding: 50px 15px 20px;
          font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          color: #404040;
          margin: 0;
          font-size: 13px;
          line-height: 28px;
          word-wrap: break-word;
          font-weight: 600;
        }
        .read-more a {
          color: #e1261c;
          border-bottom: dotted 1px #e1261c;
        }

        .wrapper {
          margin-bottom: 40px;
        }
        .glbl-insdnav,
        .tabnav {
          justify-content: flex-start;
        }
        .glbl-insdnav {
          position: relative;
          clear: both;
          height: 38px;
        }
        .glbl-insdnav.hdr-entertainment .insdnav-hd {
          background: #a6214d;
        }
        .glbl-insdnav.hdr-lifestyle .insdnav-hd {
          background: #a621a6;
        }
        .glbl-insdnav.hdr-photos .insdnav-hd {
          background: #828282;
        }
        .glbl-insdnav.hdr-states .insdnav-hd {
          background: #a64d21;
        }
        .glbl-insdnav.hdr-videos .insdnav-hd {
          background: #a62121;
        }
        .glbl-insdnav.hdr-sports .insdnav-hd {
          background: #37a621;
        }
        .glbl-insdnav .insdnav-hd {
          height: 38px;
          line-height: 38px;
          display: block;
          padding: 0 16px;
          margin-right: 16px;
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          float: left;
          position: relative;
        }
        .glbl-insdnav .insdnav-hd a {
          color: #fff;
        }
        .glbl-insdnav.hdr-business .insdnav-hd {
          background: #2163a6;
        }
        .glbl-insdnav .insdnav {
          overflow: scroll;
          display: flex;
          justify-content: flex-start;
        }
        .glbl-insdnav .insdnav li {
          flex-shrink: 0;
        }
        .glbl-insdnav .insdnav li a {
          height: 36px;
          line-height: 35px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 14px;
          color: #757575;
        }
        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
          height: 250px;
        }
        .section-topslider ul {
          display: flex;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .section-topslider ul li figure img {
          width: 100%;
        }
        .chmpntpnwshd {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 28px;
          cursor: pointer;
        }
        .chmpntpnwshd a h1,
        .chmpntpnwshd a h2,
        .chmpntpnwshd a h3,
        .chmpntpnwshd h1 a,
        .chmpntpnwshd h2 a,
        .chmpntpnwshd h3 a {
          color: #fff;
          font-size: 18px;
          line-height: 26px;
          font-weight: 700;
        }
        .tpall {
          line-height: 22px;
          margin-bottom: 8px;
        }
        .tpall .tpc {
          background: #000;
          margin-right: 16px;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
        }
        .section-topslider.forentertainment ul li .tpall .tpc {
          background: #a6214d;
        }
        .section-topslider.forbusiness ul li .tpall .tpc {
          background: #2163a6;
        }
        .chmpntpnwshd a .tpall span {
          background: #000;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
          position: absolute;
          top: -15px;
          left: 16px;
          font-weight: 400;
        }
        .section-topslider-bullets {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          z-index: 2;
        }
        .section-topslider-bullets button {
          width: 8px;
          height: 8px;
          background: #7e8186;
          border-radius: 50%;
          margin: 0 8px 0 0;
          padding: 0;
          outline: 0;
          border: none;
          display: inline-block;
          cursor: pointer;
        }
        .section-topslider-bullets button.glide__bullet--active {
          background: #fff;
        }
        .section-topslider.forentertainment
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a6214d;
        }
        .section-topslider.forbusiness
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #2163a6;
        }
        .section-topslider.forstates
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a64d21;
        }
        .pdngsxtn {
          padding: 16px;
        }
        .sprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/phticnnew_1588065870.png)
            no-repeat;
        }
        .sprite.phticnl,
        .sprite.phticns,
        .sprite.vdsicnl {
          top: 50%;
          left: 50%;
          z-index: 1;
        }
        .sprite.phticnl {
          width: 55px;
          height: 55px;
          background-position: 0 0;
          position: absolute;
          margin: -27px 0 0 -27px;
          cursor: pointer;
          opacity: 0.7;
        }
        .sprite.phticns {
          width: 32px;
          height: 32px;
          background-position: 0 0;
          background-size: 32px;
          position: absolute;
          margin: -16px 0 0 -16px;
          cursor: pointer;
          opacity: 0.7;
        }
        .vdsicnl,
        .vdsicns {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 100%;
          cursor: pointer;
          top: 50%;
          left: 50%;
          z-index: 1;
        }
        .vdsicns {
          width: 32px;
          height: 32px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -16px 0 0 -16px;
        }
        .vdsicnl {
          width: 55px;
          height: 55px;
          position: absolute;
          margin: -27px 0 0 -27px;
        }
        .vdsicnl:before {
          top: 13px;
          left: 22px;
          border-top: 15px solid transparent;
          border-left: 20px solid #fff;
          border-bottom: 15px solid transparent;
          position: absolute;
          opacity: 0.6;
          display: block;
          content: "";
        }
        .vdsicns:before {
          top: 9px;
          left: 13px;
          border-top: 7px solid transparent;
          border-left: 10px solid #fff;
          border-bottom: 7px solid transparent;
          opacity: 0.6;
          position: absolute;
          opacity: 0.6;
          display: block;
          content: "";
        }
        .pgtbox {
          position: relative;
          overflow: hidden;
          clear: both;
        }
        .pgtbox ul li {
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }
        .pgtbox ul li:first-child {
          margin-bottom: 10px;
        }
        .pgtbox ul li figure {
          position: relative;
          width: 100%;
          float: left;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        .pgtbox ul li figure img {
          width: 100%;
          float: left;
        }
        .chmpntpnwshd a {
          color: #fff;
          display: block;
        }
        .tpnews {
          background: #fff;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
        }
        .listview-story {
          margin: 16px;
          position: relative;
        }
        .listview-story li {
          display: flex;
          margin-bottom: 8px !important;
        }
        .listview-story li figure {
          width: 110px;
          height: 75px;
          overflow: hidden;
          margin-right: 12px;
          line-height: 0;
          flex-shrink: 0;
          position: relative;
        }
        .listview-story li figure img {
          height: 75px;
          width: 100%;
        }
        .listview-story li .lstintro {
          margin: 8px 16px 0 0;
          position: relative;
        }
        .listview-story li .lstintro .tg {
          display: block;
          font-weight: 700;
          color: #000;
          font-size: 13px;
          float: none;
        }
        .listview-story li .lstintro .tm {
          display: none !important;
        }
        .listview-story li .lstintro h2,
        .listview-story li .lstintro h3 {
          font-size: 16px;
          line-height: 1.45;
          // height: 45px;
          overflow: hidden;
          font-weight: 400;
          display: block;
          margin-top: 2px;
        }
        .listview-story li .lstintro .tag-tm { margin-top: -15px; }
        .listview-story.forinsd {
          margin-bottom: 16px !important;
        }
        .listview-story.forinsd {
          margin: 16px 0 32px;
        }
        .listview-story.forinsd li {
          box-shadow: 0 0 3px #c5c5c5;
        }
        .gridview-story li a figure{
          height:100px; 
          background:#333;
        }
        .slct-ct-l,
        .tabnav li a {
          font-weight: 700;
        }
        .rdmrstr,
        .swpstory li .strintro {
          white-space: pre-wrap;
          position: absolute;
          font-size: 14px;
        }
        .swpstory li figure .tag-tm .tshr {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 8px 0;
          color: #fff;
          text-align: right;
          background: linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          background: -moz-linear-gradient(
            top,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0)
          );
          background: -webkit-linear-gradient(
            top,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0)
          );
        }
        .swpstory li .strintro {
          background: #fff;
          padding: 10px 8px;
          bottom: 0;
          color: #000;
          line-height: 20px;
          cursor: pointer;
          box-shadow: 0 1px 5px #bab9b9;
        }
        .swpstory li .strintro a {
          color: #000;
          height: 60px;
          overflow: hidden;
          display: block;
        }
        .rdmrstr {
          top: 0;
          right: -2px;
          bottom: -1px;
          left: -2px;
          display: flex;
          color: #fff;
          background: rgba(0, 0, 0, 0.8);
          z-index: 9999;
        }
        .tpall .tm {
          display: none !important;
        }
        .gridview-story.fordarkgreenbg {
          border: none;
          margin: 0 16px;
        }
        .gridview-story li .lstintro .tag-tm .tm,
        .chmpntpnwshd .tpall .tm {
          display: none !important;
        }
        .glblbghd-sts-mrnav,
        .rdmr {
          color: #ed1c24;
          border: 1px solid #ed1c24;
          border-radius: 20px;
          height: 26px;
          line-height: 26px;
          font-weight: 700;
          font-size: 14px;
          box-sizing: border-box;
          display: block;
          margin: 16px auto;
          width: 150px;
          overflow: hidden;
          text-align: center;
        }
        .astro_section {
          float: left;
          width: 100%;
          padding: 15px 10px;
          overflow: hidden;
        }

        .top-news-title {
          color: #606060;
          font-weight: bold;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          padding: 0 28px 0 14px;
          box-sizing: border-box;
          position: relative;
          border-bottom: 3px solid #EE1C25;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
        }
        .outbrain_row {
          padding: 0 15px;
        }
        
        // .cat-top-ad{
        //   height: 300px;
        // }

        h1.article_heading1 {
          font-size: 26px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          padding: 10px 0px 10px;
        }

        .top-news-title h1 {
          font-size: 14px;
          // line-height: 32px;
          // color: #001d42;
          // font-family: "Mukta", sans-serif !important;
          // font-weight: bold;
          // margin-bottom: 2px;
          // border-bottom: 3px solid #EE1C25;
        }
        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}
      `}</style>
    </>
  );
};
export default SubCategoryMobile;
