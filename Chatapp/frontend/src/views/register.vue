<script setup>
import {ref} from 'vue'
import { useUserStore } from '@/stores/User'
import { useRouter } from 'vue-router'
const route = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const nickname = ref('')

const register = async () => {
    const userData = {
        username: username.value,
        password: password.value,
        nickname: nickname.value
    };

    if (!userData.username || !userData.password || !userData.nickname) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    try{
        await userStore.createdUser(userData)
        alert('ลงทะเบียนสำเร็จ!')
        route.push('/')
    }catch(err){
        console.log('error is ',err)
        alert('เกิดข้อผิดพลาดในการลงทะเบียน')
        return err
    }
}
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
    <input type="submit" value="เรียบร้อย"  @click="register" >
</template>