import React, { useState, lazy } from "react";
import "lazysizes";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import DistrictMobileStyle from "./DistrictMobile.module.css";
import DistrictArticleCard from "./DistrictArticleCard";
import MoreFromDistrictCard from "widgets/Common/Responsive/MoreFromDistrictCard";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import LazyLoad from "react-lazyload";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DistrictMobile = (props) => {
    const [paginationNumber, setPagination] = useState(1);
    const [loaderVisible, setloaderVisible] = useState(false);
    const [AddMoreButton, showAddMoreButton] = useState(true);
    const [dropDownVisible, setDropDownVisible] = useState(false);

    const loadMoreDistrictNews = async () => {
        setloaderVisible(true);
        const outPut = await props.topPriorityData.loadMoreDistrict(
            paginationNumber
        );
        if (Array.isArray(outPut) && outPut.length) {
            setPagination(parseInt(paginationNumber) + 1);
        } else if (Array.isArray(outPut) && !outPut.length) {
            showAddMoreButton(false);
        }
        setloaderVisible(false);
    };

    return (
        <>
            <>
                <div
                    className={`${DistrictMobileStyle.pwa_add} district-mobile-first-ad`}
                >
                    {/* <span id="first">Advertisement</span> */}
                    <SiteAd
                        // slotId="mobile_atf_320"
                        adUnit={props.pageAds.header_ATF_320}
                        sizes={[
                            [300, 250],
                            [336, 280]
                        ]}
                        district={true}
                        targetingArguments={{
                            Content_Type: "category page",
                        }}
                        pwa={true}
                    />
                </div>
                <section
                    className={[
                        DistrictMobileStyle.clearfix,
                        DistrictMobileStyle.wrapper,
                    ]}
                >
                    <div className={DistrictMobileStyle.prgrsloadr}></div>
                    <div className={DistrictMobileStyle.clearfix}>
                        <div className={DistrictMobileStyle.prgrsloadr}></div>
                    </div>
                    <ul className={DistrictMobileStyle.newdscrt_brdcrmb}>
                        <li>
                            <a href={publicRuntimeConfig.siteUrl}>Home</a>
                        </li>
                        <li>
                            <a href={`/news/`}>
                                News
                            </a>
                        </li>
                        <li>
                            <a
                                href={`/news/${
                                    props.topPriorityData.currentDistrict.href.split(
                                        "/"
                                    )[0]
                                }/`}
                            >
                                {
                                    props.topPriorityData.currentDistrict
                                        .stateName
                                }
                            </a>
                        </li>
                        <li>
                            {props.topPriorityData.post_id ? (
                                <a
                                    href={`/news/${props.topPriorityData.currentDistrict.href}/`}
                                >
                                    {props.topPriorityData.currentDistrict.en}
                                </a>
                            ) : (
                                <a>
                                    {props.topPriorityData.currentDistrict.en}
                                </a>
                            )}
                        </li>
                    </ul>
                    {/* <a href="#" className={DistrictMobileStyle.bltnsubscrb}>
                            Subscribe for {currentDistrict} Bulletin
                        </a> */}
                    <div className={DistrictMobileStyle.blnthdwrap}>
                        {props.topPriorityData.post_id ? (
                            <h2 className={DistrictMobileStyle.blnthdwrap_hd}>
                                <span>
                                    {`${props.topPriorityData.currentDistrict.en} news`}
                                </span>
                            </h2>
                        ) : (
                            <h1 className={DistrictMobileStyle.blnthdwrap_hd}>
                                <span>
                                    {`${props.topPriorityData.currentDistrict.en} news`}
                                </span>
                            </h1>
                        )}
                        <div className={DistrictMobileStyle.blnthd_dscrttab}>
                            <div
                                className={
                                    DistrictMobileStyle.blnthd_dscrttab_click
                                }
                                onClick={() =>
                                    setDropDownVisible((prevStae) => !prevStae)
                                }
                            />
                            {props.topPriorityData.currentDistrict.hi}
                            {dropDownVisible ? (
                                <ul>
                                    {props.topPriorityData.districtList
                                        .filter(
                                            (item) =>
                                                item.parent ===
                                                props.topPriorityData
                                                    .currentDistrict.parent
                                        )
                                        .map((item) => (
                                            <li key={item.id}>
                                                <a href={`/news/${item.href}`}>
                                                    {item.hi}
                                                </a>
                                            </li>
                                        ))}
                                    <li
                                        onClick={() =>
                                            setDropDownVisible(
                                                (prevStae) => !prevStae
                                            )
                                        }
                                    >
                                        <a>जिला</a>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    </div>
                    {props.topPriorityData.articleList.length > 0 &&
                        props.topPriorityData.articleList.map((item, index) =>
                            index % 3 === 0 && index !== 0 ? (
                                <>
                                    <div
                                        className={DistrictMobileStyle.pwa_add}
                                    >
                                        {/* <span id="first">Advertisement</span> */}
                                        <SiteAd
                                            // slotId="mobile_atf_320"
                                            adUnit={
                                                index / 3 === 1
                                                    ? props.pageAds.ATF_300
                                                    : props.pageAds.BTF_300
                                            }
                                            district={true}
                                            sizes={[
                                                [300, 250],
                                                [336, 280],
                                            ]}
                                            targetingArguments={{
                                                Content_Type: "category page",
                                            }}
                                            pwa={true}
                                            lazyload={true}
                                        />
                                    </div>
                                    {!index == 0 && (
                                        <div className="aglikhabar">
                                            अगली ख़बर
                                        </div>
                                    )}
                                    <DistrictArticleCard
                                        key={item.id}
                                        articleData={item}
                                        isMobile={true}
                                        currentDistrictSlug={
                                            props.topPriorityData
                                                .currentDistrict.href
                                        }
                                        catURL={props.topPriorityData.catURL}
                                        isOpen={
                                            index == 0 &&
                                            props.topPriorityData.post_id
                                                ? false
                                                : true
                                        }
                                        pageAds={props.pageAds}
                                    />
                                </>
                            ) : (
                                <>
                                    {!index == 0 && (
                                        <div className="aglikhabar">
                                            अगली ख़बर
                                        </div>
                                    )}
                                    <DistrictArticleCard
                                        key={item.id}
                                        articleData={item}
                                        isMobile={true}
                                        currentDistrictSlug={
                                            props.topPriorityData
                                                .currentDistrict.href
                                        }
                                        catURL={props.topPriorityData.catURL}
                                        defaultTitle={
                                            props.topPriorityData.defaultTitle
                                        }
                                        isOpen={
                                            index == 0 &&
                                            props.topPriorityData.post_id
                                                ? false
                                                : true
                                        }
                                        pageAds={props.pageAds}
                                    />
                                </>
                            )
                        )}
                    {props.topPriorityData.articleList.length > 0 &&
                        AddMoreButton && (
                            <a
                                className={
                                    DistrictMobileStyle.newdscrt_morelistbtn +
                                    `${
                                        loaderVisible
                                            ? " active-loader loader"
                                            : " loader"
                                    }`
                                }
                                onClick={loadMoreDistrictNews}
                            >
                                {!loaderVisible ? (
                                    <span>Load More News</span>
                                ) : (
                                    <Loader
                                        type="Oval"
                                        color="#EE1C25"
                                        height={35}
                                        width={80}
                                    />
                                )}
                            </a>
                        )}
                </section>
                <div className={DistrictMobileStyle.newdscrt}>
                    <h2 className={DistrictMobileStyle.newdscrt_morehd}>
                        More from Other District
                    </h2>
                    <ul className={DistrictMobileStyle.newdscrt_morelist}>
                        {props.topPriorityData.moreArticleList.map((item) => (
                            <LazyLoad once>
                                <MoreFromDistrictCard
                                    item={item}
                                    isMobile={false}
                                />
                            </LazyLoad>
                        ))}
                    </ul>

                    {/* <div
                            className={DistrictMobileStyle.newdscrt_morelistbtn}
                        >
                            <a href="#">Read More</a>
                        </div> */}
                </div>
                <div className={DistrictMobileStyle.m_outbrain}>
                    <Outbrain
                        widgetSrc={`${publicRuntimeConfig.mainUrl}news/${props.topPriorityData.currentDistrict.href}`}
                        widgetId="MB_9"
                    />
                </div>
                <style jsx>
                    {`
                        .active-loader {
                            padding: 0 !important;
                            background: transparent;
                        }
                        .aglikhabar {
                            border-bottom: 2px solid #ee1c25;
                            background: #161616;
                            box-sizing: border-box;
                            font-size: 17px;
                            font-weight: 700;
                            padding: 2px 0 0 15px;
                            position: relative;
                            line-height: 28px;
                            height: 32px;
                            width: 100%;
                            clear: both;
                            float: left;
                            color: #fff;
                            margin-bottom: 16px;
                        }
                        .aglikhabar::before {
                            content: "";
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            border-top: 10px solid #ee1c25;
                            position: absolute;
                            bottom: -10px;
                            left: 20px;
                        }
                    `}
                </style>
            </>
        </>
    );
};

export default DistrictMobile;
