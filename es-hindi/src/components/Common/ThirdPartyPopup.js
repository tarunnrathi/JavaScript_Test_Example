import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ThirdPartyPopup = ({ href, title, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [timer, setTimer] = useState(null);
    const { push } = useRouter();

    const handlePopupOpen = (state) => {
        setOpen(state);
        setTimer(state ? 9 : null);
    };

    useEffect(() => {
        if(timer === 0) {
           setTimer(null);
           push(href);
           return;
        }
        if (timer === null) return;

        const intervalId = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }, [timer]);
    return (<>
        <a {...rest} onClick={() => handlePopupOpen(true)}>{title}</a>
        {/* {open && <div>
            <p onClick={() => handlePopupOpen(false)}>Close</p>
            <p>Popup open </p>
            <p>Redirecting in {timer === 0 ? "0" : timer}</p>
        </div>} */}
        {open && <>
            <div id="popup1" className="popup-container">
            <div className="popup-content">
                <a onClick={() => handlePopupOpen(false)} className="close">&times;</a>
                <span className='mob_popup_button'>This link is taking you to an external site in {timer} seconds</span>
                <p>Dear User,</p>
                <p>You are about to leave <a href="https://www.news18.com/">News18.com</a>  (or any other platform where we’re posting the article)
                    and will be redirected to a third-party financial services website. Please be aware of the following:</p> 
                <ol>
                    <li>Sensitive Financial Information: The third-party site you are about to access may request or collect sensitive financial
                        information from you. Always ensure that you are comfortable sharing any personal or financial details.</li> 

                        <li><a href="https://www.news18.com/">News18.com</a> (or any other platform where we’re posting the article) does not have any control over the collection,
                         storage, or use of your information by the third-party site. We do not endorse or vouch for the privacy practices of external sites.</li>

                    <li>User`s Discretion: It is entirely at your discretion to provide any information to the third-party site.
                        We recommend reading their privacy policy and terms of service before sharing any personal or financial details.</li>

                    <li>No Endorsement: Our linking to an external site does not constitute an endorsement of the site, 
                        its content, or its services. It`s provided solely for informational purposes and user convenience.</li>
                </ol>
                <p>Please exercise caution and make informed decisions. Thank you for trusting <a href="https://www.news18.com/">News18.com</a> </p>
                <span className='des_popup_button'>This link is taking you to an external site in {timer} seconds</span>
            </div>
            </div>
            <style jsx global>{`
            .popup-link {
                display:flex;
                flex-wrap:wrap;
              }
              .mob_popup_button {
                display: none !important;
              }
              .popup-link a{
                  background: #333;
                  color: #fff;
                  padding: 10px 30px;
                  border-radius: 5px;
                  font-size:17px;
                  cursor:pointer;
                  margin:20px;
                  text-decoration:none;
              }
  
              .popup-container {
                visibility: visible;
                opacity: 1;
                transform: scale(1);
                  position: fixed;
                  z-index: 1111;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  font-family: "Mukta",sans-serif;
              }
              .artcl_container .popup-content {
                  background-color: #f5f5f5;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #888;
                  width: 50%;
              }
              .artcl_container .popup-content p{
                  font-size: 13px;
                  line-height: 20px;
                  margin-bottom: 10px;
                  font-family: "Mukta",sans-serif !important;
              }
              .artcl_container .popup-content a.close{
                  color: #ffffff;
                  float: right;
                  font-size: 23px;
                  font-weight: bold;
                  background: none;
                  padding: 0;
                  margin: 0;
                  text-decoration: none;
                  background-color: #000;
                  border-radius: 50%;
                  height: 25px;
                  width: 25px;
                  text-align: center;
              }
            //   .popup-container:target{
            //     visibility: visible;
            //     opacity: 1;
            //     transform: scale(1);
            //   }

            .artcl_container .popup-content ol {
                margin-bottom: 10px;
            }
            .artcl_container .popup-content ol li {
                line-height: 20px;
                font-size: 13px;
                margin-bottom: 0;
                list-style-type: decimal;
                text-transform: none;
                padding: 2px;
              }
              .artcl_container .popup-content ol li:after {
                content: "";
                position: relative;
                color: #000;
            }
            .popup-content p a, .popup-content ol li a {
                font-size: 13px !important;
                border-bottom: 0 !important;
                font-weight: normal !important;
                line-height: 20px !important;
                color: #e1261d;
            }
              li:marker {
                unicode-bidi: isolate;
                font-variant-numeric: tabular-nums;

              }
              .popup-content span {
                background-color: #fff;
                border: 1px solid#888;
                width: 81%;
                height: 35px;
                display: block;
                padding: 5px 10px;
                margin: 0 auto;
                text-align: center;
                line-height: 24px;
                font-size: 17px;
              }
              @media (max-width:768px){
                .popup-content{ 
                    width: 94% !important;
                    height: 500px;
                    overflow: scroll;
                }
                .des_popup_button {
                    display: none !important;
                }
                .mob_popup_button {
                    display: inherit !important;
                    margin-top: 35px !important;
                    margin-bottom: 16px !important;
                }
                .content_sec .popup-content p {
                    font-size: 15px;
                    line-height: 20px;
                    margin-bottom: 10px;
                    font-family: "Mukta",sans-serif!important;
                }
                .artcl_container  .popup-content ol li {
                    font-size: 15px;
                    margin-left: 9px;
                    list-style-type: decimal;
                    margin-bottom: 0;
                    text-transform: none;
                }
                .popup-content span {
                    width: 99%;
                    height: auto;
                    line-height: 25px;
                    font-size: 16px;
                }
                .popup-content a.close{line-height: 27px; margin-top: -12px; margin-right: -12px;}
                .popup-content p a, .popup-content ol li a {font-size: 15px!important;}
                .artcl_container .popup-content ol {
                    margin-bottom: 10px;
                }
                .artcl_container .popup-content ol li:after {
                    content: "";
                    position: relative;
                    color: #000;
                }
              }
            `}</style>
        </>}
    </>);
};

export default ThirdPartyPopup;
