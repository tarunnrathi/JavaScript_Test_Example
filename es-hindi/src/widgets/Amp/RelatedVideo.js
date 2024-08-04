import React from "react";
import getConfig from "next/config";
import { imageLoader } from "includes/article.util";
import moment from "moment";

const RelatedVideo = ({ stories = [] }) => {
    const { publicRuntimeConfig } = getConfig();
    const liveTime=(time) => {
        return time
          .toString()
          .replace(
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            '$1-$2-$3 $4:$5:$6'
          );
      };

    return (
        <div className="rtpvd">
            <div className="rtpvdh">टॉप वीडियो</div>
            <div className="rtpvdsld">
                <div data-glide-el="track" className="rtpvdsldin">
                    <ul>
                        {stories.map((itm) => {
                          return (
                            <li>
                                <a href={itm.url.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + "amp/")}>
                                      <figure>
                                        <amp-img height="170" width="248" src={imageLoader(itm.thumbnail, 170, 248)} />
                                      </figure>
                                    </a>
                                    <a href={itm.url.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + "amp/")}>
                                      <figcaption>
                                          <span>
                                          <time dateTime={itm.insert_date} />
                                              {" " +
                                          moment(liveTime(itm.insert_date)).format(
                                              "MMMM D, YYYY, H:mm"
                                          ) +
                                          " IST"}</span>
                                          {itm.display_headline}
                                      </figcaption>
                                  </a>
                            </li>);})}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RelatedVideo;
