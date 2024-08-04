import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Matches = ({
  url,
  title,
  ctaLabel,
  ctaLink,
  count = 5,
  matches = [],
  type
}) => {

  if (!matches.length) {
    return null;
  }

  return (
    <>
      <div className="upcomming-matches-widget">
        <h2 className="heading">{title}</h2>
        <ul>
          {matches.slice(0, count).map((match, key) => (
            <li key={key}>
              <a
                href={type == "recent" ? "#" : `${
                  publicRuntimeConfig.siteUrl
                }cricket/live-score/${(match.teama_eng || "")
                  .toLowerCase()
                  .replace(/ /gi, "-")}-vs-${(match.teamb_eng || "")
                  .toLowerCase()
                  .replace(/ /gi, "-")}-live-score-${match.matchfile}.html`}
              >
                <div className="team-matches">
                  {match.teama} vs {match.teamb},{" "}
                  {match.matchnumber} {type == "upcoming" && (match.matchtype + ", "+match.series_short_display_name)}
                </div>
                <div className="match-dates">
                  {match.matchdate_ist} <span>{match.venue}</span>
                </div>
                <div className="match-dates" style={{ color: "#FF0000" }}>
                  {type == "recent" && match.matchstatus}
                </div>
              </a>
            </li>
          ))}
          <a className="btn" href={ctaLink}>
            {ctaLabel}
          </a>
        </ul>
      </div>
      <style jsx>{`
        .upcomming-matches-widget {
          margin-bottom: 20px;
        }
        .upcomming-matches-widget .heading {
          background: #000000;
          padding: 10px 10px;
          font-size: 16px;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: bold;
          font-family: 'Mukta',sans-serif !important
        }
        .upcomming-matches-widget ul li {
          padding: 7px 10px 2px;
          border-bottom: 1px solid #d8d8d8;
          position: relative;
          background: #f5f5f5;
        }
        .upcomming-matches-widget ul li::before {
          content: "";
          width: 4px;
          height: 100%;
          background: #e1261d;
          position: absolute;
          top: 0;
          left: 0;
        }
        .upcomming-matches-widget ul li a {
          display: block;
        }
        .upcomming-matches-widget ul li .team-matches {
          font-size: 15px;
          line-height: 1.45;
          font-family: 'Mukta',serif !important;
          font-weight: bold;
          margin-bottom: 5px;
          color: #001d42;
        }
        .upcomming-matches-widget ul li .team-matches span {
          font-family: 'Karma',serif !important;
          padding: 0 3px;
        }
        .upcomming-matches-widget ul li .match-dates {
          font-size: 13px;
          font-family: 'Mukta',serif !important;
          color: #464646;
          margin-bottom: 5px;
        }
        .upcomming-matches-widget ul li .match-dates span {
          position: relative;
          padding-left: 10px;
        }
        .upcomming-matches-widget ul li .match-dates span::before {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          background: #464646;
          border-radius: 50%;
          top: 10px;
          transform: translate(0, -50%);
          left: 0;
        }
        .upcomming-matches-widget a.btn {
          text-align: center;
          background: #fff;
          padding-top: 5px;
          font-family: 'Mukta',sans-serif !important;
          font-weight: bold;
          color: #ff0000;
          font-size: 11px;
          text-transform: uppercase;
          display: block;
        }
      `}</style>
    </>
  );
};

export default Matches;
