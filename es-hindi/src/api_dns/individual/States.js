import {
  getRedisDataByKey,
  getPriorityData,
  getArticleList,
} from "api_dns/global/Common";

async function make_api_call(key) {
  const isMobile = false;

  const stories = await getPriorityData({
    section: "category",
    subSection: key,
    count: 11,
    filter: { "categories.slug": key },
    fallback: true,
  });
  if (stories && stories.length > 0) {
    const leftEnd = (isMobile === "true" || isMobile === true) ? 1 : 4;
    const data = stories.slice(0, leftEnd);
    return data;
  } else {
    return [];
  }
}

async function make_es_article_call(key, type) {
  // const isMobile = false;
  let stories = [];
  if (type === "photogallery") {
    stories = await getArticleList(
      {
        count: 4,
        offset: 0,
        fields:
          "story_id,categories,display_headline,headline,post_type,images,local18_video,weburl,weburl_r,ff_source",
        filter: {
          "categories.id": [
            278497, 103, 220, 480, 4791, 589, 208, 4831, 257016, 309, 299,
          ],
          post_type: "photogallery",
          status: 1,
        },
      },
      {}
    );
  } else {
    stories = await getArticleList(
      {
        count: 4,
        offset: 0,
        fields:
          "story_id,categories,display_headline,headline,post_type,images,local18_video,weburl,weburl_r,ff_source",
        filter: { post_type: "videos", status: 1 },
      },
      {}
    );
  }

  if (stories && stories.length > 0) {
    return stories;
  } else {
    return [];
  }
}

async function getStateData() {
  const states = [
    { slug: "delhi-ncr", label: "दिल्ली-एनसीआर" },
    { slug: "uttar-pradesh", label: "उत्तर प्रदेश" },
    { slug: "bihar", label: "बिहार" },
    { slug: "madhya-pradesh", label: "मध्य प्रदेश" },
    { slug: "rajasthan", label: "राजस्थान" },
    { slug: "uttarakhand", label: "उत्तराखंड" },
    { slug: "haryana", label: "हरियाणा" },
    { slug: "jharkhand", label: "झारखंड" },
    { slug: "chhattisgarh", label: "छत्तीसगढ़" },
    { slug: "himachal-pradesh", label: "हिमाचल प्रदेश" },
    { slug: "photogallery", label: "फोटो" },
    { slug: "videos", label: "वीडियो" },
  ];

  const promises = states.map((state) => {
    return new Promise((resolve) => {
      if (state.slug != "photogallery" && state.slug != "videos") {
        resolve(make_api_call(state.slug));
      } else {
        if (state.slug === "photogallery") {
          resolve(make_es_article_call("states", "photogallery"));
        } else {
          resolve(make_es_article_call("states", "Videos"));
        }
      }
    });
  });

  const results = await Promise.allSettled(promises);
  const newStates = states.map((element, index) => {
    if (results[index]["status"] === "fulfilled") {
      element["result"] = results[index]["value"];
    } else {
      element["result"] = [];
    }
    return element;
  });
  return newStates;
}

async function get_section(slug) {
  //   let [cat] = await Promise.all([rGet(`KHABAR:CATEGORIES`)]);
  let cat = await getRedisDataByKey("CATEGORIES", "KHABAR:");
  // console.log(cat)
  cat = cat ? JSON.parse(cat) : [];
  if (typeof cat !== "undefined" && cat != "") {
    switch (slug) {
      case "desh":
        slug = "nation";
        break;
      case "khel":
        slug = "sports";
        break;
      case "manoranjan":
        slug = "entertainment";
        break;
      case "ghar-parivar":
        slug = "family-and-welfare";
        break;
      case "karobar":
        slug = "business";
        break;
      case "chalo-ghoom-aayen":
        slug = "travel";
        break;
      case "duniya":
        slug = "world";
        break;
      case "dharm-karm":
        slug = "spirituality";
        break;
      default:
        slug;
    }
    return cat[slug];
  } else {
    return [];
  }
}

async function make_solr_api_call(key, type) {

    const category = await get_section(key);
  if (category == undefined || category == "undefined") {
    query_arr = {
      "categories.slug": key.trim(),
      post_type: type == "Videos" ? "videos" : type,
      status: 1,
    };
  } else if (type == "photogallery" || type == "Videos") {
    const category_id = category.id;
    query_arr = {
      "categories.id": category_id,
      post_type: type == "photogallery" ? "photogallery" : type == "Videos" ? 'videos' : 'text',
      status: 1,
    };

  } else {
    const category_id = category.id;
    query_arr = {
      "categories.id": category_id,
      status: 1,
      not: { "categories.parent": 0 },
    };
  }

  if (key) {
    const fields =
      "story_id,categories,display_headline,headline,post_type,images,local18_video,weburl,weburl_r,ff_source";
    const storyData = await getArticleList(
      { count: 4, offset: 0, fields: fields, filter: query_arr },
      {}
    );
    if (storyData) {
      return storyData;
    }
  }
  return [];
}

async function getLifeStyleNWorldData(key, page) {
  let stories = await getRedisDataByKey(key, "KHABARN18-");

//   console.log({stories})
  stories = stories ? JSON.parse(stories) : [];
  let fstories = [];
  fstories = stories[page] || [];
  const temp = [
    { slug: "photogallery", label: "फोटो", target: 0, url: "/photogallery" },
    { slug: "videos", label: "वीडियो", target: 0, url: "/videos" },
  ];
  stories = fstories.concat(temp) || [];

  if (stories.length) {
    let result;
    for (let i = 0; i < stories.length; i++) {
      if (stories[i].slug == "photogallery") {
        result = await make_solr_api_call(page, "photogallery");
        stories[i]["result"] = result;
      } else if (stories[i].slug == "videos") {
        result = await make_solr_api_call(page, "videos");
        stories[i]["result"] = result;
      } else {
        result = await make_es_article_call(stories[i].slug, "text");
        stories[i]["result"] = result;
      }
    }
  }

  return stories;
}

export const getCatPriorityStory = async (req, res) => {
  try {
    let listData = [];

    const { isMobile, page } = req;
    if (page == "states") {
      // states
      listData = await getStateData();
    } else {
      if (page == "lifestyle") {
        // lifestyle
        listData = await getLifeStyleNWorldData(
          "nw_parent_child_categories_lifestyle",
          page
        );
      } else {
        // world
        listData = await getLifeStyleNWorldData(
          "nw_parent_child_categories_world",
          page
        );
      }
    }

    // console.log('pppppp>>>', listData)

    return { listData };
  } catch (error) {
    console.log('eerrr>>>', error);
  }
};
