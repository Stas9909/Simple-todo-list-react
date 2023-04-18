import React from 'react';
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TaskList = ({ toDo, setUpdateData, deleteTask, markDone }) => {
  return (
    <>
      {toDo && toDo.map((task, index) => {
        return (
          <React.Fragment key={task.id}>
            <div className="col taskBg">
              <div className={task.status ? 'done' : ''}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed" onClick={() => markDone(task.id)}>
                  {/* <button className='button'>Check</button> */}
                  <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </span>

                {task.status ? null : (
                  <span title="Edit"
                    onClick={(e) => setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false,
                    })}>
                    {/* <button className='button'>Edit</button> */}
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </span>
                )}

                <span title="Delete" onClick={() => deleteTask(task.id)}>
                  {/* <button className='button'>Delete</button> */}
                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </>
  );
}

export default TaskList;