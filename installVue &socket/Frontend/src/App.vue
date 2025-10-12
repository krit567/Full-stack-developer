<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { io } from "socket.io-client"

onMounted(() => {
  const socket = io('http://localhost:5000')
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
