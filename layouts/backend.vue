<script setup lang="ts">

import Sidebar from '~/components/backendComponents/sidebar/Sidebar.vue'
import Header from '@/components/backendComponents/header/Header.vue'
import { useDisplay } from 'vuetify'
import { useTheme } from '~/composables/useTheme';

const { mdAndUp, mdAndDown } = useDisplay()
const drawer = ref(true)

const { theme, toggleTheme } = useTheme();

</script>

<template>
    <div>
        <v-app>
            <!-- Header -->
            <v-app-bar elevation="0" color="primary">
                <div class="pe-5">
                    <NuxtLink to="/backend/dashboard" class="d-flex brand">
                        Nuxt Store
                    </NuxtLink>
                </div>
                <v-app-bar-nav-icon @click="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-app-bar-nav-icon>

                <v-spacer />

                <v-btn  
                    v-if="!theme.global.current.value.dark" prepend-icon="mdi-white-balance-sunny" 
                    @click="toggleTheme()"></v-btn>
                <v-btn 
                    v-if="theme.global.current.value.dark"
                    prepend-icon="mdi-moon-waning-crescent" 
                    @click="toggleTheme()"></v-btn>

                <!-- User Profile -->
                <Header />
            </v-app-bar>
            
            <v-main>
                <!-- Sidebar -->
                <v-navigation-drawer
                    left
                    :permanent="mdAndUp"
                    elevation="10"
                    app
                    :temporary="!mdAndDown"
                    v-model="drawer"
                    expand-on-hover
                >
                    <Sidebar />
                </v-navigation-drawer>
                <v-container fluid class="page-wrapper">
                    <NuxtPage />
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<style scoped>
  .brand {
    font-size: 20px;
    color: #fff;
    padding-left: 20px;
    text-decoration: none;
    font-weight: bold;
  }
</style>