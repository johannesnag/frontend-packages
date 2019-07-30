/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useReducer, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectT } from '@ndla/i18n';
import {
  LearningPathWrapper,
  LearningPathMenu,
  LearningPathContent,
  LearningPathInformation,
  LearningPathLastStepNavigation,
  LearningPathSticky,
  LearningPathStickySibling,
} from '@ndla/ui';
import { getCookie, setCookie } from '@ndla/util';
import { animations, shadows } from '@ndla/core';
import Button from '@ndla/button';
import { Cross } from '@ndla/icons/action';

import Resources from '../molecules/resources';
import ArticleLoader from '../article/ArticleLoader';
import Breadcrumb from '../molecules/breadcrumbs';

async function fetchLearningPathArticle({ learningPathId, stepId }) {
  return await fetch(
    `https://api.ndla.no/learningpath-api/v2/learningpaths/${learningPathId}/learningsteps/${stepId}?language=nb&fallback=true`,
  ).then(data => data.json());
}

async function fetchLearningPathLearningSteps({ learningPathId }) {
  return await fetch(
    `https://api.ndla.no/learningpath-api/v2/learningpaths/${learningPathId}?language=nb&fallback=true`,
  ).then(data => data.json());
}

async function fetchTaxonomiResourceId({ resourceId }) {
  return await fetch(
    `https://api.ndla.no/taxonomy/v1/resources/urn:${resourceId}`,
  ).then(data => data.json());
}

const LEARNING_PATHS_COOKIES_KEY = 'LEARNING_PATHS_COOKIES_KEY';
const UPDATE_SEQUENCE_NUMBER = 'UPDATE_SEQUENCE_NUMBER';
const UPDATE_LEARNING_PATH_STEP = 'UPDATE_LEARNING_PATH_STEP';
const UPDATE_LEARNING_PATH_DATA = 'UPDATE_LEARNING_PATH_DATA';
const DEMO_LEARNING_PATH_ID = 434;

const StyledInfoHelper = styled.aside`
  display: block;
  width: 450px;
  left: calc(50% - 225px);
  top: 78px;
  background: #fff;
  z-index: 9999;
  border-radius: 4px;
  padding: 26px;
  position: fixed;
  opacity: 0;
  ${animations.fadeInBottom('1000ms')};
  animation-fill-mode: forwards;
  animation-delay: 1000ms;
  box-shadow: ${shadows.levitate1};
`;

const updateLearningStepNumber = (
  { learningStepsData, currentLearningStepNumber },
  code,
) => {
  let direction;
  if (code === 'ArrowLeft') {
    direction = -1;
  } else if (code === 'ArrowRight') {
    direction = 1;
  } else {
    return currentLearningStepNumber || 0;
  }
  if (
    currentLearningStepNumber + direction < 0 ||
    currentLearningStepNumber + direction >=
      learningStepsData.learningsteps.length
  ) {
    return currentLearningStepNumber;
  }

  return currentLearningStepNumber + direction;
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SEQUENCE_NUMBER:
      return {
        ...state,
        currentLearningStepNumber: updateLearningStepNumber(state, action.code),
      };
    case UPDATE_LEARNING_PATH_STEP:
      return {
        ...state,
        currentLearningStep: action.data,
      };
    case UPDATE_LEARNING_PATH_DATA:
      return {
        ...state,
        learningStepsData: action.data,
      };
    default:
      throw new Error();
  }
};

