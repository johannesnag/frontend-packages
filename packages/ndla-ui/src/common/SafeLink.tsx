/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, LinkProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import isString from 'lodash/isString';

const isExternalLink = (to?: LocationDescriptor) =>
  to &&
  isString(to) &&
  (to.startsWith('https://') || to.startsWith('https://'));

export const isOldNdlaLink = (to?: LocationDescriptor) =>
  to && isString(to) && to.match(/(.*)\/?node\/(\d+).*/) !== null;

// Fallback to normal link if app is missing RouterContext, link is external or is old ndla link
const SafeLink: React.FunctionComponent<
  LinkProps & React.HTMLAttributes<HTMLElement>
> = (props, context) => {
  if (!context.router || isExternalLink(props.to) || isOldNdlaLink(props.to)) {
    const { to, ...rest } = props;
    delete rest.replace;
    const href = typeof to === 'string' ? to : '#';
    return (
      <a href={href} {...rest}>
        {props.children}
      </a>
    );
  }

  return <Link {...props}>{props.children}</Link>;
};

SafeLink.contextTypes = {
  router: PropTypes.object, // eslint-disable-line
};

export default SafeLink;