Home widget
version :  0.18


 1 - Loksabha widget
  1.1-Across site exit poll
        version : 2.0

        You can import this component anywhere in your  application like this
        const LSAcross = dynamic(() => import('@/common_react/CommonSrc/CommonComponents/election/LSAcross'))

        You can use component anywhere in your application like this :
        <LSAcross instance={'exit'} lang={langcode} mode={'prod'} />

 1.2. Across site result widget
        version : 2.0 

        You can import this component anywhere in your  application like this:
        const LSCountingDay = dynamic(() =>import('@/common_react/CommonSrc/CommonComponents/election/LSCountingDay'))

        You can use component anywhere in your application like this :
        <LSCountingDay instance={'lsresult'} lang={langcode} mode={'prod'} />  

 1.3. Lokasabha result widget js file
        version : 1.0
        URL :  "https://elections-v3-json.news18.com/feed/iframe/LS_Counting.js"

        Import this file in your project and call it inside a div with id="ls_count_widget". Like this:
        <div id="ls_count_widget"></div>

 1.4 Exit poll iframe
         version : 1.0
         URL : "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_Poll_Iframe.html"  
         OtherLangURL :  "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_Poll_Iframe.html"?lang={langcode}

1.5 Exit across site iframe
         version : 1.0
         URL : "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_poll_Across.html"
         OtherLangURL : "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_poll_Across.html"?lang={langcode}

1.6 Exit poll details iframe
         version : 1.0
         URL : "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_poll_Detail.html" 
         OtherLangURL : "https://elections-v3-json.news18.com/feed/iframe/LS_Exit_poll_Detail.html"?lang={langcode}

1.7 Exit poll amp iframe
         version : 1.0
         URL : "https://elections-v3-json.news18.com/feed/iframe/AMP_Exit_Poll_Iframe.html"  
         OtherLangURL : "https://elections-v3-json.news18.com/feed/iframe/AMP_Exit_Poll_Iframe.html"?lang={langcode}        


2 - Assembly widgets
  2.1-Across site exit poll
        version : 2.0
        You can import this component anywhere in your  application like this
        const LSAcross = dynamic(() => import('@/common_react/CommonSrc/CommonComponents/election/LSAcross'))
        You can use component anywhere in your application like this :
        <LSAcross instance={'exit'} lang={langcode} mode={'prod'} />

 2.2. Across site result widget
        version :2.0  
        You can import this component anywhere in your  application like this:
        const ASCountingDay = dynamic(() =>import('@/common_react/CommonSrc/CommonComponents/election/ASCountingDay'));
       You can use component anywhere in your application like this :
        <ASCountingDay instance={'result'} lang={langcode} mode={'prod'} />  

 2.3. Assembly result widget js file
        version :  1.0
        URL :  "https://elections-v3-json.news18.com/feed/iframe/AS_Counting.js"

        Import this file in your project and call it inside a  div with id="as_count_widget". Like this:
        <div id="as_count_widget"></div>

        




       