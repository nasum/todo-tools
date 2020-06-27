import { ToDoText } from "../src/index";

test("return ToDoTxt object", () => {
  const todo = ToDoText.parseToDoTxt(
    "(A) 2020-06-16 write code everyday -coding @pc"
  );
  expect(todo).toBeInstanceOf(ToDoText);
});
