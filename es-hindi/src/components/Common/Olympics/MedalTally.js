import { olympics_year } from "api/Constant";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { TaboolaList } from "includes/Tabola.helper";
import Taboola from "widgets/Common/Responsive/Taboola";

const MedalTally = (props) => {
  const { rhs } = TaboolaList.homePage;
  return (
    <>
      <div className="olympics-right">
        {!props?.isMobile && (
          <div style={{ marginTop: "10px" }}>
            <NewSiteAd
              slotId={"ATF_300_id"}
              adUnit={props?.pageAds?.ATF_300_id}
              sizes={[
                [300, 250]
              ]}
              width={300}
              // removeAdSpan={true}
              height={250}
              lazyLoad={true}
            />
          </div>
        )}
        <div id="medals-tally-widget" style={{ marginTop: "20px" }}>
          <div className="madel_tally vspacer20">
            <div className="madel_tally_top">
              <div className="medalHopeHeadingInner">
                <h3 className="heading-1">Paris olympics {olympics_year}</h3>
                <h2 className="heading-2">पदक तालिका</h2>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Country</th>
                  <th valign="top">
                    <img src="/images/olympics/gold.svg" />
                  </th>
                  <th valign="top">
                    <img src="/images/olympics/silver.svg" />
                  </th>
                  <th valign="top">
                    <img src="/images/olympics/bronze.svg" />
                  </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {props?.medalTally?.medals?.length > 0 &&
                  props?.medalTally?.medals?.map((item, index) => {
                    return (
                      <tr key={"medalTally_" + index} style={index === 0? {backgroundColor:"#ef4e37"} : {}}>
                        <td>{item?.rank}</td>
                        <td>{item?.country}</td>
                        <td>{item?.gold}</td>
                        <td>{item?.silver}</td>
                        <td>{item?.bronze}</td>
                        <td>{item?.total}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="full_table">
              <a href="/sports/olympics/medals-tally/">FULL TABLE [+]</a>
            </div>
          </div>
          <div className="olympics-right">
            {props?.isMobile && !props?.pageType === "home" && (
              <div style={{ marginTop: "15px" }}>
                <div className="add">
                  <div className="addinner-box">
                    <NewSiteAd
                      slotId="Mobile_BTF_300_2"
                      width={336}
                      height={280}
                      adUnit={props?.pageAds?.BTF_300_id}
                      sizes={[
                        [300, 250],
                        [336, 280],
                        [250, 250],
                      ]}
                      lazyLoad={true}
                    ></NewSiteAd>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          {!props?.isMobile && (
            <NewSiteAd
              slotId={"MTF_300_id"}
              adUnit={props?.pageAds?.MTF_300}
              sizes={[
                [300, 250]
              ]}
              width={300}
              // removeAdSpan={true}
              height={250}
              lazyLoad={true}
            />
          )}
        </div>
        {(!props?.pageType === "home" || props?.pageType === 'schedule') && (
          <div style={{ marginTop: "10px" }}>
            <Taboola
              mode={rhs.mode}
              id={rhs.id}
              container={rhs.container}
              placement={rhs.placement}
            />
          </div>
        )}

        {!props?.isMobile && props?.pageType === "schedule" && (
          <div style={{ marginTop: "15px" }}>
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_BTF_300_6"
                  width={336}
                  height={280}
                  adUnit={props?.pageAds?.BTF_300_id}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyLoad={true}
                ></NewSiteAd>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
            .madel_tally .page_title {
               margin-bottom: 0
            }

            .madel_tally table {
               width: 100%;
               border-collapse: collapse;
               border-spacing: 0;
               margin-bottom: 10px
            }

            .madel_tally tr th {
               color: #fff;
               text-transform: uppercase;
               font-size: 12px;
               width: 30px;
               height: 50px
            }

            .madel_tally thead {
               height: 50px;
               background: #222
            }
            .madel_tally tr th:first-child, .madel_tally tr th:last-child {
               text-align: left;
               padding-left: 10px;
            }
            .madel_tally tr th:nth-child(2) {
               text-align: left;
               padding-left: 10px;
               width: 100px
            }

            .madel_tally tr td {
               text-align: center;
               font-size: 13px;
               color: #111;
               height: 40px
            }

            .madel_tally tr td:first-child, .madel_tally tr td:nth-child(2) {
               text-align: left;
               padding-left: 10px
            }

            .madel_tally tbody tr {
               border-bottom: 1px #d8d8d8 solid;
               background: #fff
            }

            .madel_tally_top {
               background: #fff
            }

            .madel_tally_top .medalHopeHeadingInner {
               max-width: 100%;
               margin: 0;
               padding: 0
            }
.medalHopeHeadingInner {
          text-align: left;
          margin: 0 auto;
          max-width: 45%;
          padding-top: 11px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin: 0;
         padding: 0
          line-height: 33px;
          text-transform: uppercase;
        }
            

            .madel_tally_table table thead img {
               padding-right: 7px
            }

            .full_table {
               display: flex;
               align-items: center;
               background: #fff
            }

            .full_table::before,
            .full_table::after {
               content: "";
               background: #f5f5f5;
               width: 100%;
               height: 20px
            }

            .full_table a {
               color: red;
               text-transform: uppercase;
               font-size: 11px;
               flex-shrink: 0;
               padding: 0 15px
            }

            .madel_tally tr th img {
               max-height: 46px;
               transform: scale(1.3);
               padding: 10px 0 0
            }

            .madel_tally tbody tr.active {
               background: #EFEFEF;
               font-weight: 700
            }

            .madel_tally tbody {
               border: 1px solid #D8D8D8;
            }

            @media (max-width:768px) {
               #medals-tally-widget {
                  padding: 0 10px;
               }

               .madel_tally thead {
                  border: 1px solid #222222;
               }

               .full_table {
                  border: 1px solid #C0C0C0;
                  background-color: #F4F4F4;
                  height: 36px;
               }

               .full_table a {
                  font-size: 12px;
                  color: #E1261D;
                  text-decoration: none;
               }
            }
            `}</style>
    </>
  );
};
export default MedalTally;
