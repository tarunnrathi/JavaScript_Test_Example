const Heading = ({ categoryLink, heading, isAmp = false }) => {
  if (!heading) {
    return false;
  }

  const container =
    heading !== "मनी" ? "newglblhd loceght" : "newglblhd moneySection";

  return (
    <>
      <h2 className={container}>
        <a href={categoryLink ? categoryLink : "/"} className="hp_local18_logo">
          {heading === "प्रदेश न्यूज़" ? (
            <img
              src="/images/logos/local18Desk.png"
              width="85px"
              height="31px"
              className="hp_local18_logo"
              alt="local18_logo"
              id="loca18 logo"
            />
          ) : heading ? (
            heading
          ) : null}
        </a>
        {heading === "मनी" && (
          <span className="formoneyspecial">
            <em>POWERED BY</em>
            <a
              href="https://www.moneycontrol.com/"
              rel="nofollow"
              target="_blank"
            >
              <img src="/images/siteimages/moneycontrol_logo_1591703617.png" />
            </a>
          </span>
        )}
      </h2>

      <style jsx global>{`
        .newglblhdwrap .newglblhd,
        .newglblhdwrap .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: #000;
          font-weight: bold;
          display: flex;
          align-items: end;
        }
        .formoneyspecial {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .formoneyspecial em {
          width: 60px;
          display: inline-block;
          line-height: 12px ${isAmp ? "" : "!important"};
          font-size: 11px ${isAmp ? "" : "!important"};
          text-align: right;
          margin-right: 5px;
          top: 2px ${isAmp ? "" : "!important"};
        }

        .formoneyspecial img {
          width: 110px;
        }
        .newglblhdwrap .newglblhd.loceght a img {
          margin-bottom: 7px;
        }
      `}</style>
    </>
  );
};

export default Heading;
