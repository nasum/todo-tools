import fs from 'fs'
import readline from 'readline'
import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { writeFile } from '../lib/fileOperator'

export function makeRmCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const rm = commander
    .command('rm <number...>')
    .description('remove todo')
    .action((numberArray: string[]) => {
      const target = numberArray.map((numberSt: string) => Number(numberSt))
      if (fs.existsSync(cUtil.todoFilePath())) {
        const rl = readline.createInterface({
          input: fs.createReadStream(cUtil.todoFilePath()),
        })
        let text = ''
        let n = 0
        rl.on('line', function (line) {
          if (target.indexOf(n) < 0) {
            text += line
            text += '\n'
          }
          n += 1
        })

        rl.on('close', function () {
          writeFile(cUtil.todoFilePath(), text)
        })
      } else {
        console.log(`not exist ${cUtil.todoFilePath()}`)
      }
    })
  return rm
}
