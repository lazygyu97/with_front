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
                <form>
                  <v-text-field
                      label="ID"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      label="Password"
                  >
                  </v-text-field>
                  <v-btn
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
                </form>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


import axios from "axios";

export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
      token:''
    }
  },
  methods: {
    fnLogin() {

      // if (this.user_id === '') {
      //
      //   alert('ID를 입력하세요.')
      //   return
      // }
      //
      // if (this.user_pw === '') {
      //   alert('비밀번호를 입력하세요.')
      //   return
      // }

      const data = {
        username: this.user_id,
        password: this.user_pw,
      };
      axios.post('/api/users/login',data,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset = utf-8'
        }
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('jwtToken',response.headers.get('Authorization'));
        localStorage.setItem('refreshToken',response.headers.get('Refreshtoken'));
        alert(response.headers.get('Refreshtoken'))
      })
      .catch(e => {
        console.log('error : ', e)
      })

      const data2 = {
        name: "test1",
        color:  "test2",
        info:  "test3"
      };

      axios.post('/api/boards',data2,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset = utf-8',
          'Authorization': localStorage.getItem('jwtToken'),
          'Refreshtoken': localStorage.getItem('refreshToken')
        }
      })
      .then(response => {

        console.log(response.data);
      })
      .catch(e => {
        console.log('error : ', e)
      })


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