import React, { useContext, useEffect, useState } from 'react'
import './wrapper.css';
import { CredentialsContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiSquareRemove } from 'react-icons/ci';
import { v4 as uuidv4 } from "uuid";

const Wrapper = () => {
  const [tasks, setTask] = useState([]);
  const [todoTask, setTodoText] = useState("");
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [completedFilter, setCompletedFilter] = useState(false);
  const [uncompletedFilter, setUncompletedFilter] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('username', null);
    localStorage.setItem('password', null)
    setCredentials(null);
    navigate("/")
  };

  useEffect(() => {
    let storedUsername = localStorage.getItem('username');
    let storedPassword = localStorage.getItem('password');
    

    if (storedUsername && storedPassword) {
      setCredentials({ username: storedUsername, password: storedPassword });
     
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${storedUsername}:${storedPassword}`
      }
    };

    axios
      .get('http://localhost:3001/tasks', config)
      .then((response) => {
        setTask(response.data.tasks);
      });
  }, [setCredentials]);

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
    delete_task(id);
    console.log(id)
  }


  const delete_task = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      }
    };
  
    axios
      .delete(`http://localhost:3001/tasks/${id}`, config)
      .then(() => {
        console.log(`Task with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting task with ID ${id}: ${error.message}`);
      });
  };
  
  const addTask = (e) => {
    e.preventDefault();
    if (!todoTask) return;
    const newTask = { id: uuidv4(), checked: false, text: todoTask }
    const newTasks = [...tasks, newTask]
    setTask(newTasks);
    setTodoText("")
    post_todo(newTasks);
  }

  const post_todo = (newTasks) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      }
    };

    axios
      .post('http://localhost:3001/tasks', newTasks, config)
      .then(() => { })
  };


  const toggletodo = (id) => {
    const newTaskList = [...tasks];
    const taskItem = newTaskList.find((task) => task.id === id);
    taskItem.checked = !taskItem.checked;
    setTask(newTaskList);
    post_todo(newTaskList);
  }


  const getTask = () => {
    return tasks?.filter((task) => {
      const isCompleted = task.checked;
      if (completedFilter && uncompletedFilter) {
        return true;
      } else if (completedFilter) {
        return isCompleted;
      } else if (uncompletedFilter) {
        return !isCompleted;
      }
      return true;
    }) || [];
  };



  return (
    <div className='wrapper_app'>
      <h1 className='wel_h1'>Welcome {credentials?.username}</h1>
      <div className='wrapper'>
        <div className='container'>
          <div className='headers'>
            <h1>{credentials?.username}'s Todo List</h1>
            <div className='logout_btn'>{credentials && <button className='log' onClick={logout}>Logout</button>}</div>
          </div>
          <form onSubmit={addTask} className='form'>
            <input
              type="text"
              value={todoTask}
              onChange={(e) => setTodoText(e.target.value)}
              className='input_text'
              placeholder=' Enter your new Task' />
            <button type="submit">Add Task</button>
          </form>
          <div className='filter-checkboxes'>
            <p className='filter'>Completed</p>
            <label className='switch'>
              <input
                type="checkbox"
                checked={completedFilter}
                onChange={() => setCompletedFilter(!completedFilter)}
              />
              <span className="slider round"></span>
            </label>
            <p className='filter'>Incompleted</p>
            <label className='switch'>
              <input
                type="checkbox"
                checked={uncompletedFilter}
                onChange={() => setUncompletedFilter(!uncompletedFilter)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          {getTask().map((task) => (
            <div className='task' key={task.id}>
              <ul>
                <div className='text'><label>{task.text}</label></div>
                <div className='delete' onClick={() => removeTask(task.id)}><CiSquareRemove /></div>
                <div className="containe">
                  <label className='switch'>
                    <input
                      onChange={() => toggletodo(task.id)}
                      type="checkbox"
                      checked={task.checked}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </ul>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wrapper;
