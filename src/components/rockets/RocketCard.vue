<template>
  <v-card
    class="h-100 d-flex flex-column hover-card rocket-card"
    elevation="0"
    hover
    @click="$router.push(`/${rocket.id}`)"
  >
    <v-img
      :src="imageSource"
      :alt="`${rocket.full_name} rocket image`"
      height="220"
      cover
      class="rocket-image"
      @error="useFallbackImage"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          />
        </div>
      </template>
    </v-img>

    <v-card-item class="pt-4 pb-2 card-heading">
      <div class="card-index">
        ROCKET / {{ String(rocket.id).slice(-3).padStart(3, "0") }}
      </div>
      <v-card-title class="text-h6 font-weight-bold text-uppercase">
        {{ rocket.full_name }}
      </v-card-title>
      <v-card-subtitle
        class="text-secondary font-weight-medium text-subtitle-2 mt-1"
      >
        {{ rocket.name }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1 pt-0">
      <p
        class="text-body-2 text-medium-emphasis text-truncate-3 card-description"
      >
        {{ rocket.description || "No description available." }}
      </p>
    </v-card-text>

    <v-divider color="grey" />
    <v-card-actions class="px-4 py-3">
      <v-btn
        color="secondary"
        variant="flat"
        block
        prepend-icon="mdi-arrow-top-right"
      >
        View Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { Rocket } from "../../types/rocket";

const fallbackImage = "/rocket-fallback.svg";

const props = defineProps({
  rocket: {
    type: Object as PropType<Rocket>,
    required: true,
  },
});
const imageSource = ref(props.rocket.image_url || fallbackImage);

const useFallbackImage = () => {
  imageSource.value = fallbackImage;
};
</script>

<style scoped>
.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hover-card {
  border: 3px solid #1c293c !important;
  border-radius: 8px !important;
  background: #fbfbf9 !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 8px 8px 0 #1c293c !important;
}
.hover-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #432dd7 !important;
}
.rocket-image {
  border: 10px solid #fdc800;
  border-bottom-width: 3px;
  filter: saturate(1.1) contrast(1.05);
}
.card-heading {
  border-bottom: 2px dashed rgba(28, 41, 60, 0.24);
}
.card-index {
  color: #432dd7;
  font-family: "Space Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.card-description {
  min-height: 72px;
  color: rgba(28, 41, 60, 0.72) !important;
  font-family: "Space Mono", monospace;
  font-size: 0.76rem !important;
  line-height: 1.55;
}
.hover-card :deep(.v-btn) {
  border-radius: 4px;
  color: #fbfbf9 !important;
  font-family: "Space Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
</style>
