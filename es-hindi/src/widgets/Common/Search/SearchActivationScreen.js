    import { getRedisDataByKey } from "api/global/Common";
import { logEventNew } from "includes/googleAnalytic";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const SearchActivationScreen = ({ handleSearch, isMobile,pageType, setSuggestionList }) => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [history, setHistory] = useState([]);

    const fetchLatestData = () => {
        getRedisDataByKey("new_fms_system", "KHABARN18-", true).then(res => {
            setLoader(false);
            const data = res?.footer_headings || [];
            setData(data.slice(0,2));
        })
    };
    const handleClearAll = (index) => {
        logEventNew("Search Button", "click", `${pageType}, हाल की खोज - Delete ,${isMobile ? "mobile" : "desktop"}`)
        localStorage.removeItem("searchItem");
        setHistory([])
    }
    const handleDelete = (index) => {
        let searchItem = JSON.parse(localStorage.getItem("searchItem") || "[]");
        searchItem.splice(index, 1);
        setHistory(searchItem.reverse())
        localStorage.setItem("searchItem", JSON.stringify(searchItem))
    }
    useEffect(() => {
        fetchLatestData();
        let searchItem = JSON.parse(localStorage.getItem("searchItem") || "[]");
        if(searchItem.length > 0) {
            setHistory(searchItem.reverse());
        }

    }, []);
    return(<>
        <div className="actv_wrap" onClick={setSuggestionList}>
        {loader ? <Skeleton width={isMobile ? 320 : 1000} height={isMobile ? 600: 500} /> : <>
            {history.length > 0 && <div className="actv_lhs">               
                {/* <span>History</span>
                <span onClick={handleClearAll}>Clear All</span> 
                 */}
                 <h3>सर्च हिस्ट्री <span onClick={handleClearAll} className="sdel search_delete_history"></span></h3>
                {history.map((itm, index) => (                
                    itm ? <li>
                        <p className="stxt" onClick={() => handleSearch({ value: itm })}>{itm}</p> <p className="scloseact" onClick={() => handleDelete(history.length - 1 -index)}></p>
                    </li> : null
                ))}  
            </div>}
            <div className="actv_rhs">
            {data.map(itm => (<div className="actv_rhs_inner">
                    <h3 className={itm.heading === "ट्रेंडिंग टॉपिक"?"search_trending_topic":"search_popular_topic"}>{itm.heading}</h3>
                    {(itm?.data || []).map((item,index) =>  (
                        <>
                            <li key={itm.heading+index}>
                                <a onClick={() => logEventNew("Search Button", "click", `${pageType}, ${itm.heading}: ${item.text_name}  ,${isMobile ? "mobile" : "desktop"}`)} href={item.text_url} className={itm.heading === "ट्रेंडिंग टॉपिक"?"search_trending_topic":"search_popular_topic"}>{item.text_name}</a>
                            </li>
                        </>
                    ))}</div>
                    ))}
                    </div>
        </>}
        </div>
        <style jsx>{`
            .actv_rhs_inner {
                margin-bottom: 30px;
            }
            .actv_wrap {
                display: flex;
                justify-content: start;
            }
            .actv_lhs {
                width: 400px;
                background-color: #F1F1F1;
                border-radius: 10px;
                padding: 20px 25px;
            }
            .actv_wrap h3{
                font-size:16px;
                line-height: 27px;
                border-bottom: 1px solid #7070705e;
                padding-bottom: 10px;
                color: #E1261D;
                padding-bottom: 10px;
                margin-bottom: 20px;
                position: relative;
            }
            .actv_lhs li {
                font-size: 16px;
                line-height: 27px;
                color: #747474;
                font-weight: normal;
                padding-left: 25px;
                position: relative;
            }
            .actv_lhs li:before {
                content: "";
                background-image: url(/images/search-results/rs.svg);
                width: 12px;
                height: 12px;
                position: absolute;
                top: 9px;
                left: 0;
                display: block;
                background-repeat: no-repeat;
            }
            .actv_rhs {
                width: auto;
                padding: 20px 0;
            }
            .actv_rhs h3 {
                border-bottom: 0;
                margin-top: 20px;
                margin: 0 0 0 8px;
            }
            .actv_rhs li {
                cursor: pointer;
                display: inline-block;
                border: 1px solid #707070;
                border-radius: 40px;
                font-size: 14px;
                line-height: 23px;
                color: #333333;
                background-color: #fff;
                padding: 2px 15px;
                margin: 12px 10px;
            }
            .actv_rhs li:hover .scloseact{
                background-image: url(/images/search-results/delete.svg); 
                width: 17px;
                height: 17px;
                position: absolute;
                top: 5px;
                right: 0;
                background-size: 70%;
                background-repeat: no-repeat;
            }
            .stxt{
                cursor: pointer;
                padding-right:20px;
            }
            .scloseact {
                cursor: pointer;
                box-sizing: border-box;
                position: relative;
                display: block;
                transform: scale(var(--ggs,1));
                width: 22px;
                height: 22px;
                border: 2px solid transparent;
                border-radius: 40px;
                position: absolute;
                right: 0;
                top: 2px;
            }
               
            .scloseact::after,
            .scloseact::before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
                width: 13px;
                height: 2px;
                background: #707070;
                transform: rotate(45deg);
                border-radius: 5px;
                top: 8px;
                left: 1px;
            }
            
            .scloseact::after {
                transform: rotate(-45deg)
            } 
            .sdel{
                cursor: pointer;
                background-image: url(/images/search-results/delete.svg); 
                width: 17px;
                height: 17px;
                position: absolute;
                top: 5px;
                right: 0;
                background-repeat: no-repeat;
            }
            @media (max-width: 768px) {
                .actv_wrap {flex-wrap: wrap;}
                .actv_lhs{background: transparent; padding: 0px 20px;}
                .actv_wrap h3{padding-bottom: 8px;  margin-bottom: 10px;}
                .actv_lhs li.{margin: 0 15px;}
                .actv_rhs{padding: 20px;}
                .actv_rhs h3{
                    margin: 0;
                    border-bottom: 1px solid#7070705e;
                }
                .scloseact{
                    // background-image: url(/images/search-results/delete.svg); 
                    width: 17px;
                    height: 17px;
                    position: absolute;
                    top: 5px;
                    right: 0;
                    background-size: 70%;
                    background-repeat: no-repeat;
                }
                .actv_rhs li{margin: 12px 12px 5px 0;}
            }
        `}</style>
    </>)
};

export default SearchActivationScreen;