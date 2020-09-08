import fs from 'fs'
import readline from 'readline'
import { createCommand } from 'commander'
import chalk from 'chalk'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { parseToDoText } from '@nasum/todo-core-lib'

export function makeLsCommand(config: Config) {
  const ls = createCommand('ls')
  const cUtil = new ConfigUtil(config)

  ls.action(() => {
    if (fs.existsSync(cUtil.todoFilePath())) {
      const todoList: [string, number][] = []
      const rl = readline.createInterface({
        input: fs.createReadStream(cUtil.todoFilePath()),
      })
      let n = 0

      rl.on('line', (line) => {
        todoList.push([line, n])
        n++
      })

      rl.on('close', () => {
        todoList.sort()
        for (const todo of todoList) {
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
      })
    } else {
      console.log(`not exist ${cUtil.todoFilePath()}`)
    }
  })
  return ls
}
