import { defineStore } from "pinia";
import axios from "axios";
export const useHomeStore = defineStore("home", {
  state: () => ({
    message: "Hello welcome to my Home Page",
    description: "This is a description",
    loading: false,
    error: null,
    Name: null,
  }),
  getters: {
    krit(state) {
      return `${state.message} my name is krit`;
    },
  },
  actions: {
    setName(newName) {
      this.message = this.message + newName;
      return  `${this.message}`
    },
  },
});
