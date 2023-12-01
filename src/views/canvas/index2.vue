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

      // 贝塞尔曲线 - 气泡聊天框

      // 绘制线段
      ctx.beginPath();

      ctx.moveTo(200, 300);
      ctx.quadraticCurveTo(150, 300, 150, 200);
      // ctx.stroke();
      ctx.quadraticCurveTo(150, 100, 300, 100);
      // ctx.stroke()
      ctx.quadraticCurveTo(450, 100, 450, 200);

      ctx.quadraticCurveTo(450, 300, 250, 300);

      ctx.quadraticCurveTo(250, 350, 150, 350);
      ctx.quadraticCurveTo(200, 350, 200, 300);
      ctx.stroke()

      ctx.closePath();
    }
  }
}
</script>
<style lang='scss' scoped>

</style>