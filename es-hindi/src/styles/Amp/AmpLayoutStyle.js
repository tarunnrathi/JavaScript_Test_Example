import css from 'styled-jsx/css';

export default css.global `
.sponser-new-header {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 99999;
  }

  .biharelec-nhlogo {
    float: left;
    margin-top: 5px;
    line-height: 0;
  }
  .my-space {
    padding: 0 15px;
  }
  h1 {
    font-size: 26px;
    color: #000;
    line-height: 32px;
    font-weight: 700;
  }
  body {
    font-size: 14px;
    line-height: 1.4;
    color: #000;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #404040;
    line-height: 24px;
    padding-bottom: 5px;
  }

  .share_icon {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .share_icon a {
    width: 35px;
    height: 35px;
    font-size: 18px;
    margin-right: 0;
    border-radius: 0;
    margin-left: 14px;
    color: #171e8a;
    line-height: 1.5;
  }

  .share_icon a span {
    background: #f5f5f5 url(/images/siteimages/article-icons.svg) 0 0 no-repeat;
    width: 35px;
    height: 35px;
    display: block;
    border-radius: 100%;
  }
  .article_cont {
    margin-left: -10px;
    margin-right: -10px;
  }
  .artic-story {
    margin: 10px 0;
    background: #fff;
    padding 0;         
  }
  p {
    margin: 20px 0;
    font-size: 16px;
  }
  strong {
    font-weight: bold;
  }
  .ftrcontent-morebox {
    background: #f2f2f2;
    position: relative;
    border-radius: 10px;
    padding: 12px 10px 12px 10px;
    margin: 15px 10px 50px 10px;
  }
  .article_faq_question {
    letter-spacing: 0px;
    color: #666666;
    font-size: 17px;
    position: relative;
    line-height: 23px;
    font-weight: bold;
    border-left: 3px #e1261d solid;
    padding: 9px 39px;
    background: #f5f5f5 0% 0% no-repeat padding-box;
    padding-right: 0;
  }
  .article_faq_question:after {
    content: "Q.";
    position: absolute;
    left: 7px;
    top: 8px;
    color: #e1261d;
    font-size: 20px;
  }
  .article_faq_answer {
    letter-spacing: 0px;
    color: #666666;
    font-size: 16px;
    position: relative;
    line-height: 27px;
    font-weight: normal;
    padding: 9px 39px;
    padding-right: 0;
  }
  .article_faq_answer:before {
    border-left: 3px #666666 solid;
    content: no-open-quote;
    position: absolute;
    left: 0;
    height: 42px;
    top: 0;
  }
  .article_faq ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article_faq_answer:after {
    content: "A.";
    position: absolute;
    left: 11px;
    top: 8px;
    color: #666666;
    font-size: 20px;
  }
  .article_faq ul li {
    padding-bottom: 10px;
  }
  .article_faq p {
    display: none;
  }
  p.article_faq_line {
    clear: both;
  }
  p.article_faq_line {
    letter-spacing: 0px;
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    line-height: 27px;
    padding: 0;
    margin-bottom: 20px;
  }
  ul.faq_list {
    margin-top: 30px;
    list-style: none;
    padding-left: 10px;
    padding-right: 10px;
  }
  ul.faq_list li {
    counter-increment: my-awesome-counter;
    position: relative;
    padding-bottom: 20px;
    padding-left: 40px;
  }
  p.faq_intro {
    padding: 0;
    margin: 0;
    text-align: left;
    letter-spacing: 0px;
    color: #001636;
    font-size: 16px;
    line-height: 24px;
  }
  ul.faq_list li:after {
    background: #001636;
    width: 26px;
    height: 26px;
    left: 0;
    top: 5px;
    border-radius: 100px;
    content: counter(my-awesome-counter);
    color: #fff;
    text-align: center;
    line-height: 27px;
    font-size: 18px;
    position: absolute;
  }
  
  .ptime {
    margin-left: 10px;
  }
  
  .live_blog_list_box {
    margin: 0;
    padding: 0px 15px;
    margin: 0 -15px;
  }
  .mtch-hgt-in h3 {
    font-size: 12px;
    color: #737373;
    padding: 0;
    font-weight: 400;
    line-height: 30px;
    margin: 0;
  }

  .fl h2 ~ span {
    font-size: 18px;
    color: #111;
  }

  .fl p,
  .fr p {
    line-height: 28px;
    font-size: 16px;
    word-break: break-word;
    color: #212121;
    padding: 0 16px 15px;
  }

  .mtch-hgt-dtl {
    line-height: 28px;
    font-size: 18px;
    word-break: break-word;
    text-decoration: none;
  }

  .mtch-hgt-dtl a {
    text-decoration: none;
  }
  .mtch-hgt {
    background: #fff;
    margin: 0 16px;
    border: 1px solid #ccc;
  }
  .mtch-hgt-in {
    padding: 4px 16px;
    background: #f6f6f6;
  }
  .towin {
    background: #eeeded;
    padding: 4px 0;
    font-size: 11px;
    text-align: center;
  }
  .mtch-hgt-dtl {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
  }
  .mtch-hgt-dtl li div {
    color: #333;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix:after {
    content: no-open-quote;
    clear: both;
    visibility: hidden;
    opacity: 0;
    display: block;
    width: 100%;
    font-size: 0;
    line-height: 0;
  }
  .mtch-hgt-dtl li a h2 {
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-decoration: none;
    color: #000;
    margin: 0;
    padding: 0;
  }
  .mtch-hgt-dtl li span {
    color: #737373;
    font-size: 12px;
    display: block;
    margin-top: -2px;
    margin-bottom: -7px;
  }
  
  .boxhalf {
    width: 100%;
    float: none;
  }
  .boxhalf fr {
    float: right;
  }
  table.mtch-hgt-tbl {
    border-spacing: 2px;
    width: 100%;
  }
  table.mtch-hgt-tbl tr {text-align: left;}
  table.mtch-hgt-tbl th{font-weight: bold;}

  .my-space table {
    height: auto;
    width: 100%;
  }
  .my-space table tr td,
  .my-space table tr th {
    padding: 5px;
    vertical-align: top;
    font-size: 12px;
    border: 1px solid #eee;
    text-align: left;
    line-height: 18px;
  }
  .my-space table tr th,
  .my-space table tr:first-of-type td {
    background: #666;
    color: #fff;
    font-weight: 700;
  }
  .my-space table tr td {
    color: #555;
  }
  .atlast {
    border-top: 1px solid #e0e0e0;
    padding: 8px 16px;
    font-size: 11px;
  }
  .scorecard-tav {
    justify-content: space-around;
    margin: 0 16px 0;
    display: flex;
    padding: 0;
    padding-top: 8px;
    background: #000;
  }
  .scorecard-tav li a {
    font-size: 13px;
    color: #969696;
  }
  .scorecard-tav li {
    border-bottom: 2px solid #000;
    padding: 2px 8px;
    margin-right: 8px;
  }

  .scorecard-tav li.act {
    border-bottom: 2px solid #fff;
  }
  .scorecard-tav li.act a {
    font-weight: 700;
  }

  .scorecard-tav li a {
    text-decoration: none;
  }

  .scorecard-tav.clearfix:after {
    width: 73%;
  }
  .money_header span {
    display: block;
    font-size: 10px;
    color: #8a8989;
    padding-bottom: 4px;
  }
  .money_header_right {
    width: 94px;
  }
  .money_header:after {
    width: 94px;
    display: flex;
    align-items: center;
    background: url(/images/siteimages/moneycontrol_bg_icon_1591714054.svg);
    padding-right: 18px;
    background-position: right;
    background-size: contain;
    content: no-open-qoute;
    right: 3px;
    height: 63px;
    position: absolute;
    background-repeat: no-repeat;
    top: -8px;
  }
  .money_header_title {
    color: #424242;
    font-size: 14px;
    font-weight: 700;
    padding-left: 8px;
    border-left: 1px solid rgba(63,63,63,.54);
    position: absolute;
    left: 127px;
    top: -10px;
    padding-top: 5px;
  }
  .money_header img {
    width: 100px;
  }
  .money_header {
    margin-left: 40px;
    transform: translateY(7px);
  }
  .img_caption {
    font-size: 16px;
    line-height: 20px;
    color: #eee;
    padding: 7px 15px 4px 15px;
    position: absolute;
    bottom: 0px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.84);
  }
  .lm_cont {
    position: relative;
  }
  .newbyeline-agency li span a {
    color: #e1261c;
    font-weight: 700;
    font-size: 12px;
  }
  .newbyeline-agency li b {
    color: #4f4f4f;
    font-weight: 700;
  }
  .ampaddcntr {
    text-align: center;
  }
  .wapper {
    overflow: hidden;
  }
  .globalhd {
    border-bottom: 1px solid #001536;
    position: relative;
    display: flex;
    width: 100%;
    padding-bottom: 5px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .hd_heading, .hd_heading h1, #newstrendvideo h2, .globalhd h2, .globalhd h2 a{font-size:22px; line-height:16px; font-weight:bold; }
  .sponser-ad{
    padding:0;
    margin: 0;
  }
`;
