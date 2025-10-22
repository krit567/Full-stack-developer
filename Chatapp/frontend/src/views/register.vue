<script setup>
import {ref} from 'vue'
import {computed} from 'vue'
const username = ref('')
const password = ref('')
const nickname = ref('')
const data = computed(()=> ({
    username : username.value,
    password: password.value,
    nickname : nickname.value}));
const checkbox = ref(false)
</script>

<template>
    <h1>register</h1>
    <br>
    <input type="text" v-model="username">username
    <br>
    <input :type="checkbox ? 'text' : 'password'" v-model="password">password
    <input type="checkbox" v-model="checkbox">
    <br>
    <input type="text" v-model="nickname">nickname
    <input type="submit" value="เรียบร้อย"  @click="console.log(data)" >
</template>