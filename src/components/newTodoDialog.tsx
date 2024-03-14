"use client";

import { useTaskStore } from "@/lib/store";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function NewTodoDialog() {
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== "string" || typeof description !== "string") return;
    console.log({ title, description });
    addTask(title, description);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New task</DialogTitle>
          <DialogDescription>
            What do you want to get done today ?
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          onSubmit={handleSubmit}
          className="grid gap-4 py-4"
        >
          {/* <div className="grid gap-4 py-4"> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="title goes here"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              description
            </Label>
            {/* <Input
              id="username"
              value="Go to King sooper grocery and get all the supplies for weekend party"
              className="col-span-3"
            /> */}
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
              placeholder="This is where the description goes"
            />
          </div>
          {/* </div> */}
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" form="todo-form">
              Add Task
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
