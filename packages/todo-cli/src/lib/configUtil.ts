import os from 'os'

import { Config } from '../config'

export class ConfigUtil {
  config: Config

  constructor(config: Config) {
    this.config = config
  }

  todoDirPath = (): string => {
    return `${os.homedir()}/${this.config.dir}`
  }

  todoFilePath = (): string => {
    return `${this.todoDirPath()}/${this.config.todoFileName}`
  }

  archiveDirPath = (): string => {
    return `${this.todoDirPath()}/${this.config.archiveFileDir}`
  }
}
