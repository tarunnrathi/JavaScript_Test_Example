import "lazysizes";
import DistrictImage from "components/Common/DistrictImage";

const MoreFromDistrictCard = (props) => {
    const outBrainUrl = (props.item.weburl || props.item.url)
        .replace(/(https|http):\/\/(stg|beta)?hindi.news18.com\//, "/");
        // .replace(/\/.*\//, "");
    // outBrainUrl = `/news/${props.item.subCategorySlug.href}/${outBrainUrl}`;
    const distritCategories = props.item.categories.filter(
        (item) => item.slug === props.item.subCategorySlug
    );
    const shareUrl ='';
    // if(props.item.ff_source == 'Hyperlocal') {
    //     outBrainUrl = outBrainUrl.replace(/\/.*\//, "");
    //     shareUrl = `news/${outBrainUrl}`;
    //     outBrainUrl = `/news/${outBrainUrl}`;
    // } else {
    //     outBrainUrl = outBrainUrl.split('-');
    //     outBrainUrl.splice(outBrainUrl.length-1,0, 'desk')
    //     outBrainUrl =  outBrainUrl.join('-')
    //     // console.log({outBrainUrl});
    //     // outBrainUrl = outBrainUrl.join('-')
    //     // console.log({outBrainUrl});
    //     // shareUrl = `news/${currentDistrictSlug}/${outBrainUrl}`;
    //     // outBrainUrl = outBrainUrl.substring(1);
    // }
    // console.log({outBrainUrl});
    const {
        headline,
        images: { url: thumbnail, caption } = {},
        categories,
        intro,
    } = props.item;
    return (
        <li>
            <a href={outBrainUrl}>
                <DistrictImage
                    headline={headline}
                    image={thumbnail}
                    caption={caption ? caption : ""}
                    // youtubeId={youtubeId}
                    isMobile={props.isMobile}
                    categories={categories}
                    isMore={true}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>{headline}</h2>
                    <span>
                        {props?.item?.subCategorySlug?.hi}
                    </span>
                </div>
            </a>
        </li>
    );
};
export default MoreFromDistrictCard;
