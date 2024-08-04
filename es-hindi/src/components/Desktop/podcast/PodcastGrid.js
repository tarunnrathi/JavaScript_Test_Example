// import SiteAd from 'widgets/Common/Responsive/SiteAd';
import { imageLoader } from 'includes/article.util';
import moment from 'moment-timezone';
import getConfig from "next/config";
import LazyLoadImage from 'components/Common/CustomImage';

const { publicRuntimeConfig } = getConfig();

const PodcastGrid = ({ podcastData = [], order, isMobile=false }) => {
  let data = {};
  podcastData && podcastData.length && podcastData.map((ele) => {
    ele.order == order && (data = ele);
  });

  const liveTime = (time) => {
    return time?.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6");
  };

  const openSubscribeList = (e) => {
    //console.log(e.target?.nextElementSibling?.className);
    const nextSibling = e.target?.nextElementSibling;

    if(!nextSibling?.className?.includes("flex-none") && !nextSibling?.className?.includes("flex")) {
        nextSibling?.classList.add("flex");
    } else {
      if(nextSibling?.className?.includes("flex-none")) {
        nextSibling?.classList.remove("flex-none");
        nextSibling?.classList.add("flex");
      } else {
        nextSibling?.classList.add("flex-none");
        nextSibling?.classList.remove("flex");
      }
    }

  };

  const { element: { name, data: subscribeData, slug } = {}, podcast } = data;
  return (
    <>
    {Object.keys(data)?.length > 0 ?
      <>
      <div className='podcast_container container'>
        <div className="podcast_topbar">
          {order === 1 ? <h1 className="podcast_title">
            <a className="heading" href={`${publicRuntimeConfig.siteUrl}podcast/${slug}/`}>News<span>18</span> {name}</a>
          </h1> : <h2 className="podcast_title">
            <a className="heading" href={`${publicRuntimeConfig.siteUrl}podcast/${slug}/`}>News<span>18</span> {name}</a>
          </h2>}
          <div className="podcast_topbar_right">
            <p className="subscribe_to" onClick={(e) => {isMobile && openSubscribeList(e);}}>पॉडकास्ट के लिए सब्सक्राइब करें</p>
            <ul className={`subscribe_to_ul`}>
              {
                (subscribeData && subscribeData.length > 0) ?
                subscribeData.map((ele, index) => {
                  return (
                    <>
                      <li key={`pd-${index}`}>
                        <a href={ele.url}>
                          {/* <figure>
                            <LazyLoadImage
                                width={390}
                                height={260}
                                src={isMobile ? ele.icon_hidden_mobile : ele.icon_hidden_desktop}
                                alt={"podcast subscribe"}
                                title={"subscribe now"}                              
                            />
                          </figure> */}
                          <img src={isMobile ? ele.icon_hidden_mobile.replace(".hindi",'') : ele.icon_hidden_desktop.replace(".hindi",'') } alt="podcast subscribe" title="subscribe now"/>
                        </a>
                      </li>
                    </>
                  );
                }) : ''
              }
            </ul>
          </div>
        </div>

        <div className="podcast_page_section">
          <div className="podcast_section_left">
            {
              (podcast && podcast.length > 0) ? (
                podcast.map((ele, index) => {
                  const articleUrl = ele?.weburl?.replace('https://hindi.news18.com', '');
                  if(index < 3) {
                    return (
                        <div className="podcast_box" key={`pd-article1-${index}`}>
                          <a href={articleUrl}>
                            <figure> 
                              <div className="podcast_box_figure">                                
                                  <LazyLoadImage
                                    width={810}
                                    height={400}
                                    src={ele?.thumbnail || ele?.images?.url}
                                    alt={"news18" }
                                    title={ele?.title||ele?.display_headline}                              
                                  />                                
                                {/* <img
                                  src={imageLoader(ele?.thumbnail || ele?.images?.url, index == 0 ? 810 : 400, index == 0 ? 455 : 225,true)}
                                  width={index == 0 ? 810 : 400}
                                  height={index == 0 ? 455 : 225}
                                  alt="news18" 
                                  title={ele?.title||ele?.display_headline} 
                                /> */}
                              </div>                               
                            </figure> 
                            <figcaption> 
                                {/* <ul className="time_location">
                                  <li>{moment(liveTime(ele.created_at.toString())).tz("Asia/Kolkata").format("MMMM DD, YYYY, HH:mm a")}</li>
                                </ul>  */}
                                <h2>{ele?.title||ele?.display_headline}</h2>
                                <span className="time_location1">{moment(liveTime(ele.created_at.toString())).tz("Asia/Kolkata").format("MMMM DD, YYYY, HH:mm a")}</span>
                              </figcaption>
                          </a>
                        </div>
                       
                    );
                  }
                })
              ) : ''
            }
          </div>
          <div className="podcast_section_right">
            {
              podcast && podcast.length ? (
                podcast.map((ele, index) => {
                  if(index >= 3) {
                    return (
                      
                        <div className="podcast_box"  key={`pd-article-${index}`}>
                          <a href={ele?.url || ele?.weburl}>
                            <figure> 
                              <div className="podcast_box_figure">
                                <LazyLoadImage
                                  width={810}
                                  height={400}
                                  src={ele?.thumbnail ||ele?.images?.url}
                                  alt={"news18" }
                                  title={ele?.title||ele?.display_headline}                              
                                />
                                {/* <img
                                  src={imageLoader(ele?.thumbnail ||ele?.images?.url, index == 0 ? 810 : 400, index == 0 ? 455 : 225,true)}
                                  width={index == 0 ? 810 : 400}
                                  height={index == 0 ? 455 : 225}
                                  alt="news18" 
                                  title={ele?.title||ele?.display_headline} 
                                /> */}
                              </div>                              
                            </figure>
                            <figcaption> 
                                {/* <ul className="time_location">
                                  <li>{moment(liveTime(ele.created_at.toString())).tz("Asia/Kolkata").format("MMMM DD, YYYY, HH:mm a")}</li>
                                </ul>  */}
                                <h2>{ele?.title||ele?.display_headline}</h2>
                                <span className="time_location1">{moment(liveTime(ele.created_at.toString())).tz("Asia/Kolkata").format("MMMM DD, YYYY, HH:mm a")}</span>
                              </figcaption>  
                          </a>
                        </div>
                      
                    );
                  }
                })
              ) : ''
            }
          </div>
        </div>
      </div>
      <style jsx global>{`
        .podcast_box figure img {
          background : url('https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg') 50% 50% no-repeat;
          background-size: cover;
        }
        ul.time_location li{
          padding-left: 0px;
          padding-right: 0px;
        }
      `}</style>
      </> : ''}
    </>
  );
};

export default PodcastGrid;
