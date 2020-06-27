import { ToDoText } from "../src/index";

describe("complete flag", () => {
  test("return not completed", () => {
    const todo = ToDoText.parseToDoTxt(
      "(A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.isCompleted).toBeFalsy();
  });

  test("return completed", () => {
    const todo = ToDoText.parseToDoTxt(
      "x (A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.isCompleted).toBeTruthy();
  });
});

describe("priority", () => {
  test("return A", () => {
    const todo = ToDoText.parseToDoTxt(
      "(A) 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.priority).toEqual("A");
  });

  test("return null", () => {
    const todo = ToDoText.parseToDoTxt(
      "2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.priority).toEqual(null);
  });
});

describe("completion and creation", () => {
  test("completion is 2020-06-24 and creation is 2020-06-16", () => {
    const todo = ToDoText.parseToDoTxt(
      "x (A) 2020-06-24 2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.completionDate).toEqual(new Date("2020-06-24"));
    expect(todo.creationDate).toEqual(new Date("2020-06-16"));
  });
  test("completion is null and creation is 2020-06-16", () => {
    const todo = ToDoText.parseToDoTxt(
      "2020-06-16 write code everyday -coding @pc"
    );
    expect(todo.completionDate).toEqual(null);
    expect(todo.creationDate).toEqual(new Date("2020-06-16"));
  });
  test("completion is null and creation is null", () => {
    const todo = ToDoText.parseToDoTxt("write code everyday -coding @pc");
    expect(todo.completionDate).toEqual(null);
    expect(todo.creationDate).toEqual(null);
  });
});

describe("description", () => {
  test("return description", () => {
    const todo = ToDoText.parseToDoTxt(
      "x (A) 2020-06-24 2020-06-16 write code everyday +coding @pc"
    );
    expect(todo.description.body).toEqual("write code everyday +coding @pc");
  });

  describe("getProjects", () => {
    test("return projects", () => {
      const todo = ToDoText.parseToDoTxt(
        "x (A) 2020-06-24 2020-06-16 write code everyday +coding @pc"
      );
      expect(todo.description.getProjects()).toEqual(["coding"]);
    });
  });

  describe("getContexts", () => {
    test("return contexts", () => {
      const todo = ToDoText.parseToDoTxt(
        "x (A) 2020-06-24 2020-06-16 write code everyday +coding @pc"
      );
      expect(todo.description.getContexts()).toEqual(["pc"]);
    });
  });
});
