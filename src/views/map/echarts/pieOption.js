function getPieOption (list) {
  // const xAxisData = list.map(item => item.name)
  // const seriesData = list.map(item => item.value)
  const PieOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center',
      textStyle: {
        color: 'rgba(208, 222, 238, 1)',
        fontSize: 10
      },
      icon: 'rect',
      // show: false,
      itemWidth: 10,
      itemHeight: 10,
      type: 'scroll',
      pageTextStyle: {
        color: '#B4C2D5'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['25%', '40%'],
        center: ['50%', '40%'], // 调整饼图位置
        label: {
          color: '#B4C2D5'
        },
        itemStyle: {
          normal: {
            color: function (colors) {
              const colorList = [
                '#FF6594',
                '#FF9A79',
                '#FFD93C',
                '#8BE9B6',
                '#00D0EF',
                '#00A4FF',
                '#8777F2',
                'grey',
                'red',
                'yellow',
                'green',
                'cyan'
              ]
              return colorList[colors.dataIndex]
            }
          }
        },
        data: list
      }
    ]
  }
  return PieOption
}

export default getPieOption
