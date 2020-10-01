import fs from 'fs'

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

export class ToDoTextFileOperator {
  filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    if (!fs.existsSync(this.filePath)) fs.mkdirSync(this.filePath, { recursive: true })
  }

  append(text: string): void {
    fs.appendFileSync(this.filePath, text + '\n')
  }
}
