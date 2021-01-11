//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { lazy } from "react";

const Promise_PageHome = () => import("./app/Components/Pages/Home/Home");
const Promise_PageSearch = () => import("./app/Components/Pages/Search/Search");
const Promise_PageProfile = () =>
  import("./app/Components/Pages/Profile/Profile");
const Promise_PageSettings = () =>
  import("./app/Components/Pages/Settings/Settings");
const Promise_PageNewTrain = () =>
  import("./Components/Pages/Train/NewTrain/NewTrain");


export const PageHome = lazy(Promise_PageHome);
export const PageSearch = lazy(Promise_PageSearch);
export const PageProfile = lazy(Promise_PageProfile);
export const PageSettings = lazy(Promise_PageSettings);
export const PageNewTrain = lazy(Promise_PageNewTrain);
