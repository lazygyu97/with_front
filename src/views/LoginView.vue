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
                    class="mb-5"
                >
                  Sign Up
                </v-btn>
                <!--                소셜로그인-->
                <!-- Social Login Buttons -->
                <v-layout justify-center row wrap>
                  <!-- Google Login Button -->
                  <v-flex xs4 class="pa-1">
                    <v-btn
                        @click="googleLogin"
                        color="red"
                        depressed
                        large
                        block
                        dark
                        rounded
                    >
                      Google
                    </v-btn>
                  </v-flex>

                  <!-- Naver Login Button -->
                  <v-flex xs4 class="pa-1">
                    <v-btn
                        @click="naverLogin"
                        color="green"
                        depressed
                        large
                        block
                        dark
                        rounded
                    >
                      Naver
                    </v-btn>
                  </v-flex>

                  <!-- Kakao Login Button -->
                  <v-flex xs4 class="pa-1">
                    <v-btn
                        @click="kakaoLogin"
                        color="yellow darken-2"
                        depressed
                        large
                        block
                        dark
                        rounded
                    >
                      Kakao
                    </v-btn>
                  </v-flex>
                </v-layout>
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
  mounted() {
    this.logout()
  },
  methods: {
    async logout() {
      try {
        if (window.localStorage.getItem("accessToken") !== null) {
          await axios.get("/users/logout");
        }
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("userImage");
        Cookies.remove("refreshToken");
      } catch (error) {
        console.log(error)
        alert(error.response.data)
      }
    }
    ,
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
        await axios.post("/users/login", data)
            .then(response => {
                  const accessToken = response.headers.get("Authorization")
                  const refreshToken = response.headers.get("RefreshToken");
                  if (accessToken !== undefined && refreshToken !== undefined) {
                    window.localStorage.setItem('accessToken', accessToken)
                    Cookies.set("refreshToken", refreshToken)
                    window.location.href = '/home'
                  }
                }
            )
      } catch (error) {
        alert(error.response.data)
        console.log(error.response.data);
      }
    },
    googleLogin() {
      window.location.href=`${process.env.VUE_APP_SERVER_URL}/oauth2/authorization/google`
    },

    naverLogin() {
      window.location.href=`${process.env.VUE_APP_SERVER_URL}/oauth2/authorization/naver`
    },

    kakaoLogin() {
      window.location.href=`${process.env.VUE_APP_SERVER_URL}/oauth2/authorization/kakao`
    },
  }
}

</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>
