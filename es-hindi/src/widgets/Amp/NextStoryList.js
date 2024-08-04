import React from "react";

const NextStoryList = (props) => {
  function next_story() {
    let html = '';
    let nextStoryList = '';
    if (props.data.topStory.rhsTopStoryListing) {
      for (const [index, dVal] of props.data.topStory.rhsTopStoryListing.entries()) {
        if (dVal.article_id != props.data.paramObj.id) {
          nextStoryList = '<a id="nexStory" href="/amp/' +(dVal.weburl || dVal.url).replace(/https?:\/\/[a-z.0-9]*\//, '')+ '"><div class="amp-nextstory-in"><div class="amp-nextstoryhd">अगली खबर</div><div class="amp-nextstoryitem">' + dVal.title + '</div></div></a>';
          break;
        }
      }
    }

    if(nextStoryList) {
      html = `<amp-animation id="footerSticyAnimation" layout="nodisplay">
        <script type="application/json">
          { "duration": "8s",    "fill": "both",
            "direction": "alternate",
            "animations": [{
              "selector": ".amp_footerNext .ampNextTarget",
              "keyframes": [{
                "transform": "translateX(0%)"
              }]
            }]
          }
        </script>
      </amp-animation> 
      <div class="amp_footerNext">
        <amp-position-observer intersection-ratios="1"  on="scroll:footerSticyAnimation.seekTo(percent=event.percent)" layout="nodisplay"></amp-position-observer>
        <div class="amp-nextstory ampNextTarget">
          ${ nextStoryList }
        </div>
      </div> `;
    }
    return { __html: html };
  }
  return (
    <>
       {/* <div next-page-hide='' dangerouslySetInnerHTML={ next_story() } />
       <style jsx global>{`
          .amp-nextstory{position:fixed;bottom:0;background:#fff;left:0;right:0;box-shadow:0 0 4px #ccc;padding:0;z-index:9;bottom:60px; transform: translateX(1000%)}.amp-nextstory-in{background:#ed3036;position:relative;padding:6px 0}.amp-nextstory-in:after,.amp-nextstory-in:before{content:"";position:absolute}.amp-nextstory-in:before{background:#b30409;width:30px;height:30px;right:30px;top:10px;border-radius:100%}.amp-nextstory-in:after{width:8px;height:8px;border-top:2px solid #fff;border-right:2px solid #fff;transform:rotate(45deg);top:20px;right:41px}.amp-nextstoryhd{position:absolute;top:-5px;left:0;bottom:-5px;background:#001636;color:#fff;font-size:16px;width:65px;text-align:center;line-height:22px;display:flex;align-items:center;border-radius:0 10px 10px 0}.amp-nextstoryitem{color:#fff;font-weight:700;font-size:14px;line-height:18px;padding:0 70px 0 75px;height:38px;overflow:hidden}
       `}</style>   */}
    </>
  );
};

export default NextStoryList;
