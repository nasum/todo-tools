import { range } from "./util";

const alpabets = range("A", "Z");

type AtoZ = typeof alpabets[number];

export class ToDoTxt {
  rawText: string;
  isCompleted: boolean;
  priority: AtoZ;

  private constructor(rawText: string, isCompleted: boolean, priority: AtoZ) {
    this.rawText = rawText;
    this.isCompleted = isCompleted;
    this.priority = priority;
  }

  static parseToDoTxt(todoText: string): ToDoTxt {
    const completedPattern = /^x /;
    const datePattern = /([1-2][0-9]{3}\-[0-1][0-9]\-[0-3][0-9])/;
    const priorityPattern = /\(([A-Z])\)/;

    const completedResult = completedPattern.exec(todoText);
    const priorityResult = priorityPattern.exec(todoText);

    const isCompleted = completedResult !== null ? !!completedResult[0] : false;
    const priority = priorityResult !== null ? priorityResult[0][1] : "";
    return new ToDoTxt(todoText, isCompleted, priority);
  }
}
