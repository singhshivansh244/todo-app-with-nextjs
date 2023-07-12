import React, { ChangeEvent, FormEvent, useRef } from "react";
import { taskProp } from "../page";
import { v4 as uuidv4 } from 'uuid';
import { takeCoverage } from "v8";

type ChildProps = {
  handleAddTask: () => void;
  taskDetail: (task: taskProp, id?: string) => void;
  task: taskProp;
};

export const statusValues = ['Not Completed', 'On Going', 'Completed']

const AddTaskForm: React.FC<ChildProps> = ({ handleAddTask, taskDetail, task }) => {
  
  // state variables to get value from form
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const statusRef1 = useRef<HTMLInputElement>(null);
  const statusRef2 = useRef<HTMLInputElement>(null);
  const statusRef3 = useRef<HTMLInputElement>(null);

  // function to get all the input values from the form
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddTask();
    let id = task.id;
    if (task.id !== '') id = uuidv4();
    if (titleRef.current && descRef.current) {
      const title = titleRef.current.value;
      const desc = descRef.current.value;
      const id = uuidv4()
      if (statusRef1.current && statusRef1.current.checked) {
        const status = statusRef1.current.value;
        if (task.id !== '') {
          taskDetail({ title, desc, status, id }, task.id);
        }
        else {
          taskDetail({ title, desc, status, id });
        }
        return;
      }
      if (statusRef2.current && statusRef2.current.checked) {
        const status = statusRef2.current.value;
        if (task.id !== '') {
          taskDetail({ title, desc, status, id }, task.id);
        }
        else {
          taskDetail({ title, desc, status, id });
        }
        return;
      }
      if (statusRef3.current && statusRef3.current.checked) {
        const status = statusRef3.current.value;
        if (task.id !== '') {
          taskDetail({ title, desc, status, id }, task.id);
        }
        else {
          taskDetail({ title, desc, status, id });
        }
        return;
      }
      taskDetail({ title, desc, id }, task.id);
    }
  };

  // function to exit from the form
  const handleCancel = () => {
    handleAddTask();
  };

  return (
    <div>
      <div className="text-center font-extrabold text-5xl mt-5 border-b-2 border-black">
        {
          task.id === '' ? <div><span className="text-green-500">Add</span> Task Form</div> :
            <div><span className="text-gray-500">Edit</span> Task Form</div>
        }
      </div>
      <div className="flex justify-center items-center w-100 mt-[5em]">
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="flex flex-col justify-around border border-blue-600 rounded-md p-2 w-[20em] lg:w-[30em]"
        >
          <label htmlFor="task">Enter Task</label>
          <input
            name="task"
            type="text"
            ref={titleRef}
            className="border border-black rounded-sm"
          />
          <label className="mt-4" htmlFor="task">
            Detailed Description
          </label>
          <textarea
            name="desc"
            ref={descRef}
            className="border border-black rounded-sm p-1 h-[10em]"
          />
          <label className="mt-4" htmlFor="task">
            Status
          </label>
          <div>
            <label className="mt-4 text-red-500" htmlFor="task">
              To Do
            </label>
            <input
              name="status"
              type="radio"
              value={statusValues[0]}
              ref={statusRef1}
              className="border border-black rounded-sm p-1 ml-4"
            />
          </div>
          <div>
            <label className="mt-4 text-yellow-300" htmlFor="task">
              In Progress
            </label>
            <input
              name="status"
              type="radio"
              value={statusValues[1]}
              ref={statusRef2}
              className="border border-black rounded-sm p-1 ml-4"
            />
          </div>
          <div>
            <label className="mt-4 text-green-300" htmlFor="task">
              Completed
            </label>
            <input
              name="status"
              type="radio"
              value={statusValues[2]}
              ref={statusRef3}
              className="border border-black rounded-sm p-1 ml-4"
            />
          </div>
          <div className="w-[70%] flex justify-around mt-5 ml-[30%]">
            <button
              className="border rounded-lg border-black text-green-500 w-20 hover:bg-green-300 hover:text-black p-2"
              type="submit"
            >
              Add
            </button>
            <button
              className="border rounded-lg border-black text-red-500 w-24 hover:bg-red-500 hover:text-black p-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
