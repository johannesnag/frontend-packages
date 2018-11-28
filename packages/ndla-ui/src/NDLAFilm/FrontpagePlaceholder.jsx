/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import BEMHelper from 'react-bem-helper';

import Spinner from '@ndla/editor';

const classes = new BEMHelper({
  name: 'film-frontpage-placeholder',
  prefix: 'c-',
});

const FrontpagePlaceholder = () => (
  <div>
    <div {...classes('slideshow')}>
      <Spinner />
    </div>
  </div>
);

export default FrontpagePlaceholder;
