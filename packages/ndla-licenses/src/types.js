/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type License = {
  short: string,
  title: string,
  userFriendlyTitle: string,
  rights: Array<string>,
  description: string,
};

export type LicenseRight = {
  short: string,
  title: string,
  userFriendlyTitle: string,
  description: string,
};
