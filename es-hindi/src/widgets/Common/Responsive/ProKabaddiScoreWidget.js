import React from "react";
// import fetchUtility from "includes/sFetchUtility";
// import getConfig from "next/config";
// import Glide from "@glidejs/glide";

// const { publicRuntimeConfig } = getConfig();

const ProKabaddiScoreWidget =
  (/* { isMobile = false, prokabaddiData = [] } */) => {
    return null;
    // const teamNames = {
    //   "dabang-delhi-kc": "दबंग दिल्ली केसी",
    //   "bengal-warriors": "बंगाल वारियर्स",
    //   "up-yoddha": "यूपी योद्धा",
    //   "u-mumba": "यू मुंबा",
    //   "haryana-steelers": "हरियाणा स्टीलर्स",
    //   "bengaluru-bulls": "बेंगलुरू बुल्स",
    //   "jaipur-pink-panthers": "जयपुर पिंक पैंथर्स",
    //   "patna-pirates": "पटना पायरेट्स",
    //   "gujarat-giants": "गुजरात जायंट्स",
    //   "puneri-paltan": "पुणेरी पलटन",
    //   "telugu-titans": "तेलुगू टाइटंस",
    //   "tamil-thalaivas": "तमिल थलाइवाज",
    //   "...": "..."
    // };

    // const [kabaddiData, setKabaddiData] = useState(() => {
    //   const dummy = {
    //     "status": "...",
    //     "matchno": "...",
    //     "matchtype": null,
    //     "date": "00/00/0000",
    //     "matchTime": "..:..",
    //     "result": "...",
    //     "matchId": "...",
    //     "venue": "..., ..., ...",
    //     "scorePageUrl": "#",
    //     "a": {
    //       "fullName": "...",
    //       "name": "...",
    //       "slug": "...",
    //       "image": "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
    //     },
    //     "b": {
    //       "fullName": "...",
    //       "name": "...",
    //       "slug": "...",
    //       "image": "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
    //     },
    //     "type": "upcoming",
    //     "teama_score": "...",
    //     "teamb_score": "...",
    //     "winningteam_id": "..."
    //   };

    //   return new Array(isMobile ? 1 : 4).fill(dummy);
    // });
    // const [liveScoreData, setLiveScoreData] = useState({});
    // const [isDataUpdate, dataUpdate] = useState(false);

    // const getLiveMatchData = async (matchId) => {
    //   const data = await fetchUtility(`${publicRuntimeConfig.}/livekabaddiscore?matchid=${matchId}`, {});
    //   if(data && data.matchId) {
    //     const { matchId = "", teama_score, teamb_score, status } = data;
    //     setLiveScoreData({
    //       ...liveScoreData,
    //       [matchId]: {
    //         matchId, teama_score, teamb_score, liveMatchStatus: status
    //       }
    //     });

    //     const slides = new Array(...document.querySelectorAll(`.slide_${matchId}`));

    //     slides[1].innerHTML = slides[0].innerHTML;
    //   }
    // };

    // useEffect(() => {
    //   setTimeout(() => {
    //     if(prokabaddiData && prokabaddiData.length) {
    //       setKabaddiData([]);
    //       setKabaddiData([...prokabaddiData]);

    //       setInterval(() => prokabaddiData.map((ele) => {
    //         ele.type == "live" && ele.matchId && getLiveMatchData(ele.matchId);
    //       }), 5000);

    //       if (document.querySelector(".pkbdsldr-in")) {
    //         const glide = new Glide(document.querySelector(".pkbdsldr-in"), {
    //           // autoplay: 6000,
    //           type: "carousel",
    //           perView: 4,
    //           gap: 0,
    //           slidesToScroll: 1,
    //           breakpoints: {
    //             600: {
    //               perView: 1.2,
    //               focusAt: 'center',
    //             }
    //           }
    //         });

    //         glide.mount();

    //         glide.on('mount.after', () => {
    //           // Logic fired after mounting
    //           setInterval(() => {
    //             glide.destroy();
    //             glide.mount();
    //           }, 5000);
    //         });
    //       }

    //       dataUpdate(true);
    //     }
    //   }, 3000);
    // }, []);

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // return (
    //   <>
    //     <div className="pkbdsldr">
    //       <h2>
    //         <a href={"https://hindi.news18.com/pro-kabaddi-league/"}>
    //           <span>प्रो कबड्डी 2021</span>
    //         </a>
    //       </h2>
    //       <div className="pkbdsldr-in">
    //         <div className="slider__track" data-glide-el="track">
    //           <ul>
    //             {
    //               kabaddiData && kabaddiData.length ? (
    //                 kabaddiData.map((ele, index) => {
    //                   return (
    //                   <li key={index} className={`slide_${ele.matchId}`}>
    //                     <a href={`https://hindi.news18.com/${ele.scorePageUrl || 'pro-kabaddi-league'}`}>
    //                       <div className="mtchdtls">
    //                         {ele.matchno || "Match 1"} | {ele.date == "00/00/0000" ? ele.date : (new Date(ele.date?.split(",")?.[0] || "")).toLocaleDateString("hi-IN", options)} |{" "}
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="16"
    //                           height="16"
    //                           viewBox="0 0 24 24"
    //                           fill="#425673"
    //                         >
    //                           <path d="M0 0h24v24H0z" fill="none"></path>
    //                           <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
    //                         </svg>{" "}
    //                         {ele.matchTime || "20:30"} (IST)
    //                       </div>
    //                       <div className="mtchtm">
    //                         <div className="mtchtmlg">
    //                           {
    //                             ele.type == 'upcoming' ? (
    //                               <img
    //                                 src={ele.a?.image || "https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/bengaluru-bulls.png"}
    //                                 title={teamNames[ele.a?.slug] || "बेंगलुरू बुल्स"}
    //                                 alt={teamNames[ele.a?.slug] || "बेंगलुरू बुल्स"}
    //                               />
    //                             ) : (
    //                               <div className={`mtchtmcrcl ${
    //                                 ele.type == "live" && liveScoreData[String(ele.matchId || 0)]?.teama_score ?
    //                                 (liveScoreData[String(ele.matchId || 0)]?.teama_score >= liveScoreData[String(ele.matchId || 0)]?.teamb_score ? "rdcrcl" : "") :
    //                                 (ele.teama_score >= ele.teamb_score ? "rdcrcl" : "")
    //                               }`}>{ele.type == "live" && liveScoreData[String(ele.matchId || 0)]?.teama_score ? liveScoreData[ele.matchId]?.teama_score : ele.teama_score}</div>
    //                             )
    //                           }
    //                           <h3>{teamNames[ele.a?.slug] || "बेंगलुरू बुल्स"}</h3>
    //                         </div>
    //                         <div className="mtchvs">
    //                           <img
    //                             src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/vs-img.png"
    //                             title=""
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div className="mtchtmlg">
    //                           <h3>{teamNames[ele.b?.slug] || "बेंगलुरू बुल्स"}</h3>
    //                           {
    //                             ele.type == 'upcoming' ? (
    //                               <img
    //                                 src={ele.b?.image || "https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/bengaluru-bulls.png"}
    //                                 title={teamNames[ele.b?.slug] || "बेंगलुरू बुल्स"}
    //                                 alt={teamNames[ele.b?.slug] || "बेंगलुरू बुल्स"}
    //                               />
    //                             ) : (
    //                               <div className={`mtchtmcrcl ${
    //                                 ele.type == "live" && liveScoreData[String(ele.matchId || 0)]?.teamb_score ?
    //                                 (liveScoreData[String(ele.matchId || 0)]?.teamb_score >= liveScoreData[String(ele.matchId || 0)]?.teama_score ? "rdcrcl" : "") :
    //                                 (ele.teamb_score >= ele.teama_score ? "rdcrcl" : "")
    //                               }`}>{ele.type == "live" && liveScoreData[String(ele.matchId || 0)]?.teamb_score ? liveScoreData[ele.matchId]?.teamb_score : ele.teamb_score}</div>
    //                             )
    //                           }
    //                         </div>
    //                       </div>
    //                       <div className="mtchsts">
    //                         {
    //                           ele.type == "live" ? (
    //                             <><span>LIVE</span> | {liveScoreData[String(ele.matchId)]?.liveMatchStatus || ele.status || "HALF TIME"} </>
    //                           ) : (
    //                             ele.type == "upcoming" ? (
    //                               <>Yet to Begin</>
    //                             ) : (
    //                               <>{ele.result || "BENGALURU BULLS BEAT PATNA PIRATES (54-52)"}</>
    //                             )
    //                           )
    //                         }
    //                       </div>
    //                     </a>
    //                   </li>
    //                   );})
    //               ) : ""
    //             }
    //           </ul>
    //         </div>
    //         {
    //           isMobile ? (
    //             <div className="slider__bullets glide__bullets bullets__controls" data-glide-el="controls[nav]">
    //               {
    //                 kabaddiData && kabaddiData.length ? kabaddiData.map((ele, index) => <button key={index} className="slider__bullet glide__bullet slider__button__control" data-glide-dir={`=${index}`}></button>) : ""
    //               }
    //             </div>
    //           ) : (
    //             <div className="pkbdsldrar" data-glide-el="controls">
    //               <button data-glide-dir="<"></button>
    //               <button data-glide-dir=">"></button>
    //             </div>
    //           )
    //         }
    //       </div>
    //     </div>

    //     <style jsx global>{`
    //       .pkbdsldr{font-family: "Mukta",sans-serif;max-width: 1240px;margin: 0 auto; position: relative; background:#F7F7F7; padding:8px 0 10px 0; box-sizing: border-box;  }
    //       .pkbdsldr h2{color: #001536;font-size: 20px; font-weight: bold;margin: 0 20px 2px 20px;line-height: 25px; position: relative;}
    //       .pkbdsldr h2:after{content: ""; position: absolute;border-bottom: 1px dotted #ccd2d9; left: 0; right: 0; bottom: 7px}
    //       .pkbdsldr h2 span{background: #F7F7F7;position: relative; z-index: 1; display: inline-block; padding-right: 3px}
    //       .pkbdsldr-in{margin:0 15px; overflow: hidden;}
    //       .pkbdsldr-in ul{display: flex;}
    //       .pkbdsldr-in ul li { ${isDataUpdate ? "" : (isMobile ? "width: 100%;" :"width : 25%;")} background: #fff; border: 5px solid ${isDataUpdate ? "#E1261D" : "rgba(0,0,0,0.6)"};  box-shadow: 0px 3px 6px #00000029; border-radius: 8px; padding:5px; margin: ${isMobile ? "0;" : "0 5px!important;"} ${isMobile ? "transform: scale(0.97);" : "" }}
    //       .pkbdsldrar button{margin: 0;padding: 0;border: none;background: none;outline: none;width: 12px;height: 12px;position: absolute;top: 50%;margin-top: -6px; left: 0; cursor: pointer;}
    //       .pkbdsldrar button:before{content: "";position: absolute;top: 50%;left: 8px;display: block;border-top: 2px solid #425673;border-left: 2px solid #425673;width: 8px;height: 8px;transform: rotate(-45deg);margin-top: -4px;}
    //       .pkbdsldrar button:last-child{left: auto; right: 0;    transform: rotate(
    //       180deg);}
    //       .pkbdsldr-in ul li .mtchdtls{color: #6C6C6C; font-size: 12px; text-transform: uppercase; text-align: center; margin-bottom: 5px}
    //       .pkbdsldr-in ul li .mtchdtls svg{position: relative;top:3px;}
    //       .pkbdsldr-in ul li .mtchtm{display: flex; justify-content:center; align-items: center; height: 65px; border-top:1px solid #ccd2d9; border-bottom: 1px solid #ccd2d9}
    //       .pkbdsldr-in ul li .mtchtm .mtchtmlg{display: flex;align-items: center;}
    //       .pkbdsldr-in ul li .mtchtm .mtchtmlg img{width: 40px}
    //       .pkbdsldr-in ul li .mtchtm .mtchtmcrcl{width: 40px; height: 40px; line-height: 40px; font-size: 20px; color: #001D42; background:#F0F0F0; border:1px solid #BEBEBE; border-radius: 100%; font-weight: bold; text-align: center;}
    //       .pkbdsldr-in ul li .mtchtm .mtchtmcrcl.rdcrcl{color: #fff; background:#E1261D; border-color: #E1261D; box-shadow: 0px 0px 4px #E1261D}
    //       .pkbdsldr-in ul li .mtchtm h3{ color: #001D42;  font-size: 12px; line-height: 15px; margin-left: 10px; text-align: left;width: 50px}
    //       .pkbdsldr-in ul li .mtchtm .mtchtmlg:last-child h3{margin-right: 10px; margin-left: 0; text-align: right;}
    //       .pkbdsldr-in ul li .mtchtm .mtchvs{text-align: center; width: 50px}
    //       .pkbdsldr-in ul li .mtchtm .mtchvs img{width: 20px; opacity: .5}
    //       .pkbdsldr-in ul li .mtchsts{color: #001D42; font-size: 11px; text-transform: uppercase; text-align: center; margin-top: 5px}
    //       .pkbdsldr-in ul li .mtchsts span{color: #E1261D;}
    //       .bullets__controls {text-align: center;}
    //       .slider__button__control {
    //         margin: 0 5px;
    //         border-style: none;
    //         background-color: rgba(0,0,0,0.2);
    //         width: 6px;
    //         height: 6px;
    //         border-radius: 30px;
    //       }
    //       .glide__bullet--active {
    //         width: 25px;
    //         background-color: #E1261D;
    //       }
    //       .pkbdsldr-in ul li .mtchsts span:before{content:""; width: 6px; height: 6px; background:#E1261D; border-radius: 100%; display: inline-block; position: relative; top:-1px; margin-right: 4px; animation:mtchstslv .5s infinite }
    //       @keyframes mtchstslv{from{background:#fff;}to{background:#E1261D;}}
    //     `}</style>
    //   </>
    // );
  };

export default React.memo(ProKabaddiScoreWidget);
