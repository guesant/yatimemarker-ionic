//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import loadable from "@loadable/component";

const BASE_PAGES_PATH = "./app/components/Pages";

export const PageHome = loadable(
  () =>
    import(
      /* webpackChunkName: "page-home" */ `${BASE_PAGES_PATH}/Home/Home.tsx`
    ),
);

export const PageSearch = loadable(
  () =>
    import(
      /* webpackChunkName: "page-search" */ `${BASE_PAGES_PATH}/Search/Search.tsx`
    ),
);

export const PageProfile = loadable(
  () =>
    import(
      /* webpackChunkName: "page-profile" */ `${BASE_PAGES_PATH}/Profile/Profile.tsx`
    ),
);

export const PageSettings = loadable(
  () =>
    import(
      /* webpackChunkName: "page-settings" */ `${BASE_PAGES_PATH}/Settings/Settings.tsx`
    ),
);

export const PageNewTrain = loadable(
  () =>
    import(
      /* webpackChunkName: "page-newtrain" */ `${BASE_PAGES_PATH}/Train/NewTrain/NewTrain.tsx`
    ),
);

export const PageViewTrain = loadable(
  () =>
    import(
      /* webpackChunkName: "page-viewtrain" */ `${BASE_PAGES_PATH}/Train/ViewTrain/ViewTrain.tsx`
    ),
);

