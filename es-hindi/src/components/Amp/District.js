import React from "react";
import ampHelper from "includes/Amp/ampHelper";
// import DistrictArticleCard from "widgets/Amp/DistrictArticleCard";
import DistrictArticleCard from "widgets/Amp/DistrictArticleCard2";
import getConfig from "next/config";
import Head from "next/head";
import { imageLoader } from "includes/article.util";

const { publicRuntimeConfig } = getConfig();

const District = (props) => {
    const { data: { urlParam: { post_id = false } = {}, articleList: articleListArray = [] } = {} } = props;
    const ampAds = ampHelper.get_amp_ad_article(
        props.data.paramObj.subCategory,
        props.data.paramObj.category
    );
    const adTarget = ampHelper.get_ad_targetting(
        props.data.articleList[0],
        props.data.paramObj,
        props.pageSeo,
        "news"
    );
    const activeDistrict = props.data.currentDistrict;
    const renderDistrict = (flag) => {
        return (props.data.districtList.cityData ? props.data.districtList.cityData : props.data.districtList || [])
            .filter((item) => item.parent === activeDistrict.parent)
            .map((districtItem) => {
                const { id, hi, href, slug } = districtItem;
                return (
                    <li key={id}>
                        <a
                            href={`/amp/news/${href}/`}
                            className={
                                flag
                                    ? props.data.category === slug
                                        ? "active"
                                        : ""
                                    : "clkeventga"
                            }
                        >
                            {hi}
                        </a>
                    </li>
                );
            });
    };

    const articleList = (props.data.articleList || []).map((item) => {
        const outBrainUrl = (item.url || item.weburl).replace(
            /https:\/\/(stg|beta)?hindi.news18.com\//,
            `${publicRuntimeConfig.siteUrl}`
        );
        return {
            title: item.headline,
            url: outBrainUrl
                .replace(`${publicRuntimeConfig.siteUrl}news/`, "/")
                .replace(
                    /[^\/][-a-zA-Z]*/,
                    `amp/news/${(activeDistrict || {}).href}`
                ),
            image: item.images.url,
        };
    });

    return (
        <>
            <>
                <Head>

                </Head>
                <div
                    className="newdscrt-add newdscrt-add-top"
                    next-page-hide=""
                >
                    <span>Advertisment</span>
                    <div className="newdscrt-add-in">
                        <amp-ad
                            width={336}
                            height={280}
                            type="doubleclick"
                            data-slot={ampAds.topAd}
                            data-multi-size="300x250"
                            data-loading-strategy="prefer-viewability-over-views"
                            data-multi-size-validation="false"
                            rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
                            json={adTarget}
                        ></amp-ad>
                    </div>
                </div>
                <ul className="newdscrt-brdcrmb" next-page-hide="">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/news/">News</a>
                    </li>
                    <li>
                        <a
                            href={`/news/${activeDistrict?.href.split("/")[0]
                                }/`}
                        >
                            {activeDistrict?.stateName}
                        </a>
                    </li>
                    <li>
                        {props.data.post_id ? (
                            <a href={`/amp/news/${activeDistrict?.href}/`}>
                                {activeDistrict?.en}
                            </a>
                        ) : (
                            <a>{activeDistrict?.en}</a>
                        )}
                    </li>
                </ul>
                {/* <a href="#" className="bltnsubscrb">Subscribe for Coimbatore Bulletin</a> */}

                <div className="blnthdwrap" next-page-hide="">
                    {
                        !post_id ?
                            <h1 className="blnthdwrap-hd">
                                <span>{activeDistrict?.en} news</span>
                            </h1> :
                            <h2 className="blnthdwrap-hd">
                                <span>{activeDistrict?.en} news</span>
                            </h2>
                    }
                    <div
                        className="blnthd-dscrttab"
                        role="button"
                        on="tap:dscrttabbox.toggleVisibility"
                        tabIndex="0"
                    >
                        {(activeDistrict || {}).hi}
                        <ul id="dscrttabbox" hidden>
                            {renderDistrict(true)}
                            <li
                                on="tap:dscrttabbox.toggleVisibility"
                                role="button"
                                tabIndex="0"
                            >
                                <span>District</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {!post_id ?
                    <>
                        {
                            articleListArray.length ?
                                articleListArray.map((eachDistrict, index) => {
                                    return (
                                        index == 0 ?
                                            <div className="bigstory">
                                                <a href={eachDistrict.weburl ? eachDistrict.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + "amp/") : ''} >
                                                    <div style={{ width: "100%", background: "#eee" }}>
                                                        <figure className="expand">
                                                            <amp-img
                                                                src={imageLoader(eachDistrict["images"]["url"], 360, 285, false, true)}
                                                                width="411"
                                                                height="285"
                                                                alt={eachDistrict["images"]["caption"] || eachDistrict.display_headline || ''}
                                                                title={eachDistrict["images"]["caption"] || eachDistrict.display_headline || ''}
                                                                layout="responsive"
                                                            ></amp-img>
                                                        </figure>
                                                    </div>
                                                </a>
                                                <h2>
                                                    <a href={eachDistrict.weburl ? eachDistrict.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + "amp/") : ''}>{eachDistrict["images"]["caption"] || eachDistrict.display_headline || eachDistrict.title}</a>
                                                </h2>
                                            </div>
                                            :
                                            <div className={"more-district"}>
                                                <a href={eachDistrict.weburl ? eachDistrict.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + "amp/") : ''}>
                                                    <figure>
                                                        <amp-img
                                                            height="54"
                                                            width="80"
                                                            src={eachDistrict["images"]["url"] && imageLoader(eachDistrict["images"]["url"], 80, 54)}
                                                            alt={eachDistrict["images"]["caption"] || eachDistrict['display_headline'] || ''}
                                                            title={eachDistrict["images"]["caption"] || eachDistrict['display_headline'] || ''}
                                                            layout="responsive"
                                                        ></amp-img>
                                                    </figure>
                                                    <h3>{eachDistrict['display_headline'] || eachDistrict['title']}</h3>
                                                </a>
                                            </div>
                                    );

                                })
                                : ""
                        }
                    </>
                    : (props.data.articleList || []).map((article, index) => {
                        return (
                            <>
                                {index === 0 && (
                                    <DistrictArticleCard
                                        article={article}
                                        index={index}
                                        isMobile={props.isMobile}
                                        activeDistrict={activeDistrict}
                                        currentUrl={props.data.currentUrl}
                                        ampAds={ampAds}
                                        adTarget={adTarget}
                                    />
                                )}
                            </>
                        );
                    })}
                {
                    !post_id ?
                        <div className="newdscrt-add" next-page-hide="">
                            <span>Advertisment</span>
                            <div className="newdscrt-add-in">
                                <amp-ad
                                    width={336}
                                    height={280}
                                    type="doubleclick"
                                    data-slot={ampAds.middleAd1}
                                    data-multi-size="300x250"
                                    data-loading-strategy="prefer-viewability-over-views"
                                    data-multi-size-validation="false"
                                    rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" } },"timeoutMillis": 1000}'
                                    json={adTarget}
                                ></amp-ad>
                            </div>
                        </div>
                        : ""
                }
            </>
            <style jsx global>{`
                .newdscrt-brdcrmb {
                    font-family: Noto Serif, Droid Serif, sans-serif;
                    font-weight: 500;
                    display: flex;
                    margin: 0px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 10px 15px;
                }

                .newdscrt-brdcrmb li {
                    flex-shrink: 0;
                    color: #838383;
                    font-size: 12px;
                    margin-right: 10px;
                }

                .newdscrt-brdcrmb li h1 {
                    color: #838383;
                    font-size: 12px;
                }

                .newdscrt-brdcrmb li a {
                    color: #000;
                    font-size: 12px;
                }

                .newdscrt-brdcrmb li a:after {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-top: 2px solid #b2b2b2;
                    border-right: 2px solid #b2b2b2;
                    transform: rotate(45deg);
                    margin-left: 7px;
                    position: relative;
                    top: -1px;
                }
                .newdscrt-brdcrmb li:last-child a:after {
                    display: none;
                }

                .bltnsubscrb {
                    background: #264276
                        url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/pinicon_1614328186.png)
                        15px 50% no-repeat;
                    color: #fff;
                    font-family: "Montserrat", sans-serif;
                    text-transform: uppercase;
                    font-size: 14px;
                    border-radius: 15px 0 0 15px;
                    height: 30px;
                    line-height: 30px;
                    display: block;
                    padding: 0 0 0 40px;
                    margin-left: 16px;
                    font-weight: 500;
                }

                .blnthdwrap {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    z-index: 2;
                    margin: 15px 10px 10px 16px;
                    font-family: "Montserrat", sans-serif;
                }

                .blnthdwrap-hd {
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 18px;
                    line-height: 20px;
                }

                .blnthdwrap-hd span {
                    border-bottom: 4px solid #ee1c25;
                    line-height: 20px;
                    display: inline-block;
                }

                .blnthdwrap-hd b {
                    font-weight: 800;
                    border-bottom: 1px solid #000;
                    display: inline-block;
                    line-height: 25px;
                }

                .blnthd-dscrttab {
                    border-bottom: 3px solid #ee1c25;
                    color: #606060;
                    font-size: 13px;
                    text-transform: uppercase;
                    font-weight: 600;
                    line-height: 24px;
                    padding: 0 22px 0 10px;
                    position: relative;
                    outline: none;
                    width: 140px;
                    max-height: 200px;
                }

                .blnthd-dscrttab:after {
                    content: "";
                    width: 6px;
                    height: 6px;
                    border-top: 2px solid #ee1c25;
                    border-right: 2px solid #ee1c25;
                    position: absolute;
                    transform: rotate(135deg);
                    top: 6px;
                    right: 8px;
                }

                .blnthd-dscrttab ul {
                    position: absolute;
                    background: #fff;
                    box-shadow: 0px 2px 3px #00000029;
                    border: 1px solid #e9e9f0;
                    border-radius: 0 4px 4px 4px;
                    top: 26px;
                    right: 0;
                    overflow: auto;
                    // height: 300px;
                    min-width: 125px;
                }

                .blnthd-dscrttab ul li {
                }

                .blnthd-dscrttab ul li a {
                    color: #4d4f5c;
                    font-size: 13px;
                    font-weight: normal;
                    text-transform: none;
                    padding: 10px 12px;
                    display: block;
                    line-height: 18px;
                }

                .blnthd-dscrttab ul li a.active {
                    background: #e9e9f0;
                }

                .blnthd-dscrttab ul li:last-child {
                    background: #c6080f;
                    padding: 0 12px;
                    position: sticky;
                }

                .blnthd-dscrttab ul li:last-child span {
                    display: inline-block;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: 600;
                    padding: 8px 5px;
                }

                .blnthd-dscrttab ul li:last-child:before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-top: 2px solid #fff;
                    border-left: 2px solid #fff;
                    transform: rotate(-45deg);
                    float: left;
                    margin-top: 15px;
                }

                .blnthd-dscrttab ul li:last-child:after {
                    content: "X";
                    display: inline-block;
                    color: #fff;
                    font-size: 17px;
                    float: right;
                    margin-top: 8px;
                }

                .newdscrtcardbox {
                    border-bottom: 15px solid #e9e9f0;
                    position: relative;
                    z-index: 1;
                }

                .newdscrtcardbox figure {
                    width: 100%;
                    position: relative;
                    line-height: 0;
                }

                .newdscrtcardbox figure img {
                    width: 100%;
                }

                .newdscrtcardbox-content {
                    padding: 15px 15px;
                }

                .newdscrtcardbox-content h1,
                .newdscrtcardbox-content h2 {
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 30px;
                    color: #000;
                }

                .newdscrtcardbox-date {
                    font-size: 12px;
                    color: #606060;
                    line-height: 16px;
                    font-family: "Montserrat", sans-serif;
                    margin: 10px 0;
                }

                .newdscrtcardbox-contentparra {
                    width: 100%;
                    font-size: 16px;
                    line-height: 28px;
                    color: rgb(64, 64, 64);
                }

                .newdscrtcardbox-contentparra p {
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: normal;
                    color: #212121;
                    margin-bottom: 15px;
                }

                .newdscrtcardbox-contentparra p:first-child {
                    display: block;
                }

                .newdscrtcardbox-btm {
                    display: flex;
                    justify-content: space-between;
                    border-top: 2px solid #e9e9f0;
                    align-items: center;
                    height: 40px;
                    padding: 0 15px;
                }
                .newdscrtcardbox-contentparra h2 {
                    font-size: 18px;
                    line-height: 28px;
                    font-weight: normal;
                }
                .newdscrtcardbox.adclscontentparra
                    .newdscrtcardbox-contentparra {
                }

                .newdscrtcardbox.adclscontentparra
                    .newdscrtcardbox-contentparra
                    p {
                    display: block;
                }

                .newdscrtcardbox-btmshare {
                    display: flex;
                }

                .newdscrtcardbox-btmshare a {
                    margin-right: 20px;
                    display: block;
                }

                .newdscrtcardbox-btmmore {
                    position: relative;
                    color: #ee1c25;
                    font-size: 14px;
                    font-weight: bold;
                    padding-right: 15px;
                }

                .newdscrtcardbox-btmmore:before,
                .newdscrtcardbox-btmmore:after {
                    content: "";
                    position: absolute;
                }

                .newdscrtcardbox-btmmore:before {
                    width: 2px;
                    height: 10px;
                    top: 8px;
                    right: 12px;
                    background: #fff;
                }

                .newdscrtcardbox-btmmore:after {
                    width: 6px;
                    height: 6px;
                    border-bottom: 2px solid #fff;
                    border-right: 2px solid #fff;
                    transform: rotate(45deg);
                    top: 11px;
                    right: 9px;
                }

                .newdscrt-vdicon {
                    position: absolute;
                    width: 58px;
                    height: 58px;
                    top: 50%;
                    z-index: 999;
                    left: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                    border-radius: 100px;
                    margin: -29px 0 0 -29px;
                }

                .newdscrt-vdicon:before,
                .newdscrt-vdicon:after {
                    content: "";
                    position: absolute;
                }

                .newdscrt-vdicon:before {
                    border: 5px solid #fff;
                    top: 6px;
                    border-radius: 100%;
                    left: 6px;
                    right: 6px;
                    bottom: 6px;
                }

                .newdscrt-vdicon:after {
                    border-top: 10px solid transparent;
                    border-left: 15px solid #fff;
                    border-bottom: 10px solid transparent;
                    top: 19px;
                    left: 24px;
                }

                .newdscrt-sharesprite {
                    background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/district_sharesprite_1614328166.png)
                        0 0 no-repeat;
                    height: 19px;
                }

                .newdscrt-sharesprite.wtsap {
                    width: 18px;
                }

                .newdscrt-sharesprite.fcbk {
                    width: 13px;
                    background-position: -18px 0px;
                }

                .newdscrt-sharesprite.twtr {
                    width: 19px;
                    background-position: -31px 0px;
                }

                .newdscrt-sharesprite.shr {
                    width: 16px;
                    background-position: -51px 0px;
                }

                .newdscrt-add {
                    width: 100%;
                    text-align: center;
                    background: #e3e3e3;
                    padding: 15px 0 20px 0;
                }

                .newdscrt-add span {
                    font-size: 12px;
                    color: #606060;
                    line-height: 16px;
                    font-family: "Montserrat", sans-serif;
                    display: block;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }

                .newdscrt-add-in {
                    display: flex;
                    justify-content: center;
                }

                .newdscrt-morehd {
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 18px;
                    line-height: 16px;
                    font-family: "Montserrat", sans-serif;
                    border-bottom: 1px solid #dedede;
                    margin-bottom: 10px;
                    padding: 25px 10px 10px 10px;
                    position: relative;
                }

                .newdscrt-morehd:after {
                    content: "";
                    width: 115px;
                    height: 4px;
                    background: #ee1c25;
                    position: absolute;
                    bottom: 0;
                    left: 10px;
                }

                .newdscrt-morelist {
                    padding: 0 10px;
                }

                .newdscrt-morelist li a {
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid #dedede;
                    padding: 20px 0;
                }

                .newdscrt-morelist li:first-child a {
                    border-top: none;
                    padding-top: 0px;
                }

                .newdscrt-morelist li a figure {
                    line-height: 0;
                    background: #eee;
                    width: 120px;
                    margin-right: 12px;
                    height: 96px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .newdscrt-morelist li a figure img {
                    height: 100%;
                }

                .newdscrt-morelist li a h2,
                .newdscrt-morelist li a h3 {
                    width: 100%;
                    font-size: 13px;
                    line-height: 20px;
                    color: #000000;
                    font-weight: bold;
                }

                .newdscrt-morelist li a h2 span,
                .newdscrt-morelist li a h3 span {
                    display: block;
                    font-family: "Montserrat", sans-serif;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: #ee1c25;
                    margin-top: 2px;
                    font-weight: 500;
                }

                .newdscrt-morelistbtn {
                    border-bottom: 1px solid #dedede;
                    display: block;
                    margin: 15px 0;
                    padding: 0 10px;
                }

                .newdscrt-morelistbtn a {
                    position: relative;
                    display: block;
                    border-bottom: 3px solid #000000;
                    text-align: right;
                    padding-bottom: 10px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #ee1c25;
                    font-family: "Montserrat", sans-serif;
                    padding-right: 15px;
                }

                .newdscrt-morelistbtn a:before,
                .newdscrt-morelistbtn a:after {
                    content: "";
                    position: absolute;
                }

                .newdscrt-morelistbtn a:before {
                    width: 10px;
                    height: 2px;
                    background: #ee1c25;
                    right: 0px;
                    top: 9px;
                }

                .newdscrt-morelistbtn a:after {
                    width: 6px;
                    height: 6px;
                    border-top: 2px solid #ee1c25;
                    border-right: 2px solid #ee1c25;
                    transform: rotate(45deg);
                    right: 0px;
                    top: 6px;
                }
                .newdscrtcardbox-btmmore.newdscrtcardbox-btmmore-rotate:after {
                    transform: rotate(225deg);
                    top: 9.5px;
                }
                .newdscrtcardbox-btmmore.newdscrtcardbox-btmmore-rotate:before {
                    top: 10px;
                }
                .newdscrtcardbox-btmmore.newdscrtcardbox-btmmore-rotate {
                    margin-top: 0;
                    margin-bottom: 10px;
                }
                .article_title {
                    font-size: 16px;
                    line-height: 20px;
                    color: #eee;
                    padding: 10px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    box-sizing: border-box;
                    background: rgba(0, 0, 0, 0.6);
                }
                .newbyeline {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
                .newbyeline_agency {
                    padding: 4px 0;
                    list-style: none;
                    margin: 0;
                }
                .newbyeline_agency li {
                    position: relative;
                    color: #949494;
                    text-transform: uppercase;
                    font-size: 12px;
                    padding: 4px 0 3px 14px;
                    font-weight: normal;
                    line-height: 1.4;
                }
                .newbyeline_agency li b {
                    font-weight: bold;
                }
                .newbyeline_agency li a {
                    color: #e1261c;
                    text-decoration: none;
                    position: relative;
                    font-weight: bold;
                }
                .newbyeline_agency li:before {
                    content: "";
                    background: #858585;
                    width: 8px;
                    height: 8px;
                    border-radius: 100%;
                    position: absolute;
                    top: 8px;
                    left: 0;
                }
                .bigstory {
                    clear: both;
                    background: #f3f3f3;
                    position: relative;
                    min-height: 227px;
                }
                .bigstory figure {
                    position: relative;
                    overflow: hidden;
                    line-height: 0;
                }
                a {
                    text-decoration: none;
                    color: #111;
                }
                .bigstory figure img {
                    width: 100%;
                }
                .bigstory h3 {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent,#111,#000);
                    
                    padding: 45px 15px 10px 15px;
                }
                .bigstory h3 a {
                    display: block;
                    font-size: 18px;
                    line-height: 24px;
                    color: #fff;
                    font-weight: 700;
                }
                .bigstory>span.pb4 {
                    padding: 4px 15px 4px 15px;
                }
                .bigstory>span {
                    background: #dc2c33;
                    color: #fff;
                    font-size: 14px;
                    top: 5px;
                    position: absolute;
                    z-index: 1;
                    left: 5px;
                    padding: 4px 15px;
                    font-weight: bold;
                }
                .expand {
                    left: 50%;
                    margin-left: -50vw;
                    margin-right: -50vw;
                    max-width: 100vw;
                    right: 50%;
                    width: 100vw;
                    position: relative;
                }
                .bigstory h1, .bigstory h2 {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent,#111,#000);
                    
                    padding: 45px 15px 10px;
                }
                .bigstory h1 a, .bigstory h2 a {
                    display: block;
                    font-size: 18px;
                    line-height: 24px;
                    color: #fff;
                    font-weight: 700;
                }
                .more-district {
                    font-size: 16px;
                    line-height: 20px;
                    padding: 12px 0;
                    width: 94%;
                    border-bottom: 1px solid #ccc;
                    position: relative;
                    margin: 0 3%;
                }
                .more-district a {
                    
                    display: -ms-flexbox;
                    display: flex;
                    
                    align-items: center;
                    color: #222;
                }
                .more-district figure {
                    width: 80px;
                    height: 53px;
                    background: #eee;
                    margin-right: 10px;
                     
                    flex-shrink: 0;
                }
                .more-district h3 {
                    font-size: 16px;
                    font-weight: 400;
                }
            `}</style>
        </>
    );
};

export default District;
