"use client";
import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskMenu from "./components/TaskMenu";

// type for task state variable
export type taskProp = {
  title: string;
  desc?: string;
  status?: string;
  id: string;
};

export default function Home() {
  // state variable for disabling input form to user
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  // state variable for storing tasks in array
  const [tasks, setTasks] = useState<taskProp[]>([]);

  // state variable for storing individual task 
  const [editTask, setEditTask] = useState<taskProp>({title: '', id: ''});

  // functino to toggle input form
  const handleAddTask = (task?: taskProp) => {
    // checking if task is getting edited or new task is adding
    if (task) {
      setEditTask(prev => task);
    } else {
      setEditTask({title: '', id: ''});
    }
    // toggle function for the form
    setShowTaskForm((prev) => !prev);
  };

  // function to add new task to the array
  const handleTaskDetails = (newTask: taskProp, id?: string) => {
    // checking if new task is getting added or edit is done
    if (id) {
      const data = tasks.map(task => {
        if (task.id === id) {
          if (newTask.title) task.title = newTask.title
          if (newTask.desc) task.desc = newTask.desc
          if (newTask.status) task.status = newTask.status
        }
        return task;
      })
      setTasks(data);
    } else {
      setTasks((prev) => [...prev, newTask]);
    }
  };

  // function to add task
  const handleTasks = (tasks: taskProp[]) => {
    setTasks(tasks);
  }

  // hook for getting data from local storage
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || 'Hello world!!!');
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  // hook for setting data from local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      {!showTaskForm && (
        <div>
          <div className="flex justify-center items-center w-100 h-100 py-5">
            <h1 className="font-extrabold text-2xl lg:text-5xl">
              Todo <span className="text-red-400">App</span>
            </h1>
          </div>
          <div className="border-t border-2 border-black w-[100vw]"></div>
          <div className="flex justify-end mr-10">
            <button
              className="flex justify-center items-center border-2 border-black rounded-lg ml-[10vw] md:ml-[20vw] mt-5 p-2 w-[7rem] hover:border-blue-400 hover:text-red-400"
              onClick={() => handleAddTask()}
            >
              <span className="bold text-2xl mr-1 text-blue-300">+</span> Add Task
            </button>
          </div>
          {tasks.length > 0 && (
            <div className="mx-5 mt-10">
              <TaskMenu tasks={tasks} handleTask={handleTasks} showForm={handleAddTask} />
            </div>
          )}
        </div>
      )}
      {showTaskForm && (
        <AddTaskForm
          handleAddTask={handleAddTask}
          taskDetail={handleTaskDetails}
          task={editTask}
        />
      )}
    </div>
  );
}
