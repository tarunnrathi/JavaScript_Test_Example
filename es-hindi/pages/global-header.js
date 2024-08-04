import { getWebStories } from "api/global/Common";
import WebStory from "components/Desktop/homepage/WebStory";

const GlobalHeader = ({ data }) => {
  return (
    <>
      <div className="container clearfix">
        <WebStory isMobile={false} webStories={data} />
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await getWebStories({
    count: 6,
    fields: "blog_title,web_url_r,web_url,feature_img,categories",
    filter: { categories: "cricket" },
  });
  return {
    props: {
      data,
    },
  };
};

export default GlobalHeader;
