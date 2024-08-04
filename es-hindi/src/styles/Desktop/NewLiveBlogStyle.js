import css from 'styled-jsx/css';

export default css.global `
    .mimg-vdo {display: table;margin: 0 auto;}

    .live_blog_wrapper {
      width: 100%;
      margin: auto;
      background: #f5f5f5;
    }
    .live_blog {
      width: 100%;
      display: flex;
    }
    .live_blog_left {
      width: calc(100% - 324px);
      margin-right: 25px;
    }
    .live_blog_right {
      width: 445px;
      background: #f5f5f5 0% 0% no-repeat padding-box;
      padding: 20px;
    }
    .rhs_ad {
      width: 300px;
      margin: auto;
    }

    .live_blog_container {
      max-width: 1284px;
      margin: auto;
      padding: 20px 20px;
      background: #fff;
    }
    .language_row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .language {
      position: relative;
      // font-family: "Fira Sans";
    }
    .language .lang_title {
      width: 124px;
      height: 23px;
      line-height: 24px;
      border: 0.5px solid #11203e;
      border-radius: 11px;
      letter-spacing: 0px;
      color: #0a2040;
      font-size: 12px;
      padding: 0 8px;
      text-transform: uppercase;
      background: #f5f5f5;
      z-index: 999;
      position: relative;
      cursor: pointer;
    }
    .language .lang_title::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #0a2040;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .language .lang_list {
      width: 100%;
      position: absolute;
      top: 17px;
      font-size: 11px;
      background: #e8e8e8;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border: 1px solid #d0d0d0;
      border-top: 0;
      display: none;
      z-index: 99;
      left: 0;
      padding-top: 10px;
    }
    .language .lang_list.active {
      display: block;
    }
    .language .lang_list li a {
      position: relative;
      color: #001d42;
      font-size: 11px;
      text-transform: uppercase;
      text-align: left;
      display: block;
      padding: 7px;
    }
    .livenow_btn {
      width: 90px;
      height: 23px;
      background: #ed2128 0% 0% no-repeat padding-box;
      border-radius: 11px;
      text-align: center;
      line-height: 23px;
      letter-spacing: 2.1px;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 14px;
      // font-family: "Oswald";
    }

    .breadcrumbs ul {
      align-items: center;
      display: flex;
      letter-spacing: 0px;
      color: #001d42;
      // font-family: "Oswald";
      font-weight: bold;
      font-size: 11px;
      text-transform: uppercase;
    }
    .breadcrumbs ul h1 {
      font-size: 11px;
    }
    .breadcrumbs ul li a {
      color: #969696;
      text-decoration: none;
    }
    .breadcrumbs ul li {
      margin: 0 7px;
      font-size: 12px;
      padding: 0 2px;
      color: black;
      display: inline;
    }
    .breadcrumbs ul li:first-child {
      margin-left: 0;
    }
    .breadcrumbs {
      border-bottom: 1px #ccc dotted;
      margin-bottom: 15px;
      padding-bottom: 5px;
    }

    .articleshare-new {
      width: 40px;
      position: relative;
      margin-left: -50px;
      top: 50px;
      margin-bottom: 200px;
      left: -11px;
    }
    .articleshare-new-in {
      position: -webkit-sticky;
      position: sticky;
      top: 60px;
    }
    .articleshare-new-in a {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: red;
      margin-bottom: 1px;
    }
    .articleshare-new-in a:nth-child(1) {
      background: #25d366;
    }
    .articleshare-new-in a:nth-child(2) {
      background: #1877f2;
    }
    // .articleshare-new-in a:nth-child(3) {
    //   background: #1da1f2;
    // }
    .articleshare-new-in a:nth-child(4) {
      background: #ef3f56;
    }
    .articleshare-new-in a:nth-child(5) {
      background: #4e4e4e;
    }
    .tely {
      background: #0088cc !important;
    }
    .articleshare-new-in a svg {
      -webkit-filter: brightness(0) invert(1);
      filter: brightness(0) invert(1);
      height: 22px;
    }

    .live_blog_title {
      text-align: left;
      // letter-spacing: -0.92px;
      // color: #000000;
     font-family: "mukta";
      // font-weight: bold;
      // font-size: 35px;
      // line-height: 39px;
      font-size: 36px;
      font-weight: bold;
      line-height: 46px;
      /* text-shadow: 1px 1px 1px #000; */
      // padding-bottom: 6px;
      /* color: #fff; */
      // margin: 5px 0;
    }
    .live_blog_intro {
      letter-spacing: -0.28px;
      color: #808080;
      font-size: 14px;
      line-height: 20px;
      // font-family: "Fira Sans";
      font-weight: 400;
      // border-bottom: 4px #0a2040 solid;
      // padding: 10px 0;
      font-size: 18px;
      padding-bottom: 14px;
      line-height: 28px;
    }
    .first_story_right {
      // font-family: "PT Serif", serif;
      letter-spacing: 0px;
      color: #000000;
      font-size: 18px;
      line-height: 26px;
      width: calc(100% - 210px);
      margin-left: 19px;
    }
    .first_story {
      width: 100%;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      padding: 15px 0;
    }
    .first_story_left {
      width: 210px;
      height: 140px;
    }
    .first_story_left img {
      width: 100%;
      height: 137px;
      display: block;
    }
    .first_story_right a {
      font-size: 18px;
      color: #0000ff;
    }

    .live_blog_tab {
      height: 50px;
      background: #f7f7f7;
      border-top: 3px #c1c1c1 solid;
      display: flex;
      align-items: center;
      border-bottom: 1px #c1c1c1 solid;
      padding: 0 20px;
      justify-content: flex-start;
    }
    .live_blog_tab a {
      color: #959595;
      text-transform: uppercase;
      // font-family: "Fira Sans";
      font-weight: normal;
      font-size: 16px;
      text-decoration: none;
      padding: 14px 22px;
    }
    .live_blog_tab a.active {
      border-top: 3px #ed2128 solid;
      color: #ed2128;
      font-weight: bold;
      background: #fff;
      font-size: 18px;
    }

    .live_feed {
      width: 100%;
    }
    .live_feed_row {
      min-height: 230px;
      width: 100%;
      background: #fafafa 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      padding: 25px;
      margin-bottom: 30px;
      border-top: 1px #c1c1c1 solid;
    }

    .social_ping {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 0;
    }
    .sprite_cls {
      background-image: url(/images/siteimages/live-blog-sprite.png);
      width: 35px;
      height: 34px;
      background-repeat: no-repeat;
    }

    .key_event {
      width: 100%;
      min-height: 200px;
      background: #f3f3f3 0% 0% no-repeat padding-box;
      // font-family: "Fira Sans";
      border-bottom: 1px #c1c1c1 solid;
      margin: 0px 0 20px;
      position: relative;
      display: flex;
      align-items: center;
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/event-bg.png);
      background-size: contain;
      padding-left: 38px;
      padding-top: 17px;
      border-top: 3px #c1c1c1 solid;
    }
    .key_event_title {
      font-size: 30px;
      letter-spacing: -1.5px;
      color: #d9d9d9;
      position: absolute;
      right: 10px;
      font-weight: normal;
      top: 10px;
    }
    .key_event_list li {
      letter-spacing: 0px;
      color: #1e2630;
      font-size: 15px;
      line-height: 30px;
      text-decoration: underline;
      position: relative;
      padding-left: 15px;
    }
    .key_event_list li:after {
      content: "";
      position: absolute;
      left: 0;
      top: 12px;
      width: 7px;
      height: 7px;
      background: #707070;
      border-radius: 100px;
    }
    .key_event_list {
      width: 100%;
      position: relative;
    }
    ul.key_event_list:after {
      border: 1px dashed #707070;
      content: "";
      position: absolute;
      left: 2px;
      top: 12px;
      // height: 124px;
    }
    .key_event:after {
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/event-bg-2.png);
      width: 117px;
      height: 151px;
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .events_title {
      letter-spacing: 1.2px;
      color: #ed2128;
      font-weight: bold;
      font-size: 20px;
      transform: rotate(-90deg);
      width: 130px;
      height: 23px;
      position: relative;
      right: -17px;
      top: -10px;
    }
    .events_title:after {
      content: "";
      width: 18px;
      height: 13px;
      background: #c1c1c1 0% 0% no-repeat padding-box;
      position: absolute;
      bottom: 4px;
      left: -24px;
    }

    .social_icon {
      display: flex;
      align-items: center;
    }
    .social_icon li {
      display: block;
      width: 35px;
      height: 34px;
      border: 0.5px solid #707070;
      border-radius: 100px;
      margin-right: 10px;
    }
    .social_icon .fb {
      background-position: -6px 1px;
    }
    .social_icon .linkedin {
      background-position: -111px 1px;
    }
    .social_icon .whatsup {
      background-position: -163px 2px;
    }
    .social_icon .tw {
      background-position: -56px 1px;
    }
    .social_icon li a {
      display: block;
    }
    a.pin_cls.sprite_cls {
      width: 16px;
      height: 16px;
      background-position: -109px -15px;
    }
    a.pin_cls.sprite_cls:hover {
      background-position: -63px -15px;
    }

    .live_feed_intro {
      letter-spacing: -0.36px;
      color: #000000;
      font-size: 18px;
      line-height: 28px;
      // font-family: "PT Serif", serif;
    }
    .live_feed_intro a {
      color: #e1261d;
      font-weight: bold;
      text-decoration: none;
    }
    .live_feed_intro strong {
      font-weight: bold;
    }
    .live_feed_date {
      color: #959595;
      font-size: 12px;
      line-height: 22px;
      // font-family: "Fira Sans";
      padding-bottom: 5px;
      display: block;
    }
    .feed_title {
      letter-spacing: -0.4px;
      color: #000000;
      font-size: 22px;
      line-height: 28px;
      font-family: "mukta";
      font-weight: bold;
      display: block;
      padding: 10px 0 10px;
    }
    .author_name {
      letter-spacing: 1.5px;
      color: #114da5;
      text-transform: uppercase;
      font-size: 10px;
      // font-family: "Fira Sans";
      padding-bottom: 5px;
      display: block;
    }
    .news_updates {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      width: 148px;
      height: 30px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #d73a34;
      border-radius: 15px;
      display: flex;
      margin: 10px auto;
      text-align: center;
      letter-spacing: 0px;
      color: #ed2128;
      text-decoration: none;
      font-size: 14px;
      line-height: 28px;
      // font-family: "Fira Sans";
      justify-content: center;
      align-items: center;
    }
    .news_updates .sprite_cls {
      background-position: -340px -4px;
      display: block;
      width: 24px;
      height: 20px;
    }

    .live_feed_img {
      width: 100%;
      display: flex;
      align-items: end;
      padding-top: 10px;
    }
    .feed_img {
      width: 300px;
      height: 200px;
    }
    .feed_img img {
      width: 100%;
      display: block;
    }
    .feed_content {
      width: calc(100% - 300px);
      padding-left: 20px;
      // font-family: "Fira Sans";
    }
    .feed_content p {
      letter-spacing: -0.32px;
      color: #5a5a5a;
      font-size: 16px;
      line-height: 26px;
      font-weight: normal;
      padding: 10px 0;
    }
    .feed_img_title {
      letter-spacing: -0.4px;
      color: #000000;
      font-size: 20px;
      line-height: 28px;
    }
    .feed_slider_wrapper {
      padding: 30px 40px;
      background: #0a2040;
      margin-top: 20px;
    }
    .feed_slider {
      width: 100%;
      background: #0a2040;
      position: relative;
    }
    .feed_slider .glide__track {
      overflow: hidden;
    }
    .feed_slider .glide__slides {
      display: flex;
    }
    .feed_slider_row img {
      width: 100%;
      display: block;
      border: 1px solid #ffffff;
    }
    .readmore_content {
      font-size: 16px;
      letter-spacing: 0px;
      color: #000000;
      // font-family: "PT Serif", serif;
      line-height: 26px;
    }
    .readmore_link {
      display: block;
      color: #ba1117;
      text-transform: uppercase;
      font-size: 16px;
      border-bottom: 1px #ba1117 solid;
      text-decoration: none;
      // font-family: "Fira Sans";
      font-weight: bold;
      margin-bottom: 10px;
    }
    .feed_slider button.glide__arrow {
      width: 23px;
      height: 19px;
      border: 0;
      font-size: 0;
      background: transparent;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 100%;
      cursor: pointer;
    }
    .feed_slider button.glide__arrow.glide__arrow--next:before {
      content: "";
      position: absolute;
      width: 14px;
      height: 3px;
      background: #fff;
      left: 1px;
      top: 4px;
    }
    .feed_slider button.glide__arrow.glide__arrow--next:after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: rotate(-45deg);
      top: 0;
      left: 3px;
    }
    .feed_slider button.glide__arrow.glide__arrow--prev:before {
      content: "";
      position: absolute;
      width: 15px;
      height: 3px;
      background: #fff;
      left: 2px;
      top: 5px;
    }
    .feed_slider button.glide__arrow.glide__arrow--prev:after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-top: 2px solid #fff;
      border-left: 2px solid #fff;
      transform: rotate(-45deg);
      top: 0;
      left: 3px;
    }
    .feed_slider button.glide__arrow.glide__arrow--prev {
      left: initial;
      right: 100%;
    }
    .feed_slider_title {
      letter-spacing: -0.28px;
      color: #ffffff;
      opacity: 0.8;
      text-align: center;
      // font-family: "Fira Sans";
      font-size: 14px;
      padding-top: 10px;
    }

    .live_feed_row.result_section {
      border-top: 3px #114da5 solid;
      border-bottom: 3px #114da5 solid;
      padding: 20px 25px;
    }
    .live_feed_row.result_section .live_feed_date {
      padding-bottom: 0;
    }

    .highlights_content {
      background: #fafafa 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      padding: 30px;
      position: relative;
      padding-left: 60px;
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-top: 1px #c1c1c1 solid;
    }
    .highlights_title a {
      letter-spacing: -0.4px;
      color: #000000;
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
      text-decoration: none;
      // font-family: "Fira Sans";
      border-bottom: 1px #000000 solid;
    }
    .highlights_row {
      width: 100%;
      margin-bottom: 20px;
    }
    .highlights_title {
      padding-bottom: 13px;
    }
    .border_space {
      border-top: 0.5px solid #dddddd;
      width: 100%;
      position: relative;
      margin-bottom: 20px;
    }
    .border_space:after {
      content: "";
      position: absolute;
      width: 100%;
      left: 0;
      top: -3px;
      border-top: 0.5px solid #dddddd;
    }
    .border_space:before {
      content: "";
      position: absolute;
      width: 100%;
      left: 0;
      bottom: -2px;
      border-top: 0.5px solid #dddddd;
    }
    .highlights_row .live_feed_date:after {
      content: "";
      position: absolute;
      left: -34px;
      top: 7px;
      width: 7px;
      height: 7px;
      background: #707070;
      border-radius: 100px;
    }
    .highlights_row .live_feed_date {
      position: relative;
    }
    .highlights_content:after {
      border: 1px dashed #707070;
      content: "";
      position: absolute;
      left: 29px;
      top: 38px;
      height: calc(100% - 68px);
    }
    .highlights_title a:hover {
      color: #0000ff;
      border-color: #0000ff;
    }

    .comments_title {
      width: 100%;
      background: #fafafa 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      padding: 20px;
      letter-spacing: -0.32px;
      color: #000000;
      font-size: 16px;
      line-height: 26px;
      // font-family: "PT Serif", serif;
      border-radius: 20px;
      position: relative;
      margin-bottom: 10px;
    }
    .user_info {
      display: flex;
      align-items: center;
      // font-family: "Fira Sans";
      padding: 20px 0 30px;
    }
    .user_img {
      width: 50px;
      height: 50px;
      background: #5a5a5a;
      border-radius: 100px;
      margin-right: 10px;
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/pwa/image/author_img.png);
      background-repeat: no-repeat;
    }
    .user_info span {
      letter-spacing: -0.28px;
      color: #ed2128;
      font-size: 14px;
      line-height: 28px;
      font-weight: bold;
    }
    .user_info p {
      color: #959595;
      font-size: 12px;
      line-height: 17px;
    }
    .post_comment {
      width: 182px;
      height: 30px;
      background: #d73934;
      border-radius: 15px;
      display: block;
      text-align: center;
      line-height: 30px;
      // font-family: "Fira Sans";
      color: #ffffff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      margin: 10px auto;
    }
    .comments_title:after {
      content: "";
      position: absolute;
      width: 39px;
      height: 43px;
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/down-arrow.png);
      bottom: -36px;
      left: 28px;
    }
    .user_info_row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .reply_report a {
      display: block;
      font-size: 12px;
      // font-family: "Fira Sans";
      text-decoration: none;
      font-weight: normal;
    }
    .reply {
      color: #ed2128;
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/reply.svg);
      padding-left: 0;
      background-repeat: no-repeat;
      background-position: 7px;
      margin-bottom: 4px;
    }
    .report {
      color: #959595;
      margin-left: 19px;
    }
    .reply_report {
      text-align: right;
    }

    .related_articles_list {
      // font-family: "Fira Sans";
      width: 100%;
      margin-top: 20px;
    }
    .related_articles_list li figure {
      display: flex;
      align-items: end;
    }
    .story_img {
      width: 150px;
      height: 100px;
    }
    .story_img img {
      width: 100%;
      display: block;
    }
    .related_articles_list figcaption {
      width: calc(100% - 120px);
      padding-left: 20px;
    }
    .related_articles_list figcaption span {
      letter-spacing: 0px;
      color: #959595;
      font-size: 12px;
      line-height: 22px;
    }

    .story_tilte {
      letter-spacing: -0.32px;
      color: #000000;
      font-size: 16px;
      line-height: 24px;
    }
    .story_tilte a {
      color: #000000;
      text-decoration: none;
    }
    .related_articles_list li {
      margin-bottom: 20px;
    }

    .related_articles_list li:first-child .story_img {
      width: 300px;
      height: 200px;
      border: 1px solid #114da5;
    }
    .related_articles_list li:first-child figcaption {
      width: calc(100% - 300px);
    }
    .related_articles_list li:first-child .story_tilte {
      font-size: 20px;
      line-height: 28px;
    }
    .related_articles_list li:first-child p {
      letter-spacing: -0.28px;
      color: #5a5a5a;
      font-size: 14px;
      line-height: 22px;
      padding-top: 5px;
    }
    .related_articles_list li:first-child span {
      display: block;
    }
    .more_articles {
      width: 192px;
      height: 30px;
      background: #d73934 0% 0% no-repeat padding-box;
      border: 1px solid #d73a34;
      border-radius: 15px;
      margin: 15px auto 20px;
      display: block;
      text-align: center;
      line-height: 30px;
      letter-spacing: 0px;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 14px;
      // font-family: "Fira Sans";
      font-weight: bold;
    }

    .live_tv_top {
      color: #000000;
      text-transform: uppercase;
      font-size: 22px;
      line-height: 18px;
      // font-family: "Fira Sans";
      font-weight: normal;
      padding: 10px 40px;
      background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/liveblog/live-tv.svg);
      background-repeat: no-repeat;
      background-position: left center;
      margin-left: 10px;
    }
    // .live_tv {
    //   height: 283px;
    //   background: #ffffff 0% 0% no-repeat padding-box;
    //   box-shadow: 0px 3px 6px #00000029;
    //   border-radius: 6px;
    //   width: 405px;
    //   margin-top: 30px;
    // }
    .live_tv iframe {
      width: calc(100% - 20px);
      height: 236px;
      border: 0;
      padding: 0;
      border-top: 5px #ed2128 solid;
      border-bottom: 5px #ed2128 solid;
      margin: auto;
      display: block;
    }

    .live_opinion {
      width: 405px;
      height: 365px;
      background: #ffffff 0% 0% no-repeat padding-box;
      margin-top: 30px;
      border-top: 0.5px solid #0a2040;
      position: relative;
      // font-family: "Fira Sans";
      padding-top: 30px;
      margin: 40px auto 30px;
    }
    .live_opinion_title {
      position: absolute;
      top: -13px;
      width: 100%;
      text-align: center;
    }
    .live_opinion_title span {
      width: 114px;
      height: 23px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 0.5px solid #0a2040;
      letter-spacing: 1.2px;
      color: #0000ff;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
      display: block;
      margin: auto;
      line-height: 23px;
    }
    .opinion_section_title {
      letter-spacing: -0.4px;
      color: #000000;
      font-size: 20px;
      line-height: 28px;
      font-weight: bold;
      padding-bottom: 20px;
    }
    .opinion_section {
      width: 100%;
      padding: 0 25px;
    }
    .opinion_btn {
      width: 100%;
      display: flex;
      justify-content: end;
    }
    .opinion_btn button {
      width: 140px;
      height: 36px;
      background: #0000ff 0% 0% no-repeat padding-box;
      border-radius: 6px;
      border: 0;
      display: block;
      letter-spacing: 0px;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
      // font-family: "Fira Sans";
      margin-right: 10px;
      outline: none;
      cursor: pointer;
    }
    .radio input[type="radio"],
    .checkbox input[type="checkbox"] {
      display: none;
    }
    .radio label,
    .checkbox label {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 0.5px solid #707070;
      box-sizing: border-box;
    }
    .radio label::before,
    .checkbox label::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 10px;
      height: 10px;
      border-radius: var(--border-radius);
      background-color: transparent;
      transform: translate(-50%, -50%);
      transition: background-color 0.25s;
    }
    .radio :checked ~ label::before,
    .checkbox :checked ~ label::before {
      background-color: grey;
    }
    .radio span,
    .checkbox span {
      color: grey;
      vertical-align: top;
      transition: color 0.25s;
    }
    .radio :checked ~ span,
    .checkbox :checked ~ span {
      color: limegreen;
    }
    .opinion_row {
      width: 100%;
      display: flex;
      align-items: end;
    }
    .progress_vote {
      width: 333px;
      height: 26px;
      border: 0.5px solid #707070;
      border-radius: 3px;
      display: flex;
      align-items: center;
    }
    .progress_vote p {
      letter-spacing: -0.32px;
      color: #000000;
      font-size: 16px;
      background: #ededed;
      height: 24px;
      display: flex;
      align-items: center;
      padding: 0 0px;
      text-transform: uppercase;
      font-weight: bold;
      text-indent: 10px;
    }
    .radio {
      width: 14px;
      height: 14px;
      margin-right: 7px;
      margin-top: 5px;
    }
    .progress_bar {
      width: 100%;
      margin-bottom: 18px;
    }
    .progress_bar span {
      font-size: 14px;
      letter-spacing: -0.28px;
      color: #5a5a5a;
      display: block;
      padding-top: 5px;
    }
    .tags {
      width: 100%;
      clear: both;
      // font-family: "Fira Sans";
    }
    .tag_title {
      width: 53px;
      height: 23px;
      background: #5a5a5a 0% 0% no-repeat padding-box;
      border-radius: 5px;
      line-height: 25px;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }

    .tag_list {
      display: flex;
      flex-wrap: wrap;
    }
    .tag_list li {
      height: 24px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #c3c3c3;
      border-radius: 5px;
      font-size: 14px;
      line-height: 24px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .tag_list li a {
      letter-spacing: 0px;
      color: #959595;
      padding: 0 10px;
      display: block;
      text-decoration: none;
      font-weight: normal;
    }

    .current_live {
      width: 100%;
      position: relative;
      background: #0a2040 0% 0% no-repeat padding-box;
      // font-family: "Fira Sans";
      margin-top: 40px;
      margin-bottom: 30px;
    }
    .current_live_slider {
      width: 100%;
      padding: 30px 0;
    }
    .current_live_slider .glide__slides {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30px;
    }
    .current_live_slider .glide__track {
      overflow: hidden;
      width: 100%;
    }
    .current_live_img {
      width: 100%;
    }
    .current_live_img img {
      width: 100%;
      display: block;
    }
    .current_live_title {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0px;
      color: #ffffff;
      font-weight: normal;
      text-align: center;
      padding-top: 5px;
    }
    .current_live_row a {
      color: #fff;
      text-decoration: none;
    }
    .current_live .live_opinion_title span {
      width: 178px;
      height: 23px;
    }
    .current_live .glide__arrows {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
      padding: 0 20px;
    }
    .current_live .glide__bullets {
      -webkit-touch-callout: none;
      user-select: none;
      text-align: center;
      display: flex;
    }
    .current_live .glide__bullets button:focus {
      outline: none;
    }
    .current_live .glide__bullets button.glide__bullet {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      border: 0;
      background: #fff;
      margin: 0 8px;
    }
    .current_live
      .glide__bullets
      button.glide__bullet.glide__bullet--active {
      background: #ed2128;
      border-radius: 15px;
      width: 6px;
      height: 6px;
    }
    .current_live .glide--rtl {
      direction: rtl;
    }

    .current_live .left-arrow {
      width: 17px;
      height: 16px;
      position: relative;
      font-size: 0;
      margin-right: 40px;
    }
    .current_live .left-arrow:before {
      content: "";
      border-top: 2px solid #959595;
      border-left: 2px solid #959595;
      width: 9px;
      height: 9px;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      position: absolute;
      left: 0px;
      top: 2px;
    }
    .current_live .left-arrow:after {
      content: "";
      width: 17px;
      height: 2px;
      background-color: #959595;
      display: block;
      left: 0;
      position: absolute;
      top: 7px;
    }
    .current_live .right-arrow {
      position: relative;
      font-size: 0;
      width: 17px;
      height: 15px;
      margin-left: 40px;
    }
    .current_live .right-arrow:after {
      content: "";
      width: 17px;
      height: 2px;
      background-color: #959595;
      display: block;
      left: 1px;
      position: absolute;
      top: 6px;
    }
    .current_live .right-arrow:before {
      content: "";
      border-top: 2px solid #959595;
      border-left: 2px solid #959595;
      width: 9px;
      height: 9px;
      -webkit-transform: rotate(132deg);
      -ms-transform: rotate(132deg);
      transform: rotate(132deg);
      position: absolute;
      top: 2px;
      left: 8px;
      background: transparent;
    }
    .hide {
      display: none;
    }
    .updateBtn a::before {
      background-repeat: no-repeat;
      display: table;
      content: "";
      height: 22px;
      background-position: -395px -2px;
      margin-right: 7px;
    }
    .updateBtn a {
      font-size: 14px;
      color: red;
      padding: 6px 10px;
      border: 1px solid;
      font-weight: bold;
      border-radius: 20px;
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      cursor: pointer;
    }
    .updateBtn {
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      float: left;
      width: 100%;
    }
    html {
      scroll-behaviour: smooth;
    }
    .readmore_content p,
    .first_story_right p {
      margin-bottom: 25px;
      font-size: 18px;
      line-height: 30px;
      color: #000000;
      // font-family: "Eczar", serif !important;
      text-align: justify;
    }
    .readmore_content p a,
    .first_story_right p a {
      font-weight: bold;
      line-height: 26px;
      color: #e1261d;
      display: inline-block;
    }
    .sub_navigation {
      margin-bottom: 0 !important;
      position: relative;
      z-index: 1;
    }
    .spriteshare {
      background: url(/images/siteimages/sprite_img_1.svg)
        0 0 no-repeat;
      width: 40px;
      height: 40px;
      display: block;
    }
    .spriteshare.art-linkedin-icon {
      background-position: 0px -100px;
    }
      .topDate li:first-child {
        margin-right: 4px;
      }
      .topDate li,
      .topDate a {
        color: #949494;
      }
      .refresh-box {
        font-family: mukta;
        margin-left: auto;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .refresh-box .rfs-h {
        font-size: 14px;
        text-transform: uppercase;
        margin-right: 10px;
        color: #0A2040;
        font-weight: bold;
      }
      .auto-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .auto-slider {
        border-radius: 34px;
        position: absolute;
        border: 1px solid #11203E;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F5F5F5;
        -webkit-transition: .4s;
        -webkit-transition: .4s;
        transition: .4s;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 12px;
        text-transform: uppercase;
        color: #484848;
      }
      .auto-switch {
        position: relative;
        display: inline-block;
        width: 56px;
        height: 24px;
      }
      .auto-slider:before {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
        border-radius: 50%;
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: #FF0000;
        -webkit-transition: .4s;
        -webkit-transition: .4s;
        transition: .4s;
      }
      input.on+.auto-slider::before {
        background-color: #33800B;
      }
      input.on+.auto-slider:before {
        -webkit-transform: translateX(0px);
        -ms-transform: translateX(0px);
        transform: translateX(0px);
      }
      .auto-switch .switchOn {
        width: 50%;
        padding-right: 8px;
        margin-left: auto;
      }
      .auto-switch .switchOff {
        width: 50%;
        text-align: right;
        padding-left: 8px;
      }
      .autoRegreshBrder {
        border-top: 0.5px solid #DDDDDD;
        width: 100%;
        position: absolute;
        bottom: 0;
      }
      .autoRegreshBrder:before {
        content: "";
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -2px;
        border-top: 0.5px solid #DDDDDD;
      }
      .autoRegreshBrder:after {
        content: "";
        position: absolute;
        width: 100%;
        left: 0;
        top: -3px;
        border-top: 0.5px solid #DDDDDD;
      }
      .twitter-tweet {
        margin: 0 auto  !important;
      }
      .instagram-media {
        margin: 0 auto !important;
      }

  
  .button-up {
    bottom: 108px;
    right: 350px;
    z-index: 999;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
    height: 40px;
    width: 45px;
    position: fixed;
    display: none;
  }
      
      .button-up:hover {
        transform: translate3d(0, -10px, 0);
        cursor:pointer;
      }
      
      .button-up::after{
        content: "";
        position: relative;
        // left: 12px;
        z-index: 11;
        display: block;
        width: 15px;
        height: 15px;
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(45deg);

      }
      
      .adhipadhe {
        display: inline-block;
        padding-left: 0px;
        margin: 0px 0px 5px;
        left: 50%;
        transform: translateX(-50%);
        background: none;
        position:relative;
        font-size: 14px;
line-height: 20px;
font-family: "Mukta",sans-serif;
font-weight: bold;
    }

    .live_feed_intro img, .live_feed_intro figure {
      width:100% !important;
      height:auto;
    }
    body {
      font-size: 100%;
      font-family: "Eczar", serif !important;
      font-weight: 400;
      margin: auto;
    }
    .live_feed_row table {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .live_feed_row table td {
      padding: 8px;
      vertical-align: top;
      font-size: 14px;
      border: 1px solid #eee;
      text-align: left;
    }
    .live_feed_row table tr:first-of-type td {
      background: #666;
      color: #fff;
      font-weight: bold;
    }
    .live_feed_row table {
      width: 100%;
      border-collapse: collapse;
    }

  .scrollbar{
    white-space: nowrap;
    overflow-x: scroll;
--scroll-color: #C6C6C6;
--scroll--hover-color: #666;
scrollbar-color: #F5F5F5 #c3bebe;
scrollbar-width: thin;
position: relative;
}
.scrollbar::-webkit-scrollbar-track {
    background: -moz-linear-gradient(top,  rgba(209,209,209,0) 0%, rgba(209,209,209,0) 28%, rgba(209,209,209,1) 50%, rgba(117,117,117,0) 72%, rgba(0,0,0,0) 100%);
    background: -webkit-linear-gradient(top,  rgba(209,209,209,0) 0%,rgba(209,209,209,0) 28%,rgba(209,209,209,1) 50%,rgba(117,117,117,0) 72%,rgba(0,0,0,0) 100%); 
    background: linear-gradient(to bottom,  rgba(209,209,209,0) 0%,rgba(209,209,209,0) 28%,rgba(209,209,209,1) 50%,rgba(117,117,117,0) 72%,rgba(0,0,0,0) 100%); 
    
}
.scrollbar::-webkit-scrollbar {
    height: 5px;
}
.scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--scroll-color);
border-radius: 4px;
}
.CN-Score-widget {
  margin: 20px 0;
}
.live_feed_row ul, .live_feed_row ol {
  margin: 0 1em;
}
.live_feed_row li {
  list-style: inherit;
}
// blockquote {
//   margin: 1em 40px;
//   quotes: auto;
// }
.pinbox_wrap {background-color: #fff;  border: 1px solid #051936;  border-radius: 5px; position: relative; font-family: "Mukta",sans-serif;}
.pinbox_hd {background-color: #051936;  border-radius: 2px 5px 0px 0px; padding: 5px 15px; color: #fff; display: flex;    font-size: 16px; line-height: 27px; font-weight: bold;}
.pinbox_hd img {margin-right: 10px;}
.pinbox_cont {padding: 10px 20px; font-size: 16px; line-height: 27px;}
.tm {color: #939393;}
.pinbox_cont p {color: #050505; position: relative; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;     padding-bottom: 20px;}
// .pinbox_cont p:after {background: transparent linear-gradient(180deg, #FFFFFFC9 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box; content: "";width: 100%; height: 63px; display: block; position: absolute; bottom: 0;}
.plus,.plus::after { display: block; box-sizing: border-box; background: currentColor; border-radius: 10px}
.plus {  margin-top: -2px;  position: relative;  transform: scale(var(--ggs,1)); width: 16px; height: 2px}
.plus::after {content: ""; position: absolute; width: 2px;height: 16px; top: -7px; left: 7px}
@media (max-width:768px){
  .pinbox_wrap{margin: 0 10px; min-height: 233px;}
  .pinbox_cont p{}
  }   
.pnbtn { width: 135px; height: 40px;  border-radius: 50px; background-color: #051936; color: #fff; text-align: center;    padding: 7px 10px;position: absolute; left: 0; right: 0; margin: 0 auto; bottom: -19px; display: flex; justify-content: space-evenly; align-items: center; cursor: pointer;}
.swkey{margin: 10px 0; display: flex; align-items: center;}
.swkey > span { color: #000; font-size: 16px; line-height: 27px;  margin-left: 10px; font-family: "Mukta",sans-serif;}
.switch {position: relative;display: inline-block;width: 40px;height: 20px;}
.switch input {opacity: 0;width: 0;height: 0;}
.slider {position: absolute; cursor: pointer;top: 0; left: 0; right: 0; bottom: 0; background-color: #8c8c8c; -webkit-transition: .4s;  transition: .4s; border-radius: 34px;}
.slider:before {position: absolute; content: "";  height: 18px; width: 18px; left: 1px; bottom: 1px; background-color: white;  -webkit-transition: .4s;transition: .4s; border-radius: 50%;}
input:checked + .slider {background-color: #22874D;}
input:checked + .slider:before {transform: translateX(20px);}
@media (max-width:768px){.swkey{padding: 0 10px;}}
.lv_wrap {background-color: #F8F8F8;padding: 15px; border-radius: 5px;    position: relative;}
.lv_wrap p {color: #000000; text-transform: uppercase; font-size: 14px; line-height: 23px;}
.al_sldr{margin-bottom: 10px; padding-top: 27px;  overflow: hidden;}       
.al_sldr .slide{display: flex;flex-direction: column;cursor: pointer;position: relative;}
.al_sldr .slide:before{display: none;}
.sldr_img{margin: 16px 0 20px 0;}
.al_sldr .name{font-weight: bold; font-size: 14px;  line-height: 23px; color: #EC2128; text-transform: capitalize;    margin: 0 0 5px 0; display: -webkit-box; -webkit-line-clamp: 4;  -webkit-box-orient: vertical;   overflow: hidden;}
.al_sldr .date{font-size: 14px; line-height: 23px; color: #707070;}
.arrows_wrap {position: absolute; top: 12px; right: 10px;}
 .arrow{background: #454545;border: none;cursor: pointer;border-radius: 100%;width: 27px; height: 27px;padding: 2px 2px 0 0;}
 .arrow.arrow--right{ padding: 3px 0px 0 3px; margin-left: 4px;}
 .arrow.active{ background: rgb(236 33 40);}
 .arrow.arrow--right[disabled]{background: #454545;}
.al_sldr .slides { display: flex; border-top: 1px dashed #707070;  padding-top: 22px; }
.al_sldr .slide:after {content: ""; border-radius: 50%; width: 10px; height: 10px; background-color: #656565; position: absolute; left: 13px; top: -28px;}
.al_sldr .slide:first-child:after {left: 0;}
// .al_sldr .slide.active:after{background-color: #EC2128;} 
.al_sldr .slide:hover:after{background-color: #EC2128;} 
.al_sldr .slide:hover .name{text-decoration: underline;}
.arrow:hover {background: rgb(75 75 75);}
.LV_wrap{margin-bottom:30px;}
@media (max-width:768px){
 .arrows_wrap{display: none;}
 .al_sldr{overflow-x: scroll; overflow-y: hidden;} 
}       
.minus {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs,1));
  width: 16px;
  height: 2px;
  background: currentColor;
  border-radius: 10px;
}
.live_feed_intro ol, .live_feed_intro ul {
  margin: initial;
  padding: 0 0px 0 30px;
}
.live_feed_intro ul li {
  list-style: initial;
}
.live_feed_intro ol li {
  list-style: decimal;
  margin: initial;
  padding: 0 10px;
}

`;