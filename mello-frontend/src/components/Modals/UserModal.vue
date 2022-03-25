<template>
  <v-modal name="addUser" title="Add User">
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

      <v-input
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        :is-error="v$.form.password.$error"
        @blur="v$.form.password_repeat.$touch"
      />

      <v-input
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
} from "@vuelidate/validators";

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
      form: {
        name: "",
        email: "",
        password_repeat: "",
        password: "",
      },
    };
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
        password: { required },
        password_repeat: { required, sameAs: sameAs(this.form.password) },
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
        result = await this.$store.dispatch("addUser", this.form);
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
};
</script>
<style>
.input {
  @apply bg-cyan-900 h-5 rounded w-full p-5 outline-none font-light;
  -webkit-appearance: none;
}
</style>
