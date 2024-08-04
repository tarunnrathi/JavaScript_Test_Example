import React from "react";
import SiteAd from "../Responsive/SiteAd";
import BudgetGlossaryWidget from "components/Common/budget/BudgetGlossaryWidget";
import RhsPhoto from "./RhsPhoto";

const RhsBudget = ({ pageAds, glossary, isFromHomePage, budgetPhotoStories = [], sponsor = {} }) => {
  return (
    <>
      <div className="budget_page_right">
        <div className="budget_page_right_sticky">
          <div className="sideTop rhs_common_side_top">
            <SiteAd
              width={300}
              height={250}
              slotId={'budget_news_rhs'}
              adUnit={pageAds.HP_ATF_300}
              sizes={[[300, 250]]}
              lazyload={true}
            />
          </div>

          <div className="clearfix vsp20"></div>
          {budgetPhotoStories && budgetPhotoStories.length !== 0 ?
            <RhsPhoto photoStories={budgetPhotoStories} />
            : <BudgetGlossaryWidget glossary={glossary} sponsor={sponsor}/>}
          <div className="clearfix"></div>
          {!isFromHomePage && (
            <div className="sideMiddle">
              <SiteAd
                adUnit={
                  pageAds.BTF_300_id
                    ? pageAds.BTF_300_id
                    : `NW18_HIND_Desktop/NW18_HIND_BUDGET/NW18_HIND_BUDGET_HOME/NW18_HIND_BDGT_HP_BTF_300`
                }
                sizes={[
                  [300, 250],
                  [300, 600],
                ]}
                width={300}
                removeAdSpan={true}
                height={250}
                lazyload={true}
              />
            </div>
          )}
        </div>
      </div>
      <style>{`
            .budget_page_right {
              margin-top: 10px;
            }
            .sideTop {
              min-height: 280px;
              position: relative;
            }
            .sideMiddle {
              padding-top: 20px;
              min-height: 250px;
              position: relative;
            }
            .sideMiddle span,
            .sideTop span {
              background: #eee;
              font-size: 12px;
              color: #444;
              padding: 3px 0 3px 0;
              text-align: center;
              min-height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: normal;
            }

    `}</style>
    </>
  );
};

export default RhsBudget;
