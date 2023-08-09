<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >

      <router-link to="/home">   <v-img
          lazy-src="../assets/logo.png"
          max-height="100"
          max-width="180"
          src="../assets/logo.png"
      ></v-img></router-link>

      <v-spacer></v-spacer>


      <router-link to="/login">Login</router-link>


    </v-app-bar>

  </v-card>
</template>

<script setup>

</script>

<style scoped lang="scss">
.overflow-hidden{
  width: 100%;
  height: 64px;
}
</style>