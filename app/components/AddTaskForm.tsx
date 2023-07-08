import React, { FormEvent, useReducer, useRef } from "react";
import { taskProp } from "../page";

type ChildProps = {
  handleAddTask: () => void;
  taskDetail: (task: taskProp) => void;
}
const AddTaskForm: React.FC<ChildProps> = ({ handleAddTask, taskDetail }) => {

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const statusRef1 = useRef<HTMLInputElement>(null);
  const statusRef2 = useRef<HTMLInputElement>(null);
  const statusRef3 = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddTask();
    if (titleRef.current && descRef.current) {
      const title = titleRef.current.value;
      const desc = descRef.current.value;
      if (statusRef1.current && statusRef1.current.checked) {
        const status = statusRef1.current.value
        taskDetail({title, desc, status})
      }
      if (statusRef2.current && statusRef2.current.checked) {
        const status = statusRef2.current.value
        taskDetail({title, desc, status})
      }
      if (statusRef3.current && statusRef3.current.checked) {
        const status = statusRef3.current.value
        taskDetail({title, desc, status})
      }
    }
  };

  const handleCancel = () => {
    handleAddTask();
  };

  return (
    <div className="flex justify-center items-center w-100 mt-[5em] md:mt-[10em] lg:mt-[15em]">
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
            Not Complete
          </label>
          <input
            name="status"
            type="radio"
            value='Not Completed'
            ref={statusRef1}
            className="border border-black rounded-sm p-1 ml-4"
          />
        </div>
        <div>
          <label className="mt-4 text-yellow-300" htmlFor="task">
            On Going
          </label>
          <input
            name="status"
            type="radio"
            value='On Going'
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
            value='Completed'
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
  );
};

export default AddTaskForm;
