import { defineStore } from "pinia";

export const useTravelPlanStore = defineStore("travelPlan", {
  state: () => ({
    plan: {
      title: "나의 여행 계획",
      items: [],
    },
  }),

  getters: {
    totalCount: (state) => state.plan.items.length,
  },

  actions: {
    load() {
     
    },

    save() {
      localStorage.setItem("travelPlan", JSON.stringify(this.plan));
    },

    addPlace(place) {
      const exists = this.plan.items.find((item) => item.placeId === place.id);
      if (exists) return;

      this.plan.items.push({
        order: this.plan.items.length + 1,
        placeId: place.id,
        name: place.name,
        x: place.x,
        y: place.y,
      });

      this.save();
    },

    removePlace(placeId) {
      this.plan.items = this.plan.items
        .filter((item) => item.placeId !== placeId)
        .map((item, index) => ({
          ...item,
          order: index + 1,
        }));

      this.save();
    },

    reorder(newItems) {
      this.plan.items = newItems.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      this.save();
    },

    clear() {
      this.plan.items = [];
      this.save();
    },

    clearPlan() {
      this.plan = {
        title: '',
        items: [],
      };
    },
  },
});
