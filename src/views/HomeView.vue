<script setup>
import { reactive, ref } from 'vue';
import TaskLists from '../components/TaskLists.vue';
import { useTaskStore} from '../stores/task'; 
import { v4 as uuidv4 } from 'uuid';

const store = useTaskStore();
const newList = reactive({
  id: null,
  title: null,
});

const handleAddList = (e) => {
  const form = e.currentTarget.nextElementSibling;

  form.style.display = "flex";
  e.currentTarget.style.display = "none";
}

const hanldeCreateList = (e) => {
  const form = e.currentTarget.parentElement;
  const addListBtn = form.previousElementSibling;
  
  form.style.display = "none";
  addListBtn.style.display = "flex";

  const input = form.children[0];

  newList.id = uuidv4();
  newList.title = input.value;

  store.addTaskList(newList);

  input.value = "";
}

const handleCancel = (e) => {
  const form = e.currentTarget.parentElement;
  const addListBtn = form.previousElementSibling;

  form.style.display = "none";
  addListBtn.style.display = "flex";
}

</script>

<template>
  <main>
    <div class="m-6 flex gap-16">
      <TaskLists />
      <div class="h-fit">
        <button class="border border-2 rounded-lg flex items-center pl-2 pr-4 py-2 justify-center text-white w-fit" @click="(e) => handleAddList(e)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M5.5 10.5h10m-5-5v10"/></svg><span class="hidden md:inline">Add new list</span></button>
        <form action="" class="hidden">
          <input type="text" class="border border-2 rounded-lg mr-2 bg-zinc-900 text-white px-1 focus:borde-4">
          <button class="text-white" type="submit" @click.prevent="(e) => hanldeCreateList(e)"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="white" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l2 2l5-5"/></g></svg></button>
          <button @click.prevent="(e) => handleCancel(e)"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="white" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 5.5l6 6m0-6l-6 6"/></g></svg></button>
        </form>
      </div>
    </div>
  </main>
</template>
