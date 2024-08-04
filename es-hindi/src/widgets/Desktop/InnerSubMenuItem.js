import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const InnerSubMenu = ({ stories, className }) => {
  const menuJsx = (data, index, last) => {
    const aStyle = {
      display: "flex",
      fontSize: "13px",
      lineHeight: "18px",
      color: "#333",
      fontFamily: `Lato, sans-serif`,
      fontWeight: index === 0 ? 700 : 400,
      textTransform: "initial",
      padding: "6px 0",
      borderBottom: index === last ? "0" : "1px solid #ccc",
    };

    const imgSrc = data?.images?.url || "";
    const count = index + 1;
    return count === 1 ? (
      <a key={index} href={data.weburl_r || data.weburl} style={aStyle}>
        <LazyLoadImage
          src={
            imgSrc
              ? imgSrc
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII="
          }
          alt={data.headline || data.display_headline}
          title={data.headline || data.display_headline}
          className="lazyload"
          width={120}
          height={52}
          style={{ marginRight: "10px" }}
        />
        {data.headline || data.display_headline}
      </a>
    ) : (
      <a key={index} href={data.weburl_r || data.weburl} style={aStyle}>
        {data.headline || data.display_headline}
      </a>
    );
  };

  return stories.length ? (
    <div className={className}>
      {stories.map((data, index) => menuJsx(data, index, stories.length - 1))}
    </div>
  ) : (
    <></>
  );
};

export default InnerSubMenu;
