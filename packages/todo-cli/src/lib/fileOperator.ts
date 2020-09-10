import fs from 'fs'

export function writeFile(filePath: string, text: string) {
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
