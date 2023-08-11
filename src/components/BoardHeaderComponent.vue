<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >

      {{ this.name }}
      <v-spacer></v-spacer>


      <v-btn
          v-show="isValidUser"
          elevation="2"


      >edit
      </v-btn>
      <v-btn
          v-show="isValidUser"
          elevation="2"
      >share
      </v-btn>


    </v-app-bar>

  </v-card>
</template>

<script>
import axios from "@/axios/axios-instance";
import Cookies from 'js-cookie';

export default {
  props: ["name"],
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
      try {
        await axios.get("/users/logout");
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("userImage");
        Cookies.remove("refreshToken");
        window.location.href='/';
      } catch (error) {
        alert(error)
      }
    },
    async checkValidUser() {
      try {
        await axios.get("users")
        .then(response => {
          console.log(response.data.username)
          this.isValidUser=true;
        })
      } catch (error) {
        await this.$router.push('/');
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