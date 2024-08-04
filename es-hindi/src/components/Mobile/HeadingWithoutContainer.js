import Link from "next/link";

const HeadingWithoutContainer = ({ categoryLink = false, heading }) => {
    return (
        <>
                {
                    categoryLink ? (
                        <h2 className="newglblhd"><Link href={categoryLink}>{heading}</Link></h2>
                    ) : (
                        <h2 className="newglblhd">{heading}</h2>
                    )
                }

            <style jsx global>{`
                .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{font-size: 20px;line-height: 38px; color: #000; font-weight: bold; display: flex;align-items: end;}
                .newglblhdwrap .newglblhd span, .newglblhdwrap .newglblhd a span{color:#ED1C24; margin-right: 5px;}
                .newglblhdwrap .newglblhd em, .newglblhdwrap .newglblhd a em{color: #868686;font-weight: normal;text-transform: uppercase;font-style: normal;font-size: 12px; margin-left: 8px; position: relative; top: -8px;
                    line-height: 1.3;
                    text-align: right;}                
            `}</style>
        </>
    );
};

export default HeadingWithoutContainer;
