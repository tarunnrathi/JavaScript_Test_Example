import { useEffect, useState, Fragment } from 'react';
import LazyLoad from 'react-lazyload';

// Triggers request for new article
function LoaderComp({ loadArticle, articles }) {
  useEffect(() => {
    loadArticle(articles);
  }, []);

  return null;
}

export default function PodcastAjax(props) {
  const { articles } = props;
  const articlesLength = articles.length;
  const [details, setDetails] = useState(() => {
    return {
      articles: [],
      viewedCount: 0,
    };
  });
  const Comp = props.comp;
  const detailedArt = details.articles.filter((val) => val!="");

return (
    <>
      {detailedArt?.map((article, ind) => {
        const articleDetails = { articleDetails: article };
        return (
        <Fragment key={'articleAjax' + ind}>
          {article ? (
            <>
              <Comp
                atags={article.tags}
                key={article.id}
                isAjax={true}
                pageAds={props.pageAds}
                topPriorityData={{
                  categoryDetailsData: articleDetails,
                  rhsPhotoGallery: props.rhsPhoto,
                  rhsTopStory: props.rhsTopStory,
                  category: props.cat || '',
                  fullCaptionIds: props.fullCaptionIds,
                  isCricketNext: props.isCricketNext,
                  query: {}
                }}
                setCurrentArticle={props.setCurrentArticle}
                isLastArticle={articles.length - 1 === ind}

              />
              {details.viewedCount < (articlesLength < 9? articlesLength : 9) && (
                <LazyLoad once offset={props.isMobile ? 500 : 100}>
                  <LoaderComp articles={articles} loadArticle={loadArticle} />
                </LazyLoad>
              )}
            </>
          ) : (
            ''
          )}
        </Fragment>
      );})}
    </>
  );
}
