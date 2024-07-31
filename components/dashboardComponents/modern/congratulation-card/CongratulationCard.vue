<script setup lang="ts"></script>

<template>
  <v-card class="position-relative overflow-hidden">
    <img src="/images/users/businessmen.png" hidden class="bg-img-1" alt="Congratulation" />
    <v-card-text>
      <h3 class="title text-h6 overlay-title font-weight-medium">
        ยินดีต้อนรับคุณ Julia
      </h3>
      <h2 class="title text-h5 font-weight-bold d-flex align-end">
        $39,358
        <span
          class="text-subtitle-1 ml-2 d-flex align-center font-weight-medium"
          ><v-icon icon="mdi-arrow-top-left" size="18"></v-icon> +9%</span
        >
      </h2>
      <v-btn color="primary" class="mt-8"> ดาวน์โหลดที่นี่ </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.overlay-title {
  position: relative;
  z-index: 1;
}
</style>
