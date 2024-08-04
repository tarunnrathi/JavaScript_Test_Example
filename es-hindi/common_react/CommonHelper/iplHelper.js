const iplAuctionParser = ({
  players,
  mode = "prod",
  lang = "en",
  eventLabel,
} = {}) => {
  try {
    if (players) {
      return { players, mode, lang, eventLabel };
    }

    return { OnOff: "" };
  } catch (error) {
    return { OnOff: "" };
  }
};

const iplAuctionContent = async ({
  mode = "prod",
  lang = "en",
  eventLabel,
} = {}) => {
  try {
    let [players] = await Promise.all(
      [
        fetch(
          `https://cricketnext.nw18.com/sports/csr/ipl-auction/ipltopplayers_${lang}_2024.json`
        ).then((p) => p.json()),
      ].map((p) => p.catch((e) => {}))
    );

    return iplAuctionParser({ players, mode, lang, eventLabel });
  } catch (error) {
    return { OnOff: "" };
  }
};

export { iplAuctionParser, iplAuctionContent };
