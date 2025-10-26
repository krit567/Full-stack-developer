import { defineStore } from 'pinia'
import axios from 'axios'

const URL = "http://localhost:5000";

export const useUserStore = defineStore('User', {
  state: () => ({
    Pin: '',
    listuser: [],
  }),
  actions: {
    async createdUser(userData) {
      try {
        const res = await axios.post(`${URL}/api/register`, userData, {
       headers: {
          'Content-Type': 'application/json'
         }
        })
        console.log('User created:', res)
        return res.data
      }
      catch (e) {
        console.log('error is ', e)
        throw e
      }
    }
  }
})