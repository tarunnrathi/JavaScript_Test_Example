import Loader from "react-loader-spinner";

const GetLoader = () => {
    return (
        <>
            <div className={"placeholder-card"}>
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
            <style jsx global>{`
                .placeholder-card {
                    text-align: center;
                    padding: 50px;
                }
            `}</style>
        </>
    );
};

export default GetLoader;
