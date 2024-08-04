import React, { useState } from "react";
import { useRouter } from "next/router";

const { newsURL } = require("/src/includes/brand.helper");

const PopularFilter = ({ newsTitle = '', newsData, notFound }) => {
  const router = useRouter();

  const [brand, setBrand] = useState(newsTitle);

  const getBrandNews = (name) => {
    router.push(`${newsURL}/${name?.toLowerCase()}`);
  };

  return (
    <div>
      {newsData?.length && !notFound ? <div className="fltb_wrp">
        <div className="flt_by">फ़िल्टर करें : </div>
        <div className="ppf">
          <div className="fltb_list">
            <button
              onClick={() => getBrandNews("")}
              className={brand === "" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              All
            </button>
            <button
              onClick={() => getBrandNews("Xiaomi")}
              className={brand === "xiaomi" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Xiaomi
            </button>
            <button
              onClick={() => getBrandNews("Samsung")}
              className={brand === "samsung" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Samsung
            </button>
            <button
              onClick={() => getBrandNews("Oppo")}
              className={brand === "oppo" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Oppo
            </button>
            <button
              onClick={() => getBrandNews("Vivo")}
              className={brand === "vivo" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Vivo
            </button>
            <button
              onClick={() => getBrandNews("Iphone")}
              className={brand === "iphone" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Iphone
            </button>
            <button
              onClick={() => getBrandNews("Realme")}
              className={brand === "realme" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Realme
            </button>
            <button
              onClick={() => getBrandNews("Oneplus")}
              className={brand === "oneplus" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              OnePlus
            </button>
            <button
              onClick={() => getBrandNews("asus")}
              className={brand === "asus" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Asus
            </button>
            <button
              onClick={() => getBrandNews("Google")}
              className={brand === "google" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Google
            </button>
            <button
              onClick={() => getBrandNews("poco")}
              className={brand === "poco" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Poco
            </button>
            <button
              onClick={() => getBrandNews("Nokia")}
              className={brand === "nokia" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Nokia
            </button>
            <button
              onClick={() => getBrandNews("motorola")}
              className={brand === "motorola" ? "fltb_tags active" : "fltb_tags"}
              type="submit"
            >
              Motorola
            </button>
          </div>
        </div>
      </div>:''}

    </div>
  );
};

export default PopularFilter;
