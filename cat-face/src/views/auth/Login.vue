<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="formData.email" type="text" class="form-control" name="email">
              <p class="table-danger" v-text="errors.email"></p>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="formData.password" type="password" class="form-control" name="password">
              <p class="table-danger" v-text="errors.password"></p>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <button @click="login" class="btn btn-primary">Login</button>
                </div>
              </div>
              <div class="col-md-6 text-right">
                <router-link to="/register">Create New Account</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: '',
        password: '',
        device_name: 'browser'
      },
      errors: {}
    }
  },
  methods: {
    login() {
      axios.post('http://localhost/Cool-Cat/cat-tail/public/api/login', this.formData).then(res => {
        localStorage.setItem('token', res.data)
        // this.$parent.loggedIn()
        this.$router.push('/')
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    }
  }
}
</script>

<style scoped>

</style>
