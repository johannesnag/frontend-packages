/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 * FRI OG BEGRENSET
 */

import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';
import BEMHelper from 'react-bem-helper';

const filterClasses = new BEMHelper({
  name: 'filter',
  prefix: 'c-',
});

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    return this.props.onClick;
  }

  render() {
    const { modifiers, label, filterContent } = this.props;

    return (
      <div {...filterClasses('list', modifiers)}>
        <span {...filterClasses('label')}>{label}</span>
        {filterContent
          ? filterContent.map(filterItem => (
              <div {...filterClasses('item')} key={uuid()}>
                <input
                  {...filterClasses('input')}
                  type="checkbox"
                  name="gruppe"
                  id={filterItem.title ? filterItem.title : null}
                  value={filterItem.title ? filterItem.title : null}
                  defaultChecked={filterItem.active ? 'true' : null}
                  key={filterItem.title}
                  onChange={this.props.onClick}
                />
                <label htmlFor={filterItem.title ? filterItem.title : null}>
                  <span {...filterClasses('item-checkbox')} />
                  {filterItem.title ? filterItem.title : null}
                  {/* ? createElement(filterItem.icon, { className: 'c-icon--20 u-margin-left-tiny' }) */}
                  {filterItem.icon
                    ? createElement(filterItem.icon, {
                        className: 'c-icon--20 u-margin-left-tiny',
                      })
                    : null}
                </label>
              </div>
            ))
          : null}
      </div>
    );
  }
}

// const FilterList = ({ filterContent, label, modifiers }) => (
//
// );

FilterList.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  modifiers: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  filterContent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ),
};

FilterList.defaultProps = {
  label: 'FILTER:',
  modifiers: '',
};

export default FilterList;