const toLearningPathUrl = (id, locale) => {
  return '';
};
const LearningPathExample = ({ t }) => {
  const [currentState, dispatch] = useReducer(dataReducer, {});
  const [hideHelp, toggleHelp] = useState(true);
  const [learningPathId, updateLearningPathId] = useState(
    DEMO_LEARNING_PATH_ID,
  );
  const [tempLearningPathId, updateTempLearningPathId] = useState(
    DEMO_LEARNING_PATH_ID,
  );
  const {
    currentLearningStepNumber,
    currentLearningStep,
    learningStepsData,
  } = currentState;

  async function fetchLearningStep(params) {
    const data = await fetchLearningPathArticle(params);
    const { embedUrl } = data;
    if (
      embedUrl &&
      embedUrl.url.indexOf(':') !== embedUrl.url.lastIndexOf(':')
    ) {
      // Fetch article via /taxonomy/v1/resources/urn:resource:1:117811
      const resourceId = embedUrl.url.substr(embedUrl.url.lastIndexOf('/') + 1);
      const dataResourceArticleId = await fetchTaxonomiResourceId({
        resourceId,
      });
      data.embedUrl.url = dataResourceArticleId.contentUri.substr(
        dataResourceArticleId.contentUri.lastIndexOf('/') + 1,
      );
    }
    dispatch({ type: UPDATE_LEARNING_PATH_STEP, data });
  }

  async function fetchLearningSteps(params) {
    const data = await fetchLearningPathLearningSteps(params);
    dispatch({ type: UPDATE_LEARNING_PATH_DATA, data });
  }

  useEffect(() => {
    const onKeyUpEvent = e => {
      dispatch({ type: UPDATE_SEQUENCE_NUMBER, code: e.code });
    };
    window.addEventListener('keyup', onKeyUpEvent);
    fetchLearningSteps({ learningPathId });
    return () => {
      window.removeEventListener('keyup', onKeyUpEvent);
    };
  }, []);

  useEffect(() => {
    if (learningStepsData && currentLearningStepNumber !== undefined) {
      dispatch({ type: UPDATE_LEARNING_PATH_STEP });
      fetchLearningStep({
        stepId: learningsteps[currentLearningStepNumber].id,
        learningPathId,
      });
      // Set cookies
      const cookieKey = `${LEARNING_PATHS_COOKIES_KEY}_${learningPathId}`;
      const currentCookie = getCookie(cookieKey, document.cookie);
      console.log('currentCookie', currentCookie);
      let updatedCookie = currentCookie ? JSON.parse(currentCookie) : {};
      updatedCookie[learningsteps[currentLearningStepNumber].id] = true;
      setCookie(cookieKey, JSON.stringify(updatedCookie));
    }
  }, [currentLearningStepNumber]);

  useEffect(() => {
    if (learningStepsData) {
      dispatch({ type: UPDATE_SEQUENCE_NUMBER });
    }
  }, [learningStepsData]);

  useEffect(() => {
    dispatch({ type: UPDATE_LEARNING_PATH_DATA });
    fetchLearningSteps({ learningPathId });
  }, [learningPathId]);

  if (!learningStepsData || currentLearningStepNumber === undefined) {
    return null;
  }

  const { duration, lastUpdated, copyright, learningsteps } = learningStepsData;
  const stepId = learningsteps[currentLearningStepNumber].id; // should be fetched from url
  const lastUpdatedDate = new Date(lastUpdated);
  const lastUpdatedString = `${lastUpdatedDate.getDate()}.${
    lastUpdatedDate.getMonth() < 10 ? '0' : ''
  }${lastUpdatedDate.getMonth()}.${lastUpdatedDate.getFullYear()}`;

  let articleId =
    currentLearningStep && currentLearningStep.embedUrl
      ? currentLearningStep.embedUrl.url.substr(
          currentLearningStep.embedUrl.url.lastIndexOf('/') + 1,
        )
      : null;

  if (articleId && articleId.indexOf(':') !== -1) {
    articleId = articleId.substr(articleId.lastIndexOf(':') + 1);
  }
  const mappedLearningsteps = learningsteps.map(step => ({
    ...step,
    title: step.title.title,
    description: step.description ? step.description.description : '',
  }));
  const cookieKey = `${LEARNING_PATHS_COOKIES_KEY}_${DEMO_LEARNING_PATH_ID}`;
  const fetchedCookies = getCookie(cookieKey, document.cookie);
  const useCookies = fetchedCookies ? JSON.parse(fetchedCookies) : {};
  const isLastStep = currentLearningStepNumber === learningsteps.length - 1;

  return (
    <>
      <LearningPathWrapper>
        <div className="c-hero__content">
          <section>
            <Breadcrumb />
          </section>
        </div>
        <LearningPathContent>
          <LearningPathMenu
            learningsteps={mappedLearningsteps}
            duration={duration}
            lastUpdated={lastUpdatedString}
            copyright={copyright}
            stepId={stepId}
            learningPathId={3}
            toLearningPathUrl={toLearningPathUrl}
            currentIndex={currentLearningStepNumber}
            name={learningStepsData.title.title}
            cookies={useCookies}
            learningPathURL="https://stier.ndla.no"
          />
          {currentLearningStep && (
            <div>
              {currentLearningStep.showTitle && (
                <LearningPathInformation
                  title={currentLearningStep.title.title}
                  description={
                    currentLearningStep.description &&
                    currentLearningStep.description.description
                  }
                  license={currentLearningStep.license}
                />
              )}
              {articleId && (
                <ArticleLoader hideForm hideResources articleId={articleId} />
              )}
              {isLastStep && (
                <LearningPathLastStepNavigation
                  learningPathName={learningStepsData.title.title}
                  subject={{ url: '#', name: 'Samfunnsfag' }}
                  topic={{ url: '#', name: 'Eksempel på fag' }}>
                  <Resources key="resources" />
                </LearningPathLastStepNavigation>
              )}
            </div>
          )}
        </LearningPathContent>
        <LearningPathSticky>
          {currentLearningStepNumber > 0 ? (
            <LearningPathStickySibling
              arrow="left"
              toLearningPathUrl={toLearningPathUrl}
              pathId={3}
              stepId={learningsteps[currentLearningStepNumber - 1].id}
              label={t('learningPath.previousArrow')}
              title={learningsteps[currentLearningStepNumber - 1].title.title}
            />
          ) : (
            <div />
          )}
          {currentLearningStepNumber < learningsteps.length - 1 && (
            <LearningPathStickySibling
              arrow="right"
              toLearningPathUrl={toLearningPathUrl}
              pathId={3}
              stepId={learningsteps[currentLearningStepNumber + 1].id}
              label={t('learningPath.nextArrow')}
              title={learningsteps[currentLearningStepNumber + 1].title.title}
            />
          )}
        </LearningPathSticky>
      </LearningPathWrapper>
      {hideHelp && (
        <StyledInfoHelper>
          <Button
            link
            css={css`
              float: right;
            `}
            onClick={() => toggleHelp(false)}>
            <Cross /> Lukk
          </Button>
          <p>Demo: Bruk pil-tastene for å navigere</p>
          <div>
            Læringssti ID:
            <input
              type="text"
              name="article"
              placeholder="enter learningpath id to load"
              value={tempLearningPathId}
              css={css`
                margin: 0 13px;
                width: 100px;
                height: 39px;
              `}
              onChange={e => updateTempLearningPathId(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  updateLearningPathId(e.target.value);
                  e.preventDefault();
                }
              }}
            />
            <Button onClick={() => updateLearningPathId(tempLearningPathId)}>
              Hent læringssti
            </Button>
          </div>
        </StyledInfoHelper>
      )}
    </>
  );
};

export default injectT(LearningPathExample);
