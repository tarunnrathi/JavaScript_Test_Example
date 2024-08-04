import css from 'styled-jsx/css';

export default css.global `
  @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;
      src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) 
      format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
  body {
    font-size: 100%;
    font-weight: 400;
    margin: auto;
    font-family: "Mukta",sans-serif;
  }
  article,
  aside,
  figure,
  footer,
  header,
  nav,
  section {
    display: block;
  }

  article,
  aside,
  figure,
  footer,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  nav,
  ol,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #111;
  }

  a img {
    border: none;
  }

  .lkfleft {
    float: left;
  }

  .lkfright {
    float: right;
    display: inline !important;
  }
  footer {
    margin-bottom: -20px;
  }
  .clearfix {
    clear: both;
  }
  .clearfix:after,
  .clearfix:before {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }

  .container {
    margin: auto;
    position: relative;
    max-width: 1244px;
  }

  .dflex {
    display: flex;
  }

  .justify-space-betwwen {
    justify-content: space-between;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .align-items-center {
    align-items: center;
  }

  * {
    box-sizing: border-box;
  }

  a:hover {
    color: #e1261d;
  }

  .vsp10 {
    padding-top: 10px;
  }
  .hmlft {
    width: 74.5%;
  }
  .fleft {
    float: left;
  }
  .hmrgt {
    width: 25.5%;
    position: relative;
    z-index: 1;
  }
  .fright {
    float: right;
  }
  .sponser-ad {
    padding: 0;
    margin: 0;
  }
  .budget_container {
    margin-bottom: 15px;
  }
`;
