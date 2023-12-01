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

      // 实线
      // // console.log(heartPath, '====爱心路径')
      // ctx.moveTo(200, 150);
      // ctx.lineTo(300, 200);
      // ctx.lineTo(400, 150);
      // // 线条宽度
      // ctx.lineWidth = 40;
      // // 线条端点 butt平齐 round半圆 square正方形
      // ctx.lineCap = 'square';
      // // 线段连接处样式 mitter外侧相连的角，round bevel
      // ctx.lineJoin = 'bevel';

      // ctx.stroke()

      // 虚线
      ctx.lineWidth = 1;
      ctx.moveTo(150, 150);
      ctx.lineTo(300, 200);
      ctx.lineTo(450, 150);
      ctx.setLineDash([10, 2])
      ctx.lineDashOffset = 10;
      ctx.stroke()


    }
  }
}
</script>
<style lang='scss' scoped>

</style>