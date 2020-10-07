import commander from 'commander'

import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { displayTodo } from '../lib/displayTerminal'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeLsCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil.todoFilePath())

  const ls = commander
    .command('ls [words...]')
    .description('show todo list')
    .action((words: string[] = []) => {
      operator.getToDoList().then((todoList) => {
        displayTodo(todoList, words)
      })
    })
  return ls
}
