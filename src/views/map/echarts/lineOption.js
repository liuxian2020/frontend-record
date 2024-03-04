function getLineOption (list) {
  const xAxisData = list && list.length ? list.map(item => item.name) : []
  const seriesData = list && list.length ? list.map(item => item.value) : []
  const LineOption = {
    xAxis: {
      data: xAxisData,
      axisLabel: {
        color: '#B4C2D5'
      },
      // x轴刻度的颜色
      axisLine: {
        lineStyle: {
          color: 'rgba(79, 193, 201, .2)' // y轴的颜色
        }
      }
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '14%',
      top: '80px',
      containLabel: true
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      width: 2,
      height: 2,
      itemStyle: {
        color: 'rgba(79, 193, 201, 0.30)'
      },
      textStyle: {
        color: 'rgba(208, 222, 238, 1)'
      },
      shadowColor: 'red',
      shadowBlur: 10,
      data: ['销售']
    },
    yAxis: {
      name: '笔',
      nameTextStyle: {
        color: '#B4C2D5'
      },
      axisTick: { // 去掉坐标轴刻线
        show: false
      },
      axisLabel: {
        color: '#B4C2D5'
      },
      // y轴水平线的颜色
      splitLine: {
        lineStyle: {
          color: 'rgba(79, 193, 201, .2)'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      shadowBlur: 10,
      formatter: function (params) {
        var result = ''
        var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(79, 193, 201, 1)"></span>'
        params.forEach(function (item) {
          result += item.axisValue + '</br>' + dotHtml + '销售&emsp;' + item.data
        })
        return result
      }
    },
    series: [
      {
        name: '销售',
        data: seriesData,
        type: 'line',
        lineStyle: {
          width: 1,
          color: 'rgba(79, 193, 201, 1)' // 设置线的颜色
        },
        label: {
          show: true,
          position: 'top',
          color: '#B4C2D5'
        },
        areaStyle: {
          opacity: 0.5,
          // 折线区域的颜色
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(79, 193, 201, 1)'
              }, {
                offset: 1,
                color: 'rgba(79, 193, 201, 0)'
              }]
            },
            opacity: 0.5
          }
        },
        // 折线点的颜色
        itemStyle: {
          color: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(79, 193, 201, 1)',
          shadowBlur: 10
        }
      }
    ]
  }
  return LineOption
}

export default getLineOption
