<template>
  <vue-final-modal
    classes="flex justify-center items-center px-5"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    v-model="isOpen"
    @closed="close"
  >
    <span class="text-2xl font-bold mb-5">
      <slot name="title">{{ title }}</slot>
    </span>

    <slot />
  </vue-final-modal>
</template>
<script>
import { VueFinalModal } from "vue-final-modal";
export default {
  name: "VModal",
  props: {
    name: String,
    title: String,
  },
  components: {
    VueFinalModal,
  },
  data() {
    return {};
  },
  computed: {
    isOpen: {
      get: function () {
        return this.$store.state.modalName === this.name;
      },
      set: function (v) {
        if (v === false) {
          this.close();
        }
      },
    },
  },
  methods: {
    close() {
      this.$store.dispatch("closeModal");
    },
  },
};
</script>
