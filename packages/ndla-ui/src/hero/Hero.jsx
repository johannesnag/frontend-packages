/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

const bgStyle = {
  backgroundImage: 'url(https://images.unsplash.com/photo-1476903930099-d0ddfec9a475?dpr=1&auto=format&fit=crop&w=1500&h=1124&q=80&cs=tinysrgb&crop=)',
};

export const Hero = ({ children }) =>
  <div className="c-hero" style={bgStyle}>
    { children }
  </div>;

Hero.propTypes = {
  children: PropTypes.node.isRequired,
};
