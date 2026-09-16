<template>
  <v-container
    fluid
    class="command-center pa-0"
  >
    <section class="hero-panel">
      <div class="hero-decoration decoration-square" />
      <div class="hero-decoration decoration-circle" />
      <div class="hero-copy">
        <div class="eyebrow">
          <span class="status-dot" /> SPACE SYSTEMS / 2026
        </div>
        <h1>ROCKET <span>ARCHIVE</span></h1>
        <p>
          An index of launch vehicles, flight history, and machines built to
          leave the ground.
        </p>
      </div>
      <div
        class="hero-rocket"
        aria-hidden="true"
      >
        <div class="pixel-flame flame-one" />
        <div class="pixel-flame flame-two" />
        <div class="rocket-badge">
          <v-icon
            icon="mdi-rocket-launch"
            size="118"
          />
        </div>
        <div class="rocket-caption">
          LIFT OFF<br><strong>READY</strong>
        </div>
      </div>
      <div class="hero-action">
        <AddRocketDialog @add="addRocket" />
      </div>
    </section>

    <v-container
      max-width="1200"
      class="content-wrap px-4 px-md-6 py-8"
    >
      <div class="section-heading">
        <div>
          <div class="section-kicker">
            01 / AVAILABLE VEHICLES
          </div>
          <h2>Fleet inventory</h2>
        </div>
        <div class="fleet-count">
          {{ filteredRockets.length.toString().padStart(2, "0") }} units
        </div>
      </div>

      <v-row class="mb-8">
        <v-col
          cols="12"
          md="8"
        >
          <RocketFilter v-model="searchQuery" />
        </v-col>
      </v-row>

      <ErrorState
        v-if="state.error"
        :error="state.error"
        @retry="retryFetch"
      />
      <LoadingState
        v-else-if="state.isLoading"
        text="Fetching rockets..."
      />
      <template v-else>
        <div
          v-if="filteredRockets.length === 0"
          class="empty-state"
        >
          <v-icon
            icon="mdi-rocket-off"
            size="64"
            color="secondary"
            class="mb-4"
          />
          <div class="text-h6">
            No rockets found matching your search.
          </div>
        </div>
        <v-row
          v-else
          class="rocket-grid"
        >
          <v-col
            v-for="rocket in filteredRockets"
            :key="rocket.id"
            cols="12"
            sm="6"
            md="4"
          >
            <RocketCard :rocket="rocket" />
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRockets } from "../composables/useRockets";
import RocketCard from "../components/rockets/RocketCard.vue";
import RocketFilter from "../components/rockets/RocketFilter.vue";
import AddRocketDialog from "../components/rockets/AddRocketDialog.vue";
import LoadingState from "../components/common/LoadingState.vue";
import ErrorState from "../components/common/ErrorState.vue";

const {
  state,
  searchQuery,
  fetchRockets,
  retryFetch,
  filteredRockets,
  addRocket,
} = useRockets();

onMounted(() => {
  fetchRockets();
});
</script>

<style scoped>
.command-center {
  min-height: 100vh;
  background: #fbfbf9;
}
.hero-panel {
  position: relative;
  min-height: 440px;
  overflow: hidden;
  border-bottom: 3px solid #1c293c;
  background: #f3f3ef;
  color: #1c293c;
}
.hero-panel::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 18px;
  background: repeating-linear-gradient(
    90deg,
    #1c293c 0 12px,
    transparent 12px 24px
  );
  content: "";
  opacity: 0.18;
}
.hero-copy,
.hero-action {
  position: relative;
  z-index: 2;
}
.hero-copy {
  max-width: 1200px;
  padding: 74px 24px 64px;
  margin: auto;
}
.eyebrow,
.section-kicker,
.fleet-count {
  font-family: "Space Mono", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  background: #432dd7;
  border: 2px solid #1c293c;
}
h1 {
  max-width: 720px;
  margin: 24px 0 18px;
  font-size: clamp(3.7rem, 9vw, 7.8rem);
  line-height: 0.86;
  letter-spacing: -0.05em;
  font-weight: 700;
}
h1 span {
  display: block;
  color: #432dd7;
}
.hero-copy p {
  max-width: 380px;
  margin: 0;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}
.hero-action {
  position: absolute;
  right: max(24px, calc((100% - 1200px) / 2));
  bottom: 44px;
}
.hero-rocket {
  position: absolute;
  right: 12%;
  top: 66px;
  width: 300px;
  height: 300px;
  display: grid;
  place-items: center;
  transform: rotate(8deg);
  color: #fbfbf9;
  filter: drop-shadow(10px 10px 0 #1c293c);
}
.rocket-badge {
  width: 230px;
  height: 230px;
  display: grid;
  place-items: center;
  border: 3px solid #1c293c;
  border-radius: 50%;
  background: #432dd7;
}
.pixel-flame {
  position: absolute;
  bottom: 10px;
  width: 28px;
  height: 58px;
  background: #fdc800;
  box-shadow:
    24px 18px #f05a47,
    -24px 12px #f05a47,
    0 54px #f05a47;
}
.flame-one {
  left: 105px;
}
.flame-two {
  left: 132px;
  transform: scale(0.65);
  background: #432dd7;
}
.rocket-caption {
  position: absolute;
  right: -20px;
  bottom: 20px;
  padding: 9px 12px;
  border: 2px solid #1c293c;
  background: #fdc800;
  color: #1c293c;
  font-family: "Space Mono", monospace;
  font-size: 0.65rem;
  line-height: 1.25;
  transform: rotate(-8deg);
}
.content-wrap {
  position: relative;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 22px;
  border-bottom: 2px solid #1c293c;
  padding-bottom: 14px;
}
.section-kicker {
  color: #432dd7;
}
.section-heading h2 {
  margin: 5px 0 0;
  font-size: 2.1rem;
  line-height: 1;
}
.hero-decoration {
  position: absolute;
  border: 3px solid #1c293c;
}
.decoration-square {
  right: 44%;
  top: 28px;
  width: 32px;
  height: 32px;
  background: #fdc800;
  transform: rotate(14deg);
}
.decoration-circle {
  right: 5%;
  bottom: 28px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f05a47;
}
.fleet-count {
  color: rgba(28, 41, 60, 0.6);
}
.empty-state {
  padding: 80px 20px;
  text-align: center;
  border: 3px solid #1c293c;
  box-shadow: 8px 8px 0 #fdc800;
}
.rocket-grid :deep(.v-col) {
  padding-top: 12px;
  padding-bottom: 12px;
}
@media (max-width: 700px) {
  .hero-panel {
    min-height: 650px;
  }
  .hero-copy {
    padding-top: 42px;
  }
  .hero-rocket {
    right: 8%;
    top: 330px;
    transform: rotate(8deg) scale(0.7);
  }
  .hero-action {
    left: 24px;
    right: auto;
    bottom: 32px;
  }
  .section-heading {
    align-items: start;
    gap: 16px;
    flex-direction: column;
  }
}
</style>
