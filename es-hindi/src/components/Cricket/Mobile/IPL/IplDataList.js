import { displayAds, getConvertedDateFormat } from "includes/ipl.helper";
import moment from "moment-timezone";

const IplDataList = ({ list, pageAds }) => {
  return (
    <>
      <ul className="ipltag-storylist clearfix">
        {
          list.map((data, index) => {
            return (
              <li key={index}>
                {
                  index === 4 ? displayAds(pageAds.ATF_300) : index === 9 && displayAds(pageAds.BTF_300)
                }
                  <figure>
                      <a href={data.weburl_r}>
                        <img
                          loading="lazy"
                          src={`${
                            data.images?.url
                          }?impolicy=website&width=135`}
                          data-src={`${
                            data.images?.url
                          }?impolicy=website&width=135`}
                          alt={data.display_headline}
                          onerror="this.onerror=null;this.src='https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                          height={80}
                        />
                    </a>
                  </figure>
                  <div className="ipltagintro">
                    <h2><a href={data.weburl_r}>{data.display_headline}</a></h2>
                    <div className="ipl-pstdt">
                      {moment(getConvertedDateFormat(data.created_at)).format(
                        "MMMM D, YYYY, h:mm a"
                      )}
                    </div>
                  </div>
              </li>
              );
          })
        }
      </ul>
      <style jsx global>{`        
        .ipltag-storylist {
          margin: 10px;
        }
        .clearfix:after, .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .ipltag-storylist li {
          display: flex;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }
        .ipltag-storylist li figure {
          width: 134px;
          margin-right: 10px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 8px;
          height: 80px;
        }
        .ipltag-storylist li figure img {
          width: 134px;
          height: 80px;
        }
        .ipltag-storylist li .ipltagintro {
          margin: auto;
          width: calc(100% - 150px);
        }
        
        .ipltag-storylist li .ipltagintro h2, .ipltag-storylist li .ipltagintro h2 a {
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          color: #000;
        }
        .ipltag-storylist li .ipltagintro .ipl-pstdt {
          font-size: 13px;
          color: #999;
          display: block;
        }
        .add {
          padding: 20px 0px 20px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #fff;
          justify-content: center;
          height: 300px;
          width: 100%;
        }
      `}</style>
    </>
  );

};

export default IplDataList;
