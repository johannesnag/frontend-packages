/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

const Info = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" width="100" height="100" className={className}>
    <path d="M 12 0 C 5.373 0 0 5.373 0 12 C 0 18.627 5.373 24 12 24 C 18.627 24 24 18.627 24 12 C 24 5.373 18.627 0 12 0 z M 12 2 C 17.523 2 22 6.477 22 12 C 22 17.523 17.523 22 12 22 C 6.477 22 2 17.523 2 12 C 2 6.477 6.477 2 12 2 z M 12 5.8125 C 11.818 5.8125 11.663 5.80675 11.5 5.84375 C 11.337 5.88075 11.1835 5.9695 11.0625 6.0625 C 10.9425 6.1555 10.85125 6.2855 10.78125 6.4375 C 10.71125 6.5905 10.6875 6.77 10.6875 7 C 10.6875 7.225 10.71225 7.4075 10.78125 7.5625 C 10.85125 7.7175 10.9415 7.8445 11.0625 7.9375 C 11.1835 8.0305 11.337 8.086 11.5 8.125 C 11.663 8.165 11.818 8.1875 12 8.1875 C 12.181 8.1875 12.37225 8.165 12.53125 8.125 C 12.69325 8.086 12.8165 8.0295 12.9375 7.9375 C 13.0575 7.8445 13.14675 7.7185 13.21875 7.5625 C 13.29075 7.4085 13.34375 7.225 13.34375 7 C 13.34375 6.77 13.29075 6.5895 13.21875 6.4375 C 13.14675 6.2855 13.0575 6.1555 12.9375 6.0625 C 12.8165 5.9695 12.69325 5.88075 12.53125 5.84375 C 12.37225 5.80675 12.181 5.8125 12 5.8125 z M 10.78125 9.15625 L 10.78125 18.125 L 13.21875 18.125 L 13.21875 9.15625 L 10.78125 9.15625 z" />
  </svg>
);

Info.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Info;
