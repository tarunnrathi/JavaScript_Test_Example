import { useState } from "react";

export default function ConstituencyResultTable({
  objectStoreConstRes,
  storeConstRes,
}) {
  const redirect_url =
    "/assembly-elections/:state:/:cons_name:-election-result-:CONS_ID:/";

  const state = [
    {
      title: "हिमाचल प्रदेश",
      eng_title: "Himachal Pradesh",
      slug: "himachal-pradesh",
      code: "HP",
      is_default: false,
      sort_by: 0,
      imageUrl:
        "https://images.news18.com/static_news18/pix/ibnhome/news18/assembly-election-2022/small_maps/himachal_pradesh_map_sml.png",
      no_of_seat: 403,
      ls_no_of_seat: 0,
      tag_slug: "himachal-pradesh-elections",
      desktop_viewport: "0 0 800 640",
      mobile_viewport: "0 0 800 740",
    },
    {
      title: "गुजरात",
      eng_title: "Gujarat",
      slug: "gujarat",
      code: "GJ",
      is_default: false,
      sort_by: 3,
      imageUrl:
        "https://images.news18.com/static_news18/pix/ibnhome/news18/assembly-election-2022/small_maps/gujarat_map_sml.png",
      no_of_seat: 117,
      ls_no_of_seat: 0,
      tag_slug: "gujarat-elections",
      desktop_viewport: "0 50 800 640",
      mobile_viewport: "-20 50 860 680",
    },
  ];

  const [apiResultData, setApiResultData] = useState(objectStoreConstRes);
  const [tempKeys, setTempKeys] = useState(Object.keys(storeConstRes));
  const jsonUrl =
    "https://election.nw18.com/electiondata/electionjson/assembly_election_dec_2022/:state:/:state:_all_const_old_results_rhs.json";

  const consName = "CONS_NAME_HINDI";
  const tempYear = [2022, 2017, 2012];
  const winnerNode = "WINNER_:year:_PARTY_COLOR";
  const partyName = "WINNER_";
  const [changeStateColor, setChangeStateColor] = useState("himachal-pradesh");

  const table_data_change = async (e, slug) => {
    e.preventDefault();
    const replace_state = jsonUrl.replace(/:state:/g, slug);
    let cons_table_result = await fetch(replace_state);
    cons_table_result = await cons_table_result.json();
    const store_const_res = cons_table_result.data[slug];
    const object_store_const_res = Object.values(store_const_res).map(
      (object_data) => {
        return object_data;
      }
    );
    setApiResultData(object_store_const_res);
    setTempKeys(Object.keys(store_const_res));
    setChangeStateColor(slug);
  };
  if (!apiResultData) {
    return null;
  }

  return (
    <>
      <div className="constOuter">
        <div className="elec-glblhd">
          <a href="#">
            <h2>
              विधानसभाः<span>सीटवार नतीजे</span>
            </h2>
          </a>
        </div>
        <ul className="rhs_rabing">
          {state &&
            state.map((state_code, index) => {
              return (
                <li
                  className={
                    changeStateColor == state_code.slug
                      ? "tab-links active"
                      : "tab-links"
                  }
                  key={`state${index}`}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table_data_change(e, state_code.slug);
                    }}
                  >
                    {state_code.code}
                  </a>
                </li>
              );
            })}
        </ul>

        <div className="tableWrap">
          {state &&
            state.map((state_code, index) => {
              return (
                <div
                  className={`${state_code.code} tab-content ${
                    changeStateColor == state_code.slug ? "" : "hide"
                  }`}
                  id={`rhs-table-${state_code.slug}`}
                >
                  <table cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <th>{"विधानसभा सीट"}</th>
                        <th>2022</th>
                        <th>2017</th>
                        <th>2012</th>
                      </tr>

                      {apiResultData &&
                        apiResultData.length == tempKeys.length &&
                        apiResultData.map((object_data, index) => {
                          return (
                            object_data && (
                              <tr key={`${index}table`}>
                                <td>
                                  <a
                                    href={redirect_url
                                      .replace(":state:", changeStateColor)
                                      .replace(
                                        ":cons_name:",
                                        object_data.CONS_NAME.replace(
                                          " ",
                                          "-"
                                        ).toLowerCase()
                                      )
                                      .replace(":CONS_ID:", tempKeys[index])}
                                  >
                                    {object_data[consName]}
                                  </a>
                                </td>
                                {tempYear.map((year, index) => {
                                  return (
                                    <td
                                      key={`row${index}`}
                                      style={{
                                        background:
                                          object_data[
                                            winnerNode.replace(":year:", year)
                                          ],
                                        color: "#fff",
                                      }}
                                    >
                                      {object_data[partyName + year]}
                                    </td>
                                  );
                                })}
                              </tr>
                            )
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
      <style jsx>{`
        ul.rhs_rabing {
          display: flex;
          align-items: center;
          padding: 10px !important;
        }
        ul.rhs_rabing li {
          width: 37px;
          height: 26px;
          background: #e5e5e5 0% 0% no-repeat padding-box;
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          line-height: 26px;
          text-align: center;
          margin-right: 5px;
        }
        ul.rhs_rabing li a {
          color: #606060;
          font-size: 13px;
        }
        ul.rhs_rabing li.active {
          background: #e1261d;
          border-color: #e1261d;
        }
        ul.rhs_rabing li.active a {
          color: #fff;
        }
        .elec-right {
          width: 300px;
          float: right;
        }
        .constOuter {
          background: #f6f6f6;
          padding: 6px 0 0 0;
          margin-bottom: 20px;
        }
        .constOuter .elec-glblhd {
          padding: 2px 10px 0px 10px;
        }
        .tableWrap {
          max-height: 490px;
          overflow: auto;
        }
        .tableWrap table {
          width: 100%;
          border-collapse: collapse;
        }
        .tableWrap table th,
        .tableWrap table td {
          border: 1px solid #d7d7d7;
          padding: 10px 6px;
          text-align: center;
        }
        .tableWrap table td {
          text-transform: uppercase;
          font-size: 13px;
          max-width: 70px;
        }
        .tableWrap table td:first-child {
          text-transform: initial;
        }
        .tableWrap table td a {
          color: #fff;
        }
        .tableWrap table td:first-child a {
          color: #464646;
        }
        .tableWrap table th {
          background: #001d42;
          position: sticky;
          left: 0;
          top: 0;
          padding: 25px 8px 8px 8px;
          font-size: 11px;
          border-top: 4px transparent;
          text-transform: uppercase;
          color: #fff;
          font-weight: 500;
          text-align: center;
        }
        .tableWrap table th:nth-child(1),
        .tableWrap table td:nth-child(1) {
          width: 140px;
          text-align: left;
        }
        // .elec-glblhd {
        //   display: flex;
        //   justify-content: space-between;
        //   margin-bottom: 10px;
        //   font-size: 13px;
        //   color: #e1261c;
        //   font-weight: 500;
        // }
        // .elec-glblhd a {
        //   display: flex;
        //   color: #e1261c;
        //   text-transform: uppercase;
        //   align-items: center;
        // }
        // .elec-glblhd a span {
        //   margin-left: 5px;
        //   color: #001d42;
        //   position: relative;
        // }
        // .elec-glblhd a span:after {
        //   content: "";
        //   position: absolute;
        //   width: 100%;
        //   height: 3px;
        //   background: #e1261c;
        //   bottom: -3px;
        //   left: 0;
        // }
      `}</style>
    </>
  );
}
