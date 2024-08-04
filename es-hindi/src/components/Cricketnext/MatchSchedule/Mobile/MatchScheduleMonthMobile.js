import React from "react";

const MatchScheduleMonthMobile = ({
  tableHeaders,
  tableContent,
}) => {

  console.log('tableContent >>>>>>>>>>', tableContent);
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
          {tableContent && tableContent.length !== 0 ? (
              tableContent.map(
                (series) =>
                  series.series &&
                  series.series.length !== 0 &&
                  series.series.map((match, index) => (
                    <tr key={`${series?.seriesId}-${index}`}>
                      <td>
                        <div className="month">{series?._id}</div>
                      </td>
                      <td>
                        <span className="seriesLink">{match?.seriesname}</span>
                        <p className="date">
                          {match?.series_start} - {match?.series_end}
                        </p>
                        <ul className="matchesList">
                            <li>
                              <span>{match?.count} {match?.type}</span>
                            </li>
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
            )}
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

export default MatchScheduleMonthMobile;
