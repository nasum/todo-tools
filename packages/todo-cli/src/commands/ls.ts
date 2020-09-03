import fs from 'fs'
import readline from 'readline'
import { createCommand } from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeLsCommand(config: Config) {
  const ls = createCommand('ls')
  const cUtil = new ConfigUtil(config)

  ls.action(() => {
    if (fs.existsSync(cUtil.todoFilePath())) {
      const rl = readline.createInterface({
        input: fs.createReadStream(cUtil.todoFilePath()),
      })
      let n = 0
      rl.on('line', (line) => {
        console.log(`${n}: ${line}`)
        n += 1
      })
    } else {
      console.log(`not exist ${cUtil.todoFilePath()}`)
    }
  })
  return ls
}
