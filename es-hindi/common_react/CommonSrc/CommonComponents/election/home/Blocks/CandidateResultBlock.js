import Glide from "@glidejs/glide";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import Image from "../../../../../CommonUtils/Image";

const CandidateResultBlock = ({ instance, keycand }) => {
  let [g, setG] = useState(null);

  useEffect(() => {
    if (document.querySelector(`.cndsldrbx-${instance}`)) {
      let index = 0;
      if (g) {
        index = g.index;
        g.destroy();
      }
      let gl = new Glide(`.cndsldrbx-${instance}`, {
        type: "carousel",
        perView: 1,
        autoplay: 5000,
        startAt: index > keycand.length ? 0 : index,
      }).mount();
      setG(gl);
    }
  }, [keycand]);

  return (
    <>
      <div className="cndsldr" style={{ minHeight: 154 }}>
        {keycand?.cand?.length ? (
          <div className={`cndsldrbx cndsldrbx-${instance}`}>
            <div data-glide-el="track">
              <ul>
                {keycand?.cand?.map((item, index) => (
                  <li key={item._id}>
                    <a href={item?.candUrl ? item?.candUrl : null}>
                      <div
                        className="rswgtcnd"
                        style={{ background: item.partyColor }}
                      >
                        <a href={item.candUrl}>
                          <figure>
                            <Image
                              src={
                                item.candImage ||
                                'https://images.news18.com/ibnkhabar/uploads/assests/images/candidate_icon.png'
                              }
                              alt=""
                              width={'60'}
                              height={'60'}
                            />
                          </figure>
                          <div className="cnddtl">
                            <h3 className="cnddtlh">
                              <b>{item.name}</b>
                              <span>{item.partyAbbr}</span>
                            </h3>
                            <p className="cnddtlp">{item.consName}</p>
                            <span
                              className={`cndstatus ${
                                item?.statusClass?.toLowerCase()?.trim() ||
                                "awaited"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </a>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="loader-cont">
            <Loader />
          </div>
        )}
      </div>
      <style jsx>{`
        .rswgtcnd a {
          display: flex;
          justify-content: space-between;
          padding: 11px 15px;
          margin: 1px 0;
        }
        .rswgtcnd figure {
          box-shadow: 0px 3px 6px #00000029;
          border: 2px solid #ffffff;
          margin-right: 15px;
          width: 64px;
          height: 64px;
          overflow: hidden;
          border-radius: 100%;
          flex-shrink: 0;
        }
        .rswgtcnd figure img {
          width: 60px;
          height: 60px;
        }
        .rswgtcnd figure img {
          height: inherit;
          display: block;
          object-fit: cover;
        }
        .rswgtcnd .cnddtl {
          width: 100%;
          padding: 5px 0;
        }
        .rswgtcnd .cnddtl .cnddtlh {
          color: #fff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 20px;
          line-height: 30px;
        }
        .rswgtcnd .cnddtl .cnddtlh b {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rswgtcnd .cnddtl .cnddtlh span {
          display: block;
          text-transform: uppercase;
          font-size: 16px;
          line-height: 20px;
          padding: 4px 0 4px 0;
          font-weight: normal;
          text-shadow: none;
        }
        .rswgtcnd .cnddtl .cnddtlp {
          color: #fff;
          font-size: 16px;
          line-height: 20px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .rswgtcnd .cnddtl .cndstts{
          background: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 14px;
          height: 28px;
          line-height: 28px;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 16px;
          color: #439104;
          padding: 0 15px;
        }

        .cndstatus {
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 14px;
          height: 28px;
          line-height: 28px;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 16px;
          color: #fff;
          padding: 0 15px;
        }

        .cndsldr {
          overflow: hidden;
          width: 100%;
        }
        .cndsldrbx {
          overflow: hidden;
        }
        .cndsldrbx ul {
          display: flex;
          overflow: hidden;
          margin-left: 1px;
        }

        .cndsldrbx ul li {
          width: 320px;
          flex-shrink: 0;
        }

        .AWAITED,
        .awaiting,
        .AWAITING,
        .awaited {
          background: gray;
        }
        .AWAITED-color,
        .awaited-color {
          color: gray;
        }
        .won,
        .WON,
        .WINNER,
        .winner,
        .wins,
        .win,
        .WINS,
        .WIN {
          background: #21643d;
        }
        .WINNNER-color,
        .wins-color,
        .win-color,
        .WINS-color,
        .WIN-color {
          color: #21643d;
        }
        .lead,
        .LEAD,
        .leads,
        .LEADS,
        .leading,
        .LEADING {
          background: #21643d;.
        }
        .leading-color,
        .LEADING-color {
          color: #21643d;
        }
        .LOST,
        .loses,
        .LOSES,
        .lost,
        .losses,
        .LOSSES,
        .loss,
        .LOSS {
          background: #e1261c;
        }
        .losses-color,
        .LOSSES-color,
        .loss-color,
        .LOSS-color {
          color: #e1261c;
        }
        .trailing,
        .TRAILING {
          background: #e1261c;
        }
        .trailing-color,
        .TRAILING-color {
          color: #e1261c;
        }

        .loader-cont {
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 153px;
        }

        @media screen and (max-width: 480px) {
          .rswgtcnd {
            margin-bottom: 10px;
          }
          .cndsldrbx ul li {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default CandidateResultBlock;
