<template>
  <header class="flex justify-between">
    <h1>Users</h1>
    <div class="button" @click="addUser">+ Add user</div>
  </header>
  <main>
    <users-table />
  </main>
  <user-modal />
</template>

<script>
import UserModal from "../components/Modals/UserModal.vue";
import UsersTable from "../components/Tables/UsersTable.vue";

export default {
  components: {
    UserModal,
    UsersTable,
  },
  data() {
    return {
      showModal: false,
      users: [],
    };
  },
  methods: {
    addUser() {
      this.$store.dispatch("addUserInit");
    },
  },
};
</script>

<style></style>
