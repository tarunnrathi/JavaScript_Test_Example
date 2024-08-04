// // import fetchUtility from "includes/sFetchUtility";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();

const /* api_host = "https://pubstack.nw18.com",
  property = "News18 हिंदी", */
  property_id = "5ee0c7d7274b9d7d0ae8f434",
  access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWUyMjZhMDIxNWEyNzg0ODE4NTA1YjEiLCJzY29wZSI6IldFQlNJVEUiLCJzZXNzaW9uX2lkIjoiNjFhN2JiMjEtYTJkMy00NGYyLWE5NzYtOThkNDQ4NDRmOWY2IiwiaWF0IjoxNTk5OTg3Njk2fQ.faoXfaKgAPdxpWIW2OhVrpROELMWsIVLd66C4Omba3M";

const baseURL = "https://pubstack.nw18.com/pubsync/v1/api/websites/";
const headers = { Authorization: "Bearer " + access_token };

const fetchHelper = async (relativeUrl) => {
  const data = await fetch(baseURL + relativeUrl, headers);
  return await data.json();
};

/*
 * Videos Listig API
 */
const youtubeHelperVideoListing = async (skip = 0, limit = 25) => {
  //let callingUrl = property_id + "/listing";
  //let response = await axiosInstance(callingUrl);
  //return await fetchUtility(`https://pubstack.nw18.com/pubsync/v1/api/websites/${callingUrl}`, [], "youtube_listing", 900, { 'Authorization': 'Bearer ' + access_token });
  return [];
};

/*
 * Video Stories Feed
 */
const youtubeHelperVideoStoriesFeed = () => {
  // $curl = curl_init();
  // curl_setopt_array($curl, array(
  //     CURLOPT_URL => $this->api_host."/pubsync/v1/api/websites/stories/".$this->property_id."/feed",
  //     CURLOPT_RETURNTRANSFER => true,
  //     CURLOPT_ENCODING => "",
  //     CURLOPT_MAXREDIRS => 10,
  //     CURLOPT_TIMEOUT => 0,
  //     CURLOPT_FOLLOWLOCATION => true,
  //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  //     CURLOPT_CUSTOMREQUEST => "GET",
  //     CURLOPT_HTTPHEADER => array(
  //         "Content-Type: application/json",
  //         "Authorization: Bearer $this->access_token"
  //     ),
  // ));
  // $response = curl_exec($curl);
  // curl_close($curl);
  // $response = json_decode($response,true);
  // return $response;
};

/*
 * Trending data for RHS
 */
const youtubeHelperTrendingData = async () => {
  /*let callingUrl = property_id + "/trending-playlists/listing",
        response = await axiosInstance(callingUrl);

    if (response && response.data && response.data.data) {
        return response.data.data;
    }

    return response;*/
  return [];
};

const youtubeHelperTrendingDataNew = async () => {
  /*let callingUrl = property_id + "/trending-playlists/listing";
    return fetchUtility(`https://pubstack.nw18.com/pubsync/v1/api/websites/${callingUrl}`, {}, "youtube_trending", 1800, { 'Authorization': 'Bearer ' + access_token });*/
  return [];
};

/*
 * Update Mapping
 */
// const youtubeHelperUpdateMapping = async () => {
//   const callingUrl = "stories",
//     response = await axiosInstance(callingUrl);

//   if (response && response.data && response.data.data) {
//     return response.data.data;
//   }

//   return response;
// };

/*
 * Get Channel ID
 */
const youtubeHelperGetChannelId = async (channel) => {
  let videos = await youtubeHelperVideoListing(),
    channelId = "",
    channels = videos?.website?.channels || [];

  channels.forEach((element) => {
    if (element.slug == channel) {
      channelId = element.id;
    }
  });

  return channelId;
};

/*
 * Channels
 */
