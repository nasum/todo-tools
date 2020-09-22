import path from 'path'
import fs from 'fs'
import readline from 'readline'
import commander from 'commander'
import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { writeFile } from '../lib/fileOperator'
import { parseToDoText } from '@nasum/todo-core-lib'

type ArchiveMap = {
  [key: string]: string[]
}

export function makeArchiveCommand(config: Config): commander.Command {
  const cUtil = new ConfigUtil(config)
  const archive = commander
    .command('archive')
    .description('archive todo text')
    .action(() => {
      if (fs.existsSync(cUtil.todoFilePath())) {
        const archiveMap: ArchiveMap = {}
        const rl = readline.createInterface({
          input: fs.createReadStream(cUtil.todoFilePath()),
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

        rl.on('close', function () {
          createArchive(archiveMap, cUtil.archiveDirPath())
          writeFile(cUtil.todoFilePath(), text)
        })
      } else {
        console.log(`not exist ${cUtil.todoFilePath()}`)
      }
    })
  return archive
}

function createArchive(archiveMap: ArchiveMap, archiveDirPath: string) {
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
