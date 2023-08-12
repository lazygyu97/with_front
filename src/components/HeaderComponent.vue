<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >
      <router-link to="/home">
        <v-img
            lazy-src="../assets/logo.png"
            max-height="100"
            max-width="180"
            src="../assets/logo.png"
        ></v-img>
      </router-link>
      <v-spacer></v-spacer>
        <v-btn
            v-show="isValidUser"
            elevation="2"
            @click="logout"
        >Logout
        </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
import Cookies from "js-cookie";

export default {

  data() {
    return {
      isValidUser: false
    }
  },
  mounted() {
    this.checkValidUser();
  },
  methods: {
    logout() {
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("userImage");
      Cookies.remove("refreshToken");
      this.checkValidUser()
      this.$router.push('/');
    },
    async checkValidUser() {
      this.isValidUser = window.localStorage.getItem("accessToken") !== null
          && window.localStorage.getItem("accesToken") !== "undefined";
    }
  },
}
</script>

<style scoped lang="scss">
.overflow-hidden {
  width: 100%;
  height: 64px;
}
</style>