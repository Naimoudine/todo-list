import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useTaskStore = defineStore('task', () => {
  const taskLists = reactive([
    { id:1, title: "Not started", taskList: reactive([{id:1, task:"faire à manger"}, {id:2, task:"coder"}, {id:3, task:"dormir"}]) }
  ]);

  const addTaskList = (newList) => {
    if(newList) {
      const alreadyExist = taskLists.find(el => el.id === newList.id);
      if(!alreadyExist){
        const list = {
          id: newList.id,
          title: newList.title,
          taskList: []
        }
        taskLists.push(list);
      } else {
        console.log("already exists");
      };
    };
  }

  const deleteTaskList = (id) => {
    const taskListExists = taskLists.find(el => el.id === id);
    if(taskListExists) {
      const newTaskLists = taskLists.filter(el => el.id !== id);
      taskLists.splice(0, taskLists.length, ...newTaskLists);
    }
  }

  const addTask = (newTaskData) => {
    if(newTaskData) {
      const { id, task } = newTaskData; 
      const taskList = taskLists.find(el => el.id === id).taskList; 
      if(taskList) {
        const newTask = {id: uuidv4(), task}
        taskList.push(newTask);
      }
    }
  }

  const modifyTask = (id, newTask) => {
    const taskExists = taskLists.find(el => el.taskList.find(el => el.id === id));
    if(taskExists) taskExists.taskList.find(el => el.id === id).task = newTask;
  }

  const deleteTask = (id) => {
    const taskExists = taskLists.find(el => el.taskList.find(el => el.id === id));
    if(taskExists) {
      const newTaskList = taskExists.taskList.filter(el => el.id !== id);
      taskExists.taskList.splice(0, taskExists.taskList.length, ...newTaskList);
    }
  }

  return { taskLists, addTaskList, deleteTaskList, addTask, modifyTask, deleteTask }
})
