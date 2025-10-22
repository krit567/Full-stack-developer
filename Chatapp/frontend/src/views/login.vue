<script setup>
import {ref } from 'vue'
import { RouterLink } from 'vue-router' 
const username = ref('')
const password = ref('')
const checkbox = ref(false)
const checkuser = () => {
    console.log(username.value, password.value);
}
</script>
<template> 
<div>
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="username">username
    <br>
    <input :type = "checkbox ?'text' : 'password'" v-model="password" placeholder="password">password
    <input type="checkbox" v-model="checkbox" @change="console.log(password)">
    <br>
    <input type="submit" value="Login" @click="checkuser">
    <RouterLink to="/register">
        <button > สมัคร</button>
    </RouterLink>
</div>
</template>