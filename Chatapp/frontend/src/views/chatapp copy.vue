<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';

const messages = ref([])
const input = ref('')
const username = ref('')
const roomNumber = ref('')
const currentRoom = ref('')
const isLoggedIn = ref(false)
let socket

const joinRoom = () => {
  const name = username.value.trim()
  const room = roomNumber.value.trim()
  
  if (name && room) {
    // เชื่อมต่อกับ socket และ join room
    socket = io('http://localhost:5000')
    
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id)
      // ส่งข้อมูลผู้ใช้และห้องไปยัง server
      socket.emit('join room', { username: name, room: room })
    })

    socket.on('room joined', (data) => {
      currentRoom.value = data.room
      isLoggedIn.value = true
      console.log(`Joined room: ${data.room}`)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('chat message', (data) => {
      messages.value.push(data)
      console.log('Received message:', data)
    })

    socket.on('user joined', (data) => {
      messages.value.push({
        username: 'System',
        message: `${data.username} เข้าร่วมห้อง`,
        timestamp: new Date().toLocaleTimeString()
      })
    })

    socket.on('user left', (data) => {
      messages.value.push({
        username: 'System',
        message: `${data.username} ออกจากห้อง`,
        timestamp: new Date().toLocaleTimeString()
      })
    })
  }
}

const sendMessage = () => {
  const inputT = input.value.trim()
  if (inputT && socket) {
    socket.emit('chat message', {
      username: username.value,
      message: inputT,
      room: currentRoom.value,
      timestamp: new Date().toLocaleTimeString()
    })
    input.value = ''
  }
}

const leaveRoom = () => {
  if (socket) {
    socket.emit('leave room', { username: username.value, room: currentRoom.value })
    socket.disconnect()
  }
  isLoggedIn.value = false
  messages.value = []
  currentRoom.value = ''
}
</script>

<template>
  <div class="chat-container">
    <!-- หน้า Login -->
    <div v-if="!isLoggedIn" class="login-form">
      <h2>เข้าสู่ห้องแชท</h2>
      <div class="form-group">
        <label>ชื่อของคุณ:</label>
        <input 
          type="text" 
          v-model="username" 
          placeholder="กรอกชื่อ" 
          autocomplete="off"
          @keyup.enter="joinRoom"
        />
      </div>
      <div class="form-group">
        <label>เลขห้อง:</label>
        <input 
          type="text" 
          v-model="roomNumber" 
          placeholder="กรอกเลขห้อง" 
          autocomplete="off"
          @keyup.enter="joinRoom"
        />
      </div>
      <button @click="joinRoom" :disabled="!username.trim() || !roomNumber.trim()">
        เข้าร่วมห้อง
      </button>
    </div>

    <!-- หน้าแชท -->
    <div v-else class="chat-room">
      <div class="chat-header">
        <h3>ห้อง: {{ currentRoom }} | ชื่อ: {{ username }}</h3>
        <button @click="leaveRoom" class="leave-btn">ออกจากห้อง</button>
      </div>
      
      <div class="messages-container">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span class="username">{{ message.username }}:</span>
          <span class="message-text">{{ message.message }}</span>
          <span class="timestamp">{{ message.timestamp }}</span>
        </div>
      </div>
      
      <form @submit.prevent="sendMessage" class="message-form">
        <input 
          type="text" 
          v-model="input" 
          placeholder="พิมพ์ข้อความ..." 
          autocomplete="off"
        />
        <button type="submit" :disabled="!input.trim()">ส่ง</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.login-form {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.chat-room {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.chat-header {
  background: #007bff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leave-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.messages-container {
  height: 400px;
  overflow-y: auto;
  padding: 15px;
  background: #f9f9f9;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.username {
  font-weight: bold;
  color: #007bff;
}

.message-text {
  margin-left: 10px;
}

.timestamp {
  float: right;
  font-size: 12px;
  color: #666;
}

.message-form {
  display: flex;
  padding: 15px;
  background: white;
}

.message-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.message-form button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.message-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>