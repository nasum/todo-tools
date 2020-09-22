import Configstore from 'configstore'
import { Config, DefaultConfig } from './config'
import { createCommand } from 'commander'
import { makeAddCommand } from './commands/add'
import { makeLsCommand } from './commands/ls'
import { makeRmCommand } from './commands/rm'
import { makeDoneCommand } from './commands/done'
import { makeArchiveCommand } from './commands/archive'
import { name, version } from '../package.json'

const config: Config = new Configstore(name, DefaultConfig).all

const program = createCommand('todo')

program.action(() => {
  console.log('todo')
})

program.addCommand(makeAddCommand(config))
program.addCommand(makeLsCommand(config))
program.addCommand(makeRmCommand(config))
program.addCommand(makeDoneCommand(config))
program.addCommand(makeArchiveCommand(config))

program.version(version)
program.parse(process.argv)
