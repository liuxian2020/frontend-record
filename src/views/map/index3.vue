<template>
  <div class="content">
    <div ref="charts" class="charts2"></div>
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
        { name: '甘肃', value: [103.826777, 36.060634], itemStyle: { color: '#00EEFF' } }, // 甘肃
        { name: '云南', value: [102.709372, 25.046432], itemStyle: { color: '#00EEFF' } }, // 云南
        { name: '广西', value: [108.327537, 22.816659], itemStyle: { color: '#00EEFF' } }, // 广西
        { name: '湖南', value: [112.982951, 28.116007], itemStyle: { color: '#00EEFF' } }, // 湖南
        { name: '山东', value: [117.020725, 36.670201], itemStyle: { color: '#00EEFF' } }, // 山东
        { name: '河南', value: [113.753094, 34.767052], itemStyle: { color: '#00EEFF' } }, // 河南
        { name: '山西', value: [112.578781, 37.813948], itemStyle: { color: '#00EEFF' } }, // 山西
        { name: '福建', value: [119.296194, 26.101082], itemStyle: { color: '#00EEFF' } }, // 福建
        { name: '浙江', value: [120.152575, 30.266619], itemStyle: { color: '#00EEFF' } }, // 浙江
        { name: '江苏', value: [118.763563, 32.061377], itemStyle: { color: '#00EEFF' } }, // 江苏
        { name: '北京', value: [116.407387, 39.904179], itemStyle: { color: '#A6283F' } }, // 北京
        { name: '陕西', value: [108.953939, 34.266611], itemStyle: { color: '#00EEFF' } }, // 陕西
        { name: '广东', value: [113.266887, 23.133306], itemStyle: { color: '#00EEFF' } } // 广东
      ],
      linesData: [// 线条数据
        { coords: [[116.407387, 39.904179], [87.628579, 43.793301]] },// 北京->新疆
        { coords: [[116.407387, 39.904179], [104.076452, 30.651696]] },// 北京->四川
        { coords: [[116.407387, 39.904179], [103.826777, 36.060634]] },// 北京->甘肃
        { coords: [[116.407387, 39.904179], [102.709372, 25.046432]] },// 北京->云南
        { coords: [[116.407387, 39.904179], [108.327537, 22.816659]] },// 北京->广西
        { coords: [[116.407387, 39.904179], [112.982951, 28.116007]] },// 北京->湖南
        { coords: [[116.407387, 39.904179], [117.020725, 36.670201]] },// 北京->山东
        { coords: [[116.407387, 39.904179], [113.753094, 34.767052]] },// 北京->河南
        { coords: [[116.407387, 39.904179], [112.578781, 37.813948]] },// 北京->山西
        { coords: [[116.407387, 39.904179], [119.296194, 26.101082]] },// 北京->福建
        { coords: [[116.407387, 39.904179], [120.152575, 30.266619]] },// 北京->浙江
        { coords: [[116.407387, 39.904179], [118.763563, 32.061377]] },// 北京->安徽
        { coords: [[116.407387, 39.904179], [113.266887, 23.133306]] },// 北京->广东
        { coords: [[116.407387, 39.904179], [108.953939, 34.266611]] }// 北京->陕西
      ],
      codePath: [],
      myEcharts: null
    }
  },
  computed: {
    option () {
      let obj = {

      }
      return obj;
    }
  },
  mounted () {
    this.initCharts()
  },
  beforeDestroy () {
    // const charts = echarts.init(this.$refs['chinaMap'])
    this.myEcharts.dispose()
  },
  methods: {
    initCharts () {
      this.myEcharts = echarts.init(this.$refs['charts'])
      this.loadMap('./map/100000_full.json', 'china');//初始化全国地图
      let that = this
      this.myEcharts.on('click', function (params) {
        that.handleClick(params)
      });
      // 绑定双击事件，返回全国地图
      this.myEcharts.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        // clearTimeout(timeFn);
        //返回全国地图
        // that.loadMap('./map/100000_full.json', 'china');
      })
    },
    handleClick (params) {
      var timeFn = null;
      //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
      let that = this
      clearTimeout(timeFn);
      //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
      timeFn = setTimeout(function () {
        let allcode = require('../../api/mapJson/all.json')
        let clickRegionCode = allcode.find((areaJson) => areaJson.name === params.name).adcode;
        var name = params.name; //地区name
        let mapCodeFull = `./map/${clickRegionCode}_full.json`
        that.loadMap(mapCodeFull, name);
      }, 250);
      // 绑定双击事件，返回全国地图
      this.myEcharts.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        clearTimeout(timeFn);
        //返回全国地图
        that.loadMap('./map/100000_full.json', 'china');
      });

    },
    loadMap (mapCode, name) {
      this.codePath.push({
        code: mapCode,
        name: name
      });
      axios.get(mapCode).then((data) => {
        if (data) {
          echarts.registerMap(name, { geoJson: data.data });
          const convertDataList = [
            { name: '新疆', value: [87.628579, 43.793301, 0.41] }, // 新疆
            { name: '四川', value: [104.076452, 30.651696, 100]}]
          const pointMax = Math.max(...convertDataList.map(item => item.value[2]))
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
            series: [
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
          this.myEcharts.setOption(option, true);
        } else {
          alert('无法加载该地图');
        }
      });
    },
    getPoint (params) {
    }
  }
}
</script>
<style scoped>
/* .content {
  background-color: #0e2152;
  height: calc(100vh - 100px);
} */
.charts2 {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>