import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const VideosSlider = dynamic(() =>
  import("../../widgets/Desktop/category/VideosSlider")
);

const VideosAjax = (props) => {
  const channelsList = props.channelSts ? [props.channels] : props.channels;
  const isMobileSts = props.isMobile;
  return (
    <>
      {channelsList.map((channel, key) =>
        key == 2 ? (
          <div className="story_section">
            <div className="title_line">
              <a href={"/videos/" + channel["slug"] + "/"} target="_blank">
                <img
                  loading="lazy"
                  className="lazy"
                  src={channel["thumbnail"]["url"]}
                  alt={channel["title"]}
                  title={channel["title"]}
                  onError={(e) => {e.target.onerror = null; e.target.src="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=200&height=120";}}
                />
              </a>
            </div>
            <div className="story_sectionrow">
              {channel["playlists"].map((dataArraySecond, index) =>
                dataArraySecond["stories"].length < 1 ? (
                  ""
                ) : (
                  <VideosSlider
                    initialData={dataArraySecond || ""}
                    channelSlug={channel["slug"]}
                    keyNum={channel["id"]}
                    index={index}
                    isMobile={isMobileSts}
                  />
                )
              )}
            </div>
            <div className="pwa_top_add pwa_add">
              <div className="clearfix add">
                <div className="addinner-box">
                  <SiteAd
                    slotId={
                      isMobileSts == true ? `mobile_btf_300` : `desktop_btf_728`
                    }
                    adUnit={
                      isMobileSts == true
                        ? `NW18_HIND_PWA/NW18_HIND_VIDEO_PWA/NW18_HIND_VIDEO_PWA_AL/NW18_HIND_VID_AL_PWA_ROS_BTF_300`
                        : `NW18_HIND_Desktop/NW18_HIND_VIDEO/NW18_HIND_VIDEO_AL/NW18_HIND_VID_AL_ROS_BTF_728`
                    }
                    sizes={
                      isMobileSts == true
                        ? [
                            [300, 250],
                            [336, 280]
                          ]
                        : [
                            [728, 90],
                            [1, 1]
                          ]
                    }
                    width={isMobileSts == true ? 300 : 728}
                    height={isMobileSts == true ? 250 : 90}
                    lazyload={true}
                    style={{ padding: "16px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="story_section">
            <div className="title_line">
              <a href={"/videos/" + channel["slug"] + "/"} target="_blank">
                <img
                  loading="lazy"
                  className="lazy"
                  src={channel["thumbnail"]["url"]}
                  alt={channel["title"]}
                  title={channel["title"]}
                  onError={(e) => {e.target.onerror = null; e.target.src="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=200&height=120";}}
                />
              </a>
            </div>
            <div className="story_sectionrow">
              {channel["playlists"].map((dataArraySecond, index) =>
                dataArraySecond["stories"].length < 1 ? (
                  ""
                ) : (
                  <VideosSlider
                    initialData={dataArraySecond || ""}
                    channelSlug={channel["slug"]}
                    keyNum={channel["id"]}
                    index={index}
                    isMobile={isMobileSts}
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};
export default VideosAjax;
