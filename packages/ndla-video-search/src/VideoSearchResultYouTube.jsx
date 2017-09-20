/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ndla-ui';
import BEMHelper from 'react-bem-helper';
import PreviewVideo from './PreviewVideo';
import { YouTubeShape } from './shapes';

const classes = new BEMHelper({
  name: 'video-search',
  prefix: 'c-',
});

export default function VideoSearchResultYouTube({
  video,
  onVideoPreview,
  selectedVideo,
  onSelectVideo,
  translations,
  locale,
}) {
  const videoData = video.pagemap.videoobject[0];
  const active =
    selectedVideo &&
    selectedVideo.pagemap.videoobject[0].videoid === videoData.videoid
      ? 'active'
      : '';

  return (
    <div key={videoData.videoid} {...classes('list-item', active)}>
      <div {...classes('list-item-inner')}>
        <img
          role="presentation"
          alt="presentation"
          src={videoData.thumbnailurl}
        />
        <div {...classes('information')}>
          <h2>
            {videoData.name}
          </h2>
          <div>
            {`${translations.publishedDate}: ${new Date(
              Date.parse(videoData.datepublished),
            ).toLocaleDateString(locale)}`}
          </div>
          <div>
            {`${translations.hits}: ${videoData.interactioncount}`}
          </div>
          <div>
            {videoData.description}
          </div>
          <Button
            {...classes('button')}
            outline
            onClick={() => onVideoPreview(video)}>
            {translations.previewVideo}
          </Button>
          <Button {...classes('button')} onClick={() => onSelectVideo(video)}>
            {translations.addVideo}
          </Button>
        </div>
      </div>

      {selectedVideo &&
      selectedVideo.pagemap.videoobject[0].videoid === videoData.videoid
        ? <PreviewVideo
            video={selectedVideo}
            onVideoPreview={onVideoPreview}
            selectedType="youtube"
          />
        : ''}
    </div>
  );
}

VideoSearchResultYouTube.propTypes = {
  video: YouTubeShape.isRequired,
  onVideoPreview: PropTypes.func.isRequired,
  selectedVideo: YouTubeShape,
  onSelectVideo: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    addVideo: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
  }),
};
