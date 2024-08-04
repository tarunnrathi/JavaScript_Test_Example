import LazyLoadCustomImage from "components/Common/CustomImage";
const OfTheField = ({ offTheFieldData }) => {
  return (
    <>
      <div className="cn-offthefieldwidget CN-Sections">
        <div className="CN-heading-1">
          <h2 className="headinner">
            ऑफ द <span>फील्ड</span>
          </h2>
          <div className="icon"></div>
        </div>
        <div className="cn-smallstory-wrapper">
          {offTheFieldData?.length
            ? offTheFieldData.map((data, ind) => {
              return (
                <div className="cn-smallstory" key={"offTheFieldData" + ind}>
                  <a href={data.weburl_r}>
                    <div className="imgbox">
                      <LazyLoadCustomImage
                        src={data.images.url}
                        width={110}
                        height={73}
                        alt={data.display_headline}
                        title={data.display_headline}
                        defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                        isLazyLoad={true}
                      />
                    </div>
                    <div className="text-box">
                      <h3 className="heading-1">{data.display_headline}</h3>
                    </div>
                  </a>
                </div>
              );
            })
            : null}
          <a href="/tag/off-the-field/" className="cn-morebtn1">
            ऑफ द फील्ड की अन्य खबरें
          </a>
        </div>
      </div>
      <style jsx global>{`
        .cn-smallstory-wrapper .cn-smallstory {
          border-bottom: 1px solid #dadada;
        }
        .cn-smallstory-wrapper .cn-smallstory:first-child a {
          padding-top: 0;
        }
        .cn-smallstory-wrapper .cn-smallstory a {
          display: flex;
          padding: 16px 0;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox {
          flex: 0 0 110px;
          margin-right: 15px;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox img {
          display: block;
          width: 100%;
        }
        .cn-morebtn1 {
          background: #f5f5f5;
          display: block;
          text-align: center;
          font-size: 12px;
          text-transform: uppercase;
          color: #e1261d;
          font-family: 'Mukta',sans-serif !important;
          padding: 11px 0;
        }
        .CN-Mobile-HomeOuter .cn-smallstory-wrapper{
          margin-top: 15px;
        }
        .CN-Mobile-HomeOuter .cn-smallstory-wrapper .cn-smallstory {
          margin: 0 10px;
        }
        .CN-Mobile-HomeOuter .cn-smallstory-wrapper .cn-smallstory a{
          flex-direction: row-reverse;
        }
        .CN-Mobile-HomeOuter .cn-smallstory-wrapper .cn-smallstory .text-box{
          margin-right: 15px;
        }
        .CN-Mobile-HomeOuter .cn-morebtn1{
          background: #fff;
          border: 2px solid #E1261C;
          font-size: 13px;
          padding: 5px 8px;
          text-transform: uppercase;
          margin: 10px auto;
          border-radius: 20px;
          width: 240px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default OfTheField;
