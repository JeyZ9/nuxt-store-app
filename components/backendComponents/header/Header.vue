<script setup lang="ts">
import { message, notification, profile } from "./headerItems"

const href = ref(undefined)
const messages = ref(message)
const notifications = ref(notification)
const userprofile = ref(profile)

// sign out method
const signOut = () => {

  // get token from cookie
  const token = useCookie('token')

  // remove token from cookie
  token.value = null

  // redirect to login page
  useRouter().push({path: '/'})
}

</script>

<template>
  <v-menu anchor="bottom end" origin="auto" min-width="300">
    <template v-slot:activator="{ props }">
      <div class="d-flex">
        <!-- ---------------------------------------------- -->
        <!-- Message -->
        <!-- ---------------------------------------------- -->
        <v-btn icon class="ms-3" color="lighten-2">
          <v-badge color="error" dot>
            <v-icon>mdi-message</v-icon>
          </v-badge>

          <v-menu
            activator="parent"
            anchor="bottom end"
            origin="auto"
            max-width="300"
          >
            <v-list class="pa-5" elevation="10" rounded="lg">
              <h4 class="d-flex">
                ข้อความ
                <v-chip label small color="secondary" class="ml-auto">
                  5 new
                </v-chip>
              </h4>

              <v-list-item
                v-for="(item, i) in messages"
                class="my-2 pa-3"
                :key="i"
                rounded="lg"
                :value="item"
                @click="href"
                :title="item.title"
                :subtitle="item.desc"
              >
                <template v-slot:prepend>
                    <v-avatar size="50">
                      <v-img
                        :src="`/images/users/${item.image}`"
                        :alt="item.image"
                        width="50">
                      </v-img>
                    </v-avatar
                  >
                </template>
              </v-list-item>
              <v-btn flat color="primary" class="mt-4" variant="tonal" block
                >ดูข้อความทั้งหมด</v-btn
              >
            </v-list>
          </v-menu>
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- Notification -->
        <!-- ---------------------------------------------- -->
        <v-btn icon class="ms-3" color="lighten-2">
          <v-badge color="error" dot>
            <v-icon>mdi-bell</v-icon>
          </v-badge>

          <v-menu activator="parent" max-width="300">
            <v-list class="pa-6" elevation="10" rounded="lg">
              <h4 class="d-flex">
                การแจ้งเตือน
                <v-chip class="ml-auto" label small color="error"> 5 new </v-chip>
              </h4>
              <v-list-item
                class="pa-3 mt-2"
                v-for="(item, i) in notifications"
                :key="i"
                :value="item"
                @click="href"
                rounded="lg"
                :title="item.title"
                :subtitle="item.desc">
                <template v-slot:prepend>
                  <v-btn :color="item.color" icon variant="tonal" elevation="0" class="mr-3">
                    <v-icon :icon="item.icon" size="24"></v-icon>
                  </v-btn>
                </template>
              </v-list-item>
              <v-btn block variant="elevated" color="secondary" class="mt-4 py-4">ดูการแจ้งเตือนทั้งหมด</v-btn>
            </v-list>
          </v-menu>
        </v-btn>
   
        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <v-btn icon class="mx-3">
          <v-avatar size="35">
            <img src="/images/users/samitk.jpg" width="35" alt="Samit" />
          </v-avatar>

          <v-menu activator="parent">
            <v-list class="pa-6" elevation="10" rounded="lg">
              <h4 class="font-weight-medium fs-18">โปรไฟล์ของฉัน</h4>
              <div class="d-flex align-center my-4">
                <img
                  src="/images/users/samitk.jpg"
                  alt="Samit Koyom"
                  class="rounded-circle"
                  width="90"
                />
                <div class="ml-4">
                  <h4 class="font-weight-medium fs-18">Samit Koyom</h4>
                  <span class="subtitle-2 font-weight-light">Administrator</span>
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-email-outline" class="d-flex grey--text" size="16"></v-icon>
                    <span class="subtitle-2 font-weight-light ml-1">info@itgenius.com</span>
                  </div>
                </div>
              </div>
              <v-list-item
                class="pa-3 mb-2"
                v-for="(item, index) in userprofile"
                :key="index"
                :value="index"
                :title="item.title"
                :subtitle="item.desc">
                <template v-slot:prepend>
                  <v-btn :color="item.color" variant="tonal" icon elevation="0" class="mr-3">
                    <v-icon :icon="item.icon" size="24"></v-icon>
                  </v-btn>
                </template>
              </v-list-item>
              <v-btn block color="secondary" variant="tonal" class="mt-4 py-4" @click="signOut()">ออกจากระบบ</v-btn>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-menu>
</template>

<style scoped></style>
