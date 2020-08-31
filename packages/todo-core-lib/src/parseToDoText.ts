import { ToDoText, Description } from './toDoText'

type CompletionAndCreation = {
  completionDate: Date | null
  creationDate: Date | null
}

const completedPattern = new RegExp(/^x /)
const priorityPattern = new RegExp(/\([A-Z]\)/)
const datePattern = new RegExp(/([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9])/, 'g')

function createCompleted(todoText: string): boolean {
  const matches = todoText.match(completedPattern)
  let result = false
  if (matches !== null && matches.length == 1) {
    result = !!matches[0]
  }
  return result
}

function createPriority(todoText: string): string | null {
  const matches = todoText.match(priorityPattern)
  let result = null
  if (matches !== null) {
    result = matches[0][1]
  }
  return result
}

function createDateObj(todoText: string): CompletionAndCreation {
  const dateArray = todoText.match(datePattern)
  let completionDate = null
  let creationDate = null
  if (dateArray !== null && dateArray.length === 2) {
    completionDate = new Date(dateArray[0])
    creationDate = new Date(dateArray[1])
  } else if (dateArray !== null && dateArray.length === 1) {
    creationDate = new Date(dateArray[0])
  }
  return {
    completionDate,
    creationDate,
  }
}

function createDescription(todoText: string): string {
  let resultText = todoText.replace(completedPattern, '')
  resultText = resultText.replace(priorityPattern, '')
  resultText = resultText.replace(datePattern, '')
  return resultText.trim()
}

export function parseToDoText(todoText: string): ToDoText {
  const isCompleted = createCompleted(todoText)
  const priority = createPriority(todoText)
  const dateObj = createDateObj(todoText)
  const description = new Description(createDescription(todoText))
  return new ToDoText(
    todoText,
    isCompleted,
    priority,
    dateObj.completionDate,
    dateObj.creationDate,
    description
  )
}
