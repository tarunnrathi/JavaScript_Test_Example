import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import getConfig from 'next/config';
import DistrictImage from 'components/Common/DistrictImage';
import { logPageView } from 'includes/googleAnalytic';

const { publicRuntimeConfig } = getConfig();
import DistrictArticleCardStyle from './DistrictArticleCard.module.css';
import ArticleBody from 'components/Common/ArticleBody';
import Byline from 'components/Common/ByLine';
import BylineAuthor from 'components/Common/BylineAuthor';
import SocialShare from 'components/Desktop/SocialShare';
import Outbrain from '../../widgets/Common/Responsive/Outbrain';
import { articleBodyParser } from '../../../helper/articleBodyParser';

const DistrictArticleCard = ({
  articleData,
  isMobile,
  currentDistrictSlug,
  isOpen,
  pageAds,
  catURL,
  defaultTitle,
}) => {
  const [readMore, setReadMore] = useState(isOpen);
  const callFired = useRef(false);
  const callURL = useRef(true);
  const [viewT, setViewT] = useState(0.4);
  // current url
  let outBrainUrl = (articleData.url || articleData.weburl).replace(
    /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  outBrainUrl = outBrainUrl.replace(publicRuntimeConfig.siteUrl, '/').trim();
  // .replace(/\/.*\//, "");
  const shareUrl = outBrainUrl.substring(1);
  // if (articleData.ff_source == "Hyperlocal") {
  //     shareUrl = `news/${outBrainUrl}`;
  //     outBrainUrl = outBrainUrl.replace(/\/.*\//, "");
  //     outBrainUrl = `/news/${outBrainUrl}`;
  //     // console.log({outBrainUrl});
  // } else {
  //     outBrainUrl = outBrainUrl.split("-");
  //     outBrainUrl.splice(outBrainUrl.length - 1, 0, "desk");
  //     outBrainUrl = outBrainUrl.join("-");
  //     // console.log({outBrainUrl});
  //     // outBrainUrl = outBrainUrl.join('-')
  //     // console.log({outBrainUrl});
  //     // shareUrl = `news/${currentDistrictSlug}/${outBrainUrl}`;
  //     // outBrainUrl = outBrainUrl.substring(1);
  // }
  const {
    headline,
    images: { url: thumbnail, caption } = {},
    author_byline: authorByline,
    story_categories: storyCategories,
    local18_video: local18Video,
    story_tags: storyTags,
    youtubeid: youtubeId,
    byline,
    agency,
    agency_full: agencyFull,
    fms_autopublished,
    section,
    intro,
    story_id,
    author,
    tags = [],
    liveblog_api_url = {},
  } = articleData;
  const { parsedBody, body } = useMemo(() => {
    return articleBodyParser(
      articleData.body,
      true,
      story_id,
      pageAds,
      false,
      articleData.tags
    );
  }, []);
  const options = {};
  if (!isOpen) {
    options.threshold =
      articleData.ff_source == 'Hyperlocal' && articleData.local18_video != ''
        ? viewT
        : 0.2;
  }
  const { ref, inView, entry } = useInView(options);
  const fireGA = () => {
    // Trigger ga
    logPageView(
      authorByline.language_name,
      byline,
      agency,
      articleData.ff_source == 'Hyperlocal'
        ? 'Local18'
        : authorByline.author_type,
      (Array.isArray(authorByline.roles) ? authorByline.roles : []).includes(
        'contributor'
      ),
      fms_autopublished,
      section,
      story_id,
      true
    );
    self.COMSCORE &&
      COMSCORE.beacon({
        c1: '2',
        c2: '6683813',
      });
    callFired.current = true;
  };
  useEffect(() => {
    if (
      articleData.ff_source == 'Hyperlocal' &&
      articleData.local18_video != ''
    ) {
      if (inView) {
        callURL.current = false;
        updateUrl();
        if (!callFired.current) {
          fireGA();
        }
      } else if (!entry?.isVisible && !callURL.current) {
        callURL.current = true;
        updateUrl(true);
      }
    } else {
      if (inView && !readMore) {
        callURL.current = false;
        updateUrl();
        if (!callFired.current) {
          fireGA();
        }
      } else if (!entry?.isVisible && !readMore && !callURL.current) {
        callURL.current = true;
        updateUrl(true);
      }
    }
  }, [inView, readMore, entry]);
  // Update url in address bar
  const updateUrl = (isDefault = false) => {
    // outBrainUrl = publicRuntimeConfig.siteUrl + url;
    if (isDefault) {
      history.replaceState({}, '', catURL);
      document.title = defaultTitle;
    } else {
      history.replaceState({}, '', `${outBrainUrl}`);
      document.title = articleData.headline;
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: articleData.headline,
          url: publicRuntimeConfig.siteUrl + shareUrl,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Something went wrong sharing the blog', error);
        });
    }
  };
  return (
    <div className={DistrictArticleCardStyle.newdscrtcardbox} ref={ref}>
      {!isOpen ? <h1>{headline}</h1> : <h2>{headline}</h2>}

      <DistrictImage
        headline={headline}
        image={thumbnail}
        local18Video={local18Video ?? false}
        caption={caption && caption != '' ? caption : intro}
        youtubeId={youtubeId}
        isMobile={isMobile}
        categories={
          storyCategories && storyCategories.length > 0
            ? storyCategories.toString()
            : ''
        }
        tags={storyTags && storyTags.length > 0 ? storyTags.toString() : ''}
        readMore={readMore}
      />
      <div className={DistrictArticleCardStyle.newdscrtcardbox_content}>
        {!isOpen ? <h2>{intro}</h2> : <h3>{intro}</h3>}
        <div className={DistrictArticleCardStyle.nwartbx_updtshr}>
          <div className={DistrictArticleCardStyle.nwartbx_updtshr_lft}>
            <ul>
              <Byline agency={agency} agencyFull={agencyFull} />
              <li>
                <span>LAST UPDATED :</span> {articleData.updateDate}
              </li>
              <BylineAuthor
                authorByline={authorByline}
                author={author}
                isMobile={false}
              />
            </ul>
          </div>
          <div className={DistrictArticleCardStyle.nwartbx_updtshr_rgt}>
            <span>SHARE THIS:</span>
            <SocialShare
              headline={articleData.headline}
              url={publicRuntimeConfig.siteUrl + shareUrl}
              isDistrict={true}
            />
          </div>
        </div>
        <div
          className={`${DistrictArticleCardStyle.nwartbx_intxt} ${
            readMore && DistrictArticleCardStyle.nwartbx_intxt_close
          }`}
          // dangerouslySetInnerHTML={{ __html: articleDataBody.__html }}
        >
          <ArticleBody
            body={body}
            id={story_id}
            pageAds={pageAds}
            isDesktop={true}
            parsed={parsedBody}
            isDistrict={true}
            categories={
              storyCategories && storyCategories.length > 0
                ? storyCategories.toString()
                : ''
            }
            tags={storyTags && storyTags.length > 0 ? storyTags.toString() : ''}
            caption={caption && caption != '' ? caption : intro}
            headline={headline}
            image={thumbnail}
          />
        </div>
        {!readMore && (
          <>
            <p className={DistrictArticleCardStyle.read_more}>
              पढ़ें <a href="https://hindi.news18.com/">Hindi News </a>
              ऑनलाइन और देखें{' '}
              <a href="https://hindi.news18.com/livetv/">Live TV News18 </a>
              हिंदी की वेबसाइट पर. जानिए देश-विदेश और अपने प्रदेश, बॉलीवुड, खेल
              जगत, बिज़नेस से जुड़ी{' '}
              <a href="https://hindi.news18.com/news/">News in Hindi</a>.<br />
              <br />
              हमें{' '}
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://www.facebook.com/News18Hindi/"
              >
                Facebook
              </a>
              ,
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://twitter.com/HindiNews18"
              >
                Twitter
              </a>
              ,{' '}
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://instagram.com/news18hindi"
              >
                Instagram
              </a>
               और
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://t.me/news18hindi"
              >
                Telegram
              </a>{' '}
              पर फॉलो करें.
            </p>
            <div className={DistrictArticleCardStyle.page_tag}>
              {tags && tags.length
                ? tags.map((tag, key) => {
                    return (
                      <a key={key} href={'/tag/' + tag.slug + '/'}>
                        {tag.name}{' '}
                      </a>
                    );
                  })
                : null}
            </div>
            {/* <div className="container"> */}
            <Outbrain
              widgetId="AR_9"
              widgetSrc={articleData.url || articleData.weburl}
            />
            {isOpen && self?.OBR?.extern?.researchWidget()}
            {/* </div> */}
          </>
        )}
        <div
          className={`${DistrictArticleCardStyle.nwartbx_morebtn} ${
            readMore && DistrictArticleCardStyle.nwartbx_morebtn_close
          }`}
        >
          {liveblog_api_url && liveblog_api_url.blog_url ? (
            <a href={`/news/${outBrainUrl.replace('/news/', '')}`}>
              {!readMore ? 'बंद करें' : 'पूरी खबर पढ़ें'}
            </a>
          ) : (
            <a
              onClick={() => {
                if (!readMore) {
                  setViewT(0.4);
                } else {
                  setViewT(0.1);
                }
                setReadMore((prevState) => !prevState);
              }}
            >
              {!readMore ? 'बंद करें' : 'पूरी खबर पढ़ें'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default DistrictArticleCard;
