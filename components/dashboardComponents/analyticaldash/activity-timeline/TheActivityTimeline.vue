<template>
  <v-card>
    <v-tabs v-model="tab" fixed-tabs color="primary" stacked>
      <v-tab value="one">กิจกรรม</v-tab>
      <v-tab value="two">โปรไฟล์</v-tab>
      <v-tab value="three">ตั้งค่า</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <TimelineView />
        </v-window-item>

        <v-window-item value="two">
          <TimelineProfile />
        </v-window-item>

        <v-window-item value="three">
          <TimelineSettings />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

import TimelineView from "./TimelineView.vue";
import TimelineProfile from "./TimelineProfile.vue";
import TimelineSettings from "./TimelineSettings.vue";

const tab = ref(null);
</script>
