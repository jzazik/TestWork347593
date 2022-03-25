import { createStore } from "vuex";
import axios from "axios";

const $http = axios.create({
  baseURL: "http://localhost/api/",
});

const store = createStore({
  state() {
    return {
      modalName: "",
      users: [],
    };
  },
  actions: {
    async addUser({ commit }, form) {
      const { data } = await $http.post("users", form);
      this.dispatch("closeModal");
      commit("ADD_USER", data.data);
    },
    setModalName({ commit }, name) {
      commit("SET_MODAL_NAME", name);
    },
    closeModal({ commit }) {
      commit("SET_MODAL_NAME", "");
    },
    async getUsers({ commit }) {
      const { data } = await $http.get("users");
      commit("SET_USERS", data.data);
    },
  },
  mutations: {
    SET_MODAL_NAME(state, name) {
      state.modalName = name;
    },
    ADD_USER(state, form) {
      state.users.push(form);
    },
    SET_USERS(state, data) {
      state.users = data;
    },
  },
});

export default store;
