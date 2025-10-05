<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import io from 'socket.io-client';
onMounted(() => {
    const socket = io('http://localhost:5000')
})
</script>

<template>
    <!-- Alert Section -->
  <div class="container mx-auto p-4">
    <div role="alert" class="alert alert-success flex items-center gap-2 p-4 rounded-lg shadow-md bg-green-100 text-green-800">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Your purchase has been confirmed!</span>
    </div>
</div>
    <!-- Alert Section -->
    <!-- Mockup Window Section -->
    <div class="mockup-window border border-base-300 rounded-lg shadow-md mt-6"> 
        <!-- mockup-window ใช้สร้างกล่องจำลอง
border และ border-base-300 ใช้เพิ่มเส้นขอบและกำหนดสี
rounded-lg และ shadow-md ใช้เพิ่มความสวยงาม
mt-6 ใช้เพิ่มช่องว่างด้านบนเพื่อให้ layout ดูเป็นระเบียบ  -->

      <div class="grid place-content-center border-t border-base-300 h-80 bg-gray-100 text-gray-800">
        <div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
    </div>
  </div>
  <div class="chat-header">
    Obi-Wan Kenobi
    <time class="text-xs opacity-50">12:45</time>
  </div>
  <div class="chat-bubble">You were the Chosen One!</div>
  <div class="chat-footer opacity-50">Delivered</div>
</div>
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
    </div>
  </div>
  <div class="chat-header">
    Anakin
    <time class="text-xs opacity-50">12:46</time>
  </div>
  <div class="chat-bubble">I hate you!</div>
  <div class="chat-footer opacity-50">Seen at 12:46</div>
</div>
      </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  display: none ;
}
</style>