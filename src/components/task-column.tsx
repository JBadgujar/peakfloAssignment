"use client"

import { Button } from "@/components/ui/button"
import type { TaskStatus } from "@/types/task"
import { useTaskStore } from "@/store/tasks"
import { TaskCard } from "./task-card"
import { Plus } from "lucide-react"

interface TaskColumnProps {
  status: TaskStatus
  title: string
}

const statusColors = {
  "not-started": "bg-red-100",
  "in-progress": "bg-yellow-100",
  completed: "bg-green-100",
}

export function TaskColumn({ status, title }: TaskColumnProps) {
  const { tasks, addTask, moveTask } = useTaskStore()
  const columnTasks = tasks.filter((task) => task.status === status)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId")
    moveTask(taskId, status)
  }

  return (
    <div className="w-80 p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
            {title} {columnTasks.length}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => addTask(status)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <Button variant="ghost" className="w-full mt-4 text-muted-foreground" onClick={() => addTask(status)}>
        <Plus className="h-4 w-4 mr-2" /> New
      </Button>
    </div>
  )
}
