<template>
  <div class="dashboard">
    <v-navigation-drawer class="fullheight" width="256" v-model="drawer" absolute temporary color="white">
      <v-list-item>
        <v-list-item-content>
          <v-img max-height="100" max-width="100" :src="logo" style="margin-left:60px"></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link color="light-blue-darken-4" tag="router-link"
          :to="item.to">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="teal lighten-3" dark height="85">
      <v-app-bar-nav-icon @click="drawer = true" color="white"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-img :src="title" height="300" width="300" style="margin-top:12%"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-app-bar>

    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboradIndex",
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        { title: "Bookings", to: "/kamar" },
        { title: "Service", to: "/room" },
        { title: "Food Service", to: "/food" },
        { title: "Paket Wisata", to: "/trip" },
        { title: "LogOut", to: "/" },
      ],
      logo: require("../assets/mini.png"),
      title: require("../assets/logo_rmvd.png"),
    };
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

<style scoped>
.fullheight {
  min-height: 100vh !important;
}
</style>
