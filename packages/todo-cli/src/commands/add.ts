import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { displayTodo } from '../lib/displayTerminal'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeAddCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const add = commander
    .command('add <todotext>')
    .description('add todo text')
    .action(async (todoText: string) => {
      operator.append(todoText)
      const todoList = await operator.getToDoList()
      displayTodo(todoList)
    })
  return add
}
