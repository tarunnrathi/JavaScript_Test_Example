import { teamTranslationArr } from "includes/proKabaddi.helper";
import { useState } from "react";

const ProKabaddiHeader = ({ activeId, data }) => {
  const { pointTableData } = data;
  const { team } = pointTableData?.standings?.groups[0]?.teams;
  const [showTeams, setShowTeams] = useState(false);
  const [menuClass, setMenuClass] = useState(null);
  const [showMenu, setShowMenu] = useState("hide");
  const openOrcloseDropdown = () => {
    setShowTeams(showTeams ? false : true);
  };
  const handlePancakeMenu = () => {
    setMenuClass(menuClass == null ? "change" : null);
    setShowMenu(showMenu == "hide" ? "show" : "hide");
  };

  const menuArray = [
    {
      id: 1,
      url: "/pro-kabaddi-league/",
      enTitle: "Pro Kabaddi Home",
      mainTitle: "प्रो कबड्डी होम",
    },
    {
      id: 2,
      url: "/pro-kabaddi-league/pkl-news/",
      enTitle: "Latest Updates",
      mainTitle: "लेटेस्ट अपडेट",
    },
    {
      id: 3,
      url: "/pro-kabaddi-league/pkl-schedule/",
      enTitle: "Schedule",
      mainTitle: "शेड्यूल",
    },
    {
      id: 4,
      url: "/pro-kabaddi-league/pkl-result/",
      enTitle: "Results",
      mainTitle: "रिजल्ट",
    },
    {
      id: 5,
      url: "/pro-kabaddi-league/pkl-point-table/",
      enTitle: "Standings",
      mainTitle: "पॉइंट टेबल",
    },
  ];
  return (
    <>
      <header>
        <div className="wrapper">
          <div className="logo">
            <a href="https://hindi.news18.com/">
              <img
                src="/images/siteimages/News18_Hindi_logo_1631086645.svg"
                alt=""
                className="network18logo"
              />
            </a>
            <a href="https://hindi.news18.com/pro-kabaddi-league/">
              <img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/pro_kabaddi_logo_m.png"
                alt=""
                className="prokabaddi_logo"
              />
            </a>
            <div className="search-block">
              <a
                href="https://www.facebook.com/sharer.php?u=https://hindi.news18.com/pro-kabaddi-league/"
                title="share"
              >
                <img
                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/image-pro-kabaddi-2019/mobile/pro-kabaddi-2019/facebook2.png"
                  alt=""
                />
              </a>
              <a href="https://twitter.com/intent/tweet?text=https://hindi.news18.com/pro-kabaddi-league/">
                <img
                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/image-pro-kabaddi-2019/mobile/pro-kabaddi-2019/twitter2.png"
                  alt=""
                />
              </a>
              <a href="whatsapp://send?text=https://hindi.news18.com/pro-kabaddi-league/">
                <img
                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/image-pro-kabaddi-2019/mobile/pro-kabaddi-2019/whatsapp2.png"
                  alt=""
                />
              </a>
            </div>
            <div
              className={`menu_icon ${menuClass}`}
              onClick={() => handlePancakeMenu()}
            >
              <div className="bar1" />
              <div className="bar2" />
              <div className="bar3" />
            </div>
          </div>
        </div>
      </header>
      <nav>
        <div className="wrapper">
          <ul id="main-menu">
            {menuArray.map((item, index) => (
              <li key={index} className={activeId === item.id && "active"}>
                <a href={item.url} title={item.enTitle}>
                  {item.mainTitle}
                </a>
              </li>
            ))}
            <li className="dropdown" onClick={() => openOrcloseDropdown()}>
              <a title="टीम">
                टीम
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
              </a>
            </li>
          </ul>
          <ul className={`submenu ${showTeams ? "show" : "hide"}`}>
            {team.map((teamItem, i) => {
              const teamSlug = teamItem.team_name
                .replace(/ /g, "-")
                .replace(/\./g, "")
                .toLowerCase();
              return (
                <li key={i}>
                  <a
                    href={`/pro-kabaddi-league/${teamSlug}-${teamItem.team_id}/`}
                  >
                    {teamTranslationArr[teamSlug]}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className={`pancake-menu ${showMenu}`}>
            <ul className="pancake-list">
              <li>
                <a
                  href="https://hindi.news18.com/pro-kabaddi-league/"
                  title="प्रो कबड्डी होम"
                >
                  प्रो कबड्डी होम
                </a>
              </li>
              <li>
                <a
                  href="https://hindi.news18.com/pro-kabaddi-league/pkl-news/"
                  title="लेटेस्ट अपडेट"
                >
                  लेटेस्ट अपडेट
                </a>
              </li>
              <li>
                <a
                  href="https://hindi.news18.com/pro-kabaddi-league/pkl-schedule/"
                  title="शेड्यूल"
                >
                  शेड्यूल
                </a>
              </li>
              <li>
                <a
                  href="https://hindi.news18.com/pro-kabaddi-league/pkl-result/"
                  title="रिजल्ट"
                >
                  रिजल्ट
                </a>
              </li>
              <li>
                <a
                  href="https://hindi.news18.com/pro-kabaddi-league/pkl-point-table/"
                  title="अंकतालिका"
                >
                  पॉइंट टेबल
                </a>
              </li>
              {/*<li>
					   <a href="https://hindi.news18.com/pro-kabaddi-league/pkl-gallery/" title="गैलरी">गैलरी</a>
					   </li>*/}
            </ul>
          </div>
        </div>
      </nav>

      <style jsx global>
        {`
          body .pro-header,
          body .pro-main-wrapper,
          body .content-wrap {
            font-family: "Mukta", sans-serif !important;
          }
          figure,
          footer,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          nav,
          ol,
          p,
          ul {
            margin: 0;
            padding: 0;
          }
          li,
          ul {
            list-style: none;
          }
          ol,
          ul {
            list-style: none;
          }
          a,
          article,
          aside,
          b,
          blockquote,
          body,
          canvas,
          caption,
          div,
          fieldset,
          figcaption,
          figure,
          footer,
          form,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          header,
          hgroup,
          html,
          i,
          iframe,
          img,
          label,
          legend,
          li,
          nav,
          ol,
          p,
          pre,
          section,
          span,
          strong,
          sub,
          sup,
          table,
          tbody,
          td,
          tfoot,
          th,
          thead,
          tr,
          u,
          ul {
            margin: 0;
            padding: 0;
            border: 0;
            font: "Mukta", sans-serif;
            vertical-align: baseline;
          }
          a {
            text-decoration: none;
            color: #111;
          }
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            display: block;
          }

          .wrapper {
            margin: 0px auto;
          }

          .wrapper {
            margin-bottom: 60px;
          }
          .wrapper {
            margin: 0 auto;
            position: relative;
            padding: 0 10px;
            box-sizing: border-box;
          }
          header {
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/image-pro-kabaddi-2019/mobile/pro-kabaddi-2019/mobile_header_bg.jpg)
              no-repeat;
            height: 85px;
            background-position: center center;
            background-size: cover;
          }
          body header {
            padding: 0 16px !important;
          }
          header .wrapper {
            padding: 0 !important;
          }
          .logo {
            display: flex;
            justify-content: space-between;
          }
          .network18logo {
            width: 90px;
            float: left;
            margin-top: 10px;
          }
          .prokabaddi_logo {
            width: 225px;
            height: 85px;
            position: relative;
            left: -10px;
          }
          .search-block {
            width: 20px;
            float: right;
          }
          .search-block img {
            margin: 7px 10px 0px 0px;
          }
          .menu_icon {
            cursor: pointer;
            position: absolute;
            bottom: 6px;
          }
          .bar1,
          .bar2,
          .bar3 {
            width: 25px;
            height: 2px;
            background-color: #fff;
            margin: 5px 0;
            transition: 0.4s;
          }
          .change .bar1 {
            -webkit-transform: rotate(-45deg) translate(-5px, 5px);
            transform: rotate(-45deg) translate(-5px, 5px);
          }
          .change .bar2 {
            opacity: 0;
          }
          .change .bar3 {
            -webkit-transform: rotate(45deg) translate(-5px, -5px);
            transform: rotate(45deg) translate(-5px, -5px);
          }
          nav {
            background: #57005d;
            box-shadow: 2px 2px 5px rgb(0 0 0 / 40%);
            max-height: 42px;
            height: 42px;
            position: sticky;
            top: 0;
          }
          nav {
            z-index: 9999999;
          }
          nav .wrapper {
            padding-right: 0px;
          }
          nav ul {
            display: block;
            overflow-x: scroll;
            white-space: nowrap;
          }
          nav ul li {
            color: #fff;
            font-size: 15px;
            text-transform: uppercase;
            padding: 13px 9px 7px;
            border-bottom: 4px solid #57005d;
            margin-bottom: 1px;
            position: relative;
            display: inline-block;
            line-height: 1.67;
          }
          nav ul li.active {
            border-bottom: 4px solid #ff2759;
          }
          nav ul li a {
            color: #fff;
          }
          nav ul li a svg {
            fill: white;
            width: 13px;
            height: 13px;
          }
          .hide {
            display: none !important;
          }
          .submenu {
            padding: 0;
            margin: 0;
            position: absolute;
            top: 40px;
            left: 172px;
            background: #011d42;
            flex-direction: column;
            overflow: hidden;
            -webkit-transition: all 500ms ease;
            -moz-transition: all 500ms ease;
            -ms-transition: all 500ms ease;
            -o-transition: all 500ms ease;
            transition: all 500ms ease;
            -webkit-box-shadow: 0 0 10px 5px rgb(0 0 0 / 30%);
            box-shadow: 0 0 10px 5px rgb(0 0 0 / 30%);
            z-index: 999;
            width: 200px;
            height: 287px;
            overflow-y: scroll;
          }
          .submenu li {
            list-style: none;
            border-bottom: #3e526b solid 1px;
            display: block;
            padding: 14px 9px;
          }
          .submenu li a {
            display: block;
            color: white;
            text-transform: capitalize;
            font-size: 15px;
            margin: 0;
            font-weight: 400;
            border: none;
            -webkit-transition: all 500ms ease;
            -moz-transition: all 500ms ease;
            -ms-transition: all 500ms ease;
            -o-transition: all 500ms ease;
            transition: all 500ms ease;
          }
          .pancake-menu {
            position: absolute;
            top: 0px;
            width: 100%;
            background: #57005d;
            box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
            z-index: 99;
            left: 0;
          }
          .pancake-menu ul {
            display: block;
          }
          .pancake-list li {
            border-bottom: 1px solid #ca9ace;
            display: block;
          }
          nav div.pancake-menu ul.pancake-list li {
            padding: 15px 10px;
          }
          .pancake-list li a {
            font-size: 14px;
            color: #fff;
            padding: 0px 0 0 6px;
            display: inline-block;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            width: 90%;
          }
          .wrapper {
            margin: 0px auto;
          }

          .wrapper {
            margin-bottom: 60px;
          }
          .wrapper {
            margin: 0 auto;
            position: relative;
            padding: 0 10px;
            box-sizing: border-box;
          }
          nav ul::-webkit-scrollbar {
            width: 0;
            background: 0 0;
          }
          .bredcrum {
            padding-bottom: 4px;
            text-transform: uppercase;
            justify-content: space-between;
            margin-top: 10px;
            border-bottom: 1px dotted #939393;
            margin-bottom: 10px;
            height: 25px;
            overflow: scroll;
          }
          .bredcrum .bredcrum-txt {
            font-size: 14px;
            line-height: 22px;
            display: flex;
          }
          .bredcrum .bredcrum-txt a {
            color: #969696;
            flex-shrink: 0;
          }
          .bredcrum .bredcrum-txt .pagetitle {
            color: #001d42;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

export default ProKabaddiHeader;
