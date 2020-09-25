import fs from 'fs'
import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeAddCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const add = commander
    .command('add <todotext>')
    .description('add todo text')
    .action((todoText: string) => {
      todoText = todoText + '\n'
      if (fs.existsSync(cUtil.todoFilePath())) {
        fs.appendFileSync(cUtil.todoFilePath(), todoText)
      } else {
        fs.mkdirSync(cUtil.todoDirPath(), { recursive: true })
        fs.writeFileSync(cUtil.todoFilePath(), todoText)
      }
    })
  return add
}
