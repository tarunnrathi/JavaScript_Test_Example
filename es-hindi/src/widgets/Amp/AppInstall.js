import React from "react";

const AppInstall = (props) => {
  const openAppUrl= 'https://onelink.to/install-float-hin';
  return (
    <>
      {/* <amp-state id="appState">
        <script type="application/json">
          {JSON.stringify({ overlayVisible: true })}
        </script>
      </amp-state> */}
      {/* <amp-script layout="container" script="amp-script" sandbox="allow-forms"> */}
        {/* <div
          className="overlayApp"
          data-amp-bind-class="appState.overlayVisible ? 'overlayApp show' : 'overlayApp hide'"
          on="tap:AMP.setState({appState: {overlayVisible: false}}), event.preventDefault()"
          role="button"
          tabindex="0"
        >
          <div className="apptch_wrap" onClick={(e) => e.stopPropagation()}>
            <span>देखें इस पेज को:</span>
            <div className="appitm_wrp">
              <div className="appoption">
                <div className="lhs">
                  <amp-img
                    src="/images/browser/news18logo.png"
                    alt="News18 Logo"
                    width="40px"
                    height="40px"
                  ></amp-img>
                  <h3 className="lghead">
                    News18 ऐप में
                    <span className="lgdesc">बेहतर न्यूज़ अनुभव</span>
                  </h3>
                </div>
                <span className="appcta active" id="continueApp">
                  <a
                    id="downloadLink"
                    href="https://www.news18.com/app-download-hindi/"
                    role="link" 
                  >
                    ऐप खोलें
                  </a>
                </span>
              </div>
              <div className="appoption">
                <div className="lhs">
                  <amp-img
                    id="browserlogo"
                    src="/images/browser/Chrome.png"
                    alt="Browser Logo"
                    width="40px"
                    height="40px"
                  ></amp-img>
                  <h3 className="lghead">ब्राउज़र में ही</h3>
                </div>
                <span
                  className="appcta"
                  id="continueBrowser"
                  role="button"
                  tabindex="0"
                  on="tap:AMP.setState({appState: {overlayVisible: false}}), event.preventDefault()"
                >
                  जारी रखें
                </span>
              </div>
            </div>
          </div>
        </div> */}
      <div className="opnbtnwrap">
        <div className="opbtntxt">
          <span>
            <button
              id="openApp"
              on={`tap:AMP.navigateTo(url='${openAppUrl}', opener='_top')`}
            >
              ऐप खोलें
            </button>
          </span>
        </div>
      </div>
      {/* </amp-script> */}

      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            document.addEventListener('DOMContentLoaded', function() {
              var browserlogo = document.getElementById('browserlogo');
              var downloadLink = document.getElementById('downloadLink');
              var openApp = document.getElementById('openApp');
              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
     
              if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                browserlogo.setAttribute('src', '/images/browser/Safari.png');
                downloadLink.textContent = 'इंस्टॉल ऐप'; 
                openApp.textContent = 'इंस्टॉल ऐप';    
                downloadLink.setAttribute('href', 'https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=bottomsheet-hindi-install&mt=81');
                openApp.setAttribute('href', 'https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=hindi-webbanner-installapp&mt=8');  
              } else if (/android/i.test(userAgent)) {
                browserlogo.setAttribute('src', '/images/browser/Chrome.png');
                downloadLink.setAttribute('href', 'https://app.news18.com/?link=${props?.currentUrl}&apn=com.divum.ibn&afl=https://www.news18.com/app-download-hindi/&isi=395194912&ibi=com.in.ibnlive&utm_campaign=OpenAppPopup&utm_medium=website&utm_source=hindi&ct=OpenAppPopup&pt=433541');
                openApp.setAttribute('href', 'https://app.news18.com/?link=${props?.currentUrl}&apn=com.divum.ibn&afl=https://www.news18.com/app-download-hindi/&isi=395194912&ibi=com.in.ibnlive&utm_campaign=OpenAppCTA&utm_medium=website&utm_source=hindi&ct=OpenAppCTA&pt=433541');

              }              
            });
          })();
        `,
        }}
      /> */}
      <style jsx global>
        {`
          .overlayApp.show {
            display: block;
          }

          .overlayApp.hide {
            display: none;
          }
          .overlayApp {
            height: 100%;
            width: 100%;
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgb(0 0 0 / 70%);
            z-index: 99;
          }
          amp-script {
            opacity: 1;
          }
          .apptch_wrap {
            position: fixed;
            bottom: 54px;
            left: 0;
            right: 0;
            height: 178px;
            background-color: #ffffff;
            border-radius: 20px 20px 0 0;
            padding: 20px;
            z-index: 99;
          }
          .apptch_wrap > span {
            font-size: 15px;
            line-height: 25px;
            font-weight: bold;
            color: #000;
            margin-bottom: 16px;
            display: block;
          }
          .appitm_wrp {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
          }
          .appoption {
            display: flex;
            justify-content: space-between;
          }
          .appoption .lhs {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .lghead {
            display: flex;
            font-size: 14px;
            line-height: 23px;
            flex-direction: column;
          }
          .lghead span {
            font-weight: normal;
            font-size: 11px;
            line-height: 13px;
            color: #6f6f6f;
          }
          .appcta {
            background-color: #eaeaea;
            width: 90px;
            height: 28px;
            text-align: center;
            border-radius: 6px;
            font-size: 13px;
            line-height: 22px;
            color: #595959;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .appcta.active {
            background-color: #d7121b;
            color: #fff;
          }
          .opnbtnwrap {
            filter: drop-shadow(0 3px 6px #00000042);
            position: fixed;
            margin: 0 auto;
            left: 0;
            right: 0;
            bottom: 106px;
            display: flex;
            justify-content: center;
            width: 96px;
            z-index: 111;
          }
          .opbtntxt a {
            color: #fff;
            font-size: 13px;
          }
          .opbtntxt {
            color: #fff;
            font-size: 13px;
            line-height: 22px;
            text-transform: uppercase;
            letter-spacing: 0px;
            width: 68px;
            height: 32px;
            background-color: #d7121b;
            border-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .opbtnclose {
            border-left: 1px solid #fff;
            width: 40px;
            height: 32px;
            background-color: #d7121b;
            border-radius: 0 40px 40px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .opbtntxt button {
            font-size: 13px;
            background: transparent;
            color: #fff;
            line-height: 25px;
            border: none;
          }
        `}
      </style>
    </>
  );
};

export default AppInstall;
