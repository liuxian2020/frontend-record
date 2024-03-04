<template>
  <div>
    <micro-app class="screenClass" name="vue3App" :url="iframeSrc" baseroute="" :data="microAppData"></micro-app>
  </div>
</template>

<script>
import { removeDomScope } from '@micro-zoe/micro-app'
export default {
  data () {
    return {
      iframeSrc: "",
      microAppData: {
        msg: '',
        pushState: (path) => {
          removeDomScope()
          this.$router.push(path)
        }
      },
    };
  },
  created () {
    // 生产环境
    if (process.env.NODE_ENV === "production") {
      const { protocol, hostname } = window.location
      this.iframeSrc = `${protocol}//${hostname}/vue3/`
    } else {
      this.iframeSrc = 'http://39.101.162.213/vue3/'
    }
    // this.microAppData.msg = getToken()
  },
  beforeDestroy () {
  },
  methods: {
  }
};
</script>
<style lang="scss">
.screenClass {
  width: 100%;
  height: calc(100vh - 55px);
}
</style>