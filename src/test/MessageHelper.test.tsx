import { getMessagesByTag } from "../components/helpers/MessageHelper";

test("returns only inbx item amount that have 'travel' tags", () => {
  const array = getMessagesByTag(2);
  expect(array).toHaveLength(4);
});

test("returns only inbx item amount that have 'work' tags", () => {
  const array = getMessagesByTag(3);
  expect(array).toHaveLength(5);
});

test("returns only inbx item amount that have 'inbox' tags", () => {
  const array = getMessagesByTag(1);
  expect(array).toHaveLength(10);
});
