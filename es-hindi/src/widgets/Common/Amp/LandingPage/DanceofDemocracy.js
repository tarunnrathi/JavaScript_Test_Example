export default function DanceofDemocracy({ DODData }) {
  if(DODData.length == 0 || DODData == [] || DODData == undefined)
  {
    return null;
  }
  return (
    <div className="stel-battlenews">
      <span>{"लोकतंत्र का उत्सव"}</span>
      <div className="stel-battlenews-slider">
        <amp-carousel
          id="custom-button"
          width="400"
          height="80"
          layout="responsive"
          type="slides"
          autoplay=""
          delay="2000"
          role="region"
          aria-label="Carousel with custom button styles"
        >
          {DODData.map((demo) => {
            return <a href={demo.weburl}>{demo.headline}</a>;
          })}
        </amp-carousel>
      </div>
      <style jsx>{`
        .stel-battlenews {
          padding: 10px 15px;
          border-top: 5px solid #001d42;
          text-align: center;
          margin-bottom: 30px;
          background: #f5f5f5;
          border-bottom: 1px solid #ddd;
          box-sizing: border-box;
        }
        .stel-battlenews span {
          display: block;
          color: #e1261c;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .stel-battlenews span:after {
          content: "";
          width: 40px;
          height: 1px;
          background: #e1261c;
          display: block;
          margin: 5px auto auto;
        }
        .stel-battlenews-slider {
          position: relative;
          margin-bottom: 10px;
        }
        .stel-battlenews-slider a {
          color: #001d42;
          font-size: 18px;
          line-height: 22px;
          font-weight: 900;
          letter-spacing: -0.36px;
          font-family: "Playfair Display", serif;
        }
        .stel-battlenews-slider a:hover {
          color: #e1261c;
        }
      `}</style>
    </div>
  );
}
