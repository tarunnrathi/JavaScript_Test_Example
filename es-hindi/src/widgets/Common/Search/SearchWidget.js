import { getRedisDataByKey } from "api/global/Common";
import React, { useEffect, useState } from "react";
import Search from "widgets/Common/Search";

const SearchWidget = ({ isMobile }) => {
    const [data, setData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const fetchLatestData = () => {
        getRedisDataByKey("new_fms_system", "KHABARN18-", true).then(res => {
            const data = res?.footer_headings || [];
            setData(data.slice(0, 1));
        })
    };

    useEffect(() => {
        fetchLatestData();
    }, []);
    return (<>
        <div className="srchbx_wr">
            <div onClick={() => setShowSearch(true)} className="srblh">
                <h3>आप यहाँ से भी सर्च कर सकते है</h3>
                <div className="srchbar">
                    <input disabled={true} type="text" name="" placeholder="Search here..." />
                    <div className="srch_btnn">Search</div>
                    <button className="srch_icn"></button>
                </div>
                {/* <span className="subtxt">Example: Modi, Amitabh Bachchan, Anand Ambani Wedding…</span> */}
            </div>
            {data.map((itm, index) => (<div className="srbrg" key={index}>
                <h3>{itm.heading}</h3>
                <ul className="trtabs">
                    {(itm?.data || []).map((item, index) => <li key={itm.heading + index}>
                        <a href={item.text_url}>{item.text_name}</a>
                    </li>

                    )}
                </ul>
            </div>))}
        </div>
        {showSearch && <Search isMobile={isMobile} pageType={"not-found"} handleClose={() => setShowSearch(false)} />}
        <style jsx>{`
                    input[disabled] {
                        pointer-events:none;
                        cursor: pointer;
                    }

                    .srchbx_wr {display: flex; border: 1px solid #E5E5E5; background-color: #F8F8F8;padding: 20px; margin-top: 20px;}
                    .srchbx_wr > div { width: 50%;}
                    .srchbx_wr h3 { font-size: 16px; line-height: 27px; font-weight: bold;  color: #000; margin: 0 0 15px;}
                    .srchbar {  display: flex; margin-bottom: 10px;     position: relative;}
                    .srchbar input { background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #A5A5A5; border-radius: 50px 0 0 50px; height: 45px; padding: 10px 40px; width: 100%;}
                    .srch_btnn { background: #EB1B20 0% 0% no-repeat padding-box; border-radius: 0px 50px 50px 0px; padding: 10px 20px; height: 45px; color: #fff;}
                    .srbrg {padding: 0 0 0 32px;}
                    .srblh {padding: 0 32px 0 0;    position: relative;}
                    .srblh:after {content: ""; background-color: rgb(113 113 113 / 20%); width: 2px; position: absolute; right: 0; height: 100px; top: 0; bottom: 0; margin: auto;}
                    .subtxt {font-size: 14px;color: #898989;line-height: 23px;}
                    .trtabs li {cursor: pointer; display: inline-block;border: 1px solid#707070;border-radius: 40px;font-size: 12px; line-height: 28px; color: #333333;background-color: #fff; padding: 0px 15px;margin: 0px 10px 17px 0;    font-weight: bold;}
                    .trtabs li.active {background-color: #EB1B20; color: #fff; border-color: #EB1B20;}
                    .srch_icn{ display: block; transform: scale(var(--ggs,1));  width: 14px;height: 14px; border: 2px solid; border-radius: 100%; margin-left: -4px; margin-top: -4px; position: absolute; top: 18px;left: 23px;background-color: #fff; border-color: #00000080;}
                        .srch_icn::after { content: ""; display: block; box-sizing: border-box; position: absolute; border-radius: 3px;width: 2px; height: 6px;background: #707070;transform: rotate(-45deg);top: 8px;left: 11px;}

                    @media (max-width:768px){
                        .srchbx_wr {padding: 10px;display: block;}
                        .srchbx_wr > div{width: 100%;}
                        .srblh:after{display: none;}
                        .srblh{border-bottom: 1px solid rgb(113 113 113 / 20%);padding: 0 0 15px; margin-bottom: 15px;}
                        .srbrg{padding-left: 0;}
                        .subtxt{font-size: 12px;line-height: 20px;}
                        .srch_btnn { padding: 10px 20px;}
                    }
                `}</style>
    </>);
};

export default SearchWidget;