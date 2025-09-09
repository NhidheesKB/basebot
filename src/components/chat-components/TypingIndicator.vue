<template>
  <div class="flex items-start gap-3"  v-if="props.is">
    <div
      class="h-9 w-9 shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium"
    >AI</div>
    <div
      class="inline-flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
    >
      <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
      <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]"></span>
      <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]"></span>
    </div>
  </div>
</template>

<script setup>
const props=defineProps({
  is:{
    type:Boolean,
    required:true
  }
})
</script>