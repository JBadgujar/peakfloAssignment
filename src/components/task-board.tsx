"use client"

import { TaskColumn } from "./task-column"

export function TaskBoard() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <TaskColumn status="not-started" title="Not Started" />
      <TaskColumn status="in-progress" title="In Progress" />
      <TaskColumn status="completed" title="Completed" />
    </div>
  )
}
