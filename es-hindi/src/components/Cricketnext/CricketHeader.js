const CricketHeader = ({ current = 0, isIpl, crMenu = [], isT20, pageType }) => {
  return (
    <>
      <ul className="nav-box">
        <li className={pageType == 'home' && !isIpl ? "current" : ""}>
          <a href="/cricket/">
            <span className="icon">
              <img
                src="/images/siteimages/cn-icon.svg"
                alt=""
                height="17"
                width="13"
              />
            </span>{" "}
            क्रिकेट होम
          </a>
        </li>
        <li className={current == 1 && !isIpl ? "current" : ""}>
          <a href="/cricket/match-schedule/">शेड्यूल</a>
        </li>
        <li className={current == 2 && !isIpl ? "current" : ""}>
          <a href="/cricket/live-score/">लाइव स्कोर</a>
        </li>
        <li className={current == 3 && !isIpl ? "current" : ""}>
          <a href="/cricket/result/">नतीजे</a>
        </li>
        <li className="cn-dropdown ">
          <a>
            रैंकिंग{" "}
          </a>
          <div id="rankingBtn" className="drop-inner">
            <div className="dropdown-sec">
              <ul className="droplist-2 cnTabContent RankingInternational">
                <li>
                  <a href="/cricket/test-ranking.html">
                    टेस्ट
                  </a>
                </li>
                <li>
                  <a href="/cricket/odi-ranking.html">
                    वनडे
                  </a>
                </li>
                <li>
                  <a href="/cricket/t20-ranking.html">
                    टी20
                  </a>
                </li>
              </ul>
              <ul className="droplist-2 cnTabContent RankingDomestic hide">
                <li>
                  <a href="/cricket/test-ranking.html">
                    टेस्ट
                  </a>
                </li>
                <li>
                  <a href="/cricket/odi-ranking.html">
                    वनडे
                  </a>
                </li>
                <li>
                  <a href="/cricket/t20-ranking.html">
                    टी20
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className={pageType=='news' ? "current": ''}>
          <a href="/cricket/news/">न्यूज</a>
        </li>
        <li className={pageType=='photo' ? "current": ''}>
          <a href="/cricket/photos/">फोटो</a>
        </li>
        <li className={pageType=='video' ? "current": ''}>
          <a href="/cricket/videos/">वीडियो</a>
        </li>
        <li className={`cn-dropdown ${current == 9 && !isIpl ? "current" : ""}`}>
          <a>टीमें</a>
          <div id="teamsBtn" className="drop-inner">
            <div className="dropdown-sec">
              <ul className="droplist-2 cnTabContent TeamsInternational">
                <li>
                  <a href="/cricket/teams/australia-squad-1.html">
                    ऑस्ट्रेलिया
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/bangladesh-squad-2.html">
                    बांग्लादेश
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/england-squad-3.html">
                    इंग्लैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/india-squad-4.html">
                    भारत
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/new-zealand-squad-5.html">
                    न्यूजीलैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/pakistan-squad-6.html">
                    पाकिस्तान
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/south-africa-squad-7.html">
                    दक्षिण अफ्रीका
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/sri-lanka-squad-8.html">
                    श्रीलंका
                  </a>
                </li>
                {/* <li>
                  <a href="/cricket/teams/west-indies-squad-9.html">
                    वेस्टइंडीज
                  </a>
                </li> */}
                <li>
                  <a href="/cricket/teams/netherlands-squad-15.html">
                    नीदरलैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/afghanistan-squad-1188.html">
                  अफ़ग़ानिस्तान
                  </a>
                </li>
                {/* <li>
                  <a href="/cricket/teams/zimbabwe-squad-10.html">
                    जिम्बाब्वे
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/bermuda-squad-11.html">
                    बरमूडा
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/canada-squad-12.html">
                    कनाडा
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/ireland-squad-13.html">
                    आयरलैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/kenya-squad-14.html">
                    केन्या
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/netherlands-squad-15.html">
                    नीदरलैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/scotland-squad-16.html">
                    स्कॉटलैंड
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/hong-kong-squad-19.html">
                    हॉन्गकॉन्ग
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/namibia-squad-20.html">
                    नामीबिया
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/united-arab-emirates-squad-21.html">
                    यूएई
                  </a>
                </li>
                <li>
                  <a href="/cricket/teams/usa-squad-22.html">
                    अमेरिका
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </li>
        {crMenu.map((item, key) => {
          return (
            <li className="series-btn" key={key}>
              <a href={item.link} target={item.target == 1 ? "_blank" : "_self"}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
      <style jsx global>{`
        .nav-box {
          display: flex;
        }
        nav ul.nav-box {
          line-height: 44px;
        }
        nav ul.nav-box > li {
          margin-right: 7px;
        }
        nav ul.nav-box > li {
          float: left;
          margin-right: 7px;
          position: relative;
        }
        nav ul.nav-box > li {
          float: left;
          font-weight: 700;
          font-size: 15px;
          position: relative;
        }
        nav * {
          box-sizing: border-box;
        }
        nav ul.nav-box > li.current > a {
          color: #e1261d;
        }
        nav ul.nav-box > li:first-child > a {
          padding-left: 28px;
        }
        nav ul.nav-box > li > a {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          text-transform: uppercase;
          display: block;
          padding: 0 10px;
          position: relative;
          font-weight: 700;
        }
        nav .nav-box li:hover {
          box-shadow: inset 0 -4px 0 #e1261d;
        }
        li.cn-dropdown:hover .drop-inner .dropdown-sec {
          width: 100%;
        }
        .cn-dropdown .drop-inner .dropdown-sec:last-child {
          border: 0;
        }
        .cn-dropdown .drop-inner .dropdown-sec {
          max-height: 340px;
          overflow-y: auto;
        }
        .cn-dropdown {
          position: relative;
          cursor: pointer;
        }
        li.cn-dropdown:hover .drop-inner {
          width: 140px;
        }

        li.cn-dropdown:hover .drop-inner {
          display: block;
        }
        nav ul.nav-box > li > a {
          color: #000;
        }
        // nav ul.nav-box > li.current > a > .icon {
        //   filter: grayscale(0);
        // }
        nav ul.nav-box > li > a .icon {
          // filter: grayscale(100%);
          position: absolute;
          left: 9px;
          top: 12px;
          height: 20px;
        }
        nav ul.nav-box > li.current > a::after {
          content: "";
          width: 100%;
          height: 3px;
          background: red;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        nav ul.nav-box > li > a .icon img {
          display: block;
        }
        img {
          border: none;
          max-width: 100%;
        }
        .cn-dropdown::after {
          content: "";
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 4px dashed;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          left: 50%;
          bottom: 18%;
          transform: translateX(-50%);
        }
        .cn-dropdown .drop-inner {
          display: none;
          position: absolute;
          z-index: 100;
          background: #fff;
          width: 252px;
          padding: 5px;
          box-sizing: border-box;
          font-size: 12px;
          box-shadow: 0 0 10px #00000066;
          line-height: initial;
          font-weight: 400;
        }
        .cn-dropdown .drop-inner .dropdown-sec:last-child {
          border: 0;
        }
        .cn-dropdown .drop-inner .dropdown-sec li:hover a {
          border: 1px solid #d8d8d8;
          background: #f5f5f5;
          color: #e1261d;
        }
        .cn-dropdown .drop-inner .dropdown-sec li {
          padding-left: 2px;
          box-shadow: none;
        }
        .cn-dropdown .drop-inner .dropdown-sec .droplist-2 > li > a {
          display: block;
          padding: 6px 7px;
        }
        nav ul.nav-box > li.series-btn > a {
          color: red;
        }
        .nav-box li:hover {
          box-shadow: inset 0 -4px 0 #e1261d;
        }
        .cnTabContent.hide {
          display: none;
        }
      }
      `}</style>
    </>
  );
};

export default CricketHeader;
