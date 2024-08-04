'use strict';
/**
 *  * New Relic agent configuration.
 *   *
 *    * See lib/config/default.js in the agent distribution for a more complete
 *     * description of configuration variables and their potential values.
 *      */
let siteConfig = require('./src/config/site.config');
let appName = 'STG-NODE-EShindi.news18.com';
let newRelicStatus = false;
switch (siteConfig.isEnv) {
  case 'production':
    appName = 'PROD-NODE-EShindi.news18.com';
    newRelicStatus = true;
    break;
  case 'beta':
    appName = 'BETA-NODE-EShindi.news18.com';
    newRelicStatus = true;
    break;
  case 'stg':
    appName = 'STG-NODE-EShindi.news18.com';
    newRelicStatus = true;
    break;
  default:
    appName = 'DEV-NODE-EShindi.news18.com';
    newRelicStatus = true;
    break;
}
exports.config = {
  /**
   *    * Array of application names.
   *       */
  agent_enabled: newRelicStatus,
  app_name: [appName],
  /**
   *    * Your New Relic license key.
   *       */
  license_key: 'f6832097796dcca9e8524532363afd979286d484',
  /**
   *    * This setting controls distributed tracing.
   *       * Distributed tracing lets you see the path that a request takes through your
   *          * distributed system. Enabling distributed tracing changes the behavior of some
   *             * New Relic features, so carefully consult the transition guide before you enable
   *                * this feature: https://docs.newrelic.com/docs/transition-guide-distributed-tracing
   *                   * Default is true.
   *                      */
  distributed_tracing: {
    /**
     *      * Enables/disables distributed tracing.
     *           *
     *                * @env NEW_RELIC_DISTRIBUTED_TRACING_ENABLED
     *                     */
    enabled: true,
  },
  logging: {
    /**
     *      * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     *           * issues with the agent, 'info' and higher will impose the least overhead on
     *                * production applications.
     *                     */
    level: 'info',
  },
  /**
   *    * When true, all request headers except for those listed in attributes.exclude
   *       * will be captured for all traces, unless otherwise specified in a destination's
   *          * attributes include/exclude lists.
   *             */
  allow_all_headers: true,
  attributes: {
    include: ['request.parameters.*'],
    /**
     *      * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     *           * at end.
     *                *
     *                     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *                          *
     *                               * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
     *                                    */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
};