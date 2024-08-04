import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const FeaturedConstituency = ({ featureData }) => {

  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";

  const randomConst = featureData.rCc?.cons_name_hindi || '';
  const randState = featureData.rState || '';
  const randomId = featureData.rId || '';
  const randomUrl = featureData.rUrl || '';

  try {
    return (
      <>
        <div className="featureConstWrap">
          <div className="featureConst">
            <a href={`/assembly-elections/${randomUrl}/${mainUrlParam}`} target="_blank">
            <h4 className="heading">विधानसभा क्षेत्र</h4>
              <div className="mapMarker"></div>
              <div className="constName">{randomConst && randomConst !== undefined ? randomConst : ''}</div>
              <div className="stateName">{randState && randState.title !== undefined ? randState.title : ''}</div>
              <span className="icon1"></span>
              <span className="icon2"></span>
              <span className="icon3"></span>
              <span className="icon4"></span>
            </a>
          </div>
        </div>
        <style jsx>{`
          .featureConstWrap {
            padding: 9px;
            border: 1px solid #dfdfdf;
            margin-bottom: 20px;
          }
          .featureConst a {
            display: block;
            position: relative;
            background: #f1f1f1;
          }
          .featureConst .heading {
            color: #001d42;
            font-size: 20px;
            text-align: center;
            padding-top: 10px;
            font-weight: 400;
            margin-bottom: 8px;
          }
          .featureConst .mapMarker {
            display: flex;
            justify-content: center;
            position: relative;
          }
          .featureConst .mapMarker:after,
          .featureConst .mapMarker:before {
            content: "";
            position: absolute;
          }
          .featureConst .mapMarker:after {
            width: 92%;
            height: 1px;
            background: #dcdcdc;
            top: 15px;
            left: 0;
            right: 0;
            margin: auto;
          }
          .featureConst .mapMarker:before {
            width: 34px;
            height: 35px;
            border-radius: 100%;
            background: #fff
              url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hdrsprite_1632473468.svg) -172px
              0px no-repeat;
            display: block;
            z-index: 1;
            position: relative;
          }
          .featureConst .constName {
            font-weight: 500;
            width: 100%;
            color: #e1261c;
            font-size: 20px;
            margin-bottom: 5px;
            text-align: center;
          }
          .featureConst .stateName {
            color: #001d42;
            font-size: 13px;
            text-align: center;
            padding-bottom: 5px;
          }
          .featureConst a .icon1,
          .featureConst a .icon2,
          .featureConst a .icon3,
          .featureConst a .icon4 {
            width: 10px;
            height: 10px;
            display: block;
            border: 1px solid #000;
            position: absolute;
          }
          .featureConst a .icon1 {
            left: 0;
            top: 0;
            border-right: 0;
            border-bottom: 0;
          }
          .featureConst a .icon2 {
            right: 0;
            top: 0;
            border-left: 0;
            border-bottom: 0;
          }
          .featureConst a .icon3 {
            left: 0;
            bottom: 0;
            border-top: 0;
            border-right: 0;
          }
          .featureConst a .icon4 {
            right: 0;
            bottom: 0;
            border-top: 0;
            border-left: 0;
          }
          .highlight-date {
            display: block;
            color: #949494;
            font-weight: 300;
            font-size: 12px;
            font-style: normal;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 5px;
          }
        `}</style>
      </>
    );
  } catch (e) {
    // console.log("FeaturedConstituency error ",e);
    return null;
  }
};
export default FeaturedConstituency;
