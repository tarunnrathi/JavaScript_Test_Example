import React, { useState, useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const Test = (props) => {

    const [data, setData] = useState([]);

    useEffect(async () => {
        const photoGallery = await fetch("https://jsonplaceholder.typicode.com/todos/");
        const myata = await photoGallery.json();

        setData(myata);
    }, []);

    function insertAdd() {
        return (
            <SiteAd slotId="desktopHeaderTop" adUnit={props.pageAds.header} sizes={[[970, 90], [728, 90], [970, 200], [980, 200]]} />
        );
    }

    // function createMarkup(tempData) {
    //     let html = `<ul>`
    //     html += tempData.map((topNews, key) => {
    //         let li = `<li key=${key}>${topNews.title}</li>`
    //         li += (key > 0 && key%4 === 0) ? `</ul><div>${insertAdd()}</div><ul>` : ``

    //         // li += (key > 0 && key%4 === 0) ? `</ul><div>${ReactDOMServer.renderToStaticMarkup(<SiteAd slotId={'desktopHeaderTop'+ key} adUnit={props.pageAds.header} sizes={[[970, 90], [728, 90], [970, 200],[980,200]]} />)}</div><ul>` : ``

    //         // li += (key > 0 && key%4 === 0) ? `</ul><div>` : ``
    //         // li += (key > 0 && key%4 === 0) ? <SiteAd slotId="desktopHeaderTop" adUnit={props.pageAds.header} sizes={[[970, 90], [728, 90], [970, 200],[980,200]]} /> : ``
    //         // li += (key > 0 && key%4 === 0) ? `</div><ul>` : ``;

    //         return li
    //     }).join('')

    //     html += `</ul>`

    //     return {__html: html};
    // }

    function createMarkup(tempData) {
        // let html = `<ul>`
        tempData.map((topNews, key) => (
            <li key={key}>{topNews.title}</li>

        ));

        // html += `</ul>`

        // return {__html: html};
    }

    return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};

export default Test;
