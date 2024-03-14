"use client";
import { TaskStatus, useTaskStore } from "@/lib/store";
import Task from "./task";
import { useEffect, useMemo } from "react";

// const tasks = [
//     {
//       id: "1234",
//       title: "Our first task",
//       description: "Some description",
//       status: "PROGRESS",
//     },
// ];

export default function Column({
  title,
  status,
}: {
  title: string;
  status: TaskStatus;
}) {
  //   const filteredTasks = tasks.filter((task) => task.status === status);
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );
  const draggedTask = useTaskStore((state) => state.draggedTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const dragTask = useTaskStore((state) => state.dragTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  return (
    <section className="h-full flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div
        className="mt-3.5 h-[calc(100%-80px)] w-full flex-1 rounded-xl bg-gray-700/50 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  );
}
