"use client";

import { create } from "zustand";
import type { Task, TaskStatus } from "@/types/task";

interface TaskState {
  tasks: Task[];
  addTask: (status: TaskStatus) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
      tasks: [],
      addTask: (status: TaskStatus) =>
        set((state: TaskState) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title: "New Task",
              description: "",
              status,
            },
          ],
        })),
      updateTask: (updatedTask: Task) =>
        set((state: TaskState) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),
      deleteTask: (id: string) =>
        set((state: TaskState) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      moveTask: (taskId: string, newStatus: TaskStatus) =>
        set((state: TaskState) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),
}));

