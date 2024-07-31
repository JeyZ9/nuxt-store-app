import { createVuetify } from "vuetify"

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"

import { LIGHT_THEME, lightTheme, darkTheme } from "@/helpers/themes"

import { defaults } from "@/helpers/defaults"

export default defineNuxtPlugin((nuxtApp ) => {
    // Create a new Vuetify instance
    const vuetify = createVuetify({
        ssr: true,
        defaults,
        theme: {
            defaultTheme: LIGHT_THEME,
            themes: {
                lightTheme,
                darkTheme,
            },
            // add color variations
            variations: {
                colors: ["primary", "secondary"],
                lighten: 3,
                darken: 3,
            }
        },
        // Add the mdi iconset
        icons: {
            defaultSet: "mdi",
            aliases,
            sets: {
                mdi,
            },
        },
    })

    // Inject it to nuxtApp
    nuxtApp.vueApp.use(vuetify)
})