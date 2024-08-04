import React from "react";

const AsianGamesBreadcum = ({ breadCumConstant }) => {
  return (
    <>
      <div className="breadcum">
        {breadCumConstant.map((breadcum, index) => {
          if (breadCumConstant.length - 1 === index) {
            return <h2 key={breadcum.id}>{breadcum.name}</h2>;
          } else {
            return (
              <>
                <a key={breadcum.id} href={breadcum.url}>
                  {breadcum.name}
                </a>{" "}
              /{" "}
              </>
            );
          }
        })}
      </div>
      <style jsx>{`
                .breadcum {
                  width: 100%;
                  border-bottom: 1px dotted #939393;
                  display: flex;
                  align-items: center;
                  text-transform: capitalize;
                  font-weight: 400;
                  margin-bottom: 10px;
                  font-family: Mukta, sans-serif;
                  white-space: nowrap;
                  padding-bottom: 5px;
                  font-size: 13px;
                  overflow-x: hidden;
                  color: #e1261d;
                }
                .breadcum a {
                  margin: 0 6px;
                  font-size: 13px;
                  color: #e1261d;
                  line-height: 24px;
                }
                .breadcum h2 {
                  color: #838383;
                  font-size: 13px;
                  margin-left: 6px;
                  line-height: 14px;
                  font-weight: 400;
                }
                @media (max-width:768px){
                  .breadcum {
                    overflow-x: scroll;
        
                  }
              }
                
        
      `}</style>
    </>
  );
};

export default AsianGamesBreadcum;
