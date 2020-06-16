import { parseToDoTxt, ToDoTxt } from "../src/index";

test("return ToDoTxt object", () => {
  expect(parseToDoTxt("(A) 2020-06-16")).toBeInstanceOf(ToDoTxt);
});
