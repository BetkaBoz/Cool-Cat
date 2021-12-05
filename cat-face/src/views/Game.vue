<template>
  <br/><br/><br/>
  <div class="container-game">
    <br/><br/><br/><br/>
    <img alt="New Game" src="../assets/Btn_New_Game.png" @click="newGame">
    <br/><br/><br/>
    <img alt="Load Game" src="../assets/Btn_Continue.png" @click="loadGame">
    <br/><br/><br/>
    <img alt="Change Difficulty" src="../assets/Btn_Difficulty.png" @click="circleThroughDifficulties">
    <br/><br/><br/><br/>
  </div>
  <br/><br/><br/>
</template>

<script>
import {createToast} from "mosha-vue-toastify";

export default {
  data() {
    return {
      diffClickCnt: 0
    }
  },
  methods: {
    newGame() {
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/newgame', {user_id: localStorage.getItem('user_id')}).then(res => {
        createToast(res.data.msg, {type: 'success', position:"bottom-right", timeout: 4000})
        this.loadGame()
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    },
    loadGame() {
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/load', {user_id: localStorage.getItem('user_id')}).then(res => {
        const data = res.data
        localStorage.setItem('difficulty', data.difficulty)
        localStorage.setItem('level', data.level)
        localStorage.setItem('score', data.score)
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    },
    circleThroughDifficulties() {
      const currentDifficulty = localStorage.getItem('difficulty')
      if (currentDifficulty == 'EASY') this.diffClickCnt = 0
      else if (currentDifficulty == 'MEDIUM') this.diffClickCnt = 1
      else if (currentDifficulty == 'HARD') this.diffClickCnt = 2
      this.diffClickCnt++
      this.diffClickCnt %= 3
      if (this.diffClickCnt == 0) this.changeDifficulty('EASY')
      else if (this.diffClickCnt == 1) this.changeDifficulty('MEDIUM')
      else if (this.diffClickCnt == 2) this.changeDifficulty('HARD')
    },
    changeDifficulty($difficulty) {
      this.$axios.post('http://localhost/Cool-Cat/cat-tail/public/api/difficulty', {
        user_id: localStorage.getItem('user_id'),
        difficulty: $difficulty
      }).then(res => {
        createToast(res.data.msg, {type: 'info', position:"bottom-right", timeout: 4000})
        if (localStorage.getItem('difficulty')) localStorage.setItem('difficulty', $difficulty)
      }).catch(er => {
        this.errors = er.response.data.errors
      })
    }
  }
}
</script>

<style scoped>
.container-game {
  background-color: rgba(0, 0, 0, 0.85);
  width: 80%;
  margin: auto;
}
img {
  width: 25%;
  height: auto;
  cursor: pointer;
}
</style>
