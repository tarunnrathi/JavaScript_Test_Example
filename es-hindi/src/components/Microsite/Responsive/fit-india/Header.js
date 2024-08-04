import Head from 'next/head';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const sponsor_slider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    infinite: true,
    autoPlay: true,
    autoPlaySpeed: 2000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                dots: false,
                slidesToScroll: 1,

            },

        },
    ],
};

const Header = ({ pageSeo, sponsorData }) => {
    return(
        <>
         <Head>
                <title>{pageSeo.title}</title>
                <meta name="description" content={pageSeo.description} />
                <meta name="keywords" content={pageSeo.keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE7, IE8, IE9" />
                <meta property="fb:admins" content="503334673" />
                <meta property="fb:pages" content="31867849201" />
                <meta property="fb:page_id"
                    content="31867849201, 187957574620134, 126166140913489, 784667114916040,1075464282525405, 312128074436" />
                <meta property="og:image" content={pageSeo.image} />
                <meta property="fb:app_id" content="115930713951815" />
                <meta property="og:title" content={ pageSeo.title ? pageSeo.title : ''} />
                <meta property="og:description"
                    content={pageSeo.description ? pageSeo.description : ''} />
                <meta property="og:image"
                    content={ pageSeo.ogImage ? pageSeo.ogImage : 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png'} />
                <meta property="og:image:alt"
                    content={pageSeo.og_image_alt ? pageSeo.og_image_alt : ''} />
                <meta property="og:image:width" content="1600" />
                <meta property="og:image:height" content="900" />
                <meta property="og:locale" content="en_US" />

                <meta property="og:site_name" content="News18" />
                <meta property="og:url" content={ pageSeo.weburl ? pageSeo.weburl : ''} />

                <meta name="tweetmeme-title" content={ pageSeo.title ? pageSeo.title : ''} />
                <meta name="twitter:title" content={ pageSeo.title ? pageSeo.title : ''} />
                <meta name="twitter:description"
                    content={typeof pageSeo.description !== 'undefined' ? pageSeo.description : ''} />
                <meta name="twitter:site" content="@cnnnews18" />
                <meta name="twitter:creator" content="@cnnnews18" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url"
                    content={pageSeo.canonical ? pageSeo.canonical.replace('amp/', '') : ''} />
                <meta name="twitter:image"
                    content={ pageSeo.image ? pageSeo.image : 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png'} />
                <meta name="twitter:image:alt"
                    content={ pageSeo.og_image_alt ? pageSeo.og_image_alt : ''} />

                <meta itemProp="image"
                    content={pageSeo.itemPropImage ? pageSeo.itemPropImage : 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png'} />

                <link rel="icon" href="https://images.news18.com/static_news18/pix/ibnhome/news18/favicon.ico" />
                <link rel="preconnect" href="https://www.news18.com" />
                <link rel="preconnect" href="https://images.news18.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="dns-prefetch" href="https://prebid.nw18.com" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
                <link rel="dns-prefetch" href="https://www.google.com" />
                <link rel="dns-prefetch" href="https://static.ibnlive.in.com" />
                <link rel="dns-prefetch" href="https://ads.pubmatic.com" />
                <link rel="dns-prefetch" href="https://connect.facebook.net" />
                <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net" />
                <link rel="stylesheet" type="text/css" href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/sumsung/slick.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/css/health-hindi.css?v=26" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

            </Head>
            <div>
            <div className="sponsors-bar">
                    <div className="max-width-class">
                        <div className="partner-flex">
                            <Slider {...sponsor_slider}>
                                {
                                    sponsorData ? (sponsorData?.data['NEWS18:microsite_sponsor_1']?.data?.[0]?.videodata || []).map((item, index) => {
                                        return (
                                            <div className="associate-slide" key={index}>
                                                <p className="partner-ttl">{item.title}</p>
                                                <img src={item.thumb} className="part-logo" alt="sponsor-img"/>
                                            </div>
                                        );
                                    }) : ""
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
                <header className="health-header">
                    <div className="max-width-class">
                        <div className="header-top">
                            <div className="htop-left">
                                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/final-logo_img.jpg" alt="" className="health-logo" />
                            </div>
                            <div className="htop-right">
                                <div className="htop-inner-flex">
                                <div className="dropdown lang-select">
                                        <span>HINDI</span>
                                        <ul className="dropdown-content">
                                            <li><a className="lang-english" href="https://www.news18.com/fit-india-hit-india/">ENGLISH</a></li>
                                            <li><a className="lang-hindi" href="https://hindi.news18.com/fit-india-hit-india/">HINDI</a></li>
                                            <li><a className="lang-telugu" href="https://telugu.news18.com/fit-india-hit-india/">TELUGU</a></li>
                                            <li><a className="lang-bengali" href="https://bengali.news18.com/fit-india-hit-india/">BANGLA</a></li>
                                            <li><a className="lang-tamil" href="https://tamil.news18.com/fit-india-hit-india/">TAMIL</a></li>
                                            <li><a className="lang-lokmat" href="https://lokmat.news18.com/fit-india-hit-india/">LOKMAT</a></li>
                                            <li><a className="lang-gujarati" href="https://gujarati.news18.com/fit-india-hit-india/">GUJARATI</a></li>
                                            <li><a className="lang-kannad" href="https://kannada.news18.com/fit-india-hit-india/">KANNADA</a></li>
                                        </ul>
                                    </div>
                                    <a href="/" className="nw18-logo"><span className="back-to">Back to</span>
                                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/nw18-logo.png" className="nw-img" alt='n18-logo' /></a>
                                </div>
                            </div>
                        </div>
                        <div className="header-bottom">
                            <ul className="header-menu">
                                <li className="nav-menus"><a className="menu-links active" href="/fit-india-hit-india/">होम</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/food-nutrition/">फूड और न्यूट्रिशन</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/mental-health/">मानसिक स्वास्थ्य</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/fitness/">फिटनेस</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/diseases-treatment/">रोग और उपचार</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/pregnancy-parenting/">प्रेग्नेंसी और पैरेंटिग </a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/women-health/">महिला स्वास्थ्य</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/ayurveda/">आयुर्वेद</a></li>
                                <li className="nav-menus"><a className="menu-links" href="/fit-india-hit-india/web-stories/">वेब स्टोरीज</a></li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};
export default Header;
