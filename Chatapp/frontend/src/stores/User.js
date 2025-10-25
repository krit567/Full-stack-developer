import { defineStore } from 'pinia'
import axios from 'axios'

const URL = "http://localhost:5000";

export const useUserStore = defineStore('User',{
  state: () => ({
    Pin : '',
    user : [],
  }),
  actions:{
    async createUser(username,password,nickname){
      try {
      const  userData = {
        username : '',
        password : '',
        nickname : ''
    }
      const res = await axios.post(`${URL}/auth/register`,userData)
      this.userData = res.data
      }
      catch(e){
        console.log(e)
      }
    }
  }
})