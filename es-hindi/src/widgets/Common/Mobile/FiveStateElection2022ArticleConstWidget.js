import { useEffect } from "react";

const FiveStateElection2021ArticleConstWidget = ({
  fs_cons_id,
  fs_statename,
}) => {
  fs_cons_id = fs_cons_id.toLowerCase();
  useEffect(() => {
    if (fs_cons_id && fs_statename) {
      fiveStateInArticleWidget();
      setInterval(() => {
        fiveStateInArticleWidget();
      }, 30000);
    }
  }, [fs_cons_id, fs_statename]);

  async function fiveStateInArticleWidget() {
    // var widgetUrl = `/fiveStateElection2022/${fs_statename}/get-mobile-const-status/${fs_cons_id.toLowerCase()}/`;
    //var widgetUrl = 'https://stg.news18.com/assembly-elections-2022/'+fs_statename+'/get-mobile-const-status/'+fs_cons_id.toLowerCase()+'/';
    const widgetUrl = `https://hindi.news18.com/assembly/elections/${fs_statename}/get-mobile-const-status/${fs_cons_id}/`;
    // var widgetUrl = `https://hindi.news18.com/assembly/elections/gujarat/get-mobile-const-status/S06A001/`;
    fetch(widgetUrl)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.top_strip) {
          document.getElementById("live_cnsituncy").innerHTML =
            response.top_strip;
        }
        if (response && response.botom_strip) {
          document.getElementById("ele-const-widget").innerHTML =
            response.botom_strip;
        }
      })
      .catch((err) => {
        console.log("error in in article constituency widget " + err);
      });
  }

  return (
    <>
      <div id="live_cnsituncy" className="live_cnsituncy defaultHeight"></div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Fira+Sans:wght@400;500;700&display=swap");
        .defaultHeight {
          width: 100%;
          min-height: 93px;
        }
        .live_cnsituncy {
          margin-bottom: 5px;
          font-family: "Fira Sans";
        }
        .live_cnsituncy .live_consi_row:first-child {
          border: 1px solid #d7d7d7;
          display: flex;
          overflow: hidden;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(1) {
          width: 80px;
          background: #e1261c;
          text-align: center;
          padding: 6px;
          border-right: 1px solid #d7d7d7;
          display: flex;
          align-items: center;
        }
        .live_cnsituncy .live_consi_row .live_consi_col .live_head {
          font-size: 16px;
          color: #ffffff;
          text-transform: uppercase;
          position: relative;
          padding-left: 10px;
          font-style: italic;
          text-align: left;
          line-height: 16px;
          margin-bottom: 0;
        }
        .live_cnsituncy .live_consi_row .live_consi_col .live_head .dots-div {
          position: absolute;
          left: 0;
          top: 4px;
          background: #fff;
        }
        .dots-div.blink {
          animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
        }
        .live_cnsituncy .live_consi_row .live_consi_col .live_head span {
          display: block;
          font-size: 14px;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(2) {
          width: calc(100% - 130px);
          background: #f5f5f5;
        }
        .live_consi_col .table .row:first-child {
          border-bottom: 1px solid #d7d7d7;
        }
        .live_consi_col .table .row {
          padding: 6px 8px;
        }
        .live_consi_col .table .col:nth-child(1) {
          width: 59px;
        }
        .live_consi_col .table .col {
          padding: 0px;
          font-size: 11px;
          text-transform: uppercase;
          display: block;
          align-items: center;
        }
        .live_consi_col .table .col:nth-child(2) {
          width: 70%;
        }
        .live_consi_col .table .col span:first-child {
          margin-right: auto;
        }
        .live_consi_col .table .col .refreshBtn {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #7e7e7e;
          font-style: italic;
        }
        .live_consi_col .table .row.active .col {
          color: #fff;
          font-size: 14px;
          text-transform: inherit;
        }
        .live_consi_col .table .row.active .col a {
          color: #fff;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(3) {
          width: 65px;
          border-left: 1px solid #d7d7d7;
          font-size: 13px;
          text-transform: uppercase;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          font-style: italic;
          font-weight: bold;
        }
        .live_cnsituncy .live_consi_row .live_consi_col.won {
          background: #004d21;
          color: #fff;
        }
        .live_cnsituncy .live_consi_row .live_consi_col.lost {
          background: #e1261c;
          color: #fff;
        }
        .live_cnsituncy .live_consi_row .live_consi_col.leading {
          background: #6d9a48;
          color: #fff;
        }
        .live_cnsituncy .live_consi_row .live_consi_col.trailing {
          background: #e6635b;
          color: #fff;
        }
        .live_cnsituncy .live_consi_row .live_consi_col.awaited {
          background: #464646;
          color: #fff;
        }

        .live_cnsituncy .live_consi_row {
          display: flex;
        }
        .live_cnsituncy .live_consi_row .live_consitext {
          color: #9b9b9b;
          font-size: 12px;
          font-style: italic;
          margin-right: auto;
        }
        .live_cnsituncy .live_consi_row .live_constibtn {
          font-size: 12px;
          color: #e1261d;
          display: block;
          text-align: center;
          text-transform: uppercase;
          align-self: center;
          border-bottom: 1px solid;
          margin-right: 14px;
          position: relative;
          text-decoration: none;
          font-weight: bold;
        }
        .live_cnsituncy .live_consi_row .live_constibtn svg {
          width: 11px;
          position: absolute;
          right: -15px;
        }
        .live_cnsituncy * {
          box-sizing: border-box;
        }
        .live_consi_col .table .col:nth-child(2) a {
          text-decoration: none;
        }
        .refreshBtn img {
          margin-left: 10px;
        }
        .dots-div {
          content: "";
          background: #e1261c;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 5px;
          position: relative;
          top: -2px;
        }
        @keyframes blinker {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        i.refresh-icon a {
          color: #7e7e7e;
          font-size: 12px;
          text-decoration: none;
          position: relative;
          padding-right: 26px;
        }
        i.refresh-icon:after {
          content: "";
          position: absolute;
          right: 0;
          background: url(https://www.news18.com/news18_revamp/image/desktop/assembly_election/refreshbutton.png)
            no-repeat;
          width: 20px;
          height: 16px;
          top: 8px;
        }
        .live_cnsituncy .live_consi_row {
          justify-content: space-between;
        }
        i.refresh-icon {
          padding: 6px 0;
          position: relative;
        }
        p.live_consitext {
          font-style: italic;
          color: #9b9b9b;
          line-height: 18px;
          font-size: 13px;
          margin: 0;
          border-bottom: 1px #dcdcdc solid;
          padding-bottom: 10px;
        }
        .ls_result_table {
          width: 100%;
        }
        .heading {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .heading h2 {
          font-size: 22px;
          text-transform: uppercase;
          margin-right: auto;
          vertical-align: top;
          position: relative;
        }
        .heading h2 a.none {
          padding-left: 0;
        }
        .heading h2 a {
          color: #e1261c;
          padding-left: 10px;
          text-decoration: none;
        }
        .heading h2 span {
          color: #001d42;
          position: relative;
          margin-left: 5px;
          padding-bottom: 3px;
        }
        .heading h2 span:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261c;
          bottom: 0;
          left: 0;
        }
        .ls_res_head_con2 {
          display: table;
          margin-bottom: 10px;
          width: 100%;
        }
        .ls_res_head_con2 ul {
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          align-items: center;
          justify-content: center;
          list-style: none;
        }
        .ls_res_head_con2 ul li.active {
          font-size: 16px;
          color: #001d42;
          text-transform: uppercase;
        }
        .ls_res_head_con2 ul li:first-child {
          padding-left: 0;
        }
        .ls_res_head_con2 ul li {
          width: 33%;
          padding: 0px;
          font-size: 14px;
          text-align: center;
          color: #848484;
          position: relative;
          text-transform: uppercase;
        }
        .election_reultwrap1 {
          width: 100%;
          font-size: 15px;
          line-height: 25px;
          position: relative;
          border: 1px solid #d7d7d7;
          margin-bottom: 10px !important;
        }
        .election_reultwrap1 .elre_row:first-child {
          background: #474747;
          color: #fff;
          text-transform: uppercase;
          font-size: 11px;
        }
        .election_reultwrap1 .elre_row {
          display: flex;
          font-size: 13px;
          border-bottom: 1px solid #d7d7d7;
          color: #464646;
        }
        .elre_row:first-child div:first-child {
          border-color: #474747;
        }
        .elre_row div:first-child {
          width: 25%;
        }
        .elre_row div {
          padding: 6px 10px;
          border-right: 1px solid #d7d7d7;
        }
        .elre_row.active .elre_col:last-child a {
          border-color: #fff;
        }
        .elre_row .elre_col:last-child a {
          border-bottom: 1px #000 dotted;
          color: #212121;
          text-decoration: none;
        }
        .elre_row.active .elre_col span {
          border-left: 0;
          padding-left: 0;
          color: #fff;
          border-color: #fff;
        }
        .elre_row .elre_col .winner {
          width: 51px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          padding: 1px 0;
          text-align: center;
          border-right: 0;
          margin-left: auto;
        }
        .elre_row .elre_col .margin {
          background: #fff;
          padding: 1px 10px;
          color: #060404;
          font-size: 11px;
          font-weight: 300;
          white-space: nowrap;
          text-transform: uppercase;
          width: 80%;
        }
        .elre_row .elre_col .margin em {
          font-style: normal;
          font-size: 16px;
          padding-left: 10px;
        }
        .elre_row div:last-child {
          width: 75%;
          border: 0;
        }
        .elre_row .d_election_icons {
          width: 100% !important;
          display: flex;
          justify-content: space-between;
          padding: 0;
          padding-top: 13px;
        }
        .elre_row .d_election_icons i {
          margin-right: 10px;
        }
        .d_election_icons i {
          width: 34px;
          height: 22px;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/img/small_icon_sprite.png)
            no-repeat;
        }

        .elre_row.active .d_election_icons i.post {
          background-position: -7px -404px;
        }
        .elre_row.active .d_election_icons i.crim {
          background-position: -7px -504px;
        }
        .elre_row.active .d_election_icons i.chair {
          background-position: -7px -554px;
        }
        .elre_row.active .d_election_icons i.money {
          background-position: -7px -605px;
        }
        .elre_row.active .d_election_icons i.no_money {
          background-position: -7px -452px;
        }
        .elre_row.active .d_election_icons i.repeat {
          background-position: -7px -652px;
        }
        .d_election_icons i.post {
          background-position: -7px -54px;
        }
        .d_election_icons i.crim {
          background-position: -7px -154px;
        }
        .d_election_icons i.chair {
          background-position: -7px -203px;
        }
        .d_election_icons i.money {
          background-position: -7px -255px;
        }
        .d_election_icons i.no_money {
          background-position: -7px -102px;
        }
        .d_election_icons i.repeat {
          background-position: -7px -303px;
        }
        .elre_row.active .elre_col:last-child a {
          border-color: #fff;
        }
        .ls_result_table * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: "Fira Sans";
        }
        .elre_row.active .elre_col:last-child {
          display: flex;
          flex-wrap: wrap;
        }
        .elre_row .d_election_icons i.opacity {
          opacity: 0.5;
        }
        .elre_row.active .elre_col {
          font-weight: 600;
        }
        .elre_row .elre_col span {
          border-left: 5px solid #000;
          padding-left: 10px;
        }
        .elre_row.icons_bg ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
        }
        .elre_row.icons_bg ul li {
          font-size: 12px;
          color: #474747;
          margin-bottom: 10px;
          padding: 0px 0 0 0px;
          position: relative;
          width: 50% !important;
          justify-content: end;
          line-height: 10px;
        }
        .election_reultwrap1 .elre_row:last-child {
          border: 0;
        }
        .elre_row.icons_bg {
          background: #f1f1f1;
          padding: 10px 5px;
        }
        .elre_row.icons_bg ul li::before,
        .ls_res_head_con2 ul li::before {
          width: 0px;
          height: 0;
          background: unset;
        }
        .elre_row.active .d_election_icons i.opactiy {
          opacity: 0.5;
        }
        .elre_row.active .d_election_icons i.opactiy.active {
          opacity: 1;
        }
        .d_election_icons i.opactiy {
          opacity: 0.5;
        }
        .d_election_icons i.opactiy.active {
          opacity: 1;
        }

        .live_cnsituncy .live_consi_row .live_constibtn:before {
          content: "";
          width: 1px;
          height: 7px;
          position: absolute;
          background-color: #e1261c;
          top: 0px;
          bottom: 0px;
          right: -7px;
          margin: auto;
        }
        .live_cnsituncy .live_consi_row .live_constibtn:after {
          content: "";
          border: solid #e1261c;
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 2px;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          position: absolute;
          right: -9px;
          top: 9px;
        }
      `}</style>
    </>
  );
};

export default FiveStateElection2021ArticleConstWidget;
