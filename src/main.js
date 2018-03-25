// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Croppa from 'vue-croppa'
import { loadProgressBar } from 'axios-progress-bar'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.use(loadProgressBar)

Vue.use(Croppa)

Vue.use(BootstrapVue)

Vue.prototype.$http = axios

Vue.prototype.SIZE = 30

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.API_ENDPOINT = ''
  Vue.prototype.WEB_ROOT = 'http://202.79.34.189:7711'
}

if (process.env.NODE_ENV === 'development') {
  Vue.prototype.API_ENDPOINT = 'http://localhost:8888'
  Vue.prototype.WEB_ROOT = 'http://localhost:7777'
}

router.beforeEach((to, from, next) => {
  // setTimeout(() => {
  //   window.scrollTo(0, 0)
  // }, 100)
  axios.get(Vue.prototype.API_ENDPOINT + '/admin/auth/checkLogin', {headers: { 'Content-Type': 'application/json' }}).then(response => {
    if (response.data === null) {
      Vue.prototype.$AUTH = false
      if (to.path !== '/login') {
        next('/login')
      }
      next()
    } else {
      Vue.prototype.$AUTH = true
      window.sessionStorage.setItem('user', JSON.stringify(response.data))
      next()
    }
  }).catch(err => {
    console.log('this is an error ', err)
  })
})

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response.status === 401 && window.location.hash !== '#/login') {
    window.location.href = '/'
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
