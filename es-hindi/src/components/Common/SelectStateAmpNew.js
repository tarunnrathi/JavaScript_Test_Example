export default function SelectStateAmpNew(props) {
  return (
    <>
      <div
        className={`tpchpp ng-scope ${props.showStates ? "adclstpchpp" : ""}`}
      >
        <div className={`tpchppus ${props.showStates ? "adclstpchppus" : ""}`}>
          <a className="chcls" on="tap:AMP.setState({visible: !visible})"></a>
          <div className="tpchpp-in">
            <h2 className="tpchthds">अपना शहर चुनें</h2>
            <div className="tpstnm">
              {props.districtList?.stateData &&
                props.districtList.stateData.map((item, index) =>
                  item.child && item.child.length ? (
                    <>
                      <amp-accordion
                        id={"my-accordion"}
                        data-vars-expand-single-section
                      >
                        <section key={index}>
                          <h5
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                          >
                            {item.name}
                          </h5>
                          <div className="tpstnm-sublist">
                            {item.child.map((element, index) => (
                              <>
                                <a
                                  href={`/news/${item.slug}/${element.slug}/`}
                                  className="districtSelect"
                                  data-vars-event-category="Local18_Select"
                                  data-vars-event-label={`${element.name}`}
                                  key={index}
                                >
                                  {element.name}
                                </a>
                              </>
                            ))}
                          </div>
                        </section>
                      </amp-accordion>
                    </>
                  ) : (
                    <div>
                      <a
                        href={`/news/${item.slug}`}
                        className="nochild"
                        data-vars-event-category="Local18_Select"
                        data-vars-event-label={`${item.name}`}
                      >
                        {item.name}
                      </a>
                    </div>
                  ),
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
          border-radius: 20px;
          margin-bottom: 5px;
          background-color: #f1f1f1;
        }
        .tpchpp.adclstpchpp {
          transition: 0.2s ease-in-out;
          visibility: visible;
          opacity: 1;
        }
        .tpchpp {
          position: absolute;
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
        .shrmobwrap .tpchthds {
          text-align: left;
          color: #fff;
          font-size: 18px;
          line-height: 30px;
          margin-bottom: 10px;
          margin-top: 0;
          display: inline-block;
        }
        .shrmobwrap .tpchpp-in {
          overflow-y: scroll;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
          background: #000000;
          box-shadow: 0px -5px 10px #777;
          margin: 0;
          padding: 20px 25px;
        }
        .tpchppus.adclstpchppus {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        .shrmobwrap .tpchppus {
          position: relative;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 20;
          width: 100%;
          margin: 0;
          height: 100%;
          overflow: auto;
          transition: all 0.5s ease-in-out;
        }
        // .chcls {
        //   background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/chstclose_1669725434.png) 0 0 no-repeat;
        //   width: 33px;
        //   height: 33px;
        //   position: absolute;
        //   top: 5px;
        //   left: 0px;
        //   z-index: 1;
        //   cursor: pointer;
        // }

        .shrmobwrap .chcls:after {
          transform: rotate(-45deg);
        }

        .shrmobwrap .chcls:before {
          transform: rotate(45deg);
        }
        .shrmobwrap .chcls:before,
        .shrmobwrap .chcls:after {
          content: "";
          position: absolute;
          width: 2px;
          height: 16px;
          background: #fff;
          top: 0;
          left: 4px;
        }
        .shrmobwrap .chcls {
          background: transparent;
          width: 20px;
          height: 20px;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          position: absolute;
          top: 5px;
          right: 0px;
          z-index: 1;
          cursor: pointer;
          left: unset;
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
        }
        .tpstnm section h5 {
          padding: 9px 12px;
          margin: 8px 8px 0;
          font-size: 14px;
          color: #000;
          line-height: 23px;
          font-weight: normal;
        }
        .tpstnm section a {
          background-color: #e1e1e1;
          border-radius: 4px;
          display: inline-block;
          width: 42%;
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
          top: 14px;
          right: 24px;
          transition: 0.2s ease-in-out;
        }
        .tpstnm ul {
          flex-wrap: wrap;
          box-sizing: border-box;
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
          border-radius: 20px;
          margin-bottom: 5px;
          background-color: #f1f1f1;
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
        .shrmobwrap .tpstnm section a {
          padding: 5px 20px 5px 0;
          color: #fff;
          background-color: transparent;
          line-height: 20px;
        }
        .tpstnm section[expanded] {
          background-color: #727272;
          padding: 0 20px;
        }
        .tpstnm section[expanded] h5 {
          color: #fff;
          font-size: 16px;
          line-height: 27px;
          border-bottom: 1px solid#fff;
          margin: 0;
          margin-bottom: 10px;
        }
        .tpstnm section[expanded]:after {
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
        }
        .shrmobwrap .tpchpp {
          z-index: 1;
        }
        .tpstnm section[expanded] h5:after {
          border-bottom: 1px solid #fff;
          width: 100%;
          height: 1px;
          display: block;
          content: "";
          opacity: 1;
          margin-top: 2px;
        }
      `}</style>
    </>
  );
}
