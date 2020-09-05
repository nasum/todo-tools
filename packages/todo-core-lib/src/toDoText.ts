import { range } from './util'

const alpabets = range('A', 'Z')

type AtoZ = typeof alpabets[number]

export class Description {
  body: string
  constructor(descriptionTxt: string) {
    this.body = descriptionTxt
  }

  toString(): string {
    return this.body
  }

  getProjects(): string[] {
    const projectPattern = new RegExp(/\+\S+/, 'g')
    const projects = this.body.match(projectPattern)?.map((project) => {
      return project.slice(1)
    })
    if (projects) {
      return projects
    } else {
      return []
    }
  }

  getContexts(): string[] {
    const contextPattern = new RegExp(/@\S+/, 'g')
    const contexts = this.body.match(contextPattern)?.map((context) => {
      return context.slice(1)
    })

    if (contexts) {
      return contexts
    } else {
      return []
    }
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

  toString(): string {
    const completeSt = this.isCompleted ? 'x ' : ''
    const prioritySt = this.priority ? `(${this.priority}) ` : ''
    const completionDateSt = this.completionDate ? createFormattedDateSt(this.completionDate) + ' ' : ''
    const creationDateSt = this.creationDate ? createFormattedDateSt(this.creationDate) + ' ' : ''
    return `${completeSt}${prioritySt}${completionDateSt}${creationDateSt}${this.description.toString()}`
  }
}

function createFormattedDateSt(date: Date) {
  function zeroPadding(num: number): string {
    return num.toString().padStart(2, '0')
  }
  return `${date.getFullYear()}-${zeroPadding(date.getMonth() + 1)}-${zeroPadding(date.getDate())}`
}
