import React from "react";
import { MatchScheduleTabs } from "../../CricketNextUtils";

const MatchScheduleTableMobile = ({
  currentTab,
  tableHeaders,
  tableContent,
}) => {
  return (
    <>
      <table className="CN-resultTable">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTab === MatchScheduleTabs.SCHEDULE_BY_MONTH &&
            (tableContent && tableContent.length !== 0 ? (
              tableContent.map(
                (series) =>
                  series.matchData &&
                  series.matchData.length !== 0 &&
                  series.matchData.map((match, index) => (
                    <tr key={`${series?.seriesId}-${index}`}>
                      <td>
                        <div className="month">{series?.seriesStartMonth}</div>
                      </td>
                      <td>
                        <span className="seriesLink">{match?.seriesName}</span>
                        <p className="date">
                          {match?.seriesStart} - {match?.seriesEnd}
                        </p>
                        <ul className="matchesList">
                          {match?.odi > 0 && (
                            <li>
                              <span>{match?.odi} एकदिवसीय</span>
                            </li>
                          )}
                          {match?.t20 > 0 && (
                            <li>
                              <span>{match?.t20} टी-20</span>
                            </li>
                          )}
                          {match?.test > 0 && (
                            <li>
                              <span>{match?.test} टेस्ट</span>
                            </li>
                          )}
                        </ul>
                      </td>
                    </tr>
                  ))
              )
            ) : (
              <tr>
                <td></td>
                <td style={{ textAlign: "center" }}>
                  No results found matching this criteria
                </td>
              </tr>
            ))}
          {currentTab === MatchScheduleTabs.SCHEDULE_BY_DATE &&
            (tableContent && tableContent.length !== 0 ? (
              tableContent.map((match, index) => (
                <tr key={index}>
                  <td>
                    <div className="date2">{match?.myFormatDate}</div>
                    <span className="teamMatch">
                      {match?.teamA} <span>vs</span> {match?.teamB},{" "}
                      {match?.matchNumber}
                    </span>
                    <span className="seriesMatch">{match?.seriesName}</span>
                    <ul className="scheduleVenue">
                      <li>
                        <span>{match?.matchStatus}</span>
                      </li>
                      <li>
                        <span>{match?.venue}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ textAlign: "center" }}>
                No results found matching this criteria
              </tr>
            ))}
        </tbody>
      </table>
      <style jsx global>{`
        .CN-resultTable {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }

        .CN-resultTable tr th {
          background: #001d42;
          color: #fff;
          font-size: 15px;
          text-transform: uppercase;
          padding: 4px 10px;
          text-align: left;
        }

        .CN-resultTable tr th:nth-child(1) {
          width: 80px;
        }

        .CN-resultTable tbody tr {
          border-bottom: 1px solid #d8d8d8;
          background: #f5f5f5;
        }

        .CN-resultTable tr td {
          font-size: 15px;
          padding: 6px 10px;
          vertical-align: top;
        }

        .CN-resultTable tr td .date2 {
          font-size: 15px;
          color: #e1261d;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .CN-resultTable tr td .teamMatch {
          font-weight: bold;
          line-height: 1.5;
          font-size: 15px;
          color: #001d42;
          display: block;
          margin-bottom: 5px;
        }

        .seriesMatch {
          line-height: 1.5;
          font-size: 14px;
          text-decoration: none;
          display: block;
          color: #202020;
          margin-bottom: 5px;
        }

        .scheduleVenue {
          line-height: 1.5;
          font-size: 13px;
        }

        .scheduleVenue li {
          margin-bottom: 5px;
        }

        .scheduleVenue li span {
          color: #464646;
          display: block;
          position: relative;
          padding-left: 10px;
        }

        .scheduleVenue li span::before,
        .matchesList li span::before {
          position: absolute;
          content: "";
          width: 3px;
          height: 3px;
          background: #464646;
          border-radius: 50%;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
        }

        // CSS FOR MONTH SCHEDULE

        .month {
          font-weight: bold;
          line-height: 1.5;
          color: #e1261d;
          min-width: 110px;
        }

        .seriesLink {
          text-decoration: none;
          font-weight: bold;
          line-height: 1.5;
          color: #001d42;
        }
        .date {
          line-height: 1.5;
          font-size: 13px;
          color: #202020;
        }
        .matchesList li {
          display: inline-block;
          margin-right: 10px;
        }

        .matchesList li span {
          color: #e1261d;
          font-size: 12px;
          text-transform: uppercase;
          position: relative;
          padding-left: 10px;
        }
        .matchesList li span::before {
          background: #e1261d;
        }
      `}</style>
    </>
  );
};

export default MatchScheduleTableMobile;
