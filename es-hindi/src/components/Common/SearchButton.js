import HindiGlobalContext from "HindiGlobalContext";
import React, { useContext } from "react";

const SearchButton = ({pageType,isMobile=false})=>{
    const { setSearchBar } = useContext(HindiGlobalContext);
    return(
        <>
        <button className="smsrch_btn" onClick={()=>setSearchBar(pageType)}><span className="icnsrch"></span>{!isMobile ? "Search" : ""}</button>
        <style jsx>{`
        .smsrch_btn {
            background-color: #ED1C24;
            color: #fff;
            border-radius: 20px;
            width: 94px;
            height: 26px;
            border: 0;
            position: absolute;
            right: 0;
            display: flex;
            justify-content: center;
            column-gap: 9px;
            align-items: center;
            font-size: 14px;
            cursor: pointer;
        }
        .icnsrch{            
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 11px;
            height: 11px;
            border: 2px solid;
            border-radius: 100%;
            margin-left: -4px;
            margin-top: -4px;;
        }
        .icnsrch:before{
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            border-radius: 3px;
            width: 2px;
            height: 6px;
            background: currentColor;
            transform: rotate(-45deg);
            top: 6px;
            left: 8px;
        }
        @media (max-width:768px){
            .smsrch_btn{
                top: ${pageType==="byline"?"20px":"12px"};
                right: 25px;
                width: fit-content;
                background: transparent;
            }
        }
        `}</style>
        </>
    )
}
export default  SearchButton;