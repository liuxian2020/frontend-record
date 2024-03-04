<template>
  <div class="content">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      points: [ // 散点图数据
        { name: '新疆', value: [87.628579, 43.793301], itemStyle: { color: '#00EEFF' } }, // 新疆
        { name: '四川', value: [104.076452, 30.651696], itemStyle: { color: '#00EEFF' } }, // 四川
      ],
      linesData: [// 线条数据
        { coords: [[116.407387, 39.904179], [87.628579, 43.793301]] },// 北京->新疆
        { coords: [[116.407387, 39.904179], [104.076452, 30.651696]] },// 北京->四川
      ],
      planePath: // 飞机svg
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    }
  },
  mounted () {
    console.log('进入了---')
    this.initCharts()
  },
  beforeDestroy () {
    const charts = echarts.init(this.$refs['charts'])
    charts.dispose()
  },
  methods: {
    initCharts () {
      const charts = echarts.init(this.$refs['charts'])
      const option = {
        backgroundColor: '#0E2152',// 背景颜色
        geo: {// 地图配置
          map: 'china',
          label: { // 图形上的文本标签
            normal: {// 通常状态下的样式
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {// 鼠标放上去高亮的样式
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {// 地图区域的样式设置
            normal: { // 通常状态下的样式
              borderColor: '#5089EC',
              borderWidth: 1,
              areaColor: { //地图区域的颜色
                type: 'radial', // 径向渐变
                x: 0.5, // 圆心
                y: 0.5,// 圆心
                r: 0.8,// 半径
                colorStops: [
                  { // 0% 处的颜色
                    offset: 0,
                    color: 'rgba(0, 102, 154, 0)'
                  },
                  { // 100% 处的颜色
                    offset: 1,
                    color: 'rgba(0, 102, 154, .4)'
                  }
                ]
              }
            },
            // 鼠标放上去高亮的样式
            emphasis: {
              areaColor: '#2386AD',
              borderWidth: 0
            }
          }
        },
        series: [
          { // 散点系列数据
            type: 'effectScatter',// 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo', //该系列使用的坐标系:地理坐标系
            // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
            effectType: 'ripple',
            // 配置何时显示特效。可选'render'和'emphasis' 。
            showEffectOn: 'render',
            rippleEffect: { // 涟漪特效相关配置。
              period: 10, // 动画的周期，秒数。
              scale: 4,// 动画中波纹的最大缩放比例。
              // 波纹的绘制方式，可选 'stroke' 和 'fill'。
              brushType: 'fill'
            },
            zlevel: 1, // 所有图形的 zlevel 值。
            data: this.points
          },
          { // 线条系列数据
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'], // 标记的图形: 箭头
            symbolSize: 10, // 标记的大小
            effect: { // 线条特效的配置
              show: true,
              period: 6, // 特效动画的时间，单位s
              trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
              symbol: this.planePath, // 特效图形的标记 可选'circle'等
              symbolSize: 15// 特效标记的大小
            },
            lineStyle: { // 线条样式
              normal: {
                color: '#93EBF8',
                width: 2.5, // 线条宽度
                opacity: 0.6, // 尾迹线条透明度
                curveness: 0.2// 尾迹线条曲直度
              }
            },
            data: this.linesData
          }
        ]
      }
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      let data = './map/100000_full.json'
      axios.get(data).then((res) => {
        echarts.registerMap('china', { geoJson: res.data })
        charts.setOption(option)
      })
      // echarts.registerMap('china', china)
      // charts.setOption(option)
    }
  }
}
</script>
<style scoped>
.content {
  /* background-color: #0e2152; */
  /* height: 100%; */
}
.charts {
   width: 100%;
  height: calc(100vh - 50px);
}
</style>