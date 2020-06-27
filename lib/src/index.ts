import { range } from "./util";

const alpabets = range("A", "Z");

type AtoZ = typeof alpabets[number];

type CompletionAndCreation = {
  completionDate: Date | null;
  creationDate: Date | null;
};

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
    const isCompleted = createCompleted(todoText);
    const priority = createPriority(todoText);
    const dateObj = createDateObj(todoText);
    return new ToDoTxt(
      todoText,
      isCompleted,
      priority,
      dateObj.completionDate,
      dateObj.creationDate
    );
  }
}

function createCompleted(todoText: string): boolean {
  const completedPattern = new RegExp("^x ");
  const matches = todoText.match(completedPattern);
  let result = false;
  if (matches !== null && matches.length == 1) {
    result = !!matches[0];
  }
  return result;
}

function createPriority(todoText: string): string | null {
  const priorityPattern = new RegExp("([A-Z])");
  const matches = todoText.match(priorityPattern);
  let result = null;
  if (matches !== null) {
    result = matches[0];
  }
  return result;
}

function createDateObj(todoText: string): CompletionAndCreation {
  const datePattern = new RegExp("([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9])", "g");

  const dateArray = todoText.match(datePattern);
  let completionDate = null;
  let creationDate = null;
  if (dateArray !== null && dateArray.length === 2) {
    completionDate = new Date(dateArray[0]);
    creationDate = new Date(dateArray[1]);
  } else if (dateArray !== null && dateArray.length === 1) {
    creationDate = new Date(dateArray[0]);
  }
  return {
    completionDate,
    creationDate,
  };
}
