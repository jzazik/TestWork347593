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
      user: null,
      mode: "",
    };
  },
  actions: {
    async editUser({ commit }, form) {
      const { data } = await $http.put("users/" + form.id, form);
      commit("SET_MODAL_NAME", "");
      commit("SET_USERS", data.data);
    },
    async addUser({ commit }, form) {
      const { data } = await $http.post("users", form);
      this.dispatch("closeModal");
      commit("ADD_USER", data.data);
      commit("SET_USER", null);
    },
    async removeUser({ commit }, user) {
      const { data } = await $http.delete("users/" + user.id);
      commit("SET_USERS", data.data);
    },
    editUserInit({ commit }, user) {
      commit("SET_MODE", "edit");
      commit("SET_USER", { ...user });
      this.dispatch("setModalName", "addUser");
    },
    addUserInit({ commit }) {
      commit("SET_USER", null);
      commit("SET_MODE", "add");
      this.dispatch("setModalName", "addUser");
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
    SET_USER(state, user) {
      state.user = user;
    },
    SET_MODE(state, mode) {
      state.mode = mode;
    },
  },
});

export default store;
