/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import moment from 'moment';

const classes = new BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const AuthorsList = ({ authors }) => <span {...classes('authors')}>{authors.map(author => author.name).join(', ')}</span>;

AuthorsList.propTypes = {
  authors: PropTypes.array,
};

const LastUpdated = ({ date }) => <span {...classes('date')}>Sist oppdatert: {moment(date).format('DD/MM/YYYY')}</span>;

LastUpdated.propTypes = {
  date: PropTypes.string,
};

const ArticleByline = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <section {...classes('byline')}>
      {article.copyright.authors && <AuthorsList authors={article.copyright.authors} />} –
      <LastUpdated date={article.updated} />
    </section>
  );
};

ArticleByline.propTypes = {
  article: PropTypes.object,
};

export default ArticleByline;
