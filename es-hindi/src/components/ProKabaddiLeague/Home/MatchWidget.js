import LazyLoadImage from "components/Common/CustomImage";
import SITE_CONfIG from "config/site.config";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import React from "react";

const MatchWidget = (props) => {
  const { matches } = props;
  const widgetMatches = matches?.filter(data => data.matchnumber == "Match 4" || data.matchnumber == "Match 5");
  const resultMatches = matches?.slice(matches.length - 3, matches.length).reverse();

  return (
    <>
      <div className="match-widget-section">
        <h3 className="double-title">
          <span className="small-title">मैच</span>
          <span className="big-title">मैच</span>
        </h3>
        <div className="tags-tab-container ">
          <input
            id="tab1"
            type="radio"
            name="tabs"
            className="tabs-cell"
            defaultChecked="checked"
          />
          <label htmlFor="tab1" className="tabs-label">
            शेड्यूल
          </label>
          <input id="tab2" type="radio" className="tabs-cell" name="tabs" />
          <label htmlFor="tab2" className="tabs-label">
            रिजल्ट
          </label>
          <section className="tabs-section" id="content1">
            <ul className="schedule-list">
              {widgetMatches?.map((mItem, mindex) => {
                const teamAslug = mItem.teama
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                const teamBslug = mItem.teamb
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                return (
                  <li key={mItem?.matchnumber}>
                    <div className="match-details-txt">
                      <span className="match-name">{mItem.matchnumber}</span>|
                      <span className="match-date">{new Date(mItem.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(mItem.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(mItem.matchdate_local).toLocaleString('en-us', { month: 'long' })}</span>|
                      <span className="match-time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                        </svg>
                        {mItem.matchtime_local} (IST)
                      </span>
                    </div>
                    <div className="match-team-details">
                      <div className="team-logo">
                        <a href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`} title={mItem.teama}>
                          <LazyLoadImage
                            width={69}
                            height={49}
                            src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                            alt={mItem.teama}
                            title={mItem.teama}
                          />
                        </a>
                        <div className="team-name">
                          <a href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`} title={mItem.teama}>
                            {teamTranslationArr[teamAslug]}
                          </a>
                        </div>
                      </div>
                      <div className="vs-logo">
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`}
                          title="vs"
                          alt="vs"
                        />
                      </div>
                      <div className="team-logo">
                        <a href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`} title={mItem.teamb}>
                          <LazyLoadImage
                            width={69}
                            height={49}
                            src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                            alt={mItem.teamb}
                            title={mItem.teamb}
                          />
                        </a>
                        <div className="team-name">
                          <a href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`} title={mItem.teamb}>
                            {teamTranslationArr[teamBslug]}
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="view-all-div">
              <a
                href="/pro-kabaddi-league/pkl-schedule/"
                title="View Complete Schedule"
              >
                पूरा देखें शेड्यूल
              </a>
            </div>
          </section>
          <section className="tabs-section" id="content2">
            <ul className="schedule-list results-page-list">
              {resultMatches?.map((item, index) => {
                const teamAslug = item.teama
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                const teamBslug = item.teamb
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                return (
                  <li key={index}>
                    <div className="match-details-txt">
                      <span className="match-name">{item.matchnumber}</span>|
                      <span className="match-date">{new Date(item.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.matchdate_local).toLocaleString('en-us', { month: 'long' })}</span>|
                      <span className="match-time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                        </svg>
                        {item.matchtime_local} (IST)
                      </span>
                    </div>
                    <div className="match-team-details">
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}-${item.teama_id}/`}
                          title={item.teama}
                        >
                          <LazyLoadImage
                            width={69}
                            height={49}
                            src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                            alt={item.teama}
                            title={item.teama}
                          />
                        </a>
                        <div className={`team-name ${item.teama_score > item.teamb_score && "won-team"}`}>
                          <a
                            href={`/pro-kabaddi-league/${teamAslug}-${item.teama_id}/`}
                            title={item.teama}
                          >
                            {teamTranslationArr[teamAslug]}
                          </a>
                        </div>
                        <div className={`score-txt ${item.teama_score > item.teamb_score && "won-team"}`}>
                          <h5 className="score-val">{item.teama_score}</h5>
                        </div>
                      </div>
                      <div className="vs-logo">
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`}
                          title="vs"
                          alt="vs"
                        />
                      </div>
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}-${item.teamb_id}/`}
                          title={item.teama}
                        >
                          
                          <LazyLoadImage
                            width={69}
                            height={49}
                            src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                            alt={item.teamb}
                            title={item.teamb}
                          />
                        </a>
                        <div className={`team-name ${item.teamb_score > item.teama_score && "won-team"}`}>
                          <a
                            href={`/pro-kabaddi-league/${teamBslug}-${item.teamb_id}/`}
                            title={item.teamb}
                          >
                            {teamTranslationArr[teamBslug]}
                          </a>
                        </div>
                        <div className={`score-txt ${item.teamb_score > item.teama_score && "won-team"}`}>
                          <h5 className="score-val">{item.teamb_score}</h5>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="view-all-div">
              <a
                href="/pro-kabaddi-league/pkl-result/"
                title="View Complete Result"
              >
                पूरा देखें रिजल्ट
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
export default MatchWidget;