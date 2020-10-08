import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { displayTodo } from '../lib/displayTerminal'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeDoneCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const done = commander
    .command('done <number...>')
    .description('complete the task')
    .action(async (numberStArray: string[]) => {
      const target = numberStArray.map((numberSt: string) => Number(numberSt))
      await operator.doneLine(target)
      const todoList = await operator.getToDoList()
      displayTodo(todoList)
    })
  return done
}
