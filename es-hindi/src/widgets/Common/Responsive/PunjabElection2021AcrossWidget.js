import { useEffect, useContext } from "react";
import UserContext from 'widgets/Common/Responsive/GlobalContext';

const PunjabElection2021AcrossWidget = () => {
    const { pageData } = useContext(UserContext);

    const { punjabEleWidFlag, isMobile, category } = pageData;
    let widgetHeight = '',
        svgheight = '';

    if(punjabEleWidFlag) {
        if(isMobile) {
            widgetHeight = '176px';
            svgheight = '55px';
        } else {
            widgetHeight = '80px';
            svgheight = '70px';
        }
    }

    useEffect(() => {
        //Start acrossScript Script
        if(punjabEleWidFlag) {
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "https://images.news18.com/ibnkhabar/uploads/assests/js/glide.min.js";
            document.body.appendChild(script);

            const acrossScript = document.createElement('script');
            acrossScript.src = "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/punjab_elec_widget.js";
            acrossScript.defer = true;
            document.body.appendChild(acrossScript);
        }
        //End acrossScript Script
    }, []);

    return (
        <>
        {(punjabEleWidFlag && category == 'punjab')?
            <div className="hyd_top_bg" style={{ "minHeight": widgetHeight }}>
                <div className="wrap">
                    <div className="hyd_top_strip">
                        <div className="hyd_logo"><img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Punjab_Local_Body_Elections_2021_Hindi.svg" alt="" style={{ "height": svgheight, "width": "auto" }} /></div>

                        <div className="wrap_table" id="punjab_local_body_2021"></div>
                        <div className="click_here" style={{ "display": "none" }}>
                            <a href="/punjab-local-body-elections-2021/">विस्तृत परिणाम के लिए यहां क्लिक करें</a>
                        </div>
                    </div>
                </div>
            </div>:''}
        </>
    );
};

export default PunjabElection2021AcrossWidget;
