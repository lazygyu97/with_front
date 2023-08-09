<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">SingUp</h1>
                <form>
                  <v-text-field
                      label="ID"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                      label="Name"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      label="Password"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      label="Password"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      type="E-mail"
                      label="E-mail"
                  ></v-text-field>
                  <v-btn
                      type="submit"
                      color="blue lighten-1 text-capitalize"
                      depressed
                      large
                      block
                      dark
                      class="mb-3"
                  >Login</v-btn>
                  <v-btn
                      @click="addUserShow"
                      color="blue lighten-1 text-capitalize"
                      depressed
                      large
                      block
                      dark
                  >Sign Up</v-btn>
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
export default {
  name: 'SignupForm',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      position: '',
      teamName: '',
    };
  },
  methods: {
    submitForm() {
      console.log('dd');
    },
  },
};
</script>

<style scoped></style>