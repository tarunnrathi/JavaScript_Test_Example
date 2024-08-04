import React, { useState } from "react";

const Scorecard = (props) => {
    function _convertedToSlug(Text)
    {
        if(Text) {
            return Text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
}
    }

    const _jsonp = (function() {
        const that = {};
        that.send = function(src, options) {
          const callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function() {},
            on_timeout = options.onTimeout || function() {},
            timeout = options.timeout || 10; // sec

          const timeout_trigger = window.setTimeout(function() {
            window[callback_name] = function() {};
            on_timeout();
          }, timeout * 1000);

          window[callback_name] = function(data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
          };

          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = src;

          document.getElementsByTagName('head')[0].appendChild(script);
        };
        return that;
      })();

    const [data, setData] = useState({});

    // useEffect(() => {
    //     setTimeout(() => {

    //         _jsonp.send('//cricketnext.nw18.com/json/crosslivescores.json', {
    //         callbackName: 'scores',
    //         onSuccess: function(response){
    //                 const matchData = {};
    //                 matchData['allMatches'] = [];
    //                 let matchesDetails = response.matches;
    //                 matchData['allMatches'].push('liveMatchData');
    //                 setData(matchData['allMatches']);
    //                 //setData(matchesDetails);
    //             },
    //             onTimeout: function(){
    //                 console.log('timeout!');
    //             },
    //             timeout: 5
    //         });

    //     }, 10000)
    // }, []);
    //console.log(data);

  return (

    <>

         <style jsx>{`
         
    `}</style>
    </>

  );
};
export default Scorecard;
