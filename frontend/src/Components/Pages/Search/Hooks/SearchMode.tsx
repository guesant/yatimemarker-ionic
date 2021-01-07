import { useCallback, useState } from "react";
import { getSymbolByTextMode } from "./searchModes/getSymbolByTextMode";
import { isMode } from "./searchModes/isMode";
import {
  ISymbolSearchModes,
  ITextSearchModes,
  SEARCH_MODE_SUGGESTIONS,
} from "./searchModes/SEARCH_MODES";

export type IChangeSeachMode = (mode: ITextSearchModes) => void;

export const useSearchMode = () => {
  const [searchMode, setSearchMode] = useState<ISymbolSearchModes>(
    SEARCH_MODE_SUGGESTIONS
  );

  const internal__isMode = useCallback(
    (mode: ITextSearchModes) => isMode(searchMode, mode),
    [searchMode]
  );

  const changeSearchMode = (mode: ITextSearchModes) => {
    const targetMode = getSymbolByTextMode(mode);
    if (targetMode !== null && targetMode !== searchMode) {
      setSearchMode(targetMode);
    }
  };

  return {
    searchMode,
    setSearchMode,
    changeSearchMode,
    isMode: internal__isMode,
  };
};
