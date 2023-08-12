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
import axios from "@/axios/axios-instance";
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
    async logout() {
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("userImage");
      Cookies.remove("refreshToken");
      window.location.href = '/';
    },
    async checkValidUser() {
      try {
        if (window.localStorage.getItem("username") !== null) {
          this.isValidUser = true;
        }
        await axios.get("users")
            .then(response => {
              this.isValidUser = true;
            })
      } catch (error) {
        console.log(error)
      }
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