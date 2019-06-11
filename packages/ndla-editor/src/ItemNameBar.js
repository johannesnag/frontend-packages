/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { spacing, colors, fonts } from '@ndla/core';

const itemTitleArrow = css`
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 9px solid ${colors.text.primary};
    margin-right: ${spacing.xsmall};
  }
`;

const itemTitleLinked = css`
  &:before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-bottom: 2px solid ${colors.brand.light};
    border-left: 2px solid ${colors.brand.light};
    border-bottom-left-radius: 2px;
    margin-right: ${spacing.xsmall};
    margin-left: 7px;
  }
`;

const ItemTitleButton = styled.button`
  ${fonts.sizes(16, 1)};
  font-weight: ${fonts.weight.semibold};
  border: 0;
  background: 0;
  color: ${colors.brand.primary};
  display: flex;
  align-items: center;
  text-align: left;
  white-space: nowrap;

  ${props => props.hasSubtopics && itemTitleArrow};
  ${props =>
    props.lastItemClickable &&
    css`
      cursor: pointer;
    `};
  ${props => !props.hasSubtopics && !props.isSubject && itemTitleLinked};
  &:before {
    transition: transform 200ms ease;
    transform: rotate(
      ${props => props.hasSubtopics && props.arrowDirection}deg
    );
  }
`;

const StyledItemBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${spacing.small} 0
    calc(${props => props.level} * 17px + ${spacing.small});
  height: 40px;
  border-bottom: 1px solid ${colors.brand.greyLighter};

  &:hover {
    background: ${props => (props.highlight ? colors.brand.light : '#f1f5f8')};
  }
`;

const ItemTitleSpan = ItemTitleButton.withComponent('span');

const ItemNameBar = ({
  title,
  children,
  path,
  toggleOpen,
  hasSubtopics,
  isOpen,
  isSubject,
  lastItemClickable,
  id,
}) => (
  <StyledItemBar>
    {lastItemClickable || hasSubtopics ? (
      <ItemTitleButton
        type="button"
        id={id}
        hasSubtopics={hasSubtopics}
        isSubject={isSubject}
        lastItemClickable={lastItemClickable}
        arrowDirection={isOpen ? 90 : 0}
        onClick={() => toggleOpen(path)}>
        {title}
      </ItemTitleButton>
    ) : (
      <ItemTitleSpan>{title}</ItemTitleSpan>
    )}
    {children}
  </StyledItemBar>
);

ItemNameBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  hasSubtopics: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  lastItemClickable: PropTypes.bool,
  id: PropTypes.string,
  isSubject: PropTypes.bool,
};

export default ItemNameBar;