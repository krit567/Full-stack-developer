<script setup>
import {ref } from 'vue'
import { RouterLink } from 'vue-router' 
import { useUserStore } from '@/stores/User'
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const checkbox = ref(false)
const checkuser = async () => {
    try{
        console.log(username.value, password.value);
        const res = await userStore.userLogin(username.value, password.value)
        
        // ตรวจสอบว่า res มีค่าและ login สำเร็จ
        if (res && res.success && res.status === 200) {
            await console.log(res)
            console.log('Login successful, navigating to /chatapp')
            router.push('/chatapp')
        } else {
            console.error('Login failed:', res?.message || 'Unknown error')
            alert('Login failed: ' + (res?.message || 'Unknown error'))
        }
    }catch(err){
        console.error('Error in login page:', err)
        alert('An error occurred during login.')
    }
}
</script>
<template> 
<div>
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="username">username
    <br>
    <input :type = "checkbox.value ?'text' : 'password'" v-model="password" placeholder="password">password
    <input type="checkbox" v-model="checkbox" @change="console.log(password)">
    <br>
    <input type="submit" value="Login" @click="checkuser">
    <RouterLink to="/register">
        <button > สมัคร</button>
    </RouterLink>
</div>
</template>