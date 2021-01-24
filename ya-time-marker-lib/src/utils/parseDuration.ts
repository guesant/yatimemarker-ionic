import ms from "ms";
import { addTimeUnit } from "./addTimeUnit";

export const parseDuration = (defaultValue: string) => (value: any) => {
  const duration = String(value).trim();
  if (isNaN(ms(duration))) return defaultValue;
  return addTimeUnit("s")(duration);
};
