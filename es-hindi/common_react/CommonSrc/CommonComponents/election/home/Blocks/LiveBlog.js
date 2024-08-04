import Image from '../../../../../CommonUtils/Image';
const LiveBlog = ({
  redHeading,
  blackHeading,
  url,
  images = [],
  image,
  liveBlogLabel,
} = {}) => {
  let width = 132;

  //        ${images?.length == 2 ? 'im2' : images?.length ? 'im1' : ''}

  return (
    <>
      <div
        className={`rswgtlh ${image ? 'im1' : ''}
        `}
        style={{ position: 'relative' }}>
        {true ? (
          <span style={{ zIndex: 1 }} className="rswgtlvdt">
            {liveBlogLabel}
          </span>
        ) : null}
        <a href={url}>
          {/* {images?.[0] ? (
            <figure>
              <Image src={images?.[0]} alt="" width={width} height="118" />
            </figure>
          ) : null} */}
          {image ? (
            <figure>
              <Image src={image} alt="" width={width} height="118" />
            </figure>
          ) : null}
          <h2>
            {redHeading && blackHeading ? (
              <>
                <span>{redHeading}:</span> {blackHeading}
              </>
            ) : (
              <>{redHeading}</>
            )}
          </h2>
          {/* {images?.[1] ? (
            <figure>
              <Image src={images?.[1]} alt="" width={width} height="118" />
            </figure>
          ) : null} */}
        </a>
      </div>
      <style jsx global>{`
        @media screen and (max-width: 480px) {
          .rswgtlh figure img {
            // width: 50px;
            // height: 50px;
            // display: none;
          }
          .rswgtlh.im1 h2 {
            margin: 0;
          }

          .rswgtlh.im1 h2,
          .rswgtlh.im2 h2 {
            font-size: 14px;
            line-height: 20px;
            padding: unset;
            margin-top: unset;
          }

          // .rswgtlh.im2 figure img {
          //   width: 50px;
          //   height: 50px;
          // }

          .rswgtlh.im1 figure img {
            width: 120px;
            height: 100px;
            margin-top: 21px;
          }

          .rswgtlvdt {
            ${image
              ? `font-size: 11px !important;
            width: auto !important;
            left: 20px !important;
            top: 5px !important;`
              : ''}
          }
        }
      `}</style>
      <style jsx>{`
        .rswgtlh a {
          background: #f8f8f8;
          border: 1px solid #d3d3d3;
          border-bottom: 4px solid #d3d3d3;
          text-align: center;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-bottom: 15px;
          overflow: hidden;
          min-height: 123px;
        }
        .rswgtlvdt {
          color: #e1261c;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: bold;
          position: absolute;
          text-align: center;
          width: 100%;
          left: 0;
          top: 10px;
        }

        .rswgtlvdt:before {
          content: '';
          background: #e1261c;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 5px;
          animation: rslvdt 0.5s infinite;
        }
        .rswgtlh h2 {
          color: #001d42;
          font-size: 34px;
          line-height: 40px;
          font-weight: bold;
          margin: 30px 0 10px 0;
          width: 100%;
        }
        .rswgtlh h2 span {
          color: #e1261c;
        }
        .rswgtlh figure,
        .rswgtlh figure {
          line-height: 0;
        }
        .rswgtlh.im1 h2,
        .rswgtlh.im2 h2 {
          font-size: 30px;
          margin: 20px 20px 0 0;
        }
        .rswgtlvdt figure {
          line-height: 0;
          flex-shrink: 0;
        }
        @keyframes rslvdt {
          from {
            background: #e1261c;
          }
          to {
            background: #f8f8f8;
          }
        }

        @media screen and (max-width: 480px) {
          .rswgtlh a {
            border-radius: 0;
            align-items: center;
            min-height: 126px;
          }
          .rswgtlh a figure{flex-shrink:0;}
          .rswgtlh h2 {
            font-size: 20px;
            line-height: 30px;
            font-weight: 700;
            padding: 0 20px;
          }
          .rswgtlh.im1 h2 {
            margin: 0;
          }

          .rswgtlh {
            border-radius: 0;
            align-items: flex-end;
          }
          .rswgtlh figure img {
            width: 50px;
            height: 50px;
          }

          .rswgtlh.im1 h2,
          .rswgtlh.im2 h2 {
            font-size: 14px;
            line-height: 20px;
            padding: 5px 10px 0 10px;
          }

          .rswgtlh.im2 figure img {
            width: 50px;
            height: 50px;
          }

          .rswgtlh.im1 figure img {
            width: 100px;
            // height: 75px;
          }
        }
      `}</style>
    </>
  );
};

export default LiveBlog;
