//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { renderTemplate } from "../renderTemplate";

test("renderTemplate", () => {
  expect(
    renderTemplate<{ duration: number }>("{{duration/2*3}} seconds")({
      duration: 10,
    }),
  ).toBe("15 seconds");
});
