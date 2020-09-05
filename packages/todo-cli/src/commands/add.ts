import fs from 'fs'
import { createCommand } from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeAddCommand(config: Config) {
  const add = createCommand('add')
  const cUtil = new ConfigUtil(config)

  add.action((_, textArray) => {
    const todoText = textArray.join(' ') + '\n'
    if (fs.existsSync(cUtil.todoFilePath())) {
      fs.appendFileSync(cUtil.todoFilePath(), todoText)
    } else {
      fs.mkdirSync(cUtil.todoDirPath(), { recursive: true })
      fs.writeFileSync(cUtil.todoFilePath(), todoText)
    }
  })
  return add
}
