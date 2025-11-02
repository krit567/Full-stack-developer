<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useSocketStore } from '@/stores/socketStore'

const router = useRouter()
const userStore = useUserStore()
const socketStore = useSocketStore()

const username = ref('')
const input = ref('')
const isLogin = ref(false)

// Logout
const logout = async () => {
  socketStore.disconnectSocket()
  userStore.userLogout()
  router.push('/')
}

// เมื่อ component ถูก mount
onMounted(() => {
  // เชื่อมต่อ socket
  socketStore.connectSocket()
})

// เมื่อ component ถูก unmount
onUnmounted(() => {
  // ตัดการเชื่อมต่อ socket
  socketStore.disconnectSocket()
})

// Login เข้าแชท
const login = () => {
  if (username.value.trim()) {
    isLogin.value = true
    // ตรวจสอบ user ผ่าน socket
    socketStore.checkUser(username.value)
  }
}

// ส่งข้อความ
const sendMessage = () => {
  if (input.value.trim()) {
    socketStore.sendMessage(input.value)
    input.value = ''
  }
}
</script>

<template>
  <div>
    <button @click="logout()">Logout</button>
    
    <!-- แสดงสถานะการเชื่อมต่อ -->
    <div>
      Status: {{ socketStore.isConnected ? '🟢 Connected' : '🔴 Disconnected' }}
    </div>
    
    <!-- หน้า Login -->
    <div v-if="!isLogin">
      <h2>Enter your name to join the chat</h2>
      <input v-model="username" placeholder="Enter your name" />
      <button @click="login">Join Chat</button>
    </div>
    
    <!-- หน้าแชท -->
    <div v-else>
      <h2>Welcome, {{ username }}</h2>
      <p>Online users: {{ socketStore.onlineUsersCount }}</p>
      
      <!-- แสดงข้อความ -->
      <ul>
        <li v-for="(message, index) in socketStore.getAllMessages" :key="index">
          <strong>{{ message.username }}</strong>: {{ message.message }}
          <span v-if="message.timestamp"> ({{ message.timestamp }})</span>
        </li>
      </ul>

      <!-- ฟอร์มส่งข้อความ -->
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="input" placeholder="Type a message..." autocomplete="off" />
        <button type="submit">Send</button>
      </form>
      
      <!-- ปุ่มล้างข้อความ -->
      <button @click="socketStore.clearMessages()">Clear Messages</button>
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 5px;
  padding: 10px;
}

input {
  padding: 8px;
  margin: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 5px 0;
  background: #f0f0f0;
  border-radius: 5px;
}
</style>
