import React, { useRef, useEffect, useState, useContext } from "react";
import getConfig from "next/config";

import SiteAd from "widgets/Common/Responsive/SiteAd";
import { useInView } from "react-intersection-observer";
import Head from "next/head";

import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import 'moment-timezone';

const Bitbnscoins = (props) => {
   const { publicRuntimeConfig } = getConfig();
   // current url
   const { ref, inView, entry } = useInView({
      threshold: 0
   });

   const outBrainUrl = publicRuntimeConfig.siteUrl;
   // let getStock = useParams();
   const getStockNm = props.topPriorityData.coins || 'BTC'; //getStock.coin;
   const coin = getStockNm;
   // let type = 1; //getStock.type;
   // DAY - 1
   // WEEK - 4
   // MONTH - 6
   // YEAR - 10
   const [getStockName, setGetStockName] = useState(getStockNm);

   const [coinData, setCoinData] = useState([]);
   const [error, setError] = useState(false);
   const [q, setQ] = useState("");
   const finalData = [];
   let dateGraph;

   const [news, setNews] = useState([]);
   const [type, setType] = useState(1);
   let num = 1;
   const [pvalue, setPvalue] = useState(0);

   const [orderBookData, setOrderBookData] = useState([]);
   const [orderBookError, setOrderBookError] = useState(false);

   const [tradeData, setTradeData] = useState([]);
   const [tradeDataError, setTradeDataError] = useState(false);
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
         // console.log("error:", e);
      }
   };

   const getCoinData = async (getStockName, type) => {
      setType(type);
      const url = `https://bitbns.com/graphData/?coin=${getStockName}&market=INR&graphType=${type}`;
      try {
         const d = type == "1" ? "Daily" : type == "4" ? "Weekly" : type == "6" ? "Monthly" : "Yearly";
         ga('send', 'event', d, 'Click', 'Bitbns');
         const coinResponse = await fetch(url);
         const data = await coinResponse.json();

         const databd = data[0]['data'];
         const filterData = databd.filter((d) => d.time < parseInt(Date.now() / 1000)).reverse();
         const first = filterData[0];
         // console.log('first ', first.close);

         const last = filterData[filterData.length - 1];
         // console.log('last ', last.close);
         // (((item[data]["last_traded_price"] - item[data]["yes_price"]) / item[data]["yes_price"]) * 100).toFixed(2)
         const pv = (((last.close - first.close) / first.close) * 100).toFixed(2);
         setPvalue(pv);
         filterData.map((e) => {
            try {
               //console.log(type);
               e.close = Number(e.close);
               e.high = Number(e.high);
               e.low = Number(e.low);
               e.open = Number(e.open);

               const getTT = e.time * 1000;
               if (type === 1) {
                  dateGraph = moment(getTT).format('DD MMM YYYY hh:mm a');
               } else {
                  dateGraph = moment(getTT).format('DD MMM YYYY hh:mm a');
               }
               const fData = {
                  close: e.close,
                  high: e.high,
                  low: e.low,
                  open: e.open,
                  vol: e.vol,
                  time: dateGraph
               };
               finalData.push(fData);
            } catch (err) {
               setError(e);
            }
         });

         setCoinData([finalData]);
         setError(false);
      } catch (e) {
         setError(true);
         console.log("error:", e);
      }
   };

   const getOrderBookData = async () => {
      const apiUrl = `https://bitbns.com/exchangeData/orderbook?market=INR&coin=${coin}`;
      try {
         const orderBookResponse = await fetch(apiUrl);
         const mDdata = await orderBookResponse.json();
         const newObj = objSlice(mDdata, 30);
         // console.log("orderBookResponse..... ", newObj.bids);
         setOrderBookData([newObj]);
         setOrderBookError(false);
      } catch (e) {
         setOrderBookError(true);
         // console.log("error:", e);
      }
   };

   const getTradeData = async () => {
      const apiUrl = `https://bitbns.com/exchangeData/tradedetails/?market=INR&coin=${coin}`;
      try {
         const tradeResponse = await fetch(apiUrl);
         const mDdata = await tradeResponse.json();
         const newObj = objSlice(mDdata, 15);
         // console.log(newObj);
         setTradeData([newObj]);
         setTradeDataError(false);
      } catch (e) {
         setTradeDataError(true);
         // console.log("error:", e);
      }
   };

   const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR'
      }).format(value);

   useEffect(() => {
      getCoinData(getStockName, type);
      getMarketData();
      getOrderBookData();
      getTradeData();
      setInterval(() => {
         // console.log('INTRVAL'); //getCoinData(getStockName, type);
         getMarketData();
         getOrderBookData();
         getTradeData();
      }, 20000);
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
         <div className="bitbns_main">
            <div className="row container jus_center">
               <div className="bns_left">
                  <div className="brdacrum">
                     <a href="/">Hindi News</a> » <a href="/tag/">Tag</a> » <a href={`/tag/cryptocurrency/`}> Cryptocurrency</a>  » <a href={`news/business/cryptocurrency/bitcoin-price-in-india-today-inr/`}> Market</a> » {getStockName}
                  </div>

                  <div className="clearfix add cat-top-ad">
                     <div className="addinner-box">
                        {/* <span id="first">Advertisement</span> */}
                        <SiteAd
                           slotId={`mobile_atf_320`}
                           adUnit={props.data.pageAds.header_ATF_320}
                           sizes={[
                              [300, 250],
                              [336, 280]
                           ]}
                           width={336}
                           height={280}
                        />
                     </div>
                  </div>
                  <div className="vsp16 clearfix"></div>

                  <div className="bitbns-container">
                  <span className="heading"><em>{getStockName}</em><a href="https://bitbns.com/trade/#/login/" target="_blank" className="tradenow_btn" onClick="ga('send', 'event', 'trade_now', 'Click', 'Bitbns')">Trade Now</a></span>
                     <div className="search_bar">
                        <input type="search" name="search-form" placeholder="Search Coin" value={q} onChange={(e) => setQ(e.target.value.toUpperCase())} />
                        <button className="search_btn">&nbsp;</button>
                        {news.map((item, i) => (
                           <ul className={q != '' ? "show" : "hide"}>
                              {Object.keys(item).filter((i) => i.includes(q)).map((data, index) => (<>
                                 <li>{data.value !== '' ? <a href={`/news/business/cryptocurrency/trade-bitcoin/${data.toLowerCase()}/`} className="" rel="noreferrer" onClick="ga('send', 'event', 'cryptopage_search', 'Click', 'Bitbns')">{data}</a> : "No record"}</li>
                              </>))}
                           </ul>))}
                     </div>

                     <div className="graph_row">
                        <div className="graph">
                           <div>
                              {coinData.map((item, i) => (
                                 <div key={i}>

                                    <div style={{ width: '100%', height: 300 }}>
                                       <ResponsiveContainer>
                                          <AreaChart
                                             data={item}
                                             margin={{
                                                top: 20,
                                                bottom: 20,
                                             }}
                                          >
                                             <defs>
                                                <linearGradient
                                                   id="colorUv"
                                                   x1="0"
                                                   y1="0"
                                                   x2="0"
                                                   y2="1"
                                                >
                                                   <stop
                                                      offset="5%"
                                                      stopColor="#A435FF"
                                                      stopOpacity={0.6}
                                                   />
                                                   <stop
                                                      offset="95%"
                                                      stopColor="#3C0F62"
                                                      stopOpacity={0}
                                                   />
                                                </linearGradient>
                                             </defs>

                                             <YAxis
                                                orientation={"right"}
                                                type="number"
                                                padding={{
                                                   top: 0,
                                                   bottom: 15,
                                                }}
                                                domain={['dataMin', 'dataMax']}
                                             />

                                             <XAxis

                                                dataKey="time"
                                                axisLine={false}
                                                tickLine={false}
                                                interval="preserveStartEnd"
                                                stroke="#82ca9d"
                                                allowDuplicatedCategory={false}
                                                minTickGap={35}
                                                tickFormatter={type == 1 ? (unixTime) => moment(unixTime).format('hh:mm a') : (unixTime) => moment(unixTime).format('DD MMM, YYYY')}
                                             />
                                             <Tooltip itemStyle={{ color: "blue" }}
                                                labelStyle={{ color: "green" }}
                                             />
                                             <Area
                                                type="monotone"
                                                dataKey="close"
                                                stroke="#C882FF"
                                                fillOpacity={0.7}
                                                fill="url(#colorUv)"
                                             />

                                          </AreaChart>
                                       </ResponsiveContainer>

                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                        {news.map((item, i) => (
                           <div className="graph_bottom">
                              {Object.keys(item).filter((i) => i.includes(getStockName)).map((data, index) => (<>
                                 <div className="price_row">
                                    <span className="today_price">{numberFormat(item[data]["last_traded_price"])}</span>
                                    <ul className="volumes">
                                       <li>
                                          <span className="day_volume">{type == 1 ? "24H" : type == 4 ? "1W" : type == 6 ? "1M" : "1Y"}</span>
                                          <span className={pvalue > 0 ? "day_price arrow green" : "day_price arrow red"}>{pvalue}%</span>
                                       </li>
                                       <li>
                                          <span className="day_volume">High</span>
                                          <span className="day_price">{numberFormat(item[data].volume["max"])}</span>
                                       </li>
                                       <li>
                                          <span className="day_volume">Low</span>
                                          <span className="day_price">{numberFormat(item[data].volume["min"])}</span>
                                       </li>
                                       <li>
                                          <span className="day_volume">Volume</span>
                                          <span className="day_price"> {item[data].volume["volume"].toFixed(4)}</span>
                                       </li>
                                    </ul>
                                 </div>
                                 {/* {()=> {getCoinData(getStockName, 1)}} */}
                                 <div className="time">
                                    <button onClick={() => { getCoinData(getStockName, 1); ga('send', 'event', 'Daily', 'Click', 'Bitbns'); }} className={type == 1 ? "active" : ""}>1D</button>
                                    <button onClick={() => { getCoinData(getStockName, 4); ga('send', 'event', 'Weekly', 'Click', 'Bitbns'); }} className={type == 4 ? "active" : ""}>1W</button>
                                    <button onClick={() => { getCoinData(getStockName, 6); ga('send', 'event', 'Monthly', 'Click', 'Bitbns'); }} className={type == 6 ? "active" : ""}>1M</button>
                                    <button onClick={() => { getCoinData(getStockName, 10); ga('send', 'event', 'Yearly', 'Click', 'Bitbns'); }} className={type == 10 ? "active" : ""}>1Y</button>
                                 </div>
                              </>
                              ))}
                           </div>

                        ))}

                     </div>
                     <div className="data-table">
                        <div className="row jus_center">
                           <div className="col6">
                              {
                                 orderBookData && orderBookData.map((item, j) => (

                                    <div key="trade-section" className="table">
                                       <span className="table_heading">
                                          Order book
                                       </span>
                                       <table className="bitbns-order-table">
                                          <tbody>
                                             <tr>
                                                <th>VOLUME - {getStockName}</th>
                                                <th>BUY PRICE - INR</th>
                                                <th>SELL PRICE - INR</th>
                                                <th>VOLUME - {getStockName}</th>
                                             </tr>
                                             {
                                                item.bids.slice(0, 15).map((data, index) => {
                                                   return (
                                                      <>
                                                         <tr>
                                                            <td>{data[1]}</td>
                                                            <td className="green">{`${numberFormat(data[0])}`}</td>
                                                            <td className="red"> {`${numberFormat(item.asks[index][0])}`}</td>
                                                            <td> {item.asks[index][1].toFixed(4)}</td>
                                                         </tr>
                                                      </>
                                                   );
                                                })
                                             }
                                          </tbody>
                                       </table>
                                    </div>

                                 ))
                              }
                           </div>
                           <div className="col6">

                              {
                                 tradeData.map((item, j) => (

                                    <div key="trade-section" className="table">
                                       <span className="table_heading">
                                          Trade History
                                          {/* <a href="javascript:void(0)" className="icon">?</a> */}
                                       </span>
                                       <table className="bitbns-trade-table">
                                          <tbody>
                                             <tr>
                                                <th>TIME</th>
                                                <th>VOLUME - {getStockName}</th>
                                                <th>PRICE - INR</th>
                                             </tr>
                                             {

                                                Object.keys(item).reverse().map((data, index) => {

                                                   const date = new Date(item[data].timestamp);
                                                   const tradeTime = moment(item[data].timestamp * 1000).format('HH:mm:ss');

                                                   const lastTradedPrice = item[data].price;
                                                   let flag;
                                                   if (lastTradedPrice > num) {
                                                      flag = "arrow green";
                                                   } else if (lastTradedPrice == num) {
                                                      flag = "zero";
                                                   } else {
                                                      flag = "arrow red";
                                                   }
                                                   num = lastTradedPrice;

                                                   return (
                                                      <>
                                                         <tr>
                                                            <td>{tradeTime}</td>
                                                            <td>{item[data].base_volume.toFixed(4)}</td>
                                                            <td><span className={`${flag}`}>{`${numberFormat(item[data].price)}`}</span></td>
                                                         </tr>
                                                      </>
                                                   );

                                                })
                                             }
                                          </tbody>
                                       </table>
                                    </div>

                                 ))
                              }

                           </div>
                        </div>
                     </div>

                     <div className="clearfix add cat-top-ad">
                        <div className="addinner-box">
                           {/* <span id="first">Advertisement</span> */}
                           <SiteAd
                              slotId={`mobile_btf_320`}
                              adUnit={props.data.pageAds.BTF_300}
                              sizes={[
                                 [300, 250],
                                 [336, 280]
                              ]}
                              width={300}
                              height={250}
                              lazyload={true}
                           />
                        </div>
                     </div>
                     <div className="vsp16 clearfix"></div>

                  </div>
               </div>
            </div>
         </div>
         <style jsx global>{`
         .show{
            display:block;
         }
         .hide{
            display:none;
         }
         .brdcrm{padding:4px 16px;color:#000;font-size:12px;border-bottom:1px solid rgba(0,0,0,.1);background-position:#fff;font-weight:700}.brdcrm a{color:#757575;font-weight:400}.brdcrm a span{margin: 0 4px;}.add,.add2{background:#dbdde3;position:relative;padding:16px 0;line-height:0;text-align:center}
         `}</style>

      </>
   );
};
export default React.memo(Bitbnscoins);
