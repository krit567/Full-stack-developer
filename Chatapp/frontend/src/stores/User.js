import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
const URL = "http://localhost:5000";

export const useUserStore = defineStore('User', {
  state: () => ({
    Pin: '',
    listuser: [],
  }),
  actions: {
    envdata(data) {
      try {
        return JSON.stringify(data)
      } catch (err) {
        console.log(err)
      }
    },
    denv(envdata) {
      try {
        return JSON.parse(envdata)
      } catch (err) {
        console.log('error denv parser ', err)
      }
    },
    userLogout() {
      localStorage.removeItem('data_auth')
    },

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
    },
    async userLogin(username, password) {
      try {
        const res = await axios.post(`${URL}/api/login`, {
          username: username,
          password: password
        })
        if (res.status == 200) {
          const { token: token, payload: { user } } = res.data // สร้างตัวแปร user และ token
          const data = this.envdata({
            token: token,
            id: user.userid,
            username: user.username
          })
          localStorage.setItem('data_auth', data)
          console.log(token)
          console.log(user)
          console.log(data)
          return { status: 200, success: true, message: 'Login successful' }
        } else {
          return { status: res.status, success: false, message: 'Login failed' };
        }

      } catch (err) {
        console.error('Error in userLogin:', err)
        return { 
          status: err.response?.status || 500, 
          success: false, 
          message: err.response?.data?.message || 'An error occurred during login' 
        }
      }
    },
  }
})