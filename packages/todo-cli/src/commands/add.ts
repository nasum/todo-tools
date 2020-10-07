import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeAddCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil.todoFilePath())

  const add = commander
    .command('add <todotext>')
    .description('add todo text')
    .action((todoText: string) => {
      operator.append(todoText)
    })
  return add
}
