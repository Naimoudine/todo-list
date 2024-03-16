<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useTaskStore } from '../stores/task';
import TaskList from './TaskList.vue';

const store = useTaskStore();
const newTask = reactive({
  task: null,
  id: null
});
const currentTask = ref();

const handleAddTask = (e) => {
  const input = e.currentTarget.previousSibling;
  const id = e.currentTarget.id;

  newTask.id = id;
  newTask.task = input.value;

  store.addTask(newTask);
  input.value = "";
};

const hundleListDelete = (e) => {
  store.deleteTaskList(e.currentTarget.id)
}

</script>

<template>
  <div class="min-w-[280px] max-w-[280px] h-fit p-2 rounded-lg bg-zinc-800 group" v-for="taskListsData in store.taskLists":key=store.taskLists.id>
    <div class="flex justify-between items-center ">
        <h3 class="mb-4 text-white font-semibold mb-0">{{ taskListsData.title}}</h3>
        <svg class="hidden group-hover:block cursor-pointer" xmlns="http://www.w3.org/2000/svg" :id="taskListsData.id" @click="(e) => hundleListDelete(e)" width="18" height="18" viewBox="0 0 21 21"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8"/></svg>
      </div>
      <div v-if="taskListsData.taskList.length > 0">
        <TaskList :tasks="taskListsData.taskList"/>
      </div>
      <form action="" class="flex justify-between mb-2">
        <input type="text" name="" id="" class="border border-2 rounded-lg mr-2 w-full px-1">
        <button type="submit" :id="taskListsData.id" @click.prevent="(e) => handleAddTask(e)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M10 19c4.438 0 8-3.526 8-7.964C18 6.598 14.438 3 10 3c-4.438 0-8 3.598-8 8.036S5.562 19 10 19m-4-8h8m-4 4.056V7z"/></svg></button>
      </form>
    </div>
</template>