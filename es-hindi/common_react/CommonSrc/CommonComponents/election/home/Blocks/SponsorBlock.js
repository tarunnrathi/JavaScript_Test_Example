import Image from "../../../../../CommonUtils/Image";

const SponsorBlock = ({ data = [] } = {}) => {
  return (
    <>
      <ul className="rswgtsp">
        <li>
          <a href={data[0]?.link}>
            <Image className={"dfltimg"} src={data[0]?.imagePath} alt="" width={153} height={153} />
          </a>
        </li>
        <li>
          <a href={data[1]?.link}>
            <Image className={"dfltimg"} src={data[1]?.imagePath} alt="" width={153} height={153} />
          </a>
        </li>
      </ul>
      <style jsx>{`
        .rswgtsp {
          display: flex;
          justify-content: space-between;
          gap: 1px;
        }

        .rswgtsp li {
          width: 153px;
          height: 153px;
          flex-shrink: 0;
          background: #e6e6e6;
          text-align: center;
        }

        .rswgtsp li span {
          display: block;
          color: #000000;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 12px;
          line-height: 14px;
          margin: 14px 0 5px 10px;
        }
        @media screen and (max-width: 480px) {
          .rswgtsp {
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default SponsorBlock;
