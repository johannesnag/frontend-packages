/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';

const logglyUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://loggly-mock-api';
  }

  return 'https://logs-01.loggly.com';
})();

export default (logglyApiKey, data) => fetch(`${logglyUrl}/inputs/${logglyApiKey}/`, {
  method: 'POST',
  body: JSON.stringify(data),
}).catch((ex) => {
  if (window && window.console && typeof window.console.error === 'function') {
    console.error(`Failed to log to loggly because of this exception:\n${ex}`); // eslint-disable-line no-console
    console.error('Failed log data:', data); // eslint-disable-line no-console
  }
});