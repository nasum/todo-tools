import fs from 'fs'
import { exec } from 'child_process'
import commander from 'commander'
import chalk from 'chalk'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeEditCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const edit = commander
    .command('edit')
    .description('open todo text')
    .action(() => {
      if (fs.existsSync(cUtil.todoFilePath())) {
        const editor = process.env.EDITOR
        exec(`${editor} ${cUtil.todoFilePath()}`, (err) => {
          if (err) {
            console.log(chalk.red(err))
          }
        })
      } else {
        console.log(`not exist ${cUtil.todoFilePath()}`)
      }
    })
  return edit
}
