import React from "react";
import Head from "next/head";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";

const HeadTag = (props) => {
    return (
        <Head>
            {/* <html lang="gu" /> */}
            {/* <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="icon" href="//static.hindi.news18.com/ibnkhabar/uploads/assests/img/favicon.ico" />
            <link rel='manifest' href='../pwa/gujarati/manifest.json' /> */}

            <SiteSeo pageSeo={props.pageSeo} />
        </Head>
    );
};

export default HeadTag;
