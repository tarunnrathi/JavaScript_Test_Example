import ReadMore from "components/Desktop/common/ReadMore";

const ReadMoreWhiteBg = ({ link, label }) => {
    if(!label) {
        return null;
    }
    return (
        <>
            <div className="newpwhitebgbtn">
                <ReadMore
                    link={link}
                    label={label}
                />
            </div>
            <style jsx global>{`
                .newpwhitebgbtn {
                    background: #fff;
                    padding: 5px 0 0 0;
                    margin-top: 12px;
                }
                .newhealthfitness .newpwhitebgbtn {
                    margin: 10px 10px 0 10px;
                }
            `}</style>
        </>
    );
};

export default ReadMoreWhiteBg;
