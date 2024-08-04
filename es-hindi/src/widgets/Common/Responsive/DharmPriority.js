import React from "react";
import { longDateConversion } from "../../../../helper/global";
import LazyLoadImage from "components/Common/CustomImage";

const DharmPriority = ({ data }) => {
  if (!(data && data.length > 0)) {
    return null;
  }
  const [topData = {}] = data;
  return (
    <>
      <div className="glblhead newsml">
        <h2 className="newglblhd">धर्म</h2>
      </div>
      <div className="top_story">
        <div className="seclftimg">
          <div data-glide-el="track" className="">
            <ul className="">
              <li className="">
                <a href={topData.weburl} className="">
                  <figure className="">
                    <LazyLoadImage
                      src={topData.images?.url}
                      alt={topData.display_headline || topData.headline || ""}
                      title={topData.display_headline || topData.headline || ""}
                      width={561}
                      height={187}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                      }}
                    />
                  </figure>
                  <div className="frstdsc">
                    <span>
                      <b>LAST UPDATED</b> :{" "}
                      {longDateConversion(topData.updated_at)}{" "}
                    </span>
                    <h2 className="">{topData.display_headline}</h2>
                    <p>{topData.intro}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="seclftlst forstates">
          <ul className="">
            {data.slice(1, 5).map((item, index) => (
              <li key={index} className="">
                <a href={item.weburl} className="">
                  <figure className="">
                    <LazyLoadImage
                      src={item.images?.url}
                      alt={item.display_headline || item.headline || ""}
                      title={item.display_headline || item.headline || ""}
                      width={281}
                      height={123}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                      }}
                    />
                  </figure>
                  <h2 className="">{item.display_headline}</h2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="clearfix vsp10"></div>
      <div className="seprtr"></div>
      <div className="glblhead newsml mobonly">
        <h2 className="newglblhd">अन्य खबरे</h2>
      </div>
      <div className="blglst">
        {data.slice(5, 11).map((item, index) => (
          <div key={index} className=" blgrw ">
            <a href={item.weburl} className="">
              <figure className="">
                <div className=" blog_img">
                  <LazyLoadImage
                    src={item.images?.url}
                    alt={item.display_headline || item.headline || ""}
                    title={item.display_headline || item.headline || ""}
                    width={281}
                    height={187}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                    }}
                  />
                </div>
                <figcaption className="">
                  <div className=" blog_title">{item.display_headline}</div>
                </figcaption>
              </figure>
            </a>
          </div>
        ))}
      </div>
      <div className="vsp10"></div>
      <a href="/news/dharm" className="load_more">
        <span>और भी पढ़ें</span>
      </a>
        <div className="vsp10"></div>
        <style jsx>{`
        .load_more{height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer;margin-bottom: 10px;}
        .load_more span {padding: 0px 22px;font-size: 14px;	font-weight: 600;}
        
        `}</style>
    </>
  );
};

export default DharmPriority;
