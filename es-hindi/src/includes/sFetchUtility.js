const NodeCache = require("node-cache");

const incache = new NodeCache();

export default async function fetchUtility(
  api,
  defaultValue = [],
  key = "",
  ttl = 900,
  headers = ""
) {
  //console.log("sFetchUtility", api);
  const url_api = new URL(api);
  const domain = url_api.hostname;
  try {
    if (key) {
      const data = incache.get(key);
      if (data) {
        return data;
      }
    }

    const defaultHeaders = {
      "Accept-Encoding": "gzip, deflate",
      Host: domain,
      // keepalive: true,
    };
    let finalHeaders = "";
    if (headers != "") {
      finalHeaders = { ...defaultHeaders, ...headers };
    } else {
      finalHeaders = defaultHeaders;
    }
    let data = await fetch(api, { headers: finalHeaders });
    data = await data.json();

    if (data && data.data) {
      if (key) {
        incache.set(key, data.data, ttl); // 15mins ttl Default  // ttl is in Seconds
      }
      return data.data;
    } else if (data && !data.error) {
      return data;
    }
  } catch (error) {
    // console.error("----------------error",error);
    return defaultValue;
  }
}
