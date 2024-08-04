import React from "react";

const MatchScheduleTableDate = ({ tableHeaders, tableContent }) => {
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
                series.match &&
                  series.match.length !== 0 &&
                  series.match.map((match, index) => (
                <tr key={series?._id+index}>
                  <td>{series?.name}</td>
                  <td>
                    <ul className="schedule-match">
                      <li>
                        <strong>
                          {match?.teama} <span>vs</span> {match?.teamb},{" "}
                          {match?.matchnumber}
                        </strong>
                      </li>
                      <li>
                        <span>{match?.seriesname}</span>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul className="schedule-venue">
                      <li>
                        <span>{match?.matchstatus}</span>
                      </li>
                      <li>
                        <span>{match?.venue}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
              )
            ) : (
              <p style={{ textAlign: "center" }}>
                No results found matching this criteria
              </p>
            )}
        </tbody>
      </table>
      <style jsx global>{`
        .CN-resultTable {
          width: 100%;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        .CN-resultTable tr th:first-child,
        .CN-resultTable tr td:first-child {
          padding-left: 20px;
          font-weight: bold;
        }

        .CN-resultTable tr th {
          background: #001d42;
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          padding: 10px 0;
          text-align: left;
          padding-right: 10px;
        }
        .CN-resultTable tr th:nth-child(3) {
          width: 135px;
        }
        .CN-resultTable tr th:last-child,
        .CN-schedule-main .CN-resultTable tr td:last-child {
          padding-right: 20px;
        }
        .CN-resultTable tbody tr {
          border-bottom: 1px solid #d8d8d8;
          background: #f5f5f5;
        }

        .CN-resultTable tr td {
          padding-right: 10px;
          font-size: 15px;
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .CN-resultTable tr td:nth-child(1) {
          color: #e1261d;
        }
        .CN-resultTable tr td:nth-child(3) {
          color: #202020;
        }
        .CN-resultTable tr th:last-child,
        .CN-schedule-main .CN-resultTable tr td:last-child {
          padding-right: 20px;
        }

        .schedule-match li {
          margin-bottom: 4px;
        }

        .schedule-match li strong {
          color: #001d42;
          font-weight: bold;
        }

        .CN-resultTable tr td .schedule-venue {
          font-size: 15px;
          line-height: 1.45;
          min-width: 265px;
        }

        .CN-resultTable tr td .schedule-venue li {
          margin-bottom: 10px;
        }
        .CN-resultTable tr td .schedule-venue li:last-child {
          margin-bottom: 0;
        }

        .CN-resultTable tr td .schedule-venue li span {
          color: #464646;
          display: block;
          position: relative;
          padding-left: 10px;
        }

        .CN-resultTable tr td .schedule-venue li span::before,
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

        .seriesText {
          font-weight: bold;
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

export default MatchScheduleTableDate;
