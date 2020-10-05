import fs from 'fs'
import readline from 'readline'

export function writeFile(filePath: string, text: string): void {
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

export type ToDoList = [string, number][]

export class ToDoTextFileOperator {
  filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
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
        writeFile(this.filePath, text)
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
}
