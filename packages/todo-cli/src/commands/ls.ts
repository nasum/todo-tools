import commander from 'commander'

import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { displayTodo } from '../lib/displayTerminal'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeLsCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const ls = commander
    .command('ls [words...]')
    .description('show todo list')
    .action(async (words: string[] = []) => {
      const todoList = await operator.getToDoList()
      displayTodo(todoList, words)
    })
  return ls
}
