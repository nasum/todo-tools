import fs from 'fs'
import readline from 'readline'
import { createCommand } from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeRmCommand(config: Config) {
  const rm = createCommand('rm')
  const cUtil = new ConfigUtil(config)

  rm.action((_, target) => {
    target = target.map((numberSt: string) => Number(numberSt))
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
        fs.open(cUtil.todoFilePath(), 'w', (err, fd) => {
          if (err) throw err
          fs.writeFile(fd, text, (err) => {
            if (err) throw err
            fs.close(fd, (err) => {
              if (err) throw err
            })
          })
        })
      })
    } else {
      console.log(`not exist ${cUtil.todoFilePath()}`)
    }
  })
  return rm
}