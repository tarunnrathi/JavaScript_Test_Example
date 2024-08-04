import React, { useState } from "react";

const RotateWidget = () => {
    const [isHidden, setIsHidden] = useState(false);
    const handleClick = () => {
        setIsHidden(true);
        // Perform additional actions or execute scripts here
      };

  return (
    !isHidden && (
        <div className="rotatebox">
          <div className="cubewrap">
            <div className="closebutton" onClick={handleClick}></div>
            <div className="cube">
              <div className="front">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="back">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="top">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="bottom">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="left">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="right">
                <a
                  href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                  target="_blank"
                  onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                >
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default RotateWidget;
