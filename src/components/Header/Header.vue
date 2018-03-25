<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" @click="$router.push(`/dashboard`)">Dashboard</b-nav-item>
      <!-- <b-nav-item class="px-3">Users</b-nav-item>
      <b-nav-item class="px-3">Settings</b-nav-item> -->
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none" @click="$router.push('/message')">
        <i class="icon-envelope-letter"></i>
        <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item> -->
      <HeaderDropdown/>
    </b-navbar-nav>
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <div class="position-alert">
      <b-alert :variant="alertVariant"
               dismissible
               :show="alertVisible"
               @dismissed="alertVisible=false">
        {{alertText}}
      </b-alert>
    </div>
  </header>
</template>
<script>
  import HeaderDropdown from './HeaderDropdown.vue'
  import {Events} from '../../events.js'
  export default {
    name: 'c-header',
    components: {
      HeaderDropdown
    },
    data () {
      return {
        alertVariant: 'success',
        alertVisible: false,
        alertText: 'test'
      }
    },
    methods: {
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      asideToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
      },
      alert (aText, aVariant, aVisible) {
        this.alertText = aText
        this.alertVariant = aVariant
        this.alertVisible = aVisible
        window.setTimeout(() => {
          this.alertVisible = false
        }, 3000)
      }
    },
    created () {
      Events.$on('alert', this.alert)
    }
  }
</script>
<style>
.position-alert{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index: 20000
}
</style>
