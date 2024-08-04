import Glide from "@glidejs/glide";
import { useEffect } from "react";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import TopNews from "components/Common/Olympics/TopNews";
import MedalTally from "components/Common/Olympics/MedalTally";
import PhotoGallery from "components/Common/Olympics/PhotoGallery";
import LatestNews from "components/Common/Olympics/LatestNews";
import PageNavigations from "components/Common/Olympics/PageNavigations";
import { olympics_year } from "api/Constant";
import IndiaMedalHopeComponent from "./IndiaMedalHopeComponent";
import dynamic from "next/dynamic";
import IndiaInFocus from "./IndiaInFocus";
import UltimatePerformerOfTheDay from "./UltimatePerformerOfTheDay";
import UltimatePerformer from "./UltimatePerformer";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import IMHMobile from "./IMHMobile";
import { TaboolaList } from "includes/Tabola.helper";
import Taboola from "widgets/Common/Responsive/Taboola";

const EventDateWidgetDesktop = dynamic(() =>
  import("components/Common/Olympics/EventDateWidgetDesktop")
);
const EventDateWidgetMobile = dynamic(() =>
  import("components/Common/Olympics/EventDateWidgetMobile")
);

const Home = (props) => {
  const {
    breadCrumbArray,
    middleData,
    rightData,
    leftData,
    isMobile,
    medalTally,
    photoGallery,
    latestNewsData,
    lomp_sdl_with_date,
    date,
    medalHopeData,
    performerOfTheDay,
    indiaNewsByTag,
    pageAds,
    videos,
  } = props?.data;
  const { bottom } = TaboolaList.homePage;
  useEffect(() => {
    if (photoGallery?.length > 0) {
      new Glide(document.querySelector(".photogallerie_sldier"), {
        //autoplay: 4000,
        type: "slider",
        perView: 1,
        gap: 0,
        slidesToShow: 1,
        draggable: true,
      }).mount();
    }
  }, []);
  return (
    <>
      {/* top widget end here */}
      {isMobile ? (
        <EventDateWidgetMobile
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      ) : (
        <EventDateWidgetDesktop
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      )}
      <div className="olympics-wrapper">
        <div className="olympics-left">
          {isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_ATF_320_ad"
                  width={336}
                  height={280}
                  adUnit={pageAds?.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
              </div>
            </div>
          )}
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          <PageNavigations title={`Olympics ${olympics_year} Home`} />
          <TopNews
            middleData={middleData}
            rightData={rightData}
            leftData={leftData}
            isMobile={isMobile}
          />
          {isMobile ? (
            <>
              <div>
                {isMobile && (
                  <div className="add">
                    <div className="addinner-box">
                      <NewSiteAd
                        slotId="Mobile_ATF_300_3"
                        width={336}
                        height={280}
                        adUnit={pageAds?.ATF_300}
                        sizes={[
                          [300, 250],
                          [336, 280],
                          [250, 250],
                        ]}
                        lazyload={true}
                      ></NewSiteAd>
                    </div>
                  </div>
                )}
              </div>
              <MedalTally
                medalTally={medalTally}
                pageAds={pageAds}
                isMobile={isMobile}
                pageType={"home"}
              />
            </>
          ) : (
            <IndiaMedalHopeComponent medalHopeData={medalHopeData} />
          )}
          {isMobile && <IMHMobile medalHopeData={medalHopeData} />}

          <UltimatePerformerOfTheDay performerOfTheDay={performerOfTheDay} />
          <IndiaInFocus indiaNewsByTag={indiaNewsByTag} />
        </div>
        {!isMobile && (
          <MedalTally
            medalTally={medalTally}
            pageAds={pageAds}
            isMobile={isMobile}
          />
        )}
      </div>
      {/* INDIA’S ULTIMATE PERFORMERS start here */}
      <UltimatePerformer isMobile={isMobile} />
      {/* INDIA’S ULTIMATE PERFORMERS end here */}

      <div className="olympics-wrapper">
        <div className="olympics-left">
          {/* OLYMPICS 2024  FEATURES start here */}
          {/*
          <div className="cricketwallah">
            <div className="featrhead">
              <div className="medalHopeHeadingInner">
                <h3 className="heading-1">Paris olympics 2024</h3>
                <h2 className="heading-2">Features</h2>
              </div>
            </div>
            <div className="cricketwallahSlider">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  <li className="glide__slide">
                    <div className="cricketwallah_left">
                      <div className="cricketwallah_img">
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2021/08/1627813341_vimal-kumar.jpg?impolicy=website&amp;width=200&amp;height=200"
                          title="Vimal Kumar"
                          alt="Vimal Kumar"
                        />
                      </div>
                      <div className="cricketwallah_content">
                        <h3>Vimal Kumar</h3>
                        <p>
                          Vimal Kumar, former Sports Editor of News18 India, has
                          been in sports journalism for nearly two decades.
                          Vimal, who is active on social media (Twitter,
                          Facebook, Instagram) as @Vimalwa, has also covered 4
                          Cricket World Cup and Rio Olympics.
                        </p>
                        <div className="morebox">
                          <a
                            href="https://www.news18.com/byline/vimal-kumar.html"
                            className="cricketwallah_more"
                          >
                            More Stories by this columnist
                          </a>
                        </div>
                      </div>
                    </div>
                    <ul className="cricketwallah_right">
                      <li data-id="4020512">
                        <a href="https://www.news18.com/news/sports/mirabai-chanu-interview-definitely-want-to-change-the-colour-of-my-medal-in-2024-paris-games-4020512.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627536345_mirabai-chanu-1-1200x800.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Mirabai Chanu Interview: ‘Definitely Want to Change the Colour of my Medal in 2024 Paris Games’"
                              alt="Mirabai Chanu Interview: ‘Definitely Want to Change the Colour of my Medal in 2024 Paris Games’"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Mirabai Chanu Interview: ‘Definitely Want to Change
                            the Colour of my Medal in 2024 Paris Games’
                          </h3>
                        </a>
                      </li>
                      <li data-id="4009181">
                        <a href="https://www.news18.com/news/sports/exclusive-once-they-reach-quarterfinals-india-will-be-a-transformed-team-says-ashok-kumar-4009181.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627092670_sports-35-1200x800.png?impolicy=website&amp;width=100&amp;height=63"
                              title="EXCLUSIVE - Once They Reach Quarterfinals, India Will be a Transformed Team, Says Hockey Legend Ashok Kumar"
                              alt="EXCLUSIVE - Once They Reach Quarterfinals, India Will be a Transformed Team, Says Hockey Legend Ashok Kumar"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            EXCLUSIVE - Once They Reach Quarterfinals, India
                            Will be a Transformed Team, Says Hockey Legend Ashok
                            Kumar
                          </h3>
                        </a>
                      </li>
                      <li data-id="4003469">
                        <a href="https://www.news18.com/news/sports/resilient-mirabai-chanu-completes-redemption-story-in-olympic-glory-4003469.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627111028_mirabai-chanu-1600-ap-1200x800.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Resilient Mirabai Chanu Completes Redemption Story in Olympic Glory"
                              alt="Resilient Mirabai Chanu Completes Redemption Story in Olympic Glory"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Resilient Mirabai Chanu Completes Redemption Story
                            in Olympic Glory
                          </h3>
                        </a>
                      </li>
                    </ul>
                    <div className="morebox mb">
                      <a
                        href="https://www.news18.com/byline/vimal-kumar.html"
                        className="cricketwallah_more"
                      >
                        More Stories by this columnist
                      </a>
                    </div>
                  </li>
                  <li className="glide-slide">
                    <div className="cricketwallah_left">
                      <div className="cricketwallah_img">
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2021/07/1627094758_whatsapp-image-2021-07-23-at-09.32.40.jpg?impolicy=website&amp;width=200&amp;height=200"
                          title="Nandakumar Marar"
                          alt="Nandakumar Marar"
                        />
                      </div>
                      <div className="cricketwallah_content">
                        <h3>Nandakumar Marar</h3>
                        <p>
                          Writes on different sports appearing on the Olympics
                          Games programme and beyond. News and news features on
                          happenings of special interest and on newsmakers
                        </p>
                        <a
                          href="https://www.news18.com/byline/nandakumar-marar.html"
                          className="cricketwallah_more"
                        >
                          More Stories by this columnist
                        </a>
                      </div>
                    </div>
                    <ul className="cricketwallah_right">
                      <li data-id="4027385">
                        <a href="https://www.news18.com/news/sports/exclusive-like-vijender-singh-lovlina-borgohain-must-solely-focus-on-her-next-bout-now-kishen-narsi-4027385.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627652344_lovlina-borgohain-ap-1600-1-1200x800.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Exclusive: Like Vijender Singh, Lovlina Borgohain Must Solely Focus on Her Next Bout Now - Kishen Narsi"
                              alt="Exclusive: Like Vijender Singh, Lovlina Borgohain Must Solely Focus on Her Next Bout Now - Kishen Narsi"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Exclusive: Like Vijender Singh, Lovlina Borgohain
                            Must Solely Focus on Her Next Bout Now - Kishen
                            Narsi
                          </h3>
                        </a>
                      </li>
                      <li data-id="4013591">
                        <a href="https://www.news18.com/news/sports/mirabai-chanu-tokyo-olympics-2020-india-weightlifting-silver-medal-games-4013591.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627383917_mirabai-chanu-1600-ap-1-1200x800.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Tokyo Olympics: Mirabai, Tujhe Salaam!"
                              alt="Tokyo Olympics: Mirabai, Tujhe Salaam!"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Tokyo Olympics: Mirabai, Tujhe Salaam!
                          </h3>
                        </a>
                      </li>
                      <li data-id="4013267">
                        <a href="https://www.news18.com/news/sports/shooters-were-in-rhythm-before-covid-struck-one-year-took-away-competitive-edge-ronak-pandit-4013267.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1627382596_saurabh-verma-ap-1600-1200x800.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Shooters Were in Rhythm Before Covid Struck, One Year Took Away Competitive Edge: Ronak Pandit"
                              alt="Shooters Were in Rhythm Before Covid Struck, One Year Took Away Competitive Edge: Ronak Pandit"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Shooters Were in Rhythm Before Covid Struck, One
                            Year Took Away Competitive Edge: Ronak Pandit
                          </h3>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="glide-slide">
                    <div className="cricketwallah_left">
                      <div className="cricketwallah_img">
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2021/07/1627094629_gk-headshot-use-this-1.jpg?impolicy=website&amp;width=200&amp;height=200"
                          title="G Krishnan"
                          alt="G Krishnan"
                        />
                      </div>
                      <div className="cricketwallah_content">
                        <h3>G Krishnan</h3>
                        <p>
                          G. Krishnan has been a sports journalist for more than
                          two decades, covering a wide variety of disciplines
                          but mainly cricket. He started his career with Deccan
                          Herald before joining Hindustan Times and later DNA,
                          where he was the Assistant Editor (sports){" "}
                        </p>
                        <a
                          href="https://www.news18.com/byline/g-krishnan.html"
                          className="cricketwallah_more"
                        >
                          More Stories by this columnist
                        </a>
                      </div>
                    </div>
                    <ul className="cricketwallah_right">
                      <li data-id="3961784">
                        <a href="https://www.news18.com/news/sports/exclusive-i-want-to-prove-there-is-no-barrier-to-achieve-our-goals-bhavani-devi-3961784.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1626100100_ca-bhavani-devi-insta.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="EXCLUSIVE - I Want to Prove There is no Barrier to Achieve Our Goals: Bhavani Devi"
                              alt="EXCLUSIVE - I Want to Prove There is no Barrier to Achieve Our Goals: Bhavani Devi"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            EXCLUSIVE - I Want to Prove There is no Barrier to
                            Achieve Our Goals: Bhavani Devi
                          </h3>
                        </a>
                      </li>
                      <li data-id="3953522">
                        <a href="https://www.news18.com/news/sports/todays-youngsters-are-bindaas-have-no-pressure-anjali-bhagwat-has-high-hopes-from-indias-olympic-shooting-contingent-3953522.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1626075477_anjali-bhagwat-afp-1200.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Today's Youngsters are Bindaas: Anjali Bhagwat Has High Hopes of India's Olympic Shooters"
                              alt="Today's Youngsters are Bindaas: Anjali Bhagwat Has High Hopes of India's Olympic Shooters"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Today's Youngsters are Bindaas: Anjali Bhagwat Has
                            High Hopes of India's Olympic Shooters
                          </h3>
                        </a>
                      </li>
                      <li data-id="3929999">
                        <a href="https://www.news18.com/news/sports/swimmer-srihari-nataraj-wants-to-make-the-most-of-his-dream-come-true-moment-at-tokyo-olympics-3929999.html">
                          <figure>
                            <img
                              src="https://images.news18.com/ibnlive/uploads/2021/07/1625545839_srihari-nataraj.jpg?impolicy=website&amp;width=100&amp;height=63"
                              title="Swimmer Srihari Nataraj Wants to Make the Most of his 'Dream-come-true' Moment at Tokyo Olympics"
                              alt="Swimmer Srihari Nataraj Wants to Make the Most of his 'Dream-come-true' Moment at Tokyo Olympics"
                            />
                          </figure>
                          <h3 className="cricketwallah_title">
                            Swimmer Srihari Nataraj Wants to Make the Most of
                            his 'Dream-come-true' Moment at Tokyo Olympics
                          </h3>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="glide__bullets" data-glide-el="controls[nav]">
                  <button
                    className="glide__bullet glide__bullet--active"
                    data-glide-dir="=0"
                    type="button"
                  ></button>
                  <button
                    className="glide__bullet"
                    data-glide-dir="=1"
                    type="button"
                  ></button>
                  <button
                    className="glide__bullet"
                    data-glide-dir="=2"
                    type="button"
                  ></button>
                </div>
              </div>
            </div>
          </div> */}

          {/* OLYMPICS 2024  FEATURES end here */}

          {/* Photogallerie Tokyo Streets start here */}

          {photoGallery?.length > 0 && (
            <PhotoGallery
              photoGallery={photoGallery}
              isMobile={isMobile}
              videos={videos}
            />
          )}

          {/* Photogallerie Tokyo Streets end here */}
        </div>
        <div className="olympics-right">
          {!isMobile && photoGallery?.length > 0 && (
            <NewSiteAd
              slotId={"BTF_300_id"}
              adUnit={pageAds.BTF_300_id}
              sizes={[[300, 250]]}
              width={300}
              // removeAdSpan={true}
              height={250}
              lazyLoad={true}
            />
          )}
        </div>
      </div>

      {/* latest news start here  */}
      {latestNewsData?.length > 0 && (
        <LatestNews
          latestNewsData={latestNewsData}
          isMobile={isMobile}
          pageAds={pageAds}
        />
      )}
      <Taboola
        mode={bottom.mode}
        id={bottom.id}
        container={bottom.container}
        placement={bottom.placement}
      />

      <style jsx global>{`
      
        // top story

        .olymtpwrap {
          margin-bottom: 30px;
        }
        .olymptp {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 30px;
        }
        .olymptp_cntr {
          min-width: 445px;
          margin-bottom: 10px;
        }
        .olymptp_rl {
          min-width: 210px;
        }
        .olymptp_cntr figure img {
          width: 100%;
          display: block;
          height: 331px;
        }
        .olymptp_cntr figcaption {
          background-color: #f5f5f5;
          padding: 8px 15px;
        }
        .olymptp_cntr a {
          color: #001d42;
        }
        .top_title {
          font-size: 19px;
          line-height: 26px;
          font-weight: 700;
          color: #111;
        }
        .olymptp_cntr figcaption p {
          font-size: 12px;
          line-height: 18px;
          font-weight: 400;
          height: 36px;
          overflow: hidden;
        }
        .olymptp_rl .olymptptl li img {
          width: 206px;
          height: 154px;
        }
        .olymptptl li figure {
          display: none;
        }
        .olymptptl li:first-child figure {
          display: block;
        }
        .ttlolymp {
          font-size: 13px;
          line-height: 20px;
          font-weight: 400;
          color: #111;
        }
        .olymptptl li:first-child .ttlolymp {
          margin-top: 10px;
        }
        .olymptptl li {
          border-bottom: 1px #dadada solid;
          padding: 15px 0;
        }
        .olymptptl li:first-child {
          padding-top: 0;
        }
        .load_more {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .load_more a {
          color: red;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
          padding: 0 15px;
          text-decoration: underline;
        }
        .load_more::before,
        .load_more::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
        .mb {
          display: none;
        }

        @media (max-width: 768px) {
          .olymtpwrap {
            padding: 10px;
          }
          .olymptp {
            display: block;
          }
          .olymptp_cntr {
            display: none;
          }
          .olymptp_cntr.mb,
          .olymptp_rl {
            display: block;
            min-width: 100%;
          }
          .olymptp_cntr.mb {
            border-bottom: 1px #dadada solid;
          }
          .top_title {
            font-size: 18px;
            line-height: 24px;
          }
          .olymptp_cntr figure img {
            height: 255px;
          }
          .olymptp_cntr figcaption {
            background: transparent;
            padding: 8px 0;
          }
          .olymptptl li:first-child a {
            display: flex;
            flex-direction: row-reverse;
          }
          .olymptp_rl .olymptptl li img {
            width: 88px;
            height: 66px;
          }
          .ttlolymp {
            font-size: 14px;
            line-height: 20px;
            font-weight: 700;
          }
          .load_more,
          .full_table {
            border: 1px solid #c0c0c0;
            background-color: #f4f4f4;
            height: 36px;
          }
          .load_more a,
          .full_table a {
            font-size: 12px;
            color: #e1261d;
            text-decoration: none;
          }
        }
        // top story end here

        // ultimate performance  of day start here

        // ultimate performance of day end here

        //India In Focus start here

        //India In Focus end here

        //INDIA’S ULTIMATE PERFORMERS start here
        // OLYMPICS 2024  FEATURES start here

        {/* .cricketwallah {
          display: flex;
          flex-wrap: wrap;
          padding: 10px 20px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        .cricketwallah_left {
          width: 50%;
          display: flex;
          border-right: 1px #d8d8d8 solid;
          box-sizing: border-box;
          padding-right: 20px;
        }

        .cricketwallah_right {
          width: 50%;
          padding-left: 20px;
          box-sizing: border-box;
        }

        .cricketwallah_right li a {
          display: flex;
          color: #001d42;
        }

        .cricketwallah_right li img {
          width: 83px;
          height: 60px;
          display: block;
        }

        .cricketwallah_title {
          font-size: 13px;
          line-height: 20px;
          width: calc(100% - 90px);
          padding-left: 10px;
          font-weight: 400;
          color: #111;
        }

        .cricketwallah_right li {
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
        }

        .cricketwallah_right li:first-child {
          padding-top: 0;
        }

        .cricketwallah_img {
          width: 100px;
          height: 100px;
          background: #f3f3f3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cricketwallah_img img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }

        .cricketwallah_content {
          width: 100%;
          padding-left: 20px;
          font-size: 13px;
          font-weight: 400;
        }

        .cricketwallah_content p {
          font-size: 12px;
          line-height: 20px;
          padding-bottom: 5px;
          font-weight: 400;
          color: #292929;
        }

        .cricketwallah_content h3 {
          color: #202020;
          font-size: 20px;
          line-height: 25px;
          padding-bottom: 10px;
        }

        .morebox {
          height: 35px;
          background: #f4f4f2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-bottom: 1px #dadada solid;
          margin-top: 30px;
        }

        .cricketwallah_more {
          letter-spacing: 0.24px;
          display: block;
          color: #e1261d;
          font-weight: 700;
          text-decoration: underline;
          letter-spacing: 0.24px;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
        }

        .cricketwallahSlider {
          width: 100%;
          box-sizing: border-box;
          padding-top: 5px;
        }

        .cricketwallahSlider .glide__track {
          overflow: hidden;
        }

        .cricketwallahSlider .glide__slides {
          display: flex;
          margin-bottom: 12px;
        }

        .cricketwallahSlider .glide__slides li {
          display: flex;
        }

        .cricketwallahSlider .glide__bullets {
          display: flex;
          background: #f5f5f5;
          position: relative;
          z-index: 1;
          justify-content: center;
        }

        .cricketwallahSlider .glide__bullets::before,
        .cricketwallahSlider .glide__bullets::after {
          content: "";
          width: 45px;
          height: 2px;
          background: #d1d1d1;
          margin-top: 10px;
        }

        .cricketwallahSlider .glide__bullets::before {
          margin-right: 10px;
        }

        .cricketwallahSlider .glide__bullets::after {
          margin-left: 10px;
        }

        .cricketwallahSlider button.glide__bullet {
          width: 20px;
          height: 21px;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/dots.svg);
          border: 0;
          background-repeat: no-repeat;
          background-position: 2px center;
          background-color: #fff0;
          margin: 0 3px;
          flex-shrink: 0;
        }

        .cricketwallahSlider button.glide__bullet.glide__bullet--active {
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/dots-color.svg);
        }

        .featrhead {
          width: 100%;
          display: flex;
          align-items: center;
          background-image: url(/images/olympics/featurebg.svg);
          margin-bottom: 15px;
        }

        .featrhead .medalHopeHeadingInner {
          max-width: 100%;
          margin: 0 27%;
        }

        .featrhead .medalHopeHeadingInner .heading-2 {
          border: 0;
          margin: 0;
        }

        .morebox.mb {
          display: none;
        }

        @media (max-width: 768px) {
          .cricketwallah {
            padding: 10px 0;
          }

          .featrhead {
            background-image: url(/images/olympics/mbfeatrbnr.svg);
            justify-content: center;
          }

          .featrhead .medalHopeHeadingInner {
            margin: 0 auto 0 35%;
          }

          .cricketwallahSlider .glide__slides li {
            display: block;
          }

          .cricketwallah_left {
            width: 100%;
            padding-right: 0;
            border: 0;
            display: block;
            padding-bottom: 10px;
            border-bottom: 1px #dadada solid;
            margin-bottom: 15px;
          }

          .cricketwallah_right {
            width: 100%;
            padding: 0 10px;
          }

          .cricketwallah_img {
            float: left;
            margin-right: 6px;
          }

          .cricketwallah_content {
            padding: 0 10px;
          }

          .cricketwallah_content .morebox {
            display: none;
          }

          .morebox.mb {
            display: flex;
          }

          .cricketwallah_right li a {
            flex-direction: row-reverse;
          }

          .cricketwallah_title {
            padding-left: 0;
            padding-right: 10px;
          }
        }

        // OLYMPICS 2024  FEATURES end here */}
        .add{text-align: center; margin: 15px 0;}
        .vspacer20 { margin: 20px 0;}
     .ultiPrfom_inner_1 .imgbox img {
          display: block;
          width: 100%;
          height: 100%;
        }
          .medalWinnerSlider .imageBox img {
          width: 100%;
          height: 100%;
        } 
         *::-webkit-scrollbar {
          width: 2px;
          height:2px;
          }
          
          *::-webkit-scrollbar-track {
          background: transparent;
          }
          
          *:hover::-webkit-scrollbar-thumb {
          background: #ddd;
          border: 2px solid #a8a8a8;
          }
      `}</style>
    </>
  );
};
export default Home;
