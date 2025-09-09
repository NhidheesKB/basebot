<template>
  <div
    class="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="mx-auto flex w-full max-w-3xl items-end gap-2">
      <div class="flex-1">
        <label for="message" class="sr-only">Your message</label>
        <div class="relative">
          <textarea
            id="message"
            rows="1"
            v-model="message"
            placeholder="Ask related to your database"
            class="block w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-900"
          ></textarea>
          <div
            class="pointer-events-none absolute bottom-3 right-3 text-[10px] text-gray-400"
          >
            Enter ↵
          </div>
        </div>
      </div>
      <button
        @click="sendMessage"
        :disabled="props.isdisabled"
        :class="[
          'inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-white',
          'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700',
          props.isdisabled? 'opacity-50 cursor-not-allowed' : '',
        ]"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["NewMessage"]);
const props = defineProps({
  isdisabled:{
    type:Boolean,
    reqired:true
  }
})
let wrapmessage = ref({});
const message = ref("");
function sendMessage() {
  const time = new Date().toLocaleTimeString();
  wrapmessage.value = {
    sender: "user",
    message: message.value,
    time,
  };
  if (message && wrapmessage.value.message != "")
    emit("NewMessage", wrapmessage), (message.value = "");
}
</script>
