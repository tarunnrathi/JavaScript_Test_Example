import React, { useState } from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { IccT20TeamList, flagUrl } from "api/Constant";

const PointTable = ({ isAmp = false, tableData }) => {
  const [shouldAddClass, setShouldAddClass] = useState(5);
  const handleTableTab = (val) => {
    setShouldAddClass(val);
  };

  return (
    <>
      <div className="points_table">
        <h2 className="page_title">
          पॉइंट <span>टेबल</span>
        </h2>
        {/* {isAmp && (
          <nav>
            <amp-selector layout="container">
              <ul className="points_table_tab">
                <li className="group_tab">
                  <a
                    on="tap:group_detail_1.show,group_detail_3.hide,group_detail_4.hide,group_detail_2.hide"
                    option={1}
                  >
                    राउंड-1 <span>ग्रुप-ए</span>
                  </a>
                </li>
                <li className={`group_tab`}>
                  <a
                    on="tap:group_detail_1.hide,group_detail_3.hide,group_detail_4.hide,group_detail_2.show"
                    option={2}
                  >
                    राउंड-1 <span>ग्रुप-बी</span>
                  </a>
                </li>
                <li className="group_tab">
                  <a
                    on="tap:group_detail_1.hide,group_detail_3.show,group_detail_4.hide,group_detail_2.hide,active"
                    option={3}
                  >
                    सुपर-12 <span>ग्रुप-1</span>
                  </a>
                </li>
                <li className="group_tab">
                  <a
                    on="tap:group_detail_1.hide,group_detail_3.hide,group_detail_4.show,group_detail_2.hide"
                    option={4}
                  >
                    सुपर-12 <span>ग्रुप-2</span>
                  </a>
                </li>
              </ul>
            </amp-selector>
          </nav>
        )} */}

        {!isAmp && (
          <ul className="points_table_tab">
            {tableData?.length > 0 && tableData?.map((item, index) => {
              if(index > 3){
                return (
                  <li
                    key={index}
                    onClick={() => handleTableTab(index + 1)}
                    className={shouldAddClass === index + 1 ? "group_tab active" : "group_tab"}
                  >
                    <p>{item._id?.stage_type} {item._id?.groupName}</p>
                  </li>
                );
              }else{
                return null
              }
            })}
          </ul>
        )}
        <div className="info_table">
          <table>
            <thead>
              <tr>
                <th>स्थान</th>
                <th>टीमें</th>
                <th>मैच</th>
                <th>जीते</th>
                <th>हारे</th>
                <th>N/R</th>
                <th>टाई</th>
                <th>NET RR</th>
                <th>अंक</th>
              </tr>
            </thead>
            {/* <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 1 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[0]?.team?.length > 0 && tableData[0]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp1" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                );
              })}
            </tbody>

            <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 2 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[1]?.team?.length > 0 && tableData[1]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp2" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                )
              })}
            </tbody>

            <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 3 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[2]?.team?.length > 0 && tableData[2]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp3" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                )
              })}
            </tbody>

            <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 4 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[3]?.team?.length > 0 && tableData[3]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp4" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                )
              })}
            </tbody> */}

            <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 5 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[4]?.team?.length > 0 && tableData[4]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp5" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                )
              })}
            </tbody>

            <tbody
              className={isAmp ? "group_detail_1" : shouldAddClass === 6 ? "group_detail display_block_class" : "group_detail"}
            >
              {tableData[5]?.team?.length > 0 && tableData[5]?.team?.map((item, index) => {
                const teamUrl = IccT20TeamList.find((team) => team?.teamId == item?.id)?.teamUrl;
                return (
                  <tr key={"gp6" + index}>
                    <td>{item?.pos}</td>
                    <td>
                      <div className="table_team_name">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            `${flagUrl}/${item?.id}.png`
                          }
                          width={68}
                          height={38}
                          alt={item?.name}
                        />
                        <p>
                          <a href={teamUrl}>
                            {item?.name}
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>{item?.p}</td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.nr}</td>
                    <td>{item?.t}</td>
                    <td>{item?.nrr}</td>
                    <td>{item?.pts}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="load_more">
            <a href="/cricket/icc-t20-world-cup/points-table/">
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
