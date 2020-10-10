import { render } from 'ink'
import { showToDoList } from './todolist'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export async function startTUI(config: Config): Promise<void> {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  render(await showToDoList(operator))
}
