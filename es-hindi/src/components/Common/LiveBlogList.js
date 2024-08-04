import React from "react";
import moment from "moment";

const LiveBlogList = ({liveBlogList,isMobile,utm_medium}) => {
  return (
    <>
    <div className={isMobile?"mrg10":""}>
      <div className="liveblog_sec">
        <span className="ph_heading">
          <p>
            लाइव ब्लॉग
          </p>
        </span>
        <ul className="nwrgt">
            {liveBlogList?.length > 0 && liveBlogList?.map((item,index)=>{
                return (
                  <li key={index}>
                    <a href={isMobile?item?.weburl+`?utm_source=mobile&utm_medium=${utm_medium}&utm_campaign=liveblog_widget`: item?.weburl+`?utm_source=desktop&utm_medium=${utm_medium}&utm_campaign=liveblog_widget`} target="_blank">
                      <h3 className="cricketwallah_title">
                        {item?.headline}
                      </h3>
                      <p>{moment(item?.updated_at).fromNow()}</p>
                    </a>
                  </li>
                );
            }) }
        </ul>
      </div>
      </div>
      <style jsx>{`
      .liveblog_sec{margin-bottom :10px}
      .ph_heading {color: #000;font-size: 22px;line-height: 36px;font-weight: bold;font-family:"Mukta",sans-serif!important;position: relative;border-bottom: 2px solid#111; display:flex;}
		.ph_heading::before {content: "";height: 2px;width: 88px;background: #f4342f;	position: absolute;	left: 0;bottom: -2px;}
		.ph_heading p {color: #000000;text-decoration: none;}

        .nwrgt{margin-top: 10px; border: 1px solid #E0E0E0; border-radius: 6px; background-color: #FAFAFA;}
			.nwrgt li {padding: 7px 10px 8px 15px; position: relative; border-left: 1px dashed #AAAAAA;margin: 0 0 0 10px;}
			.nwrgt li:first-child {padding-top: 15px;}
			.nwrgt li:before { content: ""; border-radius: 50%; width: 10px; height: 10px;background-color: #F4342F;position: absolute; left: -5px; top: 13px;}
			.nwrgt li:first-child:before { top: 21px; content: "";}
			.nwrgt a h3 { font-size: 15px; line-height: 22px; color: #000000; }
			.nwrgt a p {color: #908E8E; font-size: 13px; line-height: 22px;}
      `}</style>
    </>
  );
};
export default LiveBlogList;