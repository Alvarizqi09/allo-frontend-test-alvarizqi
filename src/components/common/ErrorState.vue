<template>
  <div class="d-flex flex-column align-center justify-center py-12">
    <v-icon
      icon="mdi-alert-circle-outline"
      color="error"
      size="64"
      class="mb-4"
    />
    <div class="text-h5 text-error mb-2">
      Oops! Something went wrong
    </div>
    <div class="text-body-1 text-grey-darken-1 text-center mb-6 max-w-sm">
      {{ error || 'An unexpected error occurred.' }}
    </div>
    <v-btn
      color="primary"
      prepend-icon="mdi-refresh"
      size="large"
      @click="$emit('retry')"
    >
      Retry
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: String,
    default: null
  }
});

defineEmits(['retry']);
</script>
