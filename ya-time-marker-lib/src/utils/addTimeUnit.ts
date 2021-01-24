import ms from "ms";

export const addTimeUnit = (unit: string) => (value: string) =>
  ms(ms([value, ...(!value.match(/[a-z]$/i) ? [unit] : [])].join("")));
