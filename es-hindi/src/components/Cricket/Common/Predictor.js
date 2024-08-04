import { useEffect, useState } from "react";
import fetchUtilityDirect from "includes/sFetchUtilityDirect";
import Script from "next/script";

const IPLPredictor = ({}) => {

    const [data, setData] = useState([]);
    const [getTab, setTab] = useState(0);
    const [predictorSwitch, setPredictorSwitch] = useState(0);

    useEffect(() => {
        //getIPLPredictor();
    }, []);

    // const getIPLPredictor = async () => {
    //     const data = await fetchUtilityDirect(`https://api.news18.com/hi/get_redis/KHABARN18-IPL_2022_PREDICTOR`);
    //     if(data?.status === 1) {
    //         setPredictorSwitch(1);
    //         if(data?.common_text_predictor) {
    //             setData(data.common_text_predictor || []);
    //         }
    //     }
    // };
    const getScript = (param) => {
        const allScriptMatches = param?.match(/<script .*>.*<\/script>/ig) || '';

        const sourceArr = [];
        let embedScript = '';
        if(allScriptMatches != null && allScriptMatches !== '') {
            const a = allScriptMatches && Object.values(allScriptMatches).map((script) => {
                const srcExp = /src="(.*?)"/g;
                let source = srcExp.exec(script);
                source = source && typeof source[1] !== 'undefined' ? source[1] : '';
                if(source != null && source !== '') {
                    sourceArr.push(source);
                }
            });

            if(sourceArr != '') {
                sourceArr && Object.values(sourceArr).map((src) => {
                    embedScript = src;
                });
            }
         }
         return embedScript;
    };

    const getPollID = (scriptText) => {
        const data_array = scriptText.split(".");
        return data_array && data_array[2].replace('com/p/', '');
    };

    return (
        <>
            {
                predictorSwitch === 1 && (
                    <div className="daily_predictor">
                        <div className="daily_predictor_top">
                            <p><span>IPL</span>Daily Predictor</p>
                        </div>
                        <div className="daily_predictor_tab">
                            <div className="tab_link">
                                {
                                data.map((predictor, i) => {
                                    return(
                                        <>
                                            <button key={`tab${i}`} className={`tablink ${i === getTab ? 'w3-red' : ''}`} onClick={() => {setTab(i);}}>
                                                <p>{predictor.title}</p>
                                            </button>
                                        </>
                                        );
                                    })
                                }
                            </div>

                            {
                                data.map((predictor, index) => {
                                    return (
                                        <>
                                            <div key={`tabData${index}`} style={{ display: getTab == index ? 'block' : 'none' }}>
                                                <Script
                                                    type="text/javascript"
                                                    charset="utf-8"
                                                    src={getScript(predictor?.common_text)}
                                                />
                                                <div id={`PDI_container${getPollID(getScript(predictor?.common_text))}`}></div>
                                            </div>
                                        </>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }

            <style jsx global>{`
            .daily_predictor {
                width: 100%;
                height: auto;
                background: #003E66 0% 0% no-repeat padding-box;
                margin: 10px 0;
            }
            .daily_predictor_top {
                display: flex;
                align-items: center;
                padding: 10px 5px 20px 15px;
                justify-content: space-between;
                font-family: 'Lato', sans-serif;
            }
            .daily_predictor_top p {
                color: #FFFFFF;
                font-size: 22px;
                text-transform: uppercase;
                font-weight: 300;
            }
            .daily_predictor_top p span {
                font-size: 22px;
                color: #FFAE00;
                font-weight: bold;
                line-height: 25px;
                display: block;
            }
            .daily_predictor_tab {
                width: 100%;
            }
            .tab_link {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px #4F91CD solid;
            }
            button.tablink.w3-red {
                background: #4F91CD;
            }
            .tab_link button {
                width: 100%;
                background: transparent;
                outline: none;
                cursor: pointer;
                border: 0;
                font-family: 'Lato', sans-serif;
                color: #FFFFFF;
                font-size: 14px;
                height: 35px;
                font-weight: bold;
            }
            .pds-box {
                width: 100% !important;
            }
            .pds-box .poll__answer-media-public div img {
                z-index: 0 !important;
            }
            `}</style>
        </>
    );

};

export default IPLPredictor;
