import React, { useState } from 'react';

const FooterStickyMenu = () => {

    const [active, setActive] = useState("liveresult2021");

    function setButtonActive(buttonId) {
        setActive(buttonId);
    }

    return (
        <>
            <ul className="fix_tab_bottom">
                <li className="jsx-482109349">
                    <a
                        href="#liveresult2021"
                        onClick={(e) => { setButtonActive("liveresult2021"); }}
                        className={active === "liveresult2021" ? "active" : " "}
                    >
                        <span>लाइव रिजल्ट</span>
                    </a>
                </li>
                <li className="jsx-482109349">
                    <a
                        href="#electionHighlights"
                        onClick={(e) => { setButtonActive("electionHighlights"); }}
                        className={active === "electionHighlights" ? "active" : " "}
                    >
                        <span>चुनाव हाइलाइट्स</span>
                    </a>
                </li>
                <li className="jsx-482109349">
                    <a
                        href="#rhsConstResult"
                        onClick={(e) => { setButtonActive("rhsConstResult"); }}
                        className={active === "rhsConstResult" ? "active" : " "}
                    >
                        <span>चुनाव क्षेत्र परिणाम</span>
                    </a>
                </li>
                <li className="">
                    <a
                        href="#electionNews"
                        onClick={(e) => { setButtonActive("electionNews"); }}
                        className={active === "electionNews" ? "active" : " "}
                    >
                        <span>चुनाव न्यूज</span>
                    </a>
                </li>
            </ul>
            <style jsx global>{`
                .fix_tab_bottom {
                    position: fixed;
                    left: 0;
                    right: 0;
                    display: flex;
                    z-index: 9999;
                    background-color: #001d42;
                    bottom: 0px;
                    align-items: center;
                    height: auto;
                    box-shadow: 0px -5px 0px #fff;
                }
                .fix_tab_bottom li {
                    flex-grow: 1;
                    justify-content: center;
                    min-width: 80px;
                    height: 100%;
                }
                .fix_tab_bottom li a {
                    display: flex;
                    align-items: center;
                    color: #fff;
                    text-align: center;
                    padding: 12px 7px;
                    font-size: 13px;
                    text-transform: uppercase;
                    line-height: 15px;
                    border-right: 1px #334a68 solid;
                    height: 100%;
                }
                .fix_tab_bottom li a.active {
                    background-color: #e1261c;
                    position: relative;
                    font-weight: 700;
                    padding: 10px 7px;
                }
                .fix_tab_bottom li a.active:before {
                    content: "";
                    height: 6px;
                    background-color: #e1261c;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: -5px;
                }
            `}</style>
        </>
    );
};
export default React.memo(FooterStickyMenu);
