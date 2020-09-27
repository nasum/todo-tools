import { DefaultConfig } from '../../src/config'
import { ConfigUtil } from '../../src/lib/configUtil'

jest.mock('os')

describe('configUtil', () => {
  let cUtil: ConfigUtil
  beforeEach(() => {
    cUtil = new ConfigUtil(DefaultConfig)
  })
  test('todoDirPath', () => {
    expect(cUtil.todoDirPath()).toEqual('/home/todo/.todo')
  })
  test('todoFilePath', () => {
    expect(cUtil.todoFilePath()).toEqual('/home/todo/.todo/todo.txt')
  })
  test('archiveDirPath', () => {
    expect(cUtil.archiveDirPath()).toEqual('/home/todo/.todo/archive')
  })
})
