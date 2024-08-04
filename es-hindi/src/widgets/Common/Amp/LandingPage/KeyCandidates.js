import getConfig from "next/config";
import { objectToArray } from "@/includes/article.helper";
import GlobalContext from "context";
import React, { useContext } from "react";

export default function KeyCandidates({ pageData, highlight_data }) {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  const conskey = highlight_data?.key_candidates?.const_name_key;
  const { subcat, from, switch_key } = useContext(GlobalContext);
  let mainData = pageData.key_candidates;
  const stateKeys = Object.keys(mainData);
  let stateData = [];
  if (subcat !== undefined && from != "Home_Page") {
    stateKeys.forEach((data, i) => {
      if (data === subcat) {
        stateData = [...stateData, ...objectToArray(mainData[data])];
        mainData = stateData;
      } else {
        mainData=[];
      }
    });
  }

  const consCandKey = highlight_data?.key_candidates?.candidate_name_key;
  if(mainData.length == 0 || mainData == [] || mainData == undefined) {
    return null;
  }

  return (
    <div className="clearfix">
      <div className="stel-keycndthd">
        <div className="elec-glblhd">
          <a href={`/${switch_key}/key-candidates/${mainUrlParam}`} target="_blank"
            dangerouslySetInnerHTML={{ __html: highlight_data.key_candidates.h2_tag.mobile }}
          ></a>
        </div>
      </div>

      <div className="stel-keycndt-slider">
        <amp-carousel
          id="custom-button"
          width="auto"
          height="220"
          type="carousel"
          autoplay=""
          delay="2000"
          role="region"
          aria-label="Carousel with custom button styles"
        >
          {Array.isArray(mainData)&&mainData?.map((data) => {
            return (
              <a href="#">
                <figure>
                  <amp-img
                    width="62"
                    height="82"
                    src={data.cand_image}
                    alt=""
                  />
                </figure>
                <h3> {data[consCandKey]}
                  <span>{data[conskey]}</span>
                </h3>
                <div className="stel-keycndt-prt" style={{ background: data.color_code }} >
                  {data.cand_party}
                </div>
              </a>
            );
          })}
        </amp-carousel>
      </div>

      <a href={`/${switch_key}/key-candidates/${mainUrlParam}`} className="more_candidates">More Candidates</a>
      <style jsx>{`
        .stel-keycndt-slider a {
          position: relative;
          overflow: hidden;
          width: 200px;
          background: #f5f5f5;
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          text-align: center;
          padding: 15px;
        }
        .stel-keycndt-slider a figure {
          width: 90px;
          height: 90px;
          border: 1px solid #e1e1e1;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          overflow: hidden;
          border-radius: 100%;
          background: #fff;
        }
        .stel-keycndt-slider a figure amp-img {
          height: 90%;
        }
        .stel-keycndt-slider a h3 {
          font-size: 14px;
          color: #111;
          font-weight: 700;
          padding: 10px 0;
          line-height: 22px;
        }
        .stel-keycndt-slider a h3 span {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: #333;
        }
        .stel-keycndt-prt {
          width: 42px;
          height: 30px;
          line-height: 30px;
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          margin: auto;
        }
        ul.keycndt_tab {
          display: flex;
          align-items: center;
          padding-left: 20px;
        }
        ul.keycndt_tab li a {
          color: #606060;
          font-size: 12px;
          text-transform: uppercase;
        }
        ul.keycndt_tab li {
          padding: 0 11px;
        }
        ul.keycndt_tab li.active {
          background: #fff 0 0 no-repeat padding-box;
          border: 1px solid #e1261c;
          border-radius: 6px;
          height: 24px;
          line-height: 21px;
        }
        .more_candidates {
          color: #e1261c;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          margin: 10px auto 30px;
          display: table;
        }
        .more_candidates:after {
          content: "";
          width: 5px;
          height: 5px;
          display: inline-block;
          border-top: 1px solid #e1261c;
          border-right: 1px solid #e1261c;
          transform: rotate(45deg);
          position: relative;
          top: -1px;
          margin-left: 5px;
        }
      `}</style>
      <style jsx global>{`
        .elec-glblhd {
          margin-bottom: 10px;
          font-size: 17px;
          color: #e1261c;
          font-weight: 600;
          position: relative;
        }
        .elec-glblhd,
        .elec-glblhd a h2,
        .elec-glblhd h2 {
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
          font-size: 17px;
        }
        .elec-glblhd span,
        .elec-glblhd a span {
          color: #001d42;
          position: relative;
        }
      `}</style>
    </div>
  );
}
