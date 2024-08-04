import Loader from "react-loader-spinner";

const PlaceholderCard = () => {
    return (
        <>
            <div className={"placeholder-card"}>
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={5000}
                />
            </div>
            <style>{`
                .placeholder-card {
                    text-align: center;
                    height: 500px;
                    padding-top: 150px;
                }
            `}</style>
        </>
    );
};

export default PlaceholderCard;
