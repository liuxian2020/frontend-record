<template>
  <div>
    <canvas id="c1" width="600" height="400"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasDom: null,
      list: [{
        name: 22,
        children: [{
          name: 55,
          children: [{
            name: 988
          }]
        }]
      }]
    }
  },
  mounted() {
    this.canvasDom = document.getElementById('c1')
    this.initDraw()
  },
  created() {
    this.list.push({
      name: '33'
    })
  },
  methods: {
    initDraw() {
      // 获取画笔，上下文对象
      let ctx = this.canvasDom.getContext('2d');
      // 矩形绘制，填充模式
      // ctx.fillRect(50, 50, 300, 300);
      // 矩形绘制，路径模式
      // ctx.strokeRect(100, 100, 200, 100)
      // ctx.fillRect(200, 150, 200, 100)
      // let height = 0

      // let t1 = setInterval(() => {
      //   height++;
      //   ctx.clearRect(0, 0, c1.clientWidth, height);
      //   if(height > c1.clientHeight) {
      //     clearInterval(t1);
      //   }
      // }, 10);
      
      // ctx.beginPath();
      // ctx.rect(100, 100, 200, 100);
      // ctx.fill()
      // ctx.closePath();

      // ctx.beginPath();
      // ctx.rect(200, 150, 200, 100);
      // ctx.stroke()
      // ctx.closePath();

      // 圆弧
      // 圆心x、圆心y、半径、开始的弧度、结束的弧度、 逆时针还是顺时针
      // ctx.arc(300, 200, 50, 0, Math.PI * 2);
      // ctx.fill();
      // 绘制笑脸
      // ctx.beginPath();
      // ctx.arc(75, 75, 50, 0, Math.PI*2);
      // ctx.moveTo(105, 75);
      // // ctx.stroke();
      // // ctx.closePath();
      // // ctx.beginPath();
      // ctx.arc(75, 75, 30, 0, Math.PI);
      // // ctx.stroke();
      // // ctx.closePath();
      // // ctx.beginPath();
      // ctx.moveTo(70, 50);
      // ctx.arc(60, 50, 10, 0, Math.PI * 2);
      // // ctx.stroke();
      // // ctx.closePath();
      // // ctx.beginPath();
      // ctx.moveTo(100, 50);
      // ctx.arc(90, 50, 10, 0, Math.PI* 2);
      // ctx.stroke();
      // ctx.closePath();


      // 绘制线段
      ctx.beginPath();
      // ctx.moveTo(300, 200);
      // ctx.lineTo(350, 250);
      // ctx.lineTo(350, 200);
      // ctx.lineTo(300, 200);
      // ctx.stroke();
      ctx.moveTo(300, 200);
      ctx.arcTo(300, 250, 250, 250, 25);
      ctx.stroke();
      // ctx.fill();
      ctx.closePath();
    }
  }
}
</script>
<style lang='scss' scoped>

</style>