<template>
  <br/><br/>
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
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.gameInstance.destroy(true)
    next()
  }
}
</script>

<style scoped>

</style>