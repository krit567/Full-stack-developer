import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useHomeStore = defineStore('home', {
  state : () => ({
    message : ref('Hello welcome to my Home Page')
  }),
  getters : {
   krit(state) {
    return `${state.message} my name is krit`
   }
  },
  actions : {

  }
})
