import chalk from 'chalk'
import { parseToDoText } from '@nasum/todo-core-lib'
import { ToDoList } from '../lib/fileOperator'

export function displayTodo(todoList: ToDoList, findWords: string[] = []): void {
  todoList.sort()
  const re = new RegExp(findWords.join('|'))

  let filterdTodoList = []
  if (findWords.length > 0) {
    filterdTodoList = todoList.filter((todo) => todo[0].search(re) > 0)
  } else {
    filterdTodoList = todoList
  }

  for (const todo of filterdTodoList) {
    const toDoText = parseToDoText(todo[0])
    const text = `${todo[1]} ${todo[0]}`

    switch (toDoText.priority) {
      case 'A':
        console.log(chalk.yellow(text))
        break
      case 'B':
        console.log(chalk.green(text))
        break
      case 'C':
        console.log(chalk.blue(text))
        break
      default:
        console.log(chalk.white(text))
    }
  }
}
