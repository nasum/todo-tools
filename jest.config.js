module.exports = {
  roots: ['./packages/todo-core-lib/tests', './packages/todo-cli/tests'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
