import Head from "next/head";
import React from "react";

const XMLArray = {
    "web-stories": "https://hindi.news18.com/commonfeeds/v1/hin/rss/web-stories.xml",
    "videos": "https://hindi.news18.com/commonfeeds/v1/hin/rss/videos.xml",
    "photogallery": "https://hindi.news18.com/commonfeeds/v1/hin/rss/photogallery.xml",
    "nation": "https://hindi.news18.com/commonfeeds/v1/hin/rss/nation.xml",
    "cricket": "https://hindi.news18.com/commonfeeds/v1/hin/rss/cricket.xml",
    "states": "https://hindi.news18.com/commonfeeds/v1/hin/rss/states.xml",
    "sports": "https://hindi.news18.com/commonfeeds/v1/hin/rss/sports.xml",
    "world": "https://hindi.news18.com/commonfeeds/v1/hin/rss/world.xml",
    "crime": "https://hindi.news18.com/commonfeeds/v1/hin/rss/crime.xml",
    "ajab-gajab": "https://hindi.news18.com/commonfeeds/v1/hin/rss/ajab-gajab.xml",
    "entertainment": "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment.xml",
    "business": "https://hindi.news18.com/commonfeeds/v1/hin/rss/business.xml",
    "tech": "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech.xml",
    "lifestyle": "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle.xml",
    "politics": "https://hindi.news18.com/commonfeeds/v1/hin/rss/politics.xml",
    "career": "https://hindi.news18.com/commonfeeds/v1/hin/rss/career.xml",
    "auto": "https://hindi.news18.com/commonfeeds/v1/hin/rss/auto.xml"

}
const XMLScript = ({ category }) => {

    return (
        XMLArray[category] ? <Head><link rel="alternate" type="application/rss+xml" title="RSS" href={XMLArray[category]} /></Head> : null
    )
};

export default XMLScript;
