//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISettingsState } from "../../types/Settings";
import {
  AppThemeSupportedModes,
  getParsedTheme,
} from "../../../Services/AppTheme";

export const useAppTheme = () => {
  const [theme, setThemeType] = useState<AppThemeSupportedModes>("light");
  const stateTheme = useSelector(
    (state) => ((state as any).settings as ISettingsState).theme,
  );

  useEffect(() => {
    setThemeType(getParsedTheme(stateTheme) || "light");
  }, [stateTheme]);

  return [theme];
};
