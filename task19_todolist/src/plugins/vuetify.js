import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#007152",
        secondary: "#00a17e",
        tertiary: "#808e95"
      }
    }
  }
});
