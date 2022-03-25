<template>
  <div class="mb-2">
    <label>
      {{ label }}
      <input
        :name="name"
        class="input mt-1"
        :class="{ 'validation-input': isError }"
        :type="type"
        :value="modelValue"
        @input="updateValue"
        @blur="$emit('blur')"
        autocomplete="on"
      />
    </label>

    <div class="validation-text" v-if="isError">
      {{ label }} field has an error.
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    name: String,
    type: { type: String, default: "text" },
    modelValue: String,
    isError: { type: Boolean, default: false },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
