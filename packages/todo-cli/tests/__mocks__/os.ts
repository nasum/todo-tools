interface MockedOs {
  homedir(): string
}

const os = jest.createMockFromModule<MockedOs>('os')
os.homedir = () => '/home/todo'

module.exports = os
