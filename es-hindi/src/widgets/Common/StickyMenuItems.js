import ReactHtmlParser from 'html-react-parser';
import { logEvent } from "includes/googleAnalytic";
import { useRouter } from 'next/router';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import HindiGlobalContext from "HindiGlobalContext";
import {useContext} from "react";

const StickyMenuItems = ({
  isAMP,
  menuItems = [],
  toggeleHandler
}) => {
  const router = useRouter();
  let asPath = router?.asPath;
  let pathName = publicRuntimeConfig.siteUrl+asPath.substring(1);
  const { setSearchBar, setIsPopUpOpen, handleShowChange} = useContext(HindiGlobalContext);
  return (
    <>
      <ul className="btnvav">
        {
          menuItems?.length > 0 && menuItems.map((item, index) => {
            return (
              <li key={`StickyFooter-${index}`}>
                {
                  isAMP ? (
                    <a
                      title={item?.label}
                      href={item?.hamburger === 0 && item?.url ? item?.url : '#'}
                      on={(isAMP && item?.hamburger === 1) ? 'tap:sidebar1.open' : ''}
                      data-vars-event-category={item?.event_category+'_amp'}
                      data-vars-event-label={pathName.toLowerCase()}
                    >
                      <span>
                        {
                          item?.img_type === 'svg' && item?.svg_code && (
                            ReactHtmlParser(item?.svg_code)
                          )
                        }
                        {
                          item?.img_type === 'gif' && item?.gif_url && (
                            <img src={item?.gif_url} height={20} width={22} loading='lazy' />
                          )
                        }                    
                      </span>
                      <div className={item?.highlight_new === '1' ? 'highlighted' : ''}>{item?.label}</div>
                    </a>
                  ) : (
                    <a
                      title={item?.label}
                      href={ (item?.search === 1 || item?.notification === 1 || item?.city === 1)? 'javascript:void(0)' :  item?.hamburger === 0 && item?.url ? item?.url : 'javascript:void(0)'}
                      onClick={() => {
                        logEvent(`${item?.event_category}`, "Click", `${pathName.toLowerCase()}`);
                        item?.search === 1 && setSearchBar("");
                        item?.notification === 1 && setIsPopUpOpen();
                        item?.city === 1 && handleShowChange();
                        item?.hamburger === 1 && toggeleHandler();
                      }}
                      target={item?.target === '1' ? '_blank' : ''}
                      className='bottom_sticky_mweb_nav'
                    >
                      <span className='bottom_sticky_mweb_nav'>
                        {
                          item?.img_type === 'svg' && item?.svg_code && (
                            ReactHtmlParser(item?.svg_code)
                          )
                        }
                        {
                          item?.img_type === 'gif' && item?.gif_url && (
                            <img src={item?.gif_url} height={20} width={22} loading='lazy' />
                          )
                        }                       
                      </span>
                      <div className={item?.highlight_new === '1' ? 'highlighted bottom_sticky_mweb_nav' : 'bottom_sticky_mweb_nav'}>{item?.label}</div>
                    </a>
                  )
                }
              </li>
            )
          })
        }
      </ul>
      <style jsx global>{`
        .highlighted {
          position: relative;
        }      
        .highlighted:after {
          content: "";
          position: absolute;
          right: -12px;
          width: 8px;
          height: 8px;
          background: #e1261c 0 0 no-repeat padding-box;
          border-radius: 100px;
          top: 2px;
          animation: 1s blink ease infinite;
        }
            
        @keyframes "blink" {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }     
        .btnvav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          bottom: 0px;
          height: 60px;
          z-index: 999999;
          background: rgb(255, 255, 255);
          position: fixed;
          left: 0px;
          right: 0px;
          padding: 0px 14px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px -4px 4px;
        }
        .btnvav li {
          list-style: none;          
          line-height: 15px;
          box-sizing: border-box;
          text-align: center;
        }
        .btnvav li a {
          color: rgb(10, 33, 64);
          font-size: 13px;
          margin: auto;
          text-transform: uppercase;
          text-decoration: none;
        }
        .btnvav li a span {
          display: flex;
          margin: auto auto 4px;
          justify-content: center;
          height: 26px;
          align-items: center;
        }
      `}</style>
    </>
  );
};
export default StickyMenuItems;

