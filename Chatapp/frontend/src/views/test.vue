<script setup>
import { useWaitRoomStore } from '@/stores/WaitRoom';
import { ref } from 'vue';
import { onMounted } from 'vue';
const Pin = ref('')
const Wait = useWaitRoomStore()

onMounted(() => {
    Pin.value = '100000'
})
</script>

<template>
    <h1>Test Page</h1>
    <button @click="Wait.createRoom">Generate PIN</button>
    <div>number : {{ Wait.Pin}}</div>

</template>