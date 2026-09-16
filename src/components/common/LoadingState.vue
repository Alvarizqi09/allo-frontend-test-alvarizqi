<template>
  <div class="d-flex flex-column align-center justify-center py-12">
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    />
    <div class="text-h6 mt-4 text-grey-darken-1">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
});
</script>
