import ArticleBody from "components/Common/ArticleBody";

const ReadMore = ({ data ={} }) => {

  return (
    <div id="readmore_content" className="readmore_content">
      <a href="#" className="readmore_link">
        अधिक पढ़ें
      </a>
      <ArticleBody
        body={data?.body}
        isDesktop={true}
        id={data?.story_id}
        showAds={false}
        parsed={data?.parsedBody}
      />
    </div>
  );
};

export default ReadMore;
