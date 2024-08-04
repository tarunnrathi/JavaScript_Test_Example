import React from "react";
import SearchForMobile from "/src/components/Desktop/mobileDataPage/components/common/SearchForMobile";

const Header = ({ title = "", updated_at = "" }) => {
  updated_at = updated_at && "" + updated_at;
  const year = updated_at?.slice(0, 4);
  const month = updated_at?.slice(5, 7);
  const day = updated_at?.slice(8, 10);

  return (
    <div>
      <div className="dt_header">
        <div className="dth_l">
          <h1 className="dth_ttl">{title}</h1>
          <ul className="lst_update">
            {/* <li>
              <a href="">{brand}</a>
            </li> */}

            {updated_at ? (
              <li>पिछली बार अपडेट किया गया : {`${day}-${month}-${year}`}</li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <SearchForMobile />
      </div>
      <style jsx global>
        {``}
      </style>
    </div>
  );
};

export default Header;
