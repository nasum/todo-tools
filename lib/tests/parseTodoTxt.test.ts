import { ToDoTxt } from "../src/index";

test("return ToDoTxt object", () => {
  const todo = ToDoTxt.parseToDoTxt(
    "(A) 2020-06-16 write code everyday -coding @pc"
  );
  expect(todo).toBeInstanceOf(ToDoTxt);
});

describe("complete flag", () => {
  test("return not completed", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "(A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.isCompleted).toBeFalsy();
  });

  test("return completed", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "x (A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.isCompleted).toBeTruthy();
  });
});

describe("priority", () => {
  test("return A", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "(A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.priority).toEqual("A");
  });

  test("return none", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.priority).toEqual("");
  });
});
