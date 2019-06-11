/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import Downshift from 'downshift';
import { RadioButtonGroup, SubjectMaterialBadge } from '@ndla/ui';
import {
  DropdownMenu,
  DropdownInput,
  FieldHeader,
  FormPills,
} from '@ndla/forms';
import { Spinner } from '@ndla/editor';
import { Search } from '@ndla/icons/common';
import { mockTypeahead } from '../../dummydata';

const fetchData = lowerCaseValue => {
  return new Promise(resolve => {
    setTimeout(() => {
      const returnData = mockTypeahead.filter(
        mock => mock.title.toLowerCase().indexOf(lowerCaseValue) !== -1,
      );
      resolve(returnData);
    }, 500);
  });
};

class MultiSelectDropdownExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedData: [],
      data: [],
      useLayout: '1',
      useTags: '1',
      keepOpen: '1',
      isOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  async onSearch(e) {
    const {
      target: { value },
    } = e;
    if (value === '') {
      this.setState({
        data: [],
        loading: false,
        value,
        isOpen: false,
      });
    } else {
      this.setState({
        loading: true,
        isOpen: true,
        value,
      });
      const lowerCaseValue = value.toLowerCase();
      const data = await fetchData(lowerCaseValue);
      this.setState({
        data,
        loading: false,
      });
    }
  }

  onChange(selected) {
    this.setState(prevState => ({
      addedData: [...prevState.addedData, selected.title],
      value: '',
    }));
  }

  handleStateChange(changes) {
    const { isOpen, type } = changes;

    if (type === Downshift.stateChangeTypes.mouseUp) {
      this.setState({ isOpen });
    }

    if (type === Downshift.stateChangeTypes.keyDownEnter) {
      this.setState({ value: '' });
    }
  }

  removeItem(item) {
    console.log(item);
    this.setState(prevState => ({
      addedData: prevState.addedData.filter(it => it !== item),
    }));
  }

  render() {
    const {
      addedData,
      data,
      loading,
      useLayout,
      useTags,
      keepOpen,
      isOpen,
      value,
    } = this.state;

    const dataFormatted = data.map(item => ({
      title: item.title,
      description: useLayout !== '4' && item.description,
      image:
        useLayout === '1'
          ? item.image
          : useLayout === '2' && <SubjectMaterialBadge background />,
      alt: item.alt,
    }));

    const inputProps = {
      value,
      onChange: this.onSearch,
      placeholder: 'Type a name',
    };

    return (
      <>
        <RadioButtonGroup
          label="Design:"
          selected={useLayout}
          uniqeIds
          options={[
            { title: 'Med bilde', value: '1' },
            { title: 'Med ikon', value: '2' },
            { title: 'Kun tekst', value: '3' },
            { title: 'Kun tittel', value: '4' },
          ]}
          onChange={useLayout => {
            this.setState({
              useLayout,
            });
          }}
        />
        <RadioButtonGroup
          label="Tags plassering:"
          selected={useTags}
          uniqeIds
          options={[
            { title: 'Tags i input', value: '1' },
            { title: 'Tags utenfor input', value: '2' },
          ]}
          onChange={useTags => {
            this.setState({
              useTags,
            });
          }}
        />
        <RadioButtonGroup
          label="Oppførsel:"
          selected={keepOpen}
          uniqeIds
          options={[
            { title: 'Lukk når lagt til', value: '1' },
            { title: 'Behold åpen etter valg', value: '2' },
          ]}
          onChange={keepOpen => {
            this.setState({
              keepOpen,
            });
          }}
        />
        {useTags !== '1' && (
          <FormPills
            onClick={id => {
              this.setState(prevState => ({
                addedData: prevState.addedData.filter(
                  addedItemId => addedItemId !== id,
                ),
              }));
            }}
            labels={addedData}
          />
        )}
        <FieldHeader title="Countries" subTitle="in Europe" />
        <Downshift
          onChange={this.onChange}
          itemToString={item => item.title || ''}
          onStateChange={this.handleStateChange}
          isOpen={isOpen}>
          {({ getInputProps, getRootProps, getMenuProps, getItemProps }) => {
            return (
              <div>
                <DropdownInput
                  multiSelect={useTags === '1'}
                  {...getInputProps(inputProps)}
                  data-testid={'dropdownInput'}
                  iconRight={
                    loading ? <Spinner size="normal" margin="0" /> : <Search />
                  }
                  values={useTags === '1' && addedData}
                  removeItem={this.removeItem}
                />
                <DropdownMenu
                  getMenuProps={getMenuProps}
                  getItemProps={getItemProps}
                  isOpen={isOpen}
                  multiSelect
                  selectedItems={addedData}
                  items={dataFormatted}
                />
              </div>
            );
          }}
        </Downshift>
      </>
    );
  }
}

export default MultiSelectDropdownExample;