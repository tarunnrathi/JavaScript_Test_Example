// import { empty } from "./php.helper.js";

const categoryHelper = {
    manoranjanTopUrlArray: function () {
      let manoranjanTopUrlArray = [];
      manoranjanTopUrlArray = [
        {
          slug: "/news/entertainment/bollywood/",
          name: "बॉलीवुड",
          section: "entertainment",
          sub_section: "bollywood",
          type: "",
        },
        {
          slug: "/news/entertainment/web-series/",
          // name: "वेब सीरीज़",
          name: "ओटीटी वेब सीरीज़",
          type: "",
          section: "entertainment",
          sub_section: "web-series",
        },

        {
          slug: "/news/entertainment/tv/",
          name: "TV",
          type: "box",
          section: "entertainment",
          sub_section: "tv",
        },
        // {
        //   slug: "/news/entertainment/bhojpuri/",
        //   name: "भोजपुरी",
        //   section: "entertainment",
        //   sub_section: "bhojpuri",
        // },
        {
          slug: "/news/entertainment/film-review/",
          name: "फ़िल्म रिव्यू",
          type: "",
          section: "entertainment",
          sub_section: "film-review",
        },

        {
          slug: "/news/entertainment/viral-social/",
          name: "सोशल / वायरल",
          section: "entertainment",
          sub_section: "viral-social",
        },
        {
          slug: "/news/entertainment/south-cinema/",
          name: "साउथ सिनेमा",
          section: "entertainment",
          sub_section: "south-cinema",
        },
        {
          slug: "/photogallery/entertainment/",
          name: "फ़ोटो गैलरी",
          section: "photogallery",
          sub_section: "entertainment",
        },
        {
          slug: "/web-stories/entertainment/",
          name: "वेब स्टोरीज",
          section: "entertainment",
          sub_section: "web-stories",
        },
        {
          slug: "/videos/entertainment/",
          name: "वीडियो",
          section: "entertainment",
          sub_section: "videos",
        },
        // {
        //   slug: "/news/entertainment/hollywood/",
        //   name: "हॉलीवुड",
        //   section: "entertainment",
        //   sub_section: "hollywood",
        // },
      ];
      return manoranjanTopUrlArray;
    },

  //   all_states: function (state = "", key = "") {
  //     const states = {
  //       "uttar-pradesh": "उत्तर प्रदेश",
  //       bihar: "बिहार",
  //       "madhya-pradesh": "मध्य प्रदेश",
  //       rajasthan: "राजस्थान",
  //       uttarakhand: "उत्तराखंड",
  //       haryana: "हरियाणा",
  //       jharkhand: "झारखंड",
  //       chhattisgarh: "छत्तीसगढ़",
  //       "himachal-pradesh": "हिमाचल प्रदेश",
  //     };
  //     if (empty(state)) {
  //       return empty(key) ? states : Object.keys(states);
  //     } else {
  //       return states[state];
  //     }
  //   },

  //   getSliderCategoryArray: function () {
  //     const sliderArray = [
  //       "cricket",
  //       "states",
  //       "auto",
  //       "business",
  //       "entertainment",
  //       "manoranjan",
  //       "tech",
  //       "lifestyle",
  //       "film-review",
  //       "bollywood",
  //       "hollywood",
  //       "recipe",
  //       "knowledge",
  //       "human-stories",
  //     ];
  //     return sliderArray;
  //   },

    getCategoryTopSliderAndBottomBoxList: function (section = "") {
      let categoryWiseSliderNbottomUrl = {};
      categoryWiseSliderNbottomUrl = {
        sports: {
          bottomListing: [
            {
              slug: "/news/sports/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "box",
            },
            {
              slug: "/news/sports/football/",
              sectionName: "football",
              name: "फुटबॉल",
              type: "",
            },
            {
              slug: "/photogallery/sports/",
              sectionName: "photogallery",
              section: "photogallery",
              name: "फोटो",
              type: "box",
            },
            {
              slug: "/videos/sports/",
              sectionName: "videos",
              videos: "sports",
              name: "वीडियो",
              type: "",
            },
            {
              slug: "/news/sports/tennis/",
              sectionName: "tennis",
              name: "टेनिस",
              type: "box",
            },
            {
              slug: "/news/sports/hockey/",
              sectionName: "hockey",
              name: "हॉकी",
              type: "",
            },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/sports/cricket/",
              section: "cricket",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "box",
            },
            {
              slug: "/cricketnext/cricket-live-scorecard/",
              section: "/cricketnext/cricket-live-scorecard/",
              sectionName: "/cricketnext/cricket-live-scorecard/",
              name: "लाइव स्कोर",
              type: "box",
            },
            {
              slug: "/photogallery/sports/",
              sectionName: "photogallery",
              section: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/",
              sectionName: "videos",
              section: "videos",
              name: "वीडियो",
              type: "",
            },
            {
              slug: "/news/sports/football/",
              sectionName: "football",
              section: "football",
              name: "फुटबॉल",
              type: "box",
            },
            {
              slug: "/news/sports/tennis/",
              sectionName: "tennis",
              section: "videos",
              name: "टेनिस",
              type: "",
            },
            {
              slug: "/news/sports/hockey/",
              sectionName: "hockey",
              section: "hockey",
              name: "हॉकी",
              type: "",
            },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              section: "others",
              name: "अन्य खेल",
              type: "box",
            },
          ],
          dropdown: [
            {
              slug: "/news/sports/cricket/",
              section: "cricket",
              name: "क्रिकेट",
            },
            { slug: "/news/sports/hockey", section: "hockey", name: "हॉकी" },
            { slug: "/news/sports/tennis/", section: "tennis", name: "टेनिस" },
            {
              slug: "/news/sports/football/",
              section: "football",
              name: "फुटबॉल",
            },
            { slug: "/news/sports/others/", section: "others", name: "अन्य खेल" },
          ],
        },
        business: {
          bottomListing: [
            {
              slug: "/news/business/railways/",
              sectionName: "railways",
              name: "रेलवे",
              type: "box",
            },
            {
              slug: "/news/business/money-making-tips/",
              sectionName: "money-making-tips",
              name: "पैसा बनाओ",
              type: "box",
            },
            {
              slug: "/news/business/success-story/",
              sectionName: "success-story",
              name: "सक्सेस स्टोरी",
              type: "box",
            },
            {
              slug: "/news/business/expressways/",
              sectionName: "expressways",
              name: "एक्सप्रेसवे",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/business/money-making-tips/",
              sectionName: "money-making-tips",
              name: "पैसा बनाओ",
              type: "box",
            },
            {
              slug: "/news/business/success-story/",
              sectionName: "success-story",
              name: "सक्सेस स्टोरी",
              type: "",
            },
            {
              slug: "/news/business/online-business/",
              sectionName: "online-business",
              name: "ऑनलाइन बिज़नेस",
              type: "box",
            },
            {
              slug: "/news/business/innovation/",
              sectionName: "innovation",
              name: "इनोवेशन",
              type: "",
            },
          ],
        },
        cricket: {
          bottomListing: [
            {
              slug: "/news/sports/cricket",
              sectionName: "news",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/cricket/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/cricket/videos/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/cricketnext/cricket-live-scorecard/",
              sectionName: "/cricketnext/cricket-live-scorecard/",
              name: "लाइव स्कोर",
              type: "box",
            },
            {
              slug: "/photogallery/sports/cricket/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/cricket/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
            {
              slug: "/news/sports/football",
              sectionName: "football",
              name: "फुटबॉल",
              type: "box",
            },
            {
              slug: "/news/sports/tennis",
              sectionName: "tennis",
              name: "टेनिस",
              type: "",
            },
            {
              slug: "/news/sports/hockey/",
              sectionName: "hockey",
              section: "hockey",
              name: "हॉकी",
              type: "",
            },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
              type: "box",
            },
          ],
          dropdown: [
            { slug: "/news/sports/football/", name: "फुटबॉल" },
            { slug: "/news/sports/tennis/", name: "टेनिस" },
            { slug: "/news/sports/hockey/", name: "हॉकी" },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
            },
          ],
        },
        hockey: {
          bottomListing: [
            {
              slug: "/news/sports/hockey/",
              sectionName: "news",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/hockey/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/hockey/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/sports/hockey/",
              sectionName: "hockey",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/hockey/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/hockey/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
          ],
          dropdown: [
            { slug: "/news/sports/football/", name: "फुटबॉल" },
            { slug: "/news/sports/tennis/", name: "टेनिस" },
            { slug: "/news/sports/cricket/", name: "क्रिकेट" },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
            },
          ],
        },
        tennis: {
          bottomListing: [
            {
              slug: "/news/sports/tennis/",
              sectionName: "news",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/tennis/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/tennis/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/sports/tennis/",
              sectionName: "football",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/tennis/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/tennis/",
              sectionName: "video",
              name: "वीडियो",
              type: "box",
            },
          ],
          dropdown: [
            {
              slug: "/news/sports/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
            },
            {
              slug: "/news/sports/football/",
              sectionName: "football",
              name: "फुटबॉल",
            },
            { slug: "/news/sports/hockey/", sectionName: "hockey", name: "हॉकी" },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
            },
          ],
        },
        football: {
          bottomListing: [
            {
              slug: "/news/sports/football/",
              sectionName: "news",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/cricket/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/cricket/",
              sectionName: "videos",
              name: "वीडियो",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/sports/football/",
              sectionName: "football",
              name: "खबरें",
              type: "box",
            },
            {
              slug: "/photogallery/sports/football/",
              sectionName: "photogallery",
              name: "फोटो",
              type: "",
            },
            {
              slug: "/videos/sports/football/",
              sectionName: "video",
              name: "वीडियो",
              type: "box",
            },
          ],
          dropdown: [
            {
              slug: "/news/sports/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
            },
            {
              slug: "/news/sports/tennis/",
              sectionName: "tennis",
              name: "टेनिस",
            },
            { slug: "/news/sports/hockey/", sectionName: "hockey", name: "हॉकी" },
            {
              slug: "/news/sports/others/",
              sectionName: "others",
              name: "अन्य खेल",
            },
          ],
        },
        tech: {
          bottomListing: [
            {
              slug: "/news/tech/launch-review/",
              sectionName: "launch-review",
              name: "लॉन्च/रिव्यू",
              type: "box",
            },
            {
              slug: "/news/tech/apps/",
              sectionName: "apps",
              name: "ऐप्स",
              type: "",
            },
            {
              slug: "/news/tech/accessories/",
              sectionName: "accessories",
              name: "एसेसरीज़",
              type: "box",
            },
            {
              slug: "/videos/tech/",
              sectionName: "videos",
              name: "वीडियो",
              type: "",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/tech/launch-review/",
              sectionName: "launch-review",
              name: "लॉन्च/रिव्यू",
              type: "box",
            },
            {
              slug: "/news/tech/apps/",
              sectionName: "apps",
              name: "ऐप्स",
              type: "",
            },
            {
              slug: "/news/tech/accessories/",
              sectionName: "accessories",
              name: "एसेसरीज़",
              type: "box",
            },
            {
              slug: "/news/tech/diy/",
              sectionName: "diy",
              name: "डीआईवाई",
              type: "box",
            },
            {
              slug: "/videos/tech/",
              sectionName: "videos",
              name: "वीडियो",
              type: "",
            },
          ],
          dropdown: [],
        },
        auto: {
          bottomListing: [
            {
              slug: "/news/auto/cars/",
              sectionName: "cars",
              name: "कार",
              type: "box",
            },
            {
              slug: "/news/auto/bikes/",
              sectionName: "bikes",
              name: "बाइक",
              type: "",
            },
            {
              slug: "/videos/auto/",
              sectionName: "videos",
              name: "वीडियो",
              type: "",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/auto/cars/",
              sectionName: "cars",
              name: "कार",
              type: "box",
            },
            {
              slug: "/news/auto/bikes/",
              sectionName: "bikes",
              name: "बाइक",
              type: "",
            },
            {
              slug: "/videos/auto/",
              sectionName: "videos",
              name: "वीडियो",
              type: "",
            },
          ],
          dropdown: [],
        },

        // lifestyle: {
        //   bottomListing: [
        //     {
        //       slug: "/news/lifestyle/trends/",
        //       sectionName: "trends",
        //       name: "ट्रेंड्स",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/relationships/",
        //       sectionName: "relationships",
        //       name: "रिश्ते",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/health/",
        //       sectionName: "health",
        //       name: " वेलनेस",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/recipe/",
        //       sectionName: "recipe",
        //       name: "पकवान",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/young-parents/",
        //       sectionName: "young-parents",
        //       name: "यंग पेरेंट्स",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/culture/",
        //       sectionName: "culture",
        //       name: "कल्चर",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/travel/",
        //       sectionName: "travel",
        //       name: " यात्रा",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/long-read/",
        //       sectionName: "long-read",
        //       name: "लॉन्ग रीड",
        //       type: "",
        //     },
        //   ],
        //   topSliderUrl: [
        //     {
        //       slug: "/news/lifestyle/trends/",
        //       sectionName: "trends",
        //       name: "ट्रेंड्स",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/relationships/",
        //       sectionName: "relationships",
        //       name: "रिश्ते",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/health/",
        //       sectionName: "health",
        //       name: " वेलनेस",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/recipe/",
        //       sectionName: "recipe",
        //       name: "पकवान",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/young-parents/",
        //       sectionName: "young-parents",
        //       name: "यंग पेरेंट्स",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/culture/",
        //       sectionName: "culture",
        //       name: "कल्चर",
        //       type: "",
        //     },
        //     {
        //       slug: "/news/lifestyle/travel/",
        //       sectionName: "travel",
        //       name: " यात्रा",
        //       type: "box",
        //     },
        //     {
        //       slug: "/news/lifestyle/long-read/",
        //       sectionName: "long-read",
        //       name: "लॉन्ग रीड",
        //       type: "",
        //     },
        //   ],
        //   dropdown: [],
        // },
        photogallery: {
          bottomListing: [
            {
              slug: "/photogallery/entertainment/",
              sectionName: "manoranjan",
              name: "मनोरंजन",
              type: "box",
            },
            {
              slug: "/photogallery/sports/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "",
            },
            {
              slug: "/photogallery/tech/",
              sectionName: "tech",
              name: " मोबाइल-टेक",
              type: "box",
            },
            {
              slug: "/photogallery/auto/",
              sectionName: "auto",
              name: "ऑटो",
              type: "",
            },
            {
              slug: "/photogallery/lifestyle/",
              sectionName: "lifestyle",
              name: "लाइफ़",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/photogallery/entertainment/",
              sectionName: "manoranjan",
              name: "मनोरंजन",
              type: "box",
            },
            {
              slug: "/photogallery/sports/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "",
            },
            {
              slug: "/photogallery/tech/",
              sectionName: "tech",
              name: " मोबाइल-टेक",
              type: "box",
            },
            {
              slug: "/photogallery/auto/",
              sectionName: "auto",
              name: "ऑटो",
              type: "",
            },
            {
              slug: "/photogallery/lifestyle/",
              sectionName: "lifestyle",
              name: "लाइफ़",
              type: "box",
            },
          ],
          dropdown: [],
        },
        videos: {
          bottomListing: [
            {
              slug: "/videos/manoranjan/",
              sectionName: "manoranjan",
              name: "मनोरंजन",
              type: "box",
            },
            {
              slug: "/videos/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "",
            },
            {
              slug: "/videos/tech/",
              sectionName: "tech",
              name: " मोबाइल-टेक",
              type: "box",
            },
            { slug: "/videos/auto/", sectionName: "auto", name: "ऑटो", type: "" },
            {
              slug: "/videos/lifestyle/",
              sectionName: "lifestyle",
              name: "लाइफ़",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/videos/manoranjan/",
              sectionName: "manoranjan",
              name: "मनोरंजन",
              type: "box",
            },
            {
              slug: "/videos/cricket/",
              sectionName: "cricket",
              name: "क्रिकेट",
              type: "",
            },
            {
              slug: "/videos/tech/",
              sectionName: "tech",
              name: " मोबाइल-टेक",
              type: "box",
            },
            { slug: "/videos/auto/", sectionName: "auto", name: "ऑटो", type: "" },
            {
              slug: "/videos/lifestyle/",
              sectionName: "lifestyle",
              name: "लाइफ़",
              type: "box",
            },
          ],
          dropdown: [],
        },
        uttarakhand: {
          bottomListing: [
            {
              slug: "/news/uttarakhand/dehradun/",
              sectionName: "dehradun",
              name: "देहरादून",
              type: "",
            },
            {
              slug: "/news/uttarakhand/haridwar/",
              sectionName: "haridwar",
              name: "हरिद्वार",
              type: "",
            },
            {
              slug: "/news/uttarakhand/nainital/",
              sectionName: "nainital",
              name: "नैनीताल",
              type: "",
            },
            {
              slug: "/news/uttarakhand/uttarkashi/",
              sectionName: "uttarkashi",
              name: "उत्तरकाशी",
              type: "",
            },
            {
              slug: "/news/uttarakhand/almora/",
              sectionName: "almora",
              name: "अल्मोड़ा",
              type: "",
            },
            {
              slug: "/news/uttarakhand/chamoli/",
              sectionName: "chamoli",
              name: "चमोली",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        bihar: {
          bottomListing: [
            {
              slug: "/news/bihar/patna/",
              sectionName: "patna",
              name: "पटना",
              type: "",
            },
            {
              slug: "/news/bihar/muzaffarpur/",
              sectionName: "muzaffarpur",
              name: "मुजफ्फरपुर",
              type: "",
            },
            {
              slug: "/news/bihar/gaya/",
              sectionName: "gaya",
              name: "गया",
              type: "",
            },
            {
              slug: "/news/bihar/purnia/",
              sectionName: "purnia",
              name: "पूर्णिया",
              type: "",
            },
            {
              slug: "/news/bihar/bhagalpur/",
              sectionName: "bhagalpur",
              name: "भागलपुर",
              type: "",
            },
            {
              slug: "/news/bihar/darbhanga/",
              sectionName: "darbhanga",
              name: "दरभंगा",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        "uttar-pradesh": {
          bottomListing: [
            {
              slug: "/news/uttar-pradesh/lucknow/",
              sectionName: "lucknow",
              name: "लखनऊ",
              type: "",
            },
            {
              slug: "/news/uttar-pradesh/varanasi/",
              sectionName: "varanasi",
              name: "वाराणसी",
              type: "",
            },
            {
              slug: "/news/uttar-pradesh/meerut/",
              sectionName: "meerut",
              name: "मेरठ",
              type: "",
            },
            {
              slug: "/news/uttar-pradesh/agra/",
              sectionName: "agra",
              name: "आगरा",
              type: "",
            },
            {
              slug: "/news/uttar-pradesh/allahabad/",
              sectionName: "allahabad",
              name: "इलाहाबाद",
              type: "",
            },
            {
              slug: "/news/uttar-pradesh/kanpur/",
              sectionName: "kanpur",
              name: "कानपुर",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        "madhya-pradesh": {
          bottomListing: [
            {
              slug: "/news/madhya-pradesh/bhopal/",
              sectionName: "bhopal",
              name: "भोपाल",
              type: "",
            },
            {
              slug: "/news/madhya-pradesh/indore/",
              sectionName: "indore",
              name: "इंदौर",
              type: "",
            },
            {
              slug: "/news/madhya-pradesh/gwalior/",
              sectionName: "gwalior",
              name: "ग्वालियर",
              type: "",
            },
            {
              slug: "/news/madhya-pradesh/hoshangabad/",
              sectionName: "hoshangabad",
              name: "होशंगाबाद",
              type: "",
            },
            {
              slug: "/news/madhya-pradesh/harda/",
              sectionName: "harda",
              name: "हरदा",
              type: "",
            },
            {
              slug: "/news/madhya-pradesh/jabalpur/",
              sectionName: "jabalpur",
              name: "जबलपुर",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        rajasthan: {
          bottomListing: [
            {
              slug: "/news/rajasthan/jaipur/",
              sectionName: "jaipur",
              name: "जयपुर",
              type: "",
            },
            {
              slug: "/news/rajasthan/alwar/",
              sectionName: "alwar",
              name: "अलवर",
              type: "",
            },
            {
              slug: "/news/rajasthan/bharatpur/",
              sectionName: "bharatpur",
              name: "भरतपुर",
              type: "",
            },
            {
              slug: "/news/rajasthan/bikaner/",
              sectionName: "bikaner",
              name: "बीकानेर",
              type: "",
            },
            {
              slug: "/news/rajasthan/chittorgarh/",
              sectionName: "chittorgarh",
              name: "चित्तौड़गढ़",
              type: "",
            },
            {
              slug: "/news/rajasthan/dholpur/",
              sectionName: "dholpur",
              name: "धौलपुर",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        haryana: {
          bottomListing: [
            {
              slug: "/news/haryana/chandigarh-city/",
              sectionName: "chandigarh-city",
              name: "चंडीगढ़",
              type: "",
            },
            {
              slug: "/news/haryana/sonipat/",
              sectionName: "sonipat",
              name: "सोनीपत",
              type: "",
            },
            {
              slug: "/news/haryana/panipat/",
              sectionName: "panipat",
              name: "पानीपत",
              type: "",
            },
            {
              slug: "/news/haryana/faridabad/",
              sectionName: "faridabad",
              name: "फरीदाबाद",
              type: "",
            },
            {
              slug: "/news/haryana/ambala/",
              sectionName: "ambala",
              name: "अंबाला",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        jharkhand: {
          bottomListing: [
            {
              slug: "/news/jharkhand/ranchi/",
              sectionName: "ranchi",
              name: "रांची",
              type: "",
            },
            {
              slug: "/news/jharkhand/dhanbad/",
              sectionName: "dhanbad",
              name: "धनबाद",
              type: "",
            },
            {
              slug: "/news/jharkhand/bokaro/",
              sectionName: "bokaro",
              name: "बोकारो",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        chhattisgarh: {
          bottomListing: [
            {
              slug: "/news/chhattisgarh/raipur/",
              sectionName: "raipur",
              name: "रायपुर",
              type: "",
            },
            {
              slug: "/news/chhattisgarh/surguja/",
              sectionName: "surguja",
              name: "सरगुजा",
              type: "",
            },
            {
              slug: "/news/chhattisgarh/bastar/",
              sectionName: "bastar",
              name: "बस्तर",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        "himachal-pradesh": {
          bottomListing: [
            {
              slug: "/news/himachal-pradesh/shimla/",
              sectionName: "shimla",
              name: "शिमला",
              type: "",
            },
            {
              slug: "/news/himachal-pradesh/solan/",
              sectionName: "solan",
              name: "सोलन",
              type: "",
            },
          ],
          topSliderUrl: [],
          dropdown: [],
        },
        entertainment: {
          bottomListing: [
            {
              slug: "/news/entertainment/bollywood/",
              name: "बॉलीवुड",
              section: "entertainment",
              sectionName: "bollywood",
              type: "",
            },
            {
              slug: "/news/entertainment/web-series/",
              name: "ओटीटी वेब सीरीज़",
              type: "",
              section: "entertainment",
              sectionName: "web-series",
            },
            {
              slug: "/news/entertainment/tv/",
              name: "TV",
              type: "box",
              section: "entertainment",
              sectionName: "tv",
            },
            // {
            //   slug: "/news/entertainment/bhojpuri/",
            //   name: "भोजपुरी",
            //   section: "entertainment",
            //   sectionName: "bhojpuri",
            //   type: "",
            // },
            {
              slug: "/news/entertainment/film-review/",
              name: "फ़िल्म रिव्यू",
              type: "",
              section: "entertainment",
              sectionName: "film-review",
            },

            {
              slug: "/news/entertainment/viral-social/",
              name: "सोशल / वायरल",
              section: "entertainment",
              sectionName: "viral-social",
              type: "",
            },
            {
              slug: "/news/entertainment/south-cinema/",
              name: "साउथ सिनेमा",
              section: "entertainment",
              sectionName: "south-cinema",
              type: "",
            },
            // {
            //   slug: "/news/entertainment/hollywood/",
            //   name: "हॉलीवुड",
            //   section: "entertainment",
            //   sectionName: "hollywood",
            //   type: "",
            // },
            {
              slug: "/photogallery/entertainment/",
              name: "फ़ोटो गैलरी",
              section: "photogallery",
              sectionName: "entertainment",
              type: "",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/entertainment/bollywood/",
              name: "बॉलीवुड",
              section: "entertainment",
              sectionName: "bollywood",
              type: "",
            },
            {
              slug: "/news/entertainment/web-series/",
              name: "ओटीटी वेब सीरीज़",
              type: "",
              section: "entertainment",
              sectionName: "web-series",
            },

            {
              slug: "/news/entertainment/tv/",
              name: "TV",
              type: "box",
              section: "entertainment",
              sectionName: "tv",
            },
            // {
            //   slug: "/news/entertainment/bhojpuri/",
            //   name: "भोजपुरी",
            //   section: "entertainment",
            //   sectionName: "bhojpuri",
            //   type: "",
            // },
            {
              slug: "/news/entertainment/film-review/",
              name: "फ़िल्म रिव्यू",
              type: "",
              section: "entertainment",
              sectionName: "film-review",
            },
            {
              slug: "/news/entertainment/viral-social/",
              name: "सोशल / वायरल",
              section: "entertainment",
              sectionName: "viral-social",
              type: "",
            },
            {
              slug: "/news/entertainment/south-cinema/",
              name: "साउथ सिनेमा",
              section: "entertainment",
              sectionName: "south-cinema",
              type: "",
            },
            // {
            //   slug: "/news/entertainment/hollywood/",
            //   name: "हॉलीवुड",
            //   section: "entertainment",
            //   sectionName: "hollywood",
            //   type: "",
            // },
            {
              slug: "/photogallery/entertainment/",
              name: "फ़ोटो गैलरी",
              section: "photogallery",
              sectionName: "photogallery",
              type: "",
            },
            {
              slug: "/web-stories/entertainment/",
              name: "वेब स्टोरीज",
              section: "entertainment",
              sectionName: "web-stories",
              type: "",
            },
            {
              slug: "/videos/entertainment/",
              name: "वीडियो",
              section: "entertainment",
              sectionName: "videos",
              type: "",
            },
          ],
          dropdown: [],
        },
        states: {
          bottomListing: [
            {
              slug: "/news/delhi-ncr/",
              sectionName: "delhi-ncr",
              name: "दिल्ली-एनसीआर",
              type: "box",
            },
            {
              slug: "/news/uttar-pradesh/",
              sectionName: "uttar-pradesh",
              name: "उत्तर प्रदेश",
              type: "box",
            },
            {
              slug: "/news/bihar/",
              sectionName: "bihar",
              name: "बिहार",
              type: "box",
            },
            {
              slug: "/news/madhya-pradesh/",
              sectionName: "madhya-pradesh",
              name: "मध्य प्रदेश",
              type: "box",
            },
            {
              slug: "/news/rajasthan/",
              sectionName: "rajasthan",
              name: "राजस्थान",
              type: "box",
            },
            {
              slug: "/news/uttarakhand/",
              sectionName: "uttarakhand",
              name: "उत्तराखंड",
              type: "box",
            },
            {
              slug: "/news/haryana/",
              sectionName: "haryana",
              name: "हरियाणा",
              type: "box",
            },
            {
              slug: "/news/jharkhand/",
              sectionName: "jharkhand",
              name: "झारखंड",
              type: "box",
            },
            {
              slug: "/news/chhattisgarh/",
              sectionName: "chhattisgarh",
              name: "छत्तीसगढ़",
              type: "box",
            },
            {
              slug: "/news/himachal-pradesh/",
              sectionName: "himachal-pradesh",
              name: "हिमाचल प्रदेश",
              type: "box",
            },
          ],
          topSliderUrl: [
            {
              slug: "/news/delhi-ncr/",
              sectionName: "delhi-ncr",
              name: "दिल्ली-एनसीआर",
              type: "box",
            },
            {
              slug: "/news/uttar-pradesh/",
              sectionName: "uttar-pradesh",
              name: "उत्तर प्रदेश",
              type: "box",
            },
            {
              slug: "/news/bihar/",
              sectionName: "bihar",
              name: "बिहार",
              type: "box",
            },
            {
              slug: "/news/madhya-pradesh/",
              sectionName: "madhya-pradesh",
              name: "मध्य प्रदेश",
              type: "box",
            },
            {
              slug: "/news/rajasthan/",
              sectionName: "rajasthan",
              name: "राजस्थान",
              type: "box",
            },
            {
              slug: "/news/uttarakhand/",
              sectionName: "uttarakhand",
              name: "उत्तराखंड",
              type: "box",
            },
            {
              slug: "/news/haryana/",
              sectionName: "haryana",
              name: "हरियाणा",
              type: "box",
            },
            {
              slug: "/news/jharkhand/",
              sectionName: "jharkhand",
              name: "झारखंड",
              type: "box",
            },
            {
              slug: "/news/chhattisgarh/",
              sectionName: "chhattisgarh",
              name: "छत्तीसगढ़",
              type: "box",
            },
            {
              slug: "/news/himachal-pradesh/",
              sectionName: "himachal-pradesh",
              name: "हिमाचल प्रदेश",
              type: "box",
            },
          ],
          dropdown: [],
        },
        lifestyle: {
          bottomListing: [
            {
              name: "हेल्थ & फिटनेस",
              sectionName: "health",
              type: "0",
              slug: "/news/lifestyle/health/",
            },
            {
              name: "टिप्स एंड ट्रिक्स",
              sectionName: "tips-and-tricks",
              type: "0",
              slug: "/news/lifestyle/tips-and-tricks/",
            },
            {
              name: "रिलेशनशिप",
              sectionName: "relationships",
              type: "0",
              slug: "/news/lifestyle/relationships/",
            },
            {
              name: "पेरैंटिंग",
              sectionName: "parenting",
              type: "0",
              slug: "/news/lifestyle/parenting/",
            },
            {
              name: "फूड",
              sectionName: "recipe",
              type: "0",
              slug: "/news/lifestyle/recipe/",
            },
            {
              name: "ट्रैवल",
              sectionName: "travel",
              type: "0",
              slug: "/news/lifestyle/travel/",
            },                  
            {
              name: "फैशन",
              sectionName: "fashion",
              type: "0",
              slug: "/news/lifestyle/fashion/",
            },
            {
              name: "धर्म",
              sectionName: "dharm",
              type: "0",
              slug: "/news/dharm/",
            },
            {
              name: "राशि",
              sectionName: "astro",
              type: "0",
              slug: "/news/lifestyle/astro/",
            },
            {
              name: "किताबें",
              sectionName: "book-review",
              type: "0",
              slug: "/news/lifestyle/book-review/",
            },
            {
              name: "नारी विशेष",
              sectionName: "women-special",
              type: "0",
              slug: "/news/lifestyle/women-special/",
            },
          ],
          topSliderUrl: [
            {
              name: "हेल्थ & फिटनेस",
              sectionName: "health",
              type: "0",
              slug: "/news/lifestyle/health/",
            },
            {
              name: "टिप्स एंड ट्रिक्स",
              sectionName: "tips-and-tricks",
              type: "0",
              slug: "/news/lifestyle/tips-and-tricks/",
            },
            {
              name: "रिलेशनशिप",
              sectionName: "relationships",
              type: "0",
              slug: "/news/lifestyle/relationships/",
            },
            {
              name: "पेरैंटिंग",
              sectionName: "parenting",
              type: "0",
              slug: "/news/lifestyle/parenting/",
            },
            {
              name: "फूड",
              sectionName: "recipe",
              type: "0",
              slug: "/news/lifestyle/recipe/",
            },
            {
              name: "ट्रैवल",
              sectionName: "travel",
              type: "0",
              slug: "/news/lifestyle/travel/",
            },                  
            {
              name: "फैशन",
              sectionName: "fashion",
              type: "0",
              slug: "/news/lifestyle/fashion/",
            },
            {
              name: "धर्म",
              sectionName: "dharm",
              type: "0",
              slug: "/news/dharm/",
            },
            {
              name: "राशि",
              sectionName: "astro",
              type: "0",
              slug: "/news/lifestyle/astro/",
            },
            {
              name: "किताबें",
              sectionName: "book-review",
              type: "0",
              slug: "/news/lifestyle/book-review/",
            },
            {
              name: "नारी विशेष",
              sectionName: "women-special",
              type: "0",
              slug: "/news/lifestyle/women-special/",
            },
          ],
          dropdown: [],
        },
        world: {
          bottomListing: [
            {
              name: "अमेरिका",
              sectionName: "america",
              type: "",
              slug: "/news/world/america/",
            },
            {
              name: "चीन",
              sectionName: "china",
              type: "",
              slug: "/news/world/china/",
            },
            {
              name: "पाकिस्तान",
              sectionName: "pakistan",
              type: "",
              slug: "/news/world/pakistan/",
            },
            {
              name: "ब्रिटेन",
              sectionName: "britain",
              type: "",
              slug: "/news/world/britain/",
            },
            {
              name: "मिडिल ईस्ट",
              sectionName: "middle-east",
              type: "",
              slug: "/news/world/middle-east/",
            },
            {
              name: "साउथ एशिया",
              sectionName: "south-asia",
              type: "",
              slug: "/news/world/south-asia/",
            },
            {
              name: "अन्य देश",
              sectionName: "rest-of-world",
              type: "",
              slug: "/news/world/rest-of-world/",
            },
            {
              name: "NRI",
              sectionName: "nri",
              type: "",
              slug: "/news/world/nri/",
            },
            {
              name: "सोशल/वायरल",
              sectionName: "social-viral",
              type: "",
              slug: "/news/world/social-viral/",
            },
            {
              name: "इंटरनेश्नल स्टडीज",
              sectionName: "international-studies",
              type: "",
              slug: "/news/world/international-studies/",
            },
          ],
          topSliderUrl: [
            {
              name: "अमेरिका",
              sectionName: "america",
              type: "",
              slug: "/news/world/america/",
            },
            {
              name: "चीन",
              sectionName: "china",
              type: "",
              slug: "/news/world/china/",
            },
            {
              name: "पाकिस्तान",
              sectionName: "pakistan",
              type: "",
              slug: "/news/world/pakistan/",
            },
            {
              name: "ब्रिटेन",
              sectionName: "britain",
              type: "",
              slug: "/news/world/britain/",
            },
            {
              name: "मिडिल ईस्ट",
              sectionName: "middle-east",
              type: "",
              slug: "/news/world/middle-east/",
            },
            {
              name: "साउथ एशिया",
              sectionName: "south-asia",
              type: "",
              slug: "/news/world/south-asia/",
            },
            {
              name: "अन्य देश",
              sectionName: "rest-of-world",
              type: "",
              slug: "/news/world/rest-of-world/",
            },
            {
              name: "NRI",
              sectionName: "nri",
              type: "",
              slug: "/news/world/nri/",
            },
            {
              name: "सोशल/वायरल",
              sectionName: "social-viral",
              type: "",
              slug: "/news/world/social-viral/",
            },
            {
              name: "इंटरनेश्नल स्टडीज",
              sectionName: "international-studies",
              type: "",
              slug: "/news/world/international-studies/",
            },
          ],
          dropdown: [],
        },
      };
      if (section === "") {
        return categoryWiseSliderNbottomUrl;
      } else {
        const sectionParam = section.trim();
        return categoryWiseSliderNbottomUrl[sectionParam];
      }
    },

  //   getStateWiseDropDrownListing: function () {
  //     const stateWiseDisticet = {
  //       dropdown: [
  //         { slug: "bihar", name: "बिहार" },
  //         { slug: "uttar-pradesh", name: "उत्तर प्रदेश" },
  //         { slug: "madhya-pradesh", name: "मध्य प्रदेश" },
  //         { slug: "rajasthan", name: "राजस्थान" },
  //         { slug: "uttarakhand", name: "उत्तराखंड" },
  //         { slug: "haryana", name: "हरियाणा" },
  //         { slug: "jharkhand", name: "झारखंड" },
  //         { slug: "chhattisgarh", name: "छत्तीसगढ़" },
  //         { slug: "himachal-pradesh", name: "हिमाचल प्रदेश" },
  //         { slug: "maharashtra", name: "महाराष्ट्र" },
  //       ],
  //     };

  //     return stateWiseDisticet;
  //   },

    get_section: function (slug, categoryListData) {
      if (typeof categoryListData !== "undefined" && categoryListData !== "") {
        let modifiedSlug = slug; // Create a new variable to hold the modified value
        if (slug === "desh") {
          modifiedSlug = "nation";
        } else if (slug === "khel") {
          modifiedSlug = "sports";
        } else if (slug === "manoranjan") {
          modifiedSlug = "entertainment";
        } else if (slug === "karobar") {
          modifiedSlug = "business";
        } else if (slug === "chalo-ghoom-aayen") {
          modifiedSlug = "travel";
        } else if (slug === "ghar-parivar") {
          modifiedSlug = "family-and-welfare";
        } else if (slug === "duniya") {
          modifiedSlug = "world";
        } else if (slug === "dharm-karm") {
          modifiedSlug = "spirituality";
        }
        return categoryListData[modifiedSlug];
      } else {
        return [];
      }
    },

    getCityList: function () {
      let topList = [];
      topList = [
        {
          bihar: {
            "/bihar/patna/": "पटना",
            "/bihar/muzaffarpur/": "मुजफ्फरपुर",
            "/bihar/gaya/": "गया",
            "/bihar/purnia/": "पूर्णिया",
            "/bihar/bhagalpur/": "भागलपुर",
            "/bihar/darbhanga/": "दरभंगा",
            "/bihar/nawada/": "नवादा",
            "/bihar/east-champaran/": "पूर्वी चंपारण",
          },
        },
        {
          chhattisgarh: {
            "/chhattisgarh/raipur/": "रायपुर",
            "/chhattisgarh/surguja/": "सरगुजा",
            "/chhattisgarh/bastar/": "बस्तर",
            "/chhattisgarh/bilaspur/": "बिलासपुर",
            "/chhattisgarh/korba/": "कोरबा",
            "/chhattisgarh/raigarh/": "रायगढ़",
          },
        },
        {
          "himachal-pradesh": {
            "/himachal-pradesh/shimla/": "शिमला",
            "/himachal-pradesh/solan/": "सोलन",
            "/himachal-pradesh/una/": "ऊना",
            "/himachal-pradesh/hamirpur/": "हमीरपुर",
            "/himachal-pradesh/mandi/": "मंडी",
            "/himachal-pradesh/dharamsala/": "धर्मशाला",
          },
        },
        {
          haryana: {
            "/haryana/chandigarh-city/": "चंडीगढ़",
            "/haryana/sonipat/": "सोनीपत",
            "/haryana/panipat/": "पानीपत",
            "/haryana/faridabad/": "फरीदाबाद",
            "/haryana/ambala/": "अंबाला",
            "/haryana/gurgaon/": "गुरुग्राम",
          },
        },
        {
          jharkhand: {
            "/jharkhand/ranchi/": "रांची",
            "/jharkhand/dhanbad/": "धनबाद",
            "/jharkhand/bokaro/": "बोकारो",
            "/jharkhand/jamshedpur": "जमशेदपुर",
            "/jharkhand/deoghar/": "देवघर",
            "/jharkhand/dumka/": "दुमका",
          },
        },
        {
          rajasthan: {
            "/rajasthan/jaipur/": "जयपुर",
            "/rajasthan/alwar/": "अलवर",
            "/rajasthan/bharatpur/": "भरतपुर",
            "/rajasthan/bikaner": "बीकानेर",
            "/rajasthan/chittorgarh/": "चित्तौड़गढ़",
            "/rajasthan/dholpur/": "धौलपुर",
          },
        },
        {
          uttarakhand: {
            "/uttarakhand/dehradun/": "देहरादून",
            "/uttarakhand/haridwar/": "हरिद्वार",
            "/uttarakhand/nainital/": "नैनीताल",
            "/uttarakhand/uttarkashi/": "उत्तरकाशी",
            "/uttarakhand/almora/": "अल्मोड़ा",
            "/uttarakhand/chamoli/": "चमोली",
          },
        },
        {
          "uttar-pradesh": {
            "/uttar-pradesh/lucknow/": "लखनऊ",
            "/uttar-pradesh/varanasi/": "वाराणसी",
            "/uttar-pradesh/meerut/": "मेरठ",
            "/uttar-pradesh/agra/": "आगरा",
            "/uttar-pradesh/allahabad/": "इलाहाबाद",
            "/uttar-pradesh/kanpur/": "कानपुर",
            "/uttar-pradesh/bareilly/": "बरेली",
            "/uttar-pradesh/saharanpur/": "सहारनपुर",
          },
        },
        {
          "madhya-pradesh": {
            "/madhya-pradesh/bhopal/": "भोपाल",
            "/madhya-pradesh/indore/": "इंदौर",
            "/madhya-pradesh/vidisha-madhya-pradesh/": "विदिशा",
            "/madhya-pradesh/hoshangabad/": "होशंगाबाद",
            "/madhya-pradesh/harda/": "हरदा",
            "/madhya-pradesh/jabalpur/": "जबलपुर",
            "/madhya-pradesh/balaghat/": "बालाघाट",
            "/madhya-pradesh/gwalior/": "ग्वालियर",
          },
        },
      ];
      return topList;
    },

  getHeadNameList: function (section) {
    let topList = [];
    const sectionParam = section.trim();
    topList = {
      "film-review": "मूवी रिव्यूज़ (Movie Reviews)",
      bhojpuri: "भोजपुरी (Bhojpuri Cinema News)",
      hollywood: "हॉलीवुड (Hollywood News)",
      south: "साउथ सिनेमा (South Cinema News)",
      tech: "टेक्नोलॉजी (Technology News)",
      knowledge: "नॉलेज (Knowledge)",
      lifestyle: "लाइफस्टाइल (Lifestyle Trends)",
      "web-series": "वेब सीरीज़ ( OTT And Webseries)",
      dharm: "धर्म (Spiritual And Religious)",
      world: "दुनिया (World News)",
      auto: "ऑटो (Auto News)",
      recipe: "खाना (FOOD Recipe)",
      career: "करियर (Career News)",
      sports: "खेल (Sports News)",
      india: "देश (India News)",
      cricket: "क्रिकेट (Cricket News)",
      youtube: "यूट्यूब ( Trending Youtube Videos)",
      accessories: "एसेसरीज़ (Mobile Phone Accessories)",
      "launch-review": "लॉन्च / रिव्यू ( Mobile Launch And Review)",
      astro: "एस्ट्रो ( Astrology News)",
      "uttar-pradesh": "उत्तर प्रदेश ( TOP Uttar-Pradesh News)",
      entertainment: "मनोरंजन (Entertainment News)",
      bollywood: "बॉलीवुड (Bollywood News)",
      states: "राज्य (States News)",
    };
  },

  //     return topList[sectionParam] || false;
  //   },
  //   getChannelList: function (section) {
  //     let channelList = [];
  //     const sectionParam = section.trim();
  //     channelList = {
  //       "uttar-pradesh": "news18-uttar-pradesh-uttarakhand",
  //       bihar: "news18-bihar-jharkhand",
  //       "madhya-pradesh": "news18-madhya-pradesh-chhattisgarh",
  //       rajasthan: "news18-rajasthan",
  //       uttarakhand: "news18-uttar-pradesh-uttarakhand",
  //       haryana: "news18-haryana",
  //       jharkhand: "news18-bihar-jharkhand",
  //       chhattisgarh: "news18-madhya-pradesh-chhattisgarh",
  //       "himachal-pradesh": "news18-haryana",
  //     };
  //     return channelList[sectionParam] || false;
  //   },
  //   getStreamChannel: function (channel) {
  //     let channelList = [];
  //     const channelParam = channel.trim();
  //     channelList = {
  //       "news18-rajasthan": "news18rajasthan",
  //       "news18-uttar-pradesh-uttarakhand": "news18up",
  //       "news18-madhya-pradesh-chhattisgarh": "news18mp",
  //       "news18-bihar-jharkhand": "news18bihar",
  //       "news18-haryana": "news18haryana",
  //       "cnn-ibn": "cnnibn",
  //       ibn7: "ibn7",
  //       "ibn-lokmat": "ibnlokmat",
  //       "news18-gujarati": "etvgujrathinews",
  //       "news18-bangla": "etvbangla",
  //       "news18-kannada": "etvkannada",
  //       "news18-urdu": "etvurdu",
  //       "news18-odia": "news18odia",
  //       news18kerala: "NEWS18KERALA",
  //       news18assam: "NEWS18ASSAM",
  //       news18tamil: "NEWS18TAMIL",
  //     };
  //     return channelList[channelParam] || false;
  //   },
  //   getChannelDetails: function (channel) {
  //     const allLiveTvArray = {
  //       news18India: {
  //         icon: "https://hindi.news18.com/js/image/News18%20INDIA_LOGO_WEB_NEW_2.png",
  //         name: "News18 India",
  //         url: "https://hindi.news18.com/livetv/",
  //         target: "_self",
  //       },
  //       "etv-haryana": {
  //         icon: "https://hindi.news18.com/js/image/news18-punjab-haryana-himachal.gif",
  //         name: "news18 punjab, haryana, himachal",
  //         url: "http://www.news18punjab.com/",
  //         target: "_blank",
  //       },
  //       "etv-rajasthan": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20Rajasthan.png",
  //         name: "etv_rajasthan",
  //         url: "https://hindi.news18.com/livetv/etv-rajasthan/",
  //         target: "_self",
  //       },
  //       "etv-uttar-pradesh-uttarakhand": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20UP.png",
  //         name: "etv_uttar_pradesh, uttarakhand",
  //         url: "https://hindi.news18.com/livetv/etv-uttar-pradesh-uttarakhand/",
  //         target: "_self",
  //       },
  //       "etv-bihar-jharkhand": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20Bihar%20Jharkhand.png",
  //         name: "etv_bihar, jharkhand",
  //         url: "https://hindi.news18.com/livetv/etv-bihar-jharkhand/",
  //         target: "_self",
  //       },
  //       "etv-madhya-pradesh-chhattisgarh": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20MpCg.png",
  //         name: "etv_madhya_pradesh, chhattisgarh",
  //         url: "https://hindi.news18.com/livetv/etv-madhya-pradesh-chhattisgarh/",
  //         target: "_self",
  //       },
  //       "etv-bangla": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20News%20Bangla.png",
  //         name: "etv_bangla",
  //         url: "http://bengali.news18.com/live-tv/etv-bangla/",
  //         target: "_blank",
  //       },
  //       "etv-odia": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20News%20Odiya.png",
  //         name: "etv_odia",
  //         url: "http://www.news18odia.com/",
  //         target: "_blank",
  //       },
  //       "etv-gujarati": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20News%20Gujarat.png",
  //         name: "etv_gujarati",
  //         url: "http://gujarati.news18.com/live-tv/etv-gujarati/",
  //         target: "_blank",
  //       },
  //       "etv-urdu": {
  //         icon: "https://hindi.news18.com/js/image/ETV%20Urdu.png",
  //         name: "etv_urdu",
  //         url: "http://urdu.news18.com/live-tv/etv-urdu/",
  //         target: "_blank",
  //       },
  //       news18assam: {
  //         icon: "https://images.news18.com/ibnkhabar/uploads/2017/11/nw18assam-new.gif",
  //         name: "News18 Assam North East",
  //         url: "http://www.news18assam.com/",
  //         target: "_blank",
  //       },
  //       "etv-kannada": {
  //         icon: "https://images.news18.com/ibnkhabar/uploads/assests/img/news18-kannada-site.png",
  //         name: "news18_kannada",
  //         url: "http://www.news18kannada.com/",
  //         target: "_blank",
  //       },
  //       news18tamil: {
  //         icon: "https://images.news18.com/ibnkhabar/uploads/assests/img/news18-tamil-nadu-tv.png",
  //         name: "News18 Tamil Nadu",
  //         url: "http://www.news18tamil.com/",
  //         target: "_blank",
  //       },
  //       news18kerala: {
  //         icon: "https://images.news18.com/ibnkhabar/uploads/2017/11/news18-kerala-tv-new.png",
  //         name: "News18 Kerala",
  //         url: "http://www.news18kerala.com/",
  //         target: "_blank",
  //       },
  //     };
  //     return allLiveTvArray[channel] || allLiveTvArray;
  //   },
    shortVideoCategory: function () {
      let shortVideoCategoryArray = [];
      shortVideoCategoryArray = [
        {
          slug: "/",
          name: "सभी",
          section: "",
        },
        {
          slug: "/originals/",
          name: "originals",
          section: "originals",
        },
      ];
      return shortVideoCategoryArray;
    },
};

export default categoryHelper;
