//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { Ruty, RutyConfig } from "ruty";

export function buildRoutes(config: RutyConfig = {}) {
  const { route } = Ruty.configure(config);

  const ROUTE_HOME = route("home").build();
  const ROUTE_SEARCH = route("search").build();
  const ROUTE_PROFILE = route("profile").build();
  const ROUTE_SETTINGS = route("settings").build();
  const ROUTE_TRAIN_NEW = route("trains/new").build();
  const ROUTE_TRAIN_VIEW = route("train/:id/overview").build<{
    id: string;
  }>();

  return {
    ROUTE_HOME,
    ROUTE_SEARCH,
    ROUTE_PROFILE,
    ROUTE_SETTINGS,
    ROUTE_TRAIN_NEW,
    ROUTE_TRAIN_VIEW,
  };
}

export const {
  ROUTE_HOME,
  ROUTE_SEARCH,
  ROUTE_PROFILE,
  ROUTE_SETTINGS,
  ROUTE_TRAIN_NEW,
  ROUTE_TRAIN_VIEW,
} = buildRoutes({ prefix: "/" });
