<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">SingUp</h1>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                      v-model="user_id"
                      :rules="user_id_rule"
                      label="ID"
                      prepend-inner-icon="mdi-account"
                  ></v-text-field>

                  <v-btn
                      @click="idCheck"
                      elevation="0"
                      small
                  >
                    Check
                  </v-btn>
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
                      v-model="user_email"
                      :rules="user_email_rule"
                      prepend-inner-icon="mdi-email"
                      type="E-mail"
                      label="E-mail"
                  ></v-text-field>
                  <v-row align="center" justify="center">
                    <v-flex xs12 sm6 md3>
                      <v-text-field
                          v-model="email_code_user"
                          label="Verification code"
                      ></v-text-field>
                    </v-flex>
                    <v-btn small style="margin-bottom: 10px" @click="emailSend">
                      Send
                    </v-btn>

                  </v-row>
                  <v-btn small style="margin-bottom: 10px" @click="emailCheck">
                    Check
                  </v-btn>
                  <v-btn
                      @click="addUserShow"
                      color="blue lighten-1 text-capitalize"
                      depressed
                      large
                      block
                      dark
                  >Sign Up
                  </v-btn>
                </v-form>

              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import axios from "@/axios/axios-instance";

export default {
  name: 'SignupForm',
  data() {
    return {
      idIsChecked: false,
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
      user_email: '',
      user_email_rule: [
        v => !!v || '이메일을 입력해주세요.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        }
      ],
      email_code: '',
      email_code_user: '',
      email_check: false,
      email_check_rule: [
        v => !!v || '인증코드를 입력해주세요',
      ]

    };
  },
  methods: {
    emailSend() {
      const data = {
        email: this.user_email
      };
      axios.post("/users/login/mail", data)
      .then(response => {
        console.log(response);
        this.email_code = response.data
        alert('인증 코드 전송 선공, 이메일을 확인해주세요')
      })
      .catch(error => {
        console.log(error);
        alert('인증 코드 전송 실패, 이메일을 확인해주세요')
        this.user_emil = ''
      })
    },
    emailCheck() {
      // const data = {
      //   email: this.user_email,
      //   code: this.email_code_user,
      // };
      if (this.email_code == this.email_code_user) {
        axios({
          method: 'get',
          url: '/users/login/mail',
          params: {
            email: this.user_email,
            code: this.email_code_user,
          }
        }, {withCredentials: true})
        .then((Response) => {
          console.log(Response);
          this.email_check = true;
          alert("인증이 완료되었습니다.")
        }).catch((Error) => {
          console.log(Error);
          this.email_code_user = ''
          alert("인증 실패")
        })
      } else {
        this.email_code_user = ''
        alert("인증 번호가 일치하지 않습니다.")
      }
    },
    idCheck() {
      const data = {
        username: this.user_id,
      };
      axios.post("/users/id", data)
      .then(response => {
        console.log(response);
        this.idIsChecked = true
        alert('사용가능한 아이디입니다.')
      })
      .catch(error => {
        console.log(error);
        alert("중복된 아이디입니다.")
        this.user_id = ''
      })
    },
    addUserShow() {
      if (this.idIsChecked && this.email_check) {
        const validate = this.$refs.form.validate();
        if (validate) {

          // 입력받은 값들을 alert로 표시
          const userInfo = {
            username: this.user_id,
            password: this.user_pw_chk,
            nickname: this.user_nm,
            email: this.user_email,
          };

          axios.post("/users/signup", userInfo)
          .then(response => {
            console.log(response);

            alert('회원가입 성공')
            this.$router.push('/')
          })
          .catch(error => {
            console.log(error);
            alert(error)
          })
        }
      } else {
        alert("회원가입 실패")
      }
    },
  },
};
</script>

<style scoped></style>
