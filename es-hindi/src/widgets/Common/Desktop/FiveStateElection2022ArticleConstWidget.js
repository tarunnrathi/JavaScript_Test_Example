import { useEffect } from "react";

const FiveStateElection2022ArticleConstWidget = ({
  fs_cons_id,
  fs_statename,
}) => {
  fs_cons_id = fs_cons_id.toLowerCase();
  fs_statename = fs_statename.toLowerCase();
  useEffect(() => {
    if (fs_cons_id && fs_statename) {
      fiveStateInArticleWidget();
      setInterval(() => {
        fiveStateInArticleWidget();
      }, 30000);
    }
  }, []);
  async function fiveStateInArticleWidget() {
    // var desktopWidgetUrl = publicRuntimeConfig.siteUrl+'assembly-elections-2022/'+fs_statename+'/get-const-status/'+fs_cons_id.toLowerCase()+'/';
    const desktopWidgetUrl =
      "https://hindi.news18.com/assembly/elections/" +
      fs_statename +
      "/get-const-status/" +
      fs_cons_id.toLowerCase() +
      "/";
    // var desktopWidgetUrl = 'https://hindi.news18.com/assembly/elections/gujarat/get-const-status/S06A001/';

    fetch(desktopWidgetUrl)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.top_strip) {
          document.getElementById(
            "live_cnsituncy"
          ).innerHTML = `<div id="live_cnsituncy" className="live_cnsituncy defaultHeight">${response.top_strip}</div>`;
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
        .live_cnsituncy {
          clear: both;
        }
        .defaultHeight {
          width: 100%;
          min-height: 118px;
        }
        .live_cnsituncy {
          margin-bottom: 5px;
          font-family: "Fira Sans";
          max-width: 835px;
        }
        .live_cnsituncy .live_consi_row:first-child {
          border: 1px solid #d7d7d7;
          display: flex;
          height: 72px;
          overflow: hidden;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(1) {
          width: 91px;
          background: #e1261c;
          text-align: center;
          padding: 12px;
          border-right: 1px solid #d7d7d7;
          display: flex;
          align-items: center;
        }
        .live_cnsituncy .live_consi_row .live_consi_col .live_head {
          font-size: 24px;
          color: #ffffff;
          text-transform: uppercase;
          position: relative;
          padding-left: 10px;
          font-style: italic;
        }
        .live_cnsituncy .live_consi_row .live_consi_col .live_head .dots-div {
          position: absolute;
          left: 0;
          top: 9px;
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
          width: 602px;
          background: #f5f5f5;
        }
        .live_consi_col .table .row:first-child {
          border-bottom: 1px solid #d7d7d7;
        }
        .live_consi_col .table .row {
          display: flex;
        }
        .live_consi_col .table .col:nth-child(1) {
          width: 119px;
        }
        .live_consi_col .table .col {
          padding: 9px;
          border-right: 1px solid #d7d7d7;
          font-size: 11px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }
        .live_consi_col .table .col:last-child {
          border: 0;
        }
        .live_consi_col .table .col:nth-child(2) {
          width: 572px;
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
          font-size: 16px;
          text-transform: inherit;
          min-height: 35px;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(3) {
          width: 150px;
          border-left: 1px solid #d7d7d7;
          font-size: 26px;
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
          top: 7px;
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

        .refreshBtn img {
          max-width: 100%;
          width: auto;
        }
        .live_consi_col .table .col {
          padding: 4px 10px;
        }
        .live_cnsituncy .live_consi_row .live_consi_col:nth-child(2) {
          width: 100%;
        }
        .live_cnsituncy {
          max-width: 100%;
        }
        .live_cnsituncy .live_consi_row:nth-child(2) {
          align-items: right;
          justify-content: flex-end;
          padding: 9px 0 10px;
        }
        .live_cnsituncy .live_consi_row .live_consitext {
          margin: 0;
        }

        .result_table {
          width: 100%;
          font-family: "Fira Sans";
          max-width: 100%;
        }
        .result_table ul {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          top: 10px;
        }
        .result_table a {
          text-decoration: none;
          color: #282828;
        }
        .result_table * {
          text-decoration: none;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .result_table .ls_res_head_con ul {
          width: auto;
          float: right;
        }
        .result_table .ls_res_head_con ul li.active {
          font-size: 18px;
          color: #e1261c;
          font-weight: bold;
          border-bottom: 5px solid #e1261c;
          padding-bottom: 5px;
        }
        .result_table .ls_res_head_con ul li {
          display: inline-block;
          padding: 0px 15px;
          font-size: 14px;
          font-family: "fira sans";
          text-align: center;
          color: #848484;
          cursor: pointer;
        }
        .result_table .ls_result_table {
          width: 100%;
          overflow: hidden;
          margin-bottom: 15px;
        }
        .result_table .ls_res_head_con {
          clear: right;
          float: left;
          width: 100%;
          margin-bottom: 5px;
          border-bottom: 1px solid #dcdcdc;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ls_pageheading {
          font-weight: 500;
          text-transform: uppercase;
          font-size: 22px;
        }
        .ls_pageheading a span:after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 3px;
          background: #e1261c;
          left: 0;
          z-index: 9;
        }
        .ls_pageheading a {
          color: #e1261c;
          border: 0;
        }
        .ls_pageheading a span {
          color: #001d42;
          position: relative;
        }
        .dl-const-tablewrap {
          display: table;
          width: 100%;
        }
        .dl-const-tablewrap {
          display: table;
          width: 100%;
        }
        .dl-const-table {
          border: 1px solid #d7d7d7;
        }
        .dl-const-table .table-row {
          display: flex;
        }
        .dl-const-table .table-row .table-col {
          width: 180px;
          border-right: 1px solid #d7d7d7;
          border-bottom: 1px solid #d7d7d7;
          font-size: 14px;
          text-transform: uppercase;
          padding-left: 15px;
          padding-right: 15px;
        }
        .dl-const-table .table-row .table-col:last-child {
          width: 100%;
          border-right: 0;
          justify-content: space-between;
        }
        .dl-const-table .table-row:last-child .table-col {
          border-bottom: 0;
        }
        .dl-const-table .table-row.tb-head {
          background: #474747;
        }
        .dl-const-table .table-row.tb-head .table-col {
          color: #ffffff;
          font-size: 11px;
          padding-top: 10px;
          padding-bottom: 10px;
          border-right-color: #474747;
        }
        .dl-const-table .table-row.tb-main .table-col {
          padding-top: 10px;
          padding-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .dl-party {
          width: 100%;
          display: block;
          border-left: 5px solid;
          padding-left: 8px;
          font-size: 14px;
          line-height: 24px;
          color: #676767;
        }
        .dl-const-table .table-row.tb-main .table-col .table-candiname {
          text-transform: capitalize;
        }
        .dl-const-table .table-row.tb-main .table-col .table-candi-icon ul {
          display: flex;
        }
        .dl-const-table .table-row.tb-main .table-col .table-candi-icon li {
          width: 30px;
          height: 25px;
          background: url(http://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/img/candidate-detail-icon.png)
            no-repeat;
          margin-right: 10px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li:last-child {
          margin-right: 0;
          background-position: -38px 0;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.graduate {
          background-position: 0px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.criminal-case {
          background-position: -38px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.sittin-mla {
          background-position: -76px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.morethen-1cr {
          background-position: -114px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.deposit-forfeited {
          background-position: -152px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.turncoat {
          background-position: -190px -37px;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li.active {
          background-position-y: 0;
        }
        .dl-const-table .table-row.tb-main .table-col .table-candiname a {
          border-bottom: 1px dotted #000;
        }
        .dl-const-table .table-row.tb-main.current .table-col {
          font-size: 16px;
          font-family: "fira sans";
          font-weight: 500;
        }
        .dl-const-table .table-row.tb-main.current .table-col .dl-party {
          color: #fff;
          border-left: 0;
        }
        .dl-const-table
          .table-row.tb-main.current
          .table-col
          .table-candiname
          a {
          color: #ffffff;
          border-color: #ffffff;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          .winner-btn {
          text-align: right;
          margin-bottom: 10px;
        }
        .dl-const-table
          .table-row.tb-main.current
          .table-col
          .table-candiname
          .margin-text {
          background: #fff;
          color: #001d42;
          font-size: 11px;
          margin-top: 10px;
          padding: 5px 10px;
          text-transform: uppercase;
        }
        .dl-const-table
          .table-row.tb-main.current
          .table-col
          .table-candiname
          .margin-text
          span {
          font-size: 16px;
          font-family: "fira sans";
          font-weight: 500;
        }
        .dl-const-table .table-row.tb-main.current .table-col {
          align-items: start;
        }
        .dl-const-table
          .table-row.tb-main.current
          .table-col
          .table-candi-icon
          li {
          background-position-y: -118px;
        }
        .dl-const-table
          .table-row.tb-main.current
          .table-col
          .table-candi-icon
          li.active {
          background-position-y: -77px;
        }
        .dl-const-table-ftr {
          border: 1px solid #d7d7d7;
          border-top: 0;
          padding: 10px;
          background: #f1f1f1;
        }
        .dl-const-table-ftr ul {
          display: flex;
          font-size: 14px;
          flex-wrap: wrap;
        }
        // .dl-const-table-ftr ul li {width:30%;margin-bottom: 12px;padding: 5px 0 5px 35px;position: relative;}
        .dl-const-table-ftr ul li {
          width: 25%;
          margin-bottom: 0px;
          padding: 0px 0px 0px 35px;
          position: relative;
        }
        .dl-const-table-ftr ul li:nth-child(5),
        .dl-const-table-ftr ul li:nth-child(6) {
          margin-bottom: 0;
        }
        .dl-const-table-ftr ul li .icon {
          width: 30px;
          height: 25px;
          position: absolute;
          left: 0;
          top: 0;
          background: url(http://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/img/candidate-detail-icon.png)
            no-repeat;
        }
        .dl-const-table-ftr ul li .icon.icon1 {
          background-position: 0 -154px;
        }
        .dl-const-table-ftr ul li .icon.icon2 {
          background-position: -38px -154px;
        }
        .dl-const-table-ftr ul li .icon.icon3 {
          background-position: -76px -154px;
        }
        .dl-const-table-ftr ul li .icon.icon4 {
          background-position: -114px -154px;
        }
        .dl-const-table-ftr ul li .icon.icon5 {
          background-position: -152px -154px;
        }
        .dl-const-table-ftr ul li .icon.icon6 {
          background-position: -190px -154px;
        }
        .dl-const-social {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 5px solid #001d42;
          padding: 8px 0;
        }
        .dl-const-social .const-innersocial span {
          font-family: "fira sans";
          font-weight: 500;
          font-size: 12px;
          color: #7e7e7e;
          text-transform: uppercase;
          margin-right: 10px;
        }
        .dl-const-social .const-innersocial ul {
          display: flex;
          align-items: center;
        }
        .dl-const-social .const-innersocial ul li {
          margin: 0 8px;
        }
        .dl-const-social .const-innersocial ul li a {
          width: 30px;
          height: 30px;
          background: url(http://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/img/election-social-icon1.png)
            no-repeat;
          display: block;
          background-position: 0 0;
        }
        .dl-const-social .const-innersocial ul li:last-child a {
          width: 40px;
          height: 40px;
        }
        .dl-const-social .const-innersocial ul li a.fb {
          background-position: -69px -5px;
        }
        .dl-const-social .const-innersocial ul li a.tw {
          background-position: -130px -5px;
        }
        .dl-const-social .const-innersocial ul li a.whatsapp {
          background-position: 0 0;
        }
        .dl-const-social .const-innersocial {
          display: flex;
          align-items: center;
        }
        .dl-const-social .const-affidavit {
          display: flex;
          align-items: center;
        }
        .dl-const-social .const-affidavit span {
          font-size: 12px;
          color: #7e7e7e;
          font-family: "fira sans";
          font-weight: 500;
        }
        .dl-const-social .const-affidavit a {
          border: 0;
        }
        .stel-hglgt-shr {
          padding: 10px;
          border-top: 1px solid #b6b4b4;
          background: #f6f6f6;
          margin: 0 -1px;
        }
        .stel-hglgt-shr h3 {
          font-family: "fira sans";
          font-weight: 600;
          font-size: 12px;
          color: #7e7e7e;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 5px;
        }
        .stel-hglgt-shr ul {
          justify-content: center;
          display: flex;
        }
        .stel-hglgt-shr ul li {
          margin: 0 15px;
          line-height: 22px;
        }
        .stel-hglgt-shr ul li a {
          display: block;
          width: 18px;
          height: 18px;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/state-2021-election/election_css_sprites.png);
          background-repeat: no-repeat;
          border: 0;
        }
        .stel-hglgt-shr ul li a.fb {
          background-position: -5px -101px;
        }
        .stel-hglgt-shr ul li a.tw {
          background-position: -119px -7px;
        }
        .stel-hglgt-shr ul li a.whatsapp {
          background-position: -81px -63px;
        }
        .stel-hglgt-shr ul li a.telegram {
          background-position: -118px -39px;
        }
        .dl-const-social .stel-hglgt-shr {
          display: flex;
          align-items: center;
          border: 0;
          background: transparent;
        }
        .dl-const-table
          .table-row.tb-main
          .table-col
          .table-candi-icon
          li::before,
        .dl-const-table-ftr ul li::before,
        .stel-hglgt-shr ul li::before,
        .result_table .ls_res_head_con ul li::before {
          width: 0;
          height: 0;
          background: unset;
        }
        .dl-const-table .table-row .table-col {
          width: 140px;
        }
        .dl-const-table .table-row .table-col li {
          list-style: none;
        }
        .result_table .dl-const-table-ftr ul li {
          font-family: "Fira Sans" !important;
          list-style: none;
          font-size: 11px;
          line-height: 22px;
          margin: 0;
        }
        .dl-const-table-ftr ul {
          padding-bottom: 20px;
          justify-content: space-between;
        }
        .dl-const-table-ftr ul li:nth-child(2) {
          width: 140px;
        }
        .dl-const-social .stel-hglgt-shr li {
          list-style-type: none;
        }
        .dl-const-social .stel-hglgt-shr ul {
          top: 0;
        }
      `}</style>
    </>
  );
};

export default FiveStateElection2022ArticleConstWidget;
