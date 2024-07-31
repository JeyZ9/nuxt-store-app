<script setup lang="ts">

import { WeeklyStats } from "./WeeklyStatsData"

const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
]);

const statsData = ref([
  {
    color: "primary",
    icon: "mdi-cart-outline",
    title: "Top Sales",
    desc: "Johnathan Doe",
    percent: 68,
  },
  {
    color: "warning",
    icon: "mdi-star-outline",
    title: "Best Seller",
    desc: "MaterialPro Admin",
    percent: 45,
  },
  {
    color: "success",
    icon: "mdi-message-outline",
    title: "Most Commented",
    desc: "Ample Admin",
    percent: 10,
  },
]);

const elementVisible = ref(false);

onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 30);
})

</script>

<template>
  <v-card class="overflow-hidden">
    <v-card-text>
      <div class="d-flex align-center">
        <h2 class="title text-h6 font-weight-medium">สถิติรายสัปดาห์</h2>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-menu bottom left>
            <template v-slot:activator="{ props }">
              <v-btn icon color="inherit" v-bind="props">
                <v-icon icon="mdi-dots-horizontal" size="20"></v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <!-- lists -->
      <div class="px-0" v-for="(item, i) in statsData" :key="i">
        <div class="d-flex align-center py-4">
          <div class>
            <v-btn
              :color="item.color"
              icon
              size="small"
              elevation="0"
              class="mr-3"
            >
              <v-icon :icon="item.icon" size="18"></v-icon>
            </v-btn>
          </div>
          <div class="ml-2">
            <h4 class="font-weight-medium text-subtitle-1 title">
              {{ item.title }}
            </h4>
            <span
              class="text-grey-darken-1 text-subtitle-2 d-block text-truncate font-weight-regular"
              >{{ item.desc }}</span
            >
          </div>
          <div class="ml-auto">
            <v-chip label size="small" class="font-weight-bold" color="primary">
              +{{ item.percent }}%
            </v-chip>
          </div>
        </div>
      </div>
    </v-card-text>
    <div class="position-relative" v-if="elementVisible">
      <apexchart
        type="area"
        height="135px"
        :options="WeeklyStats.chartOptions"
        :series="WeeklyStats.series"
      ></apexchart>
    </div>
  </v-card>
</template>
