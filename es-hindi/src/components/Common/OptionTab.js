import React, { useState } from "react";
import { logEvent } from "includes/googleAnalytic";

const OptionTab = ({ head, url, options, updateState, component }) => {

  const [active, setActive] = useState(0);

  const handleClick = (i, item) => {
    setActive(i);
    updateState(item.title, item.rel);
  };
  return (
    <>
      <div className= {component == "photolisting" ? "glbl-insdnav hdr-photos " : "globalhd large dflex justify-space-betwwen"}>
        <h2 className = {component == "photolisting" ? "insdnav-hd subCatListing" : ""}>
          <a href={url}>{head}</a>
        </h2>
        { component == 'business' ?
            <div className="moneycontrol-globalhd">
              <span>Powered by</span>
              <a href="https://www.moneycontrol.com/" rel="nofollow" target="_blank" onClick={() => logEvent('MC_logo', 'Click', 'Homepage')}>
                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/moneycontrol_logo_1591703617.png" alt="moneycontrol-logo"/>
              </a>
            </div>
          : ''
        }
        <ul className={component == "photolisting" ? "insdnav" : "global-sub-nav dflex"}>
          {options.map((item, index) => {
            return (
              <li key={index} className={active == index ? "active" : ""}>
              {item.url ? <a className={component == 'business' ? 'jobsee' : ''} href={item.url} >{item.title}</a> :
                <a className={component == 'business' ? 'jobsee' : ''} onClick={() => handleClick(index, item)} >{item.title}</a>}
              </li>
            );
          })}
        </ul>

      <style jsx global>{`
      .moneycontrol-globalhd {     
        display: flex;     
        align-items: center;     
        position: absolute;     
        left: 50px; 
      }  
      .moneycontrol-globalhd span {
        display: block;     
        font-size: 12px;     
        color: #8a8989;     
        padding-right: 6px;     
        padding-bottom: 4px; 
      }  
      .moneycontrol-globalhd a {     
        display: block; 
      }
        .globalhd {
          border-bottom: 1px solid #d9d9d9;
          padding-bottom: 4px;
          position: relative;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }
        .globalhd.large h2 {
          font-size: 18px;
          line-height: 28px;
        }
        .globalhd h2 {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        .globalhd h2 a {
          color: #001536;
        }
        .moneycontrol-globalhd {
          display: flex;
          align-items: center;
          position: absolute;
          left: 50px;
        }
        .moneycontrol-globalhd span {
          display: block;
          font-size: 12px;
          color: #8a8989;
          padding-right: 6px;
          padding-bottom: 4px;
        }
        .moneycontrol-globalhd a {
          display: block;
        }
        a img {
          border: none;
        }
        .global-sub-nav li {
          flex-shrink: 0;
        }
        li {
          list-style: none;
        }
        .global-sub-nav li.active a {
          border-color: #ed1c24!important;
          color: #ed1c24;
          font-weight: 700;
        }
        .global-sub-nav li a {
          font-size: 14px;
          display: block;
          padding: 0 10px;
          height: 22px;
          line-height: 24px;
          color: #333;
          border: 1px solid transparent;
          border-radius: 30px;
          cursor: pointer;
        }
        .global-sub-nav li a:hover {
          color: #ed1c24;
        }
      `}</style>
      </div>
    </>
  );
};

export default OptionTab;