const youtubeHelperGetChannel = async (
  channel_id = "5f59129695c1d61ee73b248d",
  skip = 0,
  limit = 25
) => {
  if (channel_id != "") {
    const callingUrl =
        property_id +
        "/channels/" +
        channel_id +
        "/listing?skip=" +
        skip +
        "&limit=" +
        limit,
      response = await fetchHelper(callingUrl);

    if (response && response.data && response.data.data) {
      return response.data.data;
    }
  } else {
    return {};
  }
};

/*
 * Get Channel ID
 */
const youtubeHelperGetPlaylistId = (playlist, playlists) => {
  let response = "none";
  if (playlists) {
    playlists.forEach((element) => {
      if (element.slug == playlist) {
        response = element.id;
      }
    });

    return response;
  } else {
    return "";
  }
};

/*
 * PlayList
 */
const youtubeHelperGetPlaylist = async (playlist_id, skip = 0, limit = 25) => {
  if (playlist_id == "none" || playlist_id == "") {
    return {};
  }
  const callingUrl =
      property_id +
      "/playlists/" +
      playlist_id +
      "/listing?skip=" +
      skip +
      "&limit=" +
      limit,
    response = await fetchHelper(callingUrl);

  if (response && response.data && response.data.data) {
    return response.data.data;
  }

  return response;
};

// images function
const youtubeHelperVideoGetStaticImg = (src, width = "", height = "") => {
  flag = true;
  if (flag) {
    image = str_replace("http://cms.ibnkhabar.com/wp-content/uploads", "", src);
    image = str_replace(
      "http://img01.ibnlive.in/ibnkhabar/uploads/",
      "",
      image
    );
    image = str_replace(
      "http://devhindicms.news18.com/wp-content/uploads/",
      "",
      image
    );
    image = str_replace(
      "https://static.hindi.news18.com/ibnkhabar/uploads/",
      "",
      image
    );
    image = str_replace(
      "https://images.news18.com/ibnkhabar/uploads/",
      "",
      image
    );
    image = str_replace(
      "https://images.news18.com/ibnkhabar/uploads/",
      "",
      image
    );
    //$image = str_replace("http://stghindicms.news18.com/wp-content/uploads/","",$image);
    if (width == "" && height == "") {
      $img = "https://images.news18.com/ibnkhabar/uploads/" + image;
    } else {
      img =
        "https://images.news18.com/ibnkhabar/uploads/" +
        image +
        "?impolicy=website&width=" +
        width +
        "&height=" +
        height;
    }
  } else {
    img = src;
  }

  return img;
};

// new function

const youtubeHelperGetChannelInfo = async (channel, plist) => {
  let videos = await youtubeHelperVideoListing(),
    channelId = "",
    channels = videos?.website?.channels;

  const youtubeChannel = {};
  let youtubeChannelPlaylistID = [];
  const youtubeChannelPlaylist = {};
  if (channels) {
    channels.forEach((element) => {
      //console.log('channels element', element);
      if (element.slug == channel) {
        channelId = element.id;
        youtubeChannel.category = element;
        youtubeChannelPlaylistID = element.playlists;

        element.playlists.forEach((list) => {
          if (list?.slug === plist) {
            youtubeChannelPlaylistID = list.id;
            youtubeChannelPlaylist.playlist = list;
            youtubeChannelPlaylist.playlist.stories = list.stories.slice(0, 5);
            youtubeChannelPlaylist.playlist.total =
              youtubeChannelPlaylist?.playlist?.stories?.length;
          }
        });
      }
    });
  }

  return {
    youtubeChannelID: channelId,
    youtubeChannel,
    youtubeChannelPlaylistID,
    youtubeChannelPlaylist,
  };
};

export {
  youtubeHelperVideoListing,
  youtubeHelperTrendingData,
  youtubeHelperTrendingDataNew,
  // youtubeHelperUpdateMapping,
  youtubeHelperGetPlaylist,
  youtubeHelperGetPlaylistId,
  youtubeHelperGetChannelId,
  youtubeHelperGetChannel,
  youtubeHelperVideoGetStaticImg,
  youtubeHelperGetChannelInfo,
};
