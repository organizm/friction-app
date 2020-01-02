import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
