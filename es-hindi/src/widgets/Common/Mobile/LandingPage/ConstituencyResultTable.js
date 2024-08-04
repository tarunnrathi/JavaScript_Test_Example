import { useState } from "react";

export default function ConstituencyResultTable({
  objectStoreConstRes,
  storeConstRes,
}) {
  const redirect_url =
    "/assembly-elections/:state:/:cons_name:-election-result-:CONS_ID:/?new_framework=true";
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
  const [changeStateColor, setChangeStateColor] = useState("himachal-pradesh");
  const consName = "CONS_NAME_HINDI";
  // const consTitle = "विधानसभा सीट";
  const tempYear = [2022, 2017, 2012];
  const winnerNode = "WINNER_:year:_PARTY_COLOR";
  const partyName = "WINNER_";

  const table_data_change = async (e, slug) => {
    e.preventDefault();
    const replace_state = jsonUrl.replace(/:state:/g, slug);
    let cons_table_result = await fetch(replace_state);
    cons_table_result = await cons_table_result.json();
    const store_const_res = cons_table_result[slug];
    const object_store_const_res = Object.values(store_const_res).map(
      (object_data) => {
        return object_data;
      }
    );
    setApiResultData(object_store_const_res);
    setTempKeys(Object.keys(store_const_res));
    setChangeStateColor(slug);
  };

  return !apiResultData ? null : (
    <>
      <div className="constOuter" id="rhsConstResult">
        <div className="elec-glblhd">
          <h2>
            विधानसभाः<span>सीटवार नतीजे</span>
          </h2>
        </div>
        <ul className="rhs_rabing">
          {state.map((state_code, index) => {
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
            state.map((state_code) => {
              return (
                <div
                  key={state_code.code}
                  className={`${state_code.code} tab-content ${
                    changeStateColor === state_code.slug ? "" : "hide"
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
                                    <h3>{object_data[consName]}</h3>
                                  </a>
                                </td>
                                {tempYear && tempYear !== undefined
                                  ? tempYear.map((year) => {
                                      return (
                                        <td
                                          key={year}
                                          style={{
                                            background:
                                              object_data[
                                                winnerNode.replace(
                                                  ":year:",
                                                  year
                                                )
                                              ],
                                            color: "#fff",
                                          }}
                                        >
                                          {object_data[partyName + year]}
                                        </td>
                                      );
                                    })
                                  : null}
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
      <style jsx global>{`
        .constOuter {
          background: #f6f6f6;
          padding: 6px 0 0 0;
          margin-bottom: 30px;
        }
        .constOuter .elec-glblhd {
          padding: 2px 10px 0px 10px;
        }
        ul.rhs_rabing {
          display: flex;
          align-items: center;
          margin: 0 10px 10px 10px;
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
        .tableWrap {
          max-height: 400px;
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
        .tableWrap table td a h3 {
          color: #fff;
          font-size: 13px;
          font-weight: normal;
        }
        .tableWrap table td:first-child a {
          color: #464646;
        }
        .tableWrap table td:first-child a h3 {
          color: #464646;
        }
        .tableWrap table th {
          background: #001d42;
          position: sticky;
          left: 0;
          top: 0;
          padding: 10px 8px;
          font-size: 11px;
          border-top: 4px transparent;
          text-transform: uppercase;
          color: #fff;
          font-weight: bold;
          text-align: center;
        }
        .tableWrap table th:nth-child(1),
        .tableWrap table td:nth-child(1) {
          width: 140px;
          text-align: left;
        }
        .elec-glblhd {
          margin-bottom: 4px;
          font-size: 17px;
          color: #e1261c;
          font-weight: 600;
          position: relative;
        }
        .elec-glblhd,
        .elec-glblhd a {
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
        }
        .elec-glblhd span,
        .elec-glblhd a span {
          color: #001d42;
          position: relative;
        }
        .constResultWrap .rhs_rabing {
          margin-bottom: 10px;
        }
        ul.rhs_rabing li.active {
          background: #e1261d;
          border-color: #e1261d;
        }
        ul.rhs_rabing li.active a {
          color: #fff;
        }
        .jh_filterddown {
          margin-bottom: 5px;
          padding: 0 10px;
        }
        .multi-select-container {
          position: relative;
          display: block;
        }
        .multi-select-menu {
          position: absolute;
          left: 0;
          top: 104%;
          z-index: 1;
          float: left;
          min-width: 100%;
          background: #fff;
          border: 1px solid #cacaca;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          display: none;
        }
        .multi-select-menuitem {
          display: block;
          font-size: 14px;
          padding: 0.6em 1em 0.6em 30px;
          white-space: nowrap;
          text-transform: capitalize;
        }
        .multi-select-menuitem + .multi-select-menuitem {
          padding-top: 0;
        }
        .multi-select-presets {
          border-bottom: 1px solid #ddd;
        }
        .multi-select-menuitem input {
          position: absolute;
          margin-top: 0.25em;
          margin-left: -20px;
        }
        .multi-select-button {
          text-transform: capitalize;
          display: block;
          padding: 8px 10px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: -0.5em;
          background-color: #fff;
          border: 1px solid #cacaca;
          cursor: default;
          box-sizing: border-box;
          font-size: 14px;
        }
        .multi-select-button:after {
          content: "";
          width: 10px;
          height: 16px;
          position: absolute;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/state-2021-election/dropdown_icon.png);
          top: 10px;
          right: 7px;
          cursor: pointer;
        }
        .multi-select-container--open .multi-select-menu {
          display: block;
        }
        .jhcountday-tallymap-details {
          line-height: 1.1;
        }
        .assembly_election_rhs {
          border: 1px solid #b6b4b4;
          position: relative;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
