import React from "react";
const QuickLinks = () => {
  return (
    <>
      <section className="quick-links-section">
        <div className="content-wrap">
          <h3 className="double-title big-double">
            <span className="small-title">क्विक लिंक</span>
            <span className="big-title">क्विक लिंक</span>
          </h3>
          <div className="quick-list-div">
            <ul className="quick-list clearfix">
              <li>
                <a href="/pro-kabaddi-league/pkl-point-table/" title="पॉइंट टेबल">
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="#001d42"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                  </span>
                  <span className="list-txt">पॉइंट टेबल</span>
                </a>
              </li>
              <li>
                <a href="/pro-kabaddi-league/pkl-schedule/" title="शेड्यूल">
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="#001d42"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                  </span>
                  <span className="list-txt">शेड्यूल</span>
                </a>
              </li>
              <li>
                <a href="/pro-kabaddi-league/pkl-result/" title="रिजल्ट">
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="#001d42"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                  </span>
                  <span className="list-txt">रिजल्ट</span>
                </a>
              </li>
              <li>
                <a href="/pro-kabaddi-league/pkl-news/" title="लेटेस्ट अपडेट">
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="#001d42"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                  </span>
                  <span className="list-txt">लेटेस्ट अपडेट</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <style jsx global>{`
.quick-links-section {margin: 30px 0;}
			.double-title.big-double .big-title {font-size: 46px;}
			.quick-list { margin: 20px 0;  width: 100%;}
			.quick-list li { margin: 5px 0; float: left; width: 16%;}
			.quick-list li a {font-size: 14px; font-weight: 400; color: #333; position: relative; display: flex; line-height: 19px;}
			.arrow-svg {margin: 0 5px 0 -3px;}
      `}
      </style>
    </>
  )
}

export default QuickLinks;