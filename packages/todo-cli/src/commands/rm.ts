import readline from 'readline'
import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function makeRmCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil.todoFilePath())

  const rm = commander
    .command('rm <number...>')
    .description('remove todo')
    .action((numberArray: string[]) => {
      const target = numberArray.map((numberSt: string) => Number(numberSt))

      operator
        .findLine(target)
        .then((findLine) => {
          console.log(findLine)
          return question('Do you really want to delete this? [y/N]:')
        })
        .then((answer) => {
          if (answer.match(/^y(es)?$/i)) {
            operator.rmLine(target)
          }
        })
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
