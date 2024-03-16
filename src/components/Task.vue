<script setup>
    import { onMounted, ref } from 'vue';
    import { useTaskStore } from '../stores/task';

    const store = useTaskStore();
    const props = defineProps({
        task: {
        type: Array,
        required: true
        }
    });

    const handleEdit = (e) => {
        const form = e.currentTarget.parentElement.previousElementSibling.children[1];
        const task = form.previousElementSibling;
        const btns = e.currentTarget.parentElement;
        const id = task.id; 

        btns.style.display = "none";
        task.style.display = "none";
        form.style.display = "flex";
        
    };

    const handleSave = (e) => {
        const form = e.currentTarget.parentElement;
        const input = e.currentTarget.previousElementSibling;
        const task = form.previousElementSibling;
        const id = task.id;
        const btns = form.parentElement.nextElementSibling;

        btns.style.display = "flex";
        task.style.display = "block";
        form.style.display = "none";

        store.modifyTask(id, input.value);
    }

    const handleDelete = (e) => {
        const id = e.currentTarget.parentElement.previousElementSibling.children[0].id;

        console.log('clicked', id)
        store.deleteTask(id);
    }
</script>

<template>
    <div class="flex justify-between bg-zinc-800 p-1.5 border border-gray-600 rounded-lg mb-4 p-1.5" v-for="taskData in props.task" :key="taskData.id">
        <div class="w-full">
            <p class="text-white" :id="taskData.id">{{ taskData.task }}</p>
            <form class="flex justify-between w-full hidden" id="form">
                <input class="w-full mr-2 rounded-lg px-2" type="text" :value="taskData.task"> 
                <button @click.prevent="(e) => handleSave(e)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="white" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l2 2l5-5"/></g></svg></button>
            </form>
        </div>
        <div class="flex ml-4">
            <button class="mr-2" @click="(e) => handleEdit(e)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1"/></svg>
            </button>
            <button @click="(e) => handleDelete(e)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8"/></svg></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>