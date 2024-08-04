import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { useEffect, useState } from "react";

const IMHMobile = ({ medalHopeData = [] }) => {
  const [filterOpen, setIsFilterOpen] = useState(false);
  const medalHopeGameList = (
    Array.isArray(medalHopeData) ? medalHopeData : []
  ).reduce(
    (foundValues, nextEmployee) =>
      foundValues.includes(nextEmployee.game)
        ? foundValues
        : foundValues.concat(nextEmployee.game),
    []
  );
  const [filterGameData, setFilterGameData] = useState(
    medalHopeGameList.length
      ? medalHopeData.filter((hope) => hope.game === medalHopeGameList[0])
      : []
  );
  const [selectedGame, setSelectedGame] = useState(
    medalHopeGameList.length ? medalHopeGameList[0] : ""
  );
  if (!medalHopeGameList.length) null;

  const handleOnFilterGame = (game) => {
    if (game !== selectedGame) {
      setFilterGameData(medalHopeData.filter((hope) => hope.game === game));
      setSelectedGame(game);
    }
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (document.querySelector(".olymimhsldr") && filterGameData.length) {
      new Glide(document.querySelector(".olymimhsldr"), {
        perView: 2,
        slidesToScroll: 1,
        gap: 10,
        breakpoints: {
          800: {
            perView: 2,
          },
          480: {
            perView: 1.7,
          },
        },
      }).mount();
    }
  }, [filterGameData]);

  if (
    !Array.isArray(medalHopeData) ||
    (!Array.isArray(medalHopeData) && medalHopeData.length)
  )
    return null;

  return (
    <>
      <div className="medalHopeWrapper">
        <div className="medalHopeInner">
          <div className="medalHopeHeader">
            <div className="medalHopeHeadingWrapper">
              <div className="imhhead">
                <div className="medalHopeHeadingInner">
                  <h3 className="heading-1">Paris olympics 2024</h3>
                  <h2 className="heading-2">{"भारत की पदक आशा"}</h2>
                </div>
              </div>
              <h5 className="heading-3">
                Find out more about the India athletes participating in Paris
                Olympics 2024…
              </h5>

              <div className="medalHopeFilterWrap">
                <div className="medalHopeFilter">
                  <div className="MH_FilterDrop">
                    <div
                      className="MH_FilterVal"
                      onClick={() => setIsFilterOpen(!filterOpen)}
                    >
                      Filter by Event
                    </div>
                    <ul
                      className="MH_FilterDropBox"
                      style={
                        filterOpen ? { display: "block" } : { display: "none" }
                      }
                    >
                      {medalHopeGameList.map((game, index) => (
                        <li key={"MH_" + index}>
                          <a
                            data-value={game}
                            onClick={() => handleOnFilterGame(game)}
                          >
                            {game}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="medalHopecurrentGame">
                  <ul className="gamesIcon">
                    <li className={selectedGame}></li>
                  </ul>
                  <span>{selectedGame}</span>
                </div>
              </div>
            </div>
          </div>

          <div id="medalHopeSliderSection">
            <div className="olymimhsldr sliderSlick">
              <div className="glide__track" data-glide-el="track">
                <div className="glide__slides">
                  {filterGameData.map((data) => (
                    <div
                      key={data.player_name}
                      className="cursor-pointer brdract"
                    >
                      <div className="imageOuter">
                        <div className="imageInnter">
                          <LazyLoadImage
                            src={data.player_image}
                            height={100}
                            width={100}
                            isLazyLoad={true}
                          />
                        </div>
                      </div>
                      <h3 className="heading-1">{data.player_name}</h3>
                      <h4 className="subHead">{data.game}</h4>
                      <div className="medals_row">
                        <img alt="gold" src="/images/olympics/gold.svg"
                          className={
                            Number(data.gold_medal) > 0 ? "" : "inactive"
                          }
                        />
                        <img alt="silver" src="/images/olympics/silver.svg"
                          className={
                            Number(data.silver_medal) > 0 ? "" : "inactive"
                          } />
                        <img alt="bronze" src="/images/olympics/bronze.svg"
                          className={
                            Number(data.bronze_medal) > 0 ? "" : "inactive"
                          } />
                      </div>
                      <div className="imhnum">
                        <span
                          className={
                            Number(data.gold_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.gold_medal}
                        </span>
                        <span
                          className={
                            Number(data.silver_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.silver_medal}
                        </span>
                        <span
                          className={
                            Number(data.bronze_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.bronze_medal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="olymhpstry">
                    <div className="olymhpstryWrapper">
                        <div className="olymhpstryInner">
                            <ul className="storyLeft">
                                <li>
                                    <a href="">
                                        <h4 className="text">Sharath Has Given Belief to Next Generation That You Can Win at Olympics: Kamlesh Mehta</h4>
                                        <div className="imgbox"><img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" /></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <h4 className="text">EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash Sable Broke National Record in Tokyo But Wasn't Happy</h4>
                                        <div className="imgbox"><img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" /></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <h4 className="text">EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash Sable Broke National Record in Tokyo But Wasn't Happy</h4>
                                        <div className="imgbox"><img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" /></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <h4 className="text">EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash Sable Broke National Record in Tokyo But Wasn't Happy</h4>
                                        <div className="imgbox"><img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" /></div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
      {/* </div> */}
      <style jsx>{`
      .inactive {
          opacity: 0.3;
          mix-blend-mode: luminosity;
        }
        .medalHopeWrapper {
          font-family: "Fira Sans";
          font-weight: 400;
          background-color: #ececef;
          padding: 0 0 20px 0;
          margin-bottom: 30px;
        }
        .gamesIcon li {
          width: 40px;
          height: 40px;
          background-color: #0a2036;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-d-white-icon.png);
          margin: 5px 9px 5px 0;
          border-radius: 50%;
        }
        .gamesIcon li a {
          display: block;
          width: 40px;
          height: 40px;
        }
        .gamesIcon li.Archery {
          background-position: -57px 0px;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -114px 0px;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -171px 0px;
        }
        .gamesIcon li.Athletics {
          background-position: -228px 0px;
        }
        .gamesIcon li.Badminton {
          background-position: -283px 0px;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -342px 0px;
        }
        .gamesIcon li.Basketball {
          background-position: -399px 0px;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -456px 0px;
        }
        .gamesIcon li.Boxing {
          background-position: -509px 0px;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -566px 0px;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -627px 0px;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -679px 0px;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -735px 0px;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -795px 0px;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -852px 0px;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -907px 0px;
        }
        .gamesIcon li.Diving {
          background-position: -963px 0px;
        }
        .gamesIcon li.Equestrian {
          background-position: -1022px 0px;
        }
        .gamesIcon li.Fencing {
          background-position: -1080px 0px;
        }
        .gamesIcon li.Football {
          background-position: -1135px 0px;
        }
        .gamesIcon li.Golf {
          background-position: -1190px 0px;
        }
        .gamesIcon li.Handball {
          background-position: -1245px 0px;
        }
        .gamesIcon li.Hockey {
          background-position: 0px -54px;
        }
        .gamesIcon li.Judo {
          background-position: -57px -54px;
        }
        .gamesIcon li.Karate {
          background-position: -114px -54px;
        }
        .gamesIcon li.Marathon_Swimming {
          background-position: -171px -54px;
        }
        .gamesIcon li.Modern_Pentathlon {
          background-position: -228px -54px;
        }
        .gamesIcon li.Rhythmic_Gymnastics {
          background-position: -283px -54px;
        }
        .gamesIcon li.Rowing {
          background-position: -342px -54px;
        }
        .gamesIcon li.Rugby {
          background-position: -399px -54px;
        }
        .gamesIcon li.Sailing {
          background-position: -456px -54px;
        }
        .gamesIcon li.Shooting {
          background-position: -509px -54px;
        }
        .gamesIcon li.Skateboarding {
          background-position: -566px -54px;
        }
        .gamesIcon li.Sport_Climbing {
          background-position: -627px -54px;
        }
        .gamesIcon li.Surfing {
          background-position: -679px -54px;
        }
        .gamesIcon li.Swimming {
          background-position: -735px -54px;
        }
        .gamesIcon li.Table_Tennis {
          background-position: -795px -54px;
        }
        .gamesIcon li.Taekwondo {
          background-position: -852px -54px;
        }
        .gamesIcon li.Tennis {
          background-position: -907px -54px;
        }
        .gamesIcon li.Trampoline_Gymnastics {
          background-position: -963px -54px;
        }
        .gamesIcon li.Triathlon {
          background-position: -1022px -54px;
        }
        .gamesIcon li.Volleyball {
          background-position: -1080px -54px;
        }
        .gamesIcon li.Water_Polo {
          background-position: -1135px -54px;
        }
        .gamesIcon li.Weightlifting {
          background-position: -1190px -54px;
        }
        .gamesIcon li.Wrestling {
          background-position: -1245px -54px;
        }
        #top-widget-calender-section ul.gamesIcon li.active {
          background-color: #ef4e37;
        }
        .imhhead .medalHopeHeadingInner {
          background-image: url(/images/olympics/imhmob.svg);
          background-repeat: no-repeat;
          border-bottom: 1px solid #d2d2d2;
          max-width: 100%;
          height: 92px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          align-content: center;
          padding: 0 24%;
          text-align: center;
          background-size: cover;
        }
        .imhhead .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 2px;
          line-height: 12px;
        }
        .imhhead .medalHopeHeadingInner .heading-2 {
          border: 0;
          margin: 0;
          color: #001d42;
          font-size: 22px;
          line-height: 25px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0 0 6px;
        }
        .medalHopeHeadingWrapper .heading-3 {
          font-size: 12px;
          line-height: 22px;
          font-weight: 400;
          color: #636363;
          padding: 10px;
        }
        .medalHopeFilterWrap {
          display: flex;
          align-items: center;
          padding: 0 10px;
        }

        .medalHopeFilter {
          height: 28px;
          display: flex;
          background: #fff;
          border: 1px solid #ddd;
          background-color: #f6f6f6;
          color: #fff;
        }
        .medalHopeFilter .MH_FilterDrop {
          width: 180px;
          position: relative;
          background-color: #fbfbfb;
        }
        .medalHopeFilter .MH_FilterDrop:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 14px;
          display: block;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);
          background-repeat: no-repeat;
          background-position: right 1px center;
          filter: invert(1);
          top: 6px;
          right: 8px;
        }
        .medalHopeFilter .MH_FilterDrop .MH_FilterVal {
          height: 100%;
          padding-left: 10px;
          font-size: 12px;
          text-transform: uppercase;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #333;
          font-weight: 700;
        }
        .MH_FilterDropBox {
          width: 100%;
          position: absolute;
          top: 22px;
          font-size: 11px;
          background: #e8e8e8;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          border: 1px solid #d0d0d0;
          border-top: 0;
          display: none;
          z-index: 99;
          height: 250px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .MH_FilterDropBox.active {
          display: block;
        }
        .MH_FilterDropBox li:last-child {
          margin-bottom: 0;
        }
        .MH_FilterDropBox li a {
          position: relative;
          color: #001d42;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: block;
          padding: 7px 7px 7px 23px;
        }
        .MH_FilterDropBox li a:hover {
          background: #e1261d;
          color: #fff;
        }
        .MH_FilterDropBox li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .MH_FilterDropBox li.active {
          background: #e1261d;
        }
        .MH_FilterDropBox li.active a {
          color: #fff;
        }
        .medalHopecurrentGame {
          display: flex;
          align-items: center;
          margin-left: 60px;
        }
        .medalHopecurrentGame .gamesIcon {
          margin-right: 7px;
          transform: scale(0.8);
        }
        .medalHopecurrentGame .gamesIcon li {
          margin: 0;
          background-color: #ef4e37;
        }
        .medalHopecurrentGame span {
          color: #000;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 13px;
        }
        .medals_row {
          margin: 10px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .medalHopeHeader {
          border-bottom: 1px solid #d1d1d1;
          background-image: url(/images/olympics/mbmdlhopes.svg);
          background-repeat: no-repeat;
          background-size: cover;
          padding-bottom: 10px;
        }
        #medalHopeSliderSection {
          margin-left: 10px;
        }

        .olymimhsldr {
          position: relative;
          margin-top: 10px;
          width: 100%;
        }
        .olymimhsldr .glide__track {
          overflow: hidden;
          position: relative;
          margin-right: 1px;
        }
        .olymimhsldr .glide__slides {
          padding: 5px 0;
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .olymimhsldr button.glide__arrow {
          position: absolute;
          top: 30%;
          transform: translateY(-50%);
          border: 0;
          font-size: 0;
          cursor: pointer;
          background: 0 0;
          width: 20px;
          height: 20px;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--left {
          left: 17px;
        }
        .olymimhsldr button.glide__arrow:after {
          border-right: 3px solid #000;
          border-top: 3px solid #000;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          top: 62px;
          right: 10px;
          content: "";
          position: absolute;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--left:after {
          transform: rotate(-138deg);
          right: 14px !important;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--right {
          right: 14 !important;
          border-radius: 5px 0 0 5px;
        }
        .olymimhsldr .imageOuter {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ebebeb;
        }
        .olymimhsldr .imageOuter .imageInnter {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
        }
        .olymimhsldr .imageOuter .imageInnter img {
          width: 100%;
          height: 100%;
        }
        .olymimhsldr .cursor-pointer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          padding: 9px 0;
        }
        .olymimhsldr .heading-1 {
          font-size: 15px;
          line-height: 20px;
          font-weight: 700;
          margin: 10px 0 2px;
        }
        .olymimhsldr .subHead {
          font-size: 12px;
          line-height: 18px;
          color: #464646;
          font-weight: 400;
          margin: 0 0 8px;
        }

        .imhnum {
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .imhnum span {
          width: 18px;
          margin-right: 20px;
          color: #a6a6a6;
        }
        .imhnum span.active {
          width: 18px;
          margin-right: 20px;
          color: #000;
        }
        .imhnum span:last-child {
          margin-right: 0px;
        }

        //    .olymhpstry{padding:0 10px;margin-top:20px}
        //    .olymhpstryWrapper{padding:15px;background:#fff;box-shadow:0 0 5px 0 #00000026}
        //    .olymhpstryInner{display:flex;justify-content:space-between;margin-bottom:12px}
        //    .olymhpstryInner .storyLeft{width: 100%;display: block; padding: 0;list-style: none; margin: 0;}
        //    .olymhpstryInner .storyLeft li {padding: 15px 0;border-bottom: 1px solid #DADADA;}
        //    .olymhpstryInner .storyLeft li:first-child {padding-top: 0;}
        //    .olymhpstryInner .storyLeft li a{display:flex;}
        //    .olymhpstryInner .storyLeft li .imgbox{width:88px;height:68px;flex-shrink:0}
        //    .olymhpstryInner .storyLeft li .imgbox img{display:block;width:100%;height:100%}
        //    .olymhpstryInner .storyLeft li .text{font-size:13px;color:#111;line-height:20px;font-weight:400;width:100%;margin:0}
        //    .olymhpstryInner .storyLeft li:last-child{margin:0}
      `}</style>
    </>
  );
};
export default IMHMobile;
