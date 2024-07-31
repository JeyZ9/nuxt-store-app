<script setup lang="ts">

import { CustomerChart } from "./CustomersData"

const elementVisible = ref(false)

onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 30)
})

</script>

<template>
  <v-card class="position-relative bg-primary">
    <v-card-text>
      <h2 class="title text-h6 font-weight-medium text-white">สถิติลูกค้า</h2>
      <div class="mt-4" v-if="elementVisible">
        <apexchart
          type="line"
          height="55px"
          :options="CustomerChart.chartOptions"
          :series="CustomerChart.series"
        ></apexchart>
      </div>
      <h2
        class="title text-h5 text-white mt-6 font-weight-medium d-flex align-end"
      >
        $39,358
        <span
          class="text-subtitle-1 ml-2 d-flex align-center font-weight-medium"
          ><v-icon icon="mdi-arrow-top-left" size="18"></v-icon>+9 ในสัปดาห์นี้</span
        >
      </h2>
    </v-card-text>
  </v-card>
</template>
