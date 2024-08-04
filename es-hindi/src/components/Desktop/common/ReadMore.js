const ReadMore = ({ link, label }) => {
    if(!label) {
        return null;
    }
    return (
        <>
            <a href={link ? link : ''} className="moretrndstroy">{label ? label : ''}</a>
            <style jsx global>{`
                .moretrndstroy {
                    color: #E82D2E;
                    font-size: 14px;
                    display: block;
                    text-align: center;
                    line-height: 24px;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                .moretrndstroy:after {
                    content: "";
                    background: url(/images/siteimages/newiconsprite_1669351342.svg)-164px 0px no-repeat;
                    width: 11px;
                    height: 11px;
                    display: inline-block;
                    margin-left: 6px;
                    vertical-align: middle;
                }
            `}</style>
        </>
    );
};

export default ReadMore;
