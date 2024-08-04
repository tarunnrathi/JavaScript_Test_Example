import NewIcon from "components/Common/icon/newIcon";
import CricketHeader from "components/Cricketnext/CricketHeader";
import React, { useRef, useState, useContext } from "react";
import InnerSubMenu from "./InnerSubMenuItem";
import { logEvent } from "includes/googleAnalytic";
//import { loadGS } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
import { STATIC_IMAGE } from "constant/global/Constant";
import SelectState from "components/Common/SelectState";
import { GetCategoryArticles } from "api/global/Common";
import Search from "widgets/Common/Search";
import NotificationPopup from "components/Responsive/NotificationPopUp";
import useDistrict from "hooks/useDistrict";
import HindiGlobalContext from "HindiGlobalContext";

const NormalNavBar = ({
  menuDetails,
  isCricketNext,
  current,
  isIpl,
  crMenu,
  isT20,
  pageType,
  setToggleMenu,
  showHamburger,
  toggleMenu,
  // districtList,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [showInnerMenu, setInnerMenu] = useState("");
  const [articleBySlug, setArticleBySlug] = useState({});
  const [showStates, setShowStates] = useState(false);
  // const [searchBar, setSearchBar] = useState(false);
  const { searchBar, setSearchBar, isNotificationOnScroll } = useContext(HindiGlobalContext);
  const [stories, setStories] = useState([]);
  const [districtList, filteredItems, state, setState] = useDistrict("");
  const cse = useRef(false);

  const hambergurHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleOnHover = (slug, url, hoverFunction) => {
    const specialCharTest = /[ `!@#$%^&*()+=[\]{};':"\\|,.<>/?~]/;
    if (!specialCharTest.test(slug)) {
      GetCategoryArticles(
        {
          filter: [
            {
              count: 4,
              offset: 0,
              sortOrder: "desc",
              fields: "images,headline,display_headline,weburl_r,story_id",
              sortBy: "created_at",
              category: slug,
              type: "category",
            },
          ],
          key: slug,
        },
        true
      )
        .then((response) => {
          if (!response.length) {
            hoverFunction(false);
          } else {
            setStories(response);
            setArticleBySlug((prevState) => ({
              ...prevState,
              [slug]: response,
            }));
            hoverFunction(url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      hoverFunction(false);
    }
  };

  const hoverMenuShow = (url) => {
    if (!url) return setIsShown(false);

    let slug = url.split("/");
    if (url.lastIndexOf("/") === url.length - 1) {
      slug = slug[slug.length - 2];
    } else {
      slug = slug[slug.length - 1];
    }
    if (articleBySlug[slug]) {
      setStories([...articleBySlug[slug]]);
      setIsShown(url);
    } else {
      handleOnHover(slug, url, setIsShown);
    }
  };

  const hoverMenuShowSub = (url) => {
    if (!url) return setInnerMenu("");

    let slug = url.split("/");
    if (url.lastIndexOf("/") === url.length - 1) {
      slug = slug[slug.length - 2];
    } else {
      slug = slug[slug.length - 1];
    }
    if (articleBySlug[slug]) {
      setStories(articleBySlug[slug]);
      setInnerMenu(url);
    } else {
      handleOnHover(slug, url, setInnerMenu);
    }
  };

  const handleShowChange = () => {
    setShowStates((prev) => !prev);
    if (!showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "राज्य/शहर चुनें");
    }
  };

  const toggleSearchBar = (e) => {
    e.preventDefault();
    setSearchBar(!searchBar);
    // if (!cse.current) {
    //   loadGS();
    //   cse.current = true;
    // }
  };

  return (
    <>
      <div id="navigation" className="navigationMain">
        <div className="container">
          {/* {!showHamburger && (
            <div className="hamburgerMenuCls" onClick={hambergurHandler}>
              <div
                className={`${!toggleMenu ? "nav_open header_hamburger" : "nav_open addcls"}`}
              />
            </div>
          )} */}
          {isCricketNext ? (
            <CricketHeader
              current={current}
              isIpl={isIpl}
              crMenu={crMenu}
              isT20={isT20}
              pageType={pageType}
            />
          ) : (
            <ul className="nav_bar dflex">
              {menuDetails &&
                menuDetails?.length !== 0 &&
                menuDetails.map((menuD, index) => {
                  return menuD.label === "LIVE TV" ||
                    menuD.label === "Live TV" ? (
                    <li key={index} className="nav_bar_li">
                      <a
                        href={menuD.url ? menuD.url : menuD.link}
                        title={menuD.label}
                        className="lvtv-fnt"
                        target={menuD.target == "1" ? "_blank" : "_self"}
                      >
                        <LazyLoadImage
                          src={STATIC_IMAGE.BASE64_MENU_IMAGE}
                          data-src="//static.hindi.news18.com/ibnkhabar/uploads/2016/12/lvtv-new.png"
                          className="lvtv-new lazyload"
                          alt={menuD.label}
                          height={11}
                          width={15}
                        />
                        {menuD.label}
                      </a>
                    </li>
                  ) : menuD.label === "logo" ? (
                    <li key={index} className="for-logo add-logo">
                      <a
                        href="/"
                        target={menuD.target === "1" ? "_blank" : "_self"}
                      >
                        <LazyLoadImage
                          src={STATIC_IMAGE.NEWS18_HINDI_LOGO}
                          width="70"
                          height="68"
                          alt="Logo"
                        />
                      </a>
                    </li>
                  ) : Array.isArray(menuD.children) ? (
                    <li
                      key={index}
                      className="nav_bar_li"
                      onMouseEnter={() =>
                        menuD.url !== "/" && hoverMenuShow(menuD.url)
                      }
                      onMouseLeave={() => hoverMenuShow(false)}
                    >
                      <>
                        <a
                          href={menuD.url ? menuD.url : menuD.link}
                          title={menuD.label}
                          target={menuD.target === "1" ? "_blank" : "_self"}
                          className="header_l1"
                        >
                          {menuD?.highlight_new === "1" && (
                            <NewIcon
                              styleStr={`.nav_bar li a svg {position: absolute;top: -5px; right: -17px; height: 12px;}`}
                            />
                          )}
                          {menuD.label}
                        </a>
                      </>
                      {isShown === menuD.url && menuD.children && (
                        <div
                          className={`submenu_boxwrap ${
                            !menuD.children.length ? "nomoredropdown" : ""
                          }`}
                        >
                          {menuD.children && menuD.children.length !== 0 && (
                            <ul>
                              {menuD.children.map((item, itemIndex) => {
                                return (
                                  <li
                                    key={itemIndex}
                                    onMouseEnter={() =>
                                      item.url !== "/" &&
                                      hoverMenuShowSub(item.url)
                                    }
                                    onMouseLeave={() =>
                                      hoverMenuShowSub("", menuD.url)
                                    }
                                  >
                                    <>
                                      <a
                                        title={item.label}
                                        target={
                                          item.target === "1"
                                            ? "_blank"
                                            : "_self"
                                        }
                                        href={item.url ? item.url : item.link}
                                      >
                                        <span>{item.label}</span>
                                      </a>
                                    </>
                                    {showInnerMenu === item.url && (
                                      <InnerSubMenu
                                        url={item.url}
                                        className="innerSubmenu"
                                        setArticleBySlug={setArticleBySlug}
                                        articleBySlug={articleBySlug}
                                        hoverMenuShow={hoverMenuShow}
                                        stories={stories}
                                      />
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          {!showInnerMenu && (
                            <InnerSubMenu
                              url={menuD.url}
                              className="outterSubmenu"
                              setArticleBySlug={setArticleBySlug}
                              articleBySlug={articleBySlug}
                              hoverMenuShow={hoverMenuShow}
                              stories={stories}
                            />
                          )}
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={index} className="nav_bar_li">
                      <a
                        href={menuD.url ? menuD.url : menuD.link}
                        title={menuD.label}
                        target={menuD.target === "1" ? "_blank" : "_self"}
                      >
                        {menuD.label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          )}

          <div className="header_search">
            {!isCricketNext && (
              <a onClick={handleShowChange} className="chsstctbtn cp_local18_widget_district_select">
                राज्य/शहर चुनें
              </a>
            )}
            <span
              href="#"
              className="top_search_icond header_search_icon"
              id="search-click"
              onClick={toggleSearchBar}
            />
            {isNotificationOnScroll && <NotificationPopup />}
            {!isCricketNext && (
              <a href="/livetv/" className="tplvtbtn">
                लाइव टीवी
              </a>
            )}
          </div>
          {/* <div
            id="search-box"
            dangerouslySetInnerHTML={{
              __html: "<gcse:search></gcse:search>",
            }}
          ></div> */}
        </div>
        <SelectState
          showStates={showStates}
          handleShowChange={handleShowChange}
          districtList={districtList}
          filteredItems={filteredItems}
          state={state}
          setState={setState}
        />
      </div>
      {searchBar && <Search pageType={pageType} handleClose={() => setSearchBar(false)}/>}

      <style jsx>{`
        #search-box {
          position: absolute;
          top: 48px;
          background: #fff;
          width: 400px;
          padding: 10px 10px 0 10px;
          right: 0;
          display: ${searchBar ? "block" : "none"};
          box-shadow: 0 1px 2px #ccc;
          z-index: 999;
        }
      `}</style>
    </>
  );
};

export default NormalNavBar;
