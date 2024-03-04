<template>
  <div ref="charts" style="width: 1200px; height: 1000px;margin:0 auto"></div>
</template>
// 加入一些有趣的echarts

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      const charts = echarts.init(this.$refs['charts'])
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      charts.setOption(option)
    }
  }
}
</script>
<style scoped>
</style>