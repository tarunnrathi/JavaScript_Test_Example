const IplDescription = ({ page_description }) => {
  return (
    <>
        <div className="iplspclcnts clearfix">
          <div
          dangerouslySetInnerHTML={{
            __html: page_description,
          }}
        ></div>
        </div>
        <style jsx global>{`
        .iplspclcnts {
            background: #f5f5f5;
            padding: 15px;
            font-size: 16px;
            color: #444;
            line-height: 24px;
            margin: 10px;
        }
        .clearfix:after, .clearfix:before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
            font-size: 16px;
            color: #444;
        }
        `}</style>
    </>
  );

};

export default IplDescription;
