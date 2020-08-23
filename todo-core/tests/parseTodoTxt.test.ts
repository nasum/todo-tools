import { ToDoText, parseToDoText } from '../src'

test('return ToDoTxt object', () => {
  const todo = parseToDoText('(A) 2020-06-16 write code everyday -coding @pc')
  expect(todo).toBeInstanceOf(ToDoText)
})
