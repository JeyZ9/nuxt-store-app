<script setup lang="ts">
import useSpringApi from '~/composables/useSpringApi';


    // require product api
    const { data: prodcuts } = await useSpringApi().getAllProducts(1, 100);

    console.log(prodcuts)

    definePageMeta({
        layout: "backend",
    })

    useHead({
        title:'Prodocut',
        meta: [
            {
                name: 'description',
                content: 'Product page'
            }
        ]
    })
</script>

<template>
    <h1>Product</h1>
</template>

<style scoped>

</style>