/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import { storiesOf } from '@kadira/storybook';
import NDLAEditor, { RichTextEditor, withStateHandler } from 'ndla-editor';
import { convertFromRaw, EditorState } from 'draft-js';
import ArticleEditor from './editor/ArticleEditor';
import { Center } from './helpers';
import mockEditorState from '../dummydata/mockEditorState';

const StatefulRichTextEditor = withStateHandler(RichTextEditor);
const StatefulNDLAEditor = withStateHandler(NDLAEditor);

storiesOf('Lekegrind', module)
  .add('NDLA editor uten innhold', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">NDLA Editor</h1>
      </section>
      <StatefulNDLAEditor />
    </Center>
  ))
  .add('NDLA editor med eksempel innhold', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">NDLA Editor</h1>
      </section>
      <StatefulNDLAEditor value={EditorState.createWithContent(convertFromRaw(mockEditorState))} />
    </Center>
  ))
  .add('NDLA editor med innhold', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">NDLA Editor</h1>
      </section>
      <ArticleEditor articleId="86" />
    </Center>
  ))
  .add('Last artikkel i NDLAEditor', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">NDLA Editor</h1>
      </section>
      <ArticleEditor />
    </Center>
  ))
  .add('Enkel editor', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">Rik tekst Editor</h1>
      </section>
      <StatefulRichTextEditor className="alt" />
    </Center>
  ))
;
