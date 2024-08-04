import React from "react";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
//import { generateCrumbFromUrl } from "includes/article.util";
import Head from "next/head";
import getConfig from "next/config";
import Script from 'next/script';

const { publicRuntimeConfig } = getConfig();

const removeQueryString = (url = '') => {
  return url.split("?").shift();
};

const SiteSeo = (props) => {

  let img = props.pageSeo?.hires || props.pageSeo.res43 || `${props.pageSeo?.og_image || publicRuntimeConfig.schemaImagePlaceholder}?im=FitAndFill,width=1200,height=675`;
  if (props.pageSeo.isTag) {
    img = "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png?im=FitAndFill,width=1200,height=675";
  }
  const openGraph = {
    type: props.isArticle ? "article" : "website",
    locale: "hi_IN",
    url: removeQueryString(props.pageSeo.canonical),
    title: typeof props.pageSeo.og_title !== "undefined" ? props.pageSeo.og_title : props.pageSeo.title,
    description: typeof props.pageSeo.og_description !== "undefined" ? props.pageSeo.og_description : props.pageSeo.description,
    site_name: "News18 हिंदी",
    images: [
      {
        url: img,
        alt: props.pageSeo.caption && props.pageSeo.caption != '' ? props.pageSeo.caption : typeof props.pageSeo.og_title !== "undefined" ? props.pageSeo.og_title : props.pageSeo.title,
        width: props.pageSeo.hires ? 1600 : 1200,
        height: props.pageSeo.hires ? 900 : props.pageSeo.res43 ? 900 : 675
      },
    ],
    imageWidth: props.pageSeo.hires ? 1600 : 1200,
    imageHeight: props.pageSeo.hires ? 900 : props.pageSeo.res43 ? 900 : 675,
  };

  const addtionalTags = [
    {
      name: "news_keywords",
      content: props.pageSeo.keywords,
    },
    {
      name: "keywords",
      content: props.pageSeo.keywords,
    },
    {
      name: "twitter:title",
      content: typeof props.pageSeo.og_title !== "undefined" ? props.pageSeo.og_title : props.pageSeo.title,
    },
    {
      name: "twitter:description",
      content: typeof props.pageSeo.og_description !== "undefined" ? props.pageSeo.og_description : props.pageSeo.description,
    },
    {
      name: "twitter:site",
      content: "@news18india",
    },
    {
      name: "twitter:creator",
      content: "@news18india",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:url",
      content: props.pageSeo.canonical,
    },
    {
      name: "twitter:image",
      content: img,
    },
    {
      name: "twitter:image:alt",
      content: props.pageSeo.caption && props.pageSeo.caption != '' ? props.pageSeo.caption : typeof props.pageSeo.og_title !== "undefined" ? props.pageSeo.og_title : props.pageSeo.title,
    },
  ];

  if (!(props.isHome || props.pageSeo.isTag)) {
    addtionalTags.push({
      name: "robots",
      content: "max-image-preview:large"
    });
  }

  let crumbs = [];
  // console.log('props.pageSeo',props);
  if ((!props.isHome || !props.pageSeo.isVideo) && !props.isState) {
    if (props.district) {
      crumbs = [
        {
          position: 1,
          name: "Home",
          item: props.pageSeo.pageUrl,
        },
        {
          position: 2,
          name: "News",
          item: `${props.pageSeo.news}/`,
        },
        {
          position: 3,
          name: props?.currentDistrict || 'News',
          item: `${props.pageSeo.pageUrl}news/${props.pageSeo.cat.split('/')[0]}/`,
        },
        {
          position: 4,
          name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "News",
          item: props.url?.replace("/amp", ""),
        },
      ];
    } else if (props.isCategory) {
      if (props.pageSeo?.isPhoto) {
        crumbs = props.pageSeo.breadCrumbArray.map((item, ind) => {
          return {
            position: (ind + 1),
            item: 'https://hindi.news18.com' + item.slug,
            name: item.engtext || "News"
          };
        });
      } else {
        crumbs = [
          {
            position: 1,
            name: "News18 Hindi",
            item: props.pageSeo.pageUrl,
          },
          {
            position: 2,
            name: "News",
            item: `${props.pageSeo.news}`,
          }
        ];

        if (props.pageSeo?.pageParam?.category && props.pageSeo?.pageParam?.category != "news") {
          crumbs.push({
            position: 3,
            name: props.pageSeo?.pageParam?.category?.charAt(0).toUpperCase() + props.pageSeo?.pageParam?.category?.slice(1) || 'News',
            item: `${props.pageSeo.news}${props.pageSeo?.pageParam?.category}/`,
          });
        }

        if (props.pageSeo?.pageParam?.subCategory && props.pageSeo?.pageParam?.subCategory != "news") {
          crumbs.push({
            position: 4,
            name: props.pageSeo?.pageParam?.subCategory?.charAt(0).toUpperCase() + props.pageSeo?.pageParam?.subCategory?.slice(1) + ' News' || 'News',
            item: `${props.url}/`,
            // item: `${props.pageSeo.news}${props.pageSeo?.pageParam?.category}/${props.pageSeo?.pageParam?.subCategory}/`,
          });
        }
      }
    } else if (props.pageSeo.isTag) {
      crumbs = [
        {
          position: 1,
          name: "Hindi News",
          item: props.pageSeo.pageUrl,
        },
        {
          position: 2,
          name: "Tag",
          item: `${props.pageSeo.news}`,
        },

      ];
      if (props.pageSeo?.topic != "") {
        crumbs.push({
          position: 3,
          name: props?.pageSeo.topic || 'News',
          item: `${props.pageSeo.pageUrl}tag/${props.pageSeo.topic}/`,
        });
        if (props.pageSeo?.ct != "") {
          crumbs.push({
            position: 4,
            name: props.pageSeo?.ct || 'News',
            item: `${props.url}`,
            //item: `${props.pageSeo.pageUrl}tag/${props.pageSeo.topic}/${props.pageSeo.ct}/`,
          });
        }
      }
    } else if (props.pageSeo.news && !props.pageSeo.isVideo) {
      crumbs = [
        {
          position: 1,
          name: "हिंदी समाचार",
          item: publicRuntimeConfig.siteUrl,
        },
        {
          position: 2,
          name: props.pageSeo?.isPhoto ? "Photogallery" : props.pageSeo?.isTag ? "Tag" : "News",
          item: `${props.pageSeo.isPhoto ? props.pageSeo?.news.replace("news/", "photogallery/") : props.pageSeo.news}`,
        },
      ];

      let isThree;
      if (props.pageSeo.cat && props.pageSeo.cat != "") {
        crumbs.push({
          position: 3,
          name: props.pageSeo.currentDistrict ? props.pageSeo.currentDistrict : props.pageSeo.cat,
          item: `${publicRuntimeConfig.siteUrl}${props.pageSeo.isPhoto ? "photogallery" : "news"}/${props.pageSeo.cat}/`,
        });
        isThree = true;
      }

      const fourthEntry = props.pageSeo.og_title.replace(/"/gi, `'`);
      if (fourthEntry && fourthEntry != "") {
        crumbs.push({
          position: isThree ? 4 : 3,
          name: props.pageSeo?.isTag ? (props.pageSeo?.TopicName != "") ? props.pageSeo?.TopicName : "Tag" : fourthEntry,
          item: props.url
        });
      }
    } else if (props.pageSeo.isWebstory) {
      crumbs = [
        {
          position: 1,
          name: "News18 Hindi",
          item: props.pageSeo.pageUrl,
        },
        {
          position: 2,
          name: "Webstories",
          item: props.pageSeo.pageUrl + "web-stories/",
        },
      ];

      if (props.pageSeo?.cat && props.pageSeo?.cat != "") {
        crumbs.push({
          position: 3,
          name: props.pageSeo?.cat?.charAt(0).toUpperCase() + props.pageSeo?.cat?.slice(1),
          item: `${props.pageSeo?.pageUrl}web-stories/${props.pageSeo?.cat}/`,
        });
      }
    } else if (props.pageSeo.isCricketNext) {
      crumbs = [
        {
          position: 1,
          name: "Home",
          item: publicRuntimeConfig.siteUrl,
        },
        {
          position: 2,
          name: "Cricket",
          item: `${publicRuntimeConfig.siteUrl}cricket/`,
        },
        {
          position: 3,
          name: "Live Score",
          item: `${publicRuntimeConfig.siteUrl}cricket/live-score/`,
        },
        {
          position: 4,
          name: props.pageSeo.title,
          item: props.pageSeo.pageUrl,
        },
      ];

    }
    else if (props.pageSeo.isCricketNextLiveScore) {
      crumbs = [
        {
          position: 1,
          name: "हिंदी समाचार",
          item: publicRuntimeConfig.siteUrl,
        },
        {
          position: 2,
          name: "Cricket",
          item: `${publicRuntimeConfig.siteUrl}cricket/`,
        },
        {
          position: 3,
          name: props.pageSeo.title,
          item: props.pageSeo.pageUrl,
        },
      ];
    }
    else if (props.pageSeo.isCricketNextHome) {
      crumbs = [
        {
          position: 1,
          name: "हिंदी समाचार",
          item: publicRuntimeConfig.siteUrl,
        },
        {
          position: 2,
          name: "Cricket",
          item: `${publicRuntimeConfig.siteUrl}cricket/`,
        },
      ];

    } else if (props.pageSeo.isPodcast) {
      crumbs = [
        {
          position: 1,
          name: "News18 Hindi",
          item: publicRuntimeConfig.siteUrl,
        },
        {
          position: 2,
          name: "Podcast",
          item: publicRuntimeConfig.siteUrl + 'podcast/',
        },
      ];
    } else if (props.isDataPage) {
      switch (props.pageSeo.pageName) {
        case 'mobile':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "Mobiles",
              item: `${props.pageSeo.pageUrl}/mobiles`,
            },
            // {
            //   position: 3,
            //   name: props?.currentDistrict || '',
            //   item: `${props.pageSeo.pageUrl}news/${props.pageSeo.cat.split('/')[0]}/`,
            // },
            // {
            //   position: 4,
            //   name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "",
            //   item: props.url?.replace("/amp", ""),
            // },
          ];
          break;

        case 'brand':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "Mobiles",
              item: `${props.pageSeo.pageUrl}mobiles`,
            },
            {
              position: 3,
              name: 'Brand',
              item: `${props.pageSeo.pageUrl}mobiles/${props.pageSeo.cat}`,
            },
            // {
            //   position: 4,
            //   name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "",
            //   item: props.url?.replace("/amp", ""),
            // },
          ];
          break;

        case 'specification':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "Mobiles",
              item: `${props.pageSeo.pageUrl}mobiles`,
            },
            {
              position: 3,
              name: 'Brand',
              item: `${props.pageSeo.pageUrl}mobiles/${props.pageSeo.cat}`,
            },
            {
              position: 4,
              name: "Specification",
              item: props.url,
            },
          ];
          break;

        case 'news':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "Mobiles",
              item: `${props.pageSeo.pageUrl}mobiles`,
            },
            {
              position: 3,
              name: 'News',
              item: `${props.pageSeo.pageUrl}mobiles/news`,
            },
            // {
            //   position: 4,
            //   name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "",
            //   item: props.url?.replace("/amp", ""),
            // },
          ];
          break;

      }
    }else if (props.isShortVideos) {
      switch (props.pageSeo.pageName) {
        case 'landing':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "short-videos",
              item: `${props.pageSeo.pageUrl}short-videos`,
            },
            // {
            //   position: 3,
            //   name: props?.currentDistrict || '',
            //   item: `${props.pageSeo.pageUrl}news/${props.pageSeo.cat.split('/')[0]}/`,
            // },
            // {
            //   position: 4,
            //   name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "",
            //   item: props.url?.replace("/amp", ""),
            // },
          ];
          break;

        case 'category':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "short-videos",
              item: `${props.pageSeo.pageUrl}short-videos`,
            },
            {
              position: 3,
              name: 'category',
              item: `${props.pageSeo.pageUrl}short-videos/${props.pageSeo.section}`,
            },
            // {
            //   position: 4,
            //   name: props.pageSeo.currentDistrict?.replace(/"/gi, `'`) || "",
            //   item: props.url?.replace("/amp", ""),
            // },
          ];
          break;

        case 'consumption':
          crumbs = [
            {
              position: 1,
              name: "Home",
              item: props.pageSeo.pageUrl,
            },
            {
              position: 2,
              name: "short-videos",
              item: `${props.pageSeo.pageUrl}short-videos`,
            },
            {
              position: 3,
              name: 'category',
              item: `${props.pageSeo?.canonical}`,
            },
          ];
          break;
      }
    }
    else {
      crumbs = [
        {
          position: 1,
          name: "हिंदी समाचार",
          item: props.pageSeo.pageUrl,
        },
        {
          position: 2,
          name: props.pageSeo.currentDistrict ? props.pageSeo.currentDistrict : props.pageSeo.cat,
          item: `${props.pageSeo.pageUrl}${props.pageSeo.cat}`,
        },
      ];

      let isThree;
      if (props.pageSeo.subCat && props.pageSeo.subCat != "") {
        crumbs.push({
          position: 3,
          name: (props.pageSeo.currentDistrict ? props.pageSeo.currentDistrict : props.pageSeo.subCat) || "News",
          item: `${props.pageSeo.pageUrl}${props.pageSeo.isVideo ? "videos" : "news"}/${props.pageSeo.subCat}/`,
        });
        isThree = true;
      }
      if (props.pageSeo.og_title) {
        const fourthEntry = props.pageSeo.og_title.replace(/"/gi, `'`) || 'News';
        if (fourthEntry && fourthEntry != "") {
          crumbs.push({
            position: isThree ? 4 : 3,
            name: fourthEntry,
            item: props.url,
          });
        }
      }

    }
  }

  // if breadcrumblist is there
  if(props.pageSeo.breadCrumbArray && props.pageSeo.breadCrumbArray.length > 0) {
    crumbs = [];
    props.pageSeo.breadCrumbArray.map((itm, index) => {
      crumbs.push({
        position: index+1,
        name: itm.value || "News",
        item: itm?.slug?.indexOf("https://") > -1 ? itm?.slug : `${publicRuntimeConfig.siteUrl}${itm?.slug[0] === "/"?itm?.slug?.substring(1, itm?.slug?.length):itm?.slug}`,
      });
    });
  }
  const { chartbeat } = props;
  const {
    cat,
    publisher,
    canonical,
  } = props?.pageSeo;
  const authorNames = publisher?.news;
  return (
    <>
      <Head>
        {typeof props.pageSeo.ampHtml !== "undefined" ? <link rel="amphtml" href={props.pageSeo.ampHtml} /> : ""}
        {props.pageSeo.liveBlogNext ?
          <link rel="next" href={props.pageSeo.liveBlogNext} />
          : null}
        {props.pageSeo.liveBlogPrev ?
          <link rel="prev" href={props.pageSeo.liveBlogPrev} />
          : null}
        {typeof props?.pageSeo?.jsonLdForLiveBlog !== "undefined" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(props?.pageSeo?.jsonLdForLiveBlog) }}
          ></script>
        )}
        {typeof props?.pageSeo?.jsonLdForOrganization !== "undefined" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(props?.pageSeo?.jsonLdForOrganization) }}
          ></script>
        )}
        {typeof props?.pageSeo?.jsonLdForWebPage !== "undefined" && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props?.pageSeo?.jsonLdForWebPage) }}></script>
        )}
        {typeof props?.pageSeo?.jsonLdForHomeSiteNavigation !== "undefined" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(props?.pageSeo?.jsonLdForHomeSiteNavigation) }}
          ></script>
        )}        
        {typeof props?.pageSeo?.jsonLdForArticleConsumption !== "undefined" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(props?.pageSeo?.jsonLdForArticleConsumption) }}
          ></script>
        )}        
      </Head>
      <NextSeo
        title={props.pageSeo.title}
        description={props.pageSeo.description}
        canonical={removeQueryString(props.pageSeo.canonical)}
        openGraph={openGraph}
        additionalMetaTags={addtionalTags}
      />
      {chartbeat ? (
        <Script strategy="afterInteractive" id="chartbeat">
          {
            `
              var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
              _sf_async_config.uid = 20831;
              _sf_async_config.domain = 'news18.com';
              let canonical_url = "${chartbeat.can}"
              if(canonical_url !== "")   {
                  _sf_async_config.useCanonical = true;
                  _sf_async_config.useCanonicalDomain = true;
              } else {
                  let location_path = window.location.href;
                  location_path = location_path.replace("http://", '').replace("https://", '').replace("www.", '');
                  _sf_async_config.path = location_path;
              }
              _sf_async_config.flickerControl = false;
          
              _sf_async_config.sections = "${chartbeat.section || chartbeat.webstoryCat}";
              _sf_async_config.authors = "${chartbeat.authorNames || "No author"}";
              _sf_async_config.type = "${chartbeat.page} page";
             

              
              function loadChartbeat() {
                    var e = document.createElement('script');
                    var n = document.getElementsByTagName('script')[0];
                    e.type = 'text/javascript';
                    e.async = true;
                    e.src = '//static.chartbeat.com/js/chartbeat.js';
                    n.parentNode.insertBefore(e, n);
              }
              function chartbeat_mab() {
                var e = document.createElement('script');
                var n = document.getElementsByTagName('script')[0];
                e.type = 'text/javascript';
                e.async = true;
                e.src = 'https://static.chartbeat.com/js/chartbeat_mab.js';
                n.parentNode.insertBefore(e, n);
              }
              loadChartbeat();
              chartbeat_mab();
            `
          }
        </Script>
      ) : null}

      {/* Bradcrumb schema */}
      {!props.isHome ? <BreadcrumbJsonLd itemListElements={crumbs} /> : ''}

      {typeof props.pageSeo.jsonLdForAudioObject !== "undefined" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForAudioObject) }}></script>
      ) : (
        ""
      )}

      {typeof props.pageSeo.jsonLdForPodcastEpisode !== "undefined" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForPodcastEpisode) }}></script>
      ) : (
        ""
      )}

      

      {props.pageSeo.jsonLdForFaqSchema && Object.keys(props.pageSeo.jsonLdForFaqSchema).length && typeof props.pageSeo.jsonLdForFaqSchema !== "undefined" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForFaqSchema) }}></script>
      ) : (
        ""
      )}

      {typeof props.pageSeo.jsonLdForHowToFaqSchema !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForHowToFaqSchema) }}
        ></script>
      ) : (
        ""
      )}

      {typeof props.pageSeo.jsonLdForImageObject !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForImageObject) }}
        ></script>
      ) : (
        ""
      )}

      {props.pageSeo.jsonLdForVideoObject && Object.keys(props.pageSeo.jsonLdForVideoObject).length && typeof props.pageSeo.jsonLdForVideoObject !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForVideoObject) }}
        ></script>
      ) : (
        ""
      )}

      {typeof props.pageSeo.jsonLdForSiteNavigation !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForSiteNavigation) }}
        ></script>
      ) : (
        ""
      )}

      {props.pageSeo.jsonLdForRecipe && Object.keys(props.pageSeo.jsonLdForRecipe).length && typeof props.pageSeo.jsonLdForRecipe !== "undefined" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForRecipe) }}></script>
      ) : (
        ""
      )}

      {props.pageSeo.jsonLdForMovie && Object.keys(props.pageSeo.jsonLdForMovie).length && typeof props.pageSeo.jsonLdForMovie !== "undefined" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForMovie) }}></script>
      ) : (
        ""
      )}

      

      {typeof props.pageSeo.jsonLdForHomeWebSite !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForHomeWebSite) }}
        ></script>
      ) : (
        ""
      )}

      

      {typeof props.pageSeo.jsonLdForHomeOrganization !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForHomeOrganization) }}
        ></script>) : (
        ""
      )}

      {typeof props.pageSeo.jsonLdForImageGallery !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForImageGallery) }}
        ></script>
      ) : (
        ""
      )}

      
      {typeof props.pageSeo.jsonLdForItemList !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForItemList) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForDistrictSubsectionWebPage !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForDistrictSubsectionWebPage) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForDistrictSubsectionItemList !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForDistrictSubsectionItemList) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForNewsArticle !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForNewsArticle) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForCricketSiteNavigation !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForCricketSiteNavigation) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForVideoListingPage !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForVideoListingPage) }}
        ></script>
      ) : (
        ""
      )}
      {typeof props.pageSeo.jsonLdForSingleProductPage !== "undefined" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForSingleProductPage) }}
        ></script>
      ) : (
        ""
      )}
      {/* {props.dataLayer ? (
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          'event': 'custom_dimensions',
          'section': ${props.dataLayer?.section || ""},
          'sub_section': ${props.dataLayer?.subSections || ""},
          'article_id': ${props.dataLayer?.articleId || ""}
        })`
      }}
      ></script>
      ) : (
        ""
      )} */}
      {typeof props?.pageSeo?.jsonLdForProfile !== "undefined" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props.pageSeo.jsonLdForProfile) }}
        ></script>
      )}
    </>
  );
};

export default SiteSeo;
