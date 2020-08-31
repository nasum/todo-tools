import { range } from './util'

const alpabets = range('A', 'Z')

type AtoZ = typeof alpabets[number]

export class Description {
  body: string
  constructor(descriptionTxt: string) {
    this.body = descriptionTxt
  }

  getProjects() {
    const projectPattern = new RegExp(/\+\S+/, 'g')
    return this.body.match(projectPattern)?.map((project) => {
      return project.slice(1)
    })
  }

  getContexts() {
    const contextPattern = new RegExp(/@\S+/, 'g')
    return this.body.match(contextPattern)?.map((context) => {
      return context.slice(1)
    })
  }
}

export class ToDoText {
  rawText: string
  isCompleted: boolean
  priority: AtoZ | null
  completionDate: Date | null
  creationDate: Date | null
  description: Description

  constructor(
    rawText: string,
    isCompleted: boolean,
    priority: AtoZ | null,
    completionDate: Date | null,
    creationDate: Date | null,
    description: Description
  ) {
    this.rawText = rawText
    this.isCompleted = isCompleted
    this.priority = priority
    this.completionDate = completionDate
    this.creationDate = creationDate
    this.description = description
  }
}
