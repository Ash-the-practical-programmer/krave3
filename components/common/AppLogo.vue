<template>
    <NuxtLink to="/" class="flex items-center group" aria-label="BioOptimizer Home">
      <!-- Simple conceptual SVG logo - Replace with your actual logo -->
      <svg
        class="h-8 w-auto text-primary group-hover:text-primary-focus transition-colors duration-200"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Example "B" shape with a "leaf" or "wave" -->
        <path
          d="M20 20 H50 A30 30 0 0 1 50 80 H20 V20 Z"
          class="stroke-current"
          stroke-width="8"
          fill="none"
        />
        <path
          d="M50 50 Q70 30 80 50 T70 70 Q50 60 50 50 Z"
          class="fill-current text-secondary group-hover:text-secondary-focus transition-colors duration-200"
        />
        <circle cx="35" cy="35" r="7" class="fill-current text-accent group-hover:text-accent-focus transition-colors duration-200" />
      </svg>
      <span v-if="showName" class="ml-2 text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-200">
        BioOptimizer
      </span>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  defineProps({
    showName: {
      type: Boolean,
      default: false, // By default, only show the icon
    },
  });
  </script>