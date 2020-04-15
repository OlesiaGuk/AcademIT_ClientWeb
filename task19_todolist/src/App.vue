<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list dense>
        <router-link class="drawer-links" to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-format-list-checks</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>To Do List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="drawer-links" to="/about">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-information-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>To Do List</v-toolbar-title>
    </v-app-bar>

    <v-content class="ma-5">
      <router-view></router-view>
    </v-content>

    <v-footer
      app
      color="primary"
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "App",

    props: {
      source: String
    },

    data: () => ({
      drawer: null
    })
  };
</script>

<style>
  .drawer-links {
    text-decoration: none;
  }
</style>
