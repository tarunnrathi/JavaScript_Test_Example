import getConfig from "next/config";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

const { publicRuntimeConfig } = getConfig();
export default function Byline({ agency, agencyFull = {}, li, lastUpdated, isMobile=false,isAmp=false,GA4Data = {}}) {
  let inHindi = "",
    inEnglish = "";
  if (agency) {
    inHindi = agencyFull.hindi || "";
    inEnglish =
      agencyFull?.english !== ""
        ? agencyFull.english.toLowerCase().replace(/\s/g, "-") + "/"
        : "";
  }
  let comp;
  if (agency === "moneycontrol") {
    comp = (
      <span>
        <a
          href="https://www.moneycontrol.com/"
          rel="nofollow"
          target="_blank"
          onClick="ga('send', 'event', 'MC_Agency', 'Click', 'Article Page: {originalurl}');"
        >
          <span className="money_agency">moneycontrol</span>
        </a>
      </span>
    );
  } else if (agency !== "") {
    comp = (
      <>
        <span style={{margin:'0 10px'}} className="cp_byline_agency" id="byline_agency_cp">
          <a href={`${publicRuntimeConfig.siteUrl}agency/${inEnglish}`} className="cp_byline_agency">
            {inHindi}
          </a>
          <AmpAnalyticsGA4Events
            id="byline_agency_cp"
            event_name={"byline_agency_cp"}
            cta_name={agency}
            section={GA4Data?.section || ""}
            subsection={GA4Data?.sub_section || ""}
            article_id={GA4Data?.article_id}
            type_of_article={GA4Data?.type_of_article || ""}
            local18_district={GA4Data?.local18_district || ""}
            domain="https://hindi.news18.com/"
          />
        </span>
        {((isMobile || isAmp) && lastUpdated)? <time>{lastUpdated}</time>:null}
      </>
    );
  } else {
    comp = (
      <>
        <span style={{margin:'0 10px'}} className="cp_byline_agency">
          <a href={`${publicRuntimeConfig.siteUrl}agency/news18hindi/`} className="cp_byline_agency">
            News18 हिंदी
          </a>
        </span>
        {lastUpdated ? lastUpdated : null}
        {/* <div class="artclbyeline-author-intro _web-inspector-hide-shortcut_"><span className="auth_head_img">Translated by :</span><a href={`${publicRuntimeConfig.siteUrl}`}><span>{translatedBy}</span></a> </div> */}
      </>
    );
  }
  if (!li) {
    return <li>{comp}</li>;
  }

  return comp;
}
