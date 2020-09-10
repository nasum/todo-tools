export type Config = {
  dir: string
  todoFileName: string
  archiveFileDir: string
}

export const DefaultConfig: Config = {
  dir: '.todo',
  todoFileName: 'todo.txt',
  archiveFileDir: 'archive',
}
