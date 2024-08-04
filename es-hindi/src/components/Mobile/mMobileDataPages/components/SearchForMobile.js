import React, { useState } from "react";
import { specificationURL } from "includes/brand.helper";
import { getMobileSearch } from "api/global/Common";

const SearchForMobile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");

  const searchForMobile = async () => {
    if (searchTerm) {
      const searchData = await getMobileSearch({ keyword: searchTerm }, true);
      if (searchData) {
        setSearchResult(searchData);
        setBrandSearch(searchData[0].brand);
      } else {
        setSearchResult([]);
        setBrandSearch("");
      }
    } else {
      setSearchResult([]);
      setBrandSearch("");
    }
  };

  let timer;
  function delay() {
    timer = setTimeout(() => searchForMobile(), 1000 || 0);
  }
  const handleChange = (e) => {
    // delay()
    clearTimeout(timer);
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResult([]);
  };

  return (
    <div>
      <div className={searchResult?.length ? "spctpsrch adcls" : "spctpsrch"}>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyUp={delay}
            placeholder="मोबाइल या ब्रांड से खोजे "
          />
          {/* <h1>{searchTerm}</h1> */}
          {searchTerm ? (
            <span onClick={clearSearch} className="clearSearch">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 55.324 55.321"
                style={{ enableBackground: "0 0 55.324 55.321" }}
                xmlSpace="preserve"
              >
                <g id="Layer_12">
                  <polygon
                    style={{ fill: "#231F20" }}
                    points="47.393,0 27.677,19.709 8.531,0.563 0.602,8.491 19.752,27.635 0,47.387 7.931,55.321
		27.677,35.572 46.827,54.718 54.752,46.79 35.605,27.635 55.324,7.925 	"
                  />
                </g>
                <g id="Layer_1"></g>
              </svg>
            </span>
          ) : (
            ""
          )}
        </div>

        <ul>
          <li>
            <a href={`/mobiles/${brandSearch?.toLowerCase()}/`}>
              {" "}
              {brandSearch} {brandSearch ? "Mobile Phone" : ""}
            </a>
          </li>

          {searchResult &&
            searchResult?.slice(0, 5)?.map((item, id) => {
              return (
                <li key={id} className="dthrl_row">
                  <a
                    href={`${specificationURL}/${item?.title
                      .replace(/ /g, "-")
                      .toLowerCase()}-${item?.id}/`}
                  >
                    {item?.title}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
      <style jsx global>
        {`
          body {
            margin: auto;
          }
          .engfont {
            // font-family: "Recursive", sans-serif;
          }
          figure,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          header,
          ul,
          ol,
          output,
          p {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          button,
          button:focus,
          input:focus,
          textarea:focus {
            outline: 0;
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
            background: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          a {
            text-decoration: none;
            outline: 0;
          }
          * {
            box-sizing: border-box;
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
          .dflx {
            display: flex;
          }
          .jstbtwn {
            justify-content: space-between;
          }
          .flxwrp {
            flex-wrap: wrap;
          }
          .jstcntr {
            justify-content: center;
          }
          .algncntr {
            align-items: center;
          }
          .spcwrapper {
            max-width: 360px;
            margin: auto;
          }

          // .spctphd ul li:first-child:after {
          //   content: "";
          //   width: 5px;
          //   height: 5px;
          //   background: #bababa;
          //   display: inline-block;
          //   border-radius: 100%;
          //   vertical-align: middle;
          //   margin: 0 10px;
          // }

          .spctpsrch {
            background: #f6f7f7;
            padding: 15px;
            border-bottom: 1px solid #d8d8d8;
            position: relative;
            z-index: 2;
          }
          .spctpsrch div {
            background: #fff;
            width: 100%;
            height: 38px;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #d9d9d9;
            border-radius: 20px;
            padding: 0 10px;
            // overflow: hidden;
            position: relative;
            transition: all 0.5s ease-in-out;
            border-bottom: none;
            display: flex;
            align-items: center;
          }
          .spctpsrch div:after {
            content: "";
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
              0 0 no-repeat;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 12px;
            right: 16px;
          }
          .spctpsrch div input {
            // font-family: "Recursive", sans-serif;
            font-size: 13px;
            color: #828282;
            height: 36px;
            border: none;
            width: 100%;
          }
          .spctpsrch ul {
            height: 0px;
            overflow: auto;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 0 0 20px 20px;
            padding: 0 10px;
            position: absolute;
            transition: all 0.5s ease-in-out;
            background: #fff;
            left: 15px;
            right: 15px;
            top: 53px;
            border: 1px solid #d9d9d9;
            border-top: none;
            visibility: hidden;
          }
          .spctpsrch ul li a {
            height: 37px;
            line-height: 37px;
            border-top: 1px solid #d9d9d9;
            color: #000;
            font-size: 13px;
            padding: 0 5px;
            display: block;
            position: relative;
          }
          // .spctpsrch ul li a:after {
          //   background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
          //     0 0 no-repeat;
          //   content: "";
          //   position: absolute;
          //   top: 11px;
          //   right: 5px;
          //   width: 16px;
          //   height: 16px;
          //   opacity: 0.4;
          // }
          // .spctpsrch.adcls div:first-child {
          //   transition: all 0.5s ease-in-out;
          //   border-radius: 15px 15px 0 0;
          //   display: flex;
          //   align-items: center;
          // }
          .spctpsrch.adcls ul {
            height: 250px;
            transition: all 0.5s ease-in-out;
            visibility: visible;
          }

          .phnglblhd {
            color: #001d42;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #bebebe;
            line-height: 20px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            position: relative;
          }
          .phnglblhd span {
            color: #e1261d;
          }
          .phnglblhd:after {
            content: "";
            width: 25px;
            height: 4px;
            position: absolute;
            left: 0;
            bottom: -1px;
            background: #ed1c24;
          }
          .phnglblhd.forbg {
            margin-left: 15px;
            margin-right: 15px;
          }

          .psrlhdn {
            position: relative;
            overflow: hidden;
          }

          .phnlgblts {
            margin: 18px 0;
          }
          .phnlgblts button {
            margin: 0 5px;
            padding: 0;
            width: 6px;
            height: 6px;
            background: #ccc;
            border: none;
            outline: none;
            border-radius: 100%;
          }
          .phnlgblts button.glide__bullet--active {
            background: #e1261d;
            width: 18px;
            border-radius: 5px;
          }

          .spcglbg {
            background: #f5f5f5;
            border-bottom: 1px solid #d8d8d8;
            padding: 15px 0 0 0;
            margin-bottom: 30px;
          }
          .vsp60 {
            margin-top: 60px;
          }

          .clearSearch {
            width: 5% !important;
            margin-right: 35px;
            display: inline-block;
          }
          .clearSearch:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};
export default SearchForMobile;
