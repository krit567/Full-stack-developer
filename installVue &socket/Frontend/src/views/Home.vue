<script setup>
import { ref, onMounted } from 'vue';
import { useHomeStore } from '@/stores/Home';
import { io } from "socket.io-client"
const krit = ref('krit');
const home = useHomeStore();
const Name = window.prompt("enter your name : ")
home.setName(Name)
const name = ref(Name);

onMounted(() => {
  const socket = io('http://localhost:5000')
});

</script>

<template>
    <div class="flex">
        <h1>
            Krit
        </h1>
        <h3>
            {{ home.krit }}
        </h3>
    </div>
<h1>Hello welcome to my Home Page</h1>
{{`Message` + home.message }}
{{ name }}
</template>