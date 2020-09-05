import os from 'os'

import { Config } from '../config'

export class ConfigUtil {
  config: Config

  constructor(config: Config) {
    this.config = config
  }

  todoDirPath = () => {
    return `${os.homedir()}/${this.config.dir}`
  }

  todoFilePath = () => {
    return `${this.todoDirPath()}/${this.config.todoFileName}`
  }
}
