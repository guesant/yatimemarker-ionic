import { addTimeUnit } from "../addTimeUnit";

test("addTimeUnit", () => {
  expect(addTimeUnit("s")("10")).toBe("10s");
  expect(addTimeUnit("s")("10s")).toBe("10s");
  expect(addTimeUnit("s")("10ms")).toBe("10ms");
  expect(addTimeUnit("s")("10 ms")).toBe("10ms");
});
