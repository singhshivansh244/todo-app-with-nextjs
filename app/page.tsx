"use client";
import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskMenu from "./components/TaskMenu";

export type taskProp = {
  title: string;
  desc: string;
  status: string;
}
export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [tasks, setTasks] = useState<taskProp[]>([]);

  const handleAddTask = () => {
    setShowTaskForm(prev => !prev);
  };

  const handleTaskDetails = (task: taskProp) => {
    setTasks(prev => [...prev, task]);
  }

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
          <button
            className="flex justify-center items-center border-2 border-black rounded-lg ml-[10vw] md:ml-[20vw] mt-5 p-2 w-[7rem] hover:border-blue-400 hover:text-red-400"
            onClick={handleAddTask}
          >
            <span className="bold text-2xl mr-1 text-blue-300">+</span> Add Task
          </button>
          <TaskMenu tasks={tasks}/>
        </div>
      )}
      {showTaskForm && <AddTaskForm handleAddTask={handleAddTask} taskDetail={handleTaskDetails}/>}
    </div>
  );
}
