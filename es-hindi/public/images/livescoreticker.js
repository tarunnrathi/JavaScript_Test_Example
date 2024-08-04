function _convertedToSlug(e) {
  if (e)
    return e
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
}
var _matchInterval = setInterval(_get_scorecard_widget, 15e3);

async function _get_scorecard_widget() {
  try {
    const response = await Promise.race([
      fetch(
        "https://cricketnext.nw18.com/sports/csr/feed/live_matches_hi.json",
      ),
      new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Request Timeout")), 1000), // Set a 1-second timeout
      ),
    ]);
    if (response) e = await response.json();

    if (Array.isArray(e) && e.length > 0) {      
      let t = e.filter(
        (match) =>
        match.league === "IPL" || (match.league === "ICC" &&
          (match.teama_eng === "India" ||
            match.teamb_eng === "India" ||
            match.seriesname === 'आईसीसी क्रिकेट विश्व कप, 2023' ||
            match.seriesname === 'आईसीसी क्रिकेट विश्व कप वार्म-अप मैच, 2023'||
            match?.series_Id === "6122")),
      );
      let i = "";
      if (
        (t &&
          Object.keys(t).forEach(function (e) {
            var r = t[e];
            (i += _get_common_widget_id(r)), 0;
          }),
        i)
      ) {
        var r = "";
        t.length > 1 &&
          (r =
            '<div data-glide-el="controls" class="ftrscore-ar"><button data-glide-dir="<"></button><button data-glide-dir=">"></button></div>'),
          (i =
            '<div class="scorecard-tickerwrap"><div class="container scorecard-ticker"><div class="scrlv">Live</div><div data-glide-el="track" class="scorecard-ticker-in"><div class="scorecard-ticker-slider dflex">' +
            i +
            "</div>" +
            r +
            '</div></div><a href="javascript:void(0);" class="ststclose" onclick="scclose();">+</a></div><style type="text/css"> .scorecard-tickerwrap{background:#323232;height:55px;position:fixed;bottom:0px;z-index:3;left:0px;right:0px;font-family: "Mukta",sans-serif;} .scorecard-ticker{position: relative; overflow: hidden;padding-top: 5px;display:flex} .scorecard-ticker-box{flex-shrink:0} .ftrscore-ar{position: absolute; top:50%; right: 55px; margin-top: -12px} .ftrscore-ar button{width: 15px; height: 15px;cursor:pointer;background: none;outline: none; border: none; border-top: 3px solid #fff; border-left: 3px solid #fff; transform: rotate(-45deg);} .ftrscore-ar button:last-child{transform: rotate(135deg);} .scorecard-left{align-items: center; height: 55px; flex-shrink: 0;} .scorecard-right{overflow: hidden; position: relative;} .scorecard-slider-in{align-items: center;outline: none; position:relative; top:-5px;} .scrlv{background:#ac1501;height:55px;position:relative;margin-top:-5px;line-height:55px;font-size:28px;color:#fff;font-weight:bold;text-align:center;padding:0 20px; width:80px;} .scrlv:before, .scrlv:after{content:"";position:absolute;background:#ac1501;z-index:-1;left:-2px;right:-2px;} .scrlv:before{top:-5px;border-radius:10px 10px 0px 0px;height:5px;} .scrlv:after{width: 7px;height: 7px;display: inline-block;border-radius: 100%;vertical-align: middle;position: absolute;top: 25px; z-index: 2;left: 10px; animation: lvscrdott 1s infinite;background: #ac1501;} @keyframes lvscrdott{0%{background: #ac1501;}25%{background:#fff;}50%{background:#ac1501;}75%{background:#fff;}100%{background:#ac1501;}} .scrspcl-logo{background:url(https://images.hindi.news18.com/ibnkhabar/uploads/assests/images/player-bat.png) no-repeat left center;color:#fff;margin-left:100px;padding-left:45px;line-height:20px; display:flex; width:300px; overflow:hidden} .scrspcl-logo h2{font-size:14px;font-weight:bold;flex-shrink:0;line-height:22px} .scrspcl-logo h2 span{display:block;font-size:13px;font-weight:normal;color: #fae347;} .fullcvrgbtn{background:#ac1500;height:30px;line-height:32px;color:#fff;font-size:14px;text-align:center;padding:0 20px;border-radius:20px; outline: none;} .fullcvrgbtn:hover{color:#fff} .scrteam{padding:0 30px;color:#fff;} .scrteam li{padding-left:30px; display: flex; align-items: center;} .scrteam li:first-child{padding-left:0px;} .tmdtl{} .tmdtl img{width:45px;height:30px;margin:auto 10px;} .tmimg{font-size:12px;font-weight:bold;text-transform:uppercase;margin:auto} .tmcsr{margin:auto;width:105px;} .scr{font-size:12px;line-height: 16px;} .scr strong{font-size:16px;font-weight:bold} .played{opacity: .7} .played strong{font-weight: normal;} .ytbpld{font-size:14px;text-transform:uppercase} .vrs{background:#fff;width:30px;height:30px;border-radius:100%;font-size:12px;display:block;text-align:center;line-height:32px;color:#000;font-weight:bold;} .txtalgnrgt{text-align:right} .ststclose{position:absolute;top:50%;margin-top:-12px;right:15px;color:#fff;font-size:25px;font-weight:bold;width:24px;height:24px;border:1px solid #fff;border-radius:100%;text-align:center;line-height:23px;transform:rotate(45deg);} .mtchsts{width: 100%} .scorestatus{position:absolute}.scorecard-ticker-in{    margin: 0 100px 0 10px;overflow: hidden;}</style>'),
          (document.getElementById("livescorecard-view").innerHTML = i),
          new Glide(document.querySelector(".scorecard-ticker"), {
            type: "carousel",
            startAt: 0,
            perView: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
          }).mount();
      }
      0 == t.length &&
        void 0 !== _matchInterval &&
        clearInterval(_matchInterval);
    }
  } catch (error) {
    console.log(error);
  }
}
function scclose() {
  (document.querySelector(".scorecard-tickerwrap").style.display = "none"),
    clearInterval(_matchInterval);
}
function _get_innings_data(e, t,t_innigs) {
  var i = e.s.short,
    r = e.overs
      ? [
          {
            scores: e.score,
            wickets: e.wickets,
            overs: e.overs,
            runrate: e.runRate,
          },
        ]
      : [];  
  if (r.length > 1) {
    var o = "",
      s = "played";
    1 == r[0].active && (o = "rng"), 1 == r[1].active && (s = "rng");
    var n =
      '<div class="tmcsr"><div class="scr ' +
      s +
      '"><strong>' +
      r[1].scores +
      "/" +
      r[1].wickets +
      "</strong> Ov. " +
      r[1].overs +
      '</div><div class="scr">' +
      r[0].scores +
      "/" +
      r[0].wickets +
      "  Ov. " +
      r[0].overs +
      "</div></div>";
  } else if (1 == r.length) {
    o = "played";
    "test" != t && (o = "rng");
    n = Object.keys(t_innigs).length > 0
    ? '<div class="tmcsr"><div class="scr ' +
    o +
    '"><strong>' +
    r[0].scores +
    "/" +
    r[0].wickets +
    "</strong> Ov. " +
    r[0].overs +
    "</div>"+
    '<div class="scr '+
    o +
    '"><strong>' +
    t_innigs.score +
    "/" +
    t_innigs.wickets +
    "</strong> Ov. " +
    t_innigs.overs +
    "</div></div>"
    :
    '<div class="tmcsr"><div class="scr ' +
      o +
      '"><strong>' +
      r[0].scores +
      "/" +
      r[0].wickets +
      "</strong> Ov. " +
      r[0].overs +
      "</div></div>";
  } else
    n =
      '<div class="tmcsr"><div class="scr played"><strong>Yet to bat</div></strong></div>';
  return (
    '<li><div class="tmdtl dflex jstcntspcbtwn"><div class="tmimg">' +
    i +
    '</div><img alt="" title="" src="' +
    e.s.flag +
    '" onerror="this.src=\'https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/DefaultFlag-90x50-new.png\';">' +
    n +
    "</div></li>"
  );
}
function _get_common_widget_id(e) {
  var t = "",
    r = e.series_short_display_name,
    o = (e.venue, e.matchtype.toLowerCase()),
    s = e.matchresult ? e.matchresult : e.matchstatus,
    n = e.teama,
    c = e.teamb;
  if (n) var a = _get_innings_data(n, o,e?.testInnings? (e?.testInnings?.teama || e.teama):{});
  if (c) var l = _get_innings_data(c, o,e?.testInnings? (e?.testInnings?.teamb || e.teamb):{});
  return (t +=
    '<div class="scorecard-ticker-box dflex"><div class="scorecard-left dflex"><div class="scrspcl-logo"><h2>' +
    r +
    "<span>" +
    s +
    '</span></h2></div></div><div class="scorecard-right dflex"><div class="scorecard-slider-in dflex justify-space-betwwen"><ul class="scrteam lkfleft dflex jstcntspcbtwn">' +
    a +
    '<li><span class="vrs">VS</span></li>' +
    l +
    '</ul><a href="' +
    ("/cricket/live-score/" +
      _convertedToSlug(e.teama_eng) +
      "-vs-" +
      _convertedToSlug(e.teamb_eng) +
      "-live-score-" +
      e.matchid +
      ".html") +
    '" class="fullcvrgbtn lkfleft">Full Score Card</a></div></div></div>');
}
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    // only required for IE <9
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// call the function...
loadScript("https://cdn.jsdelivr.net/npm/@glidejs/glide", function () {
  _get_scorecard_widget();
});
