<template>
  <nav class="navbar navbar-expand-md navbar-dark navbar-custom navbar-brand fixed-top">
    <div class="container px-5">
      <router-link to="/" class="navbar-brand"><img src="@/assets/CC_logo.png" alt="Cool Cat" class="img-fluid logo">
        Izakanyaa
      </router-link>

      <div class="nav justify-content-end" v-if="!this.$route.meta.guest">
        <router-link to="/about" class="nav-item nav-link">About</router-link>
        <button @click="logout" class="btn btn-success my-2 my-sm-0">Logout</button>
      </div>

      <div class="nav justify-content-end" v-else>
        <router-link to="/login" class="nav-link" style="color: rgba(255, 255, 255, 0.55);">Login</router-link>
        |
        <router-link to="/register" class="nav-link" style="color: rgba(255, 255, 255, 0.55);">Register</router-link>
      </div>
    </div>
  </nav>
  <br/>
  <br/>
  <br/>
  <br/>
  <div class="container-fluid" style="width: 90%; min-height: 80%">
    <router-view/>
  </div>
</template>

<script>
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  created() {
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    this.$axios.get('http://localhost/Cool-Cat/cat-tail/public/api/user').then(res => {
      this.currentUser = res.data //toto je zatial nepouzite, ale su tam ulozene udaje o uzivatelovi, aby sme ich potom mohli vypisat na stranke
    }).catch(er => {
      console.log(er)
    })
  },
  activated() {
    console.log('activated')
  },
  data() {
    return {
      currentUser: {},
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    logout() {
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/logout').then(() => {
        localStorage.removeItem('token')
        this.token = localStorage.getItem('token')
        this.$router.push('/login')
        createToast('Logout Successful', {type: 'success'})
      }).catch(er => {
        console.log(er)
      })
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.58);
}

.navbar-custom {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-right: 0rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.navbar-brand {
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: 700;
}

.nav-item, .nav-link {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: rgba(255, 255, 255, 0.55);
}

.nav-link, .nav-item:hover {
  color: rgba(255, 255, 255, 0.85);
}

.logo {
  vertical-align: sub;
  width: 2em;
}

.container-fluid {
  background-color: rgba(0, 0, 0, 0.85)
}
</style>
