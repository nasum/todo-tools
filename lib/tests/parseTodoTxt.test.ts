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

  test("return null", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.priority).toEqual(null);
  });
});

describe("completion and creation", () => {
  test("completion is 2020-06-24 and creation is 2020-06-16", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "x (A) 2020-06-24 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.completionDate).toEqual(new Date("2020-06-24"));
    expect(todo.creationDate).toEqual(new Date("2020-06-16"));
  });
  test("completion is null and creation is 2020-06-16", () => {
    const todo = ToDoTxt.parseToDoTxt(
      "2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.completionDate).toEqual(null);
    expect(todo.creationDate).toEqual(new Date("2020-06-16"));
  });
  test("completion is null and creation is null", () => {
    const todo = ToDoTxt.parseToDoTxt("write code everyday -coding @pc");
    expect(todo.completionDate).toEqual(null);
    expect(todo.creationDate).toEqual(null);
  });
});

describe("description", () => {});
