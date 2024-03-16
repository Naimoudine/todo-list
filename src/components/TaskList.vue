<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '../stores/task';
import Task from '../components/Task.vue';

const store = useTaskStore();
const props = defineProps({
    tasks: {
      type: Array,
      required: true
    }
  });

</script>

<template>
  <div>
    <Task :task="props.tasks"/>
  </div>
</template>
