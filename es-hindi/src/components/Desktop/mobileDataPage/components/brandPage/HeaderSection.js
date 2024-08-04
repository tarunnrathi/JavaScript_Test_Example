import React, { useState } from "react";
import SearchForMobile from "/src/components/Desktop/mobileDataPage/components/common/SearchForMobile";

const HeaderSection = ({
  title = "",
  handleSorting,
  brandListData: mobileBrands = [],
  notFound,
  page = 0,
}) => {
  const [activeEle, setActiveEle] = useState("");
  const [sortOptions, setSortOptions] = useState({
    price: "up",
    release_date: "up",
  });

  const onSortClick = (ele) => {
    setActiveEle(ele);
    setSortOptions({
      ...sortOptions,
      [ele]: sortOptions[ele] === "up" ? "down" : "up",
    });
    handleSorting(ele, sortOptions[ele] === "up" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="dt_header">
        <div className="dth_l">
          <h1 className="dth_ttl">{title} Mobile Phones</h1>
        </div>

        <div className="sortSearch">
          {mobileBrands.length && !notFound && page < 2 ? (
            <div className="sortDropdown">
              <div className="dropbtn">
                <span className="livenow_btn"></span>Sort
              </div>

              <div className="dropdownIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="13.313"
                  viewBox="0 0 8 13.313"
                >
                  <path
                    id="Path_1183"
                    data-name="Path 1183"
                    d="M9.719-2.937,12.813-6,9.719-9.062,10.656-10l4,4-4,4ZM5.344-2l-4-4,4-4,.938.938L3.188-6,6.281-2.937Z"
                    transform="translate(-2 -1.344) rotate(90)"
                    fill="#6e6e6e"
                  />
                </svg>
              </div>

              <div className="dropdown-cont">
                <div
                  className={
                    activeEle === "price"
                      ? "filterOptions activeEle"
                      : "filterOptions"
                  }
                  onClick={() => onSortClick("price")}
                >
                  <div>Price</div>
                  <div className="arrows">
                    {sortOptions.price === "up" ? (
                      <div
                        className="upArrow"
                        // onClick={() => handleSorting("price", "desc")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-arrow-up"
                        >
                          <line x1="12" y1="19" x2="12" y2="5"></line>
                          <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}

                    {sortOptions.price === "down" ? (
                      <div
                        className="downArrow"
                        // onClick={() => handleSorting("price", "asc")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-arrow-down"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  className={
                    activeEle === "release_date"
                      ? "filterOptions activeEle"
                      : "filterOptions"
                  }
                  onClick={() => onSortClick("release_date")}
                >
                  <div>Release date</div>
                  <div className="arrows">
                    {sortOptions.release_date === "up" ? (
                      <div
                        className="upArrow"
                        // onClick={() => handleSorting("release_date", "desc")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-arrow-up"
                        >
                          <line x1="12" y1="19" x2="12" y2="5"></line>
                          <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}

                    {sortOptions.release_date === "down" ? (
                      <div
                        className="downArrow"
                        // onClick={() => handleSorting("release_date", "asc")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-arrow-down"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <SearchForMobile />
        </div>
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
    .dropbtn {
      width: 125px;
      height: 35px;
      line-height: 35px;
    font-size: 14px;
    text-transform: uppercase;
      background: #ffffff;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      font-family : Mukta, sans-serif;
      color: red;
    }
    
    .dropbtn:before {
      content: "";
      width: 15px;
      height: 20px;
      background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/dimsprite_1650355544.png) -104px -32px
        no-repeat;
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      margin-left: 6px;
    }
    .sortDropdown {
      margin: 0px 10px;
      position: relative;
      display: inline-block;
    }
    

    .dropdown-cont {
      display: none;
    }

    // .dropdown-cont {
    //   margin-top: 2px;
    //   display: none;
    //   position: absolute;
    //   background-color: #f9f9f9;
    //   min-width: 160px;
    //   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    //   z-index: 1;
    //   font-size: 14px;
    // }
    
    // .dropdown-cont .filterOptions {
    //   justify-content: space-between;
    //   color: black;
    //   padding: 12px 10px;
    //   text-decoration: none;
    //   display: flex;
    //   align-items: center;
    // }
    .upArrow:hover, .downArrow:hover, .filterOptions:hover{
      cursor:pointer;
    }
    
    // .dropdown-cont div:hover { cursor:pointer; background-color: #f1f1f1}
    
    .sortDropdown:hover .dropdown-cont {
      display: block;
    }
    
   

    .sortSearch{
      display:flex;
      align-items: center;
    }

    
  .dropdownIcon {
    // background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/social_sprite_img_1631086597.svg) no-repeat;
    display: inline-block;
    vertical-align: top;
}

.dropdownIcon {
  // background-position: -67px -2px;
  width: 12px;
  height: 15px;
  position: absolute;
  top: 6px;
  right: 6px;
}

//  .upArrow{
//   margin: 0px 5px;
//  }

 
.upArrow {
  // margin-right: 7px;
  width: 16px;
  color: #707070;
  height : 16px;
  position: relative;
  top: -3px
}
.downArrow {
  width: 16px;
  height : 16px;
  color: #707070;
  position: relative;
  top: -3px
}
.arrows {
  display: flex;
  align-items: center;

}

// .livenow_btn {
//   // position: absolute;
//   // background: #ED1C24;
//   color: #fff;
//   border-radius: 2px;
//   font-size: 11px;
//   text-transform: uppercase;
//   // right: 10px;
//   // top: 10px;
//   padding: 3px 7px 3px 23px;
//   font-weight: bold;
//   // margin-right: 5px;
//   position: relative;
// }
// .livenow_btn:after, .livenow_btn:before {
//   content: "";
//   position: absolute;
//   opacity: 0;
//   box-sizing: border-box;
//   top: 3px;
//   left: 6px;
//   width: 12px;
//   height: 12px;
//   border: 2px solid #fff;
//   box-shadow: 0 0 10px green, inset 0 0 10px green;
//   border-radius: 100px;
//   background-clip: padding-box;
// }
// .livenow_btn:before {
//   z-index: 2;
//   -webkit-animation: blinker 2s infinite;
//   animation: blinker 2s infinite;
// }

// .livenow_btn:after {
//   z-index: 1;
//   -webkit-animation: blinker 2s infinite 1s;
//   animation: blinker 2s infinite 1s;
// }
// @keyframes blinker{0%{-webkit-transform:scale(0);opacity:0;}50%{opacity:1;}to{-webkit-transform:scale(1);opacity:0;}}


// .activeEle{
//   background:#d7dbdb;
// }


.dropdown-cont{
  position: absolute;
      background-color: #fff;
      z-index: 5;
      font-size: 14px;
      right: 0px;
      border: 1px solid #D9D9D9;
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 0 0 4px 4px;
      top: 35px;
      left: 0px;
            }
  
            .dropdown-cont .filterOptions {
              justify-content: space-between;
              color: black;
              padding: 6px 6px 6px 10px;
              text-decoration: none;
              display: flex;
              align-items: center;
              font-size: 16px;
              border-bottom: 1px solid #D9D9D9;
  
            }
  
      `}
      </style>
    </div>
  );
};

export default HeaderSection;
