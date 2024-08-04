import React from "react";

function TaboolaHeader(props) {
  let taboolaScript = "";
  taboolaScript = `let taboolaInt = false;
  window._taboola = window._taboola || [];
  _taboola.push({ ${props.page}: 'auto' });
    let taboolaFunction = () => {
      let pageYOffset = window.pageYOffset;
      if (pageYOffset > 500 && !taboolaInt) {         
          !function (e, f, u, i) {
              if (!document.getElementById(i)) {
                  e.async = 1;
                  e.src = u;
                  e.id = i;
                  f.parentNode.insertBefore(e, f);
              }
          }(document.createElement('script'),
              document.getElementsByTagName('script')[0],
              '//cdn.taboola.com/libtrc/network18media-news18hindi/loader.js',
              'tb_loader_script');
          if (window.performance && typeof window.performance.mark == 'function') { window.performance.mark('tbl_ic'); }
          taboolaInt = true;
          window.removeEventListener('scroll',taboolaFunction );
        }
        }
    window.addEventListener('scroll',taboolaFunction );`;

  return (
    <>
      <script
        loading="lazy"
        dangerouslySetInnerHTML={{
          __html: taboolaScript,
        }}
      ></script>
    </>
  );
}

export default TaboolaHeader;
