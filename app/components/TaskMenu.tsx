import React from 'react';
import { taskProp } from '../page';
type childProps = {
    tasks: taskProp[];
}
const TaskMenu: React.FC<childProps> = ({ tasks }) => {
    return (
        <div className='mx-5 lg:mx-[20em] border border-black mt-[5em] md:mt-[10em]'>
            {
              tasks.map((task, idx) => (
                <div key={idx}>
                  <div>{task.title}</div>
                  <div>{task.desc}</div>
                  <div>{task.status}</div>
                </div>
              ))
            }
        </div>
    );
}

export default TaskMenu;