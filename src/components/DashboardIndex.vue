<template>
    <v-main>
        <h1>WELCOME</h1>
        <!-- Carousel -->
        <v-carousel cycle height="550" hide-delimiter-background hide-delimiters show-arrows-on-hover>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
                <v-img src="require('../path/to.img')"></v-img>
            </v-carousel-item>
        </v-carousel>
    </v-main>
</template>

<style>
.text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>

<script>
export default {
    data() {
        return {
            items: [
                {
                    src: require('../assets/forCarousel/slide1.jpg')
                },
                {
                    src: require('../assets/forCarousel/slide2.jpg')
                },
                {
                    src: require('../assets/forCarousel/slide3.jpg')
                },
                {
                    src: require('../assets/forCarousel/slide4.jpg')
                },
            ],
        }
    }
};
</script>

<!-- Haii kenn aku bingung mau nambahin apa jadi aku buat komen di sini aja ayaa
GOOD LUCK ^^ WKWKWKKW -->