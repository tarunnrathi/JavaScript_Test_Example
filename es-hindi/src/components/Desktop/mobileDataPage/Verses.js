import React from "react";

const Verses = () => {
  return (
    <div>
      <div className="vs">
        <img
          src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/vsmobiledata_1649409561.png"
          alt="vsmobiledata_1649409561"
        />
      </div>

      <style jsx global>
        {`
          .vs {
            display: block;
            text-align: center;
            margin: -15px 0px -15px 0px;
          }
          .vs img {
            vertical-align: top;
            box-shadow: none !important;
            width: auto !important;
            border: none !important;
            padding: 0px !important;
          }
        `}
      </style>
    </div>
  );
};

export default Verses;
