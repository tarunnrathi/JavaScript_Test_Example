import ReadMore from "./ReadMore";

const ReadMoreBtn = ({
    className,
    link,
    label
}) => {
    if(!label) {
        return null;
    }
    return (
        <>
            <div className={className ? className : ''}>
                <ReadMore
                    link={link}
                    label={label}
                />
            </div>
            <style jsx global>{`
                .moretrndstroygrey{height: 70px;background: #F3F3F3;border: 1px solid #DBDBDB;border-radius: 4px; display: flex!important; align-items: center; justify-content: center;}
                .newpradeshbtn {
                    background: #F6F7F7;
                    padding: 5px 0 0 0;
                    margin-top: 12px;
                  }
            `}</style>
        </>
    );
};

export default ReadMoreBtn;
