import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const URL = "http://localhost:5000";
export const useUserStore = defineStore('User',{
  state: () => ({
    Pin : ref(''),
    UserData : {
        username : ref(''),
        password : ref(''),
        nickname : ref('')
    }
  }),
  actions:{
    async createUser(){
      try {
      const res = await axios.get(`${URL}/api/pin`)
      this.Pin = res.data
      }
      catch(e){
        console.log(e)
      }
    }
  }
})