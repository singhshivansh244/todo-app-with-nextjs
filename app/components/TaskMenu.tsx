import React from "react";
import { taskProp } from "../page";

// type for TaskMenu component props
type childProps = {
  handleTask: (task: taskProp[]) => void;
  tasks: taskProp[];
  showForm: (task: taskProp) => void;
};

// type for styleStatus and styleTitle
type StyleStatusProp = {
  [key: string]: string;
};

// object for different color for different status badges
const styleStatus: StyleStatusProp = {
  "Not Completed": "hover:text-red-600",
  "On Going": "hover:text-yellow-600",
  "Completed": "hover:text-green-600",
  "none": 'text-black'
};

// object for different color for different card background
const styleTitle: StyleStatusProp = {
  "Not Completed": "bg-red-300",
  "On Going": "bg-yellow-300",
  "Completed": "bg-green-300",
  "none": 'bg-black'
};

const TaskMenu: React.FC<childProps> = ({ tasks, handleTask, showForm }) => {

  // function to handle deleting task
  const handleDelete = (id: string) => {
    const newTask = tasks.filter((task) => id !== task.id);
    handleTask(newTask);
  }

  // function to handle editing task
  const handleEdit = (task: taskProp) => {
    showForm(task);
  }

  // function to short task according to the status (on going > not comleted > complete)
  const compare = (a: taskProp, b: taskProp) => {
    if (a.status && b.status && a.status > b.status) return -1;
    if (a.status && b.status && a.status < b.status) return 1;
    return 0;
  };
  tasks.sort(compare);

  return (
    <div className="p-2 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {
        tasks.map((task, idx) => {
          const TaskDesc = () => {
            if (task.desc) {
              const Description = task.desc
              const maxLength = 50;
              const words = Description.trim().split(" ");
              const shortenedWords = words.slice(0, maxLength);
              const shortenedDescription = shortenedWords.join(" ");

              if (words.length > maxLength) {
                return `${shortenedDescription}...`;
              }

              return shortenedDescription;
            }
          }
          return (
            <div key={idx} className={`${styleTitle[task.status || 'none']} flex flex-col justify-between border p-2 my-2 mx-2 rounded-xl text-xl hover:bg-gray-200 hover:scale-105 transition`}>
              <div>
                <div className="flex justify-between my-2 text-2xl font-extrabold p-5">
                  {
                    task.status === 'Completed' ? <span className=" line-through">{task.title.toUpperCase()}</span> :
                      <span>{task.title.toUpperCase()}</span>
                  }
                </div>
                <div className="my-2 mx-4 font-extralight text-lg p-2">
                  <TaskDesc />
                </div>
                <div className="my-2 mx-4 p-2">
                  Status: <span className={`${styleStatus[task.status || 'none']}`}>{task.status}</span>
                </div>
              </div>
              <div className="flex justify-center my-5">
                <button className="mr-4 border border-black bg-red-500 rounded-lg p-2 hover:border-white hover:bg-white hover:text-black" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="border rounded-lg border-black bg-gray-500 p-2 hover:border-white hover:bg-white hover:text-black" onClick={() => handleEdit(task)}>Edit</button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default TaskMenu;
