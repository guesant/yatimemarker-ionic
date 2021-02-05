//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import produce from "immer";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../store/settings/actions/setSettings";
import { getSettings } from "../../store/settings/selectors/getSettings";

export const useAppThemeUpdater = () => {
  const dispatch = useDispatch();
  const settings = useSelector(getSettings);
  const { theme } = settings;

  const setColorTheme = useCallback(
    (theme: string) => {
      dispatch(
        setSettings(
          produce(settings, (draft: any) => {
            draft.theme = theme;
          }),
        ),
      );
    },
    [dispatch, settings],
  );

  return [theme, setColorTheme] as const;
};
