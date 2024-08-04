//import Link from "next/link";

const ReadMore = ({ categoryLink = false, heading, buttonType = false }) => {
    if(!heading) {
        return false;
    }
    return (
        <>
            <a href={categoryLink} className={`moretrndstroy${buttonType ? '2' : ''}`}>{heading ? heading : `और भी पढ़ें`}</a>
            <style jsx global>{`
                .moretrndstroy{color: #fff;font-size: 14px;text-align: center;font-weight: bold;background: #E1261C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #FFFFFF;border-radius: 16px;display: table;margin: 10px auto;width: 140px;height: 32px;line-height: 32px;}
                .moretrndstroy:after{content: "";background: url(/images/siteimages/newiconsprite_1669351342.svg) -163px 0px no-repeat;width: 11px;height: 11px;display: inline-block;margin-left: 8px; filter: brightness(0) invert(1);}

                .moretrndstroy2{color: #E82D2E;font-size: 14px;display: block;text-align: center;line-height: 24px;font-weight: bold;}
                .moretrndstroy2:after{content: "";background: url(/images/siteimages/newiconsprite_1669351342.svg) -164px 0px no-repeat;width: 11px;height: 11px;display: inline-block;margin-left: 6px; vertical-align: middle;}	
            `}</style>
        </>
    );
};

export default ReadMore;
