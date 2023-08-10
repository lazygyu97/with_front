<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">SingUp</h1>
                  <v-text-field
                      v-model="user_id"
                      :rules="user_id_rule"
                      label="ID"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                      v-model="user_nm"
                      :rules="user_nm_rule"
                      label="Name"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="user_pw_rule"
                      :type="show3 ? 'text' : 'password'"
                      name="user_pw"
                      v-model="user_pw"
                      label="Password"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="show3 = !show3"
                  ></v-text-field>
                  <v-text-field
                      prepend-inner-icon="mdi-lock"
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="user_pw_rule2"
                      :type="show4 ? 'text' : 'password'"
                      v-model="user_pw_chk"
                      name="user_pw_chk"
                      label="Password Confirm"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="show4 = !show4"
                  ></v-text-field>
                  <v-text-field
                      v-model="email"
                      :rules="user_emil_rule"
                      prepend-inner-icon="mdi-lock"
                      type="E-mail"
                      label="E-mail"
                  ></v-text-field>

                  <v-btn
                      @click="addUserShow"
                      color="blue lighten-1 text-capitalize"
                      depressed
                      large
                      block
                      dark
                  >Sign Up
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
export default {
  name: 'SignupForm',
  data() {
    return {
      show3: false,
      show4: false,
      user_id: '',
      user_id_rule: [
        v => !!v || '아이디는 필수 입력사항입니다.',
        v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.',
        v => !(v && v.length >= 15) || '아이디는 15자 이상 입력할 수 없습니다.'
      ],
      user_nm: '',
      user_nm_rule: [
        v => !!v || '이름은 필수 입력사항입니다.',
        v => !(v && v.length >= 30) || '이름은 30자 이상 입력할 수 없습니다.',
        v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
      ],
      user_pw: '',
      user_pw_chk: '',
      user_pw_rule: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
      ],
      user_pw_rule2: [
        v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
        v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
        v => v === this.user_pw || '패스워드가 일치하지 않습니다.'
      ],
      user_emil: '',
      user_emil_rule: [
        v => !!v || '이메일을 입력해주세요.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        }
      ],
      // email_code: '',
      // email_check: false,
      // email_check_rule: [
      //   v => !!v || '인증코드를 입력해주세요',
      //
      // ]

    };
  },
  methods: {
    addUserShow() {
      const validate = this.$refs.form.validate();
      alert(validate)
      if(validate){
        // 입력받은 값들을 alert로 표시
        const userInfo = {
          username: this.user_id,
          password: this.user_pw_chk,
          nickname: this.user_nm,
          email: this.email,
        };
        alert(JSON.stringify(userInfo, null, 2));
      }



    },
  },
};
</script>

<style scoped></style>