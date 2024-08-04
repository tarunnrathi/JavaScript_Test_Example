import React from "react";
import getConfig from 'next/config';
import Glide from "@glidejs/glide";

const { publicRuntimeConfig } = getConfig();

const CountingWidgets = (props) => {
    const env = publicRuntimeConfig.isEnv == 'production' ? 'live' : publicRuntimeConfig.isEnv;
    const iframeLink = env.includes('developement', 'live') ? `https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/main_amp_widget_2023.html?lang=hindi&host=https://hindi.news18.com?a=c` : `https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/main_amp_widget_2023.html?lang=hindi&host=https://hindi.news18.com?b=d`;
    const countingTallyFlag = props?.countingTallyFlag ? true : false;
    const countingTallySponserFlag = props?.countingTallySponserFlag ? true : false;
    const ExitPollFlag = props?.exitPollFlag ? true : false;
    const ExitPollSponserFlag = props?.exitPollSponserFlag ? true : false;
    const adSlot = '/1039154/NW18_HIND_AMP/NW18_HIND_Election_AMP/NW18_HIND_Election_EXITPOLL_AMP/NW18_HIND_ELECT_AMP_SPONSOR_TOP_STRIP_360x50';

    return (
        <div next-page-hide={""}>

            {
                (countingTallyFlag) ?
                <>

                        <amp-iframe width="500" height="200" layout="responsive" sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-pointer-lock allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation" frameborder="0"
                            src={iframeLink} className="amp-countingTally">
                            <amp-img layout="fill" src="https://images.news18.com/ibnkhabar/uploads/2017/04/greyimg.jpg" placeholder></amp-img>
                            </amp-iframe>

                            {RedirectUrl &&
                            <a href={props.RedirectUrl} className ='clickEventClass' />
                            }

                </>
                : ""
            }
            {
                (countingTallySponserFlag) ?
                    <div className='sponser-ad'>
                        <amp-ad
                        width={360}
                        height={50}
                        type='doubleclick'
                        data-slot={adSlot}
                        data-lazy-fetch="true"
				        data-loading-strategy="1"
                        >
                        </amp-ad>
                    </div>
                : ""
            }

            {
                (ExitPollSponserFlag) ?
                    <div className='sponser-ad'>
                        <amp-ad
                        width={360}
                        height={50}
                        type='doubleclick'
                        data-slot={adSlot}
                        data-lazy-fetch="true"
				        data-loading-strategy="1"
                        >
                        </amp-ad>
                    </div>
                : ""
            }

            {
                (ExitPollFlag) ?
                <amp-iframe width="500" height="250" layout="responsive" sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-pointer-lock allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation" frameborder="0"
                    src={`https://images.news18.com/dlxczavtqcctuei/news18/stg/FinalExitPollWidgetDec2022.html?lang=hindi&host=https://${env.includes('developement', 'live') ? 'hindi' : env+'hindi'}.news18.com`}>
                    <amp-img layout="fill" src="https://images.news18.com/ibnkhabar/uploads/2017/04/greyimg.jpg" placeholder></amp-img>
                    </amp-iframe>
                : ""
            }
            <style jsx global>
                {`
                    .sponser-ad {
                        text-align:center;
                    }
                    .clickEventClass{
                        width: 100%;
                        height: 150px;
                        position: absolute;
                        top: 85px;
                        z-index: 9999;
                        

                    }
                    .clickEventClassDiv{
                        display:block;
                        width: 100%;


                    }
                `}
            </style>
        </div>
    );
};
export default CountingWidgets;
