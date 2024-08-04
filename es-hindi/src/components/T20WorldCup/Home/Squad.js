import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { IccT20TeamList,flagUrl } from "api/Constant";

const Squad = ({ isAmp = false }) => {
  return (
    <div className="world_cup_squads vspacer20">
      <div className="world_cup_squads_left">
        <div className="squads_title">
          <i>
            {isAmp ? (<LazyLoadImage isAMP={true} src={"https://images.news18.com/static_news18/pix/ibnhome/news18/t20-logo.svg"} width={74} height={65} />) : (<img src="https://images.news18.com/static_news18/pix/ibnhome/news18/t20-logo.svg" />)}
          </i>
          <h3>विश्व कप <span>स्क्वॉड</span>
          </h3>
        </div>
        <div className="squads_img"></div>
      </div>
      <ul className="country_list">
        {IccT20TeamList?.map((team, index) => {
          const t = flagUrl + `${team.teamId}.png`
          return (
            <li key={index}>
              <a href={team?.teamUrl}>
                <i>
                  <LazyLoadImage
                    width={30}
                    height={19}
                    isLazyLoad={true}
                    src={flagUrl + `/${team?.teamId}.png`}
                  />
                </i>{team?.teamName}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Squad;
