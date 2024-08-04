function empty(mixedVar) {
  var undef;
  var key;
  var i;
  var len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixedVar === "object") {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  return false;
}
function str_replace (search, replace, subject, countObj) {
  var i = 0
  var j = 0
  var temp = ''
  var repl = ''
  var sl = 0
  var fl = 0
  var f = [].concat(search)
  var r = [].concat(replace)
  var s = subject
  var ra = Object.prototype.toString.call(r) === '[object Array]'
  var sa = Object.prototype.toString.call(s) === '[object Array]'
  s = [].concat(s)

  var $global = (typeof window !== 'undefined' ? window : global)
  $global.$locutus = $global.$locutus || {}
  var $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  if (typeof (search) === 'object' && typeof (replace) === 'string') {
    temp = replace
    replace = []
    for (i = 0; i < search.length; i += 1) {
      replace[i] = temp
    }
    temp = ''
    r = [].concat(replace)
    ra = Object.prototype.toString.call(r) === '[object Array]'
  }

  if (typeof countObj !== 'undefined') {
    countObj.value = 0
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + ''
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
      s[i] = (temp).split(f[j]).join(repl)
      if (typeof countObj !== 'undefined') {
        countObj.value += ((temp.split(f[j])).length - 1)
      }
    }
  }
  // console.log("dataa = ",sa ? s : s[0]?.length > 0 ? s[0])
  return sa ? s : (s[0] !== null && s[0] !=="") ? s[0]:"";
}

function substr_replace (str, replace, start, length) {
  if (start < 0) {
    // start position in str
    start = start + str.length
  }
  length = length !== undefined ? length : str.length
  if (length < 0) {
    length = length + str.length - start
  }

  return [
    str?.slice(0, start),
    replace?.substr(0, length),
    replace?.slice(length),
    str?.slice(start + length)
  ].join('')
}

function strpos (haystack, needle, offset) {
  var i = (haystack + '')
    .indexOf(needle, (offset || 0))
  return i === -1 ? false : i
}

