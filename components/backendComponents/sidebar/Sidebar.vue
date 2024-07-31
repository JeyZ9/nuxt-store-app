<script setup lang="ts">

import sidebarItems from "./sidebarItems"
const sidebarMenu = ref(sidebarItems)

</script>

<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="80">
            <img src="/images/users/samitk.jpg" width="80" alt="Samit" />
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>Samit Koyom</h5>
        </div>
      </div>
      <v-list class="pa-4">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item :to="item.to" rounded="lg" class="mb-1">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<style scoped>

  .profile-name{
    font-size: 18px;
    text-align: center;
  }

  .profile-pic{
    text-align: center;
    margin-top: 20px;
  }
  
</style>
