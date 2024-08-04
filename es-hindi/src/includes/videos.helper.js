const videos = {
  topStoryArraydata: (data) => {
    if (!data) {
      return;
    }
    return data?.length > 0 ? data?.slice(0, 1) : [];
  },
  topStoryArraylist: (data) => {
    if (!data) {
      return;
    }
    return data?.length > 0 ? data?.slice(1, 9) : [];
  },
  topStoryArraylists: (data) => {
    if (!data) {
      return;
    }
    return data?.length > 0 ? data?.slice(9) : [];
  },
  latestlist: (data) => {
    if (!data) {
      return;
    }
    return data?.length > 0 ? data?.slice(7, 11) : [];
  },
};

export { videos };
