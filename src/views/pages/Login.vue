<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <!-- <input type="text" v-model="username" class="form-control" placeholder="Username" @blur="$v.username.$touch"/> -->
                  <b-form-input
                        :state="$v.username.$error?false:null"
                        type="text"
                        v-model.trim="username"
                        placeholder="Username"
                        @input.native="wrongCrud=false"
                        @keyup.enter.native="login"
                        @blur.native="$v.username.$touch">
                  </b-form-input>
                  <div class="invalid-feedback d-block" v-if="$v.username.$error && !$v.username.required">Username is Required</div>
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <!-- <input type="password" v-model="password" class="form-control" placeholder="Password"> -->
                  <b-form-input
                        :state="$v.password.$error?false:null"
                        type="password"
                        v-model.trim="password"
                        placeholder="Password"
                        @input.native="wrongCrud=false"
                        @keyup.enter.native="login"
                        @blur.native="$v.password.$touch">
                  </b-form-input>
                  <div class="invalid-feedback d-block" v-if="$v.password.$error && !$v.password.required">Password is Required!</div>
                  <div class="invalid-feedback d-block" v-if="wrongCrud">Username or Password is incorrect!</div>
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" @click="login">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card> -->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
const { required } = require('vuelidate/lib/validators')
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      wrongCrud: false
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        let body = {
          username: this.username,
          password: this.password
        }
        this.$http.post(this.API_ENDPOINT + '/admin/auth/login/admin', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
          window.sessionStorage.setItem('user', JSON.stringify(response.data))
          console.log(response.data)
          window.location.href = '/'
        }).catch(err => {
          this.wrongCrud = true
          console.log('this is an error ', err)
        })
      }
    }
  }
}
</script>
