import React from "react";

function TaboolaFooter() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
             window._taboola = window._taboola || [];
             _taboola.push({flush: true});
        `, }}
      ></script>
    </>
  );
}

export default TaboolaFooter;
