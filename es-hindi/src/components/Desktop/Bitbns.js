import React, { useRef, useEffect, useState, useContext } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import getConfig from "next/config";
import { useInView } from "react-intersection-observer";
import Head from "next/head";

const Bitbns = (props) => {
   const { publicRuntimeConfig } = getConfig();
   // current url
   const { ref, inView, entry } = useInView({
      threshold: 0
   });

   // const router = useRouter()

   const handleClick = (e, path) => {
      e.preventDefault();
      ga('send', 'event', 'marketpage_search', 'Click', "Bitbns");
      window.open(path, "_blank");
   };

   /**
  * API for Page
  */
   const outBrainUrl = publicRuntimeConfig.siteUrl;
   const [news, setNews] = useState([]);
   const [error, setError] = useState(false);
   const [q, setQ] = useState("");

   /**
    * fUNCTION FOR oBJECT sLICE
    */
   function objSlice(obj, lastExclusive) {
      const filteredKeys = Object.keys(obj).slice(0, lastExclusive);
      const newObj = {};
      filteredKeys.forEach(function (key) {
         newObj[key] = obj[key];
      });
      return newObj;
   }
   //   var newObj = objSlice(obj, 2);

   const getMarketData = async () => {
      const apiUrl = 'https://bitbns.com/order/fetchTickersWithImages/';
      try {
         const marketResponse = await fetch(apiUrl);
         const mDdata = await marketResponse.json();
         const newObj = objSlice(mDdata, 30);
         // console.log(newObj);
         setNews([newObj]);
         setError(false);
      } catch (e) {
         setError(true);
         console.log("error:", e);
      }
   };

   const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR'
      }).format(value);

   useEffect(() => {
      getMarketData();
      setInterval(() => { getMarketData(); }, 20000);
   }, []);

   return (
      <>
         <Head>
            <link
               href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700&display=swap"
               rel="stylesheet"
            />
            <link rel="stylesheet" type="text/css" href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/bitbns/css/style.css"></link>
         </Head>
         <div className="bitbns_main hindibns outer">
            <div className="row container jus_center section-blog clearfix">
               <div className="bns_left leftwrap section-blog-left ">
                  <div className="brdacrum">
                     <a href="/">Hindi News</a> » <a href="/tag/">Tag</a> » <a href={`/tag/cryptocurrency/`}> Cryptocurrency</a> » Market
                  </div>

                  <div className="bitbns-container">

                     <span className="heading"><em>Market</em></span>
                     <div className="search_bar">
                        <input type="search" name="search-form" placeholder="Search Coin" value={q} onChange={(e) => setQ(e.target.value.toUpperCase())} />
                        <button className="search_btn">&nbsp;</button>
                     </div>
                     <div >
                        {news.map((item, i) => (

                           <div key={i} className="data-table">
                              <table className="bitbns-market-table">
                                 <tbody id="tblData">
                                    <tr>
                                       <th>कॉइन का नाम (कोड)</th>
                                       <th>कीमत</th>
                                       <th>24H %</th>
                                       <th>(24 घंटे में) High</th>
                                       <th>(24 घंटे में) Low</th>
                                       <th>मार्केट कैप</th>
                                       {/* <th>कॉइन खरीदें</th> */}
                                    </tr>

                                    {Object.keys(item).filter((i) => i.includes(q)).map((data, index) => (

                                       <tr key={index} onClick={(e) => handleClick(e, '/news/business/cryptocurrency/trade-bitcoin/' + data.toLowerCase())}>

                                          <td className="icon" width="30%"><i><img src={item[data].image} alt={item[data].volume["volume"]} height="20" width="20"></img></i> {data}</td>
                                          <td> {numberFormat(item[data]["last_traded_price"])}</td>
                                          <td> <span className={((((item[data]["last_traded_price"] - item[data]["yes_price"]) / item[data]["yes_price"]) * 100).toFixed(2)) > 0 ? "arrow green" : "arrow red"}>{(((item[data]["last_traded_price"] - item[data]["yes_price"]) / item[data]["yes_price"]) * 100).toFixed(2) + '%'} </span></td>
                                          <td><span className="">{numberFormat(item[data].volume["max"])}</span></td>
                                          <td className="green">{numberFormat(item[data].volume["min"])}</td>
                                          <td className="volume"> {item[data].volume["volume"]}</td>

                                       </tr>

                                    ))
                                    }
                                 </tbody>
                              </table>
                           </div>
                        ))
                        }
                     </div>
                  </div>

               </div>
               {/* <div className="bns_right rightwrap"> */}
               <RhsCommon
                  pageAds={props.pageAds}
                  currentURL={outBrainUrl}
                  photoStories={props.photoStories}
                  topStories={props.topStories}
                  astroStories={props.astroStories}
                  section="microsite"
               />
               {/* </div> */}
            </div>
         </div>

         <style jsx global>
            {`.brdacrum{font-size:14px;color:#404040;line-height:18px;font-weight:700;margin:5px 0 15px 0}.brdacrum h1{display:inline-block;font-size:14px;}.brdacrum a{color:#404040;font-weight:400;margin-right:2px}`}</style>

      </>
   );
};
export default React.memo(Bitbns);
