<template>
<!--    <div v-if="isLoggedIn" name="nav">-->
<!--    <div id="nav">-->
<!--      <div v-if="isLoggedIn">-->
<!--        <router-link to="/">Home</router-link>-->
<!--        |-->
<!--        <router-link to="/about">About</router-link>-->
<!--        |-->
<!--        <button @click="logout" class="btn btn-success">Logout</button>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <router-link to="/login">Login</router-link>-->
<!--      </div>-->
<!--    </div>-->


  <div id="nav">
    <div>
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Register</router-link>
      |
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <button @click="logout" class="btn btn-success">Logout</button>
    </div>
  </div>
  <router-view/>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get('http://localhost/Cool-Cat/cat-tail/public/api/user').then(res=>{
      this.currentUser = res.data //toto je zatial nepouzite, ale su tam ulozene udaje o uzivatelovi, aby sme ich potom mohli vypisat na stranke
      // this.loggedIn()
    }).catch(er => {
      console.log(er)
    })
  },
  activated() {
    console.log('activated')
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: {},
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    // loggedIn() {
    //   this.isLoggedIn = localStorage.getItem('token')
    // },
    logout() {
      axios.post('http://localhost/Cool-Cat/cat-tail/public/api/logout').then(() => {
        // setTimeout(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        // }, 1000)
      }).catch(er => {
        console.log(er)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
