import { createCommand } from 'commander'

export function makeLsCommand() {
  const ls = createCommand('ls')
  ls.action(() => {
    console.log('ls')
  })
  return ls
}
