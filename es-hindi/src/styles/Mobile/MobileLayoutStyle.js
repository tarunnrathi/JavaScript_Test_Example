import css from 'styled-jsx/css';

export default css.global `
        .artcl_container > div > h1 {
          font-size: 26px;
          height: 170px;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
        }
        body {
          margin: auto;
          background: #fff;
          font-family: "Mukta", sans-serif;
        }
        * {
          margin: 0;
          padding: 0;
          list-style: none;
          text-decoration: none;
          border: none;
          box-sizing: border-box;
        }
        article,
          aside,
          div,
          figure,
          footer,
          form,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          li,
          nav,
          p,
          section,
          figcaption,
          ul {
            margin: 0;
            padding: 0;
          }
          
          .clearfix {
            clear: both;
          }
          figure {
            position: relative;
            line-height: 0;
            overflow: hidden;
          }
          button {
            cursor: pointer;
            font-size: 0;
            border: 0;
            outline: none;
          }
          .brdcrm {
            background: #fff;
          }
          .banner,
          .tpadd {
            line-height: 0;
          }
          * {
            box-sizing: border-box;
          }
          // #Layer_1 {
          //   width: 135px;
          //   height: 52px;
          // }
          .st0 {
            fill: none;
            stroke: #fff;
            stroke-miterlimit: 10;
          }
          .st1 {
            fill: #061836;
          }
          .st2 {
            fill: #fff;
          }
          .st3 {
            fill: #ec2027;
          }
          
          a.nav_icon:before {
            width: 22px;
            top: -6px;
          }
          a.nav_icon:after {
            width: 22px;
            top: 4px;
          }
          .wp-caption, .wp-caption.alignnone {
            width : auto !important;
            line-height: inherit;
          }
          .wp-caption img, .wp-caption.alignnone img {
            width: 100%;
            height: auto;
          }
          .sponser-ad{
            padding:0;
            margin: 0;
          }
          iframe {
            overflow-y: hidden;
          }
`;
