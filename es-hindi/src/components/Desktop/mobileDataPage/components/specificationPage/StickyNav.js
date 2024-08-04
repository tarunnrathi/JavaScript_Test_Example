import { scrollToTarget } from "includes/article.util";
import React from "react";

const StickyNav = ({ brand = "", specificationDescription ='' }) => {
  const scroll = (e, id) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  return (
    <div>
      <div className="sticky_nav">
        <a
          onClick={(e) => scroll(e, "section_overview")}
          href="#section_overview"
          className="active"
        >
          अवलोकन
        </a>
        {specificationDescription?<a onClick={(e) => scroll(e, "prime_dtl")} href="#prime_dtl">
          मोबाइल के बारे में{" "}
        </a> :''}

        <a onClick={(e) => scroll(e, "otherMobile")} href="#otherMobile">
          अन्‍य {brand} फोन्‍स
        </a>
        <a onClick={(e) => scroll(e, "nwnspc")} href="#news">
          संबंधित खबरें
        </a>
        <a
          onClick={(e) => scroll(e, "nwnspc")}
          href="#fullSpecification"
        >
          सभी स्‍पेसिफिकेशंस
        </a>
        <a onClick={(e) => scroll(e, "trendingMobile")} href="#trendingMobile">
          ट्रेंडिंग मोबाइल
        </a>
        <a onClick={(e) => scroll(e, "ppmb")} href="#ppmb">
          पॉप्‍युलर ब्रांड
        </a>
      </div>
    </div>
  );
};

export default StickyNav;
