function getBarOption (list, type) {
  const xAxisData = list && list.length ? list.map(item => item.name) : []
  const seriesData = list && list.length ? list.map(item => item.value) : []
  let colorStops = [{
    offset: 0,
    color: 'rgba(24, 100, 254, 1)'
  }, {
    offset: 1,
    color: 'rgba(24, 100, 254, 0)'
  }]
  let axisLabel = {
    color: '#B4C2D5'
  }
  if (type === 'product') {
    colorStops = [{
      offset: 0,
      color: 'rgba(52, 220, 254, 1)'
    }, {
      offset: 1,
      color: 'rgba(52, 220, 254, 0)'
    }]
    axisLabel = { // 坐标轴刻度文字的设置
      show: true, // 是否显示
      inside: false, // 坐标轴刻度文字指向        (true表示向上   false表示向下)
      rotate: 30, // 坐标轴刻度文字的旋转角度
      margin: 10, // 坐标轴刻度文字与轴线之间的距离
      color: '#B4C2D5', // 坐标轴刻度文字的颜色
      fontSize: 10, // 坐标轴刻度文字的大小         (用数字表示)
      fontWeight: 'lighter', // 坐标轴刻度文字的加粗程度    (可选bold   bolder  lighter  normal)
      fontstyle: 'normal', // 坐标轴刻度文字的样式          (可选normal  italic   oblique)
      padding: [5, 0, 2, -5]// 坐标轴刻度文字的边距        (上右下左)
    }
  }
  const BarOption = {
    xAxis: {
      data: xAxisData,
      // x轴刻度的颜色
      axisLine: {
        lineStyle: {
          color: 'rgba(79, 193, 201, .2)' // y轴的颜色
        }
      },
      axisLabel: axisLabel
    },
    yAxis: {
      name: '万元',
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
      trigger: 'axis'
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
      barBorderWidth: 6,
      barBorderRadius: 0, // 设置圆角角度为0
      textStyle: {
        color: 'rgba(208, 222, 238, 1)'
        // fontSize: 20
      },
      shadowBlur: 10,
      data: ['销售额'],
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: '销售额',
        label: {
          show: true,
          position: 'top',
          color: '#B4C2D5'
        },
        data: seriesData,
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: colorStops
          }
        }
      }
    ]
  }
  return BarOption
}

export default getBarOption
