import { Head } from "next/document";

class CustomHead extends Head {
  // modify bundle chunks calling after page load i.e. _app, main, webpack, manifest etc.
  getScripts(files) {
    const originalScripts = super.getScripts(files);
    const mychunks = [];
    originalScripts.map((script) => {
      mychunks.push(script.props.src.toString());
    });
    return (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          let newchunks = '${mychunks}';
          var _mychunks = newchunks.split(',');
          
          window.addEventListener('DOMContentLoaded', (event) => {
            try{
              document.getElementsByTagName("body")[0].style.display = "block";
            } catch(e) {
              console.log(e);
            }
          });
          window.addEventListener('load', () => {
            for (var i = 0; i < _mychunks.length; i++) {
              let ref = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
              let runtimejs = _mychunks[i];
              var script = document.createElement("script");
              script.src = runtimejs;
              script.defer = true;
              script.crossorigin = "anonymous";
              ref.appendChild(script);
            }
          })`,
        }}
      />
    );
  }
  // modify dynamic chunk calling after page load
  getDynamicChunks(files) {
    try {
      const { dynamicImports, assetPrefix, devOnlyCacheBusterQueryString } =
        this.context;

      const dynChunks = [];
      Object.keys(dynamicImports).length &&
        dynamicImports.map((bundle) => {
          //console.log(bundle, "bundle");
          bundle &&
            bundle.endsWith(".js") &&
            dynChunks.push(
              `${assetPrefix}/_next/${encodeURI(
                bundle
              )}${devOnlyCacheBusterQueryString}`
            );
        });

      return (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          let dynnewchunks = '${dynChunks}';
          var _mydynchunks = dynnewchunks.split(',');
          window.addEventListener('load', () => {
            for (var i = 0; i < _mydynchunks.length; i++) {
              let ref = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
              let runtimejs = _mydynchunks[i];
              var script = document.createElement("script");
              script.src = runtimejs;
              script.defer = true;
              script.crossorigin = "anonymous";
              ref.appendChild(script);
            }
          })`,
          }}
        />
      );
    } catch (e) {
      console.log(e);
      return super.getDynamicChunks(files);
    }
  }
}

export default CustomHead;
