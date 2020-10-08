import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { ToDoTextFileOperator } from '../lib/fileOperator'
import { displayTodo } from '../lib/displayTerminal'

export function makeArchiveCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const archive = commander
    .command('archive')
    .description('archive todo text')
    .action(async () => {
      await operator.archive()
      const todoList = await operator.getToDoList()
      displayTodo(todoList)
    })
  return archive
}
