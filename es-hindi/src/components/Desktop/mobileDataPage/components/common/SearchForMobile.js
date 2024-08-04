import React, { useState } from "react";
import { getMobileSearch } from "api/global/Common";

const { specificationURL } = require("/src/includes/brand.helper");
const { brandURL } = require("/src/includes/brand.helper");

const SearchForMobile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");

  const searchForMobile = async () => {
    if (searchTerm) {
      const searchData = await getMobileSearch({ keyword: searchTerm }, true);
      if (searchData) {
        setSearchResult(searchData);
        setBrandSearch(searchData?.[0]?.brand || "");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    searchForMobile();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResult([]);
  };
  return (
    <div className="dth_r">
      <div className="srh_otr">
        <form onSubmit={handleSubmit} className="form searchForm">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyUp={delay}
            placeholder="मोबाइल या ब्रांड से खोजे "
          />
          {searchTerm || searchResult?.length ? (
            <div onClick={clearSearch} className="clearSearch">
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
            </div>
          ) : (
            ""
          )}

          <button type="submit" value="submit" className="submit">
            <div className="sprite search"></div>
          </button>
        </form>

        <div
          style={{ display: searchResult.length ? "block" : "none" }}
          className="dthrl_wrp"
        >
          <div className="dthrl_inner">
            <div className="dthrl_row">
              <a href={`${brandURL}/${brandSearch?.toLowerCase()}/`}>
                {" "}
                {brandSearch} {brandSearch ? "Mobile Phone" : ""}
              </a>
            </div>
            {searchResult &&
              searchResult?.slice(0, 5)?.map((item, id) => {
                return (
                  <div key={id} className="dthrl_row">
                    <a
                      href={`${specificationURL}/${item?.title
                        .replace(/ /g, "-")
                        .toLowerCase()}-${item?.id}/`}
                    >
                      {item.title}
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .clearSearch {
            width: 4%;
            margin-right: 8px;
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
