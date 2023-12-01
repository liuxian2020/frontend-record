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
      // 径向渐变
      // let radiaGradient = ctx.createRadialGradient(300, 200, 0, 300, 200, 100);
      // ctx.fillStyle = radiaGradient;
      // radiaGradient.addColorStop(0, 'red');
      // radiaGradient.addColorStop(0.3, '#ffcccc');
      // radiaGradient.addColorStop(1, 'blue');
      // ctx.fillRect(0, 0, 600, 400);

      let radiaGradient = ctx.createRadialGradient(250, 150, 10, 300, 200, 100);
      ctx.fillStyle = radiaGradient;
      radiaGradient.addColorStop(0, '#ffcccc');
      radiaGradient.addColorStop(1, 'red');
      // radiaGradient.addColorStop(1, 'blue');
      ctx.arc(300, 200, 100, 0, Math.PI*2);
      ctx.fill();

    }
  }
}
</script>
<style lang='scss' scoped>

</style>