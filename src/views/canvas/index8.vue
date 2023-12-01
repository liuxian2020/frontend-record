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

      class Heart {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.heartPath = new Path2D();
          this.heartPath.moveTo(this.x, this.y);
          this.heartPath.bezierCurveTo(this.x + 50, this.y - 50, this.x + 100, this.y , this.x , this.y + 50);
          this.heartPath.bezierCurveTo(this.x - 100, this.y, this.x - 50, this.y - 50, this.x, this.y);
        }
        draw() {
          ctx.save();
          ctx.fillStyle = 'red';
          ctx.fill(this.heartPath)
          let isIn = ctx.isPointInPath(this.heartPath, 100, 100);
          console.log(isIn, '====iiii')
          ctx.restore()
        }
      }

      let heart = new Heart(100, 100);
      heart.draw()


    }
  }
}
</script>
<style lang='scss' scoped>
</style>