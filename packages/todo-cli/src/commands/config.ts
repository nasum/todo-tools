import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'

export function makeConfigCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const cf = commander
    .command('config')
    .description('show config')
    .action(() => {
      console.log(cUtil.config)
    })
  return cf
}
