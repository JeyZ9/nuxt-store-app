<template>
  <v-card>
    <img src="/images/background/login-register.jpg" class="w-100" alt="login background" />
    <div class="d-flex justify-center mt-n15">
      <v-avatar size="100">
        <!-- <nuxt-img src="/nuxt.png" :placeholder="[100, 50, 10]" /> -->
        <img src="/images/users/1.jpg" width="100" alt="user" />
      </v-avatar>
    </div>
    <v-card-text>
      <div class="p-4 text-center justify-center">
        <h2 class="mb-0 mt-4 font-weight-regular">Jonathan Dominic</h2>
        <small>Web Designer &amp; Developer</small><br />
        <v-btn rounded color="primary" class="mt-4 px-7 mx-auto">ติดตาม</v-btn>
        <v-row class="mt-6 pb-4">
          <v-col cols="4">
            <h2 class="mb-0">1099</h2>
            <small class>บทความ</small>
          </v-col>
          <v-col cols="4">
            <h2 class="mb-0">23,469</h2>
            <small class>ผู้ติดตาม</small>
          </v-col>
          <v-col cols="4">
            <h2 class="mb-0">6035</h2>
            <small class>กำลังติดตาม</small>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
