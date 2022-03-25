<template>
  <form>
    <slot />
    <div class="flex justify-between mt-5">
      <button
        class="button"
        :class="{ 'animate-pulse': loading }"
        @click.prevent="$emit('submit')"
      >
        confirm
      </button>
      <button class="button" @click.prevent="close">cancel</button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
  },
  methods: {
    close() {
      this.$store.dispatch("closeModal");
    },
  },
};
</script>
