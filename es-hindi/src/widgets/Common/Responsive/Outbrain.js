const Outbrain = (prop) => {
    return (
        (process.env.siteAd) ? <div className="OUTBRAIN" data-src={prop.widgetSrc} data-widget-id={prop.widgetId}></div> : ''
    );
};
export default Outbrain;
