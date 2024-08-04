import React from "react";
import NewIcon from "../../components/Common/icon/newIcon.js";
import dynamic from "next/dynamic";

const CricketHeaderMobile = dynamic(() =>
  import("components/Cricketnext/CricketHeaderMobile")
);
const SeriesSubMenuWidgetMobile = dynamic(() =>
  import("./SeriesSubMenuWidgetMobile")
);

const CricketHeaderNewMobile = dynamic(() =>
  import("components/Cricketnext/CricketHeaderNewMobile")
);

const Menu = ({ props }) => {
  return (
    <>
      <ul className={props.isCricketNext?"tplncnt crkt":"tplncnt"}>
       
          <li>
          <a
            href={props.isCricketNext ? "/cricket/" : "/"}
            className="home-icon tplnchld header_l1"
            style={{ fontSize: "15px" }}
          >
            {props.isCricketNext ? (
              <img
                width="19px"
                height="17px"
                src={"/images/siteimages/cn-icon.svg"}
                alt={"News18 हिंदी CricketNext Icon"}
                title={"News18 हिंदी CricketNext Icon"}
              />
            ) : (
              <span>होम</span>
            )}
          </a> </li>
        
        
        {props?.dynaMenu?.length > 0
          && props?.dynaMenu.slice(1).map((menu, key) => {
            return (
              <a
                key={"menutrending" + key}
                className="tplnchld"
                href={menu?.url}
                style={{ fontSize: "15px" }}
              >
                {menu?.label}
              </a>
            );
          })}
        {!props.isCricketNext &&
          !props?.dynaMenu?.length &&
          props.trending &&
          props.trending.length > 0
          && props.trending.map((topNavData, index) => (
            <li key={index}>
              <a
                key={"menutrending" + topNavData.id}
                className="tplnchld header_l1"
                href={topNavData.url}
                style={{ fontSize: "15px" }}
              >
                {topNavData.highlight_new === "1" ? <NewIcon /> : ""}
                {topNavData.label}
              </a>
            </li>
          ))}

        {props.isCricketNext && (
          props.pageType === "series" ? (
            <SeriesSubMenuWidgetMobile
              seriesMenuData={props?.menuData?.seriesMenuData}
            />
          ) : props?.dtype === "onlycricket-page" ? (
            <CricketHeaderNewMobile crMenu={props?.crMenu || []} />
          )
            : (
              <CricketHeaderMobile
                isIpl={props.isIpl}
                crMenu={props.crMenu}
                isT20={props.isT20}
                isWorldCup={props.isWorldCup}
                pageType={props.pageType}
                activeId={props.activeId}
                mostRunsData={props?.mostRunsData}
                mostWickets={props?.mostWickets}
                pointsTableData={props?.pointsTableData}
              />
            )
        )}
      </ul>
      <style jsx>{`
        .tplncnt.crkt{overflow-x: auto; display: flex;}
        li:first-child a.tplnchld img {vertical-align: middle;}
      `}</style>
    </>
  );
};

export default Menu;
