import css from 'styled-jsx/css';

export default css.global `

  body .artclbyeline a.readmore {
      display: inline-block;
      padding-left: 0px;
      margin: 0px 0px 5px;
      left: 50%;
      transform: translateX(-50%);
      background: none;
  }
    .seconadaryheading {
      overflow: hidden;
    }    
    .article_section {
      width: 100%;
      background: #f5f5f5;
      overflow: hidden;
    }
    .container {
      margin: auto;
    }
    .article_section .container, .budget_container .container {
      background: #fff;
      overflow: hidden;
      padding: 0 20px 10px;
      max-width: 1284px;
    }
    // .budget_container {
    //   margin-bottom: 0 !important;
    //   position: initial !important;
    //   background: #f5f5f5 !important;
    // }
    // .sub_navigation {
    //   margin-bottom: 0 !important;
    //   position: relative;
    //   z-index: 1;
    // }
    .artcl_container {
      display: flex;
      justify-content: space-between;
      padding-top:10px;
    }
    .artcl_container .artcl_lft {
      width: calc(100% - 320px);
    }
    .artcl_container .artcl_rght {
      width: 300px;
    }

    .artcl_lft h1 {
      font-size: 36px;
      line-height: 44px;
      color: #001d42;      
      font-weight: bold;
    }
    .artcl_contents {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding: 10px;
      background: #f7f7f7;
    }
    
    .artcl_contents_img img {
      width: 100%;
    }
    .article_content_row {
      width: calc(100% - 560px);
      padding-right: 10px;
    }
    .artclbyeline {
      width: 100%;
    }
    .seconadaryheading {
      margin-bottom: 5px;
      font-size: 17px;
      line-height: 28px;
      color: #404040;
      font-weight: bold;
      margin-top: -2px;
      text-align: left;
    }
    .artclbyeline-agency {
      
      border-bottom: 1px dotted #939393;
      border-top: 1px dotted #939393;
      padding: 3px 0 3px 0;
      list-style: none;
      margin: 0;
      font-size: 13px;
      margin-right: 10px;
    }
    .artclbyeline-agency li {
      position: relative;
      color: #949494;
      text-transform: uppercase;
      font-size: 13px;
      padding: 3px 0 3px 10px;
      font-weight: normal;
      line-height: 1.4;
    }
    .artclbyeline-agency li a {
      color: #e1261d;
      -webkit-text-decoration: none;
      text-decoration: none;
      position: relative;
      font-weight: bold;
    }

    .artclbyeline-share li:first-child {
      margin-left: 0;
    }
    .artclbyeline-agency li:before {
      content: "";
      background: #858585;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      position: absolute;
      top: 10px;
      left: 0;
    }
    .artclbyeline-share li:first-child:before {
      background: #e1261d;
    }
    .artclbyeline-share {
      
      display: flex;
      align-items: center;
      list-style: none;
      width: 100%;
      text-align: left;
      padding: 12px 0;
      border-bottom: 1px dotted #939393;
      margin-top: 0px;
    }
    .artclbyeline-agency li b {
      font-weight: bold;
      color: #454545;
    }
    .artclbyeline-share li {
      color: #6b6b6b;
      font-size: 14px;
      margin-left: 10px;
      text-transform: uppercase;
      line-height: 0;
      background-color: #ccc;
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

    .artclbyeline-author {
      display: flex;
      flex-direction: column;
    }
    .artclbyeline-author li {
      font-size: 12px;
      color: #949494;
      font-weight: bold;
      margin-top: 5px;
      display: flex;
      align-items: center;
      -webkit-box-align: center;
      line-height: 16px;
    }
    .article_title {
      font-size: 15px;
      line-height: 21px;
      
      color: rgb(238, 238, 238);
      padding: 10px 10px 5px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      z-index:1;
      width: 100%;
      box-sizing: border-box;
      // background: rgba(0, 0, 0, 0.8);
      background: transparent linear-gradient(180deg, #00000024 0%, #000000 100%) 0% 0% no-repeat padding-box;
    }
    .authr_icon {
      height: 52px;
      width: 52px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      border: #d3d3d3 solid 1px;
    }
    .authr_icon img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .artclbyeline-author-intro a span {
      font-size: 15px;
      line-height: 14px;
      color: #e1261d;
      font-weight: bold;
      
    }

    .khbren_section {
      display: flex;
      justify-content: end;
      border-bottom: 1px solid #c4c4c4;
      margin-bottom: 25px;
    }
    .khbren_section .khbr_lft_sec {
      width: 176px;
      background: #3e3e3e;
      flex-shrink: 0;
      overflow: hidden;
      margin-right: 24px;
      height: max-content;
    }
    .khbr_hdng {
      width: 176px;
      font-size: 20px;
      justify-content: center;
      line-height: 21px;
      padding-top: 7px;
      padding-bottom: 2px;
      color: #fff;
      font-weight: bold;
      
      background-color: #e1261d;
      display: flex;
      align-items: center;
    }
    .khbr_lists {
      width: 156px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
    }
    .khbr_lists li {
      margin-bottom: 15px;
      border-bottom: 1px dotted #ffffff;
      padding-bottom: 10px;
    }
    .khbr_lists li:first-child {
      margin-top: 15px;
    }
    .khbr_lists_img {
      width: 156px;
      max-height: 111px;
      overflow: hidden;
      border: 1px solid #9b9b9b;
      border-radius: 4px;
    }
    .khbr_lists_img img {
      width: 100%;
      display: block;
    }
    .khbr_lists p {
      color: #fff;
      font-size: 15px;
      line-height: 1.5;
      font-weight: bold;
      
      padding-top: 12px;
    }
    .wp-caption, .wp-caption.alignnone {
      width : auto !important;
    }
    .wp-caption img, .wp-caption.alignnone img, .feed_inner .feed_cont img, .feed_inner .feed_cont p img {
      width: 100%;
      height: auto;
    }
    .khbr_rght_sec{
      width:724px;
    }
    .khbr_rght_sec p {
      margin-bottom: 25px;
      font-size: 20px;
      line-height: 32px;
      color: #000;
    }
    .khbr_rght_sec p a {
      font-weight: bold;
      line-height: 26px;
      color: #e1261d;
      display: inline-block;
      font-size: 20px;
      border-bottom: 1px dotted;
    }
    .artcl_slder_section {
      width: 560px;
      border: 1px solid #cecece;
      display: block;
      margin: 0 auto 25px;
      box-shadow: 0px 3px 6px #00000029;
    }
    .custom_artcl_sldr li figure {
      max-height: 360px;
      overflow: hidden;
    }
    .custom_artcl_sldr li {
      position: relative;
    }
    .custom_artcl_sldr li p {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin-bottom: 0px;
      font-size: 15px;
      line-height: 21px;
      font-weight: bold;
      
      color: #ffffff;
      text-align: center;
      background: linear-gradient(transparent, rgb(0, 0, 0));
      padding: 50px 13px 10px;
    }
    .slection__sldr ul li figure {
      width: 220px;
      height: 147px;
      overflow: hidden;
      position: relative;
    }
    .slection__sldr ul li figure img {
      width: 100%;
    }

    .slection_sldr .glide__track {
      padding: 0 !important;
    }

    .slidr_sec {
      margin-bottom: 25px;
    }
    body .custm_slecton li {
      box-shadow: 0px 2px 4px #00000029;
      width: 220px !important;
      background: #fff;
      border: 1px solid #fff;
      list-style: none;
    }

    .artcl_sldr {
      overflow: hidden;
      margin: 10px;
    }
    .custom_artcl_sldr {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .glide__bullets {
      display: inline-flex;
      justify-content: center;
      position: relative;
      top: 4px;
      margin: 0 auto;
      text-align: center;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
    }
    .glide__bullets button.glide__bullet {
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
    .glide__bullets .glide__bullet--active {
      background: #e1261d !important;
      width: 20px !important;
      border-radius: 5px !important;
    }
    .glide_arroe_buttons {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0px 170px;
    }
    .artcl_sldr .left-arrow,
    .artcl_sldr .right-arrow {
      width: 10px;
      height: 15px;
      transform: translate(0, -50%);
    }
    .artcl_sldr .left-arrow::before {
      content: "";
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
      content: "";
      width: 10px;
      height: 2px;
      background: #707070;
      position: absolute;
      left: 3px;
      top: 7px;
    }
    .artcl_sldr .right-arrow::before {
      content: "";
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
      content: "";
      height: 2px;
      width: 10px;
      position: absolute;
      right: 3px;
      top: 7px;
      background: #707070;
    }

    .slection__sldr {
      overflow: hidden;
    }
    .slection__sldr .glide_arroe_buttons {
      padding: 0px 255px;
    }
    .slection__sldr .left-arrow,
    .slection__sldr .right-arrow {
      width: 15px;
      height: 15px;
      transform: translate(0, -50%);
    }
    .slection__sldr .left-arrow::before {
      content: "";
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
      content: "";
      width: 10px;
      height: 2px;
      background: #707070;
      position: absolute;
      left: 3px;
      top: 7px;
    }
    .slection__sldr .right-arrow::before {
      content: "";
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
      content: "";
      height: 2px;
      width: 10px;
      position: absolute;
      right: 3px;
      top: 7px;
      background: #707070;
    }

    .contnt_img {
      width: 560px;
      position: relative;
      margin: 25px auto 45px;
    }
    .contnt_img:after {
      content: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/video_bg.png");
      position: absolute;
      left: -34px;
      right: 0px;
      bottom: -30px;
      z-index: 3;
      width: 630px;
    }
    .contnt_img img {
      display: block;
      width: 100%;
      height: 315px;
      object-fit: cover;
    }
    .contnt_img .img-figure {
      overflow: hidden;
    }

    .play_btons {
      background-color: #e1261d;
      height: 60px;
      width: 60px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
      border: 1px solid #ffffff;
    }
    .ply_btns_icon {
      width: 0;
      position: absolute;
      height: 0;
      left: 56%;
      border-top: 17px solid transparent;
      border-bottom: 17px solid transparent;
      border-left: 17px solid #fff;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    body .slection__sldr ul li figure .play_btons {
      width: 28px;
      height: 28px;
      bottom: 10px;
      top: initial;
      position: absolute;
      left: 15px;
      transform: initial;
    }
    body .slection__sldr ul li figure .play_btons .ply_btns_icon {
      position: absolute;
      transform: initial;
      left: 11px;
      top: initial;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 7px solid #fff;
      bottom: 6px;
    }

    .slct_sate_city_sec {
      background: #061836;
      display: flex;
      justify-content: space-between;
    }
    .state_selction_s {
      position: absolute;
      background: #f7f7f7;
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 8px 0px 8px 8px;
      top: 30px;
      z-index: 1;
      width: 170px;
      box-sizing: border-box;
      padding: 0 12px;
      right: 0;
      transform: scale(0);
      transition: all 0.5s ease-in-out;
    }
    .state_selction_s.state_slcted_selction_s {
      transform: scale(1);
      transition: all 0.5s ease-in-out;
    }
    .slction_hdng {
      font-size: 20px;
      line-height: 45px;
      color: #fff;
      height: 40px;
      font-weight: bold;
      
      padding-left: 15px;
    }
    .slction_hdng span {
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
      padding: 4px 0px;
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
      max-height: 35px;
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
      content: "";
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
      content: "";
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
    .custom_cl_S:hover .all_states_list {
      display: block;
    }
    .custom_cl_S:last-child {
      margin-right: 5px;
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
      color: #061836;
      background: #ffffff;
      padding: 15px 20px;
      text-align: left;
    }

    .extra_news {
      width: 560px;
      margin: 0 auto 25px;
    }
    .extra_nws_hdng_sec {
      background-color: #061836;
      display: flex;
      align-items: center;
      height: 40px;
      padding: 10px 15px 0px;
    }
    .extra_nws_hdng_sec h4 {
      font-size: 20px;
      line-height: 40px;
      color: #ffffff;
    }
    .extra_nws_container {
      width: 100%;
      height: 419px;
      overflow: hidden;
      position: relative;
    }
    .extra_nws_video {
      position: relative;
      width: 100%;
      height: inherit;
    }
    .extra_nws_video img {
      width: 100%;
      height: inherit;
      object-fit: cover;
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
      left: 56%;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #fff;
      top: 50%;
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

    p.read_more_links {
      margin-top: 10px;
      margin-bottom: 25px;
    }
    body .read_more_links a {
      line-height: 18px;
      display: inline-block;
      font-weight: bold;
      
    }

    p.tag_s {
      color: #404040;
      font-size: 16px !important;
      line-height: 28px;
      font-weight: 400;
      margin-bottom: 15px;
      font-weight: bold;
    }
    p.tag_s a {
      color: #0076bf;
      font-size: 16px;
      
      line-height: 20px;
      font-weight: 400;
      border-bottom: 1px solid #0076bf;
      display: inline-block;
      margin: 5px 0;
    }
    body .tag_s strong {
      display: block;
    }
    body .tag_s span {
      margin-right: 5px;
    }

    .add_sec {
      margin-bottom: 25px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .add_sec span.vigyapan {
      font-size: 11px;
      line-height: 14px;
      color: #000;
      
      padding-top: 2px;
      display: block;
    }

    ul.outbrain_sec {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    ul.outbrain_sec li {
      width: 24%;
      margin-bottom: 20px;
    }
    ul.outbrain_sec li a {
      display: inline-block;
      width: 100%;
    }
    ul.outbrain_sec li a img {
      width: 100%;
      display: inline-block;
    }
    ul.outbrain_sec li a strong {
      font-size: 16px;
      line-height: 22px;
      color: #000;
      font-weight: bold;
      display: block;
    }
    ul.outbrain_sec li a span {
      font-size: 12px;
      line-height: 18px;
      color: #838383;
      font-weight: 400;
      display: block;
    }
    ul.outbrain_sec li a strong:hover,
    ul.outbrain_sec li a span:hover {
      color: #e1261d;
    }

    body .rhs_ob_sec {
      flex-direction: column;
    }
    body .rhs_ob_sec li {
      width: 100%;
    }
    body .rhs_artl_promoted_header {
      border-bottom: none;
    }

    .artl_promoted_header strong {
      font-size: 18px;
      line-height: 20px;
      
      font-weight: bold;
      color: #000;
    }
    .artl_promoted_header {
      border-bottom: 2px solid #000;
      margin-bottom: 10px;
    }
    .artl_prmtedCont {
      margin-bottom: 25px;
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
      background: url(https://widgets.outbrain.com/images/widgetIcons/ob_logo_67x12.png)
        no-repeat center top;
      width: 67px;
      height: 12px;
      margin-left: 5px;
    }
    body .rhs_ob_logo {
      background-position: center top -12px;
    }
    a.recommended_by:after {
      content: "";
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
      content: "";
      border-top: 8px solid #e1261d;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      position: absolute;
      bottom: -12px;
      left: 15px;
    }
    body .agli_khb_r_sec .extra_nws_hdng_sec {
      height: auto;
      padding: 4px 15px 0px;
    }
    body .agli_khb_r_sec .extra_nws_hdng_sec h4 {
      font-size: 16px;
      line-height: 32px;
      
      font-weight: bold;
    }

    ul.fixed_social_icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      left: 0;
      width: 40px;
      top: 40%;
      border-bottom: 0px;
    }
    ul.fixed_social_icons li {
      margin-left: 0px;
      margin-bottom: 1px;
    }

    button.expnd_btn {
      position: absolute;
      top: 16px;
      right: 0;
      padding: 6px 4px 0px 4px;
      background: #000;
      border: none;
      outline: none;
      display: block;
      cursor: pointer;
      font-size: 11px;
      text-transform: uppercase;
      line-height: 11px;
      color: #fff;
      font-weight: bold;
      z-index: 2;
    }

    .podcast_info {
      position: relative;
    }
    .podcast_section {
      width: 560px;
      margin: 0px auto 25px;
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
      padding: 10px 25px 10px 50px;
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
      line-height: 20px;
      
      font-weight: bold;
      border-bottom: 1px dashed #ffffff;
      color: #fff;
      margin-left: 10px;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .podcast_contnr_sec::before {
      content: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mike.png");
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
      content: "";
      width: 12px;
      height: 12px;
      background-color: #fff;
      position: absolute;
      border-radius: 50%;
      left: 87px;
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

    span.select_hd_ing:before {
      content: "";
      background: url(/images/siteimages/sprite_img_fornewarticle_1636363070.svg) no-repeat;
      position: absolute;
      left: 5px;
      top: 7px;
      width: 18px;
      height: 20px;
      background-position: -9px -411px;
    }
    .pubstack-video-js {
      height: 320px !important;
    }
    .articleimg img, .khbr_rght_sec p img {
      width: 100%;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #CECECE;
      width: 540px;
      margin: 0 auto;
      padding: 10px;
      display: block;
      height: auto;
    }
    .nav_bar_li {
      margin-right: 24px !important;
    }
    .ob-cmn-AR_25.ob-multi-columns-layout .ob-widget-header {
      margin: 15px 0px !important;
    }

    .articleimg h5 {
      position: absolute;
      text-align: center;
      left: 10px;
      right: 10px;
      bottom: 10px;
      background: linear-gradient(transparent , black);
      font-size: 15px;
      line-height: 21px;
      color: #fff;
      padding: 20px 10px 10px 10px;
    }
    p:empty {
      display:none;
    }
    .articleimg {
      position: relative;
      line-height: 0;
      width: 540px;
      margin: 20px auto;
    }
    .mobile-state-select {
      display: none;
    }
    .khbr_rght_sec .addef{
      background-color: #f5f5f5;
      margin: 10px 0px;
    }
    .khbr_rght_sec p iframe {
      width: 100%;
      position:relative;
      // height: 529px;
    }
    [data-youtube="true"]  {
      max-height:  none !important;
    }
    .OUTBRAIN {
      margin-bottom: 25px;
      overflow:hidden;
      min-height:160px;
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
    .nw_webstory_embed{
      height:450px;
      outline: none;
      border: none;
      }
    .khbr_rght_sec ul li {list-style: disc;font-size: 18px;font-weight: normal;line-height: 1.5;margin-bottom: 5px;}
    .artcl_container ol{
      padding: 0;
      margin: 0 0 30px 0;
      counter-reset: section;
    }
    .artcl_container ol li{
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
        content:counter(section) ".";
        position: absolute;
        top: 4px;
        // left: -20px;
        bottom: 0;
        // width: 50px;
        margin-right: 20px;
        font-size: 80%;
        color:#fff;
        font-size: 24px;
        font-weight: bold;
        }
    .auth_head_img {
      display: inline-block;
      text-transform: uppercase;
      font-weight: 400;
      color:#454545;
      margin-right: 8px;

    }
    .auth_head {
      display: inline-block;
      text-transform: uppercase;
      font-weight: 400;
      margin-right: 8px;
      color:#454545;
      padding-bottom:0;
    }
    .artclbyeline-author li .artclbyeline-author-intro{line-height: 20px;}

    .artcl_container .khbr_rght_sec strong a {
      display: inline;
    }
    .khbr_rght_sec table {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .khbr_rght_sec table td {
      padding: 8px;
      vertical-align: top;
      font-size: 14px;
      border: 1px solid #eee;
      text-align: left;
    }
    .khbr_rght_sec table tr:first-of-type td {
      background: #666;
      color: #fff;
      font-weight: bold;
    }
    .khbr_rght_sec table {
      width: 100%;
      border-collapse: collapse;
    }
    .slidr_sec .glide__track {
      padding: 0;
    }
    .slidr_sec .glide__track ul li {
      list-style: none;
    }
    .artclhglght{background: #F5F5F5;border: 1px solid #E2E2E2;padding: 5px 18px 10px 18px;margin-bottom: 10px;}
    .artclhglght .artclhglght_hd{ 
      color: #E1261D;
      font-size: 16px;
      line-height: 14px;
      margin-top: 8px;
      font-weight: bold;
    }
    .artclhglght div{border-left: 1px solid #707070; padding-left: 12px;}
    .artclhglght div .highbullets {
      font-size: 15px;
      color: #000000;
      line-height: 9px;
      position: relative;
      font-weight: normal;
      margin-top: 18px;
      display: block;
     }
    .artclhglght div .highbullets:before{content: "";width: 7px;height: 7px;border: 1px solid #707070;position: absolute;border-radius: 100%;top: 0px;left: -17px;background: #F5F5F5;}
    .artclhglght div .highbullets a{color: #000000;}
    .sponser-ad{
      background: #f5f5f5;
    }
    .sponser-ad .container{
      background: #fff;
      overflow: hidden;
      padding: 10px 20px 0;
      max-width: 1284px;
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
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d1d1d1', endColorstr='#00000000',GradientType=0 );            
  }
  .scrollbar::-webkit-scrollbar {
      height: 5px;
  }
  .scrollbar::-webkit-scrollbar-thumb {
      background-color: var(--scroll-color);
  border-radius: 4px;
  }
  .svgloader{position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 99; background: #272727;}
    .svgloader img{position: absolute;top: 50%;right: 0;bottom: 0;left: 50%;z-index: 99;width: 52px;height: 52px;margin: -26px 0 0 -26px; animation: rotate 1s linear infinite; }@keyframes rotate {from {transform: rotate(-0deg);}to {transform: rotate(-359deg);}}
  
  .follow_us {
    border-left: #5A5A5A solid 1px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    background-color: #F7F7F7;
  }
  .fl_txt {
    color: #9d9999;
    width: 54px;
    font-size: 12px;
    font-weight: 800;
    text-transform: none;
    line-height: 17px;
    margin-right: 7px;
  }
  .whatsapp_channel {
    margin-left: auto;
    border-radius: 5px;
    display: inline-block;
    position: relative;
    font-size: 17px;
    margin-bottom: 15px;
    width: 45%;
    text-align: center;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #FFFFFF;
  }
  .whatsapp_channel a {
    display: flex;
    font-size: 17px;
    line-height: 14px;
    height: 40px;
    color: #fff;
    text-align: center;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: #151515;
    border-radius: 6px;
  }
  .whatsapp_channel a:hover {
    color: #fff;
}
  .whatsapp_channel svg {
    fill: #fff;
    position: relative;
    height: 40px;
  }
  .whatsapp_channel span {
    margin: 0 2px;
    vertical-align: middle;
  }
  .walft {
    width: 49%;
    text-transform: uppercase;
  }
  .wargt {
    height: 40px;
    background-color: #52BA63;
    width: 60%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-right: 5px;
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
  
  .ol_block{border-bottom: 1px solid #c4c4c4;max-width: 560px;margin: 0 auto 25px;border-left: #E1261D solid 2px;background: #F2F2F2;padding: 5px 0 0 0;counter-reset: section;}
  .ol_block li{list-style: none !important;padding: 10px 0;position: relative;margin: 0 15px 0 49px !important;border-bottom: #C4C4C4 solid 1px;font: 400 18px/28px Mukta;color: #061836;}
  .ol_block li:after{counter-increment: section;content: counter(section) ".";width: 34px;height: 34px;background: #E1261D;border-radius: 0px 4px 4px 0px;flex-shrink:0;font: normal normal bold 16px/30px Mukta;color: #FFFFFF;text-align: center;position: absolute;top: 10px;left: -49px;}
  .ol_block li:last-child{border: none;}
  .ol_block li strong, .ol_block li b{display:block}
  .ul_block{border-bottom: 1px solid #c4c4c4;max-width: 560px;margin: 0 auto 25px;background: #F2F2F2;padding: 5px 0 0 0;}
  .ul_block li{list-style:none !important;padding: 10px 0;margin: 0 15px 0 40px !important;border-bottom: #C4C4C4 solid 1px;position: relative;}
  .ul_block li:before{content: '';width: 8px;height: 8px;background: #E1261D;border-radius: 10px;position: absolute;left: -24px;top: 16px;}
  .ul_block li:last-child{border: none;}
  .ul_block p, .ol_block p{display:block;}
  .ul_block p, .ol_block p:empty{display:none;}
  .ul_block li:last-of-type,
  .ol_block li:last-of-type{border:none}
  .post_info{display: flex;margin-bottom: 25px;border-top: #939393 dotted 1px;padding-top: 10px;padding-top: 15px;}
  .post_info img{vertical-align: top;}
  .post_info .ps_col{flex: 1;display: flex;align-items: center;}
   .post_info .authr_mob_li{margin: 0 !important;}
   .post_date{font: 400 13px/21px Mukta;color: #949494;position: relative;padding-left: 10px;}
   .post_date:before{content: '.';font-size:30px;color: #454545;position: absolute;top: -7px;left: 0;}
   .post_date span{color: #454545;font-weight: bold;}
   .post_info .auth_head{font: 400 12px/14px Mukta;color: #454545;text-transform: uppercase;}
   .artclbyeline-agency li:first-child::before{
    background:#E1261D;
    }
    .artclbyeline-agency li:before{
        background:#454545;
    }
    .artclbyeline-agency li b{
        color:#454545;
    }
    .artclbyeline-agency li{
        color: #949494;
    }
    #newbyelineAuthordefault {
      margin-top: 3px;
    }
    .ul_block li:last-child,
    .ol_block li:last-child{border:none;}
  .all_states_list{
    top: 28px;
    left: -1px;
    right: -1px;
    box-shadow:unset;
    border-top: none;
}
.all_states_list li a{
    padding: 0px 5px 0 10px;
}
body .custm_slecton li p{
    padding:10px
}
.slction_section{
    position: relative;
    padding: 15px 15px 5px 15px;
}
.glide_arroe_buttons {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
}
.glide__bullets{
    top: 2px;
}
.fullstateshow .slction_section {
  width: 100% !important;
}
.adclssticktatbtm div video { height : 190px !important; }
.adclssticktatbtm div .pubstack-vjs-fullscreen video {
  height: 100% !important;
  width:100% !important;
}
.artcl_contents>div {	
	position: relative;	
}
.readmore_hero {	
	font-size: 14px;	
	line-height: 20px;	
		
	font-weight: bold;	
	color: #e1261d;	
	background-color: transparent;	
}
.ad-place span {	
	background: #eee;	
	font-size: 12px;	
	color: #444;	
	padding: 3px 0 3px 0;	
	text-align: center;	
	min-height: 20px;	
	display: -webkit-box;	
	display: -webkit-flex;	
	display: -ms-flexbox;	
	display: flex;	
	-webkit-box-pack: center;	
	-webkit-justify-content: center;	
	-ms-flex-pack: center;	
	justify-content: center;	
	-webkit-align-items: center;	
	-webkit-box-align: center;	
	-ms-flex-align: center;	
	align-items: center;	
	line-height: normal;	
}

.auth_head_img {	
	display: inline-block;	
	text-transform: uppercase;	
	font-weight: 400;	
	color: #454545;	
	margin-right: 8px;	
}	

.icon-bar {	
	position: fixed;	
	top: 50%;	
	-webkit-transform: translateY(-50%);	
	-ms-transform: translateY(-50%);	
	transform: translateY(-50%);	
	left: -6px;	
  z-index : 10;
}	
.introtwo {	
	display: none;	
}
.scrollbar {
  white-space: nowrap;
  overflow-x: scroll;
  --scroll-color: #C6C6C6;
  --scroll--hover-color: #666;
  scrollbar-color: #f5f5f5#c3bebe;
  scrollbar-width: thin;
  position: relative;
  color: #e1261d;
}
.readmoreintro {
  color: #E1261D;
}
.instagram-media {
  margin: 0 auto;
}
.small p {
  font-size:18px;  line-height:30px;
}
.medium p {
  font-size:20px;  line-height:32px;
}
.large p {
  font-size:24px;  line-height:34px;
}
`;
