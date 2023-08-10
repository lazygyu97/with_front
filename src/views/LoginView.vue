<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <!-- Login Component -->
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">Login</h1>
                <v-text-field
                    v-model="user_id"
                    label="ID"
                    prepend-inner-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    v-model="user_pw"
                    prepend-inner-icon="mdi-lock"
                    @click:append="show3 = !show3"
                    label="Password"
                >
                </v-text-field>
                <v-btn
                    @click="fnLogin"
                    type="submit"
                    color="blue lighten-1 text-capitalize"
                    depressed
                    large
                    block
                    dark
                    class="mb-3"
                >
                  Login
                </v-btn>
                <v-btn
                    @click="addUserShow"
                    color="blue lighten-1 text-capitalize"
                    depressed
                    large
                    block
                    dark
                >
                  Sign Up
                </v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


import axios from '@/axios/axios-instance';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      show3: false,
      user_id: '',
      user_pw: '',
      token: ''
    }
  },
  methods: {
    addUserShow() {
      this.$router.push('/signup');
    },
    async fnLogin() {

      if (this.user_id === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.')
        return
      }

      const data = {
        username: this.user_id,
        password: this.user_pw,
      };

      try {
        const response = await axios.post("/users/login", data);
        const accessToken = response.headers.get("Authorization")
        const refreshToken = response.headers.get("RefreshToken");
        window.localStorage.setItem('accessToken', accessToken)
        Cookies.set("refreshToken", refreshToken)

        console.log(window.localStorage.getItem('accessToken'))
        console.log(Cookies.get("refreshToken"))
        console.log(response.data);
        window.location.href = '/home'
      } catch (error) {
        alert(error.response.data)
        console.log(error.response.data);
      }
    }
  }
}

</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>
