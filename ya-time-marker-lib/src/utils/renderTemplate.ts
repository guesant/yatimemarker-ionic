//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import nunjucks from "nunjucks";

export const renderTemplate = <CTX extends object = any>(template: string) => (
  context: CTX,
) => nunjucks.renderString(template, context);
