import { IPL_YEAR } from "includes/ipl.helper";
const IplHeader = ({ activeId }) => {
  let isDropDown = false;
  if(typeof activeId === 'string') isDropDown = true;
  const MenuArray = [
    {
      id: 1,
      url: "/cricket/ipl/",
      title: `आईपीएल ${IPL_YEAR}`,
      additionalClass: "series-navbtn",
    },
    {
      id: 2,
      url: "/cricket/ipl/match-schedule/",
      title: "मैच शेड्यूल",
      additionalClass: "",
    },
    {
      id: 3,
       url: "/cricket/ipl/result/",
       title: "नतीजे",
       additionalClass: "",
    },
    {
      id: 4,
      url: "/cricket/ipl/news/",
      title: "न्यूज",
      additionalClass: "",
    },
    {
      id: 5,
      url: "/cricket/ipl/photos/",
      title: "फोटो",
      additionalClass: "",
    },
    {
      id: 6,
      url: "/cricket/ipl/videos/",
      title: "वीडियो",
      additionalClass: "",
    },
    {
      id: 7,
      url: "",
      title: "टीमें",
      additionalClass: "",
      teams: [
        {
          id: "team_1",
          url: "/cricket/ipl/royal-challengers-bengaluru-rcb/",
          title: "बैंगलोर",
        },
        {
          id: "team_2",
          url: "/cricket/ipl/kolkata-knight-riders-kkr/",
          title: "कोलकाता",
        },
        {
          id: "team_3",
          url: "/cricket/ipl/punjab-kings-pbks/",
          title: "पंजाब",
        },
        {
          id: "team_4",
          url: "/cricket/ipl/delhi-capitals-dc/",
          title: "दिल्ली",
        },
        {
          id: "team_5",
          url: "/cricket/ipl/mumbai-indians-mi/",
          title: "मुंबई",
        },
        {
          id: "team_6",
          url: "/cricket/ipl/sunrisers-hyderabad-srh/",
          title: "हैदराबाद",
        },
        {
          id: "team_7",
          url: "/cricket/ipl/rajasthan-royals-rr/",
          title: "राजस्थान",
        },
        {
          id: "team_8",
          url: "/cricket/ipl/chennai-super-kings-csk/",
          title: "चेन्नई",
        },
        {
          id: "team_9",
          url: "/cricket/ipl/gujarat-titans-gt/",
          title: "गुजरात",
        },
        {
          id: "team_10",
          url: "/cricket/ipl/lucknow-super-giants-lsg/",
          title: "लखनऊ",
        },
      ],
    },
    {
      id: 8,
      url: "/cricket/ipl/points-table/",
      title: "अंक तालिका",
      additionalClass: "",
    },
    {
      id: 9,
      url: "/cricket/ipl/purple-cap-holder/",
      title: "सर्वाधिक विकेट",
      additionalClass: "",
    },
    {
      id: 10,
      url: "/cricket/ipl/orange-cap-holder/",
      title: "सर्वाधिक रन",
      additionalClass: "",
    },
    {
      id: 11,
      url: "/cricket/ipl/most-sixes/",
      title: "पावरप्ले",
      additionalClass: "",
    },
  ];
  return (
    <>
      <div className="CN-menu2-wrapper">
        <div className="CN-menu2-inner">
          <ul className="CN-menu2">
            {MenuArray.map((menu) => {
              if (menu.teams) {
                return (
                  <li key={menu.id} className="cn-dropdown">
                    <a className={isDropDown ? "active": ""}>{menu.title}</a>
                    <div className="drop-inner" style={{ width: "125px" }}>
                      <div
                        className="dropdown-sec"
                        style={{ width: "100%", overflowY: "visible" }}
                      >
                        <ul className="droplist-2">
                          {menu.teams.map((team) => (
                            <li key={team.id}>
                              <a href={team.url}>{team.title}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li
                  key={menu.id}
                  className={activeId === menu.id ? "active" : ""}
                >
                  <a href={menu.url} className={menu.additionalClass}>
                    {menu.title}
                  </a>
                </li>
              );
            })}
            {/* <li>
              <a href="/cricket/ipl/trivia/">
                {" "}
                ट्रीविया
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .CN-menu2-wrapper .CN-menu2-inner {
          margin: 0 auto;
          max-width: 1244px;
          display: flex;
          padding-top: 3px;
          padding-bottom: 3px;
        }
        .CN-menu2-wrapper ul li.active a {
          background: #e1261d;
          color: #fff !important;
        }
        .cn-dropdown a.active{
          background: #e1261d;
          color: #fff !important;
        }
        .CN-menu2-wrapper .CN-menu2 {
          display: flex;
          align-items: center;
        }
        .CN-menu2-wrapper .CN-menu2 > li {
          margin-right: 15px;
        }
        .CN-menu2-wrapper .CN-menu2 > li:last-child {
          margin-right: 0;
        }
        .CN-menu2-wrapper .CN-menu2 > li > a {
          text-transform: uppercase;
          font-family: 'Mukta',sans-serif !important;
          color: #000;
          font-size: 17px;
          display: block;
          padding: 10px;
          border-radius: 5px;
        }
        .CN-menu2-wrapper .series-navbtn {
          text-transform: uppercase;
          font-family: 'Mukta',sans-serif !important;
          padding: 6px 12px;
          display: flex;
          font-size: 13px;
          border-radius: 5px;
          margin-right: 15px;
          align-self: center;
        }
        .CN-menu2-wrapper .series-navbtn span {
          font-family: "Segoe Pro Regular", system-ui;
          text-transform: lowercase;
          padding: 0 3px;
        }
        .CN-menu2-wrapper .CN-menu2 > li.current > a {
          color: #e1261d;
          font-family: 'Mukta',sans-serif !important;
          position: relative;
        }
        .CN-menu2-wrapper .CN-menu2 > li.current > a::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261d;
          left: 0;
          bottom: 0;
        }
        .CN-menu2-wrapper {
          background: #fff;
          box-shadow: 0 6px 10px #3333334f;
          position: relative;
          z-index: 8;
        }
        .series-navbtn:hover {
            color: #000 !important;
        }
        .nav_wapper {
          box-shadow: none !important;
          height: 0px !important;
        }
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
          font-family: 'Mukta',sans-serif !important;
        }
        nav ul.nav-box > li:first-child > a {
          padding-left: 28px;
        }
        nav ul.nav-box > li > a {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          text-transform: uppercase;
          font-family: 'Mukta',sans-serif !important;
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
          max-height: 316px;
          overflow-y: auto;
        }
        .cn-dropdown {
          position: relative;
          cursor: pointer;
        }
        li.cn-dropdown:hover .drop-inner {
          width: 140px;
        }
        li.cn-dropdown a:hover, li.cn-dropdown:hover::after {
          color: #e1261d;
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
          color:  ${isDropDown ? 'white !important' : 'black'}  
        }
        .cn-dropdown .drop-inner {
          display: none;
          position: absolute;
          z-index: 100;
          background: #fff;
          width: 252px;
          padding: 5px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: 'Mukta',sans-serif !important;
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
          font-family: 'Mukta',sans-serif !important;
        }
        .cn-dropdown .drop-inner .dropdown-sec {
          max-height: 390px;
          overflow-y: auto;
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

export default IplHeader;
