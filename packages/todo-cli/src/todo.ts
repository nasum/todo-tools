import Configstore from 'configstore'
import { Config, DefaultConfig } from './config'
import { createCommand } from 'commander'
import { makeAddCommand } from './commands/add'
import { makeLsCommand } from './commands/ls'

const packageJson = require('../package.json')
const config: Config = new Configstore(packageJson.name, DefaultConfig).all

const program = createCommand()

program.action(() => {
  console.log('todo')
})

program.addCommand(makeAddCommand(config))
program.addCommand(makeLsCommand())

program.version('0.0.1')
program.parse(process.argv)
