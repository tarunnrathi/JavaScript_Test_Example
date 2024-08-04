import React, { useEffect } from "react";
const BoardList = ({ boardList, url_slug_match, isMobile = false }) => {
  return (
    <>
      <div className="board_lists">
        <h2 className="brdrslthd">बोर्ड रिजल्ट्स </h2>
        <ul className="brdrsltlist">
          {boardList.length > 0 &&
            boardList.map((item, index) => {
              return (
                <>
                  <li key={item.slug}>
                    <h3>
                      <a href={`/india-result/${item.slug}/`}>{item.title}</a>
                    </h3>
                    <div className="rs_row">
                      <figure>
                        <a href={`/india-result/${item.slug}/`}>
                          <img src={item?.images?.url} alt={item.title} />
                        </a>
                      </figure>
                      <div className="brdrsltcls">
                        {item.sub_page.map((it) => (
                          <>
                            <a href={"/india-result/" + it.slug + "/"}>
                              {it.title}
                            </a>{" "}
                          </>
                        ))}
                      </div>
                    </div>
                    {/* <p className="brdur">{item.message.hindi}</p> */}
                  </li>
                </>
              );
            })}
        </ul>
      </div>
      <style jsx global>{`
        .rs_row {
          display: flex;
          margin: 8px auto;
          align-items: center;
        }
        .brdrsltintro {
          margin-bottom: 30px;
        }
        .brdrsltintro p {
          color: #333333;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 15px;
        }
        .brdrsltlist {
          padding: 10px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        .brdrsltlist li {
          width: 32%;
          min-height: 120px;
          border-radius: 10px;
          border: 1px solid #e3e3e3;
          cursor: pointer;
          padding: 15px;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .brdrsltlist li h3,
        .brdrsltlist li h3 a {
          font-size: 22px;
          line-height: 20px;
          font-weight: 600;
          color: #707070;
          width: 100%;
        }
        .brdrsltlist li figure {
          width: 46px;
          height: 46px;
          margin-right: 20px;
        }
        .brdrsltlist li figure img {
          width: 46px;
          height: 46px;
        }
        .brdrsltcls {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }
        .brdrsltcls a {
          margin: 2px 7px 2px 0;
          min-width: 88px;
          background: #343434;
          text-align: center;
          color: #fff;
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          display: inline-flex;
          justify-content: center;
          padding: 0 6px;
        }
        .brdrsltcls a:first-child {
          margin-left: 0px;
        }
        .brdrsltcls a.active,
        .brdrsltcls a:hover {
          background: #eb3d3c;
          color: #fff;
        }
        .brdur {
          font-size: 14px;
          line-height: 19px;
          font-weight: 700;
          color: #333;
        }
        @media screen and (max-width: 720px) {
          .budget_page {
            width: 100%;
            padding: 10px;
          }
          .brdrsltlist {
            padding: 5px 0 20px 0;
            justify-content: space-between;
            gap: 15px 0;
          }
          .brdrsltlist li {
            width: 48%;
            height: auto;
            min-height: 120px;
            align-items: flex-start;
            align-content: flex-start;
          }
          .brdrsltlist li h3 {
            font-size: 18px;
            text-align: center;
          }
          .brdrsltlist li figure,
          .brdrsltlist li figure img {
            width: 60px;
            height: 60px;
          }
          .brdrsltlist li figure {
            margin-right: 0;
            order: -1;
            margin-bottom: 10px;
          }
          .brdrsltcls {
            display: block;
            margin: auto;
            text-align: center;
          }
          .brdrsltcls a {
            margin-left: 0;
            display: block;
            margin-top: 8px;
            height: auto;
            line-height: 22px;
            padding: 2px 6px;
          }
          .brdur {
            text-align: center;
            margin-top: 5px;
          }
          .rs_row {
            text-align: center;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
          }
          
        }
      `}</style>
    </>
  );
};
export default BoardList;