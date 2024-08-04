import React, { useState } from "react";
import LazyLoadImage from "components/Common/CustomImage";

const PointTable = ({ isAmp = false, PointTableData }) => {
  const [shouldAddClass, setShouldAddClass] = useState(1);
  const handleTableTab = (val) => {
    setShouldAddClass(val);
  };

  const tapArray = [
    "tap:group_detail_1.show,group_detail_3.hide,group_detail_4.hide,group_detail_2.hide",
    "tap:group_detail_1.hide,group_detail_3.hide,group_detail_4.hide,group_detail_2.show",
    "tap:group_detail_1.hide,group_detail_3.show,group_detail_4.hide,group_detail_2.hide",
    "tap:group_detail_1.hide,group_detail_3.hide,group_detail_4.show,group_detail_2.hide",
  ];

  return (
    <>
      <div className="points_table">
        <h2 className="page_title">
          पॉइंट <span>टेबल</span>
        </h2>
        {isAmp && (
          <nav>
            <amp-selector layout="container">
              <ul className="points_table_tab">
                {PointTableData?.length > 0 &&
                  PointTableData.map((data, index) => {
                    const selected = index === 0 ? true : false;
                    return (
                      <li className="group_tab">
                        <a
                          on={tapArray[index]}
                          option={index + 1}
                          selected={selected}
                        >
                          {`राउंड-${index + 1}`}{" "}
                          {`ग्रुप-${data?._id?.groupName}`}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </amp-selector>
          </nav>
        )}

        {!isAmp && (
          <ul className="points_table_tab">
            {PointTableData?.length > 0 &&
              PointTableData.map((data, index) => {
                return (
                  <li
                    onClick={() => handleTableTab(index + 1)}
                    className={`group_tab ${
                      shouldAddClass && shouldAddClass == index + 1 && "active"
                    }`}
                    id={`group_tab_${index + 1}`}
                  >
                    <p>{`राउंड-${index + 1}`}</p>
                    <span>{`ग्रुप-${data?._id?.groupName}`}</span>
                  </li>
                );
              })}
          </ul>
        )}
        <div className="info_table">
          <table>
            <tbody>
              <tr>
                <th>स्थान</th>
                <th>टीमें</th>
                <th>मैच</th>
                <th>अंक</th>
                <th>NRR</th>
              </tr>
            </tbody>
            {PointTableData?.length > 0 &&
              PointTableData.map((data, index) => (
                <>
                  <tbody
                    className={
                      isAmp
                        ? `group_detail_${index + 1}`
                        : `group_detail ${
                            shouldAddClass &&
                            shouldAddClass === index + 1 &&
                            "display_block_class"
                          }`
                    }
                    id={`group_detail_${index + 1}`}
                    hidden={isAmp ? (index == 0 ? false : true) : false}
                  >
                    {data?.team?.length &&
                      data?.team.map((itm, idx) => (
                        <>
                          <tr>
                            <td>{idx + 1}</td>
                            <td>
                              <div className="table_team_name">
                                <LazyLoadImage
                                  isAMP={isAmp}
                                  src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/160x90/${itm?.id}.png`}
                                  width={68}
                                  height={38}
                                  alt={itm?.short_name}
                                />

                                <p>
                                  <a
                                    href={`/cricket/teams/${itm?.short_name
                                      ?.toLowerCase()
                                      .split(" ")
                                      .join("-")}-squad-${itm.id}.html`}
                                  >
                                    {itm.name}
                                  </a>
                                </p>
                              </div>
                            </td>
                            <td>
                              {parseInt(itm.w || 0) +
                                parseInt(itm.l || 0) +
                                parseInt(itm.t || 0) +
                                parseInt(itm.nr || 0)}
                            </td>
                            <td>{itm.pts || 0}</td>
                            <td>{itm.nrr || 0}</td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </>
              ))}
          </table>
          <div className="load_more">
            <a href="/world-cup/points-table/">
              <span>पॉइंट टेबल[+]</span>
            </a>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .group_tab a[option][selected] {
            color: #e1261c;
            border: none;
            outline: none;
            display: block;
            background: #f5f5f5;
          }
        `}
      </style>
    </>
  );
};

export default PointTable;
