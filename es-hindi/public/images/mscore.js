function convertedToSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
function getCommonWidget() {
  $.ajax({
    type: "GET",
    crossDomain: !0,
    jsonpCallback: "scores",
    dataType: "jsonp",
    jsonp: "jsonp",
    url: "https://cricketnext.nw18.com/json/crosslivescores_hi.json",
    cache: !0,
    success: function (s) {
      var i = s.matches.filter(i => ["7", "8"].includes(i.coverage_level));
      if (i.length > 0) {
        $.each(i, function (s, i) {
          convertedToSlug(i.series);
          return (
            (liveMatchId = i.matchid),
            getCommonWidgetWithId(liveMatchId, "live"),
            $(".scr-strp").fadeIn(),
            !1
          );
        });
      } else $(".scr-strp").show(), clearInterval(widgetinterval);
    },
    error: function (s, i, t) {
      clearInterval(widgetinterval);
    },
  });
}
function match() {}
function getCommonWidgetWithId(s, i) {
  $.ajax({
    type: "GET",
    crossDomain: !0,
    jsonpCallback: "match",
    dataType: "jsonp",
    jsonp: "jsonp",
    url: "https://cricketnext.nw18.com/json/cross_" + s + "_fastest_hi.json",
    cache: !0,
    success: function (i) {
      var t = "",
        n = i.teamfa,
        a = i.teamfb,
        e = i.seriesname,
        o = i.matchtype.toLowerCase(),
        c = i.venue_mov;
      c && (c = c.split("|"));
      var r = new Array();
      (r[n] = i.teama), (r[a] = i.teamb);
      var l =
        "/cricket/live-score/" +
        convertedToSlug(i.teama_en) +
        "-vs-" +
        convertedToSlug(i.teamb_en) +
        "-live-score-" +
        s +
        ".html";
      $(document).on("click", ".cricview, .scr-strp", function () {
        window.location = l;
      });
      i.status;
      var d = i.teamfa,
        qId = '',
        v = i.teamfb,
        dId = i.teama_id,
        vId = i.teamb_id,
        g = i.firstInnings,
        m = i.secondInnings,
        u = i.thirdInnings,
        p = i.fourthInnings,
        h = "",
        b = "",
        q = (i.matchresult, ""),
        E = "";
      if ("" === i.matchresult && "" === i.equation)
        if (i.status) var f = i.status;
        else f = i.Toss_mov;
      else if ("" !== i.equation) f = i.equation;
      else f = i.matchresult;
      if ("1" === g.status) {
        (q = g.Battingteam), "" == (E = g.Bowlingteam) && (E = q == d ? v : d);
        (qID = g.Battingteam_id),
          "" == (EId = g.Bowlingteam_id) && (EId = qID == dId ? vId : dId);

        var k = "गेंदबाज़",
          w = "बल्लेबाज़";
        "test" == o && ((k = "पहली पारी"), (w = "पहली पारी")),
          (h =
            '<li><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
            qID +
            '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
            q +
            '</strong></div><div class="team-det"><div class="ingns">' +
            w +
            "<div><span>" +
            g.Equation.Total +
            "/" +
            g.Equation.Wickets +
            "</span> Ovr. " +
            g.Equation.Overs +
            "</div></div></div></li>"),
          (b =
            '<li class="off"><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
            EId +
            '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
            E +
            '</strong></div><div class="team-det"><div class="ingns">' +
            k +
            "<div><span><em>बल्लेबाजी बाकी है</em></span></div></div></div></li>");
      }
      if ("1" === m.status) {
        (q = g.Battingteam), "" == (E = g.Bowlingteam) && (E = q == d ? v : d);
        (qID = g.Battingteam_id),
          "" == (EId = g.Bowlingteam_id) && (EId = qID == dId ? vId : dId);
        (k = "बल्लेबाज़"), (w = "गेंदबाज़");
        "test" == o && ((k = "पहली पारी"), (w = "पहली पारी")),
          (h =
            '<li class="off"><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
            qID +
            '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
            q +
            '</strong></div><div class="team-det"><div class="ingns">' +
            w +
            "<div><span>" +
            g.Equation.Total +
            "/" +
            g.Equation.Wickets +
            "</span> Ovr. " +
            g.Equation.Overs +
            "</div></div></div></li>"),
          (b =
            '<li><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
            EId +
            '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
            E +
            '</strong></div><div class="team-det"><div class="ingns">' +
            k +
            "<div><span>" +
            m.Equation.Total +
            "/" +
            m.Equation.Wickets +
            "</span> Ovr. " +
            m.Equation.Overs +
            "</div></div></div></li>");
      }
      "test" == o &&
        ("1" === u.status &&
          ((q = g.Battingteam),
          "" == (E = g.Bowlingteam) && (E = q == d ? v : d),
          (qID = g.Battingteam_id),
          "" == (EId = g.Bowlingteam_id) && (EId = qID == dId ? vId : dId),
          u.Battingteam === q
            ? ((h =
                '<li><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                qID +
                '.png" onerror="this.src=\'https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/default-player.png\';"/><strong>' +
                q +
                '</strong></div><div class="team-det"><div class="ingns">दूसरी पारी<div><span>' +
                u.Equation.Total +
                "/" +
                u.Equation.Wickets +
                "</span> Ovr. " +
                u.Equation.Overs +
                "</div><div>पहली पारी " +
                g.Equation.Total +
                "/" +
                g.Equation.Wickets +
                " (" +
                g.Equation.Overs +
                ")  </div></div></div></li>"),
              (b =
                '<li class="off"><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                EId +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                E +
                '</strong></div><div class="team-det"><div class="ingns">पहली पारी<div><span>' +
                m.Equation.Total +
                "/" +
                m.Equation.Wickets +
                "</span> Ovr. " +
                m.Equation.Overs +
                "</div></div></div></li>"))
            : ((h =
                '<li class="off"><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                qId +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                q +
                '</strong></div><div class="team-det"><div class="ingns">पहली पारी<div><span>' +
                g.Equation.Total +
                "/" +
                g.Equation.Wickets +
                "</span> Ovr. " +
                g.Equation.Overs +
                "</div></div></div></li>"),
              (b =
                '<li><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                EId +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                E +
                '</strong></div><div class="team-det"><div class="ingns">दूसरी पारी<div><span>' +
                u.Equation.Total +
                "/" +
                u.Equation.Wickets +
                "</span> Ovr. " +
                u.Equation.Overs +
                "</div><div>पहली पारी " +
                m.Equation.Total +
                "/" +
                m.Equation.Wickets +
                " (" +
                m.Equation.Overs +
                ")  </div></div></div></li>"))),
        "1" === p.status &&
          ((q = g.Battingteam),
          "" == (E = g.Bowlingteam) && (E = q == d ? v : d),
          (qID = g.Battingteam_id),
          "" == (EId = g.Bowlingteam_id) && (EId = qID == dId ? vId : dId),
          p.Battingteam === q
            ? ((h =
                '<li ><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                qID +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                q +
                '</strong></div><div class="team-det"><div class="ingns">दूसरी पारी<div><span>' +
                p.Equation.Total +
                "/" +
                p.Equation.Wickets +
                " </span> Ovr. " +
                p.Equation.Overs +
                " </div><div>पहली पारी " +
                g.Equation.Total +
                "/" +
                g.Equation.Wickets +
                " (" +
                g.Equation.Overs +
                ")  </div></div></div></li>"),
              (b =
                '<li class="off"><div class="county-name"><strong>' +
                E +
                '</strong></div><div class="team-det"><div class="tms"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                EId +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/></div><div class="ingns">दूसरी पारी<div><span>' +
                u.Equation.Total +
                "/" +
                u.Equation.Wickets +
                "</span> Ovr. " +
                u.Equation.Overs +
                "</div><div>पहली पारी " +
                m.Equation.Total +
                "/" +
                m.Equation.Wickets +
                " (" +
                m.Equation.Overs +
                ")  </div></div></div></li>"))
            : ((h =
                '<li class="off"><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                qID +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                q +
                '</strong></div><div class="team-det"><div class="ingns">दूसरी पारी<div><span>' +
                u.Equation.Total +
                "/" +
                u.Equation.Wickets +
                "</span> Ovr. " +
                u.Equation.Overs +
                "</div><div>पहली पारी " +
                g.Equation.Total +
                "/" +
                g.Equation.Wickets +
                " (" +
                g.Equation.Overs +
                ")  </div></div></div></li>"),
              (b =
                '<li><div class="county-name"><img src="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/' +
                EId +
                '.png" onerror="this.src=\'https://images.news18.com/ibnkhabar/uploads/assests/img/teamsicon/default-player.png\';"/><strong>' +
                E +
                '</strong></div><div class="team-det"><div class="ingns">दूसरी पारी<div><span>' +
                p.Equation.Total +
                "/" +
                p.Equation.Wickets +
                "</span> Ovr. " +
                p.Equation.Overs +
                "</div><div>पहली पारी " +
                m.Equation.Total +
                "/" +
                m.Equation.Wickets +
                " (" +
                m.Equation.Overs +
                ")  </div></div></div></li>")))),
        (t +=
          '<div class="clearfix"></div><div class="scrvns livemtch"><span class="lvbtn">LIVE</span><b>' +
          e +
          "</b>  |  " +
          c[0] +
          " at " +
          c[2] +
          '</div><ul class="scrd-mtchdetl2 clearfix sc-align">' +
          h +
          b +
          '</ul><div class="scrd-ntfy"><span>' +
          f +
          "</span></div>"),
        $(".hgt_m").html(t),
        i.length;
    },
    error: function (s, i, t) {
      clearInterval(widgetinterval);
    },
  });
}
var widgetinterval = setInterval("getCommonWidget();", 15000);
$(document).ready(function () {
  setTimeout(function () {
    getCommonWidget();
  }, 500);
});
var css = `        .scr-strp{margin-bottom:0}.hgt_m{box-shadow:0 0 5px #e0dfdf}.scrd{padding:12px 0}.scrvns{font-size:12px;color:#292627;background:#ebebeb;padding:6px 16px;border-bottom:1px solid #d8d7d7;position:relative}.scrvns b{display:block}.scrd-mtchdetl{padding:12px 0}.scrd-mtchdetl li{float:left;width:29%;padding:0 5%}.scrd-mtchdetl li:first-child{border-right:1px solid #e1e0e1;width:50%}.scrd-mtchdetl li .tms{margin:8px 0}.scrd-mtchdetl li .tms span{font-size:12px;font-weight:700;width:40%;float:left}.scrd-mtchdetl li .tms span:first-child{text-align:right}.scrd-mtchdetl li .tms span:last-child{text-align:left}.scrd-mtchdetl li .tms span:nth-child(2){font-weight:400;width:20%;text-align:center;line-height:18px}.scrd-mtchdetl li .tms span img{vertical-align:middle;border:1px solid #cacaca;margin:0 4px}.scrd-mtchdetl li .mtchstrt{font-size:12px;color:#292627}.scrd-mtchdetl li .mtchstrt span{font-size:24px;font-weight:700;line-height:24px}.scrd-ntfy{background:#001636;height:24px;text-align:center;padding:4px 16px;box-sizing:border-box;color:#fff;font-size:12px;line-height:18px}.txtcaps{text-transform:uppercase}.scrvns.livemtch{border-bottom:1px solid #fc7474;padding:1px 16px 6px 44px;height:24px;box-sizing:border-box;overflow:hidden;line-height:25px}.lvbtn{background:red;width:36px;text-align:center;color:#fff;font-size:10px;font-weight:700;line-height:26px;position:absolute;left:0;top:0;bottom:0}.scrd-mtchdetl2{padding:12px 0}.scrd-mtchdetl2 li{float:left;width:43%;margin:0 2.9%;position:relative}.scrd-mtchdetl2 li:first-child{border-right:1px solid #e1e0e1}.scrd-mtchdetl2 li .tms{font-size:12px;font-weight:700;text-align:center;width:31px;position:absolute;left:0;top:0}.scrd-mtchdetl2 li .tms img{border:1px solid #cacaca;display:block;margin-bottom:4px;width:31px}.scrd-mtchdetl2 li .ingns{position:relative;margin:0 0 0 40px;font-size:12px;color:#737373;line-height:18px;top:-6px}.scrd-mtchdetl2 li .ingns span{color:#292627;font-size:16px;font-weight:700}.scrd-mtchdetl2 li.off{opacity:.7}.county-name{line-height:1;margin-bottom:3px;display:flex;align-items:center}.county-name img{width:34px;margin-right:5px}.county-name strong{font-size:13px}
`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
