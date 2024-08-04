// import your default seo configuration
exports.escapeHtml = (text = "") => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    ":": "%34",
  };

  return text && (typeof text === "string") && text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};

exports.getAMPCodes = function (text) {
  if(!text) return "";
    let NewsContent = exports.getImageList(text);
    NewsContent = exports.titleFont(NewsContent);
    NewsContent = exports.getInstagramCode(NewsContent);
    NewsContent = exports.getTwitterCode(NewsContent);
    NewsContent = exports.getFacebookCode(NewsContent, 'fb-post');
    NewsContent = exports.getFacebookCode(NewsContent, 'fb-video');
    NewsContent = exports.getIFrameCode(NewsContent);
    NewsContent = exports.getSanitizedAMPCode(NewsContent);
    return NewsContent;
};
exports.getImageList = function (text) {
  if (text) {
    let NewsContent = text.replace(/\[caption.*?\](.*?)\[\/caption\]/, "$1");
    NewsContent = NewsContent.replace(/(<img.*)width=".*?"(.*\/>)/g, '$1$2');
    NewsContent = NewsContent.replace(/(<img.*)height=".*?"(.*\/>)/g, '$1$2');
	  NewsContent = NewsContent.replace(/<img(?!.*src).*?>/g, ''); // when image added with no src, removed img tag
	  NewsContent = NewsContent.replace(/alt=""100%"/g, ''); // removed wrong content of alt
	  NewsContent = NewsContent.replace(/width="100%"/g, ''); // removed wrong content of width
	  NewsContent = NewsContent.replace(/<img(.*?)\/?>/g, '<amp-img $1  layout="responsive"  width=300 height=324></amp-img>');
    NewsContent = NewsContent.replace('decoding="async"', ''); // removed content for amp validatiion
	  NewsContent = NewsContent.replace('loading="lazy"', ''); // removed content for amp validatiion
    
    return NewsContent;
  }
};
exports.getInstagramCode = function (NewsContent) {
  const instagramBlock = NewsContent && NewsContent.match(
    /<blockquote class="instagram-media"(.*?<\/blockquote>)/sg
  );
  if (instagramBlock) {
    for (let x = 0; x < instagramBlock.length; x++) {
      const tempInst = instagramBlock[x];
      const InstDet = tempInst.match(/(href)=("[^"]*")/gim);
      if(InstDet) {
        for (let y = 0; y < InstDet.length; y++) {
          if (InstDet[y] !== "undefined") {
            const InstagramURL = InstDet[y]; //.replace(/\"/,'');
            //InstagramURL = InstagramURL.replace('/\//','');

            const SplitInstagramURL = InstagramURL.split("/");

            const InstagramID =
              SplitInstagramURL[parseInt(SplitInstagramURL.length) - 2];

            if (InstagramID) {
              const AMP_InstagramCode =
                "<p><amp-instagram	data-shortcode=" +
                InstagramID +
                '	width="400"	height="400" layout="responsive"></amp-instagram></p>';

              NewsContent = NewsContent.replace(tempInst, AMP_InstagramCode);

              //let InstagramScript = '<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>';

              // if ( !in_array( $InstagramScript , $ScriptList ) )
              // 	$ScriptList[] = $InstagramScript;
            }
          }
        }
      }
    }
  }
  return NewsContent;
};
exports.getTwitterCode = function (NewsContent) {
  const TweetBlock = NewsContent.match(
    /<blockquote class="twitter-tweet"(.*?<\/blockquote>)/gs
  );

  //console.log("tweet"+TweetBlock)
  if (TweetBlock) {
    for (let x = 0; x < TweetBlock.length; x++) {
      const tempT = TweetBlock[x];
      //console.log("tempt"+tempT+'temptend')
      const TweetDet = tempT.match(/(href)=("[^"]*")/gim);
      if(!TweetDet) {
        continue;
      }
      //console.log("TweeDET"+TweetDet)
      for (let y = 0; y < TweetDet.length; y++) {
        if (typeof TweetDet[y] !== "undefined") {
          const TweetURLs = TweetDet[y].replace(/\"$/, "");
          //console.log("TweetURL"+TweetURLs)
          if (TweetURLs.indexOf("/status/") !== -1) {
            const SplitTweetURLs = TweetURLs.split("/status/");
            //console.log("splitTer"+ SplitTweetURLs)
            let TweetID = SplitTweetURLs[SplitTweetURLs.length - 1];

            if (TweetID != "") {
              TweetID = TweetID.trim('"');
              const AMP_TweetCode =
                '<p><amp-twitter width="380" height="50" layout="responsive" data-tweetid="' +
                TweetID +
                '"></amp-twitter></p>';

              NewsContent = NewsContent.replace(tempT, AMP_TweetCode);

              //$TwitterScript = '<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>';

              // if ( !in_array( $TwitterScript , $ScriptList ) )
              //     $ScriptList[] = $TwitterScript;
            }
          }
        }
      }
    }
  }

  return NewsContent;
};
exports.getFacebookCode = function (NewsContent, FBContentType) {
  const regex = '/<div class="' + FBContentType + '"(.*?</div>.*</div>)/img';
  FacebookBlock = NewsContent.match(regex);
  // console.log(FacebookBlock);

  return NewsContent;
};
exports.getIFrameCode = function (NewsContent) {
  // NEW BOARD RESULT
  /*let matchDiv = NewsContent.match(
    /<div( [^>]*?)? class="[^"]*?nw18boardresultdiv.*?"( .*?)?>(.*?)<\/div>/is
  );

  if (matchDiv) {
    for (let [index, value] of matchDiv[0].entries()) {
      let nativeCode = value.replace("<iframe", "<amp-iframe");
      nativeCode = nativeCode.replace("/iframe>", "/amp-iframe>");
      nativeCode = nativeCode.replace(
        "/(<.*?)(width=(\"|')(.*?)(\"|'))(.*?>)/",
        "\\1\\6"
      );
      nativeCode = nativeCode.replace(
        "/(<.*?)(height=(\"|')(.*?)(\"|'))(.*?>)/",
        "\\1\\6"
      );
      nativeCode = nativeCode.replace(
        "<amp-iframe",
        '<amp-iframe width="300" height="360"									sandbox="allow-scripts allow-popups" layout="responsive" 									frameborder="0"'
      );

      NewsContent = NewsContent.replace(value, nativeCode);
    }
  }*/

  const IFrameBlock = NewsContent.match(/<iframe(.*?)>(.*?)<\/iframe>/gs);
  //console.log("IframeBlock"+IFrameBlock)
  let AMP_IFrameCode = "";
  if (IFrameBlock) {
    for (let x = 0; x < IFrameBlock.length; x++) {
      const tempIFrame = IFrameBlock[x];
      const IFrameDet = tempIFrame.match(/(src)=(("|')[^"]*("|'))/gims);
      if (IFrameDet) {
        for (let y = 0; y < IFrameDet.length; y++) {
          let IFrameURL;
          if(IFrameDet[y].includes("facebook")) {
            IFrameURL = IFrameDet[y].trim('"').trim("'").replace(/src=("|')/, '').replace(/("|')/, '');
          } else {
            IFrameURL = IFrameDet[y].trim('"').trim("'").replace(/src=("|')/, '').replace(/("|')/, '').split(/(;| )/)[0];
          }

          if (IFrameURL.indexOf("https://") !== -1) {
            /* ONLY SECURED URLS ALLOWED */
            if (IFrameURL.indexOf("https://www.youtube.com/") !== -1) {
              /* YOUTUBE AMP CODE */
              const SplitIFrameURL = IFrameURL.split("/embed/");
              let YoutubeID =
                SplitIFrameURL[parseInt(SplitIFrameURL.length) - 1];
              if (YoutubeID != "") {
                YoutubeID = YoutubeID.replace(/\"$/, "");
                YoutubeID = YoutubeID.split(/[\&?]/)[0];
                const AMP_YouTubeCode =
                  '<p class="ambdytb" id="YoutubeEmbed"><amp-youtube  data-video-event="Article_Youtube" data-videoid="'+ YoutubeID +'" layout="responsive" width="380" height="285"></amp-youtube></p>';

                NewsContent = NewsContent.replace(tempIFrame, AMP_YouTubeCode);
              }
            } else {
              /* IFRAME AMP CODE */
              if (IFrameURL.indexOf("embed") !== -1) {
                if (IFrameURL.indexOf("videos") !== -1) {
                  AMP_IFrameCode = '<p class="embdglr"><amp-iframe width="300" height="180" layout="fixed" frameborder="0" src="'+ IFrameURL +'" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></amp-iframe></p>';
                } else {
                  AMP_IFrameCode = '<p class="embdglr"><amp-iframe width="300" height="250"  layout="fixed" frameborder="0" src="'+IFrameURL +'" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></amp-iframe></p>';
                }
              } else {
                if (IFrameURL.indexOf("facebook.com/plugins/video.php") !== -1) {
                  AMP_IFrameCode = '<p  class="embdglr"><amp-iframe width="300" height="180" sandbox="allow-scripts allow-same-origin allow-popups" layout="responsive"  frameborder="0" src="' + IFrameURL + '"></amp-iframe></p>';
                } else {
	                if(IFrameURL.indexOf('hindi.news18.com')!=-1) {
		                AMP_IFrameCode = '<p><amp-iframe width=300 height=650 sandbox="allow-scripts allow-popups" layout="fixed" frameborder="0"  src="' + IFrameURL + '"></amp-iframe></p>';
	                }else{
		                AMP_IFrameCode = '<p><amp-iframe width=380 height=450 sandbox="allow-scripts allow-same-origin allow-popups" layout="responsive" frameborder="0"  src="' + IFrameURL + '"></amp-iframe></p>';
	                }
                }
              }
              NewsContent = NewsContent.replace(tempIFrame, AMP_IFrameCode);
            }
          }
        }
      }
    }
  }
	NewsContent = NewsContent.replace(/<iframe/gim, "<amp-iframe");
	NewsContent = NewsContent.replace(/\/iframe>/gim, "/amp-iframe>");
	NewsContent =NewsContent.replace(/AllowFullScreen="true"/g, `allowfullscreen`);
  if(NewsContent.match(/style=.*?!important.*?/g)) NewsContent = NewsContent.replace(/!important/g, "");
	return NewsContent;
};
exports.getSanitizedAMPCode = function (NewsContent) {
	NewsContent = NewsContent.replace(
		/<script [^<]*>[^>]*<\/script>/gi,
		""
	); /* Remove script tags */

  NewsContent = NewsContent.replace(
		/(style=("|\\")(.*?)("|\\"))/gim,
		""
	); /* Remove Inline CSS */

  NewsContent = NewsContent.replace(
		/(style=("|\')(.*?)("|\'))/gim,
		""
	); /* Remove Inline CSS */

	NewsContent = NewsContent.replace(
		/<strong>(<.*?)(style=("|\')(.*?)("|\')>)([^<]*?)<\/[a-z]*> ?<\/strong>/gi,
		"<strong>$6</strong>"
	);

	NewsContent= NewsContent.replace(
		/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""
	);

  /* Sanitizing target attribute as per AMP specification */
  NewsContent = NewsContent.replace('target="_self"', 'target="_blank"');
  NewsContent = NewsContent.replace('target="_parent"', 'target="_blank"');
  NewsContent = NewsContent.replace('target="_top"', 'target="_blank"');
  NewsContent = NewsContent.replace("<p></p>", "");
  NewsContent = NewsContent.replace("<p>&nbsp;</p>", "");
  NewsContent = NewsContent.replace('<p align="left">', "");
  NewsContent = NewsContent.replace(/<style>.*?<\/style>/s, "");
  NewsContent = NewsContent.replace("<br /><br />", "");
  NewsContent = NewsContent.replace("style=color:rgb(64, 64, 64);", "");
  NewsContent = NewsContent.replace('href="font-size:"', "");
  if(NewsContent.match(/(<a.*?)spellcheck=".*?"(.*\/>)/g)) NewsContent = NewsContent.replace(/spellcheck=".*?"/g, "");
  if(NewsContent.match(/style=.*?!important.*?/g)) NewsContent = NewsContent.replace(/!important/g, "");

  const strip_tags =
    "font|link|source|ol|div|h1|style|img|base|video|audio|iframe|frameset|object|param|applet|embed|form|input|button|acronym|center|dir|hgroup|listing|multicol|nextid|nobr|spacer|strike|tt|xmp|script";

  NewsContent = NewsContent.replace(
    "/<s*/?(" + strip_tags + ")s*[^>]*?>/img",
    ""
  );

  return NewsContent;
};
exports.unparsable_structured_data_fix = function (text) {
  if (text) {
    text = text.replace(/\'+/, "");
    text = text.replace(/\"+/, "");
    text = text.replace(/\=+/, "");
    text = text.replace(/\:+/, "");
    text = text.replace(/\,+/, "");
  }
  return text;
};
exports.ad_new_config_cat = function (DFP_SUB_SECTION = "", DFP_SECTION = "") {
  let _dfp_cat_first = "";
  let _dfp_cat_second = "";
  let _dfp_cat_third = "";

  const arr_cat_short_name = {
    "nation": ["DESH", "DESH", "DSH"],
    "news": ["DESH", "DESH", "DSH"],
    "states": ["PRADESH", "PRADESH", "PRADSH"],
    "uttar-pradesh": ["PRADESH", "PRADESH_UP", "PRADSH_UP"],
    "bihar": ["PRADESH", "PRADESH_BIH", "PRADSH_BR"],
    "madhya-pradesh": ["PRADESH", "PRADESH_MP", "PRADSH_MP"],
    "uttarakhand": ["PRADESH", "PRADESH_UTK", "PRADSH_UK"],
    "rajasthan": ["PRADESH", "PRADESH_RAJ", "PRADSH_RJ"],
    "haryana": ["PRADESH", "PRADESH_HAR", "PRADSH_HR"],
    "jharkhand": ["PRADESH", "PRADESH_JKD", "PRADSH_JK"],
    "chhattisgarh": ["PRADESH", "PRADESH_CHG", "PRADSH_CH"],
    "himachal-pradesh": ["PRADESH", "PRADESH_HP", "PRADSH_HP"],
    "maharashtra": ["PRADESH", "PRADESH_MAH", "PRADSH_MH"],
    "delhi-ncr": ["PRADESH", "PRADESH_DELHI", "PRADSH_DL"],
    "delhi": ["PRADESH", "PRADESH_DELHI", "PRADSH_DL"],
    "punjab": ["PRADESH", "PRADESH_PUNJAB", "PRADSH_PJB"],
    "tech": ["TECH", "TECH", "TECH"],
    "dharm": ["DHARM", "DHARM", "DHARM"],
    "world": ["DUNIA", "DUNIA", "DUNYA"],
    "entertainment": ["MANORANJAN", "MANORANJAN", "MANO"],
    "sports": ["KHEL", "KHEL", "KHEL"],
    "cricket": ["KHEL", "CRI", "CRI"],
    "business": ["MONEY", "MONEY", "MNY"],
    "auto": ["AUTO", "AUTO", "AUTO"],
    "crime": ["CRIME", "CRIME", "CRIME"],
    "knowledge": ["SPECIAL", "SPL_KNOLEDGE", "SPL_KNWLDG"],
    "career": ["SPECIAL", "SPL_CARRIER", "SPL_CAR"],
    "lifestyle": ["SPECIAL", "SPL_LIFE", "SPL_LIFE"],
    "ajab-gajab": ["SPECIAL", "SPL_OMG", "SPL_OMG"],
    "mobile": ["MOBILE_TECH", "MTECH", "MTECH"],
    "shows": ["NW18_INDIASHOW", "NW18INDSHW", "SHW"],
    "regional-shows": ["REGIONALSHOW", "REGSHW", "REGSHW"],
    "photogallery": ["PHOTO", "PHOTO", "PHT"],
    "videos": ["VIDEO", "VIDEO", "VID"],
    "LiveBlog": ["LIVEBLOG", "LIVEBLOG", "LIVBLG"],
	  "jobs": ["JOBS", "JOBS", "JOBS"],
    "district": ["DISTRICT", "DISTRICT", "DIST"],
    "education": ["EDUCATION", "EDUCATION", "EDU"]
  };

  if (DFP_SUB_SECTION && DFP_SECTION) {
    if (arr_cat_short_name[DFP_SECTION]) {
      _dfp_cat_first = arr_cat_short_name[DFP_SECTION][0];
      _dfp_cat_second = arr_cat_short_name[DFP_SECTION][1];
      _dfp_cat_third = arr_cat_short_name[DFP_SECTION][2];
    }
    if (arr_cat_short_name[DFP_SUB_SECTION]) {
      _dfp_cat_second += "_" + arr_cat_short_name[DFP_SUB_SECTION][1];
      _dfp_cat_third += "_" + arr_cat_short_name[DFP_SUB_SECTION][2];
    }
  } else if (DFP_SUB_SECTION == "" && DFP_SECTION) {
    if (arr_cat_short_name[DFP_SECTION]) {
      _dfp_cat_first = arr_cat_short_name[DFP_SECTION][0];
      _dfp_cat_second = arr_cat_short_name[DFP_SECTION][1];
      _dfp_cat_third = arr_cat_short_name[DFP_SECTION][2];
    }
  }

  if (_dfp_cat_first) {
    return {
      adNode1: _dfp_cat_first,
      adNode2: _dfp_cat_second,
      adNode3: _dfp_cat_third,
    };
  } else {
    return {};
  }
};
exports.get_amp_ad_article = function (
  DFP_SUB_SECTION = "",
  DFP_SECTION = "",
  adForPage = "listing",
  isDistrict=false,
) {
  if(DFP_SECTION === "LiveBlog") {
    return {
      topAd: "/1039154/NW18_HIND_AMP/NW18_HIND_LIVEBLOG_AMP/NW18_HIND_LIVEBLOG_AMP_AS/NW18_HIND_LIVBLG_AS_AMP_ROS_ATF_320",
      middleAd1: "/1039154/NW18_HIND_AMP/NW18_HIND_LIVEBLOG_AMP/NW18_HIND_LIVEBLOG_AMP_AS/NW18_HIND_LIVBLG_AS_AMP_ROS_ATF_300",
      middleAd2: "/1039154/NW18_HIND_AMP/NW18_HIND_LIVEBLOG_AMP/NW18_HIND_LIVEBLOG_AMP_AS/NW18_HIND_LIVBLG_AS_AMP_ROS_BTF_300",
      footerAd: "/1039154/NW18_HIND_AMP/NW18_HIND_LIVEBLOG_AMP/NW18_HIND_LIVEBLOG_AMP_AS/NW18_HIND_LIVBLG_AS_AMP_ROS_FBN_320",
    };
  }
  const _dfp_type = adForPage == "listing" ? "AL" : "AS";

  const adObj = exports.ad_new_config_cat(DFP_SUB_SECTION, DFP_SECTION);
  //console.log(Object.keys(adObj).length)
  if (Object.keys(adObj).length > 0) {
    const _adsNodeATF =
      "/1039154/NW18_HIND_AMP/NW18_HIND_" +
      adObj.adNode1 +
      "_AMP/NW18_HIND_" +
      adObj.adNode2 +
      "_AMP_" +
      _dfp_type +
      "/NW18_HIND_" +
      adObj.adNode3 +
      "_" +
      _dfp_type +
      "_AMP_ROS_ATF_320";

    const _adsNodeATFSecond =
      "/1039154/NW18_HIND_AMP/NW18_HIND_" +
      adObj.adNode1 +
      "_AMP/NW18_HIND_" +
      adObj.adNode2 +
      "_AMP_" +
      _dfp_type +
      "/NW18_HIND_" +
      adObj.adNode3 +
      "_" +
      _dfp_type +
      "_AMP_ROS_ATF_300";

    const _adsNodeBTF =
      "/1039154/NW18_HIND_AMP/NW18_HIND_" +
      adObj.adNode1 +
      "_AMP/NW18_HIND_" +
      adObj.adNode2 +
      "_AMP_" +
      _dfp_type +
      "/NW18_HIND_" +
      adObj.adNode3 +
      "_" +
      _dfp_type +
      "_AMP_ROS_BTF_300";

    const _adsNodeFBN =
      "/1039154/NW18_HIND_AMP/NW18_HIND_" +
      adObj.adNode1 +
      "_AMP/NW18_HIND_" +
      adObj.adNode2 +
      "_AMP_" +
      _dfp_type +
      "/NW18_HIND_" +
      adObj.adNode3 +
      "_" +
      _dfp_type +
      "_AMP_ROS_FBN_320";

      const _adsNodeMTF =
      "/1039154/NW18_HIND_AMP/NW18_HIND_" +
      adObj.adNode1 +
      "_AMP/NW18_HIND_" +
      adObj.adNode2 +
      "_AMP_" +
      _dfp_type +
      "/NW18_HIND_" +
      adObj.adNode3 +
      "_" +
      _dfp_type +
      "_AMP_ROS_MTF_300";

    return {
      topAd: isDistrict ?
            "/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_ATF_320"
            :_adsNodeATF,
      middleAd1: isDistrict
          ?"/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_ATF_300"
          : _adsNodeATFSecond,
      middleAd2: isDistrict
          ?"/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_BTF_300"
          : _adsNodeBTF,
      middleAd3: isDistrict
      ?"/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_BTF_300"
      : _adsNodeMTF,
      footerAd: isDistrict
          ?"/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_FBN_320"
          : _adsNodeFBN,
    };
  } else {
    return {};
  }
};
exports.get_ad_targetting = function (data, paramObj, seo, type = "news") {
  let _adTargetting = '';
        if(data) {
            const DFP_TYPE = (data.is_adult_content)?'flagged':'okay';
            const tags = (typeof data.tag_topic !== 'undefined')?data.tag_topic:"";

            _adTargetting={
                targeting: {
                    article_id: data.story_id,
                    section_name: paramObj.category,
                    url: paramObj.requestURL,
                    meta_keywords: [this.escapeHtml(tags)],
                    title_name: this.escapeHtml(seo.title),
                    excerpt_description: seo.description ? this.escapeHtml(seo.description):"",
                    Content_Type: type,
                    DFP: DFP_TYPE
                }
            };
        }
        // return _adTargetting
        return JSON.stringify(_adTargetting);
};
exports.jsonLdForArticleConsumption = function (post_data = []) {
  const json_ld_array = {};
  if (typeof post_data !== "undefined" && Object.keys(post_data).length > 0) {
    let article_headline =
      typeof post_data["article_headline"] !== "undefined"
        ? post_data["article_headline"]
        : post_data["headline"];
    if (
      typeof post_data["article_headline"] !== "undefined" &&
      post_data["article_headline"] != ""
    ) {
      article_headline = post_data["article_headline"];
    } else {
      article_headline = post_data["headline"];
    }

    let auther_name = "";

    if (
      typeof post_data["byline"] !== "undefined" &&
      post_data["byline"] != ""
    ) {
      auther_name = post_data["byline"];
    } else {
      auther_name = "News18";
    }

    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] =
      post_data["post_type"] == "photogallery" ? "ImageGallery" : "NewsArticle";
    json_ld_array["mainEntityOfPage"] = {
      "@type": "WebPage",
      "@id": post_data["weburl"],
      description: exports.strip_tags(post_data["intro"]),
      thumbnailUrl: post_data["images"]["url"],
    };

    // if (strpos(post_data['body'],'//www.news18.com/embed') !== false) {
    // 	json_ld_array['mainEntityOfPage']['uploadDate']=date("Y-m-d\TH:i:s+05:30",post_data['creation_date2']);
    // }
    json_ld_array["headline"] = exports.limit_char(article_headline, 107);
    // json_ld_array['articleBody'] = htmlspecialchars($exports->stripHtmlTags(post_data['body']),ENT_QUOTES);
    json_ld_array["articleBody"] = exports.escapeHtml(
      post_data["body"].replace(/<(.|\n)*?>/g, "")
    );

    json_ld_array["articleSection"] = post_data["section"];
    json_ld_array["image"] = {
      "@type": "ImageObject",
      url: post_data["images"]["url"],
      height: 522,
      width: 696,
    };
    json_ld_array["author"] = {
      "@type": "Person",
      name: auther_name,
    };
    json_ld_array["publisher"] = {
      "@type": "Organization",
      name: "News18 हिंदी",
      logo: {
        "@type": "ImageObject",
        url:
          "https://images.news18.com/static-guju/uploads/2019/08/gujarati_logo.png",
        width: 154,
        height: 40,
      },
    };
    json_ld_array["description"] = exports.strip_tags(post_data["intro"]);
    json_ld_array["datePublished"] = post_data["timestampCreationDate"];
    json_ld_array["dateModified"] = post_data["timestampUpdateDate"];
  }

  return json_ld_array;
};
exports.strip_tags = function (str) {
  return str.replace(/(<([^>]+)>)/gi, "");
};
exports.limit_char = function (string, length) {
  if (string.length <= length) {
    return string;
  } else {
    const stringCut = string.substring(0, length) + "..."; //ell
    return stringCut;
  }
};
exports.dateToNiceString = (myDate, schema = false) => {
  myDate = new Date(myDate * 1000);
  const month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  //     arrayBody = arrayBody.replace('#(<br */?>\s*)+#i', function (occurrence, active, adNew) {
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();
  const seconds = myDate.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let months = myDate.getMonth();
  months = months < 10 ? "0" + months : months;
  if (schema) {
    return (
      myDate.getFullYear() +
      "-" +
      months +
      "-" +
      myDate.getDate() +
      " " +
      myDate.getHours() +
      ":" +
      minutes +
      ":" +
      seconds
    );
  } else {
    const strTime = hours + ":" + minutes + " " + ampm;
    return (
      month[myDate.getMonth()] +
      " " +
      myDate.getDate() +
      ", " +
      myDate.getFullYear() +
      ", " +
      strTime
    );
  }
};
exports.blogNiceDate = (date) => {
  if (typeof date !== "undefined") {
    const splitTime = date.split("");
    if (splitTime.length > 13) {
      date =
        splitTime[0] +
        splitTime[1] +
        splitTime[2] +
        splitTime[3] +
        "-" +
        splitTime[4] +
        splitTime[5] +
        "-" +
        splitTime[6] +
        splitTime[7] +
        " " +
        splitTime[8] +
        splitTime[9] +
        ":" +
        splitTime[10] +
        splitTime[11] +
        ":" +
        splitTime[12] +
        splitTime[13];
    }
    //console.log(timeOfPost)}
    date = new Date(date);

    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return date.getHours() + ":" + minutes + " (IST)";
  }
};

exports.titleFont = (title = '') => {
  // let style = (/<font ([a-zA-Z=]*)>/gi).exec(title);
  const style = (/<font (.*?)>/gi).exec(title);

  if(style && style[1]) {
    title = title.replace(/<font (.*?)>/gi, `<span style="${style[1].replace('=', ':')}">`).replace(/<\/font>/, '</span>');
  }

  return title;
};

exports.customize_url = function(url, domain) {
  if(typeof url !== 'undefined' && url != '' && url != null) {
      if(domain != 'https://hindi.news18.com/') {
          return url.replace('https://hindi.news18.com/', domain+'amp/').replace('http://hindi.news18.com/', domain+'amp/');
      } else {
          return url;
      }
  }
};
