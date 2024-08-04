import React from "react";

const TenThingsText = ({ data }) => {
    return (
        <>
            <div className="ten-things">
                {data.map((element, index) => (
                    <div className="ten-things-box" key={`ten${index}`}>
                        {element}
                    </div>
                ))}
            </div>
            <style jsx global>
                {`
                    .ten-things {
                        counter-reset: section;
                    }
                    .ten-things .ten-things-box {
                        position: relative;
                        background: #f5f5f5;
                        padding: 15px 20px 30px 30px;
                        box-sizing: border-box;
                        color: #666666;
                        font-size: 15px;
                        line-height: 28px;
                        margin: 25px 50px 25px 50px;
                        border-radius: 0px 10px 10px 10px;
                    }
                    .ten-things .ten-things-box:before {
                        counter-increment: section;
                        content: counter(section);
                        position: absolute;
                        top: 0px;
                        left: -25px;
                        background: #222222;
                        color: #fff;
                        width: 25px;
                        font-size: 22px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 10px 0 0 10px;
                        font-weight: bold;
                        height: 55px;
                    }
                `}
            </style>
        </>
    );
};

export default TenThingsText;
