import getConfig from 'next/config';
import ReactHtmlParser from 'html-react-parser';
import { imageLoader } from 'includes/article.util';
import { logEvent } from 'includes/googleAnalytic';
import LazyLoadImage from 'components/Common/LazyLoadImage';
import { useEffect } from 'react';
import Glide from "@glidejs/glide";
import ReadMore from '../common/ReadMore';
import GlideBtn from 'components/Common/GlideBtn';

const { publicRuntimeConfig } = getConfig();

const Minis = ({
  isAmp = false,
  data = []
}) => {
  if (!data.length) {
    return null;
  }

  useEffect(() => {
    if (document.getElementsByClassName('newnews18minis-slide-in').length) {
      new Glide(document.querySelector('.newnews18minis-slide-in'), {
        autoplay: false,
        type: 'slider',
        perView: 1.2,
        gap: 15,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);

  return (
    <>
      <div className="newglblhdwrap">
        <h2 className="newglblhd">NEWS<span>18</span> MINIS <em>A WORLD OF NEWS AT YOUR FINGERTIPS</em></h2>
      </div>

      <div className="newnews18minis-slide">
        <div className="newnews18minis-slide-in">
          <div data-glide-el="track">
            <ul>
              {data && data.length > 0 && data.map((news, index) => {
                const width = 332;
                const height = 184;
                const imageSrc = imageLoader(news?.images?.url, width, height);
                const headline = news.display_headline || news.headline;
                const webUrl = news.weburl
                  ? news.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ''}`)
                  : '';
                const introduction = news.intro;
                return (
                  <li key={`mobileMinis-` + index}>
                    <a
                      href={webUrl}
                      onClick={() => {
                        logEvent('News18 Minis', 'Click - Home', webUrl);
                      }}
                    >
                      {
                        isAmp ?
                          <figure>
                            <amp-img
                              src={imageSrc}
                              alt={headline}
                              title={headline}
                              width={width}
                              height={height}
                              layout="responsive"
                            ></amp-img>
                          </figure>
                          :
                          <LazyLoadImage
                            src={imageSrc}
                            alt={headline}
                            title={headline}
                            width={width}
                            height={height}
                          />
                      }
                      <h3>{headline}</h3>
                      <p>{ReactHtmlParser(introduction ? introduction : '')}
                        <span
                          onClick={() => {
                            logEvent('News18 Minis', 'Click - Home', webUrl);
                          }}
                        >पूरा पढ़ें</span></p>
                    </a>
                  </li>
                );
              })
              }
              <li className="minismore">
                <a
                  href={publicRuntimeConfig.siteUrl + "minis/"}
                  onClick={() => {
                    logEvent(
                      'News18 Minis',
                      'Click - Home',
                      'Last Card - Read More'
                    );
                  }}
                >
                  <div>
                    <h4><span>News18 Minis</span>से और पढ़ें</h4>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <GlideBtn
            data={data}
            className={`trndstorynewbullet`}
          />

        </div>

        <ReadMore
          categoryLink={publicRuntimeConfig.siteUrl + "minis/"}
          heading={`और भी पढ़ें`}
          buttonType={false}
        />

      </div>
      <style jsx global>{`
            .newnews18minis-slide {
              position: relative;
              background: #F5F5F5;
              padding: 10px 0;
            }
        
            .newnews18minis-slide-in {
              overflow: hidden;
              margin: 0 0 0 10px;
            }
        
            .newnews18minis-slide-in ul {
              display: flex;
              margin-bottom: 30px;
            }
        
            .newnews18minis-slide-in ul li {
              background: #FFFFFF;
              box-shadow: 0px 0px 4px #0000001A;
              border: 1px solid #DBDBDB;
              border-radius: 4px;
              overflow: hidden;
            }
        
            .newnews18minis-slide-in ul li a figure {
              width: 100%;
              height: 184px
            }
        
            .newnews18minis-slide-in ul li a figure img {
              width: 100%;
              height: 184px;
              border-radius: 4px 4px 0 0;
            }
        
            .newnews18minis-slide-in ul li a h3 {
              padding: 10px 10px 0 10px;
              color: #000000;
              font-size: 18px;
              line-height: 26px;
            }
        
            .newnews18minis-slide-in ul li a p {
              font-size: 14px;
              line-height: 22px;
              color: #434343;
              padding: 5px 10px 10px 10px;
            }
        
            .newnews18minis-slide-in ul li a p span {
              color: #EC2027;
              font-weight: bold;
              padding-left: 5px;
            }
        
            .newnews18minis-slide button {
              top: 50%;
              left: 0;
              margin-top: -16px;
            }
        
            .newnews18minis-slide button:last-child {
              right: 0;
            }
        
            .newnews18minis-slide .moretrndstroy {
              margin: 0 auto;
            }
        
            .minismore a {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              background: rgba(0, 0, 0, .99);
              color: #fff;
            }
        
            .minismore a h4 {
              font-size: 32px;
              font-weight: normal;
              text-align: center;
              line-height: 40px;
              border-top: 3px solid #fff;
              border-bottom: 3px solid #fff;
              padding: 10px 0;
            }
        
            .minismore a h4 span {
              font-weight: normal;
              font-size: 18px;
              text-transform: uppercase;
              line-height: 30px;
              letter-spacing: 5.5px;
              display: block;
            }
            @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
              .newnews18minis-slide-in ul li a figure {width: 100% !important; height: 350px !important;}
	            .newnews18minis-slide-in ul li a figure img {Width: 100%; height: 350px !important;}
            }
      `}</style>
    </>
  );
};

export default Minis;
