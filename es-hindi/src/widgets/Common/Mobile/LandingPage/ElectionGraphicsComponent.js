import { imageLoader } from "includes/article.util";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ElectionGraphicsComponent = ({ graphicsData, elecSponserData }) => {
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";

  let sponsorDataForWidgetsGraphics = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsGraphics = Object.values(elecSponserData);
  }

  try {
    return graphicsData === undefined ||
    graphicsData === null ||
    graphicsData === [] ||
    graphicsData === {} ? null : (
      <>
        {/* <!-- graphic start--> */}
        <div className="elec-glblhd elec-glblhd-highlight under_border">
          <div>
            <a href={`/assembly-elections/graphics${mainUrlParam}`} target="_blank">
              <h2>ग्राफिक्स</h2>
            </a>
          </div>
          { sponsorDataForWidgetsGraphics != "" && sponsorDataForWidgetsGraphics != undefined && sponsorDataForWidgetsGraphics[0] != undefined &&
          sponsorDataForWidgetsGraphics[0][0].uploaded_img_on_off == "1" &&
            <div className="add_rhs">
              <span>{sponsorDataForWidgetsGraphics[0][0].sponser_name}</span>
              <div className="add_rhs_row">
                <a href={sponsorDataForWidgetsGraphics[0][0].click_tracker_sponser}>
                  <img src={sponsorDataForWidgetsGraphics[0][0].desktop_img} alt={sponsorDataForWidgetsGraphics[0][0].sponser_name} title={sponsorDataForWidgetsGraphics[0][0].sponser_name} />
                </a>
                {sponsorDataForWidgetsGraphics[0][0].impression_tracker_sponser !== "" ? (
                  <div dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsGraphics[0][0].impression_tracker_sponser }}></div>
                ) : ("")}
              </div>
            </div>
          }
        </div>
        <div className="election_graphics">
          <a href={`/assembly-elections/graphics${mainUrlParam}`} target="_blank">
            <figure>
              {graphicsData[0].image ? (
                // <Image
                //   src={imageLoader(graphicsData[0].image, 328, 361, true, true)}
                //   width={328}
                //   height={361}
                //   alt={graphicsData[0].image.alt || ""}
                //   title={graphicsData[0].image_caption || ""}
                //   priority={true}
                //   layout="responsive"
                //   unoptimized={true}
                // />
                <img
                src={imageLoader(graphicsData[0].image, 328, 361, true, true)}
                alt={graphicsData[0].image.alt || ""}
                title={graphicsData[0].image_caption || ""}
                />
              ) : null}
              <figcaption>
                {/* {typeof graphicsData[0] !== "undefined" && graphicsData[0].date_time ? (
                  <span>{moment(graphicsData[0].date_time).format("MMMM DD,YYYY")}</span>
                ) : null} */}
                {typeof graphicsData[0] !== "undefined" && graphicsData[0].headline ? (
                  <h3 className="election_graphics_title">
                    {graphicsData[0].headline || ""}
                  </h3>
                ) : null}
              </figcaption>
            </figure>
          </a>
        </div>
        {/* <!-- graphic end--> */}
        <style jsx>{`
          .elec-glblhd {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 18px;
            color: #e1261c;
            font-weight: 500;
          }
          .elec-glblhd a {
            display: flex;
            color: #e1261c;
            text-transform: uppercase;
            align-items: center;
            font-size: 13px;
            font-weight: 500;
          }
          .elec-glblhd a span {
            margin-left: 5px;
            color: #001d42;
            position: relative;
          }
          .elec-glblhd a span:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 3px;
            background: #e1261c;
            bottom: -3px;
            left: 0;
          }
          .election_graphics {
            width: 100%;
            background: #f6f6f6 0% 0% no-repeat padding-box;
            border: 1px solid #b6b4b4;
            margin-bottom: 30px;
          }
          .election_graphics img {
            width: 100%;
            display: block;
          }
          .election_graphics figcaption {
            padding: 10px;
          }
          .election_graphics span {
            color: #949494;
            font-size: 12px;
            padding-bottom: 5px;
            display: block;
          }
          .election_graphics_title {
            color: #282828;
            font-size: 18px;
            line-height: 22px;
            font-weight: 600;
            font-family: "Playfair Display", serif;
          }
          .hindifont .elec-glblhd,
          .hindifont .elec-glblhd a h2,
          .elec-glblhd a {
            font-size: 18px !important;
          }
        `}</style>
        <style jsx global>{`
          .hindifont .elec-glblhd,
          .hindifont .elec-glblhd a h2,
          .elec-glblhd a {
            font-size: 18px !important;
            font-family: "khand";
          }
          .elec-glblhd-highlight {
            display: flex;
            margin-bottom: 10px;
            font-size: 18px;
            color: #e1261c;
            font-weight: 500;
          }
          .elec-glblhd-highlight a {
            display: flex;
            color: #e1261c;
            text-transform: uppercase;
            align-items: center;
            font-size: 13px;
            font-weight: 500;
          }
          .elec-glblhd-highlight a span {
            margin-left: 5px;
            color: #001d42;
            position: relative;
          }
          .elec-glblhd-highlight a span:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 3px;
            background: #e1261c;
            bottom: -3px;
            left: 0;
          }
        `}</style>
      </>
    );
  } catch (e) {
    console.log("ElectionGraphicsComponent error ", e);
    return null;
  }
};
export default ElectionGraphicsComponent;
