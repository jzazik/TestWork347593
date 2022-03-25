<template>
  <v-modal name="addUser" :title="mode === 'add' ? 'Add User' : 'Edit User'">
    <v-form :loading="loading" @submit="submit">
      <v-input
        v-model="form.name"
        name="name"
        label="Name"
        :is-error="v$.form.name.$error"
        @blur="v$.form.name.$touch"
      />
      <v-input
        v-model="form.email"
        name="email"
        label="Email"
        type="email"
        :is-error="v$.form.email.$error"
        @blur="v$.form.email.$touch"
      />

      <label v-if="mode === 'edit'">
        <input
          type="checkbox"
          name="change_password"
          v-model="changePassword"
        />
        Change password
      </label>
      <v-input
        v-if="mode === 'add' || changePassword"
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        :is-error="v$.form.password.$error"
        @blur="v$.form.password_repeat.$touch"
      />

      <v-input
        v-if="mode === 'add' || changePassword"
        v-model="form.password_repeat"
        name="password_repeat"
        label="Repeat password"
        type="password"
        :is-error="v$.form.password_repeat.$error"
        @blur="v$.form.password_repeat.$touch"
      />

      <div class="validation-text" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </v-form>
  </v-modal>
</template>
<script>
import VModal from "../VModal.vue";
import VInput from "../VInput.vue";
import VForm from "../VForm.vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  requiredIf,
} from "@vuelidate/validators";

const form = {
  name: "",
  email: "",
  password: "",
  password_repeat: "",
};

export default {
  components: {
    VModal,
    VInput,
    VForm,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      changePassword: false,
      form: {},
    };
  },
  computed: {
    mode() {
      return this.$store.state.mode;
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    user: function (val) {
      if (val) {
        this.form = val;
      } else {
        this.form = { ...form };
      }
    },
  },
  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(255),
        },
        email: {
          required,
          email,
        },
        password: requiredIf(this.mode === "add"),
        password_repeat: {
          requiredIf: requiredIf(this.mode === "add"),
          sameAs: sameAs(this.form.password),
        },
      },
    };
  },
  methods: {
    async submit() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      this.loading = true;
      let result = null;
      try {
        const method = this.mode === "edit" ? "editUser" : "addUser";
        result = await this.$store.dispatch(method, this.form);
      } catch (e) {
        console.log(e.response.data);
        this.errorMessage = e.response.data.message;
      }
      this.loading = false;
      if (result) {
        this.errorMessage = "";
        for (let member in this.form) delete this.form[member];
      }
    },
  },
  // updated() {
  //   if (this.mode === "add") {
  //     this.form = { ...form };
  //   }
  //   console.log("form");
  // },
};
</script>
<style>
.input {
  @apply bg-cyan-900 h-5 rounded w-full p-5 outline-none font-light;
  -webkit-appearance: none;
}
</style>
