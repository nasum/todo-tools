import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { ConfigUtil } from './configUtil'
import { parseToDoText } from '@nasum/todo-core-lib'

export type ToDoList = [string, number][]

type ArchiveMap = {
  [key: string]: string[]
}

export class ToDoTextFileOperator {
  filePath: string
  archivePath: string

  constructor(config: ConfigUtil) {
    this.filePath = config.todoFilePath()
    this.archivePath = config.archiveDirPath()
    if (!fs.existsSync(this.filePath)) fs.mkdirSync(this.filePath, { recursive: true })
  }

  append(text: string): void {
    fs.appendFileSync(this.filePath, text + '\n')
  }

  findLine(targetList: Array<number>): Promise<string> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: fs.createReadStream(this.filePath),
      })

      let text = ''
      let n = 0
      rl.on('line', (line) => {
        if (targetList.indexOf(n) >= 0) {
          text += `${line}\n`
        }
        n += 1
      })

      rl.on('SIGINT', () => {
        reject()
      })

      rl.on('close', () => {
        resolve(text)
      })
    })
  }

  rmLine(targetList: Array<number>): Promise<void> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: fs.createReadStream(this.filePath),
      })
      let text = ''
      let n = 0
      rl.on('line', (line) => {
        if (targetList.indexOf(n) < 0) {
          text += `${line}\n`
        }
        n += 1
      })

      rl.on('SIGINT', () => {
        reject()
      })

      rl.on('close', () => {
        this.writeFile(this.filePath, text)
        resolve()
      })
    })
  }

  doneLine(targetList: Array<number>): Promise<void> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: fs.createReadStream(this.filePath),
      })
      let text = ''
      let n = 0
      rl.on('line', (line) => {
        if (targetList.indexOf(n) < 0) {
          text += line
          text += '\n'
        } else {
          const todoText = parseToDoText(line)
          todoText.done()
          text += todoText.toString()
          text += '\n'
        }
        n += 1
      })

      rl.on('SIGINT', () => {
        reject()
      })

      rl.on('close', () => {
        this.writeFile(this.filePath, text)
        resolve()
      })
    })
  }

  getToDoList(): Promise<ToDoList> {
    return new Promise((resolve, reject) => {
      const todoList: ToDoList = []
      const rl = readline.createInterface({
        input: fs.createReadStream(this.filePath),
      })
      let n = 0

      rl.on('line', (line) => {
        todoList.push([line, n])
        n++
      })

      rl.on('SIGINT', () => {
        reject()
      })

      rl.on('close', () => {
        resolve(todoList)
      })
    })
  }

  archive(): Promise<void> {
    return new Promise((resolve, reject) => {
      const archiveMap: ArchiveMap = {}
      const rl = readline.createInterface({
        input: fs.createReadStream(this.filePath),
      })
      let text = ''

      rl.on('line', function (line) {
        const todoText = parseToDoText(line)
        if (todoText.isCompleted && todoText.completionDate) {
          const archiveArray = archiveMap[todoText.getCreationDateString()] || []
          archiveArray.push(line)

          archiveMap[todoText.getCompletionDateString()] = archiveArray
        } else {
          text += line
          text += '\n'
        }
      })

      rl.on('SIGINT', () => {
        reject()
      })

      rl.on('close', () => {
        this.createArchive(archiveMap, this.archivePath)
        this.writeFile(this.filePath, text)
        resolve()
      })
    })
  }

  private createArchive(archiveMap: ArchiveMap, archiveDirPath: string) {
    for (const date of Object.keys(archiveMap)) {
      const archivePath = path.join(archiveDirPath, date + '.txt')
      if (!fs.existsSync(archivePath)) {
        fs.mkdirSync(archiveDirPath, { recursive: true })
        fs.writeFileSync(archivePath, '')
      }
      for (const archiveText of archiveMap[date]) {
        fs.appendFileSync(archivePath, archiveText + '\n')
      }
    }
  }

  private writeFile(filePath: string, text: string): void {
    fs.open(filePath, 'w', (err, fd) => {
      if (err) throw err
      fs.writeFile(fd, text, (err) => {
        if (err) throw err
        fs.close(fd, (err) => {
          if (err) throw err
        })
      })
    })
  }
}
