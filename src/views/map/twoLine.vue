<template>
  <div class="sale-data"
       :class="dataType">
    <div class="sale-background"
         v-loading="loading">
      <div ref="lineChart"
            class="lineChart"></div>
    </div>
  </div>
</template>

<script>
// import './map/js/china.js'
import getLineOption from './echarts/twoLine'
import * as echarts from 'echarts'
export default {
  name: 'saleData',
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.initLineChart()
  },
  methods: {
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
    }
  },
}
</script>

<style lang="scss" scoped>
.sale-data {
  width: 100%;
  height: calc(100vh - 50px);
  // background: #001e2a;
  .background {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .chart-head,
  .chart-head-sale {
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
  .chart-head-sale {
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
    width: 800px;
    // height: calc(100% - 48px) !important;
    height: 480px !important;
    margin: 20px;
    // border: 1px solid #115b78 ;
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
