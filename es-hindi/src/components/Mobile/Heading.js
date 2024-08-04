import HeadingWithoutContainer from "./HeadingWithoutContainer";

const Heading = ({ categoryLink = false, heading }) => {
    if(!heading) {
        return false;
    }
    return (
        <>
            <div className="newglblhdwrap">
                <HeadingWithoutContainer
                    categoryLink={categoryLink}
                    heading={heading}
                />
            </div>
            <style jsx global>{`
                .newglblhdwrap{border-bottom: 1px solid #d9d9d9; position: relative; margin:10px 10px 6px 10px; display: flex; justify-content: space-between; align-items: center;}
                .newglblhdwrap:before{content: ""; background: #ED1C24; width: 25px; height: 4px; position: absolute; left: 0; bottom: 0;}
            `}</style>
        </>
    );
};

export default Heading;
