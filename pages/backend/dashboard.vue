<script setup lang="ts">

  import CongratulationCard from "@/components/dashboardComponents/modern/congratulation-card/CongratulationCard.vue"
  import Purchases from "@/components/dashboardComponents/modern/purchases/Purchases.vue"
  import TotalEarnings from "@/components/dashboardComponents/modern/total-earnings/TotalEarnings.vue"
  import RevenueUpdates from "@/components/dashboardComponents/modern/revenue-updates/RevenueUpdates.vue"
  import MonthlyEarnings from "@/components/dashboardComponents/modern/monthly-earnings/MonthlyEarnings.vue"
  import Customers from "@/components/dashboardComponents/modern/customers/Customers.vue"
  import TotalSales from "@/components/dashboardComponents/modern/total-sales/TotalSales.vue"
  import ProductPerformance from "@/components/dashboardComponents/modern/product-performance/ProductPerformance.vue"
  import BlogCard from "@/components/dashboardComponents/modern/blog-card/BlogCard.vue"
  import WeeklyStats from "@/components/dashboardComponents/modern/weekly-stats/WeeklyStats.vue"
  import MedicalProBranding from "@/components/dashboardComponents/ecommerce/medicalpro-branding/MedicalProBranding.vue"
  import TheProfileCard from "@/components/dashboardComponents/analyticaldash/profile-card/TheProfileCard.vue"
  import TheMyContacts from "@/components/dashboardComponents/analyticaldash/my-contacts/TheMyContacts.vue"
  import TheActivityTimeline from "@/components/dashboardComponents/analyticaldash/activity-timeline/TheActivityTimeline.vue"

  definePageMeta({
    layout: "backend",
  })

  useHead({
    title: 'Dashboard',
    meta: [
      { 
        name: 'keywords', 
        content: 'Dashboard, Nuxt 3, Backend'
      },
      {
        name: 'Description',
        content: 'Dashboard Nuxt 3,  IT Genius Engineering'
      }
    ]
  })

</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" lg="5">
      <!-- <DashboardComponentsModernCongratulationCard /> -->
      <CongratulationCard />
    </v-col>
    <v-col cols="12" sm="12" lg="7">
      <v-row>
        <v-col lg="5">
          <Purchases />
        </v-col>
        <v-col lg="7">
          <TotalEarnings />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" lg="8">
        <RevenueUpdates />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <MonthlyEarnings />
      <Customers />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <TotalSales />
    </v-col>
    <v-col cols="12" sm="12" lg="8">
      <ProductPerformance />
    </v-col>

    <v-col cols="12" sm="12" lg="4">
      <TheProfileCard />
      <div class="mt-7"></div>
      <TheMyContacts />
    </v-col>
    <v-col cols="12" sm="12" lg="8">
      <TheActivityTimeline />
    </v-col>
    <v-col cols="12" lg="4">
      <BlogCard />
    </v-col>
    <v-col cols="12" lg="4">
      <WeeklyStats />
    </v-col>
    <v-col cols="12" lg="4">
      <MedicalProBranding />
    </v-col>
  </v-row>
</template>