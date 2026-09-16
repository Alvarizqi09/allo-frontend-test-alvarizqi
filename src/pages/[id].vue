<template>
  <v-container
    max-width="900"
    class="py-8"
  >
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-6 px-0"
      color="primary"
      @click="$router.push('/')"
    >
      Back to Rockets
    </v-btn>

    <ErrorState
      v-if="error"
      :error="error"
      @retry="loadRocket"
    />
    <LoadingState
      v-else-if="isLoading"
      text="Loading rocket details..."
    />

    <v-card
      v-else-if="rocket"
      class="overflow-hidden rounded-xl"
      elevation="4"
    >
      <v-img
        :src="imageSource"
        :alt="`${rocket.full_name} rocket image`"
        height="450"
        cover
        class="bg-grey-lighten-3"
        @error="useFallbackImage"
      />

      <v-card-text class="pa-6 pa-md-8">
        <div
          class="d-flex flex-column flex-sm-row justify-space-between align-sm-center mb-6"
        >
          <div>
            <h1 class="text-h3 font-weight-bold mb-1 text-primary">
              {{ rocket.full_name }}
            </h1>
            <div class="text-h6 text-medium-emphasis">
              {{ rocket.name }}
            </div>
          </div>
          <v-chip
            v-if="rocket.manufacturer?.country_code"
            color="secondary"
            variant="elevated"
            class="mt-4 mt-sm-0 px-4"
            size="large"
          >
            <v-icon
              start
              icon="mdi-flag"
            />
            {{ rocket.manufacturer.country_code }}
          </v-chip>
        </div>

        <p
          class="text-body-1 mb-8"
          style="line-height: 1.8"
        >
          {{
            rocket.description || "No description available for this rocket."
          }}
        </p>

        <v-divider class="mb-6" />

        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-list-item class="px-0">
              <template #prepend>
                <v-avatar
                  color="green-lighten-5"
                  class="mr-4"
                  size="56"
                >
                  <v-icon
                    icon="mdi-cash"
                    color="green-darken-2"
                    size="x-large"
                  />
                </v-avatar>
              </template>
              <v-list-item-title
                class="text-grey-darken-1 text-caption text-uppercase font-weight-bold"
              >
                Cost per Launch
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-h6 font-weight-medium text-black mt-1"
              >
                {{ formatCost(rocket.launch_cost) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-list-item class="px-0">
              <template #prepend>
                <v-avatar
                  color="blue-lighten-5"
                  class="mr-4"
                  size="56"
                >
                  <v-icon
                    icon="mdi-calendar-check"
                    color="blue-darken-2"
                    size="x-large"
                  />
                </v-avatar>
              </template>
              <v-list-item-title
                class="text-grey-darken-1 text-caption text-uppercase font-weight-bold"
              >
                First Flight
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-h6 font-weight-medium text-black mt-1"
              >
                {{ formatDate(rocket.maiden_flight) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRocketDetail } from "../composables/useRocketDetail";
import LoadingState from "../components/common/LoadingState.vue";
import ErrorState from "../components/common/ErrorState.vue";
import { useRocketStore } from "../store/rocketStore";

const route = useRoute();
const { rocket, isLoading, error, fetchRocket } = useRocketDetail();
const store = useRocketStore();
const fallbackImage = "/rocket-fallback.svg";
const imageSource = ref(fallbackImage);

const loadRocket = async () => {
  const id = route.params.id as string;
  // If it's a locally added rocket, we might find it in the store
  const localRocket =
    store.getLocalRocket(id) ||
    store.state.rockets.find(
      (r) => r.id.toString() === id && r.manufacturer?.country_code === "Local",
    );
  if (localRocket) {
    rocket.value = localRocket;
  } else {
    await fetchRocket(id);
  }
  imageSource.value = rocket.value?.image_url || fallbackImage;
};

const useFallbackImage = () => {
  imageSource.value = fallbackImage;
};

onMounted(() => {
  loadRocket();
});

const formatCost = (cost: string | null) => {
  if (!cost) return "Unknown";
  const num = Number(cost);
  if (isNaN(num)) return cost;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
};
</script>
