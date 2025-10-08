<script setup>
import { RouterLink } from 'vue-router';
import { onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';
import { timestamp } from '@vueuse/core';
const username = ref('');
const messages = ref([]);
const input = ref('');
let socket;

onMounted(async () => {
    socket = io('http://localhost:5000')
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('chat message', (msg) => {
      messages.value.push(msg);
      console.log('Received message:', msg);
    })
})

const sendMessage = () => {
  const inputT = {
    username: username.value || 'Anonymous',
    input: input.value.trim(),
    timestamp: new Date().toLocaleTimeString()
  };
  if(inputT) {
    socket.emit('chat message',inputT);
    console.log('input.value',input.value);
    console.log('inputT',inputT);
    input.value = '';
  }
}

onUnmounted(() => {
  socket.disconnect();
})

const login = () => {
  if (username.value.trim()){
    isLogin.value = true
    socket.emit('checkuser',username.value);
  }
}
</script>

<template>
  <ul id="messages">
    <div class="center">Message</div>
    <li v-for="(message, index) in messages" :key="index">{{ message.username }} {{ message.message }} {{ message.timestamp }}</li>

  </ul>
  <form id="form" @submit.prevent="sendMessage">
    <input type="text" v-model="input" autocomplete="off" />
    <button type="submit">Send</button>
  </form>
</template>

 <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }

      .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px; /* หรือกำหนดความสูงตามที่ต้องการ */
        text-align: center;
      }
    </style>