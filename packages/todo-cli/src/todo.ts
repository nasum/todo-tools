import { createCommand } from 'commander'
import { makeAddCommand } from './commands/add'
import { makeLsCommand } from './commands/ls'

const program = createCommand()

program.action(() => {
  console.log('todo')
})

program.addCommand(makeAddCommand())
program.addCommand(makeLsCommand())

program.version('0.0.1')
program.parse(process.argv)
