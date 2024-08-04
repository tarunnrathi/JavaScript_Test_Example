import css from 'styled-jsx/css';

export default css.global `
  b.amp-next-page-separator {
    background-color: red;
    height: 5px;
  }        
  .article_section {
    overflow: hidden;
  }
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  body {
    font-size: 100%;
    font-family: 'Mukta';
    font-weight: 400;
    margin: auto;
  }
  header,
  footer,
  nav,
  section,
  article,
  aside,
  figure {
    display: block;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  header,
  footer,
  nav,
  article,
  aside,
  figure,
  figcaption {
    margin: 0px;
    padding: 0;
  }
  // li {
  //   list-style: none;
  // }
  a {
    text-decoration: none;
  }
  a img {
    border: none;
  }
  .clearfix {
    clear: both;
  }
  .clearfix:after,
  .clearfix:before {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }

  /* ******************** page css below ********************** */
  .hide_content{
    display:none;
  }
 
  .mr_cnt {
    background: transparent linear-gradient(transparent,#fff)
    position: absolute;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 10px;
    height: 190px;
}
.mr_cnt a {
    background: #d03b2c 0 0 no-repeat padding-box;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
    border: 1px solid #fff;
    border-radius: 28px;
    letter-spacing: 0;
    color: #fff;
    width: 160px;
    height: 56px;
    display: block;
    font-size: 16px;
    font-weight: bold;
    line-height: 56px;
}
.mr_cnt a:after{
  content: "";
    width: 14px;
    height: 10px;
    top: -2px;
    position: relative;
    left: 10px;
    background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newdnarrow_1669295755.png) 0 0 no-repeat;    
    display: inline-block;
}
  .c_sec{
    height: 1000px;
    overflow: hidden;
    padding-bottom: 50px;
    position: relative;

  }
  .mob_container {
    padding: 5px 15px;
    box-sizing: border-box;
    position:relative;
    border-bottom: 5px solid #d6d6d6;
  }
  
  h1.art_h1 {
    font-size: 24px;
    line-height: 32px;
    color: #001D42;
    font-family: 'Mukta';
    font-weight: bold;
    padding: 10px 0px 0px;
    min-height: 111px;
}
  .artcl_cnt {
    position: relative;
  }
  .article_img {
    text-align: center;
  }
  div.loader-player + div,
  .pubstack-video-js {
    height: 240px;
  }

  .article_img_dis {
    color: #5a5a5a;
    font-size: 14px;
    line-height: 21px;
    font-family: 'Mukta';
    font-weight: 400;
    text-align: left;
    padding: 5px 15px;
    background-color: #f2f2f2;
  }
  .article_img_inner > div {
    height: 240px;
  }
  .article_img_inner img {
    width: 100%;
    display: block;
  }

  .article_img_inner span img{
   height:100%;
  }
  .short_desc {
    border-bottom: 0px;
    padding-top: 0;
    margin-bottom: 5px;
    position: relative;
    display: block;
}
  .short_desc h3 {
    font-size: 15px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 700;
    text-align: justify;
    padding-right: 15px;
    height:70px;
  }
  .f_d_h3 ~ button {
    display: none;
  }
  .social_share_sec {
    margin-bottom: 15px;
  }
  ul.art_social_share {
    font-family: 'Mukta';
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top:20px;
  }
  ul.art_social_share li {
    color: #6b6b6b;
    font-size: 14px;
    margin-left: 15px;
    text-transform: uppercase;
    line-height: 0;
    margin-left: 8px;
  }
  ul.art_social_share li:first-child {
    margin-left: 0px;
  }
  .spriteshare {
    background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
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
  .spriteshare.art-whatsapp-icon {
    background-position: -9px -113px;
  }
  .spriteshare.art-telegram-icon {
    background-position: -226px -4px;
  }
  .spriteshare.art-email-icon {
    background-position: -9px -162px;
  }
  .add_secton,
  .middlead,
  .ad_cntainer,
  .ad-cnt {
    margin: 0px -15px 10px -15px;
    padding: 10px 0px;
    text-align: center;
    display: flex;
    overflow: hidden;
    background: #f5f5f5;
    justify-content: center;
    align-items: center;
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
    font-family: 'Mukta';
    padding-top: 2px;
    display: block;
    width: 100%;
    background: #fff;
  }
  .add_sec img {
    width: 100%;
    display: block;
  }

  .a_bl_s {
    margin-bottom: 20px;
  }
  .a_bl_s .a_bln {
    font-family: 'Mukta';
    border-bottom: 1px dotted #939393;
    list-style: none;
    margin: 0;
    font-size: 13px;
    padding-bottom: 2px;
  }
  .a_bl_s .a_bln li {
    position: relative;
    text-transform: uppercase;
    font-size: 13px;
    padding: 3px 0 3px 10px;
    font-weight: normal;
    line-height: 1.4;
    color: #949494;
  }
  .a_bl_s .a_bln li:before {
    content: '';
    background: #454545;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    position: absolute;
    top: 10px;
    left: 0;
  }
  .a_bl_s .a_bln li:first-child:before {
    background: #e1261d;
  }

  .a_bl_s .a_bln li span a {
    color: #e1261d;
    text-decoration: none;
    position: relative;
    font-weight: bold;
  }
  .a_bl_s .a_bln li b {
    font-weight: bold;
    color: #454545;
  }

  .content_sec {
    font-family: 'Eczar',serif;
  }
  .content_sec p,
  .r_m_l {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 32px;
    color: #000;
    font-weight: 400;
    font-family: "Mukta";
  }

  .content_sec p a,
  .r_m_l a {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    color: #e1261d;
    font-family: Mukta;
  }

  .rltn {
    background: #3e3e3e;
    margin: 20px 0px 20px;
  }
  .rltn .rltnsls {
    padding: 15px 0;
  }
  .rltn .rltnsls a {
    background: #1a1a1a;
    color: #fff;
    border: 1px solid #9b9b9b;
  }
  .rltn .rltnsls a p {
    background: #1a1a1a;
    color: #fff;
  }

  .rlthd {
    font-size: 18px;
    justify-content: center;
    line-height: 36px;
    height: 36px;
    color: #fff;
    font-weight: bold;
    font-family: 'Mukta';
    background-color: #e1261d;
    text-align: left;
    padding-left: 15px;
  }
  .rltd_lists_sldr {
    display: flex;
    padding: 15px;
  }
  .rltd_lists_sldr li {
    border: 1px solid #9b9b9b;
    width: 173px;
  }
  .rltd_lists_sldr_img {
    width: 171px;
    overflow: hidden;
  }
  .rltd_lists_sldr_img img {
    width: 100%;
    display: block;
  }
  .rltd_lists_sldr li:last-child {
    margin-right: 0px;
  }

  .related_nws_slidr {
    width: 100%;
    overflow: hidden;
  }
  .related_nws_slidr .glide__bullets {
    display: inline-flex;
    justify-content: center;
    position: relative;
    top: -8px;
    margin: 0 auto;
    text-align: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .related_nws_slidr .glide__bullets button.glide__bullet {
    width: 8px;
    height: 8px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .related_nws_slidr .glide_arroe_buttons {
    position: relative;
    top: 13px;
    display: flex;
    justify-content: space-between;
    padding: 0px 70px;
  }
  .authr_icon img{
    border: #d3d3d3 solid 1px;
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
  .rtpvd{margin: 20px 0}
  .rtpvdh{background:#E1261D; height: 34px; line-height: 38px; font-weight: bold; color: #fff; font-size: 20px; padding: 0 25px;}
  .rtpvdsld{position: relative; background: #1C1C1C; padding: 20px 0 2px 0}
  .rtpvdsld .rtpvdsldin{overflow: hidden;width: 600px;margin: auto;}
  .rtpvdsld ul{display: flex; overflow-x: auto;}
  .rtpvdsld ul li{flex-shrink: 0; width:250px; border: 1px solid #9b9b9b; margin:10px;}  
  .rtpvdsld ul li a figure{ width: 600px;height: 338px; position: relative; }
  .rtpvdsld ul li a figure:before{content: "";background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/video_icon_1681135696.svg) 0 0 no-repeat;width: 67px;height: 67px;position: absolute;top: 50%;left: 50%;margin: -34px 0 0 -34px;}
  .rtpvdsld ul li a figure img{width: 600px;height: 338px;}   
  .rtpvdsld ul li a figcaption{padding:10px 0; font-size: 18px; font-weight: bold; line-height: 28px; color: #fff;width: 600px;}
  .rtpvdsld ul li a figcaption span{color: #989898; line-height: 18px; font-size: 10px;display: block; margin-bottom: 10px;}
  .rtpvdar{}
  .rtpvdar button{width: 20px;height: 20px;position: absolute;top: 40%;left: 25px;border: none;background: none;outline: none;border-left: 4px solid #fff;border-top: 4px solid #fff;transform:rotate(-45deg);cursor: pointer;}
  .rtpvdar button:last-child{left: auto; right: 25px;transform: rotate(135deg);}	
  .rtpvdbt{display: flex;gap: 2px;margin: 0 2px;}
  .rtpvdbt button{ border: none;background: none;outline: none; width: 100%; height: 6px; background: #484848;}
  .rtpvdbt button.glide__bullet--active{background: #E1261D;}
  
  @media screen and (max-width: 650px){
  .rtpvdh {font-size: 18px;padding: 0 10px;} 
  .rtpvdsld {padding: 15px 10px 2px 10px;} 
  .rtpvdsld .rtpvdsldin {width: 100%;} 
  .rtpvdsld ul li a figure, .rtpvdsld ul li a figure img{width: 100%;height: 190px;}
  .rtpvdsld ul li a figure:before{display: none;}
  .rtpvdsld ul li a figcaption {font-size: 16px;
    line-height: 1.5;
    padding: 8px;
    font-weight: 700;
    font-family: Mukta;
    text-align: left;
    overflow: hidden;
    width:240px;
    margin: 0;}
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
    background: #e1261d;
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
    font-family: 'Mukta';
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
    font-family: 'Mukta';
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
    background: #f1f1f1;
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
    font-family: 'Mukta';
    font-weight: 400;
    color: #ffffff;
  }
  p.duration_play strong {
    font-size: 13px;
    line-height: 20px;
    font-family: 'Mukta';
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
    font-family: 'Mukta';
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
    width: 8px;
    height: 8px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
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
    margin: 0 -15px 20px;
    background-color: #000000;
    padding: 20px 0px;
  }
  .contnt_img img {
    display: block;
    width: 100%;
  }
  .contnt_img iframe {
    width: 100%;
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

  .rltnsls {
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

  .rltnsls a figure {
    width: 200px;
    overflow: hidden;
    height: 133px;
  }
  .rltnsls a p {
    margin-bottom: 0px;
    color: #061836;
    font-size: 16px;
    background: #ffffff;
    line-height: 1.5;
    padding: 8px;
    font-weight: bold;
    font-family: 'Mukta';
    text-align: left;
    overflow: hidden;
    margin: 0;
  }

  .rltnsls a figure img {
    width: 100%;
    display: block;
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
    font-family: 'Mukta';
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
    font-family: 'Noto Sans', devanagari;
    font-weight: 400;
  }
  .select_hd_ing {
    color: #061836;
    font-size: 14px;
    line-height: 30px;
    font-family: 'Mukta';
    font-weight: bold;
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding-left: 23px;
    padding-top: 2px;
  }
  span.select_hd_ing:before {
    content: url(/images/siteimages/pinicon_1607493634.png);
    position: absolute;
    left: 5px;
    top: 5px;
    width: 18px;
    height: 18px;
  }

  .hide {
    display: none;
  }
  .all_states_list,
  .hide {
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
  .all_states_list li a {
    font-size: 14px;
    line-height: 30px;
    font-family: 'Mukta';
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
    width: 8px;
    height: 8px;
    background: #bababa;
    display: block;
    margin-right: 8px;
    border-radius: 50%;
    overflow: hidden;
    outline: none;
    border: none;
    cursor: pointer;
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
    font-family: 'Mukta';
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
    font-family: 'Mukta';
  }

  body .tag_s {
    color: #404040;
    font-size: 13px;
    font-family: 'Mukta';
    line-height: 28px;
    font-weight: 700;
    margin: 0 -15px;
    padding: 0 15px 10px;
    overflow-x: auto;
    white-space: nowrap;
  }
  body .tag_s strong {
    display: block;
  }
  body .tag_s a {
    color: #0076bf;}
  body .tag_s span {
    margin-right: 8px;}
  body .tag_cls {
    color: #404040;
    font-size: 15px;
    font-family: 'Mukta';
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
    font-family: 'Mukta';
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
    font-family: 'Mukta';
    font-weight: bold;
    display: block;
  }
  .rhs_ob_sec li a span {
    font-size: 12px;
    line-height: 18px;
    color: #838383;
    font-family: 'Mukta';
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
    font-family: 'Mukta';
    font-weight: 400;
  }
  .recommended_by span {
    background: url(https://widgets.outbrain.com/images/widgetIcons/ob_logo_67x12.png)
      no-repeat center top;
    width: 67px;
    height: 12px;
    margin-left: 5px;
  }
  a.recommended_by:after {
    content: '';
    background-image: url(https://widgets.outbrain.com/images/widgetIcons/achoice.svg);
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
    margin-bottom: 25px;
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
    font-family: 'Mukta';
    font-weight: bold;
    padding-top: 0px;
  }
  .adinner_fxbox {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .adinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    clip: rect(0, auto, auto, 0);
    clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
  }
  .ad_cntainer {
    height: 300px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .outbrain_row {
    width: 100%;
    padding: 0 3px;
    min-height: 120px;
  }
  .articleimg img {
    width: 100%;
    position: relative;
  }

  .articleimg h5 {
    margin: 10px 0 0;
    text-align: center;
    padding: 0 15px;
    font-size: 14px;
    line-height: 21px;
    color: #5a5a5a;
    font-weight: normal;
  }
  .content_sec p amp-img {
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
    font-family: 'Mukta';
    font-weight: bold;
    color: #e1261d;
    position: relative;
    text-align: center;
    padding: 25px 0px 0px 0px;
    margin-top: -25px;
    margin-bottom: 5px;
    background: linear-gradient(transparent, #fff, #fff);
    outline: none;
    border: none;
    width: 100%;
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
  .slection_sldr {
    height: 250px;
    overflow: hidden;
    padding-top: 10px;
  }

  .artcl_sldr .custom_artcl_sldr li {
    background-color: #f2f2f2;
    padding-bottom: 30px;
  }

  .artcl_sldr .custom_artcl_sldr li figure img {
    width: 100%;
    display: block;
  }
  .slection__sldr a p {
    margin: 0;
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    font-family: 'Mukta';
    color: #061836;
    text-align: left;
    background-color: #fff;
    padding: 0 10px 15px;
    white-space: break-spaces;
    height: 125px;
    font-weight: bold;
  }
  .slection__sldr figure,
  .slection__sldr a {
    width: 171px;
    overflow: hidden;
    box-shadow: 0px 2px 4px #00000029;
    border: 1px solid #fff;
  }
  .selecton_sec {
    margin-top: 10px;
  }
  .embdglr {
    text-align: center;
    // height: 455px;
  }
  .embdglr amp-iframe {
    min-height: 203px;
    max-height: 455px;
    display: block;
    min-width: 100%;
  }
  
  .ambdytb {
    margin: 0 -15px 20px;
  }
  
  body .rlthd {
    justify-content: flex-start;
    padding-left: 15px;
  }
  body .content_sec p strong {
    font-weight: 600;
  }
  body .content_sec p a strong {
    font-weight: 600;
  }
  body p.r_m_l {
    font-family: 'Mukta';
  }
  .auth_head_img {
    display: block;
    text-transform: uppercase;
    font-weight: 500;
    color:#454545;
  }
  .auth_head {
    display: inline-block;
    text-transform: uppercase;
    font-weight: 500;
    color: gray;
  }
  .authr_icon amp-img {
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .art-at-it {
    display: flex;
    align-items: center;
  }

  .authr_mob_li {
    display: flex;
    margin-left: -10px;
  }
  .a_bl_s .a_bln .authr_mob_li:before {
    content: none;
  }
  .content_sec table {
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Eczar',serif;
  }
  .content_sec table td {
    padding: 8px;
    vertical-align: top;
    font-size: 20px;
    line-height: 32px;
    border: 1px solid #eee;
    text-align: left;
    font-family: 'Eczar',serif;
  }
  .content_sec table td p{
    line-height: 9px;
  }
  .content_sec table td h2{
    padding-top: 10px;
    color: white;
    text-align: center;
    font-size: 21px;
  }
  .content_sec table tr:first-of-type td {
    background: #666;
    color: #fff;
    font-weight: 700;
  }
  .content_sec table {
    width: 100%;
    border-collapse: collapse;
    overflow: scroll;
    display: block;
  }
  p:empty {
    display: none;
  }
  .arthg {
    background: #f5f5f5;
    border: 1px solid #e2e2e2;
    padding: 5px 18px 0px 18px;
    margin-bottom: 10px;
    font-family: 'Mukta';
  }
  .arthg .artclhglght_hd {
    color: #e1261d;
    font-size: 16px;
    line-height: 14px;
    margin-top: 8px;
    font-family: 'Mukta';    
    font-weight: bold;
}
  .arthg div {
    padding-left: 12px;
    position: relative;
  }
  .arthg div:before {
    content: '';
    background: #707070;
    position: absolute;
    top: 5px;
    left: -2px;
    width: 1px;
    bottom: 10px;
}
  .arthg div .highbullets {
    font-size: 15px;
    color: #000000;
    line-height: 20px;
    position: relative;
    font-weight: normal;
    margin: 12px 0;
    font-family: 'Mukta';
    display: block;
}
.arthg div .highbullets:before {
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
  .arthg div .highbullets a {
    color: #000000;
  }
  .ol_block{max-width: 560px;margin: 0 -15px 25px;border-left: #E1261D solid 2px;background: #F2F2F2;padding: 5px 0 0 0;counter-reset: section;}
  .ol_block li{list-style: none ;padding: 10px 0;position: relative;margin: 0 15px 0 33px ;border-bottom: #C4C4C4 solid 1px;font: 400 18px/28px Mukta;color: #061836;}
  .ol_block li:last-child{border: none;}
  .ol_block li:after{counter-increment: section;content: counter(section) ".";width: 25px;height: 25px;background: #E1261D;border-radius: 0px 4px 4px 0px;flex-shrink:0;font: normal normal bold 16px/25px Mukta;color: #FFFFFF;text-align: center;position: absolute;top: 10px;left: -33px;}
  .ol_block li strong, .ol_block li b{display:block}
  .ul_block{max-width: 560px;margin: 0 -15px 25px;background: #F2F2F2;padding: 5px 0 0 0;}
.ul_block li{list-style:none ;padding: 10px 0 10px 18px;margin: 0 15px ;border-bottom: #C4C4C4 solid 1px;position: relative;}
.ul_block li:before{content: '';width: 8px;height: 8px;background: #E1261D;border-radius: 10px;position: absolute;left: 0px;top: 17px;}
.ul_block li:last-child{border: none;}
  .rltnsls a {
    width: 200px;
    box-shadow: 0px 2px 4px #00000029;
    margin-left: 10px;
    background: #ffff;
    flex-shrink: 0;
    margin-left:12px;
  }
  .last_div{
    min-width: 330px;
    min-height: 100%;
     
    flex-direction: column;
     
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    box-shadow: 0px 2px 4px #00000029;
    background:#242424;
    margin:0 15px
 }
.last_div .custom_cl_S{margin: 7px 0;}
.dfwb{height: 470px; position: relative; width:330px; background: #fff;border: 1px solid #707070; margin: 10px auto;overflow: hidden}
  .dfwbdt{width: 310px;height: 450px;position: relative;margin:10px auto;overflow: hidden}
  .dfwbdt amp-img{height: 100%;position: static;}
  .dfwb .dfwbdt amp-img img {position: static;}
  .dfwbdthd{position: absolute;bottom: 0;left: 0;right: 0;padding: 150px 15px 15px 15px;text-align: center;color: #fff;font-size: 20px;line-height: 26px;background: linear-gradient(transparent, #000);font-weight: bold;}
  .dfwbdthd button{color: #fff; font-weight: bold;background: #FE001A 0% 0% no-repeat padding-box;border: 1px solid #FFFFFF;border-radius: 14px;width: 145px;display: block;height: 28px;line-height: 27px;font-size: 14px;margin: 10px auto;}
  .dfwbdthd em{background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/webstrticn_1653380813.png) 0 0 no-repeat;width: 52px;height: 52px;display: block;margin: 15px auto;}
  .svgloader-frame {
    background: #000;
    position: relative;
    height: 470px;
    width: 300px;
    margin: 0 auto;
  }
 .dfwb ~ amp-iframe {
    max-height: 470px;
    max-width: 300px;
    margin: 0 auto;
  }
.content_sec .svgloader-frame amp-img {
    position: absolute;
    top: 33%;
    right: 0;
    bottom: 0;
    left:  37%;
    width: 100px;
    height: 100px;
    animation: rotate 0.8s linear infinite;
    border: none;
    margin: unset;
    padding: unset;
    box-shadow: none;
  }

  @keyframes rotate {
    from {
      transform: rotate(-0deg);
    }
    to {
      transform: rotate(-359deg);
    }
  }
   .rltn .rltnsls {overflow-x: scroll;height: 300px; overflow-y:hidden;}
 .ps_inf{display: flex;margin-bottom: 20px;border-top: #939393 dotted 1px;padding-top: 6px;flex-direction: column;}
.ps_inf img{vertical-align: top;}
.ps_inf .ps_col{flex: 1;display: flex;align-items: center;padding: 10px 0;}
.ps_inf .authr_mob_li{margin: 0;}
.ps_dt{font: 400 13px/21px Mukta;color: #949494;position: relative;padding-left: 10px;}
.ps_dt:before{content: '.';font-size:30px;color: #454545;position: absolute;top: -7px;left: 0;}
.ps_dt span{color: #454545;font-weight: bold;}
.ps_inf .auth_head{font: 400 12px/14px Mukta;color: #454545;text-transform: uppercase;}
#newbyelineAuthordefault {
margin-top: 3px;
}
.ul_block p,
  .ul_block li:last-of-type,
  .ol_block li:last-of-type{border:none}

  #AmpYoutubeEmbed{
    height: 265px;
    overflow: hidden;
  }
  .content_sec p a {
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  color: #e1261d;
  font-family: 'Mukta';
  border-bottom: 1px dotted;
}
.wtsap_fxd {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 111;
  border-radius: 6px 0 0 6px;
  border-right: 0;
  display: none;
}
.wtsap_fxd .amp-social-share-whatsapp {
  box-shadow: 0 3px 6px#0006;
  border: 1px solid#fff;
  border-radius: 6px 0 0 6px;
}
span.read {
  position: relative;
  display: block;
  position: absolute;
  bottom: 8px;
  right: -4px;
  background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/darmorecnt_1669701364.png) 0 0 no-repeat;
  width: 13px;
  height: 8px;
}
ul.art_social_share li amp-social-share {
  border-radius: 50%;
}
blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
}
blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  display: inline;
}
.artic-story ol {
  list-style-type: decimal;
  margin: 1em 0;
  padding-left: 20px;
}
.artic-story ol li {
  list-style-type: decimal;
  font-size: 18px;
  word-break: break-word;
  font-weight: normal;
  line-height: 1.5;
  font-family: "Mukta",serif;
}
.artic-story ul {
  list-style-type: disc;
  margin: 1em 0;
  padding-left: 20px;
  position: relative;
}
.artic-story ul li {
  //list-style-type: disc;
  font-size: 18px;
  word-break: break-word;
  font-weight: normal;
  line-height: 1.5;
  font-family: "Mukta",serif;
}
.dfwb {
  min-height: 470px;
}
`;
