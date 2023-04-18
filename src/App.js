import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import AddTaskList from './Components/AddTaskList/AddTaskList';
import UpdateTaskList from './Components/UpdateTaskList/UpdateTaskList';
import TaskList from "./Components/TaskList/TaskList"
import { v4 as uuidv4 } from 'uuid';

function App() {

  // tasks state
  const [toDo, setToDo] = useState([]);

  //temp state 
  const [newTask, setNewTask] = useState('');

  const [updateData, setUpdateData] = useState('');

  //add task 
  const addTask = () => {
    if (newTask) {
      let newEntryObj = {
        id: toDo.length > 0 ? Math.max(...toDo.map(task => task.id)) + 1 : 1,
        // id: uuidv4(),//генерируем уникальный id
        title: newTask,
        status: false,
      }
      setToDo([...toDo, newEntryObj]);
      setNewTask("");//clear input field
    }
  }

  //delete task 
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id);
    // const index = toDo.findIndex(task => task.id === id);
    // const newTasks = [...toDo.slice(0, index), ...toDo.slice(index + 1)];
    setToDo(newTasks);
  }

  //mark task as done 
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  //cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  }

  //Change Task
  const changeTask = (e) => {
    let newEntryObj = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setUpdateData(newEntryObj);
  }

  //Change Task
  const updateTask = () => {
    let filterRecord = toDo.filter(task => task.id !== updateData.id);
    let updatedArr = [...filterRecord, updateData];
    setToDo(updatedArr);
    setUpdateData("")
  }

  return (
    <div className="container App">
      <br /><br />
      <h2>To Do List</h2>
      <br /><br />

      {/* {updateData && updateData ? ( */}
      {updateData ? (
        <>
          <UpdateTaskList
            updateData={updateData}
            changeTask={changeTask}
            updateTask={updateTask}
            cancelUpdate={cancelUpdate}
          />
        </>
      ) : (
        <>
          <AddTaskList
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        </>
      )}

      {/* {toDo && toDo.length ? '' : "Currently there are no tasks"} */}
      {toDo.length ? '' : "Currently there are no tasks"}

      <TaskList
        toDo={toDo}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
        markDone={markDone}
      />
    </div>
  );
}

export default App;






