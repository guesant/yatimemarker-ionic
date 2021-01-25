import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISettingsState } from "../../../../types/Settings";
import { parseDictDuration } from "./parseDictDuration";

export type IStepContext = {
  duration: { interval: number; startCountdown: number; train: number };
};

export const useStepContext = () => {
  const { duration } = useSelector(
    (state): ISettingsState => (state as any).settings,
  );

  const [stepContext, setStepContext] = useState<IStepContext>({
    duration: {
      interval: Infinity,
      startCountdown: Infinity,
      train: Infinity,
    },
  });

  useEffect(() => {
    setStepContext({
      duration: parseDictDuration(duration),
    });
  }, [duration]);

  return stepContext;
};
