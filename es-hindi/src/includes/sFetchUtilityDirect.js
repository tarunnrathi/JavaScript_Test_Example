const NodeCache = require("node-cache");

const incache = new NodeCache();


export default async function fetchUtility(
  api,
  defaultValue,
  key,
  ttl = 900,
  headers = ""
) {
  try {
    if (key) {
      const data = incache.get(key);
      if (data) {
        return data;
      }
    }
    const defaultHeaders = {
      "Accept-Encoding": "gzip, deflate",
    };
    let finalHeaders = "";
    if (headers) {
      finalHeaders = { ...defaultHeaders, ...headers };
    } else {
      finalHeaders = defaultHeaders;
    }
    let data = await fetch(api, { headers: finalHeaders });
    data = await data.json();

    if (data) {
      if (key) {
        incache.set(key, data.data, ttl);
      }
      return data;
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
