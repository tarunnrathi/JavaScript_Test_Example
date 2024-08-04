import SiteAd from "widgets/Common/Responsive/SiteAd";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import { useState } from "react";

const ProKabaddiHeader = ({ data, activeId }) => {
    const { pageAds, pointTableData } = data;
    const teams = pointTableData?.standings?.groups[0]?.teams?.team;
    const [menuClass,setMenuClass] = useState('none');
    const handleMenu = () => {
      setMenuClass(menuClass == "none" ? "block" : "none");   
    }
    const menuArray = [
        {
            id: 1,
            url: '/pro-kabaddi-league/',
            enTitle: 'Pro Kabaddi Home',
            mainTitle: 'प्रो कबड्डी होम'
        },
        {
            id: 2,
            url: '/pro-kabaddi-league/pkl-news/',
            enTitle: 'Latest Updates',
            mainTitle: 'लेटेस्ट अपडेट'
        },
        {
            id: 3,
            url: '/pro-kabaddi-league/pkl-schedule/',
            enTitle: 'Schedule',
            mainTitle: 'शेड्यूल'
        },
        {
            id: 4,
            url: '/pro-kabaddi-league/pkl-result/',
            enTitle: 'Results',
            mainTitle: 'रिजल्ट'
        },
        {
            id: 5,
            url: '/pro-kabaddi-league/pkl-point-table/',
            enTitle: 'Standings',
            mainTitle: 'पॉइंट टेबल'
        },
    ];
    
    return (
        <>
            <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2" />
            <header className="pro-header">
                <div className="content-wrap header-content">
                    <div className="logo-section">
                        <div className="news-logo">
                            <a href="https://hindi.news18.com/" title="News18 Hindi Logo">
                                <img
                                    src="/images/siteimages/News18_Hindi_logo_1631086645.svg"
                                    title="News18 Hindi Logo"
                                    alt="News18 Hindi Logo"
                                />
                            </a>
                        </div>
                        <div className="pro-logo">
                            <a
                                href="https://hindi.news18.com/pro-kabaddi-league/"
                                title="Pro Kabaddi League Logo"
                            >
                                <img
                                    src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/pro-logo.png"
                                    title="Pro Kabaddi League Logo"
                                    alt="Pro Kabaddi League Logo"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="carousel-section">
                        <div className="ad-block placeholder">
                            <SiteAd
                                slotId="Desktop_Static_Header_Ad_728x90"
                                adUnit={pageAds.ATF_728_id}
                                sizes={[[728, 90]]}
                                width={728}
                                height={90}
                                removeAdSpan={true}
                                lazyload={false}
                            />
                        </div>
                        <div className="match-slider-div">
                            <ul className="match-slider slick-initialized slick-slider slick-dotted">
                                <div className="slick-list draggable">
                                    <div
                                        className="slick-track"
                                        style={{
                                            opacity: 1,
                                            width: 571,
                                            transform: "translate3d(0px, 0px, 0px)",
                                        }}
                                    >
                                        <li
                                            className="slick-slide slick-current slick-active"
                                            data-slick-index={0}
                                            aria-hidden="false"
                                            tabIndex={0}
                                            role="tabpanel"
                                            id="slick-slide00"
                                            aria-describedby="slick-slide-control00"
                                            style={{ width: 551 }}
                                        >
                                            <a
                                                href="https://hindi.news18.com/pro-kabaddi-league/telugu-titans-vs-tamil-thalaivas-live-score-match-centre-2701/"
                                                tabIndex={0}
                                            >
                                                <div className="slider-match-details">
                                                    <span className="live-txt">Match Concluded</span>|
                                                    <span className="live-match">Match 2</span>|
                                                    <span className="live-location">
                                                        Sheraton Grand, Whitefield, Bengaluru
                                                    </span>
                                                    |<span className="live-time">20:30 (IST)</span>
                                                </div>
                                                <div className="match-team-details">
                                                    <div className="match-team-name">
                                                        <div className="team-img">
                                                            <img
                                                                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/telugu-titans.png"
                                                                alt="Telugu Titans"
                                                                title="Telugu Titans"
                                                            />
                                                        </div>
                                                        <h3 className="match-name-txt">तेलुगू टाइटंस</h3>
                                                    </div>
                                                    <div className="match-team-score team-a-score">
                                                        <h5 className="score-div ">40</h5>
                                                    </div>
                                                    <div className="match-vs">
                                                        <img
                                                            src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/vs-img.png"
                                                            alt=""
                                                            title=""
                                                        />
                                                        <div className="top-player-hold">
                                                            <span className="rank-option">
                                                                Match Completed
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="match-team-score team-b-score">
                                                        <h5 className="score-div ">40</h5>
                                                    </div>
                                                    <div className="match-team-name">
                                                        <div className="team-img">
                                                            <img
                                                                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/tamil-thalaivas.png"
                                                                alt="Tamil Thalaivas"
                                                                title="Tamil Thalaivas"
                                                            />
                                                        </div>
                                                        <h3 className="match-name-txt">तमिल थलाइवाज</h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </div>
                                </div>
                                <ul className="slick-dots" role="tablist">
                                    <li className="slick-active" role="presentation">
                                        <button
                                            type="button"
                                            role="tab"
                                            id="slick-slide-control00"
                                            aria-controls="slick-slide00"
                                            aria-label="1 of 1"
                                            tabIndex={0}
                                            aria-selected="true"
                                        >
                                            1
                                        </button>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div className="menu-wrapper">
                <section className="menu-section content-wrap">
                    <div className="h-left-menu">
                        <div className="h-extra-menu">
                            <div className="pancake-div">
                                <a onClick={()=>handleMenu()} title="" className="menu-tag">
                                    <span className="menu-pancake"></span>
                                </a>
                            </div>
                        </div>
                        <ul className="menu-list">
                            {menuArray.map((item, index) =>
                                <li key={index} className={activeId === item.id && "active"}>
                                    <a
                                        href={item.url}
                                        title={item.enTitle}
                                    >
                                        {item.mainTitle}
                                    </a>
                                </li>
                            )}


                            <li className={`dropdown-menu ${activeId == 6 && "active" } `}>
                                <a href="" title="Team">
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
                                <ul className="submenu">
                                    {teams.map((team, i) => {
                                        const teamSlug = team.team_name
                                            .replace(/ /g, "-")
                                            .replace(/\./g, "")
                                            .toLowerCase();
                                        return (
                                            <li key={i}>
                                                <a href={`/pro-kabaddi-league/${teamSlug}-${team.team_id}/`}>
                                                    {teamTranslationArr[teamSlug]}
                                                </a>
                                            </li>
                                        )
                                    })}


                                </ul>
                            </li>
                            {/*<li >
					   <a href="https://hindi.news18.com/pro-kabaddi-league/pkl-gallery/" title="Gallery">गैलरी</a>
					   </li>*/}
                        </ul>
                        <div className="pancake-menu">
                            <ul className="pancake-list">
                                <li>
                                    <a
                                        href="https://hindi.news18.com/pro-kabaddi-league/"
                                        title="Pro Kabaddi Home"
                                    >
                                        प्रो कबड्डी होम
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://hindi.news18.com/pro-kabaddi-league/pkl-news/"
                                        title="Latest Updates"
                                    >
                                        लेटेस्ट अपडेट
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://hindi.news18.com/pro-kabaddi-league/pkl-schedule/"
                                        title="Schedule"
                                    >
                                        शेड्यूल
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://hindi.news18.com/pro-kabaddi-league/pkl-result/"
                                        title="Results"
                                    >
                                        रिजल्ट
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://hindi.news18.com/pro-kabaddi-league/pkl-point-table/"
                                        title="Standings"
                                    >
                                        पॉइंट टेबल
                                    </a>
                                </li>
                                {/*<li>
						  <a href="https://hindi.news18.com/pro-kabaddi-league/pkl-gallery/" title="Gallery" >गैलरी</a>
						  </li>*/}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx global>
                {`
                body{line-height:1;}
                body .pro-header, body .pro-main-wrapper, body .content-wrap {
                    font-family: "Mukta",sans-serif!important;
                }
                .content-wrap {
                    max-width: 1240px;
                    margin: 0 auto;
                }
       .pro-header{width:100%;background:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/header-bg.jpg) 0 -32px no-repeat;max-height:265px}
       .header-content{display:flex;justify-content:space-between}
       .logo-section{display:flex;flex-direction:column}
       .news-logo{position:relative;top:15px; margin-left: 95px; z-index: 3}
       .pro-logo{position:relative;top:-47px;max-height:210px;z-index:2}
       .pro-logo img{height: 242px}
       
       .placeholder{width:100%; height:90px;background-color:#ccc;margin: 5px 0 10px 0;}
       
       .match-slider-div{max-width:713px;background:#ff2759;padding:20px 0 0 15px;border-radius:20px 20px 0 20px}
       .match-slider-div .slick-track{padding: 5px 0 0 0}
       .match-slider .slick-arrow.slick-prev, .match-slider .slick-arrow.slick-next{padding: 0px;}
       .slider-match-details{text-align:center;font-size:12px;text-transform:uppercase;color:#9e9e9d}
       .slider-match-details span{display:inline-block;margin:0 10px}
       .slider-match-details .live-txt{color:#ed1c24;font-weight:700}
       .match-slider li{background:#fff;padding:5px 10px 0;border-radius:20px 0 0; width: 100% !important;}
       .match-slider .slick-dots{width:40%;display:flex;position:absolute;top:-20px;right:0;left:0;padding:0;margin:0 auto;list-style:none;text-align:center;justify-content:center}
       .match-slider .slick-dots li{background:0 0;border-radius:50%;padding:0;margin:0 5px}
       .match-slider .slick-dots li button{text-indent:-999999px;background:#8d0a28;border:none;border-radius:50%;padding:0;height:7px; width: 7px}
       .match-slider .slick-dots li.slick-active button{background:#fff}
       .match-slider .slick-arrow{position:absolute;font-family: "Mukta",sans-serif;top:-18px;color:#fff;background:0 0;font-size:13px;border:none;outline:0;cursor:pointer;text-transform:uppercase}
       .match-slider .slick-arrow svg{position: relative; top:1px;}
       .match-slider .slick-arrow.slick-prev{left:20px}
       .match-slider .slick-arrow.slick-next{right:20px}
       .match-team-name{text-align:center}
       .match-name-txt,.match-name-txt a{font-size:16px;text-transform:uppercase;font-weight:700;color:#000;margin:5px 0}
       .top-player-score,.top-player-score a{color:#878787;font-size:13px;}
       .team-img{text-align:center}
       .team-img img{width:30%;display:inline !important}
       .match-team-score .score-div{font-size:55px;color:#001d42;width:70px; height: 70px; line-height: 70px; text-align: center; background:#f3f3f3;border:1px solid #ccd2d9;border-radius:50%; font-weight: bold; margin: 5px 0}
       .match-team-score .score-div.redcircle{background: #E1261D; border: 1px solid #E1261D; box-shadow: 0px 0px 5px #e1261e;color: #fff;}
       .match-vs{text-align:center;position:relative}
       .match-vs img{display:inline !important}
       .match-vs .top-player-hold{padding:5px 10px}
       .match-vs .top-player-hold:after{content:"";width:20px;height:1px;background:#ccd2d9;display:inline-block;position:absolute;right:-20px;top:50%}
       
       .match-widget-section{margin:20px 0; width: 100%; float: left; clear: both;}
       .match-widget-section .view-all-div{margin:0 auto; padding-bottom: 0}
       .match-team-details {display: flex;align-items: center;justify-content: space-around;margin: 5px 0;min-height: 98px;}
       
       .slick-slider{position:relative;display:block;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;-ms-touch-action:pan-y;touch-action:pan-y;-webkit-tap-highlight-color:transparent}
       .slick-list{position:relative;display:block;overflow:hidden;margin:0;padding:0}
       .slick-list:focus{outline:0}
       .slick-list.dragging{cursor:pointer;cursor:hand}
       .slick-slider .slick-list,.slick-slider .slick-track{-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}
       .slick-track{position:relative;top:0;left:0;display:block;margin-left:auto;margin-right:auto;padding:10px 0}
       .slick-track:after,.slick-track:before{display:table;content:""}
       .slick-track:after{clear:both}
       .slick-loading .slick-track{visibility:hidden}
       
       [dir="rtl"] .slick-slide{float:right}
       .slick-slide img{display:block}
       .slick-slide.slick-loading img{display:none}
       .slick-slide.dragging img{pointer-events:none}
       .slick-initialized .slick-slide{display:block}
       .slick-loading .slick-slide{visibility:hidden}
       .slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent}
       .slick-arrow.slick-hidden{display:none}
       .menu-wrapper{background:#57005d !important;padding:0;position:sticky;z-index: 9;;top:0; width: 100%; height: 46px;    box-shadow: 2px 2px 18px rgb(0 0 0 / 40%);
			border-bottom: 1px solid #fff;}
		.menu-list{display:flex;padding:0 10px;}
		.menu-list li{position:relative; height: 36px;}
		.menu-list li.active:after{ content: ""; position: absolute; height: 3px; background:#ff2759; left: 0; right: 0; bottom: 0;}
		.menu-list li.dropdown-menu{margin-right:10px}
		.menu-list li a{font-size:18px;color:#fff;margin:6px 15px 0;display:inline-block;text-transform:uppercase;white-space:nowrap}
		.menu-list li a svg{position:absolute;top:3px;width:20px;filter:brightness(0) invert(1);right:-5px}
		.submenu{top:36px!important; padding: 10px 0 0 0!important;}
		.submenu li a{font-size: 14px}
		.pancake-div{margin:10px 0 0}
		.pancake-div a{position:relative;float:left;cursor:pointer}
		.menu-pancake{top:5px}
		.menu-pancake::before{bottom:-8px}
		.menu-pancake,.menu-pancake::before{content:"";height:2px;width:25px;background:#fff;display:inline-block;transition:all 0.2s ease-in-out;position:relative;margin:0 0 2px}
		.menu-pancake::after{content:"";height:2px;width:25px;background:#fff;display:inline-block;transition:all 0.2s ease-in-out;position:relative;top:-18px}
		.menu-pancake.cross::before{transform:rotate(90deg);top:0;box-shadow:none;transition:all 0.2s ease-in-out;position:absolute}
		.menu-pancake.cross{transform:rotate(-45deg);box-shadow:none;transition:all 0.2s ease-in-out}
		.menu-pancake.cross::after{display:none}
		.menu-section{display:flex;align-items:center;justify-content:space-between;padding:0 10px}
		.search-input-div{display:none;position:absolute;right:0;background:#57005d;padding:10px;border-radius:0 0 5px 5px}
		.search-input-div.show{display:block}
		.search-bar{position:relative}
		.pancake-menu{position:absolute;top:46px;width:200px;background:#57005d;box-shadow:0 2px 10px rgba(0, 0, 0, 0.3);z-index:99;display:${menuClass}}
		.pancake-list li{border-bottom:1px solid #CA9ACE}
		.pancake-list li a{font-size:16px;color:#fff;padding:15px 10px;display:inline-block;letter-spacing:0.4px;text-transform:uppercase;width:90%}
		.pancake-list li:last-child{border-bottom:none}		
		.submenu {display: none;padding: 0;	margin: 0;position: absolute;top: 45px;	left: 0;background: #011d42;flex-direction: column;	overflow: hidden; transition: all 500ms ease;box-shadow: 0 0 10px 5px rgb(0 0 0 / 30%);}		
		.menu-list li:hover .submenu{ display: block;transition: all 500ms ease;}
        @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
	@font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
	@font-face {font-family: 'Mukta';font-style: normal;font-weight: 400;src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
	@font-face {font-family: 'Mukta';font-style: normal;font-weight: 700;src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
    .top-player-hold {
        background: #eee;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1px solid #ccd2d9;
        position: relative;
    }
    .top-player-hold:before {
      content: "";
      width: 20px;
      height: 1px;
      background: #ccd2d9;
      display: inline-block;
      position: absolute;
      left: -20px;
      top: 50%;
  }
  .top-player-hold .rank-option {
    color: #333;
    font-weight: 400;
    font-size: 14px;
}

       `}
            </style>
        </>
    );
};

export default ProKabaddiHeader;
