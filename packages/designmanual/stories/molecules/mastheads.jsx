/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { injectT } from '@ndla/i18n';

import {
  Masthead,
  MastheadItem,
  LanguageSelector,
  Logo,
  TopicMenu,
  DisplayOnPageYOffset,
  SearchField,
  SearchResultSleeve,
  SafeLink,
  ToggleSearchButton,
  TopicMenuButton,
} from '@ndla/ui';
import Modal from '@ndla/modal';
import Button from '@ndla/button';

import { Cross } from '@ndla/icons/action';

import {
  topicMenu,
  contentTypeResults,
  dummyLanguageOptions,
} from '../../dummydata';
import { BreadcrumbBlock } from './breadcrumbs';

import CompetenceGoalsExample from '../organisms/CompetenceGoalsExample';

const classes = new BEMHelper('c-search-field');

export const MastheadWithLogo = ({ skipToMainContentId }) => (
  <Masthead fixed skipToMainContentId={skipToMainContentId}>
    <MastheadItem right>
      <Logo to="#" label="Nasjonal digital læringsarena" />
    </MastheadItem>
  </Masthead>
);

const searchFieldClasses = BEMHelper({
  prefix: 'c-',
  name: 'search-field',
});

class MastheadWithTopicMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      expandedTopicId: null,
      expandedSubtopicsId: [],
      filterMenuValues: ['Medieuttrykk'],
    };
    this.inputRef = React.createRef();
    this.closeAllModals = [null, null];
  }

  renderSearchField() {
    const modifiers = ['has-filter'];
    return (
      <form
        {...classes('', modifiers)}
        onSubmit={e => {
          e.preventDefault();
        }}>
        <SearchField
          inputRef={this.inputRef}
          placeholder={this.props.t('searchPage.searchFieldPlaceholder')}
          value={this.state.value}
          onChange={value => {
            this.setState({
              value,
            });
          }}
          filters={[
            {
              value: 'Value',
              title: this.props.ndlaFilm
                ? 'NDLA Film'
                : 'Medieuttrykk og mediesamfunnet',
            },
          ]}
          onFilterRemove={() => {}}
          messages={{
            searchFieldTitle: 'Søk',
          }}
          onNavigate={() => {
            try {
              this.closeAllModals[1]();
            } catch (e) {
              console.log('no search modal to close');
            }
            try {
              this.closeAllModals[0]();
            } catch (e) {
              console.log('no menu modal to close');
            }
          }}
        />
        {this.state.value.length > 2 && (
          <SearchResultSleeve
            result={contentTypeResults}
            searchString={this.state.value}
            allResultUrl={'#'}
            resourceToLinkProps={resource => ({ to: resource.path })}
          />
        )}
      </form>
    );
  }

  renderSearchButtonView = hideOnNarrowScreen => {
    if (this.props.hideSearchButton) {
      return null;
    }
    return (
      <Modal
        backgroundColor="grey"
        animation="slide-down"
        animationDuration={200}
        size="custom"
        onClose={() => {
          this.setState({ value: '' });
          this.closeAllModals[1] = null;
        }}
        className="c-search-field__overlay-content"
        activateButton={
          <ToggleSearchButton
            hideOnNarrowScreen={hideOnNarrowScreen}
            ndlaFilm={this.props.ndlaFilm}>
            Søk
          </ToggleSearchButton>
        }>
        {onClose => {
          this.closeAllModals[1] = onClose;
          return (
            <>
              <div
                className={`c-search-field__overlay-top${this
                  .closeAllModals[0] && ` with-backdrop`}`}
              />
              <div {...searchFieldClasses('header')}>
                <div {...searchFieldClasses('header-container')}>
                  {this.renderSearchField()}
                  <Button stripped onClick={onClose}>
                    <Cross className="c-icon--medium" />
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Modal>
    );
  };

  render() {
    return (
      <Masthead
        fixed
        skipToMainContentId={this.props.skipToMainContentId}
        ndlaFilm={this.props.ndlaFilm}
        hideOnNarrowScreen={this.props.hideOnNarrowScreen}
        infoContent={this.props.beta && this.props.betaInfoContent}>
        <MastheadItem left>
          <Modal
            size="fullscreen"
            activateButton={
              <TopicMenuButton ndlaFilm={this.props.ndlaFilm}>
                Meny
              </TopicMenuButton>
            }
            animation="subtle"
            animationDuration={150}
            backgroundColor="grey"
            noBackdrop
            onClose={() => {
              this.setState({
                expandedTopicId: null,
                expandedSubtopicsId: [],
              });
              this.closeAllModals[0] = null;
            }}>
            {onClose => {
              this.closeAllModals[0] = onClose;
              return (
                <TopicMenu
                  close={onClose}
                  isBeta={this.props.beta}
                  searchFieldComponent={this.renderSearchButtonView()}
                  subjectTitle="Mediefag"
                  toFrontpage={() =>
                    '?selectedKind=Emnesider&selectedStory=1.%20Fagoversikt&full=0&addons=0&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel'
                  }
                  toSubject={() => '#'}
                  toTopic={() => '#'}
                  topics={topicMenu}
                  filterOptions={[
                    {
                      title: 'Medieuttrykk',
                      value: 'Medieuttrykk',
                    },
                    {
                      title: 'Mediesamfunnet',
                      value: 'Mediesamfunnet',
                    },
                  ]}
                  filterValues={this.state.filterMenuValues}
                  competenceGoals={
                    <CompetenceGoalsExample menu subjectName="Mediefag" /> // Not required.
                  }
                  onFilterClick={values => {
                    this.setState({
                      filterMenuValues: values,
                    });
                  }}
                  resourceToLinkProps={resource => ({ to: resource.path })}
                  expandedTopicId={this.state.expandedTopicId}
                  expandedSubtopicsId={this.state.expandedSubtopicsId}
                  onNavigate={(expandedTopicId, subtopicId, currentIndex) => {
                    let { expandedSubtopicsId } = this.state;
                    if (expandedSubtopicsId.length > currentIndex) {
                      expandedSubtopicsId = expandedSubtopicsId.slice(
                        0,
                        currentIndex,
                      );
                    }
                    if (subtopicId) {
                      expandedSubtopicsId.push(subtopicId);
                    } else {
                      expandedSubtopicsId.pop();
                    }
                    this.setState({
                      expandedTopicId,
                      expandedSubtopicsId,
                    });
                  }}
                  {...this.props.topicMenuProps}
                />
              );
            }}
          </Modal>
          <DisplayOnPageYOffset yOffsetMin={150}>
            <BreadcrumbBlock />
          </DisplayOnPageYOffset>
        </MastheadItem>
        <MastheadItem right>
          <DisplayOnPageYOffset yOffsetMin={0} yOffsetMax={150}>
            <LanguageSelector
              inverted={this.props.ndlaFilm}
              options={dummyLanguageOptions}
              currentLanguage="nb"
            />
          </DisplayOnPageYOffset>
          {this.renderSearchButtonView(true)}
          <Logo
            to="?selectedKind=Emnesider&selectedStory=1.%20Fagoversikt&full=0&addons=0&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel"
            label="Nasjonal digital læringsarena"
            isBeta={this.props.beta}
            cssModifier={this.props.ndlaFilm && 'white'}
          />
        </MastheadItem>
      </Masthead>
    );
  }
}

MastheadWithTopicMenu.propTypes = {
  searchFieldExpanded: PropTypes.bool,
  hideOnNarrowScreen: PropTypes.bool,
  hideSearchButton: PropTypes.bool,
  beta: PropTypes.bool,
  betaInfoContent: PropTypes.node,
  topicMenuProps: PropTypes.object,
  t: PropTypes.func.isRequired,
  ndlaFilm: PropTypes.bool,
  skipToMainContentId: PropTypes.string,
};

MastheadWithTopicMenu.defaultProps = {
  searchFieldExpanded: false,
  betaInfoContent: (
    <>
      <span>Du tester nå de nye nettsidene.</span>{' '}
      <SafeLink to="#">Les mer om nye NDLA.no</SafeLink>
    </>
  ),
};

export default injectT(MastheadWithTopicMenu);
