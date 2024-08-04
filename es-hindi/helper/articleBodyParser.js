//let districtList = require("../src/includes/district.helper").districtList;
const { districtList } = require("../src/includes/district.helper.commonjs");
const { TaboolaList } = require("../src/includes/Tabola.helper");
const cheerio = require("cheerio");

import { getCompleteURL } from "util/global/Helper";


const imageLoader = (src = "", width, height, dontAlter, im) => {
  const options = im
    ? `im=Resize,width=${width},aspect=fit,type=normal`
    : `impolicy=website&width=${width}&height=${height}`;

  if (
    src == "" ||
    !src ||
    src ==
      "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
  ) {
    return `https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?${options}`;
  }

  if (dontAlter) {
    return src;
  }

  const image = src
    .replace(/http(s)?:\/\/[a-zA-Z\.\-0-9\/]+\/uploads\//, "")
    .replace("https://images.news18.com/ibnkhabar/uploads/", "");
  return `https://images.news18.com/ibnkhabar/uploads/${image}?${options}`;
};

module.exports.relatedCard = (stories = [], isDesktop, isAmp, id, heading) => {
  const width = isDesktop ? 180 : 171;
  const height = isDesktop ? 120 : 114;

  if (!stories.length) {
    return "";
  }

  return `
  <div class="related_nws_sec">
  <h5 class="rltd_nws_hdng">${
    stories[0] && stories[0].image
      ? "चुनाव 2022"
      : heading
      ? heading
      : "संबंधित खबरें"
  }</h5>	
    <div class="related_nws_slidr slider-${id}">	
       <div class="glide__track" data-glide-el="track">   
            <ul class="rltd_lists_sldr">
            ${stories
              .map((story, index) => {
                return `${
                  index < 4
                    ? `<li><a href=${story.url || story.weburl}>
              <figure class="rltd_lists_sldr_img"><img src=${imageLoader(
                story.thumbnail ||
                  story.thumbnail ||
                  (story.image && story.image.url ? story.image.url : ""),
                width,
                height,
              )} height="${height}" width="${width}" loading="lazy" title="${
                story.display_headline || story.title || story.headline
              }"></figure>
              <p>${story.display_headline || story.title || story.headline}</p>
              </a></li>`
                    : ""
                }`;
              })
              .join(" ")}
            </ul>
         </div>
         
        <div data-glide-el="controls" class="glide_arroe_buttons">
          <a class="left-arrow" data-glide-dir="<"></a>
          <a class="right-arrow" data-glide-dir=">"></a>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button class="glide__bullet" data-glide-dir="=0"></button>
          <button class="glide__bullet" data-glide-dir="=1"></button>
          <button class="glide__bullet" data-glide-dir="=2"></button>
          <button class="glide__bullet" data-glide-dir="=3"></button>
        </div>                                           
      </div>   
   </div>
  `;
};

module.exports.stateStories = (stories, id, city, cat, isDesktop) => {
  stories = stories
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  let stateList = [
    {
      hi: "उत्तर प्रदेश",
      href: "https://hindi.news18.com/news/uttar-pradesh/",
    },
    {
      hi: "बिहार",
      href: "https://hindi.news18.com/news/bihar/",
    },
    {
      hi: "मध्य प्रदेश",
      href: "https://hindi.news18.com/news/madhya-pradesh/",
    },
    {
      hi: "राजस्थान",
      href: "https://hindi.news18.com/news/rajasthan/",
    },
    {
      hi: "उत्तराखंड",
      href: "https://hindi.news18.com/news/uttarakhand/",
    },
    {
      hi: "हरियाणा",
      href: "https://hindi.news18.com/news/haryana/",
    },
    {
      hi: "झारखंड",
      href: "https://hindi.news18.com/news/jharkhand/",
    },
    {
      hi: "छत्तीसगढ़",
      href: "https://hindi.news18.com/news/chhattisgarh/",
    },
    {
      hi: "हिमाचल प्रदेश",
      href: "https://hindi.news18.com/news/himachal-pradesh/",
    },
    {
      hi: "महाराष्ट्र",
      href: "https://hindi.news18.com/news/maharashtra/",
    },
    {
      hi: "पंजाब",
      href: "https://hindi.news18.com/news/punjab/",
    },
  ];

  const selectedState = stateList.filter((c) =>
    cat.find((i) => i.name == c.hi),
  )[0];
  if (selectedState) {
    stateList = stateList.filter((i) => i.hi != selectedState.hi);
  }
  const dl = districtList.filter((i) =>
    i.href.includes(
      selectedState &&
        selectedState.href &&
        selectedState.href.split("/news/").pop(),
    ),
  );

  if (!isDesktop) {
    return `<div class="addef" style="min-height:313px; "><div class="slct_sate_city_sec state-slider-${id}">
    <h4 class="slction_hdng">
      आपके शहर से <span>(${city.name || city.hi})</span>
    </h4>
  </div><div class="slidr_sec">
    <div class="slction_section">
            ${stories
              .map(
                (item) => `<a  href=${getCompleteURL(
                  item?.weburl_r,
                  item?.weburl,
                )} class="districtSelect cp_related_stories"
          data-vars-event-category="Local18_Select"
           data-vars-event-label="${item.headline}"
           >
              <figure>
                <img
                  src=${imageLoader(item?.images?.url, 200, 133)}
                  width="200"
                  height="133"
                  class="cp_related_stories"
                />
              </figure>
              <p class="cp_related_stories">
                ${item?.headline}
              </p>
            </a>`,
              )
              .join("")}
            <div class="last_div">
            <div class="custom_cl_S">
            <span class="select_hd_ing">${
              selectedState ? `${selectedState.hi}` : "राज्य चुनें"
            }</span>
            <ul class="all_states_list">
              ${stateList
                .map(
                  (item) => `<li>
                <a href="${item.href}">${item.hi}</a>
              </li>`,
                )
                .join("")}
            </ul>
          </div>
          <div class="custom_cl_S">
            <span class="select_hd_ing">${
              city ? `${city.name || city.hi}` : "शहर चुनें"
            }</span>
            <ul class="all_states_list">
              ${dl
                .map(
                  (item) => `<li>
                <a href="https://hindi.news18.com/news/${item.href}/">${item.hi}</a>
              </li>`,
                )
                .join("")}
            </ul>
          </div>
            </div>
    </div>
    </div>
  </div><div>`;
  }

  return `
  <div class="slct_sate_city_sec ">
    <h4 class="slction_hdng">
      आपके शहर से <span>(${city.name || city.hi})</span>
    </h4>
    <div class="selecton_sec desktop-state-select">
      <div class="custom_cl_S">
        <span  class="select_hd_ing">${
          selectedState ? `${selectedState.hi}` : "राज्य चुनें"
        }</span>
        <ul class="all_states_list">
          ${stateList
            .map(
              (item) => `<li>
            <a href="${item.href}" id="selectState" >${item.hi}</a>
          </li>`,
            )
            .join("")}
        </ul>.
      </div>
      <div class="custom_cl_S">
        <span class="select_hd_ing">${
          city ? `${city.name || city.hi}` : "शहर चुनें"
        }</span>
        <ul class="all_states_list">
          ${dl
            .map(
              (item) => `<li>
            <a  href="https://hindi.news18.com/news/${item.href}/" target="_blank" >${item.hi}</a>
          </li>`,
            )
            .join("")}
        </ul>
      </div>
    </div>
  </div>

  <div class="slidr_sec">
    <div class="slction_section" style="width:728px">
      <div class="slection__sldr state-slider-${id}">
        <div class="glide__track" data-glide-el="track">
          <ul class="custom_artcl_sldr custm_slecton">
            ${stories
              .map(
                (item) => `<li class="cp_related_stories"><a class="cp_related_stories" href=${getCompleteURL(
                  item?.weburl_r,
                  item?.weburl,
                )}>
              <figure>
                <img
                  src="${imageLoader(item?.images?.url, 220, 147)}"
                  alt="${item.headline}"
                  loading="lazy"
                  ${isDesktop ? "height='147' width='220'" : ""}
                  class="cp_related_stories"
                />
              </figure>
              <p class="cp_related_stories">
                ${item.headline}
              </p>
              </a></li>`,
              )
              .join("")}
          </ul>
        </div>

        <div data-glide-el="controls" class="glide_arroe_buttons">
          <a class="left-arrow" data-glide-dir="<"></a>
          <a class="right-arrow" data-glide-dir=">"></a>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button class="glide__bullet" data-glide-dir="=0"></button>
          <button class="glide__bullet" data-glide-dir="=1"></button>
          <button class="glide__bullet" data-glide-dir="=2"></button>
          <button class="glide__bullet" data-glide-dir="=3"></button>
          <button class="glide__bullet" data-glide-dir="=4"></button>
          <button class="glide__bullet" data-glide-dir="=5"></button>
          <button class="glide__bullet" data-glide-dir="=6"></button>
          <button class="glide__bullet" data-glide-dir="=7"></button>
        </div>
      </div>
      <div class="selecton_sec mobile-state-select">
      <div class="custom_cl_S">
      <span class="select_hd_ing">${
        selectedState ? `${selectedState.hi}` : "राज्य चुनें"
      }</span>
      <ul class="all_states_list">
        ${stateList
          .map(
            (item) => `<li>
          <a href="${item.href}">${item.hi}</a>
        </li>`,
          )
          .join("")}
      </ul>
    </div>
    <div class="custom_cl_S">
      <span class="select_hd_ing">${
        city ? `${city.name || city.hi}` : "शहर चुनें"
      }</span>
      <ul class="all_states_list">
        ${dl
          .map(
            (item) => `<li>
          <a href="https://hindi.news18.com/news/${item.href}/">${item.hi}</a>
        </li>`,
          )
          .join("")}
      </ul>
    </div>
  </div>  
    </div>
  </div>
  `;
};

module.exports.anchorParser = (body = "", amp) => {
  const as = matchAll(/<a.*?>/gim, body);
  if (as) {
    for (const a of as) {
      let modifieda = a;
      let href = a.match(/href=".*?"/gi);
      const target = a.match(/target=".*?"/gi);
      const rel = a.match(/rel=".*?"/gi);

      if (href && href[0]) {
        href = href[0];
        if (target) {
          modifieda = modifieda.replace(/target=".*?"/, "");
        }

        if (!href.includes("hindi.news18.com/")) {
          if (rel) {
            modifieda = modifieda.replace(/rel=".*?"/, "");
          }

          modifieda = modifieda.replace(
            ">",
            'rel="noopener noreferrer nofollow" target="_blank">',
          );
        } else if (amp) {
          if (
            href.includes(".com/news") ||
            (href.includes(".com/photogallery") && href.includes(".html"))
          ) {
            modifieda = modifieda.replace(".com", ".com/amp");
          }
        }
        body = body.replace(a, modifieda);
      }
    }
  }

  return body;
};

module.exports.youtubeParser = (content, isAmp) => {
  const regex =
    /<div class="youTubeVideoPlayer" data-youtube="true"[\w\W]*?<\/div>/gi;
  const matches = regex.exec(content);

  if (matches) {
    matches.forEach((match) => {
      const youtubeId = match.match(/data-youtube-id="(\S*?)"/);
      if (youtubeId && youtubeId[1]) {
        if (isAmp) {
          content = content.replace(
            match,
            `<div id="AmpYoutubeEmbed"  data-video-event = "Article_Youtube"  ><amp-youtube data-videoid=${youtubeId[1]} layout="responsive" width="480" height="270"></amp-youtube></div>`,
          );
        } else {
          content = content.replace(
            match,
            `<fakeyt src=${youtubeId[1]}></fakeyt>`,
          );
        }
      }
    });
  }
  return content;
};

const mobileEmbedParser = (content) => {
  const r = /\[mobileID.*/gi;
  const mi = content.match(r);

  if (mi && mi.length) {
    mi.forEach((m) => {
      const s = (
        matchAll(/"(.*?)"/gim, m.replace(/&#8221;|&#8243/gim, '"')) || []
      ).map((i) => i.replace(/"/gi, ""));

      if (s && s.length) {
        content = content.replace(
          m,
          `<fixedview props="${s.join(",")}"></fixedviewd>`,
        );
      }
    });
  }
  return content;
};

module.exports.mobileVersesEmbedParser = (content) => {
  //  let versesMatch = tableBody.match(/v\/s/gism)

  content = content.replace("v/s", "<verses></verses>");
  return content;
};

function matchReplacer(regex, body, arr, tag) {
  const match = regex.exec(body);
  if (!match) {
    return [arr, body];
  }
  return matchReplacer(
    regex,
    body.replace(regex, tag ? `[${tag}${arr.length || 0}]\r\n` : ""),
    [...arr, match[0]],
    tag,
  );
}

const matchAll = (pattern, haystack) => {
  const matches = [];
  const match_result = haystack.match(pattern);
  for (const index in match_result) {
    const item = match_result[index];
    const match = item.match(pattern);
    if (match && Array.isArray(match)) {
      matches.push(...item.match(pattern));
    }
  }
  return matches;
};

const webStoryReplacer = (body) => {
  const matches = matchAll(
    /<iframe .*?"nw_webstory_embed".*?<\/iframe>/gi,
    body,
  );
  if (matches) {
    matches.forEach((m) => {
      const src = (/src=(".*?")/gi).exec(m);
      const img = (/data-img=(".*?")/gi).exec(m);
      const title = (/title=(".*?")/gi).exec(m);
      if (src && img && title && src[1] && img[1] && title[1]) {
        const newElement = `<webstory src=${src[1]} img=${img[1]} title=${title[1]}/>`;
        body = body.replace(m, newElement);
      }
    });
  }
  return body;
};
module.exports.taboolaDiv = () => {
  const body = ` <div class="TABOOLA">
  <div id=${TaboolaList.articlePage.center.id}></div>
</div>`;
  return body;
};

module.exports.articleBodyParser = (
  body = "",
  isDesktop = true,
  id,
  pageAds,
  showAds = true,
  tags = [],
  dAd,
  mAd,
  stories,
  url,
  isAjax = true,
  article,
) => {
  try {
    let cd19value = "";
    let cd20value = "";
    let showRelatedWidget = false;

    if (article && article.local18_video) {
      cd19value = cd19value + "Vidgyor Player,";
      cd20value = cd20value + "Featured,";
    } else if (article.post_type === "text") {
      cd19value = "Vidgyor Player,";
      cd20value = "related-video";
    }

    String.prototype.splitter = function (isNew) {
      if (isNew) {
        return this.replace(/(\[pal[0-9]*\])/gi, "[nl]$1").split(/\[nl\]/gi);
      } else {
        return this.replace(/\r?\n?<part-breaker>\r?\n?/gi, "[nl]").split(
          /\[nl\]/gi,
        );
      }
    };

    const arrayOnly = (value) => {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "object") {
        return Object.values(value);
      }
      return [];
    };

    let { categories = [], created_at } = article;
    categories = arrayOnly(categories);
    // subsection = arrayOnly(subsection);

    // Sanjivani Ad
    const showSanjivaniAd =
      Array.isArray(tags) && tags.some((tag) => tag.name === "Sanjeevani");
    // Regex
    const blockquote = /<blockquote[\S\s]*?<\/blockquote>/i;
    const iframe = /<iframe[\S\s]*?<\/iframe>/i;
    const script = /<script[\S\s]*?<\/script>/i;
    const tables = /<table[\S\s]*?<\/table>/i;

    const $ = cheerio.load(body, null, false);

    /*body = body
      .replace(/<ul>/gi, "<ul class='ul_block'>")
      .replace(/<ol>/gi, "<ul class='ol_block'>");

    body = body.replace(/<\/ol>/gi, "</ul>");*/

    $("ul").each(function (i, el) {
      $(el).addClass("ul_block");
    });

    $("ol").each(function (i, el) {
      $(el).addClass("ol_block");
    });

    $("a").each(function (i, el) {
      if ($(el).attr("href").includes("hindi.news18.com")) {
        $(el).removeAttr("rel");
        $(el).removeAttr("target");
      } else {
        $(el).attr("rel", "noopener noreferrer nofollow");
        $(el).attr("target", "_blank");
      }
    });

    // $('iframe').each(function (i, el) {
    //   if ($(el).attr('class') === 'nw_webstory_embed') {
    //     let src = $(el).attr('src');
    //     let img = $(el).attr('data-img');
    //     let title = $(el).attr('data-title');
    //     if (src && img && title) {
    //       $(el).replaceWith(`<webstory src="${src}" img="${img}" title="${title}"/>`);
    //     }
    //   } else {
    //     let src = $(el).attr('src');
    //     $(el).addClass('lazyload');
    //     $(el).removeAttr('src');
    //     $(el).attr('data-src', src);
    //     $(el).attr('width', '100%');

    //   }
    // });

    // $('img').each(function (i, el) {
    //   $(el).addClass('lazy');
    //   $(el).attr('loading', 'lazy');
    //   $(el).attr('width', '100%');
    //   $(el).attr('alt', $(el).attr('alt') || 'News18 Hindi');
    // });

    body = $.html();

    if (body.includes("[q]") && body.includes("[/ans]")) {
      body = body
        .replace(
          "[q]",
          '<div class="article_faq"><li><div class="article_faq_question">',
        )
        .replace(/\[ans\]/gi, '<div class="article_faq_answer">')
        .replace(/\[\/q\]/gi, "</div>")
        .replace(/\[q\]/gi, '<li><div class="article_faq_question">')
        .replace(/<br\/>/gi, "")
        .split(" ");

      body[body.lastIndexOf("[/ans]")] = "</div>";
      body = body.join(" ").replace(/\[\/ans\]/gi, "</div></li>");
    }

    if (body.includes("[hq]") && body.includes("[hans]")) {
      body = body
        .replace(/[hq]/gi, '<p class="article_faq_line">')
        .replace(/\[\/hq\]/gi, "</p>")
        .replace(/\[hans\]/gi, '<ul class="faq_list">')
        .replace(/\[hstep\]/gi, '<li><p class="faq_intro">')
        .replace(/\[\/hstep\]/gi, "</p></li>")
        .replace(/\[\/hans\]/gi, "</ul>");
    }

    if (body.includes("[blurb]") && body.includes("[/blurb]")) {
      body.replace(/\[blurb\]/gi, '<div class="special-text">');
      body.replace(/\[\/blurb\]/gi, "</div>");
    }

    if (body.includes("[quote]") && body.includes("[/quote]")) {
      body.replace(
        /\[quote\]/gi,
        '<div class="quote-box"><img alt="" src="https://static.news18.com/ibnkhabar/uploads/assests/img/quote-img.png">',
      );
      body.replace(/\[\/quote\]/gi, "</div>");
    }

    //body = exports.anchorParser(body); // Handle anchor links

    if (
      body.indexOf("youtube.com/embed") !== -1 ||
      body.indexOf("data-youtube-id") !== -1
    ) {
      cd19value = cd19value + "You tube,";
      cd20value = cd20value + "Video Embed,";
    }

    // Optimize further: temporary
    let [_, tmpBodyS] = matchReplacer(script, body, [], "");
    // const [__, tmpBody] = matchReplacer(iframe, tmpBodyS, [], "");
    // Replace iframe src

    const frames = matchAll(/<iframe[\S\s]*?<\/iframe>/gi, tmpBodyS);
    const imgs = matchAll(/<img[\S\s]*?(\/>|<\/img>)/gi, tmpBodyS);
    const srcset = [...(frames || []), ...(imgs || [])];
    for (const frame of srcset) {
      const f = frame;
      if (f) {
        if (f.includes("<img")) {
          const mf = f
            .replace("<img", '<img loading="lazy"')
            .replace(/width="\d+"/gi, "width='100%'");
          tmpBodyS = tmpBodyS.replace(f, mf);
        } else {
          const mf = f
            .replace("src", "data-src")
            .replace(/width="\d+"/gi, "width='100%'");
          tmpBodyS = tmpBodyS.replace(f, mf);
        }
      }
    }

    body = webStoryReplacer(body);

    // Parse data
    const [blockqouteList, blockbody] = matchReplacer(
      blockquote,
      body,
      [],
      "bq",
    );
    let [iframeList, iframebody] = matchReplacer(iframe, blockbody, [], "if");
    const [scriptList, scriptbody] = matchReplacer(script, iframebody, [], "sc");
    let [tablelist, tableBody] = matchReplacer(tables, scriptbody, [], "tl");
    // process iframes

    let isYoutube = false;
    iframeList = iframeList.map((item) => {
      if (item.indexOf("youtube") > 0) {
        // let src = /\/embed\/([a-zA-Z0-9-_]*)/.exec(item);
        // if (src) {
        //   item = `<fakeyt src=${src[1]}></fakeyt>`;
        // }

        let cat = "";

        const allSlashSplitted =
          article && article.weburl && article.weburl.split("/");

        if (allSlashSplitted.length) {
          if (allSlashSplitted[3] === "news") {
            cat = allSlashSplitted[4];
          } else if (allSlashSplitted[3] === "photogallery") {
            cat = allSlashSplitted[4];
          } else if (allSlashSplitted[3] === "videos") {
            cat = allSlashSplitted[4];
          } else if (allSlashSplitted.length === 4 && !allSlashSplitted[1]) {
            cat = "Home";
          }
        }

        isYoutube = true;
        // let title = item.match(/(?<=title=").*?(?=[\?"])/)
        const src = (/src=(['"].*?['"])/gi).exec(item);

        const titleHeadline = article.headline
          ? article.headline
          : article.display_headline
          ? article.display_headline
          : "";
        return `<youtubeembed   cat="${cat}" creationDate="${created_at}" title="${titleHeadline}"  src=${
          src && src[1]
        }  item="${item}" isDesktop="${isDesktop}" id="${id}" ></youtubeembed>`;
      }
      if (item.indexOf("/embed/photogallery/") > 0) {
        return `<div style="margin:0 auto; text-align:center;">${item.replace(
          /<iframe /gi,
          `<iframe id="iframe-${id}" defer loading="lazy" width='100%' height="${
            isDesktop ? 430 : 430
          }"`,
        )}</div>`;
      }
      return item.replace(
        /<iframe /gi,
        `<iframe id="iframe-${id}" defer loading="lazy" width='100%'`,
      );
    });

    tableBody = exports.youtubeParser(tableBody); // Handle div youtube

    let isFakeYoutubeplayer = isYoutube || false;
    if (tableBody.indexOf("fakeyt") !== -1) {
      isFakeYoutubeplayer = true;
    }

    let disStories;
    const taboolaAd = exports.taboolaDiv();
    if (
      article &&
      article.fromDistrict &&
      article.fromDistrict.length &&
      !(article.liveblog_api_url && article.liveblog_api_url.blog_url) &&
      !(article && article.liveblog_switcher)
    ) {
      showRelatedWidget = true;
      disStories = exports.stateStories(
        article.fromDistrict,
        id,
        article.dis,
        categories,
        isDesktop,
      );
    }

    tableBody = mobileEmbedParser(tableBody); // Handle mobile embed div
    tableBody = exports.mobileVersesEmbedParser(tableBody);

    let nlist;
    let placedState;
    if (mAd || dAd) {
      const [listData, bodyData, placedStateFlag] = paraAdLogicParser({
        body: tableBody,
        adlist: isDesktop ? dAd?.nw_desktop_add ?JSON.parse(dAd?.nw_desktop_add):{} : mAd?.nw_amp_add? JSON.parse(mAd?.nw_amp_add):{},
        isMobile: !isDesktop,
        id,
        pageAds,
        url,
        showAds,
        disStories,
        taboolaAd,
      });
      tableBody = bodyData;
      nlist = listData;
      placedState = placedStateFlag;
    }
    // Process parsed data
    const parsedBody = [];
    let placeRelatedCard = false;
    (tableBody || "")
      .replace(/(\n? ?<br\/>\r?\n? ?){2,}/gs, "<part-breaker>")
      .splitter(mAd?.nw_amp_add ? JSON.parse(mAd?.nw_amp_add) : dAd?.nw_desktop_add ? JSON.parse(dAd?.nw_desktop_add):null)
      .filter((item) => item.length && !(/;"><\/p>/).test(item))
      .map((item) => {
        if (nlist) {
          const [_, syn, num] = (/\[(pal)([0-9]*)\]/gim).exec(item) || [];
          if (num) {
            item = `${item.replace(`[${syn}${num}]`, nlist[num])}`;
          }
        }

        const m = matchAll(/\[([a-z]{2,3})([0-9]*)\]/gim, item);
        if (m) {
          for (const match of m) {
            const [_, syn, num] = (/\[([a-z]{2,3})([0-9]*)\]/gim).exec(match);
            switch (syn) {
              case "tl": {
                item = `${item.replace(
                  `[${syn}${num}]`,
                  tablelist[num] &&
                    tablelist[num].replace(/<br ?\/>\r?\n?/gim, ""),
                )}`;
                break;
              }
              case "bq": {
                item = `${item.replace(`[${syn}${num}]`, blockqouteList[num])}`;
                break;
              }
              case "sc": {
                const source = scriptList[num].match(/src="([a-zA-Z0-9-.\/:]*)"/);
                item = `${item.replace(
                  `[${syn}${num}]`,
                  `<scriptloader src=${source && source[1]}></scriptloader>`,
                )}`;
                break;
              }
              case "if": {
                if (
                  item.indexOf("youTubeVideoPlayer") > -1 ||
                  (iframeList &&
                    iframeList.length &&
                    iframeList[num] &&
                    iframeList[num].indexOf("fakeyt") > -1) ||
                  isYoutube
                ) {
                  item = `${item.replace(`[${syn}${num}]`, iframeList[num])}`;
                  break;
                }
                item = `<lazyload>${item.replace(
                  `[${syn}${num}]`,
                  iframeList[num],
                )}</lazyload>`;

                break;
              }
              case "pal": {
                if (nlist) {
                  item = `${item.replace(`[${syn}${num}]`, nlist[num])}`;
                }
                break;
              }
              default: {
                break;
              }
            }
          }
        }
        return item;
      })
      .forEach((item, index, arr) => {
        item = ReplaceAnchor(item);
        if (index == 3 && !isDesktop && showAds) {
          //parsedBody.push(taboolaAd);
          
          parsedBody.push(
            `<siteadm slotId="mtfAd-${id}" adUnit="${pageAds.MTF_300}" lazyload="true"></siteadm>`,
          );
          // parsedBody.push(
          //   `<div class="OUTBRAIN" style="overflow:hidden; height:160px" data-src="${url}" data-widget-id="${isAjax ? "MB_30" : "MB_25"
          //   }"></div>${disStories || ''}`
          // );
          tmpBodyS += disStories ? disStories : "";
        }

        if (index === 4 && isDesktop && showAds) {
          //parsedBody.push(taboolaAd);
          parsedBody.push(
            `<siteadm slotId="mtfAd-${id}" adUnit="${pageAds.MTF_728}" lazyload="true"></siteadm>`,
          );
          // parsedBody.push(
          //   `<div class="OUTBRAIN" data-src="${url}" data-widget-id="${isAjax ? "AR_30" : "AR_25"
          //   }"></div>${disStories || ''}`
          // );
          tmpBodyS += disStories ? disStories : "";
        }
        if (mAd || dAd) {
          item = item.replace(/<\/p><br>/gi, "</p>");
          parsedBody.push(item);
        } else {
          parsedBody.push(`<p>${item}</p>`);
        }

        if (
          index === 1 &&
          article.fiveStateElectionData &&
          article.fiveStateElectionData.botom_strip
        ) {
          const bottomStrip = `<div id='ele-const-widget'>${article.fiveStateElectionData.botom_strip}</div>`;
          parsedBody.push(bottomStrip);
          tmpBodyS += `<div id='ele-const-widget'>${bottomStrip}</div>`;
        }

        if (
          (index === 2 || index === arr.length - 1) &&
          !isDesktop &&
          showAds &&
          !placeRelatedCard &&
          !(article && article.fromDistrict && article.fromDistrict.length)
        ) {
          placeRelatedCard = true;
          const related = `<relatednwssec id="${id}"></relatednwssec>`; // exports.relatedCard([], isDesktop, false, id);
          parsedBody.push(related);
          tmpBodyS += related;
        }
        // if (
        //   index === arr.length - 2 &&
        //   article?.ff_source !== "Hyperlocal" &&
        //   article?.liveblog_switcher !== 1
        // ) {
        //   const related = `<relatedtopvideo id="kjjkhjkhkj"></relatedtopvideo>`;
        //   parsedBody.push(related);
        //   // tmpBodyS += related;
        // }
        if (
          (nlist ? !placedState : arr.length < 4) &&
          index === arr.length - 1 &&
          disStories
        ) {
          parsedBody.push(disStories);
          tmpBodyS += disStories;
        }

        if (mAd?.nw_amp_add && JSON.parse(mAd?.nw_amp_add)) {
          return;
        }

        if (dAd?.nw_desktop_add && JSON.parse(dAd?.nw_desktop_add)) {
          return;
        }

        if (index === 1 && isDesktop && showAds) {
          parsedBody.push(`<sitead slotId="midAd-${id}"></sitead>`);
        } else if (index === 1 && showAds) {
          parsedBody.push(
            `<pg slotId="PG-${id}"  adUnit="${pageAds.PG_1x1} loadonScroll={true}"></pg>`,
          );
          parsedBody.push(
            `<siteadm slotId="midAd-${id}" adUnit="${pageAds.ATF_300}" lazyload="true"></siteadm>`,
          );
          parsedBody.push(
            `<pg slotId="PG-slider-${id}"  adUnit="NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_SLIDER_1x1"></pg>`,
          );
        }
        if (index === 6 && !isDesktop && showAds) {
          parsedBody.push(`<fly slotId="mobileAdNewFLY-${id}"></fly>`);
        }
        if (index === 8 && !isDesktop && showAds) {
          parsedBody.push(
            `<siteadm slotId="btfAd-${id}" adUnit="${pageAds.BTF_300}" lazyload="true"></siteadm>`,
          );
        }

        if (index === arr.length - 2 && !isDesktop && showSanjivaniAd) {
          parsedBody.push(`<sanjivani slotId="sanjivani_${id}" ></sanjivani>`);
        }
        if (index === arr.length - 2 && isDesktop && showSanjivaniAd) {
          parsedBody.push(
            `<sanjivanidesktop slotId="sanjivani_${id}" ></sanjivanidesktop>`,
          );
        }
      });
    return {
      parsedBody,
      body: tmpBodyS,
      cd19: cd19value,
      cd20: cd20value,
      isFakeYoutubeplayer,
      showRelatedWidget,
    };
  } catch (error) {
    console.log("Error from articleBodyParser:", error);
    return {
      parsedBody: [],
      body: "",
      cd19: "",
      cd20: "",
      isFakeYoutubeplayer: false,
      showRelatedWidget: false,
    };
  }
};

function paraAdLogicParser({
  body,
  adlist = {},
  isMobile,
  id,
  pageAds,
  showSanjivaniAd,
  url,
  showAds,
  disStories,
  taboolaAd,
}) {
  let placedStateFlag = false;
  body = body.replace(/<p>(\[sc[0-9]*]\r?\n?) ?<\/?p>/gim, "$1");
  const paraRegex = /<p[\S\s]*?<\/p>/i;
  let [paraList, paraBody] = matchReplacer(paraRegex, body, [], "pal", true);
  const adKeys = Object.keys(adlist).map((item) => Number(item));
  const paraSize = paraList.length;
  paraList = paraList.map((para, dex) => {
    if (dex == 2) {
      placedStateFlag = true;
      return `${para}${disStories || ""}`;
    }

    if (dex == 0) {
      if (isMobile) {
      } else {
        return `${para}`;
      }
    }

    if (dex == 1) {
      return `<div id="ele-const-widget"></div>${para}`;
    }

    if (adKeys.includes(dex + 1) && showAds) {
      return `${para}${insertAd({
        dex: adKeys.indexOf(dex + 1),
        paraSize,
        isMobile,
        id,
        pageAds,
        showSanjivaniAd,
        url,
        disStories,
        taboolaAd,
        index: dex
      })}`;
    }
    return para;
  });
  return [paraList, paraBody, placedStateFlag];
}
function insertAd({
  dex,
  paraSize,
  isMobile,
  pageAds,
  id,
  showSanjivaniAd,
  url,
  disStories,
  index
}) {
  const sLastP = paraSize - 2;
  switch (dex) {
    case 0: {
      if (isMobile) {
        return `
        <pg slotId="PG-${id}"  adUnit="${pageAds.PG_1x1}"></pg>
        <siteadm slotId="midAd-${id}" adUnit="${pageAds.ATF_300}" lazyload="true"></siteadm>
        <pg slotId="PG-slider-${id}" adUnit="NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_SLIDER_1x1"></pg>`;
      } else {
        return `<sitead slotId="midAd-${id}"></sitead>`;
      }
    }
    case 1: {
      // if (isMobile) {
      //   return `<div class="OUTBRAIN" style="overflow:hidden;" data-src="${url}" data-widget-id="MB_25"></div>`;
      // } else {
      //   return `<div class="OUTBRAIN" data-src="${url}" data-widget-id="AR_25"></div>`;
      // }
    }
    case 2: {
      if (isMobile) {
        return `<fly slotId="mobileAdNewFLY-${id}"></fly>`;
      } else {
        return `<siteadb slotId="btfAd-${id}-${index}" adUnit="${pageAds.BTF_728}"></siteadb>`;
      }
    }
    case sLastP: {
      if (showSanjivaniAd) {
        if (isMobile) {
          return `<sanjivani slotId="sanjivani_${id}" ></sanjivani>`;
        } else {
          return `<sanjivanidesktop slotId="sanjivani_${id}" ></sanjivanidesktop>`;
        }
      }
    }
    default: {
      if (dex != 0) {
        if (isMobile) {
          return `<siteadm slotId="btfAd-${id}-${dex}" adUnit="${pageAds.BTF_300}" lazyload="true"></siteadm>`;
        }
      }
      if (!isMobile) {
        return `<siteadb slotId="btfAd-${id}-${dex}" adUnit="${pageAds.BTF_728}"></siteadb>`;
      }
    }
  }
}
function ReplaceAnchor(str){
  if(str.indexOf("href") > -1 && str.indexOf("<a>")){
    return str?.replace("<a","<a class=cp_article_hyperlink");
  }else{
    return str;
  }
}
