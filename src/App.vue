<script setup>
import { ref } from "vue";
import ClientDetails from "./components/ClientDetails.vue";
import ChatPage from "./components/ChatPage.vue";

const connectionString = ref("");
const ssl=ref(false)
function connectchat(data) {
  connectionString.value= data.connectionString;
  ssl.value=data.ssl
}
</script>

<template>
  <ChatPage :connectionString="connectionString" :ssl="ssl" v-if="connectionString" />
  <ClientDetails @chatpage="connectchat" v-else />
</template>
