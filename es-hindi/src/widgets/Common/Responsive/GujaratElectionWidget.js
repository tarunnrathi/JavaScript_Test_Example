import { useEffect } from "react";

const GujaratElectionWidget = (props) => {

    useEffect(() => {
        //Start acrossScript Script
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://images.news18.com/ibnkhabar/uploads/assests/js/glide.min.js";
        document.body.appendChild(script);

        const acrossScript = document.createElement('script');
        acrossScript.src = "https://images.news18.com/static_news18/pix/ibnhome/news18/js/event/gujarat_local_election_2021.js";
        acrossScript.defer = true;
        document.body.appendChild(acrossScript);
        //End acrossScript Script
    }, []);
    const minHeight = props.minHeight ? props.minHeight : "81px";
    return (
        <>
            <div id="gujarat-election-widget" style={{ minHeight }}></div>
        </>
    );
};

export default GujaratElectionWidget;
