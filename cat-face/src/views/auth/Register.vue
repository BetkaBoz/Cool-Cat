<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="form-group">
              <label htmlFor="name">Name</label>
              <input v-model="formData.name" type="text" class="form-control" name="name">
              <p class="table-danger" v-text="errors.name"></p>
            </div>
            <div class="form-group">
              <label htmlFor="email">Email</label>
              <input v-model="formData.email" type="text" class="form-control" name="email">
              <p class="table-danger" v-text="errors.email"></p>
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input v-model="formData.password" type="password" class="form-control" name="password">
              <p class="table-danger" v-text="errors.password"></p>
            </div>
            <div class="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input v-model="formData.password_confirmation" type="password" class="form-control"
                     name="password_confirmation">
              <p class="table-danger" v-text="errors.password_confirmation"></p>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <button @click="registerUser" class="btn btn-primary">Register</button>
                </div>
              </div>
              <div class="col-md-6 text-right">
                <router-link to="/login">Already have an account!</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

</style>
