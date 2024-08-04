import React from "react";

export default function SelectStateAmp(props) {
  const state = "";
  // const [stateDetail, setStateDetail] = useState(-1);
  let filteredItems;
  if (props.districtList?.cityData) {
    filteredItems = props.districtList.cityData.filter(
      (item) =>
        item.name.indexOf(state.toLowerCase()) != -1 ||
        item.slug.indexOf(state.toLowerCase()) != -1
    );
  }
  // const handleChange = ({ target }) => {
  //   setState(target.value);
  // };
  // const showStateDetail = (target) => {
  //   setStateDetail((prev) => (target == prev ? -1 : target));
  // };
  const topCityData = (itemData) => {
    const { stateData } = props.districtList;
    const { cityData } = props.districtList;
    for (const state of stateData) {
      if (state.id === itemData.parent) {
        return `/news/${state.slug}/${itemData.slug}/`;
      } else {
        if (itemData.parent !== 0) {
          for (const city of cityData) {
            if (city.id === itemData.parent) {
              return `/news/${city.slug}/${itemData.slug}/`;
            }
          }
        } else {
          return `/news/${itemData.slug}/`;
        }
      }
    }
  };
  return (
    <>
      <div
        className={`tpchpp ng-scope ${props.showStates ? "adclstpchpp" : ""}`}
      >
        <div className={`tpchppus ${props.showStates ? "adclstpchppus" : ""}`}>
          <a on="tap:distcrictlistpopup.toggle" className="chcls" href="#"></a>
          <div className="tpchpp-in">
            <div className="tpchthds">अपना शहर चुनें</div>
            <div className="tpchtnms">
              <div className="state-div1 tpctlits ng-hide">
                <ul className="autoboxinner">
                  {state && !filteredItems.length ? (
                    <li style={{ width: "auto" }}>No filtered items</li>
                  ) : (
                    <>
                      {filteredItems &&
                        filteredItems.map((item, index) => (
                          <React.Fragment key={"filteredItemss" + index}>
                            {index < 20 && (
                              <li key={index} className="ng-scope ">
                                <a
                                  href={topCityData(item)}
                                  className="districtSelect"
                                  data-vars-event-category="Local18_Select"
                                  data-vars-event-label={`${item.name}`}
                                >
                                  {item.name}
                                </a>
                              </li>
                            )}
                          </React.Fragment>
                        ))}
                    </>
                  )}
                </ul>
              </div>
            </div>
            <span className="tpchd">राज्य</span>
            <div className="tpstnm">
              {props.districtList?.stateData &&
                props.districtList.stateData.map((item, index) =>
                  item.child && item.child.length ? (
                    <React.Fragment key={"stateData1" + index}>
                      {/* <amp-accordion id={"my-accordion"} data-vars-expand-single-section> */}
                      <section key={index}>
                        <a
                          style={{ border: "none", background: "transparent" }}
                        >
                          {item.name}
                        </a>
                        <div className="tpstnm-sublist">
                          {item.child.map((element) => (
                            <React.Fragment key={"sublist" + index}>
                              <a
                                href={`/news/${item.slug}/${element.slug}/`}
                                className="districtSelect"
                                data-vars-event-category="Local18_Select"
                                data-vars-event-label={`${element.name}`}
                              >
                                {element.name}
                              </a>
                            </React.Fragment>
                          ))}
                        </div>
                      </section>
                      {/* </amp-accordion> */}
                    </React.Fragment>
                  ) : (
                    <div key={index}>
                      <a
                        href={`/news/${item.slug}`}
                        className="nochild"
                        data-vars-event-category="Local18_Select"
                        data-vars-event-label={`${item.name}`}
                      >
                        {item.name}
                      </a>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .nochild {
          font-size: 14px;
          padding: 11px 20px;
          color: #222;
          display: block;
          line-height: 20px;
          border: "none";
          background: "transparent";
          font-weight: 700;
        }
        .tpchpp.adclstpchpp {
          transition: 0.2s ease-in-out;
          visibility: visible;
          opacity: 1;
        }
        .tpchpp {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          // background: rgba(0, 0, 0, 0.4);
          transition: 0.2s ease-in-out;
          visibility: hidden;
          opacity: 0;
          z-index: 21;
        }
        .tpchthds {
          text-align: center;
          color: #e1261d;
          font-size: 18px;
          line-height: 36px;
          margin: 15px 0;
          font-weight: bold;
        }
        .tpchpp-in {
          overflow-y: scroll;
          overflow-x: hidden;
          width: 295px;
          height: 100%;
          margin-left: 24px;
          background: #f7f7f7;
          box-shadow: 0px -5px 10px #777;
        }
        .tpchppus.adclstpchppus {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        .tpchppus {
          position: fixed;
          top: 0;
          bottom: 0;
          right: -306px;
          z-index: 20;
          width: 306px;
          overflow: hidden;
          transition: all 0.5s ease-in-out;
        }
        .chcls {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/chstclose_1669725434.png)
            0 0 no-repeat;
          width: 33px;
          height: 33px;
          position: absolute;
          top: 5px;
          left: 0px;
          z-index: 1;
          cursor: pointer;
        }

        .tpchtnms {
          margin: 0 8px;
        }
        .tpctlits ul {
          display: flex;
          padding: 10px 0 0 20px;
          flex-wrap: wrap;
          box-sizing: border-box;
        }
        .tpctlits ul li {
          width: 50%;
          font-size: 14px;
          margin: 12px 0;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_1607493481.png)
            0 0 no-repeat;
          box-sizing: border-box;
          padding-left: 28px;
        }
        .tpctlits ul li a {
          color: #222;
        }
        .tpchd {
          background: #fff;
          border-bottom: 2px solid #e1261d;
          text-transform: uppercase;
          font-size: 16px;
          padding: 15px 20px 12px 20px;
          box-shadow: 0px 3px 6px #00000029;
          color: #444;
          display: block;
        }

        .tpstnm section a {
          font-size: 14px;
          padding: 9px 12px;
          color: #222;
          display: block;
          line-height: 20px;
          background-color: #e1e1e1;
          margin: 8px;
          border-radius: 4px;
          margin-bottom: 0;
          display: inline-block;
          width: 42%;
        }
        .tpstnm section > a {
          font-size: 14px;
          padding: 9px 12px;
          color: #222;
          display: block;
          line-height: 20px;
          margin: 8px;
          margin-bottom: 0;
          font-weight: 900;
          width: 100%;
        }
        .tpstnm section.active a {
          font-weight: bold;
        }
        .tpstnm section.active h5 {
          font-weight: bold;
        }
        .tpstnm section:after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          border-left: 2px solid #606060;
          border-bottom: 2px solid #606060;
          transform: rotate(-45deg);
          top: 20px;
          right: 24px;
          transition: 0.2s ease-in-out;
        }
        .tpstnm ul {
          flex-wrap: wrap;
          box-sizing: border-box;
        }
        .tpstnm section .tpstnm-sublist {
          display: flex;
          flex-wrap: wrap;
        }
        .tpstnm-sublist {
          display: flex;
          flex-wrap: wrap;
        }
        .tpstnm-sublist {
          display: none;
          border-radius: 0 0 15px 15px;
          margin: 0 10px 0 10px;
          padding: 5px 0 12px 0;
        }
        .tpstnm section {
          position: relative;
          cursor: pointer;
        }
        .noarrow::after {
          display: none;
        }
        .tpstnm li.active div a {
          font-weight: normal;
        }
        .tpchppus.adclstpchppus {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        body {
          overflow: ${props.showStates ? "hidden" : ""};
        }
      `}</style>
    </>
  );
}
