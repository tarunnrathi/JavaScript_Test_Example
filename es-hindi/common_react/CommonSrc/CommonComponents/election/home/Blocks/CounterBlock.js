import useInterval from '../../../../../CommonUtils/useInterval';

const CounterBlock = ({ cb, labels = {}, switches, isMobile }) => {
  let [counter, setCounter, setChecked, checked] = useInterval({
    cb,
    checkedv: switches.autoRefresh,
  });

  if (isMobile) {
    return <></>;
  }

  return (
    <>
      <div className="rswgtrrbx frdtrf">
        <div className="rswgtdtrf">
          <h3>{labels.autoRefresh}</h3>
          <time>
            {counter}
            <span>secs.</span>
          </time>
          <a
            className={`dtrfrshply ${!checked ? 'off' : ''}`}
            onClick={e => {
              e.preventDefault();
              setChecked(prev => !prev);
              if (window.multisides.status) {
                window.multisides.customEvent.pause();
              } else {
                window.multisides.customEvent.play();
              }
              return false;
            }}></a>
        </div>
      </div>
      <style jsx>{`
        .rswgtrrbx {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 153px;
          height: 151px;
          overflow: hidden;
          text-align: center;
        }
        .frdtrf {
          background: #241f1f;
        }

        .rswgtdtrf {
        }
        .rswgtdtrf h3 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 14px;
          line-height: 16px;
          padding: 0 10px;
        }
        .rswgtdtrf h3 span {
        }
        .rswgtdtrf time {
          color: #ffce00;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 46px;
          line-height: 24px;
          font-weight: bold;
          padding: 15px 0 2px 0;
          display: block;
        }
        .rswgtdtrf time span {
          display: block;
          font-size: 12px;
          font-weight: normal;
        }
        .dtrfrshply {
          box-shadow: 0px 3px 6px #00000029;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          background: #fff;
          border-radius: 100%;
        }
        .dtrfrshply:before {
          content: '';
          width: 3px;
          height: 12px;
          border-left: 3px solid #333;
          border-right: 3px solid #333;
          display: block;
        }
        .dtrfrshply.off {
        }
        .dtrfrshply.off:before {
          content: '';
          width: 0;
          height: 0;
          border-right: none;
          border-left: 10px solid #333;
          display: block;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          position: relative;
          top: 0px;
          left: 2px;
        }
        @media screen and (max-width: 480px) {
          .rswgtrrbx {
            width: 49.8%;
          }
          .frdtrf {
            width: 100%;
            border-left: 5px solid #e1261c;
            height: auto;
            padding: 10px;
            text-align: left;
            justify-content: left;
            margin-bottom: 10px;
          }
          .rswgtdtrf {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
          }
          .rswgtdtrf h3 {
            font-size: 16px;
            padding: 0;
          }
          .rswgtdtrf time {
            font-size: 32px;
            line-height: 14px;
          }
          .rswgtdtrf time span {
            display: inline-block;
          }
          .dtrfrshply {
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CounterBlock;
