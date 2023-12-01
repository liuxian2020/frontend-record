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
      // 线性渐变
      // let linearGradient = ctx.createLinearGradient(0, 0, 600, 400);
      // linearGradient.addColorStop(0, 'red');

      // linearGradient.addColorStop(1, 'blue');
      // ctx.fillStyle = linearGradient;
      // ctx.fillRect(100, 200, 300, 300);
      let index = 0;
      function render() {
        ctx.clearRect(0,0, 600, 400);
        index += 0.1;
        if(index > 1) {
          index = 0;
        }
        let linearGradient = ctx.createLinearGradient(100, 200, 400, 500);
        linearGradient.addColorStop(0, 'red');
        linearGradient.addColorStop(index, '#ffcccc');
        linearGradient.addColorStop(1, 'blue');
        ctx.fillStyle = linearGradient;
        ctx.fillRect(100, 200, 300, 300);
        // requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
  }
}
</script>
<style lang='scss' scoped>

</style>