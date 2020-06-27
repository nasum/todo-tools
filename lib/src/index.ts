import { range } from "./util";

const alpabets = range("A", "Z");

type AtoZ = typeof alpabets[number];

export class ToDoTxt {
  rawText: string;
  isCompleted: boolean;
  priority: AtoZ | null;
  completionDate: Date | null;
  creationDate: Date | null;

  private constructor(
    rawText: string,
    isCompleted: boolean,
    priority: AtoZ | null,
    completionDate: Date | null,
    creationDate: Date | null
  ) {
    this.rawText = rawText;
    this.isCompleted = isCompleted;
    this.priority = priority;
    this.completionDate = completionDate;
    this.creationDate = creationDate;
  }

  static parseToDoTxt(todoText: string): ToDoTxt {
    const completedPattern = new RegExp("^x ");
    const datePattern = new RegExp(
      "([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9])",
      "g"
    );
    const priorityPattern = new RegExp("(([A-Z]))");

    const completedResult = completedPattern.exec(todoText);
    const priorityResult = priorityPattern.exec(todoText);

    const isCompleted = completedResult !== null ? !!completedResult[0] : false;
    const priority = priorityResult !== null ? priorityResult[0] : null;

    const dateArray = todoText.match(datePattern);

    let completionDate = null;
    let creationDate = null;

    if (dateArray !== null && dateArray.length === 2) {
      completionDate = new Date(dateArray[0]);
      creationDate = new Date(dateArray[1]);
    } else if (dateArray !== null && dateArray.length === 1) {
      creationDate = new Date(dateArray[0]);
    }

    return new ToDoTxt(
      todoText,
      isCompleted,
      priority,
      completionDate,
      creationDate
    );
  }
}
