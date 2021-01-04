import { Ruty, RutyConfig } from "ruty";

export function buildRoutes(config: RutyConfig = {}) {
  const { route } = Ruty.configure(config);

  const ROUTE_HOME = route("home").build();
  const ROUTE_PROFILE = route("profile").build();


  return {
    ROUTE_HOME,
    ROUTE_PROFILE,
  };
}

export const {
  ROUTE_HOME,
  ROUTE_PROFILE,
} = buildRoutes({ prefix: "/" });
