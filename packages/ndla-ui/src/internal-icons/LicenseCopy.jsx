/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const LicenseCc = ({ className, ...rest }) =>
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className={className}
    {...rest}>
    <path d="M31.9,0c9,0,16.6,3.1,22.9,9.4c3,3,5.3,6.4,6.9,10.3c1.6,3.9,2.3,8,2.3,12.3c0,4.4-0.8,8.5-2.3,12.3s-3.8,7.2-6.8,10.1
  		c-3.1,3.1-6.7,5.4-10.6,7.1c-4,1.6-8.1,2.5-12.3,2.5s-8.3-0.8-12.1-2.4c-3.9-1.6-7.3-4-10.4-7S4,48,2.4,44.2S0,36.3,0,32
  		c0-4.2,0.8-8.3,2.4-12.2s4-7.4,7.1-10.5C15.6,3.1,23.1,0,31.9,0z M32.1,5.8c-7.3,0-13.5,2.6-18.5,7.7C11.1,16,9.2,18.8,7.8,22
  		s-2,6.5-2,10c0,3.4,0.7,6.7,2,9.9c1.4,3.2,3.3,6,5.8,8.5s5.4,4.4,8.5,5.7c3.2,1.3,6.5,2,9.9,2s6.8-0.7,10-2s6.1-3.3,8.7-5.8
  		c5-4.9,7.5-11,7.5-18.3c0-3.5-0.6-6.9-1.9-10.1c-1.3-3.2-3.2-6-5.7-8.5C45.5,8.3,39.3,5.8,32.1,5.8z M45.4,23.9L39,27.3
  		c-0.7-1.4-1.5-2.4-2.5-3s-1.9-0.9-2.8-0.9c-4.3,0-6.4,2.8-6.4,8.5c0,2.6,0.5,4.6,1.6,6.2c1.1,1.5,2.7,2.3,4.8,2.3
  		c2.8,0,4.8-1.4,5.9-4.1l5.9,3c-1.3,2.4-3,4.2-5.2,5.5s-4.7,2-7.4,2c-4.3,0-7.8-1.3-10.4-4c-2.6-2.6-4-6.3-4-11
  		c0-4.6,1.3-8.2,4-10.9s6-4,10.1-4C38.6,17,42.8,19.3,45.4,23.9z" />
  </svg>;

LicenseCc.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LicenseCc;
