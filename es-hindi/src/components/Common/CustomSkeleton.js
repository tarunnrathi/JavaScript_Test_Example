import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomSkeleton = ({
    height
}) => {
    return (
        <Skeleton height={height} />
    );
};

export default CustomSkeleton;
