<template>
  <br/><br/><br/>
  <div class="container-fluid">
    <button @click="newGame">New Game</button>
    <button @click="loadGame">Load Game</button>
  </div>
  <br/><br/><br/>
</template>

<script>
import {createToast} from "mosha-vue-toastify";

export default {
  methods: {
    newGame() {
      console.log('new game')
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/newgame', {user_id: localStorage.getItem('user_id')}).then(res => {
        const msg = res.data.msg
        createToast(msg, {type: 'success', timeout: 2000})
        this.loadGame()
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    },
    loadGame() {
      console.log('load game')
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/load', {user_id: localStorage.getItem('user_id')}).then(res => {
        const data = res.data
        localStorage.setItem('difficulty',data.difficulty)
        localStorage.setItem('level',data.level)
        localStorage.setItem('score',data.score)
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    }
  }
}
</script>
