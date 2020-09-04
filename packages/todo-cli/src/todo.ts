import Configstore from 'configstore'
import { Config, DefaultConfig } from './config'
import { createCommand } from 'commander'
import { makeAddCommand } from './commands/add'
import { makeLsCommand } from './commands/ls'
import { makeRmCommand } from './commands/rm'
import { makeDoneCommand } from './commands/done'

const packageJson = require('../package.json')
const config: Config = new Configstore(packageJson.name, DefaultConfig).all

const program = createCommand()

program.action(() => {
  console.log('todo')
})

program.addCommand(makeAddCommand(config))
program.addCommand(makeLsCommand(config))
program.addCommand(makeRmCommand(config))
program.addCommand(makeDoneCommand(config))

program.version('0.0.1')
program.parse(process.argv)
