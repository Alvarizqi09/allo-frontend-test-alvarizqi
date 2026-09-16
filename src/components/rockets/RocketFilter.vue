<template>
  <v-text-field
    v-model="model"
    prepend-inner-icon="mdi-rocket-search"
    label="Search Rockets..."
    variant="solo"
    density="comfortable"
    hide-details
    clearable
    placeholder="Enter rocket name (e.g. Falcon)"
    color="primary"
    bg-color="surface"
    class="pixel-search"
  />
</template>

<script setup lang="ts">
const model = defineModel<string>();
</script>

<style scoped>
.pixel-search :deep(.v-field) {
  border: 3px solid #f7f3e8;
  box-shadow: 6px 6px 0 #ff5c35;
  border-radius: 0;
}
.pixel-search :deep(.v-field--focused) {
  box-shadow: 8px 8px 0 #b8f500;
}
.pixel-search :deep(input) {
  font-family: "Space Mono", monospace;
}
</style>
