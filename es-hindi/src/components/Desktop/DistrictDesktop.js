import React, { useState, useContext } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import DistrictDesktopStyles from "./DistrictDesktop.module.css";
import DistrictArticleCard from "components/Desktop/DistrictArticleCard";
import MoreFromDistrictCard from "widgets/Common/Responsive/MoreFromDistrictCard";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import Loader from "react-loader-spinner";

import SelectStateLHS from "components/Common/SelectStateLHS";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DistrictDesktop = (props) => {
    // const { districtList } = useContext(UserContext).pageCommonProps;
    const [paginationNumber, setPagination] = useState(1);
    const [loaderVisible, setloaderVisible] = useState(false);
    const [AddMoreButton, showAddMoreButton] = useState(true);
    // const [state, setState] = useState("");
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [fullListVisible, setFullListVisible] = useState(false);
    let [districtList, filteredItems, state, setState] = useDistrict("");
    // const [districtList, setDistrictList] = useState(
    //     props.topPriorityData.districtList.length > 0
    //         ? props.topPriorityData.districtList
    //         : []
    // );

    // const filteredItems = districtList.filter(
    //     (item) =>
    //         item.href.toLowerCase().indexOf(state.toLowerCase()) != -1 ||
    //         item.hi.indexOf(state.toLowerCase()) != -1 ||
    //         item.en.indexOf(state.toLowerCase()) != -1
    // );
    const handleChange = ({ target }) => {
        setState(target.value);
    };
    // const changeDistrictList = () => {
    //     if (fullListVisible) {
    //         setFullListVisible((prevState) => !prevState);
    //         setDistrictList(() =>
    //             props.topPriorityData.districtList.slice(0, 8)
    //         );
    //     } else {
    //         setFullListVisible((prevState) => !prevState);
    //         setDistrictList(() => props.topPriorityData.districtList);
    //     }
    // };

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
            <div className={"container clearfix"}>
                <div className={"hmlft fleft"}>
                    <div className={DistrictDesktopStyles.newdscrttop}>
                        <ul className={DistrictDesktopStyles.newdscrt_brdcrmb}>
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
                                        {
                                            props.topPriorityData
                                                .currentDistrict.en
                                        }
                                    </a>
                                ) : (
                                    <a>
                                        {
                                            props.topPriorityData
                                                .currentDistrict.en
                                        }
                                    </a>
                                )}
                            </li>
                        </ul>
                        {/* <a href="#" className={DistrictDesktopStyles.bltnsubscrb}>
                        Subscribe for Coimbatore Bulletin
                    </a> */}
                    </div>
                    <div className={DistrictDesktopStyles.blnthdwrap}>
                        {props.topPriorityData.post_id ? (
                            <h2 className={DistrictDesktopStyles.blnthdwrap_hd}>
                                <span>
                                    {`${props.topPriorityData.currentDistrict.en} news`}
                                </span>
                            </h2>
                        ) : (
                            <h1 className={DistrictDesktopStyles.blnthdwrap_hd}>
                                <span>
                                    {`${props.topPriorityData.currentDistrict.en} news`}
                                </span>
                            </h1>
                        )}

                        <div className={DistrictDesktopStyles.blnthd_dscrttab}>
                            <div
                                className={
                                    DistrictDesktopStyles.blnthd_dscrttab_click
                                }
                                onClick={() =>
                                    setDropDownVisible((prevStae) => !prevStae)
                                }
                            />
                            {props.topPriorityData.currentDistrict.hi}
                            {dropDownVisible ? (
                                <ul>
                                    {districtList
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
                    <div className={DistrictDesktopStyles.bltnnews_inside}>
                        <SelectStateLHS
                            topPriorityData={props.topPriorityData}
                        />
                        <div className={DistrictDesktopStyles.bltnnews_right}>
                            {props.topPriorityData.articleList.length > 0 &&
                                props.topPriorityData.articleList.map(
                                    (item, index) => (
                                        <DistrictArticleCard
                                            key={item.id}
                                            articleData={item}
                                            isMobile={false}
                                            currentDistrictSlug={
                                                props.topPriorityData
                                                    .currentDistrict.href
                                            }
                                            catURL={
                                                props.topPriorityData.catURL
                                            }
                                            defaultTitle={
                                                props.topPriorityData
                                                    .defaultTitle
                                            }
                                            isOpen={
                                                index == 0 &&
                                                props.topPriorityData.post_id
                                                    ? false
                                                    : true
                                            }
                                            pageAds={props.pageAds}
                                        />
                                    )
                                )}
                            {props.topPriorityData.articleList.length > 0 &&
                                AddMoreButton && (
                                    <a
                                        className={
                                            DistrictDesktopStyles.newdscrtloadmore +
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
                                                height={39}
                                                width={80}
                                            />
                                        )}
                                    </a>
                                )}
                            <div className={DistrictDesktopStyles.newdscrt}>
                                <h2
                                    className={
                                        DistrictDesktopStyles.newdscrt_morehd
                                    }
                                >
                                    More from Other District
                                </h2>
                                <div
                                    className={
                                        DistrictDesktopStyles.newdscrt_morelistwrap
                                    }
                                >
                                    <ul
                                        className={
                                            DistrictDesktopStyles.newdscrt_morelist
                                        }
                                    >
                                        {props.topPriorityData.moreArticleList.map(
                                            (item) => (
                                                <MoreFromDistrictCard
                                                    item={item}
                                                    isMobile={false}
                                                />
                                            )
                                        )}
                                    </ul>

                                    {/* <div
                                        className={
                                            DistrictDesktopStyles.newdscrt_morelistbtn
                                        }
                                    >
                                        <a href="#">Read More</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"hmrgt fright"}>
                    <RhsCommon
                        pageAds={props.pageAds}
                        photoStories={props.topPriorityData?.rhsPhotoGallery?.rhsPhotoListing}
                        topStories={props.topPriorityData?.rhsTopStory?.rhsTopStoryListing}
                        currentURL={`${publicRuntimeConfig.mainUrl}news/${props.topPriorityData.currentDistrict.href}`}
                        district={true}
                    />
                </div>
            </div>
            <div className={DistrictDesktopStyles.vsp20}></div>
            <div className="container">
                <Outbrain
                    widgetId="AR_9"
                    widgetSrc={`${publicRuntimeConfig.mainUrl}news/${props.topPriorityData.currentDistrict.href}`}
                />
            </div>
            <style jsx>
                {`
                    .adclsviewallloclt span:before {
                        top: ${fullListVisible ? "7px" : "4px"};
                    }

                    .active-loader {
                        padding: 0 !important;
                        background: transparent;
                    }

                    .adclsviewallloclt span:after {
                        transform: ${fullListVisible
                            ? "rotate(-225deg)"
                            : "rotate(-45deg)"};
                        top: ${fullListVisible ? "5px" : "6px"};
                    }
                `}
            </style>
        </>
    );
};

export default DistrictDesktop;
