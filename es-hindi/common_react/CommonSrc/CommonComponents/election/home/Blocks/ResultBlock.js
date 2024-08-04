const ResultBlock = ({ sides = [], index, pindex, temp = false } = {}) => {
  if (sides.length != 4) {
    sides = [...sides, ...sides.slice(0, 4 - sides.length)];
  }

  let posMapper = ['front', 'back', 'right', 'left'];
  return (
    <>
      <div className={`multislider-${pindex}${index} multislider`}>
        <ul>
          {sides.map((side, index) => {
            return (
              <li
                className={`side-pos-${posMapper[index]}`}
                style={{ background: side.color }}>
                <div>
                  <span className="rsprt">
                    {temp ? `HXM${side.first}XMS` : side.first}
                  </span>
                  <span className="rsst">
                    {side.short == 'seatDiff'
                      ? side.second > 0
                        ? '+'
                        : ''
                      : ''}
                    {side.second}
                    {side.short == 'voteShare' || side.short == 'strikeRate' ? (
                      <em>%</em>
                    ) : null}
                  </span>
                  <span className="rswl">
                    {temp ? `XVSNB${side.third}SWXK` : side.third}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .rsprt,
        .rsst,
        .rswl {
          display: block;
        }
        .rsprt {
          font-size: 18px;
          font-weight: bold;
          line-height: 23px;
          white-space: nowrap;
          max-width: 100px;
          text-overflow: ellipsis;
          display: inline-block;
          overflow: hidden;
          padding-top:2px;
        }
        .rsst {
          font-size: 40px;
          font-weight: bold;
          line-height: 55px;
        }
        .rswl {
          font-size: 13px;
          line-height: 20px;
        }

        .multislider {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .multislider ul {
          width: 153px;
          height: 151px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
          transition: 2s;
        }

        .multislider li {
          height: 151px;
          width: 153px;
          position: absolute;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          overflow: hidden;
        }

        .multislider li div {
          transform: translateZ(0);
          width: 100%;
        }

        .side-pos-front {
          transform: translateZ(76px);
        }
        .side-pos-right {
          transform: translateZ(-76px) rotatex(180deg);
        }
        .side-pos-back {
          transform: rotateX(90deg) translateY(-76px);
          transform-origin: top center;
        }
        .side-pos-left {
          transform: rotateX(-90deg) translateY(76px);
          transform-origin: bottom center;
        }
        .rsst em {
          font-size: 25px;
          font-style: normal;
          display: inline-block;
          vertical-align: super;
        }
        @media (max-width:480px){
          .rsst em{
            font-size:14px;
          }
        }
      `}</style>
    </>
  );
};

export default ResultBlock;
