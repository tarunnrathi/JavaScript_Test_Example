const fetchExitPoll = async ({
  mode = 'prod',
  lang = 'en',
  isMobile = false,
  csr = false,
}) => {
  try {
    const res = await fetch(
      csr
        ? `https://elections-v3-gcs-json.news18.com/feed/${lang}/ls/in/exitpoll.json`
        : `http://elections-v3-api.news18.internal/api/${lang}/ls/in/exitpoll`
    );

    const data = await res.json();

    if (data && data?.data) {
      const exitPollData = exitPollParser(data.data, isMobile, lang, mode);
      return { ...exitPollData };
    }
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const exitPollParser = (exitPollData, isMobile = false) => {
  const [topAgency, restAgencies] = mapAllAgencies(
    exitPollData?.agency,
    isMobile
  );
  return {
    ...exitPollData,
    topAgency,
    agency: restAgencies,
  };
};

const mapAllAgencies = (agency, isMobile) => {
  let restAgencies = [];
  let topAgency = null;
  if (!Array.isArray(agency)) return [topAgency, restAgencies];
  const topAgencyIndex = agency.findIndex(item => item?.isNW18Poll);
  if (topAgencyIndex > -1) {
    topAgency = agency[topAgencyIndex];
    restAgencies = agency.filter((_, index) => index !== topAgencyIndex);
    if (isMobile) {
      return [null, [topAgency, ...restAgencies]];
    }
    return [topAgency, restAgencies];
  }
  return [topAgency, agency];
};

export { fetchExitPoll };
