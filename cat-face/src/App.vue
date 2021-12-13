<template>
  <nav class="navbar navbar-expand-md navbar-dark navbar-custom navbar-brand fixed-top">
    <div class="container px-5">
      <router-link v-if="this.$route.meta.guest" to="/" class="navbar-brand"><img src="@/assets/CC_logo.png" alt="Cool Cat" class="img-fluid logo">
        Izakanyaa
      </router-link>
      <router-link v-if="this.$route.meta.requiresAuth" to="/home" class="navbar-brand"><img src="@/assets/CC_logo.png" alt="Cool Cat" class="img-fluid logo">
        Izakanyaa
      </router-link>

      <div class="nav justify-content-end" v-if="this.$route.meta.guest">
        <router-link to="/login" class="nav-link" style="color: rgba(255, 255, 255, 0.55);">Login</router-link>
        |
        <router-link to="/register" class="nav-link" style="color: rgba(255, 255, 255, 0.55);">Register</router-link>
      </div>

      <div class="nav justify-content-end" v-else-if="this.$route.meta.requiresAuth">
        <router-link to="/game" class="nav-item nav-link" style="color: rgba(255, 255, 255, 0.55)">Game</router-link>
        <button @click="logout" class="nav-item btn-logout">Logout</button>
      </div>
    </div>
  </nav>
  <br/><br/><br/><br/>
  <div class="container-fluid" style="width: 90%; min-height: 80%">
    <router-view/>
  </div>
  <footer>
    <br/>
    <div class="container">
      <div class="row">
        <div class="col" style="text-align: left">
          <p class="navbar-brand">©Studio Cool Cat</p>
        </div>
        <div class="col" style="text-align: right">
          <p class="navbar-brand">Join us on Discord <a href="https://discord.gg/zYuku7bvck"><img alt="Cool Cat Server" src="@/assets/Discord.png" style="width: 5%"></a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import Game from '@/views/Game'

export default {
  created() {
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    this.$axios.get('http://localhost/Cool-Cat/cat-tail/public/api/user').then(res => {
      this.currentUser = res.data //toto je zatial nepouzite, ale su tam ulozene udaje o uzivatelovi, aby sme ich potom mohli vypisat na stranke
    }).catch(er => {
      console.log(er)
    })
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
        localStorage.removeItem('user_id')
        this.clearSaveData()
        this.token = localStorage.getItem('token')
        this.$router.push('/login')
        createToast('Logout Successful', {type: 'success', position:"bottom-right", timeout: 4000})
      }).catch(er => {
        console.log(er)
      })
    },
    clearSaveData() {
      localStorage.removeItem('difficulty')
      localStorage.removeItem('level')
      localStorage.removeItem('score')
    },
    components: {
      Game
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

.btn-logout {
  border: 2px solid rgba(211, 211, 211, 0.55);
  background-color: rgba(211, 211, 211, 0.55);
  border-radius: 0.5em;
  cursor: pointer;
}

.btn-logout:hover {
  border: 2px solid rgba(255, 2, 107, 0.70);
  background-color: rgba(255, 2, 107, 0.70);
}
</style>
