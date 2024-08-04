
import dynamic from "next/dynamic";
import categoryHelper from "includes/category.helper";
const NewSiteAd = dynamic(() => import("./NewSiteAd"));
const StateLandingBottomCommonPage = dynamic(() =>
  import("./StatelandingBottomCommon"),
);
const SpecialWidget = dynamic(() => import("../Desktop/SpecialWidget"));
const SpecialWidgetMobile = dynamic(() =>
  import("../Desktop/SpecialWidgetMobile"),
);
const StateLandingCommonPage = (props) => {
  const {
    data: {
      pageAds,
      currentUrl,
      isMobile,
      _pageParam: { category = "", subCategory = "" } = {},
    } = {},
  } = props;

  const getCategoryTopSliderAndBottomBoxList = subCategory
    ? categoryHelper.getCategoryTopSliderAndBottomBoxList(subCategory)
    : categoryHelper.getCategoryTopSliderAndBottomBoxList(category);
  const { bottomListing } = getCategoryTopSliderAndBottomBoxList;

  return (
    <>
      <div className="newbottomsectionswrap">
        {bottomListing !== undefined && bottomListing?.length > 0
          && bottomListing?.map((listNews, key) => {
            return (
              <>
                {(key === 3 && isMobile) ?
                  (
                    <SpecialWidgetMobile
                      slug="photogallery"
                      label="फोटो"
                      pageNameSlug={"photogallery"}
                      initialData={listNews}
                      pageParam={props.data._pageParam}
                      currentUrl={currentUrl}
                      pageAds={pageAds}
                      numkey={key}
                      key={key}
                    />
                  ) : (key === 3 && !isMobile) &&
                  (
                    <SpecialWidget
                      slug="photogallery"
                      label="फोटो"
                      pageNameSlug={"photogallery"}
                      initialData={listNews}
                      pageParam={props.data._pageParam}
                      currentUrl={currentUrl}
                      pageAds={pageAds}
                      numkey={key}
                      key={key}
                    />
                  )
                }
                {(key === 6 && isMobile) ?
                  (
                    <SpecialWidgetMobile
                      slug="videos"
                      label="वीडियो"
                      pageNameSlug={"videos"}
                      initialData={listNews}
                      pageParam={props.data._pageParam}
                      currentUrl={currentUrl}
                      pageAds={pageAds}
                      numkey={key}
                      key={key}
                    />
                  ) : (key === 6 && !isMobile) && (
                    <SpecialWidget
                      slug="videos"
                      label="वीडियो"
                      pageNameSlug={"videos"}
                      initialData={listNews}
                      pageParam={props.data._pageParam}
                      currentUrl={currentUrl}
                      pageAds={pageAds}
                      numkey={key}
                      key={key}
                    />
                  )}
                {(key === 10 && isMobile)
                  && (
                    <div className="newadd clearfix">
                      <span id="first">Advertisement</span>
                      <NewSiteAd
                        slotId={`mobile_btf_300`}
                        adUnit={pageAds.BTF_300}
                        sizes={[
                          [320, 250],
                          [300, 250],
                          [336, 280],
                        ]}
                        width={300}
                        height={250}
                      />
                    </div>
                  )}
                {isMobile && <StateLandingBottomCommonPage
                  initialData={listNews}
                  pageParam={props.data._pageParam}
                  currentUrl={currentUrl}
                  pageAds={pageAds}
                  numkey={key}
                  key={key}
                />}
              </>
            );
          })}
      </div>
      <style global jsx>{`
        .newglblhdwrap {
          border-bottom: 1px solid #d9d9d9;
          position: relative;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .newbottomsectionswrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .newbottomsection {
          width: 32%;
          flex-shrink: 0;
          background: #fff;
          margin-bottom: 40px;
        }
        .newbottomsection .newglblhdwrap {
          margin: 0 0px 10px;
          box-shadow: 0px 5px 0px #fff;
        }
        .newbottomsectionlist {
        }
        .newbottomsectionlist li {
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
          position: relative;
        }
        .newbottomsectionlist li a figure {
          width: 100%;
          position: relative;
        }
        .newbottomsectionlist li a figure img {
          width: 100%;
          height: 192px;
        }
        .newbottomsectionlist li a h3 {
          font-size: 15px;
          line-height: 21px;
          color: #000000;
          height: 50px;
          overflow: hidden;
          font-weight: normal;
        }
        .newbottomsectionlist li:first-child {
          //padding: 0;
          background: #ffffff 0% 0% no-repeat padding-box;
        }
        .newbottomsectionlist li:first-child a h3 {
          padding: 5px 0 0;
          height: 50px;
          font-weight: bold;
          font-size: 16px;
          line-height: 23px;
          margin-bottom: 7px;
        }
        .moretrndstroy-secion {
          text-align: center;
          background: #f7f7f7;
          padding: 4px 0 2px 0;
        }
        .moretrndstroy {
          color: #e1261d;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
        }
        @media (max-width: 768px) {
          .newbottomsection {
            width: 100%;
          }
          .newbottomsectionlist {
            margin-bottom: 20px;
          }
          .newbottomsectionlist {
            margin-bottom: 20px;
          }
          .moretrndstroy-secion {
            position: relative;
            position: relative;
            height: 26px;
            display: block;
            margin: 5px 0;
            background: transparent;
          }
          .moretrndstroy-secion div {
            width: 120px;
            margin: 0 auto;
            background-color: #ffffff;
            display: block;
            z-index: 11;
            position: relative;
          }
          .moretrndstroy-secion:before,
          .moretrndstroy-secion:after {
            display: block;
            position: absolute;
            bottom: -2px;
            content: "";
            width: 100%;
            right: 0;
            left: 0;
          }
          .moretrndstroy-secion:before {
            border: 1px dotted #939393;
            top: 0;
            margin: 4px 0;
            height: 4px;
            border-right: 0;
            border-left: 0;
          }
          .moretrndstroy-secion:after {
            height: 5px;
            margin: 5px 0;
            border: 1px dotted #939393;
            border-right: 0;
            border-left: 0;
          }
          .moretrndstroy {
            background-color: #ffffff;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #e2332b;
            border-radius: 16px;
            z-index: 11;
            padding: 5px 20px 4px;
          }
        }
      `}</style>
    </>
  );
};
export default StateLandingCommonPage;
