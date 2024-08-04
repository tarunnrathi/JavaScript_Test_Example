import getConfig from "next/config";

export default function ElectionHighlights({ highlightsData, elecSponserData }) {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  let sponsorDataForWidgetsHighlights = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsHighlights = Object.values(elecSponserData);
  }
  const get_title = `<i class="elecdots"></i><h2>बड़ी<span>बातें</span></h2>`;

  if(Object.keys(highlightsData).length == 0 || highlightsData == [] || highlightsData == undefined) {
    return null;
  }

  return (
    <>
      <div className="elec-glblhd under_border">
        <a
          href={`/assembly-elections/highlights${mainUrlParam}`}
          target="_blank"
          dangerouslySetInnerHTML={{ __html: get_title }}
        ></a>
        { sponsorDataForWidgetsHighlights != "" && sponsorDataForWidgetsHighlights != undefined && sponsorDataForWidgetsHighlights[0] != undefined &&
          sponsorDataForWidgetsHighlights[0][0].uploaded_img_on_off == "1" &&
          <div className="add_rhs">
            <span>{sponsorDataForWidgetsHighlights[0][0].sponser_name}</span>
            <div className="add_rhs_row">
              <a href={sponsorDataForWidgetsHighlights[0][0].click_tracker_sponser}>
                <amp-img src={sponsorDataForWidgetsHighlights[0][0].desktop_img} alt={sponsorDataForWidgetsHighlights[0][0].sponser_name} title={sponsorDataForWidgetsHighlights[0][0].sponser_name} width={94} height={40} />
              </a>
              {sponsorDataForWidgetsHighlights[0][0].amp_tracker_sponser !== "" ? (
                <div dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsHighlights[0][0].amp_tracker_sponser }}></div>
              ) : ("")}
            </div>
          </div>
        }
      </div>
      <div className="stel-hglgt">
        <div className="stel-hglgt-slider">
          <amp-carousel
            id="custom-button"
            width="400"
            height="170"
            layout="responsive"
            type="slides"
            autoplay=""
            delay="2000"
            role="region"
            aria-label="Carousel with custom button styles"
          >
            {highlightsData.map((highlight) => {
              return <a href={highlight.story_url || ""} title={highlight.headline} >{highlight.headline}</a>;
            })}
          </amp-carousel>
        </div>
        <div className="stel-hglgt-shr">
          <h3>शेयर करें</h3>
          <ul>
            <li>
              <a
                href={`https://www.facebook.com/sharer.php?u=${highlightsData[0].story_url || ""}&t=${highlightsData[0].headline || ""}`}
                className="elecsprite fcbk"
                target="_blank"
              ></a>
            </li>
            <li>
              <a
                href={`https://twitter.com/share?text=${highlightsData[0].headline || ""}&url=${highlightsData[0].story_url || ""}`}
                className="elecsprite twtr"
                target="_blank"
              ></a>
            </li>
            <li>
              <a
                href={`https://web.whatsapp.com/send?text=${highlightsData[0].headline || ""} ${highlightsData[0].story_url || ""}`}
                className="elecsprite wtsp"
                target="_blank"
              ></a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/sharer.php?u=${highlightsData[0].story_url || ""}&t=${highlightsData[0].headline || ""}`}
                className="elecsprite snd"
                target="_blank"
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .elec-glblhd {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 17px;
          color: #e1261c;
          font-weight: 600;
        }
        .elec-glblhd a {
          display: flex;
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
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
        .elecdots {
          content: "";
          background: #e1261c;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 5px;
          animation: lvdts 0.5s infinite;
        }
        @keyframes lvdts {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        body {
          padding-bottom: 133px;
        }
        .stel-hglgt {
          border: 1px solid #b6b4b4;
          position: relative;
          margin-bottom:20px;
        }
        .stel-hglgt-slider {
          position: relative;
          overflow: hidden;
          margin: 10px 15px;
        }
        .stel-hglgt-slider ul {
          display: flex;
          margin-bottom: 10px;
        }
        .stel-hglgt-slider a {
          font-weight: 600;
          display: block;
          overflow: hidden;
          font-size: 14px;
          color: #001d42;
          line-height: 22px;
          text-align: center;
        }
        .stel-hglgt-shr {
          padding: 10px;
          border-top: 1px solid #b6b4b4;
          background: #f6f6f6;
          margin: 0 -1px;
        }
        .stel-hglgt-shr h3 {
          font-size: 12px;
          color: #7e7e7e;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 5px;
        }
        .stel-hglgt-shr ul {
          justify-content: center;
          display: flex;
        }
        .stel-hglgt-shr ul li {
          margin: 0 15px;
          line-height: 22px;
        }
        .stel-hglgt-shr ul li a {
          height: 20px;
          filter: brightness(0);
          transform: scale(0.85);
        }
        .elecsprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hdrsprite_1632473468.svg)
            0 0 no-repeat;
          display: inline-block;
        }
        .elecsprite.fcbk {
          width: 10px;
          background-position: -21px 0;
          margin-left: 0;
        }
        .elecsprite.twtr {
          width: 20px;
          background-position: -32px 0;
        }
        .elecsprite.wtsp {
          width: 18px;
          background-position: -114px 0;
        }
        .elecsprite.snd {
          width: 18px;
          background-position: -151px 0;
        }
        .elecsprite.blb {
          width: 27px;
          background-position: -209px 0;
          height: 29px;
        }
      `}</style>
    </>
  );
}
