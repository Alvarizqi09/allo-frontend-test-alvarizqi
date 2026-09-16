import { reactive } from "vue";
import type { Rocket } from "../types/rocket";

// Global state
const state = reactive({
  rockets: [] as Rocket[],
  isLoading: false,
  error: null as string | null,
});

const LOCAL_ROCKETS_KEY = "rocket-archive:custom-rockets";

const getLocalRockets = (): Rocket[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedRockets = window.localStorage.getItem(LOCAL_ROCKETS_KEY);
    return storedRockets ? (JSON.parse(storedRockets) as Rocket[]) : [];
  } catch {
    return [];
  }
};

const saveLocalRockets = (rockets: Rocket[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_ROCKETS_KEY, JSON.stringify(rockets));
};

export function useRocketStore() {
  return {
    state,
    setRockets(data: Rocket[]) {
      state.rockets = [...getLocalRockets(), ...data];
    },
    setLoading(loading: boolean) {
      state.isLoading = loading;
    },
    setError(err: string | null) {
      state.error = err;
    },
    addRocket(rocket: Rocket) {
      const localRockets = [rocket, ...getLocalRockets()];
      saveLocalRockets(localRockets);
      state.rockets.unshift(rocket);
    },
    getLocalRocket(id: string | number) {
      return getLocalRockets().find(
        (rocket) => rocket.id.toString() === id.toString(),
      );
    },
  };
}
