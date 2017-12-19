/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// N.B This component is used to render static markup serverside
// Any interactivty is added by scripts located in the ndla-article-scripts package

import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';
import BEMHelper from 'react-bem-helper';

import Dialog from '../Dialog';
import { ContributorShape } from '../shapes';
import LicenseByline from '../LicenseByline';

const classLicenses = new BEMHelper({
  name: 'figure-license',
  prefix: 'c-',
});

export const FigureFullscreenDialog = ({
  messages,
  id,
  image,
  caption,
}) => {
  const headingLabelId = `heading-${id}`;
  return (
    <Dialog id={id} labelledby={headingLabelId} messages={messages} modifier="fullscreen">
      <div {...classLicenses('', 'fullscreen')}>
        <div {...classLicenses('content')}>
          <img {...classLicenses('img')} src={image.props.src} alt={image.props.alt} />
            <h3 id={headingLabelId} {...classLicenses('image-title')}>
              test
            </h3>
            {caption}
        </div>
      </div>
    </Dialog>
  );
};

