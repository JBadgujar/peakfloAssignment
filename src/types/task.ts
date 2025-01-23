export type TaskStatus = "not-started" | "in-progress" | "completed"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export interface Column {
  id: TaskStatus
  title: string
  tasks: Task[]
}

