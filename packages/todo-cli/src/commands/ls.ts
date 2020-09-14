import fs from 'fs'
import readline from 'readline'
import { createCommand } from 'commander'
import chalk from 'chalk'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { parseToDoText } from '@nasum/todo-core-lib'

type ToDoList = [string, number][]

export function makeLsCommand(config: Config) {
  const ls = createCommand('ls')
  const cUtil = new ConfigUtil(config)

  ls.description('show todo list').action((_, findWords: string[] = []) => {
    if (fs.existsSync(cUtil.todoFilePath())) {
      const todoList: ToDoList = []
      const rl = readline.createInterface({
        input: fs.createReadStream(cUtil.todoFilePath()),
      })
      let n = 0

      rl.on('line', (line) => {
        todoList.push([line, n])
        n++
      })

      rl.on('close', () => {
        displayTodo(todoList, findWords)
      })
    } else {
      console.log(`not exist ${cUtil.todoFilePath()}`)
    }
  })
  return ls
}

function displayTodo(todoList: ToDoList, findWords: string[]) {
  console.log('findWords', findWords)
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
