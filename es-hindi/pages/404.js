import NotFound from "components/Common/NotFound";
import ErrorPage from "components/Common/ErrorPage";
import {RhsphotoStories, getDistricts, getGoogleConfig, RhstopStories, getMenu, getRedisDataByKey, getPriorityData} from "api/global/Common";
import { REDIS_KEYS } from "api/Constant";
import {
  getTopNews,
} from "api/individual/Home";

const notFound = (props) => {
  return <ErrorPage title="404 Not Found" desc="Page not found!" status="404" comp={NotFound} props={props} />;
};

export async function getStaticProps() {
  const [menuData = {}, rhsPhotoGallery = [], rhsTopStory = [], mobileMenu = [], footerData = [], topStories = [], photoStories = [], homeStories = {}, config = {},
  //  districtList = {},
  ] = await Promise.all([
    getMenu(false),
    RhsphotoStories(),
    RhstopStories({
      count: 4,
      section: "category",
      subSection: "nation",
      filter: {"post_type":"text"},
      fields: "story_id,headline,weburl,weburl_r,images,display_headline",
    }),
    getMenu(true),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    RhstopStories({
      count: 4,
      section: "category",
      subSection: "nation",
      filter: {"post_type":"text"},
      fields: "story_id,headline,weburl,images,display_headline",
    }),
    getPriorityData({
      count: 4,
      subSection: 'photogallery',
      filter: {"post_type":"photogallery"},
      fields: 'story_id,headline,weburl,images,post_type,gallery_count'
    }),
    // fetchUtility(`https://hindi.news18.com/nodeapi/home/stories?filter=thumbnail,url,title`, {}, "404-homeStories"),
    getTopNews(),
    getGoogleConfig(),
    // getDistricts(),
  ]);
 
  return {
    props: {
      menuData,
      rhsPhotoGallery,
      rhsTopStory,
      mobileMenu,
      footerData,
      topStories,
      photoStories,
      homeStories,
      config,
      // districtList,
    }
  };
}

export default notFound;
