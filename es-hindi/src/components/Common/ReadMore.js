import { useState } from "react";
import { useRouter } from "next/router";
import { getAMPCodes } from "includes/Amp/ampHelper";
import dynamic from "next/dynamic";

const ArticleBody = dynamic(() => import("components/Common/ArticleBody"));

export default function ReadMore({
  readData,
  body,
  className = "storypara",
  target = "desktop",
  parsed,
  storyId,
  first,
  isDesktop = true,
  tags,
  category,
  headline
}) {
  const router = useRouter();
  const { readmore = 0 } = router.query;
  const [moreIndex, setMoreIndex] = useState(() =>
    readmore > readData.length || readmore < 0 ? 0 : Number(readmore)
  );

  const onClickHandler = () => {
    history.pushState("", "", `?readmore=${moreIndex + 1}`);
    setMoreIndex((prev) => prev + 1);
  };

  return (
    <>
      {target !== "amp" ? (
        <ArticleBody category={category} headline={headline} body={body} tags={tags} parsed={parsed} id={storyId} first={first} isDesktop={isDesktop}/>
      ) : (
        <div className={className}>
          <article className="paracontainer">
            <p
              dangerouslySetInnerHTML={{
                __html: getAMPCodes(body).replace(/<br \/>|<br>|<br >|<\/br>/igm, ""),
              }}
            />
          </article>
        </div>
      )}
      <>
        {readData
          .slice(0, target === "amp" ? readData.length + 1 : moreIndex + 1)
          .map((content, pos) => {
            return (
              <div
                key={pos}
                className={
                  target === "amp"
                    ? "readmore-content"
                    : pos === moreIndex && readData[moreIndex]
                    ? "ftrcontent-morestory featured-content-newchange"
                    : "readmore-content"
                }
                hidden={target === "amp"}
                id={`featured-content-${pos}`}
              >
                <h3>{content.heading}</h3>
                <p
                  className="blog-para"
                  dangerouslySetInnerHTML={{
                    __html:
                      content.text && target === 'amp' ? getAMPCodes(content.text) : content.text.replace(/<br \/>/gim, ""),
                  }}
                />
              </div>
            );
          })}
      </>
      {readData[moreIndex] && target !== "amp" && (
        <div className="ftrcontent-morebox">
          <h3 className="ftrcontent-moreboxhd">
            {readData[moreIndex].heading}
          </h3>
          <button className="ftrcontent-viewmore" onClick={onClickHandler}>
            आगे पढ़ें
          </button>
        </div>
      )}

      {target === "amp" &&
        readData.map((data, pos) => (
          <div
            id={`ftrcontent-morebox-${pos}`}
            className="ftrcontent-morebox"
            hidden={pos}
          >
            <h3 className="ftrcontent-moreboxhd">{data.heading}</h3>
            <button
              id="show-more"
              on={`tap:featured-content-${pos}.show,ftrcontent-morebox-${pos}.hide,ftrcontent-morebox-${
                pos + 1
              }.show`}
              className="ftrcontent-viewmore"
            >
              पढ़ने के लिए क्लिक करें
            </button>
          </div>
        ))}

      <style jsx global>
        {`
          .blog-para {
            font-size: ${target === "mobile" ? "18px" : "16px"};
            color: ${target === "amp" ? "#000" : "#404040"};
            padding-bottom: 20px;
            margin: 0;
            line-height: ${target === "amp" ? "1.5" : "28px"};
          }
          .readmore-content {
            margin-top: ${target === "mobile" ? "0" : "-14px"};
            margin: ${
              target === "mobile"
                ? "0 16px"
                : target === "amp"
                ? "20px 10px 10px 10px"
                : ""
            };
          }
          .readmore-content h3 {
            font-size: ${target === "amp" ? "20px" : "16px !important"};
            margin-bottom: ${target === "amp" ? "10px" : "0"};
            color: ${target === "amp" ? "#666666" : "#404040 !important"}; 
            border: ${target === "amp" ? "none" : "none !important"};
            padding: ${target === "amp" ? "0" :"0 !important"};
            line-height: ${target === "amp" ? "30px" : "38px !important;"}; 
          }

          .featured-content-newchange h3 {
            display: block;
            color: ${target === "amp" ? "#ff000a" : "#ff000a !important"};
          }

          .ftrcontent-morestory h2,
          .ftrcontent-morestory h3 {
            font-size: ${target === "amp" ? "16px":"16px !important"};
            line-height: ${target === "amp" ? "38px":"38px !important"};
            margin-bottom: 0;
          }

          .featured-content-newchange h3 {
            text-align: left;
          }

          .ftrcontent-morestory h2,
          .ftrcontent-morestory h3 {
            border: ${target === "amp" ? "none":"none !important"};
            padding: ${target === "amp" ? "0":"0 !important"};
            line-height: ${target === "amp" ? "38px":"38px !important"};
          }

          .featured-content-newchange:after {
            position: absolute;
            bottom: 0;
            height: 50%;
            left: 0;
            width: 100%;
            content: none;
            background: linear-gradient(
              to top,
              rgba(255, 255, 255, 1) 20%,
              rgba(255, 255, 255, 0) 80%
            );
            pointer-events: none;
          }
          .ftrcontent-morestory {
            margin-top: ${target === "mobile" ? "0" : "-14px"};
            margin: ${target === "mobile" ? "0 16px" : ""};
          }

          .featured-content-newchange {
            margin-top: ${target === "mobile" ? "0" : "-14px"};
            height: 113px;
            overflow: hidden;
            position: relative;
          }
          .ftrcontent-viewmore {
            height: ${target === "amp" ? "45px" : "49px"};
            display: block;
            line-height: 30px;
            text-align: center;
            font-size: ${
              target === "mobile" || target === "amp" ? "14px" : "16px"
            };
            width: ${
              target === "mobile" || target === "amp" ? "190px" : "170px"
            };;
            position: relative;
            background: #ff000a;
            color: ${target === "amp" ? "#fff":"#fff !important"};
            font-weight: 700;
            border-radius: 10px;
            box-shadow: 0 8px 16px #00000029;
            margin: ${
              target === "amp" ? "auto" : "20px auto -50px auto"
            };
            margin-top: ${target === "amp" ? "15px" : "0"};
            padding: ${target === "amp" ? "12px 0 0 0" : "15px 0 0 0"};
            font-family: ${target === "amp" ? "Noto Serif, Droid Serif, sans-serif":"Noto Serif, Droid Serif, sans-serif !important"};
            cursor: pointer;
            border: none;
            outline: none;
          }

          .ftrcontent-viewmore:before {
            width: ${target === "amp" ? "30px" : "35px"};
            height: ${target === "amp" ? "30px" : "35px"};
            background: #f2f2f2;
            border-radius: 100%;
            top: ${target === "amp" ? "-18px" : "-20px"};;
            margin-left: ${target === "amp" ? "-15px" : "-18px"};
          }

          .ftrcontent-viewmore:after,
          .ftrcontent-viewmore:before {
            content: none;
            position: absolute;
            left: 50%;
          }
          .ftrcontent-viewmore:after {
            width: ${target === "amp" ? "6px" : "8px"};
            height: ${target === "amp" ? "6px" : "8px"};
            border-top: ${
              target === "amp" ? "2px solid #707070;" : "3px solid #707070;"
            };
            border-right: ${
              target === "amp" ? "2px solid #707070;" : "3px solid #707070;"
            };  
            transform: rotate(134deg);
            margin-left: ${target === "amp" ? "-4px" : "-5px"};
            top: ${target === "amp" ? "-3px" : "-5px"};
            animation: ftrcntarrow 1.5s infinite;
          }
          @keyframes ftrcntarrow {
            10% {
              margin-top: -10px;
            }

            30% {
              margin-top: 0;
            }

            40% {
              margin-top: -2px;
            }

            50% {
              margin-top: 0px;
            }
          }
          .ftrcontent-viewmore:after,
          .ftrcontent-viewmore:before {
            content: no-close-quote;
            position: absolute;
            left: 50%;
          }

          .ftrcontent-morebox {
            background: ${target === "amp" ? "#F2F2F2" : "transparent"};
            padding: ${
              target === "amp" ? "12px 10px 12px 10px" : "0px 10px 25px 10px"
            };
            margin-top: 0;
            position: relative;
            border-radius: 10px;
            margin: ${
              target === "amp" ? "15px 10px 50px 10px" : "30px 0 40px 0"
            };
          }

          .ftrcontent-moreboxhd {
            display: ${target === "amp" ? "block" : "none"};
            margin: ${target === "amp" ? 0 : ""};
            padding: ${target === "amp" ? 0 : ""};
          }
          .ftrcontent-moreboxhd {
            color: ${target === "amp" ? "#ff000a":"#ff000a !important"};
            text-align: center;
            border: ${target === "amp" ? "none":"none !important"};
            font-size: ${target === "amp" ? "16px" : "22px !important"};
          }
          .storypara {
            line-height: ${target === "amp" ? "25px":"25px !important"};
          }
          .article_content {
            line-height: 28px;
            font-size: 18px;
            word-break: break-word;
            padding: 10px 16px;
          }

          .paracontainer p {
            margin: 0;
            font-size: 16px;
            line-height: 1.5;
          }

          .artic-story {
            margin: 10px 0;
            background: #fff;
            padding 0;
        }
        `}
      </style>
    </>
  );
}
