export type Config = {
  dir: string
  todoFileName: string
}

export const DefaultConfig: Config = {
  dir: '.todo',
  todoFileName: 'todo.txt',
}
