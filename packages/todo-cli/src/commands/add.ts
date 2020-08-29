import { createCommand } from 'commander'

export function makeAddCommand() {
  const add = createCommand('add')
  add.action(() => {
    console.log('add')
  })
  return add
}
