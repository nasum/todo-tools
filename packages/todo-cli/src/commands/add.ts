import os from 'os'
import fs from 'fs'
import { createCommand } from 'commander'
import { Config } from '../config'

export function makeAddCommand(config: Config) {
  const add = createCommand('add')

  add.action((a, textArray) => {
    const todoDirPath = `${os.homedir()}/${config.dir}`
    const todoFilePath = `${todoDirPath}/${config.todoFileName}`
    const todoText = textArray.join(' ') + '\n'
    if (fs.existsSync(todoFilePath)) {
      fs.appendFileSync(todoFilePath, todoText)
    } else {
      fs.mkdirSync(todoDirPath, { recursive: true })
      fs.writeFileSync(todoFilePath, todoText)
    }
  })
  return add
}
