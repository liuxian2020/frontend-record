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
      // ctx.strokeStyle = 'red'
      ctx.font = '100px Microsoft YaHei';
      ctx.strokeText('hello', 300, 200);
      
      // 位移坐标系，水平位移和竖直位移
      // ctx.translate(100, 100);
      // ctx.fillRect(0, 0, 50, 50)
      
      // 缩放
      // ctx.scale(5,2)
      // ctx.fillRect(0, 0, 50, 50)

      // 旋转
      ctx.rotate( Math.PI / 6);
      ctx.fillRect(0, 0, 500, 50)

    }
  }
}
</script>
<style lang='scss' scoped>

</style>