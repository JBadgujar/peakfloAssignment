"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useTaskStore } from "@/store/tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import type { Task, TaskStatus } from "@/types/task"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Save, Trash2, CheckCircle, Circle, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TaskPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tasks, updateTask, deleteTask } = useTaskStore()
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id)
    if (foundTask) {
      setTask(foundTask)
    }
  }, [id, tasks])

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center text-center bg-red-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold text-red-600">Task not found!</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      deleteTask(task.id)
      navigate("/")
    }, 500)
  }

  const handleSave = () => {
    if (!task.title.trim()) {
      alert("Task Title is required!");
      return;
    }
  
    if (task) {
      setIsLoading(true);
      setTimeout(() => {
        updateTask(task);
        setIsLoading(false);
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Edit Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Task Title
            </Label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Task Status
            </Label>
            <Select value={task.status} onValueChange={(value: TaskStatus) => setTask({ ...task, status: value })}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="absolute z-50 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                <ScrollArea className="max-h-[200px] rounded-md border">
                    <SelectItem
                    value="not-started"
                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    >
                    <Circle className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Not Started</span>
                    </SelectItem>
                    <SelectItem
                    value="in-progress"
                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    >
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <span>In Progress</span>
                    </SelectItem>
                    <SelectItem
                    value="completed"
                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Completed</span>
                    </SelectItem>
                </ScrollArea>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Task Description
            </Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
              rows={5}
              className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 resize-y transition duration-150 ease-in-out"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Task
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || !task.title.trim()}
                >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
