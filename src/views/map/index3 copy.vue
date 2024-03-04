<template>
  <div>
    <div class="chinaMap"
                   ref="chinaMap"></div>
  </div>
</template>
<script>
// import './china.js'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      points: [ // 散点图数据
        { name: '新疆', value: [87.628579, 43.793301], itemStyle: { color: '#00EEFF' } }, // 新疆
        { name: '四川', value: [104.076452, 30.651696], itemStyle: { color: '#00EEFF' } }, // 四川
      ],
      linesData: [// 线条数据
        { coords: [[116.407387, 39.904179], [87.628579, 43.793301]] },// 北京->新疆
        { coords: [[116.407387, 39.904179], [104.076452, 30.651696]] },// 北京->四川
      ],
      selectName: '',
      planePath: // 飞机svg
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    }
  },
  mounted () {
    // const myChart = echarts.init(this.$refs.chinaMap)
    // myChart.setOption({
    //     series: [{
    //         type: 'map',
    //         map: 'china'
    //     }]
    //   })
    this.initCharts()
  },
  beforeDestroy () {
    const charts = echarts.init(this.$refs['chinaMap'])
    charts.dispose()
  },
  methods: {
    initCharts () {
      const charts = echarts.init(this.$refs['chinaMap'])
      this.loadMap('./map/100000_full.json', 'china');//初始化全国地图
      const that = this
      const pointMax = Math.max(...convertDataList.map(item => item.value[2]))
      const convertDataList = [
        { name: '新疆', value: [87.628579, 43.793301, 0.41] }, // 新疆
        { name: '四川', value: [104.076452, 30.651696, 100]}]
      const option = {
        backgroundColor: '#0E2152',// 背景颜色
        geo: {// 地图配置
          map: 'china',
          select: {
            label: {
              color: '#F4DC32'
            },
            itemStyle: {
              areaColor: '#122446',
              borderColor: '#F4DC32'
            }
          },
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
        // regions: [
        //     { // 设置点击后高亮
        //       name: this.selectName, // 高亮的省份
        //       itemStyle: {
        //         areaColor: '#EFF1FF' // 区域颜色
        //       }
        //     }
        //   ],
        series: [
          { // 散点系列数据
            type: 'effectScatter',// 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo', //该系列使用的坐标系:地理坐标系
            // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
            effectType: 'ripple',
            // 配置何时显示特效。可选'render'和'emphasis' 。
            showEffectOn: 'render',
            symbol: this.planePath,
            zlevel: 1, // 所有图形的 zlevel 值。
            data: this.points
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'rect', // 气泡
            symbolSize: function (val) {
              if (val[2] < 1) {
                return [15, 15]
              } else {
                const len = val[2] / pointMax * 55 + 15
                return [15, len]
              }
            },
            label: {
              show: true,
              position: 'top',
              fontSize: 8,
              color: '#fff',
              backgroundColor: '#222',
              padding: 4,
              formatter: (v) => {
                return v.data.value[2]
              }
            },
            symbolKeepAspect: true,
            symbolOffset: [0, '-60%'],
            itemStyle: {
              color: function (val) {
                if (val.value[2] < 1) {
                  return {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#00B5D3' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#115B78' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                } else {
                  return {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#F8DE32' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#6B7432' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              }
            },
            zlevel: 6,
            data: convertDataList
          }
        ]
      }
      charts.setOption(option, true);
      charts.on('click', function (params) {
        charts.dispatchAction({
          type: 'geoSelect',
          name: params.name
        })
      })
      charts.on('geoselectchanged', function (params) {
        that.selectName = params.name
      })
      charts.on('mousemove', function (param) {
        charts.dispatchAction({
          type: 'downplay',
          name: param.name
        })
      })
      charts.setOption(option);
      window.addEventListener('resize', function () {
        charts.resize()
      })
    }
  }
}
</script>
<style scoped>
.chinaMap {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>