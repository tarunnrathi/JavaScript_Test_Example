/* eslint-disable semi */
import LazyLoadImage from "components/Common/CustomImage";

const MostRunsAndWickets = ({ isAmp = false, mostWicketdata, mostRunData }) => {
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
              {mostRunData.length > 0 &&
                mostRunData.map((data, idx) => {
                  return (
                    <>
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="table_team_name">
                            {isAmp ? (
                              <LazyLoadImage
                                isAMP={true}
                                src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${data?.player_id}.png`}
                                alt={data?.player_name}
                                height={64}
                                width={64}
                              />
                            ) : (
                              <LazyLoadImage
                                src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${data?.player_id}.png`}
                                alt={data?.player_name}
                                height={64}
                                width={64}
                              />
                            )}

                            <p>{data?.player_name}</p>
                          </div>
                        </td>
                        <td>
                          <a>{data?.team_short_name}</a>
                        </td>
                        <td>{data?.matches_played}</td>
                        <td>{data?.runs_scored}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="load_more">
            <a href="/world-cup/most-runs/">
              <span>और पढ़े[+]</span>
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
              {mostWicketdata.length > 0 &&
                mostWicketdata.map((data, idx) => {
                  return (
                    <>
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="table_team_name">
                            {isAmp ? (
                              <LazyLoadImage
                                isAMP={true}
                                src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${data?.player_id}.png`}
                                alt={data?.player_name}
                                height={64}
                                width={64}
                              />
                            ) : (
                              <LazyLoadImage
                                src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${data?.player_id}.png`}
                                alt={data?.player_name}
                                height={64}
                                width={64}
                              />
                            )}

                            <p>{data?.player_name}</p>
                          </div>
                        </td>
                        <td>
                          <a>{data?.team_short_name}</a>
                        </td>
                        <td>{data?.matches_played}</td>
                        <td>{data?.wickets}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="load_more">
            <a href="/world-cup/most-wickets/">
              <span>और पढ़े[+]</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostRunsAndWickets;
