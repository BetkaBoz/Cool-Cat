<template>
  <div>
    <br/><br/><br/>
    <div class="row justify-content-center">
      <h2>Join us!</h2>
      <div class="col-md-4">
        <br/>
        <div class="card">
          <div class="card-body">
            <br/>

              <div class="form-group">
                <input v-model="formData.name" type="text" class="form-control" name="name" placeholder="Username">
                <p class="table-danger" v-text="errors.name"></p>
              </div>

              <div class="form-group">
                <input v-model="formData.email" type="text" class="form-control" name="email" placeholder="Email">
                <p class="table-danger" v-text="errors.email"></p>
              </div>

              <div class="form-group">
                <input v-model="formData.password" type="password" class="form-control" name="password" placeholder="Password">
                <p class="table-danger" v-text="errors.password"></p>
              </div>

              <div class="form-group">
                <input v-model="formData.password_confirmation" type="password" class="form-control"
                       name="password_confirmation" placeholder="Confirm Password">
                <p class="table-danger" v-text="errors.password_confirmation"></p>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <button @click="registerUser" class="btn btn-primary">Register</button>
                </div>
              </div>

            <br/>
            <div class="col-md-12 text-center">
              <router-link to="/login">Already have an account!</router-link>
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
  name: "Register",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  },
  methods: {
    registerUser() {
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/register', this.formData).then(
          res => {
            console.log(res.data)
            this.formData.name = this.formData.email = this.formData.password = this.formData.password_confirmation = ''
            this.errors = {}
            this.$router.push('/login')
            createToast('Register Successful', {type: 'success', timeout: 4000})
          }
      ).catch(er => {
        this.errors = er.response.data.errors
        console.log(this.errors)
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
