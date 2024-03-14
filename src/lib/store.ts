import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskStatus = "Todo" | "Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
};

export type State = {
  tasks: Task[];
  draggedTask: string | null;
};

export type Actions = {
  dragTask: (id: string | null) => void;
  addTask: (title: string, description?: string) => void;
  deleteTask: (title: string) => void;
  updateTask: (title: string, status: TaskStatus) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],

      draggedTask: null,
      dragTask: (id: string | null) => set({ draggedTask: id }),

      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              description,
              status: "Todo",
            },
          ],
        })),
      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      updateTask: (id: string, status: TaskStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        }));
      },
    }),
    { name: "task-storage", skipHydration: true }
  )
);
