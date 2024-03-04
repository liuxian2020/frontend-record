<template>
  <div class="pdf-box">
    <!-- <pdf :src="'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'"></pdf> -->
    <el-card style="width:800px;height: calc(100vh - 50px);overflow-x: hidden;overflow-y:auto;margin-bottom: 0px;">
      <pdf v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
    </el-card>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  // props: ['url'],
  data () {
    return {
      numPages: 1,
      // url: 'http://39.101.162.213/pdfview.pdf'
      url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
    }
  },
  created () {
    this.getNumPages(this.url)
  },
  methods: {
    getNumPages (url) {
      let loadingTask = pdf.createLoadingTask(url);
      loadingTask.promise.then(pdf => {
        this.url = loadingTask
        this.numPages = pdf.numPages
      }).catch(_ => {
        console.error('pdf加载失败')
      })
    },

  }
}
</script>
<style lang="scss">
.pdf-box {
  display: flex;
  justify-content: center;
}
</style>