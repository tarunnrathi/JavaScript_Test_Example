import { useEffect } from "react";

const CountingTallyWidget = (props) => {
    useEffect(() => {
        setTimeout(() => {
            //Start acrossScript Script
            const res = document.createElement("link"); res.rel = "stylesheet"; res.as = "style"; res.href = 'https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/across_strip_1645191718.css'; document.head.appendChild(res);

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://images.news18.com/static_news18/js/revamp/glide.min.js";
            document.head.appendChild(script);

            const acrossScript = document.createElement('script');
            if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
                acrossScript.src = "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/main_desktop_widget_mar2023.js?v=99";
            }else{
                acrossScript.src = "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/main_desktop_widget_mar2023.js?v=99";
            }
            acrossScript.defer = true;
            document.body.appendChild(acrossScript);
            // console.log("acrossScript",acrossScript);
            //End acrossScript Script
        }, 10);
    }, []);

    return (
        <>

            <a href={props.RedirectUrl || "javascript:void(0);"} >
            <div className="election_day_widget" >
                <div className="widget_row_election election_day_widget_acr" id="election_day_widget_acr">
                <ul style={{ display: 'flex', listStyle: 'none', padding: '0 0px', justifyContent: 'center' }}>
                    <li className="widgetMobile-1" style={{ width: '48%', padding: '16px 10px 0', background: '#FFFFFF 0% 0% no-repeat padding-box', boxSizing: 'border-box', marginRight: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: 7 }}>
                        <div className="skelAnimation" style={{ width: 180, height: 25, borderRadius: 6, background: '#dadada' }} />
                        <div style={{ width: 180, height: 25, background: '#001D42', borderRadius: 11, position: 'relative' }}>
                        <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                        </div>
                    </div>
                    <table width="100%" style={{ borderCollapse: 'collapse', borderSpacing: 0 }}>
                        <tbody>
                        <tr>
                            <th style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#83C700', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#F97D09', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#B80D2E', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#464646', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                        </tr>
                        <tr>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 53, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#83C700', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#F97D09', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#B80D2E', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#464646', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                        </tr>
                        {
                            !(props.isMobile) ?
                                <tr>
                                    <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                                    <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                                    </td>
                                    <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                                    <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                                    </td>
                                    <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                                    <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                                    </td>
                                    <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                                    <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                                    </td>
                                    <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                                    <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                                    </td>
                                </tr>
                            : ""
                        }
                        </tbody>
                    </table>
                    </li>
                    <li className="widgetMobile-2" style={{ width: '48%', padding: '16px 10px 0', background: '#FFFFFF 0% 0% no-repeat padding-box', boxSizing: 'border-box', marginRight: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: 7 }}>
                        <div className="skelAnimation" style={{ width: 180, height: 25, borderRadius: 6, background: '#dadada' }} />
                        <div style={{ width: 180, height: 25, background: '#001D42', borderRadius: 11, position: 'relative' }}>
                        <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                        </div>
                    </div>
                    <table width="100%" style={{ borderCollapse: 'collapse', borderSpacing: 0 }}>
                        <tbody>
                        <tr>
                            <th style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#83C700', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#F97D09', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#B80D2E', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                            <th style={{ background: '#464646', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 14, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </th>
                        </tr>
                        <tr>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 53, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#83C700', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#F97D09', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#B80D2E', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#464646', position: 'relative', height: 42, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                            <td style={{ background: '#e7e7e7', position: 'relative', height: 22, letterSpacing: '-0.28px', fontSize: 20, color: '#fff', fontWeight: 500, verticalAlign: 'middle', border: '1px #fff solid', textTransform: 'uppercase', textAlign: 'center' }}>
                            <div className="three-bounce"><div className="one" /><div className="two" /><div className="three" /></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </li>
                </ul>
                </div>
                {/* <a href="/assembly-elections-2021/by-poll-constituency-wise-results-live/" className="by_poll_button">BYPOLL RESULTS 2021</a> */}
            </div>
            </a>
            <style jsx global>
            {`
                @keyframes loading {100% {background-position: 100% 0;}}
                @keyframes bouncedelay {0%, 80%, 100% {-webkit-transform: scale(0);transform: scale(0)}
                40% {transform: scale(1);-webkit-transform: scale(1)}}
                .widget_row_election{padding-top: 5px; }
                .skelAnimation {position:relative;}
                .skelAnimation:after {position: absolute;transform: translateY(-50%);top: 50%;left: 0;content: "";display: block;width: 100%;height: 100%;background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 80%);background-size: 110px 100%;background-position: -100px 0;background-repeat: no-repeat;animation: loading 1s infinite;}
                .three-bounce {right: 0;z-index: 10;display: flex;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);justify-content: space-between;width: 35px;opacity: 0.5;}
                .three-bounce>div {width: 10px;height: 10px;border-radius: 100%;background-color: #fff;-webkit-animation: bouncedelay 1.4s infinite ease-in-out both;animation: bouncedelay 1.4s infinite ease-in-out both;}
                .three-bounce .one {-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}
                .three-bounce .two {-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}
                a.by_poll_button {font-family: 'Fira Sans', sans-serif; font-size: 12px; color: #E1261C; padding-right: 20px; margin-left: 5px; position: absolute; bottom: 9px; font-weight: bold; text-decoration: underline;}
                a.by_poll_button:after {content: ""; width: 13px; height: 2px; position: absolute; background: #E1261C; top:10px; right: 2px; }
                a.by_poll_button:before {content: ''; border-top: 2px solid #E1261C; border-left: 2px solid #E1261C; width: 6px; height: 6px; transform: rotate(132deg ); position: absolute; right: 4px; top: 7px; }
                .brcountday-tallywidget-right {background: #e7e7e7;width: 30px;position: absolute;right: 0;border-bottom: 2px solid #d0d0d0;bottom: 0px;height: 103px;}
                .brcountday-tallywidget-right:before, .brcountday-tallywidget-right:after {content: "";position: absolute;}
                .brcountday-tallywidget-right:before {width: 18px;height: 4px;background: #464646;top: 50%;margin-top: -2px;left: 50%;margin-left: -9px;}
                .brcountday-tallywidget-right:after {width: 4px;height: 18px;background: #464646;top: 50%;margin-top: -9px;left: 50%;margin-left: -2px;}
                @media only screen and (max-width: 600px) {      
                .widgetMobile-1 {width:100% !important;margin-right: 0 !important;}      
                .widgetMobile-2 {display:none;}
                a.by_poll_button { position: relative; bottom: 0; margin: 0; text-align: center; display: block; width: 150px; margin: 10px auto 5px; }
                .brcountday-tallywidget-right {height:83px;}
                }
            `}
            </style>
        </>
    );
};
export default CountingTallyWidget;
