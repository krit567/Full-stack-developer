<script setup>
import { RouterLink } from 'vue-router';
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';
import { useUserStore } from '@/stores/userStore';
import { timestamp } from '@vueuse/core';

const username = ref('');
const messages = ref([]);
const router = useRouter();
const input = ref('');
const userStore = useUserStore();
let socket = null; // ประกาศตัวแปร socket
const logout = async () => {
  userStore.userLogout()
  router.push('/')
}
onMounted(async () => {
    socket = io('http://localhost:5000')
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id)
    });

    socket.on('chat message', (msg) => {
      messages.value.push(msg);
      console.log('Received message:', msg);
    });

    socket.on('join',(username) => {
      messages.value.push({
        username: username,
        message: ` joined the chat`,
        timestamp:new Date().toLocaleTimeString()
      });
    });
})

const sendMessage = () => {
  const inputT = {
    username: username.value || 'Anonymous',
    input: input.value,
    timestamp: new Date().toLocaleTimeString()
  };
  if(inputT.input) {
    socket.emit('chat message',inputT);
    console.log('input.value',input.value);
    console.log('inputT',inputT);
    input.value = '';
  }
}

onUnmounted(() => {
  socket.on('disconnect', (username) => {
      messages.value.push({
        username: username,
        message: ` disconnect the chat`,
        timestamp:new Date().toLocaleTimeString()
      });
      console.log('Disconnected from server')
    });
  socket.disconnect();
})
const isLogin = ref(false); 
const login = () => {
  if (username.value.trim()){
    isLogin.value = true;
    socket.emit('checkuser',username.value);
  }
}
</script>

<template>
  <div>
    <button @click="logout()">logout</button>
    <div v-if="!isLogin">
      <h2>Enter your name to join the chat</h2>
      <input v-model="username" placeholder="Enter your name" />
      <button @click="login">Join Chat</button>
    </div>
    <div v-else>
      <h2>Welcome, {{ username }}</h2>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          <strong>{{ message.username }}</strong>
           <strong>{{ message.message }}</strong>
        </li>
      </ul>

      <form id="form" @submit.prevent="sendMessage">
        <input type="text" v-model="input" autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </div>
</div>
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