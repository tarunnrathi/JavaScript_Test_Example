const PodcastBody = ({ bodyData }) => {
  return (
    <>

        <div className="title_andshare">
          <h1 className="consumption_title">{bodyData.headline}</h1>
          <div className="share_this">
            <p>Share</p>
            <ul>
              <li>
                <a
                  href={`https://www.facebook.com/sharer.php?u=${bodyData.pageUrl}&amp;t=${bodyData.palinHeadline}`}
                  target="_blank"
                >
                  <img
                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_fb_1592317881.png"
                    alt="facebook"
                    title="facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/share?text=${bodyData.palinHeadline}&url=${bodyData.pageUrl}`}
                  target="_blank"
                >
                  <img
                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_tw_1592317903.png"
                    alt="Twitter"
                    title="Twitter"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`https://web.whatsapp.com/send?text=${bodyData.palinHeadline}-${bodyData.pageUrl}`}
                  target="_blank"
                  className="wapp"
                >
                  <img
                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_wtsup_1592317921.png"
                    alt="whatsapp"
                    title="whatsapp"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="time_location">
          <li>{bodyData.formattedDate}</li>
        </ul>
        <div className="podcast-consumption-img">
          <div dangerouslySetInnerHTML={{ __html: bodyData.podcastEmbed }}></div>
        </div>
        <div className="podcast-consumption-content">
          <h2 className="podcast-listing_title">{bodyData.intro}</h2>
          <br></br>
          <hr></hr>
          <div dangerouslySetInnerHTML={{ __html: bodyData.articleBody }}></div>
        </div>
        <div className="consumption-tag">
          <p>टैग्ज़ :</p>
          <ul>
          {bodyData.tagsArray &&
            bodyData.tagsArray.map((item,index) => {
              const tag_url = `/tag/${item.slug}/`;
              return (                
                  <li key={"pdcast"+index}>
                    <a href={tag_url}> {item.name} </a>
                  </li>              
              );
            })}
            </ul>
        </div>
    </>
  );
};

export default PodcastBody;
