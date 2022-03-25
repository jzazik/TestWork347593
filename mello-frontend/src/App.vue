<script setup>
import { RouterLink, RouterView } from "vue-router";
import "./index.css";
</script>

<template>
  <!--    <header class="container">-->
  <!--        <nav class="flex">-->
  <!--            <RouterLink to="/">Home</RouterLink>-->
  <!--            <RouterLink to="/about">About</RouterLink>-->
  <!--        </nav>-->
  <!--    </header>-->

  <div class="container p-5 m-auto">
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";

h1 {
  @apply font-bold text-xl text-white;
}

.button {
  @apply bg-cyan-900 text-white px-4 py-2 rounded-2xl font-semibold cursor-pointer transform hover:scale-105;
}

.validation-text {
  @apply text-xs text-red-500;
}
.validation-input {
  @apply border border-rose-500;
}
</style>
