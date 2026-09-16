<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template #activator="{ props }">
      <v-btn
        color="primary"
        prepend-icon="mdi-rocket-launch"
        v-bind="props"
        size="large"
        elevation="2"
      >
        Add Rocket
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="bg-primary text-white py-4 px-6 d-flex justify-space-between align-center">
        <span class="text-h5">Add Custom Rocket</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="close"
        />
      </v-card-title>
      <v-card-text class="pa-6">
        <v-form
          ref="formRef"
          v-model="isValid"
          @submit.prevent="submit"
        >
          <v-container class="pa-0">
            <v-row>
              <v-col
                cols="12"
                sm="6"
                class="pb-2"
              >
                <v-text-field
                  v-model="form.name"
                  label="Rocket Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="pb-2"
              >
                <v-text-field
                  v-model="form.full_name"
                  label="Full Name"
                  required
                  :rules="[v => !!v || 'Full Name is required']"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                class="pb-2"
              >
                <v-textarea
                  v-model="form.description"
                  label="Description"
                  required
                  :rules="[v => !!v || 'Description is required']"
                  variant="outlined"
                  rows="3"
                  auto-grow
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="pb-2"
              >
                <v-text-field
                  v-model="form.launch_cost"
                  label="Launch Cost (Optional)"
                  prefix="$"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="pb-2"
              >
                <v-text-field
                  v-model="form.maiden_flight"
                  label="Maiden Flight (Optional)"
                  type="date"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                class="pb-2"
              >
                <v-text-field
                  v-model="form.image_url"
                  label="Image URL (Optional)"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4 bg-grey-lighten-4">
        <v-spacer />
        <v-btn
          color="grey-darken-2"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!isValid"
          class="px-6"
          @click="submit"
        >
          Submit Rocket
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Rocket } from '../../types/rocket';

const emit = defineEmits(['add']);
const dialog = ref(false);
const isValid = ref(false);
const formRef = ref<unknown>(null);

const form = ref({
  name: '',
  full_name: '',
  description: '',
  launch_cost: '',
  maiden_flight: '',
  image_url: ''
});

const close = () => {
  dialog.value = false;
  if (formRef.value) (formRef.value as { reset: () => void }).reset();
};

const submit = () => {
  if (isValid.value) {
    const newRocket: Rocket = {
      id: Date.now().toString(), // Generate local ID
      url: '',
      name: form.value.name,
      full_name: form.value.full_name,
      description: form.value.description,
      launch_cost: form.value.launch_cost || null,
      maiden_flight: form.value.maiden_flight || null,
      image_url: form.value.image_url || null,
      manufacturer: { country_code: 'Local' }
    };
    emit('add', newRocket);
    close();
  }
};
</script>
