import { Fragment } from "react";
import LazyLoadImage from "./CustomImage";
import { STATIC_IMAGE } from "constant/global/Constant";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

export default function BylineAuthor({
  authors = [],
  isMobile,
  authorByline = [],
  isPhoto,
  isAmp,
  GA4Data={},
}) {
  const auths = authorByline?.length
    ? authorByline.filter(
        (item) => item.nicename?.toLowerCase() !== "news18hindi"
      )
    : "";
  
  const count = auths.length ? 0 : authors.reduce((prev, next) => {
    return (prev += next[Object.keys(next)]?.length);
  }, 0);
  if (auths?.length) {
    authors = [
      {
        auths,
      },
    ];
  }
  return authors.map((type, ind) => {
    let head = Object.keys(type)[0];
    const arr = type[head];
    if (head === "auths") {
      head = "Author";
    }
    return arr.map((bylineAuthor, key) => {
      if (
        bylineAuthor &&
        bylineAuthor.status === "1" &&
        bylineAuthor.nicename &&
        bylineAuthor.nicename.toLowerCase() !== "news18hindi"
      ) {
        const link = `/byline/${bylineAuthor.nicename.replace("_", "-")}-${
          bylineAuthor.id
        }.html`;
        if (isPhoto && (isMobile || isAmp)) {
          return (
            <li key={"authorByline" + ind} className="hilight">
              <span>{head}</span>
              <figure style={{ display: "inline-table" }}>
                <a href={link}>
                  {isAmp ? (
                    <LazyLoadImage
                      isAMP={true}
                      width={52}
                      height={52}
                      layout={"responsive"}
                      // src={
                      //   count <= 1
                      //     ? bylineAuthor.avtar
                      //     : STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP
                      // }
                      src={
                        bylineAuthor.avtar ||
                        STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP
                      }
                      alt="Editor picture"
                      title="Editor picture"
                      defaultImageURL={STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP}
                      isLazyLoad={false}
                    />
                  ) : (
                    // <LazyLoadImage
                    //   // src={
                    //   //   count <= 1
                    //   //     ? bylineAuthor.avtar
                    //   //     : STATIC_IMAGE.AUTH_DEFAULT_IMAGE
                    //   // }
                    //   src={bylineAuthor.avtar || STATIC_IMAGE.AUTH_DEFAULT_IMAGE }
                    //   width={52}
                    //   height={52}
                    //   alt="Editor picture"
                    //   title="Editor picture"
                    //   defaultImageURL={STATIC_IMAGE.AUTH_DEFAULT_IMAGE}
                    //   isLazyLoad={false}
                    // />
                    ""
                  )}
                </a>
              </figure>&nbsp;&nbsp;
              <a href={link} className="cp_author_byline" id={`author_byline_cp_${ind}`}>
                <b>
                  {bylineAuthor.hindi_name
                    ? bylineAuthor.hindi_name
                    : bylineAuthor.english_name}
                </b>
              </a>
              <AmpAnalyticsGA4Events
                id={`author_byline_cp_${ind}`}
                event_name={"author_byline_cp"}
                cta_name={bylineAuthor.hindi_name
                  ? bylineAuthor.hindi_name
                  : bylineAuthor.english_name}
                section={GA4Data?.section || ""}
                subsection={GA4Data?.sub_section || ""}
                article_id={GA4Data?.article_id}
                type_of_article={GA4Data?.type_of_article || ""}
                local18_district={GA4Data?.local18_district || ""}
                domain="https://hindi.news18.com/"
              />
            </li>
          );
        }
        if (isPhoto) {
          return (
            <li key={key}>
              <a href={link}>
                <figure>
                  <img
                    // src={
                    //   count <= 1
                    //     ? bylineAuthor.avtar
                    //     : STATIC_IMAGE.AUTH_DEFAULT_IMAGE
                    // }
                    src={bylineAuthor.avtar || STATIC_IMAGE.AUTH_DEFAULT_IMAGE}
                    alt="Editor picture"
                    title="Editor picture"
                    width={52}
                    height={52}
                    //defaultImageURL={STATIC_IMAGE.AUTH_DEFAULT_IMAGE}
                    defaultValue={STATIC_IMAGE.AUTH_DEFAULT_IMAGE}
                    className="cp_author_byline"
                  />
                </figure>
                <figcaption>
                  {head}
                  <br></br>
                  <span className="cp_author_byline">&nbsp;&nbsp;
                    <b className="cp_author_byline">
                      {bylineAuthor.hindi_name
                        ? bylineAuthor.hindi_name
                        : bylineAuthor.english_name}
                    </b>
                  </span>
                </figcaption>
              </a>
            </li>
          );
        }
        return (
          <Fragment key={key}>
            <li className="authr_mob_li ">
              <>
                <a
                  href={link}
                  className={
                    bylineAuthor.avtar && count <= 1 ? "authr_icon cp_author_byline" : "cp_author_byline"
                  }
                  style={{
                    width: count <= 1 ? (isMobile && bylineAuthor.avtar === '' )?25: 50: 25,
                    height: count <= 1 ? (isMobile && bylineAuthor.avtar === '' )?25: 50: 25,
                    marginRight: 5 
                  }}
                >
                  <img
                    src={
                      (bylineAuthor.avtar || STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP) +
                      `?im=Resize,width=${(isMobile && bylineAuthor.avtar === '' )?25 :isMobile ? 50:100},aspect=fit,type=normal`
                    }
                    // className="forauthorimg"
                    style={{
                      width: count <= 1 ?(isMobile && bylineAuthor.avtar === '' )?25:  50: 25,
                      height: count <= 1 ? (isMobile && bylineAuthor.avtar === '' )?25: 50: 25, 
                    }}
                    alt="Editor picture"
                    title="Editor picture"
                    // defaultImageURL={STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP}
                    height={bylineAuthor.avtar && count <= 1 ? (isMobile && bylineAuthor.avtar === '' )?25: isMobile ? 50 : 25 : 25}
                    width={bylineAuthor.avtar && count <= 1  ? (isMobile && bylineAuthor.avtar === '' )?25 :isMobile ? 50 : 25 : 25}
                    className="cp_author_byline"
                  />
                </a>
              </>
              {isMobile && <>&nbsp;</>}<div className="artclbyeline-author-intro">
                <span
                  className={
                    auths.length
                      ? ""
                      : (bylineAuthor.avtar && count <= 1) || isMobile
                      ? "auth_head_img"
                      : "auth_head"
                  }
                >
                  {auths.length
                    ? ""
                    : bylineAuthor.avtar && count <= 1 && !isMobile
                    ? `${head} :`
                    : `${head} :`}
                </span>
                {isMobile && <>&nbsp;</>}<a href={link} className="cp_author_byline">
                  <span className="cp_author_byline">
                    {bylineAuthor.hindi_name
                      ? bylineAuthor.hindi_name
                      : bylineAuthor.english_name}
                  </span>
                </a>{" "}
                {bylineAuthor.company}
              </div>
            </li>
          </Fragment>
        );
      }
    });
  });
}