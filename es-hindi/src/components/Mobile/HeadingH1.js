import Link from "next/link";

const HeadingH1 = ({ categoryLink = false, heading }) => {
    if(!heading) {
        return false;
    }
    return (
        <>
            <div className="newglblhdwrap">
                {
                    categoryLink ? (
                        <h1 className="newglblhd"><Link href={categoryLink}>{heading}</Link></h1>
                    ) : (
                        <h1 className="newglblhd">{heading}</h1>
                    )
                }
            </div>
            <style jsx global>{`
                .newglblhdwrap{border-bottom: 1px solid #d9d9d9; position: relative; margin:10px 10px 6px 10px; display: flex; justify-content: space-between; align-items: center;}
                .newglblhdwrap:before{content: ""; background: #ED1C24; width: 25px; height: 4px; position: absolute; left: 0; bottom: 0;}
                .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{font-size: 20px;line-height: 38px; color: #000; font-weight: bold; display: flex;align-items: end;}
                .newglblhdwrap .newglblhd span, .newglblhdwrap .newglblhd a span{color:#ED1C24; margin-right: 5px;}
                .newglblhdwrap .newglblhd em, .newglblhdwrap .newglblhd a em{color: #868686;font-weight: normal;text-transform: uppercase;font-style: normal;font-size: 12px; margin-left: 10px; position: relative; top: -6px; line-height: 11px; text-align: right;}
            `}</style>
        </>
    );
};

export default HeadingH1;
