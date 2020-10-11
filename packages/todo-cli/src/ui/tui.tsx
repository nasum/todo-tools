import React, { useState } from 'react'
import { Box, Static, Text, useInput, render } from 'ink'
import SelectInput from 'ink-select-input'

import { Config } from '../config'
import { ConfigUtil } from '../lib/configUtil'
import { ToDoTextFileOperator } from '../lib/fileOperator'

export function startTUI(config: Config): void {
  const cUtil = new ConfigUtil(config)
  const operator = new ToDoTextFileOperator(cUtil)

  const ToDoList = () => {
    const [state, setState] = useState({
      isActive: true,
    })

    useInput(
      (input, key) => {
        if (input === 'q') {
          setState({ isActive: false })
        }
      },
      {
        isActive: state.isActive,
      }
    )

    return (
      <>
        <Box borderStyle="round" borderColor="green" alignItems="flex-start">
          <Text color="green">todo cli</Text>
        </Box>
        <SelectInput items={[]} isFocused={false} />
        <Box marginTop={1}>
          <Text dimColor>Todo: {[].length}</Text>
        </Box>
      </>
    )
  }

  render(<ToDoList />)
}
