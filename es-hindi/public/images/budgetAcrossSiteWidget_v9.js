let _hightLightWidgetBudgetShow = true;

const res = document.createElement("link");
res.rel = "stylesheet";
res.as = "style";
res.href = "/images/budgetHighlightPwa_v6.css";
document.head.appendChild(res);

const s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.1/glide.js";
s.defer = true;
document.body.appendChild(s);

function _initBudgetHighlightWidget() {
  const url =
    "https://api-hi.news18.com/nodeapi/v1/hin/get-redis?key=KHABARN18-unionbudget_highlights&allow_prefix=false";
  //let liveBlogUrl = "/nodeapi/getRedisData/nw_home_top_priority22";
  const liveBlogUrl =
    "https://api-hi.news18.com/nodeapi/v1/hin/get-redis?key=KHABARN18-union_budget_switch_on_off&allow_prefix=false";

  fetch(url)
    .then((data) => data.json())
    .then((response) => {
      const highlightData =
        typeof response?.data["KHABARN18-unionbudget_highlights"]
          ?.highlights !== "undefined"
          ? response.data["KHABARN18-unionbudget_highlights"].highlights
          : "";
      if (highlightData !== "") {
        let _listItem = "";
        Object.values(highlightData)
          .slice(0, 25)
          .forEach((highlight) => {
            let _className = "strip_highlight";
            if (highlight.highlightstypes === "up") {
              _className = "strip_high_price";
            } else if (highlight.highlightstypes === "down") {
              _className = "strip_low_price";
            }
            const _title =
              typeof highlight.headline !== "undefined" &&
              highlight.headline !== ""
                ? highlight.headline.replace(/\\/g, "")
                : "";

            _listItem +=
              '<li class="' +
              _className +
              '"><a target="_blank" href="/budget/highlights/?hasLayout=false"><p>' +
              _title +
              "</p></a></li>";
          });

        fetch(liveBlogUrl)
          .then((resp) => resp.json())
          .then((responseData) => {
            const data =
              responseData?.data["KHABARN18-union_budget_switch_on_off"] ||
              null;
            const _blogUrl = data ? data.liveblog_url : "javascript:void(0)";

            const _highLightWidgetHtml =
              `<div class="home_strip_wapper">
                <div class="home_strip">
                  <div class="home_strip_left">
                    <i><img src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png"/></i>
                    <p>BUDGET 2024<a target="_blank" href="/budget/highlights/?hasLayout=false">HIGHLIGHTS</a></p>
                    </div><div class="home_strip_midd"><div class="home_strip_slider">
                    <div class="glide__track" data-glide-el="track"><div class="glide__slides" id="list_items">` +
              _listItem +
              `</div>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                  <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                  <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                </div></div></div>
                <div class="home_strip_right"></div></div></div>`;

            if (_hightLightWidgetBudgetShow) {
              document.querySelector("#budgetWidgetScrossSite").innerHTML =
                _highLightWidgetHtml;
              _hightLightWidgetBudgetShow = false;

              new Glide(".home_strip_slider", {
                type: "carousel",
                autoplay: 3000,
                perView: 5,
                gap: 10,
                slidesToShow: 1,
                rewind: false,
              }).mount();
            }
          });
      }
    });
}

setTimeout(function () {
  _initBudgetHighlightWidget();
}, 3 * 1000);
setInterval(function () {
  _initBudgetHighlightWidget();
}, 120 * 1000);
