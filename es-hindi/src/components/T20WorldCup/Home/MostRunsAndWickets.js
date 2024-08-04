import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { player_images } from "api/Constant";


const MostRunsAndWickets = ({ isAmp = false, mostRunsData, mostWickets }) => {
  return (
    <div className="most_run_left">
      <div className="most_run">
        <h2 className="page_title">
          सर्वाधिक <span> रन</span>
        </h2>
        <div className="info_table">
          <table className="most-ran-table orange-cap">
            <thead>
              <tr>
                <th>स्थान</th>
                <th>खिलाड़ी</th>
                <th>टीम</th>
                <th>मैच</th>
                <th>रन</th>
              </tr>
            </thead>
            <tbody>
              {mostRunsData?.leaderboard?.length > 0 && mostRunsData?.leaderboard?.slice(0, 5).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={`${player_images}/${item?.player_id}.png`}
                          height={64}
                          width={64}
                          alt={`विराट कोहली`}
                          defaultImageURL={"https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png"}
                          isLazyLoad={true}
                        />
                        <p>{item?.player_name}</p>
                      </div>
                    </td>
                    <td>
                      <a href="javascript:void();">{item?.team_short_name}</a>
                    </td>
                    <td>{item?.matches_played}</td>
                    <td>{item?.runs_scored}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="load_more">
            <a href="/cricket/icc-t20-world-cup/most-runs/">
              <span>पॉइंट टेबल[+]</span>
            </a>
          </div>
        </div>
      </div>
      <div className="most_run vspacer20">
        <h2 className="page_title">
          सर्वाधिक <span>विकेट</span>
        </h2>
        <div className="info_table">
          <table className="most-ran-table purple-cap">
            <thead>
              <tr>
                <th>स्थान</th>
                <th>खिलाड़ी</th>
                <th>टीम</th>
                <th>मैच</th>
                <th>विकेट</th>
              </tr>
            </thead>
            <tbody>
              {mostWickets?.leaderboard?.length > 0 && mostWickets?.leaderboard?.slice(0, 5).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={`${player_images}/${item?.player_id}.png`}
                          height={64}
                          width={64}
                          alt={`विराट कोहली`}
                          defaultImageURL={"https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png"}
                          isLazyLoad={true}
                        />
                        <p>{item?.player_name}</p>
                      </div>
                    </td>
                    <td>
                      <a href="javascript:void();">{item?.team_short_name}</a>
                    </td>
                    <td>{item?.matches_played}</td>
                    <td>{item?.wickets}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="load_more">
            <a href="/cricket/icc-t20-world-cup/most-wickets/">
              <span> पॉइंट टेबल[+]</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostRunsAndWickets;
