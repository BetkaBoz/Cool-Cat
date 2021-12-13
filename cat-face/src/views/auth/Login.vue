<template>
  <div>
    <br/><br/><br/>
    <div class="row justify-content-center">
      <h2>Start your cooking adventure!</h2>
      <div class="col-md-4">
        <br/>
        <div class="card">
          <div class="card-body">
            <br/>

              <div class="form-group">
                <input v-model="formData.email" type="text" class="form-control" name="email" placeholder="Email">
                <p class="table-danger" v-text="errors.email" style="color: #b91d19"></p>
              </div>

              <div class="form-group">
                <input v-model="formData.password" type="password" class="form-control" name="password" placeholder="Password">
                <p class="table-danger" v-text="errors.password" style="color: #b91d19"></p>
              </div>

              <div class="form-group">
                <button @click="login" class="btn btn-primary">Login</button>
              </div>

            <br/>
            <div class="col-md-12 text-center">
              <p>Haven't joined yet? Register <router-link to="/register">here</router-link>!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/><br/><br/>
  </div>
</template>

<script>
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

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
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/login', this.formData).then(res => {
        localStorage.setItem('token', res.data[0])
        localStorage.setItem('user_id', res.data[1])
        this.$router.push('/')
        createToast('Login Successful', {type: 'success', position:"bottom-right", timeout: 4000})
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    }
  }
}
</script>

<style scoped>
.card {
  background-color: rgba(96,111,123,0)
}
h2 {
  color: rgba(255, 255, 255, 0.85);
}
button {
  background-color: #0dc6fd61;
  border-color: #0dc6fd61;
}
button:hover {
  background-color: rgba(13, 198, 253, 0.75);
  border-color: rgba(13, 198, 253, 0.75);
}
a {
  color: rgba(13, 198, 253, 0.55);
  text-decoration: none;
}
a:hover {
  color: rgba(13, 198, 253, 0.75);
}
</style>
