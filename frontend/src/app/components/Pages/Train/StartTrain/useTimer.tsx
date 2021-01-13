//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { useEffect, useRef, useState } from "react";
import Timer from "tiny-timer";

export const useTimer = () => {
  const timerRef = useRef(new Timer());

  const [timer, setTimer] = useState(() => timerRef.current);

  useEffect(() => {
    setTimer(timerRef.current);
  }, [timerRef]);

  return [timer];
};
