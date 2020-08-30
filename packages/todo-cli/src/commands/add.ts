import { createCommand } from 'commander'
import { Config } from '../config'

export function makeAddCommand(config: Config) {
  const add = createCommand('add')
  add.action(() => {
    console.log(config.dir)
  })
  return add
}
