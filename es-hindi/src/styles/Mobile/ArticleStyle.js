import css from 'styled-jsx/css';

export default css.global `
  .article_section {
    overflow: hidden;
  }
  // * {
  //   margin: 0px;
  //   padding: 0px;
  //   box-sizing: border-box;
  // }
  // header,
  // footer,
  // nav,
  // section,
  // article,
  // aside,
  // figure {
  //   display: block;
  // }
  // h1,
  // h2,
  // h3,
  // h4,
  // h5,
  // h6,
  // p,
  // ul,
  // ol,
  // header,
  // footer,
  // nav,
  // article,
  // aside,
  // figure,
  // figcaption {
  //   margin: 0px;
  //   padding: 0;
  // }
  // li {
  //   list-style: none;
  // }
  // a {
  //   text-decoration: none;
  // }
  // a img {
  //   border: none;
  // }
  // .clearfix {
  //   clear: both;
  // }
  // .clearfix:after,
  // .clearfix:before {
  //   content: '';
  //   display: block;
  //   clear: both;
  //   visibility: hidden;
  //   line-height: 0;
  //   height: 0;
  // }

  .mob_container {
    padding: 0 15px;
    box-sizing: border-box;
  }
  h1.article_heading1 {
    font-size: 26px;
    line-height: 32px;
    color: #001D42;
    font-weight: bold;
    padding: 10px 0px 0px;
    min-height: 111px;
}
  .artcl_container {
  }
  .article_img {
    text-align: center;
  }
  div.loader-player + div,
  .pubstack-video-js {
    height: 240px !important;
  }

  .article_img_dis {
    color: #5a5a5a;
    font-size: 14px;
    line-height: 21px;    
    font-weight: 400;
    text-align: left;
    padding: 5px 15px;
    background-color: #f2f2f2;
  }
  .article_img_inner span img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .short_desc {
    border-bottom: 0px;
    padding-top: 0;
    margin-bottom: 5px;
    position: relative;
    display: block;
    min-height: 70px;
}
.short_desc h2 {
  color: #404040;
  font-size: 15px !important;
  line-height: 24px !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: bold;
  text-align: left;
  padding-right: 8px;
}

  .social_share_sec {
    margin-bottom: 15px;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  ul.art_social_share {    
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  ul.art_social_share li {
    color: rgb(107, 107, 107);
    font-size: 14px;
    margin-left: 15px;
    text-transform: uppercase;
    line-height: 0;
}
  ul.art_social_share li:first-child {
    margin-left: 0px;
  }

  .spriteshare {
    background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
    width: 40px;
    height: 40px;
    display: block;
}
  .spriteshare.art-facebook-icon {
    background-position: -97px -4px;
  }
  .spriteshare.art-twitter-icon {
    background-position: -139px -4px;
  }
  .spriteshare.art-linkedin-icon {
    background-position: -181px -4px;
  }
  
  .spriteshare.art-telegram-icon {
    background-position: -226px -4px;
  }
  .spriteshare.art-email-icon {
    background-position: -9px -162px;
  }

  .add_secton,
  .middlead,
  .ad_cntainer {
    margin: 0px -15px 10px -15px;
    padding: 10px 0px 10px;
    text-align: center;
    display: flex;
    overflow: hidden;
    background: #f5f5f5;
    justify-content: center;
    height: 300px;
  }
  .add_sec {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    justify-content: center;
    overflow: hidden;
    margin: 0 auto;
  }
  #vigyapan {
    font-size: 11px;
    line-height: 14px;
    backdround-color: #000;
    padding-top: 2px;
    display: block;
    width: 100%;
    background: #fff;
  }
  .add_sec img {
    width: 100%;
    display: block;
  }

  .artcl_byline_sec {
    margin-bottom: 20px;
  }
  .artcl_byline_sec .artcl_byeline {
    border-bottom: 1px dotted #939393;
    list-style: none;
    margin: 0;
    font-size: 13px;
    padding-bottom: 2px;
  }
  .artcl_byline_sec .artcl_byeline li {
    position: relative;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.4;
    color: #949494;
    padding: 3px 0 3px 10px;
  }
  .artcl_byline_sec .artcl_byeline li:before {
    content: '';
    background: #454545;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    position: absolute;
    top: 10px;
    left: 0;
  }
  .artcl_byline_sec .artcl_byeline li:first-child:before {
    background: #e1261d;
  }
  .artcl_byline_sec .artcl_byeline li span a {
    color: #e1261d;
    text-decoration: none;
    position: relative;
    font-weight: bold;
    font-size: 13px;
    line-height: 21px;
  }
  .artcl_byline_sec .artcl_byeline li b {
    font-weight: bold;
    color: #454545;
    font-size: 13px;
    line-height: 21px;
  }

  .content_sec {
  }
   
  .content_sec p {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 32px;
    color: #000;
    font-weight: 400;
  }

  
  .content_sec p a {
    font-weight: bold;
    font-size: 20px;
    line-height: 32px;
    color: #e1261d;
    border-bottom: 1px dotted;
}

  .related_nws_sec {
    background: #3e3e3e;
    margin: 0px -15px 20px;
  }
  .rltd_nws_hdng {
    font-size: 18px;
    justify-content: center;
    line-height: 18px;
    padding-top: 5px;
    height: 36px;
    color: #fff;
    font-weight: bold;
    background-color: #e1261d;
    display: flex;
    align-items: center;
  }
  .rltd_lists_sldr {
    display: flex;
    padding: 15px 0 0 0;
  }
  .rltd_lists_sldr li {
    border: 1px solid #9b9b9b;
    overflow: hidden;
  }
  .rltd_lists_sldr_img {
    overflow: hidden;
  }
  .rltd_lists_sldr_img img {
    width: 100%;
    display: block;
  }
  .rltd_lists_sldr p {
    margin-bottom: 0px;
    color: #fff;
    font-size: 15px !important;
    background: #1a1a1a;
    line-height: 1.5 !important;
    padding: 8px;
    font-weight: bold;
    text-align: left;
    height: 110px;
  }
  .rltd_lists_sldr li:last-child {
    margin-right: 0px;
  }

  .related_nws_slidr {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .related_nws_slidr .glide__bullets {
    display: inline-flex;
    justify-content: center;
    position: relative;
    top: 0;
    margin: 0 auto;
    text-align: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .related_nws_slidr .glide__bullets button.glide__bullet {
    width: 6px;
    height: 6px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden !important;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .related_nws_slidr .glide_arroe_buttons {
    display: flex;
    justify-content: space-between;
    padding: 0px 70px;
    position: absolute;
    top: unset;
    bottom: 2px;
    left: 0;
    right: 0;
  }

  .related_nws_slidr .left-arrow,
  .related_nws_slidr .right-arrow {
    width: 15px;
    height: 15px;
    transform: translate(0, -50%);
  }
  .related_nws_slidr .left-arrow::before {
    content: '';
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .related_nws_slidr .left-arrow::after {
    content: '';
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 3px;
    top: 7px;
  }

  .related_nws_slidr .right-arrow::before {
    content: '';
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .related_nws_slidr .right-arrow::after {
    content: '';
    height: 2px;
    width: 10px;
    position: absolute;
    right: 3px;
    top: 7px;
    background: #fff;
  }
  .glide__bullets .glide__bullet--active {
    background: #e1261d !important;
    border-radius: 5px !important;
    width: 18px !important;
  }

  .podcast_info {
    position: relative;
  }
  .podcast_section {
    width: 100%;
    margin: 0px auto 20px;
    overflow: hidden;
  }
  .podcast_hdr_sec {
    position: relative;
    border-radius: 10px 10px 0px 0px;
    background: #e1261d;
    display: flex;
    align-items: center;
  }
  .podcast_contnr_sec {
    background: #3e3e3e;
    padding: 10px 25px 10px 0px;
    border-radius: 0px 0px 10px 10px;
    position: relative;
  }
  .podcast_hdr_sec h6 {
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
    padding: 0px;
    color: #fff;
  }
  .podcast_hdr_sec a {
    padding: 8px 15px 0px;
  }
  body .podcast_contnr_sec .podcast_info {
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    border-bottom: 1px dashed #ffffff;
    color: #fff;
    margin-left: 10px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    padding-left: 50px;
  }
  .podcast_contnr_sec::before {
    content: url('https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mike.png');
    width: 36px;
    height: 36px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    border-radius: 50%;
    background-color: #000;
  }
  .play_sectio_n {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
  }
  .play_bt_n {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #fff;
  }
  .play_progres_bar {
    width: calc(100% - 90px);
    background: #f1f1f1 !important;
    height: 8px;
    border-radius: 20px;
    cursor: pointer;
  }
  .playing_point {
    height: 8px;
    width: 25%;
    background: #ff4a4a;
    border-radius: 20px;
    position: relative;
  }
  .playing_point:after {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #fff;
    position: absolute;
    border-radius: 50%;
    left: 44px;
    top: -2px;
  }
  p.duration_play {
    display: flex;
    width: 65px;
    margin-bottom: 0px;
  }

  p.duration_play span {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    color: #ffffff;
  }
  p.duration_play strong {
    font-size: 13px;
    line-height: 20px;
    font-weight: bold;
    color: #ffffff;
  }

  .artcl_slder_section {
    margin: 0px -10px 20px;
    max-height: 385px;
    overflow: hidden;
  }
  .artcl_sldr {
    overflow: hidden;
  }
  .artcl_sldr .custom_artcl_sldr {
    display: flex;
    width: 100%;
  }
  .artcl_sldr .custom_artcl_sldr li {
    background-color: #f2f2f2;
    padding-bottom: 30px;
  }
  .artcl_sldr .custom_artcl_sldr li figure {
  }
  .artcl_sldr .custom_artcl_sldr li figure img {
    width: 100%;
    display: block;
  }
  .artcl_sldr .custom_artcl_sldr li p {
    margin-bottom: 0px;
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    color: #5a5a5a;
    text-align: center;
    background-color: #f2f2f2;
    padding: 15px 10px 15px;
  }
  .artcl_sldr .glide_arroe_buttons {
    position: relative;
    top: -30px;
    display: flex;
    justify-content: space-between;
    padding: 0px 70px;
  }
  .artcl_sldr .left-arrow,
  .artcl_sldr .right-arrow {
    width: 10px;
    height: 15px;
    transform: translate(0, -50%);
  }
  .artcl_sldr .left-arrow::before {
    content: '';
    border-top: 2px solid #707070;
    border-left: 2px solid #707070;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .artcl_sldr .left-arrow::after {
    content: '';
    width: 10px;
    height: 2px;
    background: #707070;
    position: absolute;
    left: 3px;
    top: 7px;
  }
  .artcl_sldr .right-arrow::before {
    content: '';
    border-bottom: 2px solid #707070;
    border-right: 2px solid #707070;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .artcl_sldr .right-arrow::after {
    content: '';
    height: 2px;
    width: 10px;
    position: absolute;
    right: 3px;
    top: 7px;
    background: #707070;
  }
  .artcl_sldr .glide__bullets {
    display: inline-flex;
    justify-content: center;
    position: relative;
    top: -51px;
    margin: 0 auto;
    text-align: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .artcl_sldr .glide__bullets button.glide__bullet {
    width: 8px !important;
    height: 8px !important;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden !important;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .artcl_sldr .glide__track {
    border-bottom: 1px solid #c4c4c4;
  }
  .brk {
    display: block;
  }

  .contnt_img {
    position: relative;
    margin: -10px 0px 10px;
    // margin: 0 -15px 20px;
    // background-color: #000000;
    background-color: #000000;
    padding: 15px 15px;
    //padding: 20px 0px;
  }
  .contnt_img img {
    display: block;
    width: 100%;
  }
  .contnt_img iframe {
    width: 100% !important;
  }
  .contnt_img .play_btons {
    background-color: #e1261d;
    height: 35px;
    width: 35px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    border: 1px solid #ffffff;
  }
  .contnt_img .ply_btns_icon {
    width: 0;
    position: absolute;
    height: 0;
    left: 56%;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .slction_section {
    width: 100% !important;
  }
  .slidr_sec {
    margin: 0px -15px 20px -15px;
    background-color: #f2f2f2;
    padding-bottom: 15px;
    border-bottom: 3px solid #061836;
  }
  .slection__sldr .custom_artcl_sldr li figure {
    width: 170px;
    overflow: hidden;
    height: auto;
  }
  .slection__sldr .custom_artcl_sldr li p {
    margin-bottom: 0px;
    color: #061836;
    font-size: 14px;
    background: #ffffff;
    line-height: 1.5;
    padding: 8px;
    font-weight: bold;
    text-align: left;
    height: 120px;
    overflow: hidden;
  }
  .slection__sldr ul li figure {
    width: 220px;
    height: 147px;
    overflow: hidden;
    position: relative;
  }
  .slection__sldr ul li figure img {
    width: 100%;
    display: block;
  }
  .slection__sldr .custm_slecton li {
    width: 170px !important;
    box-shadow: 0px 2px 4px #00000029;
    border: 1px solid #fff;
    background: #fff;
  }

  .slct_sate_city_sec {
    background: #e1261d;
    display: flex;
    justify-content: space-between;
    margin: 0px -15px;
  }
  .slct_sate_city_sec .slction_hdng {
    font-size: 18px;
    line-height: 40px;
    color: #fff;
    height: 40px;
    font-weight: bold;
    padding-left: 15px;
  }
  .slct_sate_city_sec .slction_hdng span {
    font-weight: 400;
    display: inline-block;
  }
  .slct_state,
  .slct_city {
    position: relative;
    margin-right: 15px;
  }
  .slct_city {
    position: relative;
    margin-right: 2px;
  }

  .selecton_sec {
    display: flex;
    padding: 0px 0px;
    justify-content: center;
  }
  .custom_cl_S {
    width: 160px;
    border-radius: 6px;
    border: 1px solid #c3c3c3;
    margin-right: 10px;
    padding: 0px 5px;
    background: #fff;
    position: relative;
    font-weight: 400;
  }
  .select_hd_ing {
    color: #061836;
    font-size: 14px;
    line-height: 30px;
    font-weight: bold;
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding-left: 23px;
    padding-top: 2px;
  }
  span.select_hd_ing:before {
    content: '';
    background: url(/images/siteimages/sprite_img_fornewarticle_1636363070.svg)
      no-repeat;
    position: absolute;
    left: 5px;
    top: 7px;
    width: 18px;
    height: 20px;
    background-position: -9px -411px;
  }
  .all_states_list {
    display: none;
    position: absolute;
    top: 35px;
    left: 0;
    background: #f7f5f5;
    border-radius: 0 0 10px 10px;
    right: 0;
    box-shadow: 0 0 6px #c3c3c3;
    overflow: hidden;
    z-index: 1;
    font-size: 14px;
    border: 1px solid #ccc;
    background: #fff;
    height: 240px;
    overflow: auto;
  }
  .custom_cl_S:before {
    content: '';
    width: 5px;
    height: 5px;
    border-top: 1px solid #444;
    border-left: 1px solid #444;
    position: absolute;
    right: 10px;
    transform: rotate(45deg);
    top: 10px;
    transition: all 0.5s ease-in-out;
  }
  .custom_cl_S:after {
    content: '';
    width: 5px;
    height: 5px;
    border-top: 1px solid #444;
    border-left: 1px solid #444;
    position: absolute;
    right: 10px;
    transform: rotate(-135deg);
    top: 15px;
    transition: all 0.5s ease-in-out;
  }
  .custom_cl_S:last-child {
    margin-right: 5px;
  }
  .custom_cl_S:hover .all_states_list {
    display: block;
  }
  .all_states_list li a {
    font-size: 14px;
    line-height: 30px;
    font-weight: bold;
    color: #061836;
    padding: 0px 5px;
    box-sizing: border-box;
    display: block;
    width: 100%;
  }
  .show_all_stats_cities {
    display: block;
  }

  body .custm_slecton li p {
    position: static;
    color: #000;
    background: #ffffff;
    padding: 15px 20px;
    text-align: left;
    list-style: none;
  }

  .slection__sldr {
    overflow: hidden;
  }
  .slection__sldr .custom_artcl_sldr {
    display: flex;
    width: 100%;
    padding: 15px 15px 0px 15px;
  }
  .slection__sldr .glide_arroe_buttons {
    position: relative;
    top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0px 70px;
  }
  .slection__sldr .left-arrow,
  .slection__sldr .right-arrow {
    width: 15px;
    height: 15px;
    transform: translate(0, -50%);
    position: relative;
    top: 5px;
  }
  .slection__sldr .left-arrow::before {
    content: '';
    border-top: 2px solid #707070;
    border-left: 2px solid #707070;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    left: 2px;
    top: 3px;
  }
  .slection__sldr .left-arrow::after {
    content: '';
    width: 10px;
    height: 2px;
    background: #707070;
    position: absolute;
    left: 3px;
    top: 7px;
  }
  .slection__sldr .right-arrow::before {
    content: '';
    border-bottom: 2px solid #707070;
    border-right: 2px solid #707070;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg);
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .slection__sldr .right-arrow::after {
    content: '';
    height: 2px;
    width: 10px;
    position: absolute;
    right: 3px;
    top: 7px;
    background: #707070;
  }
  .slection__sldr .glide__bullets {
    display: inline-flex;
    justify-content: center;
    position: relative;
    top: -2px;
    margin: 0 auto;
    text-align: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .slection__sldr .glide__bullets button.glide__bullet {
    width: 6px;
    height: 6px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden !important;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .slection__sldr .glide__bullets .glide__bullet--active {
    width: 20px !important;
    border-radius: 20px !important;
  }

  .extra_news {
    margin: 0px -10px 20px;
  }
  .extra_nws_hdng_sec {
    background-color: #061836;
    padding: 0px 15px 0px;
    height: 40px;
  }
  .extra_nws_hdng_sec h4 {
    font-size: 18px;
    line-height: 18px;
    padding-top: 15px;
    color: #ffffff;
  }
  .extra_nws_container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .extra_nws_video {
    position: relative;
    width: 100%;
  }
  .extra_nws_video img {
    width: 100%;
    display: block;
  }
  .extra_nws_video .play_btons {
    background-color: transparent;
    height: 40px;
    width: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    border: 1px solid #ffffff;
  }
  .extra_nws_video .play_btons .ply_btns_icon {
    width: 0;
    position: absolute;
    height: 0;
    left: 48%;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
    top: 25%;
  }
  .movable_nws {
    position: absolute;
    display: flex;
    left: 0px;
    bottom: 20px;
    height: 80px;
  }
  .movable_nws strong {
    height: inherit;
    display: flex;
    background: #c00;
    font-size: 40px;
    line-height: 40px;
    font-weight: normal;
    color: #fff;
    width: 80px;
    justify-content: center;
    align-items: center;
  }
  .movable_nws span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: calc(100% - 80px);
    background: #000;
    box-sizing: border-box;
    padding: 0px 20px;
    line-height: 20px;
    color: #ccc;
  }

  body .tag_s {
    color: #404040;
    font-size: 16px;
    line-height: 28px;
    font-weight: bold;
    margin: 0 -15px 0px;
    padding: 0 15px 10px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  body .tag_s strong {
    //display: block;
    display: inline-block;
    margin-right: 10px;
  }

  body .tag_s a {
    color: #0076bf;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    display: inline-block;
    margin: 5px 0;
  }
  body .tag_s span {
    margin-right: 8px;
  }
  body .tag_cls {
    color: #404040;
    font-size: 15px;
    line-height: 30px;
    font-weight: bold;
    display: block;
}

  .artl_prmtedCont {
    margin-bottom: 15px;
  }
  .rhs_artl_promoted_header {
    border-bottom: none;
    margin-bottom: 10px;
  }
  .rhs_artl_promoted_header strong {
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
    color: #000;
  }
  .rhs_ob_sec {
    flex-direction: column;
  }
  .rhs_ob_sec li {
    width: 100%;
    margin-bottom: 20px;
  }
  .rhs_ob_sec li a {
    display: inline-block;
    width: 100%;
  }
  .rhs_ob_sec li a img {
    width: 100%;
    display: inline-block;
  }
  .rhs_ob_sec li a strong {
    font-size: 16px;
    line-height: 22px;
    color: #000;
    font-weight: bold;
    display: block;
  }
  .rhs_ob_sec li a span {
    font-size: 12px;
    line-height: 18px;
    color: #838383;
    font-weight: 400;
    display: block;
  }
  .recommended_by {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    line-height: 18px;
    color: #838383;
    font-weight: 400;
  }
  .recommended_by span {
    // background: url(https://widgets.outbrain.com/images/widgetIcons/ob_logo_67x12.png) no-repeat center top;
    width: 67px;
    height: 12px;
    margin-left: 5px;
  }
  a.recommended_by:after {
    content: '';
    // background-image: url(https://widgets.outbrain.com/images/widgetIcons/achoice.svg);
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
    padding-left: 5px;
    margin-left: 5px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: right center;
    border-left: 1px solid #999;
  }

  .agli_khb_r_sec {
    border-bottom: 4px solid #e1261d;
    margin-bottom: 10px;
    position: relative;
  }
  .agli_khb_r_sec .extra_nws_hdng_sec:before {
    content: '';
    border-top: 8px solid #e1261d;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    position: absolute;
    bottom: -12px;
    left: 15px;
  }
  body .agli_khb_r_sec .extra_nws_hdng_sec {
    padding: 2px 15px 0px;
    height: 40px;
  }
  body .agli_khb_r_sec .extra_nws_hdng_sec h4 {
    font-size: 16px;
    line-height: 40px;
    font-weight: bold;
    padding-top: 0px;
  }
  .adinner_fxbox {
    position: fixed !important;
    top: 0 !important;
    width: 100%;
    left: 0 !important;
    height: 100%;
    -webkit-transform: translateZ(0) !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .adinner {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    border: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    clip: rect(0, auto, auto, 0) !important;
    -webkit-clip-path: polygon(
      0px 0px,
      100% 0px,
      100% 100%,
      0px 100%
    ) !important;
    clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%) !important;
  }
  .ad_cntainer {
    height: 300px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
  }
  .outbrain_row {
    width: 100%;
    padding: 0 3px;
    min-height:120px;
  }
  .articleimg img {
    width: 100%;
    position: relative;
  }

  .articleimg h5 {
    margin: 0;
    text-align: center;
    padding: 0 15px;
    font-size: 14px;
    line-height: 21px;
    color: #5a5a5a;
    font-weight: normal;
  }
  .content_sec p img {
    width: 100%;
    height: auto;
    width: calc(100% - -30px);
    margin: 0 -15px;
  }
  p:empty {
    display: none;
  }
  .readmore {
    display: block;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    color: #e1261d;
    position: relative;
    text-align: center;
    padding: 25px 0px 0px 0px;
    margin-top: -25px;
    margin-bottom: 5px;
    background: linear-gradient(transparent, #fff, #fff);
  }
  .articleimg {
    position: relative;
    margin: 0 -15px 20px -15px;
    background: #f2f2f2;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .articleimg p {
    display: none;
  }
  .desktop-state-select {
    display: none;
  }
  .mobile-state-select {
    margin-top: 10px;
  }
  .read_more_links {
    // background-color: #f7f7f7;
    // text-align: center;
    // margin: 0 -15px;
    padding-bottom: 15px;
  }
  body .short_desc h3 {
    font-size: 15px;
    line-height: 24px;      
  }
  body .rltd_nws_hdng {
    justify-content: flex-start;
    padding-left: 15px;
  }
  .OUTBRAIN {
    margin-bottom: 20px;
  }
  body .content_sec p strong {
    font-weight: 600;
  }
  body .content_sec p a strong {
    font-weight: 600;
  }  
  .article_faq_question {
    letter-spacing: 0;
    color: #666;
    font-size: 17px;
    position: relative;
    line-height: 23px;
    font-weight: bold;
    border-left: 3px #e1261d solid;
    padding: 9px 39px;
    background: #f5f5f5 0 0 no-repeat padding-box;
    padding-right: 0;
  }
  .article_faq_question:after {
    content: 'Q.';
    position: absolute;
    left: 7px;
    top: 8px;
    color: #e1261d;
    font-size: 20px;
  }
  .article_faq_answer {
    letter-spacing: 0;
    color: #666;
    font-size: 16px;
    position: relative;
    line-height: 27px;
    font-weight: 400;
    padding: 9px 39px;
    padding-right: 0;
  }
  .article_faq_answer:before {
    border-left: 3px #666 solid;
    content: '';
    position: absolute;
    left: 0;
    height: 42px;
    top: 0;
  }
  .article_faq_answer:after {
    content: 'A.';
    position: absolute;
    left: 11px;
    top: 8px;
    color: #666;
    font-size: 20px;
  }
  .nw_webstory_embed {
    height: 450px;
    outline: none;
    border: none;
  }
  .artcl_container .content_sec ul li {
    list-style: disc;
    font-size: 18px;
    word-break: break-word;
    font-weight: normal;
    line-height: 1.5;
    margin: 0px 0px 5px 15px;
  }
  .artcl_container ol {
    padding: 0;
    margin: 0 0 30px 0;
    counter-reset: section;
  }
  .artcl_container ol li {
    list-style: none;
    position: relative;
    margin-left: 20px;
    padding: 5px;
    font-size: 20px;
    margin-bottom: 10px;
    text-transform: capitalize;
  }
  .artcl_container ol li:after {
    counter-increment: section;
    content: counter(section) '.';
    position: absolute;
    top: 4px;
    // left: -20px;
    bottom: 0;
    // width: 50px;
    margin-right: 20px;
    font-size: 80%;
    color: #fff;
    // font-size: 24px;
    font-weight: bold;
  }
  .auth_head_img {
    display: block;
    text-transform: uppercase;
    font-weight: 500;
    color: #454545;
    font-size: 13px;
    line-height: 21px;
  }
  .auth_head {
    display: inline-block;
    text-transform: uppercase;
    font-weight: 500;
    color: gray;
    margin-left: -10px;
  }
  .authr_icon img {
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    border: #d3d3d3 solid 1px;
  }
  .artclbyeline-author-intro {
    display: inline-flex;
    align-items: center;
  }

  .authr_mob_li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }
  .authr_mob_li:before {
    content: none !important;
  }
  .content_sec table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .content_sec table td {
    padding: 8px;
    vertical-align: top;
    font-size: 14px;
    border: 1px solid #eee;
    text-align: left;
  }
  .content_sec table tr:first-of-type td {
    background: #666;
    color: #fff;
    font-weight: bold;
  }
  .content_sec table {
    width: 100%;
    border-collapse: collapse;
    overflow: scroll;
    display: block;
  }
  .slidr_sec .glide__track ul li {
    list-style: none;
  }
  .artcl_contents_img {
    margin: 0 -15px;
    text-align: center;
    background: #eee;
    padding-bottom: 10px;
  }
  .artclhglght {
    background: #f5f5f5;
    border: 1px solid #e2e2e2;
    padding: 5px 18px 0px 18px;
    margin-bottom: 10px;
  }
  .artclhglght .artclhglght_hd {
    color: #e1261d;
    font-size: 16px;
    line-height: 14px;
    margin-top: 8px;
    font-weight: bold;
}
  .artclhglght div {
    padding-left: 12px;
    position: relative;
  }
  .artclhglght div:before {
    content: '';
    background: #707070;
    position: absolute;
    top: 5px;
    left: -2px;
    width: 1px;
    bottom: 10px;
}
  .artclhglght div .highbullets {
    font-size: 15px;
    color: #000000;
    line-height: 20px;
    position: relative;
    font-weight: normal;
    margin: 12px 0;
    display: block;
}
.artclhglght div .highbullets:before {
  content: '';
  width: 6px;
  height: 6px;
  border: 1px solid #707070;
  position: absolute;
  border-radius: 100%;
  top: 4px;
  left: -17px;
  background: #f5f5f5;
}
  .artclhglght div .highbullets a {
    color: #000000;
  }
  .all_states_list li {
    list-style: none !important;
  }
  .svgloader{position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 99; background: #272727;}
  .svgloader img{position: absolute;top: 50%;right: 0;bottom: 0;left: 50%;z-index: 99;width: 52px;height: 52px;margin: -26px 0 0 -26px; animation: rotate 1s linear infinite; }@keyframes rotate {from {transform: rotate(-0deg);}to {transform: rotate(-359deg);}}
  ul.art_social_share li{
    margin-left: 8px;
    justify-content: space-between;
  }
  
  .content_sec p{
      font-size: 20px;
      line-height: 32px;
  }
  .mob_container{
    border-bottom: 5px solid #d6d6d6;
  }
  .follow_us {
    border-left: #5a5a5a solid 1px;
    display: flex;
    align-items: center;
    width: 126px;
    height: 40px;
    border-radius: 50px;
    background: #f2eeee;
    border: #b2b2b2 solid 1px;
    padding: 2px 10px;
    margin: auto 0;
    justify-content: center;
}
.fl_txt {
  font: 400 13px/14px"Mukta",sans-serif;
  color: #5a5a5a;
  width: 62px;
  text-transform: none;
  margin-left: 9px;
}
.gn_icon {
  display: inline-flex;
  width: 40px;
  height: 40px;
  background: #fff url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
  background-position: -10px -374px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.ol_block{ border-bottom: 1px solid #c4c4c4;max-width: 560px;margin: 0 -15px 25px;border-left: #E1261D solid 2px;background: #F2F2F2;padding: 5px 0 0 0;counter-reset: section;}
.ol_block li{list-style: none !important;padding: 10px 0;position: relative;margin: 0 15px 0 33px !important;border-bottom: #C4C4C4 solid 1px;font: 400 18px/28px Mukta;color: #061836;}
.ol_block li:last-child{border: none;}
.ol_block li:after{counter-increment: section;content: counter(section) ".";width: 25px;height: 25px;background: #E1261D;border-radius: 0px 4px 4px 0px;flex-shrink:0;font: normal normal bold 16px/25px Mukta;color: #FFFFFF;text-align: center;position: absolute;top: 10px;left: -33px;}
.ol_block li strong, .ol_block li b{display:block} 
.ul_block{ border-bottom: 1px solid #c4c4c4;max-width: 560px;margin: 0 -15px 25px;background: #F2F2F2;padding: 5px 0 0 0;}
.ul_block li{list-style:none !important;padding: 10px 0 10px 18px;margin: 0 15px !important;border-bottom: #C4C4C4 solid 1px;position: relative;}
.ul_block li:before{content: '';width: 8px;height: 8px;background: #E1261D;border-radius: 10px;position: absolute;left: 0px;top: 17px;}
.ul_block li:last-child{border: none;}

.post_info{display: flex;margin-bottom: 0px;border-top: #939393 dotted 1px;padding-top: 0px;flex-direction: column;}
.post_info img{vertical-align: top;}
.post_info .ps_col{flex: 1;display: flex;align-items: center;padding: 10px 0;}
// .post_info .ps_col:last-child{border-top: #939393 dotted 1px;}
.post_info .authr_mob_li{margin: 0 !important;}
.post_date{font: 400 13px/21px Mukta;color: #949494;position: relative;padding-left: 10px;}
.post_date:before{content: '.';font-size:30px;color: #454545;position: absolute;top: -7px;left: 0;}
.post_date span{color: #454545;font-weight: bold;}
.post_info .auth_head{font: 400 12px/14px Mukta;color: #454545;text-transform: uppercase;}  
#newbyelineAuthordefault {
margin-top: 3px;
}
.ul_block li:last-child,
.ol_block li:last-child{border:none;}
// .ul_block p,
//   .ol_block p{display:none;}
  .ul_block li:last-of-type,
  .ol_block li:last-of-type{border:none}
  .ob-smartfeed-wrapper.feedIdx-0 {
    //margin-bottom: -30px !important;
  }
  .slction_section {
    width: 100%;
    display: flex;
    overflow: scroll;
    padding-bottom: 5px;
  }
  .slidr_sec {
    margin: 0px -15px 20px;
    background-color: #f2f2f2;
    padding: 10px 0;
    border-bottom: 3px solid #061836;
  }

  .slction_section a figure {
    width: 200px;
    overflow: hidden;
    height: 133px;
  }
  .slction_section a p {
    margin-bottom: 0px;
    color: #061836;
    font-size: 16px;
    background: #ffffff;
    line-height: 1.5;
    padding: 8px;
    font-weight: bold;
    text-align: left;
    overflow: hidden;
    margin: 0;
  }

  .slction_section a figure img {
    width: 100%;
    display: block;
  }
  .slction_section > a {
    width: 200px;
    box-shadow: 0px 2px 4px #00000029;
    margin-left: 10px;
    background: #ffff;
    flex-shrink: 0;
    margin-left:12px;
  }
  .last_div{
    min-width: 94%;
    min-height: 100%;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    box-shadow: 0px 2px 4px #00000029;
    background:#242424;
    margin:0 15px
 }

.last_div .custom_cl_S{margin: 7px 0;}
.all_states_list.show_all_stats_cities li{margin-left: 0 !important;}
.all_states_list.show_all_stats_cities{height: 98px;}
@media (max-width:375px){
  .last_div{min-width: 92%;}
}
.custom_cl_S{width:220px}

.all_states_list.show_all_stats_cities{
    height: 100px;
}
.all_states_list{
    box-shadow: unset;
    top: 28px;
    left: -1px;
    right: -1px;
    border-top: none;
    border-radius: 0 0 6px 6px;
    padding-top: 2px;
}
.all_states_list li a{
    padding: 0px 5px 0 8px;
}
.last_div .custom_cl_S{
    margin: 10px 0;
}
.whatsapp_fxd {
  position: fixed;
  right: 0px;
  top: 50%;
  z-index: 111;
  border: 1px solid#fff;
  -webkit-border-radius: 6px 0px 0px 6px;
  -moz-border-radius: 6px 0px 0px 6px;
  border-radius: 6px 0px 0px 6px;
  border-right: 0;
  box-shadow: 0px 3px 6px#0006;
}
  
ul.art_social_share li a .spriteshare {
  border-radius: 50%;
}
.artcl_byline_sec .artcl_byeline li time {
  font-size: 13px;
  line-height: 21px;
  color: #949494;
}
 .artcl_byline_sec .artcl_byeline li a img {
  width: 14px;
  height: 14px;
}
.artcl_byline_sec .artcl_byeline li > a {width: 14px;  height: 14px; margin-right:8px;}
.slection__sldr .custom_artcl_sldr {
  display: flex;
  width: 100%;
  padding: 15px 15px 0px 15px;
}
 
.artclbyeline-author-intro:before {
  margin: 0 9px;
}
span.read {
  position: relative;
  display: block;
  position: absolute;
  bottom: 18px;
  right: -6px;
}
.read::after {
  position: absolute;
  content: "";
  width: 6px;
  height: 6px;
  right: -2px;
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  z-index: 111;
  border: solid #000;
  border-width: 0 2px 2px 0;
} 
span.read.expand:after { -ms-transform: rotate(45deg); transform: rotate(45deg); } span.read.collapsed:after { transform: rotate(-135deg); }
.spriteshare.art-whatsapp-icon {
  background-position: -9px -113px;
  border: 1px solid#fff;
  border-radius: 6px 0px 0px 6px;
}
.full_desc_h3{
  height : 70px;
}
.content_sec p iframe {
  height: 203px;
}

.small p {
  font-size:18px; line-height:30px;
}
.medium p {
  font-size:20px; line-height:32px;
}
.large p {
  font-size:24px; line-height:34px;
}
.titlwrap li:before {
  content: "";display:none;
}
.titlwrap li{margin: 0 !important;}
`;
