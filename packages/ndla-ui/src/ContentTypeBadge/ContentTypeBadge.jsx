import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import {
  SubjectMaterial,
  TasksAndActivities,
  AssessmentResource,
  Subject,
  ExternalLearningResource,
  SharedResource,
} from 'ndla-icons/contentType';

import * as contentTypes from '../model/ContentType';
import { ContentTypeShape } from '../shapes';

import { LearningPathBadge } from './LearningPathBadge';

const classes = new BEMHelper({
  name: 'content-type-badge',
  prefix: 'c-',
});

export const ContentTypeBadge = ({ type, background, size }) => {
  const modifiers = [type, size];

  if (background) {
    modifiers.push('background');
  }

  let icon = null;
  switch (type) {
    case contentTypes.SUBJECT_MATERIAL:
      icon = <SubjectMaterial />;
      break;
    case contentTypes.TASKS_AND_ACTIVITIES:
      icon = <TasksAndActivities />;
      break;
    case contentTypes.ASSESSMENT_RESOURCES:
      icon = <AssessmentResource />;
      break;
    case contentTypes.SUBJECT:
      icon = <Subject />;
      break;
    case contentTypes.EXTERNAL_LEARNING_RESOURCES:
      icon = <ExternalLearningResource />;
      break;
    case contentTypes.SOURCE_MATERIAL:
      icon = <SharedResource />;
      break;
    case contentTypes.LEARNING_PATH:
      return <LearningPathBadge />;
    default:
      break;
  }
  return <div {...classes('', modifiers)}>{icon}</div>;
};

ContentTypeBadge.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  type: ContentTypeShape,
  background: PropTypes.bool,
};

ContentTypeBadge.defaultProps = {
  size: 'small',
};

export const SubjectMaterialBadge = props => (
  <ContentTypeBadge {...props} type={contentTypes.SUBJECT_MATERIAL} />
);
export const TasksAndActivitiesBadge = props => (
  <ContentTypeBadge {...props} type={contentTypes.TASKS_AND_ACTIVITIES} />
);
export const AssessmentResourcesBadge = props => (
  <ContentTypeBadge {...props} type={contentTypes.ASSESSMENT_RESOURCES} />
);
export const SubjectBadge = props => (
  <ContentTypeBadge {...props} type={contentTypes.SUBJECT} />
);
export const ExternalLearningResourcesBadge = props => (
  <ContentTypeBadge
    {...props}
    type={contentTypes.EXTERNAL_LEARNING_RESOURCES}
  />
);
export const SourceMaterialBadge = props => (
  <ContentTypeBadge {...props} type={contentTypes.SOURCE_MATERIAL} />
);
