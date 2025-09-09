<template>
  <div v-for="(value, index) in messages" :key="index">
    <div class="flex items-start gap-3" v-if="value.sender == 'ai'">
      <div
        class="h-9 w-9 shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium"
      >
        AI
      </div>
      <div class="w-full">
        <div
          class="inline-block rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
          <table v-if="value.data?.length > 0 && value.headers?.length > 0">
            <thead>
              <tr>
                <th
                  class="border border-gray-300 px-2 py-1"
                  v-for="(value, index) in value.headers"
                  :key="index"
                >
                  {{ value }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rIndex) in value.data" :key="rIndex">
                <td
                  v-for="(header, hIndex) in value.headers"
                  :key="hIndex"
                  class="border border-gray-300 px-2 py-1"
                >
                  {{ row[header] }}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            :class="
              value.data?.length > 0 && value.headers?.length > 0 ? 'pt-10' : ''
            "
          >
            {{ value.message }}
          </div>
        </div>
        <div class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
          {{ value.time }}
        </div>
      </div>
    </div>
    <div v-else class="flex gap-3 justify-end">
      <div class="max-w-[80%] pl-auto md:pl-90 sm:pl-70">
        <div
          class="ml-auto inline-block rounded-2xl rounded-tr-md bg-indigo-600 px-4 py-3 text-sm text-white shadow-sm"
        >
          {{ value.message }}
        </div>
        <div
          class="mt-1 text-right text-[11px] text-gray-500 dark:text-gray-400"
        >
          {{ value.time }} • Delivered
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  OldMessage: {
    type: Array,
    required: true,
  },
});
const messages = ref([...props.OldMessage]);
watch(
  () => props.OldMessage,
  (newMessage) => {
    messages.value = [...newMessage];
  },
  { deep: true }
);
</script>
