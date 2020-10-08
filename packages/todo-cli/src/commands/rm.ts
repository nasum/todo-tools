import readline from 'readline'
import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { displayTodo } from '../lib/displayTerminal'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeRmCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const rm = commander
    .command('rm <number...>')
    .description('remove todo')
    .action(async (numberArray: string[]) => {
      const target = numberArray.map((numberSt: string) => Number(numberSt))
      const findLine = await operator.findLine(target)
      console.log(findLine)
      const answer = await question('Do you really want to delete this? [y/N]:')
      if (answer.match(/^y(es)?$/i)) {
        await operator.rmLine(target)
      }
      const todoList = await operator.getToDoList()
      displayTodo(todoList)
    })
  return rm
}

function question(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer)
      rl.close()
    })
  })
}
