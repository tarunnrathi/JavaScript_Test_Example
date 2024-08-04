import Image from '../../../../../CommonUtils/Image';

const SquareBlock = ({ url, link }) => {
  return (
    <>
      <div className="rswgtrrbx">
        <a href={link}>
          <Image className={'dfltimg'} src={url} />
        </a>
      </div>
      <style>{`
      .rswgtrrbx {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 153px;
        height: 151px;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
      }
      @media screen and (max-width: 480px) {
        .rswgtrrbx {
            width: 49.8%;
          }  
          .rswgtrrbx a, .rswgtrrbx img {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default SquareBlock;
