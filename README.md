# Global State Management with Zustand

## ScreenShot
![zustand-kanban-taskmanager](https://github.com/koirpraw/nextjs-zustand-taskmanager/assets/7278348/cc24bef3-fc71-44c1-8633-ca73b387aa8a)

## Store(state Management) Setup:

- After a  new project is created, the first thing to do is to install the Zustand library. This can be done by running the following command in the terminal:

```bash
npm install zustand
```

- After the installation is complete, the next step is to create a store. This can be done by creating a file called store.ts and adding the following code(in our case this file is inisde lib directory):

```javascript
import create from 'zustand';
```

- The create function is used to create a store. It takes a function as an argument, which returns the initial state of the store. The function also returns a set of methods that can be used to update the state.

- In our case we are using typescript so we will also define the type of the store. We are defining Tassk object which consists of id, title,description and status. The status has a type of TaskStatus which is an enum("Todo","In Progress","Done"). Id, title and description are of type string. These Types are defiled as follows:

```javascript
export type TaskStatus = "Todo" | "Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
};
```

- We are building a task manager app and a task has states and actions. In our case the states of our task will be either "Todo", "In Progress" or "Done". The actions are functions/methods that will carry out the CRUD operations. So the methods in our case will be addTask, deleteTask & updateTask. The store will be defined as follows:

```javascript 
//Defining state of task & draggedTask.
export type State = {
  tasks: Task[];
  draggedTask: string | null;
};

//Defining actions that can be performed on the state.
export type Actions = {
  dragTask: (id: string | null) => void;
  addTask: (title: string, description?: string) => void;
  deleteTask: (title: string) => void;
  updateTask: (title: string, status: TaskStatus) => void;
};
```
- Note: Since this task manager app is a kanban board, the state of task changed is tracked by dragging the task(task card) from one column to next. We have the states "todo", "in progress" and "done" and hence the columns are named as such to represent the states. Because we will be dragging the task from one column to the next, we need to keep track of the task that is being dragged. This means in addition to the states defined initially(todo,in progress & done) we also need to keep track of the dragged task. This is why we have defined the draggedTask in the state. The action/method dragTask is required to carryout the drag function. The store will be defined as follows:

- Now finally we will use the create function from zustand to create the store that will keep track of the state and actions. The store will be defined as follows:


```javascript

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
```

- note: persisit is a middleware that will persist the state of the store in the local storage. It is not required by the create function. Its purpose is to persist the data in local storage if desired. If local-storage is desired ,it also needs the name for that local-storage.  The name of the local-storage in our case is "task-storage".
- skipHydration is set to true. This is done so that the store is not hydrated on the server side. This especially applies to NextJS because it is a server side rendering framework.
  
- In the above all functions "set" function plays a key role. It allows to update the state after that function/action is called. Lets take addTask function as an example. 
  
- When addTask function is called, it takes the title and description as arguments and then it calls the set function. The set function takes state as an argument which returns the new state. The new state is the old state with the new task added to it. The new task is added to the tasks array in the state. The new state is then set as the current state. The updadting of the task is done by using the spread operator. The spread operator is used to copy the old state(Task) and then add the new task to it. The new state is then set as the current state. This is how the state is updated. 

-Now lets looks at delete function. The delete function takes the id of the task to be deleted as an argument. It then calls the set function. The set function takes the state as an argument and returns the new state. The new state is the old state with the task to be deleted removed from it. The deletion is acheived by using the filter method. The filter method is used to filter out the task to be deleted from the tasks array in the state. The new state is then set as the current state. The task that we are left with now after filtering the selected task is null. This means the task is now deleted.

-Now lets looks at update function. In our case the task is updated when it is dragged from one column to the next, such as moving from todo to progress or from progress to done. The update function takes the id of the task to be updated and the new status of the task as arguments. When we move the task from lets say from todo to progress, the status of the task is updated to "in progress". To acheive this behavior we are passing the id of the task and the new status of the task as arguments to the update function. 
Inside the set function, it creates a new state object where the tasks property is a new array created by mapping over the current tasks array. For each task in the tasks array, it checks if the id of the task is equal to the id passed to the updateTask function. If it is, it creates a new task object with the same properties as the current task (using the spread operator ...task), but with the status replaced by the new status. If the id of the task is not equal to the id passed to the updateTask function, it simply returns the task as is.

This approach ensures that the state is updated immutably, which is a key principle in React state management. It means that instead of modifying the existing state object or its tasks array directly, you always create new objects or arrays when you want to make changes. This helps prevent bugs and makes your state changes easier to track and understand.

## State Management implementation in the components:
- Once the store is setup we can access the state and actions using the useTaskStore hook (this can be named anything we want with "use" keyword as prefix, in ourcase we are managing the task store and hence useTaskStore). The useTaskStore hook can be used to access the state and actions in any component. The state and actions can be accessed as follows:

```javascript

import { useTaskStore } from "../lib/store";

const tasks = useTaskStore((state) => state.tasks);

const addTask = useTaskStore((state) => state.addTask);
```

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


