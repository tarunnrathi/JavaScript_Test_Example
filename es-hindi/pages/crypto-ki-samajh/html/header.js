import { React, useState } from "react";
// import getConfig from "next/config";
// import Head from "next/head";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const crypto_header = (props) => {
  // const { publicRuntimeConfig } = getConfig();
  const [isOpen, setIsOpen] = useState(false);
  const zPayWidgetData = props?.data?.zPayWidgetData || {};
  const isMobileP = props?.data?.isMobile || false;
  // const zepayMarketInfo = props.data.zepayMarketInfo || {};
  const banner = props?.banner ? props?.banner : 'show';
  // console.log({isMobileP})

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="zebpay">
        <div className="crypto_container">
          <div className="logo_zebpay">
            <div className="logo_zebpay_box">
              <a
                href={
                  zPayWidgetData && zPayWidgetData.widget_zebpay
                    ? zPayWidgetData.widget_zebpay.widget_url
                    : ""
                }
                onClick="ga('send', 'event', 'widget', 'Click', 'ZebPay')"
              >
                <span>
                  <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/zeb_logo.png" />
                </span>
                <span>
                  {zPayWidgetData && zPayWidgetData.widget_zebpay
                    ? zPayWidgetData.widget_zebpay.widget
                    : ""}
                </span>
              </a>
            </div>
            <div className="scan_code">
              <span>Scan the code to download the ZebPay APP</span>
              <i>
                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/scan-code.png" />
              </i>
            </div>
          </div>
        </div>
      </section>

      <div className="header">
        <div className="crypto_container">
          <div className="row">
            <div className="nav_icon" onClick={toggleMenu}></div>
            <nav style={{ display: isOpen ? 'block' : isMobileP ? 'none' : '' }}>
              <a href="/crypto-ki-samajh/#about">अभियान की जानकारी</a>
              <a href="/crypto-ki-samajh/#articles">आर्टिकल </a>
              <ul>
                <li>
                  {" "}
                  वेबिनार
                  <ul>
                    {/* <?php echo $webinarNumber; ?> */}
                    <li>
                      <a href="/crypto-ki-samajh/webinar/crypto-assets-and-taxation/">
                        वेबिनार 6
                      </a>
                    </li>
                    <li>
                      <a href="/crypto-ki-samajh/webinar/crypto-market-reset/">
                        वेबिनार 5
                      </a>
                    </li>
                    <li>
                      <a href="/crypto-ki-samajh/webinar/ethereum-killers/">
                        वेबिनार 4
                      </a>
                    </li>
                    <li>
                      <a href="/crypto-ki-samajh/webinar/budgetandbeyond-an-investors-perspective/">
                        वेबिनार 3
                      </a>
                    </li>
                    <li>
                      <a href="/crypto-ki-samajh/webinar/are-you-missing-out-on-this-new-trillion-dollar-industry/">
                        वेबिनार 2
                      </a>
                    </li>
                    <li>
                      <a href="/crypto-ki-samajh/webinar/journey-of-cryptocurrency-in-india-in-year-2021/">
                        वेबिनार 1
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <a href="/crypto-ki-samajh/#video">वीडियो</a>
              <a href="/crypto-ki-samajh/live-cryptocurrency-trading/">
                क्रिप्टोकरेंसी ट्रेडिंग
              </a>
              <a
                href="https://zebpay.com/in/?utm_source=news18&utm_medium=partner&utm_campaign=Cryptoin&utm_id=referral"
                target="_blank"
                onClick="ga('send', 'event', 'navigation', 'Click', 'About_ZebPay')"
              >
                अबाउट ZebPay
              </a>
            </nav>
            <span className="back_to">
              <a href="https://hindi.news18.com/">
                <em>वापस जाओ </em>
                <img src="https://hindi.news18.com/images/logos/news18-hindi-logo.svg" />
              </a>
            </span>
          </div>
        </div>
      </div>

      {banner=='show' ? <section className="banner">
        <div className="">
          <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/banner.jpg" />
        </div>
      </section> : ''}
    </>
  );
};
export default crypto_header;
