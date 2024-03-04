<template>
  <div class="sale-data"
       :class="dataType">
    <div class="sale-background"
         v-loading="loading">
      <el-row class="sale-main-wrap">
        <el-col :span="12">
          <div class="grid-content">
            <div class="background sale-month">
              <div ref="lineChart"
                   class="lineChart"></div>
            </div>
            <div class="background sale-scale">
              <div ref="pieChart"
                   class="pieChart"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="background sale-value-month">
              <div ref="barChart"
                   class="barChart"></div>
            </div>
            <div class="background sale-value">
              <div ref="barChartProduct"
                   class="barChartProduct"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import './map/js/china.js'
import getLineOption from './echarts/lineOption'
import getBarOption from './echarts/barOption'
import getPieOption from './echarts/pieOption'
import * as echarts from 'echarts'
// import service from '@/api/screen'
// const baseUrl = '/resources/onegame/staticSaleData'
const baseUrl = 'http://10.179.6.8:17001/resources/onegame/staticSaleData'
// const baseUrl = '../../assets/sale'
export default {
  name: 'saleData',
  data () {
    return {
      geoCoordMap: {
        江苏: [120.34094130672383, 34.49093327643905],
        辽宁: [121.85254967500032, 41.98240794500012]
      },
      staticData: {
        // 江苏
        jiangsu: {
          saleMonth: `${baseUrl}/sale-month-jiangsu.png`,
          saleScale: `${baseUrl}/sale-scale-jiangsu.png`,
          saleValueMonth: `${baseUrl}/sale-value-month-jiangsu.png`,
          saleValue: `${baseUrl}/sale-value-jiangsu.png`,
          selected: `${baseUrl}/sale-jiangsu.png`
        },
        // 辽宁
        liaoning: {
          saleMonth: `${baseUrl}/sale-month-liaoning.png`,
          saleScale: `${baseUrl}/sale-scale-liaoning.png`,
          saleValueMonth: `${baseUrl}/sale-value-month-liaoning.png`,
          saleValue: `${baseUrl}/sale-value-liaoning.png`,
          selected: `${baseUrl}/sale-liaoning.png`
        },
        // 全国
        wholeCountry: {
          saleMonth: `${baseUrl}/sale-month-whole-data.png`,
          saleScale: `${baseUrl}/sale-scale-whole-data.png`,
          saleValueMonth: `${baseUrl}/sale-value-month-whole-data.png`,
          saleValue: `${baseUrl}/sale-value-whole-data.png`
        },
        background: `${baseUrl}/sale-back.png`,
        'bg-map': `${baseUrl}/sale-map.png`
        // 'bg-map': require('@/assets/sale/sale-map.png')
      },
      dataType: 'wholeCountry', // 默认全国
      mapcharts: null,
      selectAreaName: '', // 选择的地区名称
      countList: [3, 0, 0, '.', 0, 0],
      mapPointList: [],
      mapDictList: [],
      loading: false
    }
  },
  mounted () {
    // this.initCharts()
    this.initLineChart()
    this.initPieChart()
    this.initBarChart()
    this.initBarChartProduct()
    // this.mapData()
    // this.getShow()
  },
  methods: {
    mapData () {
      this.loading = true
      service.queryAtlasReport().then(res => {
        console.log(res, res.allSalesRevenueDtoList)
        this.mapPointList = res.allSalesRevenueDtoList
        // console.log(this.mapPointList, '===mm')
        this.mapDictList = []
        res.allSalesRevenueDtoList.forEach(item => {
          const obj = {
            name: item.province,
            value: item.salesRevenue || 0
          }
          this.mapDictList.push(obj)
        })
        // console.log(this.geoCoordMap, '====geo----1111', this.convertData(this.mapDictList))
        this.initCharts()
        this.loading = false
      })
    },
    initLineChart () {
      const list = [{
        name: '5月',
        value: 0
      }, {
        name: '6月',
        value: 0
      }, {
        name: '7月',
        value: 36
      }, {
        name: '8月',
        value: 10
      }, {
        name: '9月',
        value: 10
      }, {
        name: '10月',
        value: 20
      }, {
        name: '11月',
        value: 30
      }]
      const option = getLineOption(list)
      const lineCharts = echarts.init(this.$refs.lineChart)
      lineCharts.setOption(option)
      // 自适应
      window.addEventListener('resize', function () {
        lineCharts.resize()
      })
    },
    initPieChart () {
      const list = [{
        name: '云游戏实例',
        value: 0
      }, {
        name: '云游戏增值服务',
        value: 20
      }, {
        name: '游戏云直播',
        value: 36
      }, {
        name: '咪咕离线云渲染',
        value: 10
      }, {
        name: 'AR虚实空间',
        value: 10
      }, {
        name: 'MCC元宇宙会展中心',
        value: 20
      }, {
        name: '悦听卡',
        value: 30
      }]
      const option = getPieOption(list)
      const pieCharts = echarts.init(this.$refs.pieChart)
      pieCharts.setOption(option)
      // 自适应
      window.addEventListener('resize', function () {
        pieCharts.resize()
      })
    },
    initBarChart () {
      const list = [{
        name: '5月',
        value: 0
      }, {
        name: '6月',
        value: 20
      }, {
        name: '7月',
        value: 36
      }, {
        name: '8月',
        value: 10
      }, {
        name: '9月',
        value: 10
      }, {
        name: '10月',
        value: 20
      }, {
        name: '11月',
        value: 30
      }]
      const option = getBarOption(list)
      const barCharts = echarts.init(this.$refs.barChart)
      barCharts.setOption(option)
      // 自适应
      window.addEventListener('resize', function () {
        barCharts.resize()
      })
    },
    initBarChartProduct () {
      const list = [{
        name: '云游戏实例',
        value: 0
      }, {
        name: '云游戏增值服务',
        value: 20
      }, {
        name: '游戏云直播',
        value: 36
      }, {
        name: '咪咕离线云渲染',
        value: 10
      }, {
        name: 'AR虚实空间',
        value: 10
      }, {
        name: 'MCC元宇宙会展中心',
        value: 20
      }, {
        name: '悦听卡',
        value: 30
      }]
      const option = getBarOption(list, 'product')
      const barChartsProduct = echarts.init(this.$refs.barChartProduct)
      barChartsProduct.setOption(option)
      // 自适应
      window.addEventListener('resize', function () {
        barChartsProduct.resize()
      })
    },
    changeType (type) {
      this.dataType = type
      const that = this
      this.mapcharts.dispatchAction({
        type: 'geoUnSelect',
        name: that.selectAreaName
      })
      // console.log('点击；---')
      this.getShow()
    },
    convertData (data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    initCharts () {
      // const columnImg = {
      //   江苏: `${baseUrl}/column-jiangsu.png`,
      //   辽宁: `${baseUrl}/column-liaoning.png`
      // }
      // const columnImg = {
      //   江苏: require('@/assets/sale/column-jiangsu.png'),
      //   辽宁: require('@/assets/sale/column-liaoning.png')
      // }
      const that = this
      this.mapcharts = echarts.init(this.$refs.chinaMap)
      // 窗口尺寸改变
      window.addEventListener('resize', function () {
        that.mapcharts.resize()
      })
      const geoCoordMap = {}
      const mapFeatures = echarts.getMap('china').geoJson.features
      mapFeatures.forEach(function (v) {
        // 地区名称
        const name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })
      this.geoCoordMap = geoCoordMap
      // const max = 480
      // const min = 9 // todo
      // const maxSize4Pin = 100
      // const minSize4Pin = 20
      console.log(this.geoCoordMap, '====geo----1111地图加载', this.convertData(this.mapDictList))
      const convertDataList = []
      const list = this.convertData(this.mapDictList)
      list.forEach(ele => {
        // console.log(ele, '====ele')
        if (ele.value[2]) {
          convertDataList.push(ele)
        }
      })
      const pointMax = Math.max(...convertDataList.map(item => item.value[2]))
      console.log(pointMax, '====pointMax')
      console.log(convertDataList, '=转换后用于渲染的数据')
      const option = {
        // 地理坐标组件
        geo: {
          map: 'china',
          roam: false, // 是否支持滚轮缩放
          // left: '10%',
          // top: '33%',
          zoom: 0.9,
          layoutCenter: ['50%', '60%'],
          layoutSize: '80%',
          z: 1,
          label: {
            show: true,
            color: '#fff',
            fontSize: 8,
            formatter: (v) => {
              // const showList = ['江苏', '辽宁', '青海', '新疆', '河北']
              const showList = convertDataList.map(t => t.name)
              return showList.includes(v.name) ? v.name + '省' : ''
            }
          },
          selectedMode: 'single',
          emphasis: {
            label: {
              color: '#fff',
              fontSize: 8,
              fontWeight: 'bold'
            },
            itemStyle: {
              areaColor: '#122446',
              borderColor: '#81B3EC',
              borderWidth: 1
            }
          },
          select: {
            label: {
              color: '#F4DC32'
            },
            itemStyle: {
              areaColor: '#122446',
              borderColor: '#F4DC32'
            }
          },
          itemStyle: {
            areaColor: '#122446',
            borderColor: '#81B3EC'
          }
        },
        animation: false,
        series: [
          // {
          //   type: 'scatter',
          //   roam: false,
          //   zoom: 1,
          //   coordinateSystem: 'geo',
          //   data: [
          //     {
          //       name: '江苏',
          //       value: [120.34094130672383, 34.49093327643905],
          //       symbolKeepAspect: true,
          //       symbolSize: [15, 70], // symbols图标大小
          //       symbolOffset: [0, '-12%'],
          //       itemStyle: {
          //         color: {
          //           type: 'linear',
          //           x: 0,
          //           y: 0,
          //           x2: 0,
          //           y2: 1,
          //           colorStops: [{
          //             offset: 0, color: '#F8DE32' // 0% 处的颜色
          //           }, {
          //             offset: 1, color: '#6B7432' // 100% 处的颜色
          //           }],
          //           global: false // 缺省为 false
          //         }
          //       },
          //       label: {
          //         show: true,
          //         position: 'top',
          //         fontSize: 8,
          //         color: '#fff',
          //         backgroundColor: '#222',
          //         padding: 4,
          //         formatter: (v) => {
          //           return '390.48'
          //         }
          //       }
          //     },
          //     {
          //       name: '辽宁',
          //       value: [121.85254967500032, 41.98240794500012],
          //       symbolKeepAspect: true,
          //       symbolSize: [15, 15], // symbols图标大小
          //       symbolOffset: [0, 0],
          //       itemStyle: {
          //         color: {
          //           type: 'linear',
          //           x: 0,
          //           y: 0,
          //           x2: 0,
          //           y2: 1,
          //           colorStops: [{
          //             offset: 0, color: '#00B5D3' // 0% 处的颜色
          //           }, {
          //             offset: 1, color: '#115B78' // 100% 处的颜色
          //           }],
          //           global: false // 缺省为 false
          //         }
          //       },
          //       label: {
          //         show: true,
          //         position: 'top',
          //         fontSize: 8,
          //         color: '#fff',
          //         backgroundColor: '#222',
          //         padding: 4,
          //         formatter: (v) => {
          //           return '0.41'
          //         }
          //       }
          //     }
          //   ],
          //   // symbol: function (param, data) {
          //   //   return 'image://' + columnImg[data.name]
          //   // }
          //   symbol: 'rect',
          //   emphasis: {
          //     scale: false
          //   },
          //   z: 1
          // }
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'rect', // 气泡
            // symbolSize: [15, 15], // symbols图标大小
            // symbolSize: function (val) {
            //   var a = (maxSize4Pin - minSize4Pin) / (max - min)
            //   var b = minSize4Pin - a * min
            //   b = maxSize4Pin - a * max
            //   return a * val[2] + b
            // },
            // label: {
            //   normal: {
            //     show: false,
            //     textStyle: {
            //       color: '#fff',
            //       fontSize: 9
            //     }
            //   }
            // },
            // pointMax
            symbolSize: function (val) {
              // console.log(val, '====val--', val[2], val[2] < 1)
              if (val[2] < 1) {
                return [15, 15]
              } else {
                const len = val[2] / pointMax * 55 + 15
                // console.log(len, '====len--')
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
            // symbolSize: [15, 70], // symbols图标大小
            // symbolOffset: [0, '-12%'],
            symbolOffset: [0, '-60%'],
            itemStyle: {
              color: function (val) {
                console.log(val, '====itemStyle---')
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
            // itemStyle: function (val) {
            //   return {
            //     color: {
            //       type: 'linear',
            //       x: 0,
            //       y: 0,
            //       x2: 0,
            //       y2: 1,
            //       colorStops: [{
            //         offset: 0, color: 'red' // 0% 处的颜色
            //       }, {
            //         offset: 1, color: 'orange' // 100% 处的颜色
            //       }],
            //       global: false // 缺省为 false
            //     }
            //   }
            // },
            zlevel: 6,
            // data: this.convertData(this.mapDictList)
            data: convertDataList
          }
        ],
        tooltip: {
          show: false,
          trigger: 'item', // 数据项图形触发
          backgroundColor: '#fff',
          borderWidth: 0,
          formatter: '地区：{b}<br/>数据：{c}'
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          bottom: '0',
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        geoCoordMap: {}
      }
      this.mapcharts.on('mousemove', function (param) {
        const showList = ['江苏', '辽宁']
        if (!showList.includes(param.name)) {
          that.mapcharts.dispatchAction({
            type: 'downplay',
            name: param.name
          })
        }
      })
      this.mapcharts.on('click', function (params) {
        console.log(params.name, '===哪个省份')
        that.getData(params.name)
        event.stopPropagation()
        const showList = ['江苏', '辽宁']
        const obj = {
          江苏: 'jiangsu',
          辽宁: 'liaoning'
        }
        // 一会看一下逻辑
        if (!showList.includes(params.name)) {
          that.dataType = 'wholeCountry'
          that.mapcharts.dispatchAction({
            type: 'geoSelect',
            name: params.name
          })
        } else {
          // console.log('进入了---')
          that.dataType = obj[params.name]
          that.selectAreaName = params.name
          that.mapcharts.dispatchAction({
            type: 'geoSelect',
            name: params.name
          })
        }
      })
      this.mapcharts.on('geoselectchanged', function (params) {
        that.selectAreaName = params.name
      })
      // 绘制图表
      this.mapcharts.setOption(option)
    },
    // 注意台湾怎么处理
    getData (name) {
      if (name === '台湾') return
      const provinceCode = this.mapPointList.find(t => t.province === name).provinceCode
      console.log(name, '=====点击省份---', provinceCode)
      // console.log(name, '=====点击省份---', this.mapPointList)
      this.getShow(provinceCode)
    },
    getShow (provinceCode) {
      const postData = {
        orderSource: 0,
        provinceCode: provinceCode || 'ALL'
      }
      // this.loading = true
      service.queryReport(postData).then(res => {
        // 销量报表
        const salesVolumeDtoList = []
        res.salesVolumeDtoList.forEach(ele => {
          const obj = {
            name: ele.time + '月',
            value: ele.salesVolume || 0
          }
          salesVolumeDtoList.push(obj)
        })
        this.initLineChart(salesVolumeDtoList)
        // 销售占比
        const productSalesVolumeDtoList = []
        res.productSalesVolumeDtoList.forEach(ele => {
          const obj = {
            name: ele.product,
            value: ele.salesRevenueRate || 0
          }
          productSalesVolumeDtoList.push(obj)
        })
        this.initPieChart(productSalesVolumeDtoList)
        // 产品销售额 右下
        const productSalesRevenueDtoList = []
        res.productSalesRevenueDtoList.forEach(ele => {
          const obj = {
            name: ele.product,
            value: ele.salesRevenueValue || 0
          }
          productSalesRevenueDtoList.push(obj)
        })
        this.initBarChartProduct(productSalesRevenueDtoList)
        // 六月销售额 右上
        const salesRevenueDtoList = []
        res.salesRevenueDtoList.forEach(ele => {
          const obj = {
            name: ele.time + '月',
            value: ele.salesRevenue || 0
          }
          salesRevenueDtoList.push(obj)
        })
        this.initBarChart(salesRevenueDtoList)
        // this.loading = false
      }).catch(() => {
        // this.loading = false
      })
    }
  },
  // beforeDestroy () {
  //   this.mapcharts.dispose()
  // }
}
</script>

<style lang="scss" scoped>
.sale-data {
  width: 100%;
  height: calc(100vh - 50px);
  background: #001e2a;
  .background {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .chart-head,
  .chart-head-sale {
    height: 38px !important;
    // background: url(../../assets/screen/titleIcon1.png) no-repeat;
    padding-left: 35px;
    background-size: auto 100%;
    line-height: 38px;
    .global-desc {
      font-size: 14px;
      font-weight: 500;
      color: #fee018;
    }
    .month-desc {
      font-size: 14px;
      font-weight: 500;
      color: rgba(208, 222, 238, 1);
    }
  }
  .chart-head-sale {
    // background: url(../../assets/screen/titleIcon2.png) no-repeat;
    height: 38px !important;
    padding-left: 35px;
    background-size: auto 100%;
    line-height: 38px;
    .global-desc {
      font-size: 14px;
      font-weight: 500;
      color: #fee018;
    }
    .month-desc {
      font-size: 14px;
      font-weight: 500;
      color: rgba(208, 222, 238, 1);
    }
  }
  .chart-head-global {
    // background: url(../../assets/screen/titleIcon3.png) no-repeat;
    height: 38px !important;
    padding-left: 35px;
    background-size: auto 100%;
    line-height: 38px;
    .global-desc {
      font-size: 14px;
      font-weight: 500;
      color: #fee018;
    }
    .month-desc {
      font-size: 14px;
      font-weight: 500;
      color: rgba(208, 222, 238, 1);
    }
  }
  .lineChart,
  .barChart,
  .barChartProduct,
  .pieChart {
    width: 450px;
    // height: calc(100% - 48px) !important;
    height: 280px !important;
    margin: 20px;
    border: 1px solid #115b78 ;
  }
  .sale-month,
  .sale-value-month,
  .sale-value {
    width: 100%;
  }
  .sale-background {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 60px;
    box-sizing: border-box;
    .sale-main-wrap {
      height: 100%;
      padding: 0 20px 20px;
      box-sizing: border-box;
      .el-col {
        height: 100%;
        .grid-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          .total-count {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            .total-title {
              height: 58px;
              text-align: center;
              margin-top: 20px;
              .desc {
                font-size: 18px;
                font-weight: 400;
                color: #00d8ff;
                line-height: 58px;
                .count-item {
                  // background: url("../../assets/screen/main-bg1.png");
                  background-repeat: no-repeat;
                  background-size: 36px 100%;
                  margin-right: 13px;
                  width: 36px;
                  display: inline-block;
                  text-align: center;
                  font-size: 40px;
                  font-weight: 400;
                  color: #00d8ff;
                  &:first-child {
                    margin-left: 13px;
                  }
                }
              }
            }
            .box-content {
              display: flex;
              align-items: center;
              justify-content: center;
              height: fit-content !important;
              margin-top: 30px;
              .box-item {
                width: 147px;
                height: 50px;
                // background: url("../../assets/screen/main-bg2.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                padding: 9px 12px 18px;
                &:first-child {
                  margin-right: 20px;
                }
                .box-item-title {
                  font-size: 12px;
                  font-weight: 400;
                  color: #d0deee;
                }
                .box-item-price {
                  .number {
                    font-size: 29px;
                    font-weight: 600;
                    color: #1ec4ff;
                    margin-right: 3px;
                  }
                  .unit {
                    font-size: 14px;
                    font-weight: 400;
                    color: #d0deee;
                  }
                }
              }
            }
          }
          .tip-footer {
            width: 150px;
            height: 100px;
            position: absolute;
            left: 20px;
            bottom: 100px;
            color: #b4c2d5;
            border: 1px solid #3b4859;
            .blue-point {
              width: 10px;
              height: 10px;
              display: inline-block;
              background: linear-gradient(#00b5d3, #115b78);
            }
            .yellow-point {
              width: 10px;
              height: 10px;
              display: inline-block;
              background: linear-gradient(#f8de32, #6b7432);
            }
            div {
              height: fit-content;
            }
          }
          // div {
          //   height: 50%;
          // }
          .select-wrap {
            display: flex;
            // div {
            //   width: 50%;
            //   position: relative;
            // }
            .position-wrap {
              display: flex;
              .position-content {
                display: flex;
                flex-wrap: wrap;
                height: 100%;
                // div {
                //   width: 50%;
                //   position: relative;
                // }
              }
            }
            .high-light-jiangsu {
              width: 53%;
              position: absolute;
              top: 30%;
              left: 50%;
              transform: translate(-38%, -8%);
            }
          }
        }
        .bg-map {
          background-position: 50%;
          background-size: contain;
          .select-wrap {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
