<template>
  <v-table :th-arr="['Name', 'Email', 'Actions']">
    <tr class="hover:bg-sky-800" v-for="user in users" :key="user.id">
      <td
        class="py-2 pr-2 font-mono font-bold text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400"
      >
        {{ user.name }}
      </td>
      <td class="py-2 px-2 text-xs italic">
        {{ user.email }}
      </td>
      <td class="w-px whitespace-nowrap py-2 px-2 text-xs italic">
        <button class="button mr-2" @click="edit(user)">Edit</button>
        <button class="button" @click="remove(user)">Delete</button>
      </td>
    </tr>
  </v-table>
  <div v-if="users.length === 0" class="w-full mt-14">
    <div class="text-center font-semibold mx-auto text-l">
      Sorry, there are no users to show
    </div>
  </div>
</template>

<script>
import VTable from "../VTable.vue";

export default {
  components: {
    VTable,
  },
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    edit(user) {
      this.$store.dispatch("editUserInit", user);
    },
    remove(user) {
      this.$store.dispatch("removeUser", user);
    },
  },
  async created() {
    await this.$store.dispatch("getUsers");
  },
};
</script>
<style></style>
