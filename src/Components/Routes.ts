import { Ruty, RutyConfig } from "ruty";

export function buildRoutes(config: RutyConfig = {}) {
  const { route } = Ruty.configure(config);

  const ROUTE_HOME = route("home").build();

  return {
    ROUTE_HOME,
  };
}

export const {
  ROUTE_HOME,
} = buildRoutes({ prefix: "/" });
