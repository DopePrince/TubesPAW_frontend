<template>
    <v-main>
        <v-header>
            <v-app-bar color="teal lighten-3" dark height="85">
            <v-toolbar-title>
                <v-img :src="title" height="300" width="300" style="margin-top:12%"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="login"><v-icon style="margin-right:6px;" size="140%">mdi-login</v-icon>LOGIN</v-btn>
            </v-app-bar>
        </v-header>
        <!-- Carousel -->
        <v-carousel cycle height="550" hide-delimiter-background hide-delimiters show-arrows-on-hover>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
                <v-img src="require('../path/to.img')"></v-img>
            </v-carousel-item>
        </v-carousel>
        <!-- Footer -->
        <v-footer fixed dark padless>
            <v-card flat tile class="flex teal lighten-1 white--text text-center">
                <v-card-text>
                    <v-btn v-for="icon in sosmed" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-text class="white--text pt-0">
                    At A Hotel we strive to give you the best services and hospitality, so that you'll feel comfortable. That is what we do,
                    to make your stay feels like home, with an extra view.
                </v-card-text>
                <v-spacer></v-spacer>
                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Kelompok A</strong>
                </v-card-text>
            </v-card>
        </v-footer>
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
            sosmed: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-instagram',
            ],
        }
    },
    methods: {
    login() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
