import React from "react";
import SearchForMobile from "/src/components/Desktop/mobileDataPage/components/common/SearchForMobile";

const HeaderSection = () => {
  return (
    <div>
      <div className="dt_header">
        <div className="dth_l">
          <h1 className="dth_ttl">मोबाइल न्‍यूज</h1>
        </div>
        <SearchForMobile />
      </div>
      <style>
        {`
      
       
      .dth_r{
        width: 280px;
        height: 40px;
        position: relative;
        z-index: 5;
    
      }
      .srh_otr{
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #d9d9d9;
        border-radius: 20px;
        overflow: hidden;

      }
      .dth_r .form {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
    }
    .dthrl_wrp {
        width: 280px;
        background: #ffffff;
        padding: 0 13px 10px 13px;
        z-index: 991;
    }

    .dth_r .form input {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        height: 100%;
        background: transparent;
        border-radius: 20px 0 0 20px;
        border: none;
        padding-left: 16px;
    }

    .dthrl_inner {
        height: 245px;
        white-space: nowrap;
        overflow-y: scroll;
        --scroll-color: black;
        --scroll--hover-color: #666;
        -webkit-scrollbar-color: black #c3bebe;
        -moz-scrollbar-color: black #c3bebe;
        -ms-scrollbar-color: black #c3bebe;
        scrollbar-color: black #c3bebe;
        -webkit-scrollbar-width: thin;
        -moz-scrollbar-width: thin;
        -ms-scrollbar-width: thin;
        scrollbar-width: thin;
    }

    .srh_otr {
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #d9d9d9;
        border-radius: 20px;
        overflow: hidden;
    }

      `}
      </style>
    </div>
  );
};

export default HeaderSection;
