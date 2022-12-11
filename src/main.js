import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false

// import 'bootstrap/dist/css/bootstrap.css'
// import 'jquery/dist/jquery.min'
// import 'popper.js/dist/popper.min'
// import 'bootstrap/dist/js/bootstrap.min'

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
