<template>
    <v-container>
    <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
    </v-carousel>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
        }
    },
}
</script>