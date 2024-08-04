// import logger from "../../logger";
const newrelic = require("newrelic");
const NodeCache = require("node-cache");

const incache = new NodeCache();

function isUrlValid(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function fetchUtility(
  api,
  defaultValue = [],
  key = "",
  ttl = 900,
  headers = ""
) {
  if (isUrlValid(api)) {
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
        keepalive: true,
      };
      let finalHeaders = "";
      if (headers) {
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
      if (
        data.error &&
        typeof data.error === "object" &&
        Object.keys(data.error).length
      ) {
        newrelic &&
          newrelic.noticeError(
            `SSR fetchUtility Error API_URL - ${api} - ${JSON.stringify(
              data.error
            )}`
          );
      }
      return defaultValue;
    } catch (error) {
      newrelic &&
        newrelic.noticeError(
          `SSR fetchUtility Error API_URL FROM Cache(Javascript Error) - ${api} - ${JSON.stringify(
            error
          )}`
        );
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}