const articleHelper = {
  storyPara: function (
    article_data,
    ajaxArticle = false,
    mobile = false,
    liveblog = false,
    amp = false,
    ytEmbedId
  ) {
    const category =
      typeof article_data.section !== "undefined" ? article_data.section : "";
    const articleHeadline = article_data.headline || article_data.title || "";
    let arrayBody = article_data["body"] || "";
    //Add to New Feature "HOW TO"
    if (
      article_data.body?.includes("[q]")  && article_data.body?.includes("[/ans]")
    ) {
      const regex = new RegExp("\\[hq\\]([\\s\\S]*)\\[/hans\\]");
      const matched = regex.exec(arrayBody);
      let parsed = matched && matched[1];

      // parsed			= preg_replace('/\r?\n|\r/','', parsed);
      parsed = str_replace("<br />", "", parsed);
      const parsed_data =  parsed === 'null'?"": "[hq]" + parsed + "[/hans]";

      const first_ouured = strpos(arrayBody, "[hq]");
      const last_ouured = strpos(arrayBody, "[/hans]");
      const total_replace_count = last_ouured - first_ouured;
      arrayBody = substr_replace(
        arrayBody,
        parsed_data,
        first_ouured,
        total_replace_count
      );
      //Question
      arrayBody = str_replace(
        "[hq]",
        '<p class="article_faq_line">',
        arrayBody
      );
      arrayBody = str_replace("[/hq]", "</p>", arrayBody);
      //Answer
      arrayBody = str_replace("[hans]", '<ul class="faq_list">', arrayBody);
      arrayBody = str_replace(
        "[hstep]",
        '<li><p class="faq_intro">',
        arrayBody
      );
      arrayBody = str_replace("[/hstep]", "</p></li>", arrayBody);
      arrayBody = str_replace("[/hans]", "</ul>", arrayBody);
    }
    if (
      article_data.body?.includes("[q]")  && article_data.body?.includes("[/ans]")
    ) {
      //Question
      const first_ouured = strpos(arrayBody, "[q]");
      const string =
        '[faqstart]<div class="article_faq"><p class="article_faq_line"></p><ul>';
      arrayBody = substr_replace(arrayBody, string, first_ouured, 0);

      const last_ouured = arrayBody.lastIndexOf("[/ans]");
      const string_last = "</ul></div>[faqend]";
      arrayBody = substr_replace(arrayBody, string_last, last_ouured, 0);

      const regex = new RegExp("\\[faqstart\\]([\\s\\S]*)\\[faqend\\]");
      const matched = regex.exec(arrayBody);
      let parsed = matched && matched[1];

      // parsed 		    = preg_replace('/\r?\n|\r/','', parsed);
      parsed = str_replace("<br />", "", parsed);
      const parsed_data = "[faqstart]" + parsed + "[faqend]";

      const first_ouured_add = strpos(arrayBody, "[faqstart]");
      const last_ouured_add = strpos(arrayBody, "[faqend]");
      // let total_replace_count = last_ouured_add - first_ouured_add;

      arrayBody = substr_replace(
        arrayBody,
        parsed_data,
        first_ouured_add,
        last_ouured_add
      );

      arrayBody = str_replace("[faqstart]", "", arrayBody);
      arrayBody = str_replace("[faqend]", "", arrayBody);
      arrayBody = str_replace(
        "[q]",
        '<li><div class="article_faq_question">',
        arrayBody
      );
      arrayBody = str_replace("[/q]", "</div>", arrayBody);
      //Answer
      arrayBody = str_replace(
        "[ans]",
        '<div class="article_faq_answer">',
        arrayBody
      );
      arrayBody = str_replace("[/ans]", "</div></li>", arrayBody);
    }
    if (arrayBody.includes("<il>") || arrayBody.includes("</il>")) {
      arrayBody = arrayBody.replace("<il>", "");
      arrayBody = arrayBody.replace("</il>", "");
    }
    // End to New Feature "HOW TO"
    if (amp) {
      arrayBody = arrayBody.replace(/ contenteditable.+"/, "");
      arrayBody = arrayBody.replace(/ spellcheck.+"/, "");
      return { __html: arrayBody };
    }
    // code to set thirparty code
    // if (strpos(arrayBody, "<blockquote ") !== false) {
    //   const first_ouured = strpos(arrayBody, "<blockquote");
    //   const string = "[embdedcodestart]";
    //   arrayBody = substr_replace(arrayBody, string, first_ouured, 0);

    //   const last_ouured = strpos(arrayBody, "</blockquote>");
    //   const string_last = "[embdedcodeend]";
    //   arrayBody = substr_replace(arrayBody, string_last, last_ouured, 0);

    //   const regex = new RegExp(
    //     "\\[embdedcodestart\\]([\\s\\S]*)\\[embdedcodeend\\]"
    //   );
    //   const matched = regex.exec(arrayBody);
    //   let parsed = matched && matched[1];
    //   // parsed 		= preg_replace('/\r?\n|\r/','', parsed);
    //   parsed = str_replace("<br />", "", parsed);
    //   parsed = str_replace("<br/>", "", parsed);

    //   arrayBody = this.replace_between(
    //     arrayBody,
    //     "[embdedcodestart]",
    //     "[embdedcodeend]",
    //     parsed
    //   );
    //   arrayBody = str_replace("[embdedcodestart]", "", arrayBody);
    //   arrayBody = str_replace("[embdedcodeend]", "", arrayBody);
    // }

    arrayBody = arrayBody.replace(
      "http://img01.ibnlive.in",
      "https://images.news18.com",
      arrayBody
    );
    // const active = 4; // target occurrence
    // const occurrence = 0; // counter
    // arrayBody = arrayBody.replace( /<br\W*?\/>\r\n<br\W*?\/>/gs, '');
    // arrayBody = arrayBody.replace(/(<([br/>]+)>)/gs,'<br>');
    arrayBody = arrayBody.replace("<br><ol>", "<ol>");
    arrayBody = arrayBody.replace("</ol><br>", "</ol>");
    arrayBody = arrayBody.replace("<br><ul>", "<ul>");
    arrayBody = arrayBody.replace("</ul><br>", "</ul>");
    arrayBody = arrayBody.replace("<br><li>", "<li>");
    arrayBody = arrayBody.replace("</li><br>", "</li>");
    arrayBody = arrayBody.replace("<br><h4>", "<h4>");
    arrayBody = arrayBody.replace("</h4><br>", "</h4>");
    arrayBody = arrayBody.replace(
      "<br><iframe",
      '<div class="mimg-vdo"><iframe'
    );
    arrayBody = arrayBody.replace("</iframe><br>", "</iframe></div>");
    arrayBody = arrayBody.replace("[blurb]", "<h5>");
    arrayBody = arrayBody.replace("[/blurb]", "</h5>");
    arrayBody = arrayBody.replace("[quote]", "<blockquote>");
    arrayBody = arrayBody.replace("[/quote]", "</blockquote>");
    arrayBody = arrayBody.replace(
      '<div class="disclamer">',
      '<div class="disclamer"><strong>Disclaimer:</strong>'
    );
    arrayBody = arrayBody.replace("allowTransparency", "allowtransparency");

    //const adNew			= this.get_ad('NW18_GUJ_Desktop/NW18_GUJ_ROS/NW18_GUJ_ROS_AS/NW18_GUJ_ROS_AS_ROS_BTF_728', [[970, 90], [728, 90], [970, 200],[980,200]], false, ajaxArticle, article_data.story_id);
    const adNew = "<div id='midAd" + article_data.story_id + "'></div>";
    const adFlying =
      '<div class="ad_cntainer"><div class="adinner"><div class="adinner_fxbox"></br><div><div id="mobileAdNewFLY' +
      article_data.story_id +
      '"></div></div></div></div></div>';
    const btfAd = `</br><div class="adbelow"><div id='btfAd${article_data.story_id}'></div></div></br>`;

    // arrayBody = arrayBody.replace(/<\/strong>(<br\/>\n?){2,}/gim,'</strong><br>');
    // arrayBody = arrayBody.replace(/<strong>/gs,'<br><strong>');
    // arrayBody = arrayBody.replace(/(?<="_blank">)(<br><strong>)/gs,'<strong>');
    // arrayBody = arrayBody.replace(/(?<=<br>)(<a)/gs,'<br><a');
    // arrayBody = arrayBody.replace(/(\r)(?!=\n<br>)/gs,'<br>');
    arrayBody = arrayBody.replace(/(\n? ?<br\W*?\/>\r?\n?){3,}/gs, "<br>\r\n");
    arrayBody = arrayBody.replace(
      /(target=\"_blank\")/gs,
      'target="_blank" rel="nofollow"'
    );
    // arrayBody = arrayBody.replace(/(youtube.com\/embed\/[a-zA-Z0-9-_]*)/, '$1?autoplay=1&mute=1');
    arrayBody = arrayBody.split(/\n<br ?\/?>\r\n/);

    let html = "";
    let adCount = 0;
    for (let i = 0; i <= arrayBody.length; i++) {
      if (arrayBody[i] && arrayBody[i] != "") {
        if (arrayBody[i].includes("<img")) {
          const widhtExp = /width="(.*?)"/g,
            heightExp = /height="(.*?)"/g;
          const widthsrc = widhtExp.exec(arrayBody[i]),
            heightsrc = heightExp.exec(arrayBody[i]);

          if (widthsrc != null) {
            arrayBody[i] = arrayBody[i].replace(widthsrc[0], 'width="100%"');
          }
          if (heightsrc != null) {
            arrayBody[i] = arrayBody[i].replace(heightsrc[0], "");
          }
        }
        html += "<br/>" + arrayBody[i];
        if (i === 2) {
          // html += `<SiteAd slotId={"mid_ad"} adUnit={ 'NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AS/NW18_HIND_ROS_AS_MID_728_0' } sizes={[[728, 90]]} />`
          html += '<br><div class="middlead">' + adNew + "</div></br>";
          adCount++;
        }

        if (i === 4 && !liveblog && mobile) {
          html += adFlying;
          adCount++;
        }

        if (i === 6 && mobile) {
          html += btfAd;
          adCount++;
        }

        if (arrayBody.length - 3 === i) {
          let youtubeVideo = "";
          if (ytEmbedId && ytEmbedId) {
            let height = "520";
            let width = "900";

            if (mobile) {
              height = "220";
              width = "330";
            }
            if (!amp) {
              youtubeVideo =
                '<div id="' +
                i +
                '" class="' +
                "article_youtube_player" +
                '"><div class="youTubeVideoPlayer"  data-youtube="true" data-youtube-id="' +
                ytEmbedId +
                '" data-youtube-title="' +
                articleHeadline +
                '" data-youtube-category="' +
                category +
                '" data-youtube-width="' +
                width +
                '" data-youtube-height="' +
                height +
                '"></div>';
            } else {
              youtubeVideo = `<amp-youtube width="220" height="250" layout="responsive" data-videoid=${ytEmbedId} autoplay></amp-youtube>`;
            }
          }
          //auto embed video end
          html += youtubeVideo;
        }
      }
    }

    const findScript = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    const scriptTag = findScript.exec(html);

    let source = "";

    if (!ajaxArticle && scriptTag) {
      const srcRegEx = /src="(.*?)"/g;
      source = srcRegEx.exec(scriptTag[0]);
      if (source) {
        source = source[1];
      }
    }

    const findIframe = /<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gm;
    const iframeTag = findIframe.exec(html);

    let iframeSource = "";

    if (!ajaxArticle && iframeTag && !amp) {
      const srcRegEx = /src="(.*?)"/g;
      const iframeSourceData = srcRegEx.exec(iframeTag[0]);
      if (iframeSourceData) {
        iframeSource = iframeSourceData[1];
        const replaceIframe = iframeSourceData["input"];
        const newIframe = `<iframe id="iframe-${article_data.story_id}" src="${iframeSource}" data-src="${iframeSource}" width="100%" ></iframe>`;

        html = html.replace(replaceIframe, newIframe);
      }
    }

    html = html.replace(
      /(youtube\.com\/embed\/[a-zA-Z0-9-_]*") width="100%"/gim,
      `$1 width="${mobile ? 330 : 560}" height="${mobile ? 220 : 320}"`
    );

    //html = arrayBody.replace(/<iframe .*>.*<\/iframe>/ig, ''); /* Remove iframe */

    if (source != "" && !amp) {
      html = html.replace(
        /<script .*>.*<\/script>/gi,
        ""
      ); /* Remove script tags */

      html += `<script>setTimeout(() => {
                var script = document.createElement('script'); 
                script.src =  "${source}"; 
                script.defer =  true;
                document.body.appendChild(script) 
              }, 3000)</script>`;
    }

    if (iframeSource != "" && !amp) {
      html += `<script>function deferIframe${article_data.story_id}() {
                var iframeElem = document.getElementById('iframe-${article_data.story_id}');
                if(iframeElem) {
                    iframeElem.setAttribute('src',iframeElem.getAttribute('data-src'));
                }
              }setTimeout(() => {
                deferIframe${article_data.story_id}()
              }, 3000)</script>`;
    }

    html = html.replace(/(\n? ?<br\W*?\/>\r?\n?){3,}/gs, "<br>\r\n");
    return { __html: html, adCount };
  },
  convertedToSlug: function (Text) {
    if (Text) {
      return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    }
  },
  _getRatingArticleV2: function (total, rating, className) {
    return new Array(total)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`${className}${
            index + 1 <= rating
              ? "-full"
              : index + 1 == Math.round(rating) && rating - index + 1 != 0
              ? "-half"
              : ""
          }`}
        ></span>
      ));
  },
};

export default articleHelper;
