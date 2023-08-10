<template>
  <v-app>
    <v-app-bar app>
      <HeaderComponent/>
    </v-app-bar>

    <v-main>
        <router-view/>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>