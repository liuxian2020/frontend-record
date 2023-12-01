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
    }
  },
  mounted() {
    this.canvasDom = document.getElementById('c1')
    this.initDraw()
  },
  created() {

  },
  methods: {
    initDraw() {
      // 获取画笔，上下文对象
      let ctx = this.canvasDom.getContext('2d');
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(100, 100, 100, .5)';

      // 贝塞尔曲线 - 气泡聊天框

      // 绘制线段
      // ctx.beginPath();
      // ctx.moveTo(200, 300);
      // ctx.bezierCurveTo(250, 250, 350, 300 ,200, 400);
      // ctx.bezierCurveTo(50, 300, 150, 250, 200, 300);
      // ctx.stroke()
      // ctx.closePath();

      // 封装路径 path2d
      let heartPath = new Path2D();
      // ctx.globalAlpha = 0.5

      // console.log(heartPath, '====爱心路径')
      heartPath.moveTo(200, 300);
      heartPath.bezierCurveTo(250, 250, 350, 300 ,200, 400);
      heartPath.bezierCurveTo(50, 300, 150, 250, 200, 300);
      ctx.strokeStyle = 'red';
      
      ctx.stroke(heartPath);
      ctx.fillStyle = 'pink';
      ctx.fill(heartPath);

      let chatPath = new Path2D()
      chatPath.moveTo(200, 300);
      chatPath.quadraticCurveTo(150, 300, 150, 200);
      chatPath.quadraticCurveTo(150, 100, 300, 100);
      chatPath.quadraticCurveTo(450, 100, 450, 200);
      chatPath.quadraticCurveTo(450, 300, 250, 300);
      chatPath.quadraticCurveTo(250, 350, 150, 350);
      chatPath.quadraticCurveTo(200, 350, 200, 300);
      ctx.strokeStyle = 'blue';
     
      ctx.stroke(chatPath)

      // 创建一条折线 svg绘制
      let polyline = new Path2D('M10 10 h 80 v 80 h -80 z');
      ctx.stroke(polyline)

      // 设置全局透明度


    }
  }
}
</script>
<style lang='scss' scoped>

</style>