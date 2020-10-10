# todo-core-lib

![test](https://github.com/nasum/todo-tools/workflows/test/badge.svg)

## About

A library for working with text in [todo.txt](https://github.com/todotxt/todo.txt) format

## API

### parseing

#### 'parseToDoText(todoText: string)'

Parse the given string of [todo.txt](https://github.com/todotxt/todo.txt) format.

```ts
import { parseToDoText } from '@nasum/todo-core-lib'

const todo = parseToDoText('(A) 2020-06-16 write code everyday -coding @pc')
```
