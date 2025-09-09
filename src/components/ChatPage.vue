<template>
  <div
    class="h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen grid grid-rows-[auto_1fr]"
  >
    <ChatHeader />
    <div class="grid h-full">
      <section class="flex h-[calc(100dvh-3.5rem)] flex-col">
        <div id="messages" class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div class="mx-auto w-full max-w-3xl space-y-6">
            <OldChat :OldMessage="oldMessages" />
            <TypingIndicator :is="typeindication" />
          </div>
        </div>
        <Composer @NewMessage="recentmessage" :isdisabled="isdisabled" />
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ChatHeader from "./chat-components/ChatHeader.vue";
import Composer from "./chat-components/Composer.vue";
import OldChat from "./chat-components/OldChat.vue";
import TypingIndicator from "./chat-components/TypingIndicator.vue";
import axios from "axios";
const props = defineProps([
  "oldMessages",
  "connectionString",
  "ssl",
  "isdisabled",
]);
const isdisabled = ref(false);
const typeindication = ref(false);
const oldMessages = ref([]).value;
const tabledata = ref([]).value;
let headers = ref([]).value;
const connectionString = props.connectionString;
const sslmode = props.ssl;
const currentTime = () => {
  return new Date().toLocaleTimeString();
};
window.addEventListener("beforeunload", (event) => {
  event.returnValue = true;
});
oldMessages.push({
  sender: "ai",
  message: "Hi! How can I help you today?",
  time: currentTime(),
});
async function recentmessage(data) {
  oldMessages.push({
    sender: data.value.sender,
    message: data.value.message,
    time: data.value.time,
  });
  typeindication.value = true;
  isdisabled.value = true;
  try {
    const message = data.value.message;
    const response = await axios.post("/api/chat", {
      connectionString,
      message,
      sslmode,
    });
    isdisabled.value = false;
    if (response.data.aimessage)
      return (
        (typeindication.value = false),
        oldMessages.push({
          sender: "ai",
          message: response.data.aimessage,
          time: currentTime(),
        })
      );
    const tableresponse = response.data.tabledData;
    tabledata.length = 0;
    tableresponse.forEach((row) => {
      tabledata.push(row);
    });
    typeindication.value = false;
    if (tabledata.length > 0) {
      headers = [...new Set(tabledata.flatMap((row) => Object.keys(row)))];
    }
    oldMessages.push({
      sender: "ai",
      message: response.data.message,
      data: [...tabledata],
      headers: [...headers],
      time: currentTime(),
    });
  } catch (error) {
    typeindication.value = false;
    isdisabled.value = false;
    oldMessages.push({
      sender: "ai",
      message: "Something Went Wrong",
      time: currentTime(),
    });
  }
}
</script>
