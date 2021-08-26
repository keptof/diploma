import { isTaskInList } from "../isTaskInList";

describe("isTaskInList()", () => {
  it(
    "should return the answer whether" + " there is such a title in the array",
    () => {
      const result = isTaskInList([], "test");
      expect(result).toBe(false);
    }
  );
});
