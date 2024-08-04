import LazyImage from "components/Common/LazyImage";
import { memo } from "react";

export default memo(function DistrictImage({
    headline = "News18",
    image,
    youtubeId,
    isMobile = false,
    categories,
    isMore,
    tags,
    local18Video,
    caption,
    readMore
}) {
    let width = "";
    let height = "";
    if (isMore) {
        width = 110;
        height = 96;
    } else {
        width = isMobile ? 375 : 680;
        height = isMobile ? 211 : 390;
    }
    if (local18Video) {
        return (
            <div
                data-pubstack-player="true"
                data-pubstack-config="video-embed"
                style={{ background: "#ddd", width: "100%", height }}
                data-pubstack-guid={local18Video}
                data-property-category={categories}
                data-property-platform={isMobile ? "mobile" : "desktop"}
                data-property-keywords={tags}
                data-embed-mode="manual"
                city_name = {articleData?.dis?.en || ''}
                district_name = {articleData?.dis?.en || ''}
                state_name = {articleData.dis.stateName || ''}
                section_name = {articleData.section[0] || ''}
                article_id = {articleData.story_id || ''}
                language = "hi"
                video_type = "local18"

                //                 dangerouslySetInnerHTML={{
                //                     __html: `
                // <img onload="!function(){var e=setInterval(function(){window.pubstackJSLoaded&&clearInterval(e),window.refreshPubstackPlayers()},1e3)}();" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100%" />`,
                //                 }}
            >
                <LazyImage
                    width={width}
                    height={height}
                    src={image}
                    alt={caption || headline}
                    title={caption || headline}
                    isRes={isMobile}
                    isSmartPlayer={true}
                />
            </div>
        );
    } else {
        return (
            <>
                    <LazyImage
                        width={width}
                        height={height}
                        src={image}
                        alt={caption || headline}
                        title={caption || headline}
                        isRes={isMobile}
                        isMore={isMore}
                        caption={caption}
                        isDistrict={true}
                        readMore={readMore}
                    />
            </>
        );
    }
});
