<template>
    <div id="app">
        <a-spin :spinning="spinning" size="large" tip="Loading...">
            <router-view/>
        </a-spin>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'App',
  data () {
    return {
      spinning: false
    }
  },
  methods: {
    setSpinning (flag) {
      this.spinning = flag
    }
  },
  created () {
    Vue.prototype.$setLoading = this.setSpinning
  }
}
</script>
<style lang="scss">
    #app {
        text-align: center;
        color: #2c3e50;
        height: 100%;

        & > .ant-spin-nested-loading {
            position: static;
            /*height: 100%;*/

            & > div {
                height: 100%;

                & > div {
                    height: 100%;
                }
            }
        }
    }
</style>
