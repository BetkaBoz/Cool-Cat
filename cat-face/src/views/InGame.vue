<template>
  <br/><br/>
  <button @click="unmounted" class="nav-item btn-logout" style="">End Game</button>
  <br/><br/>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else >
    Downloading...
  </div>
  <br/><br/><br/><br/>
</template>

<script>
export default {
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ '@/Izakanyaa-code/js/game')
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  data() {
    return {
      diffClickCnt: 0,
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  methods: {
    unmounted() {
      this.gameInstance.destroy(true)
      this.$router.push('/game')
    },
  }
}
</script>

<style scoped>

</style>