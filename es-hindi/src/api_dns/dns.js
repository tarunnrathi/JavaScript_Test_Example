const url = require("url");
const dnscache = require("dnscache")({
  enable: true,
  ttl: 900, // 15 min dns cache
  cachesize: 1000,
});

export function dnsCacheDomain(destUrl) {
  const domain = url.parse(destUrl).hostname;
  try {
    //const urlObject = new URL(api);
    return new Promise((resolve, reject) => {
      dnscache.lookup(domain, function (err, result) {
        if (err) {
          reject(err);
        }
        const response = {
          hostname: domain,
          ip: result,
          url: destUrl.replace(domain, result),
        };

        resolve(response);
      });
    });
  } catch (error) {
    logger.error(
      `Hindi Frontend error :> dnsCacheDomain Error: site:${domain}, error_msg: ${error.message}, error: ${error}}`
    );
  }
}
