import ms from "ms";

export const parseStateDuration = (duration: string | number) =>
  ms(String(duration));
