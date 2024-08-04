import { useState } from "react";
import { getNumberFormatter } from "util/global/Helper";

const TableMobile = ({ id, data, isAmp = false, teamsData }) => {
  const first10 = isAmp ? data : data.slice(0, 10);
  const moreResults = data.slice(11, data.length);
  const [loadMore, setLoadMore] = useState(false);
  const handleLoadMore = () => {
    setLoadMore(loadMore ? false : true);
  };

  return (
    <>
      <div className={`result_table_info squad_table ${id} `}>
        <table id={id}>
          <tbody>
            <tr>
              <th>खिलाड़ी | (टीम में भूमिका)</th>
              <th style={{ textAlign: "center" }}>कीमत</th>
            </tr>
            {first10?.length > 0 && first10.map((playerName, i) => (
              <tr key={i}>
                <td style={{ textAlign: "left" }}>
                  <span>{playerName.playername}</span>
                  <br /> {playerName.type}
                </td>
                <td style={{ textAlign: "left" }}>
                  <strong>
                    ₹ {getNumberFormatter(playerName.costinrcr)} <span>{teamsData?.labels?.crorelabel && (`(${teamsData?.labels?.crorelabel})`)} </span>
                  </strong>
                  <strong>
                    $ {getNumberFormatter(playerName.costusdth)} <span>(000)</span>
                  </strong>
                </td>
              </tr>
            ))}
            {!isAmp &&
              loadMore &&
              moreResults.map((playerName, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "left" }}>
                    <span>{playerName.playername}</span>
                    <br /> {playerName.type}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <strong>
                    ₹ {getNumberFormatter(playerName.costinrcr)} <span>{teamsData?.labels?.crorelabel && (`(${teamsData?.labels?.crorelabel})`)} </span>
                    </strong>
                    <strong>
                      $ {getNumberFormatter(playerName.costusdth)} <span>(000)</span>
                    </strong>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!isAmp && (
          <a
            onClick={() => handleLoadMore()}
            className="show_more show_more_unsold"
          >{`${
            loadMore === false
              ? "+ अन्य खिलाड़ी भी दिखाएं:"
              : "- सीमित खिलाड़ी दिखाएं:"
          }`}</a>
        )}
      </div>
      {/* {!isAmp && showModal && (
        <div className="pwa_filter active">
          <div className="filter_by">
            <div className="filter_by_top">
              <p className="filter_title">रिजल्ट :</p>
              <i
                className="clear_filter"
                onClick={() => handleModal(false)}
              ></i>
            </div>
            <div className="filter_opation">
              <p className="filter_left">टीमें </p>
              <div className="filter_right">
                <ul className="filter_click">
                  <li>
                    <a href="/ipl-auction/gt-players-list-2/">गुजरात टाइटन्स</a>
                  </li>
                  <li>
                    <a href="/ipl-auction/csk-players-list-3/">
                      चेन्नई सुपर किंग्स
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/dc-players-list-4/">
                      दिल्ली कैपिटल्स
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/kkr-players-list-5/">
                      कोलकाता नाइट राइडर्स
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/pbks-players-list-6/">पंजाब किंग्स</a>
                  </li>
                  <li>
                    <a href="/ipl-auction/lsg-players-list-7/">
                      लखनऊ सुपर जायंट्स
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/mi-players-list-8/">मुंबई इंडियंस</a>
                  </li>
                  <li>
                    <a href="/ipl-auction/rcb-players-list-9/">
                      रॉयल चैलेंजर्स बैंगलोर
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/rr-players-list-10/">
                      राजस्थान रॉयल्स
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/srh-players-list-11/">
                      सनराइजर्स हैदराबाद
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="filter_opation">
              <p className="filter_left">हाईलाइट्स</p>
              <div className="filter_right">
                <ul className="filter_click">
                  <li>
                    <a href="/ipl-auction/top-10-players-list-1/">
                      टॉप 10 खिलाड़ी
                    </a>
                  </li>
                  <li>
                    <a href="/ipl-auction/unsold-players-list-12/">
                      अनसोल्ड खिलाड़ी
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* {!isAmp && (
        <div className="filter_fixed">
          <div className="filter_fixed_top">
            <p>Jump to</p>
            <span onClick={() => handleModal(true)} className="filter_open" />
          </div>
          <ul className="filter_name">
            <li>टीमें</li>
            <li>हाईलाइट्स</li>
          </ul>
        </div>
      )} */}
      <style jsx global>
        {`
  .filter_fixed {
    height: 70px;
    background: #F1F1F1 0% 0% no-repeat padding-box;
    box-shadow: 3px 0px 6px #00000029;
    position: fixed;
    bottom: 50px;
    width: 100%;
    z-index: 9;
    border-top: 2px #E1261C solid;
    padding: 0 10px;
    left: 0;
    box-sizing: border-box;
}
.filter_fixed_top {
    border-bottom: 1px dotted #333333;
    display: flex;
    align-items: center;
    padding: 4px 0;
    justify-content: space-between;
}
.filter_fixed_top p {
    color: #E1261C;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 18px;
    font-family: 'Segoe Pro Bold';
}
span.filter_open {
    width: 16px;
    height: 16px;
    border: 2px solid #464646;
    border-radius: 50%;
    position: relative;
}
span.filter_open:before {
    content: '';
    width: 0px;
    height: 0px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 5px solid #2f2f2f;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 45%;
}
ul.filter_name {
    display: flex;
    list-style: none;
}
ul.filter_name li {
    letter-spacing: 0px;
    color: #464646;
    text-transform: uppercase;
    font-family: 'Segoe Pro Bold';
    position: relative;
    padding: 10px 0;
    padding-left: 20px;
    margin-right: 20px;
    font-size: 13px;
}
ul.filter_name li:before {
    content: "";
    position: absolute;
    display: block;
    width: 7px;
    height: 2px;
    background: #464646;
    left: 3px;
    top: ${isAmp ? "19px" : "19px !important"};
}

ul.filter_name li:after {
    border-right: 2px solid #464646;
    border-top: 2px solid #464646;
    width: 4px;
    height: 4px;
    transform: rotate(45deg);
    top: 5px;
    left: 6px;
    content: "";
    position: absolute;
    display: block;
}
ul.filter_name li:after, ul.filter_name li:before {
    top: 17px;
}
  `}
      </style>
    </>
  );
};

export default TableMobile;
