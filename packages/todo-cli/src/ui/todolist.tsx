import React from 'react'
import { Box, Static, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { ToDoTextFileOperator, ToDo } from '../lib/fileOperator'

export async function showToDoList(operator: ToDoTextFileOperator) {
  const todoList = await operator.getToDoList()
  const displayTodoList = todoList.map((todo) => {
    return { label: todo[0], value: todo[0] }
  })

  return (
    <>
      <Box borderStyle="round" borderColor="green" alignItems="flex-start">
        <Text color="green">todo cli</Text>
      </Box>
      <SelectInput items={displayTodoList} isFocused={false} />
      <Box marginTop={1}>
        <Text dimColor>Todo: {todoList.length}</Text>
      </Box>
    </>
  )
}
