import * as echarts from 'echarts'
function getLineOption (list) {
  // const xAxisData = list && list.length ? list.map(item => item.name) : []
  // const seriesData = list && list.length ? list.map(item => item.value) : []
  const LineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
      ,
      // formatter: function (params) {
      //   let html = params[0].name + "<br>";
      //   for (let i = 0; i < params.length; i++) {
      //     html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>'
      //     if (params[i].seriesName == "扬尘平均离线率") {
      //       html += params[i].seriesName + ":" + params[i].value + "%<br>";
      //     }
      //     if (params[i].seriesName == "扬尘超标项目数") {
      //       html += params[i].seriesName + ":" + params[i].value + "次<br>";
      //     }
      //   }
      //   return html;
      // }
    },

    legend: {
      textStyle: { color: '#4CA6A3' },
      x: 'right',
      // data: ['扬尘超标项目数', '扬尘平均离线率']
      data: [{ name: '电压', icon: 'rect' }, { name: '功率密度(mW cm-2)', icon: 'rect' }]
    },
    grid: {
      left: '12%',
      right: '12%',
      bottom: '13%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        //设置x轴线的属性
        axisLine: {
          lineStyle: {
            color: '#4CA6A3', // 设置x轴字体颜色
            width: 2, // 设置x轴字体宽度
          }
        },
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: "扬\n尘\n超\n标\n项\n目\n数\n︵\n次\n︶",
        nameLocation: "center",
        nameGap: 35,
        nameRotate: 0,
        nameTextStyle: {
          fontSize: 16,
          color: '#293C55'
        },
        // splitLine: { show: false },//去除y轴的网格线
        //设置轴线的属性
        axisLine: {
          lineStyle: {
            color: '#293C55',
            width: 2, //这里是为了突出显示加上的
          }
        }
      },
      {
        type: 'value',
        // name: "扬\n尘\n平\n均\n离\n线\n率\n︵\n%\n︶",
        nameLocation: "center",
        nameGap: 35,
        nameRotate: 0,
        nameTextStyle: {
          fontSize: 16,
          color: '#293C55'
        },
        splitLine: { show: false },//去除网格线
        min: 0,
        max: 1.2,
        // interval: 100,
        // 设置轴线的属性
        axisLine: {
          lineStyle: {
            color: '#293C55',
            width: 2,//这里是为了突出显示加上的
          }
        }
      }
    ],
    series: [
      {
        name: '电压',
        type: 'line',
        stack: '总量',
        // areaStyle: {},
        itemStyle: {
          normal: {
            color: "#25DEDB",//折线点的颜色
            lineStyle: {
              color: "#25DEDB"//折线的颜色
            }
          }
        },
        // areaStyle: { // 该属性设置可以使这下图区域颜色达到渐变的效果
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 0,
        //     color: '#25DEDB'
        //   }, {
        //     offset: 1,
        //     color: '#ffe'
        //   }])
        // },
        data: [1.10
          , 0.80,
          0.59,
          0.51,
          0.42,
          0.29,
          0.22,
          0.11,
          0.00]
      },
      {
        name: '功率密度(mW cm-2)',
        type: 'line',
        stack: '总量',
        // areaStyle: {},
        itemStyle: {
          normal: {
            color: "#E96C44",//折线点的颜色
            lineStyle: {
              color: "#E96C44"//折线的颜色
            }
          }
        },
        // areaStyle: { // 该属性设置可以使这下图区域颜色达到渐变的效果
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 0,
        //     color: '#E96C44'
        //   }, {
        //     offset: 1,
        //     color: '#ffe'
        //   }])
        // },
        data: [0.00,
          2.33,
          6.56,
          11.78,
          16.86,
          17.99,
          16.77,
          10.75,
          0.00]
      }
    ]
  };
  return LineOption
}

export default getLineOption
