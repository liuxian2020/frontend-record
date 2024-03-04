<template>
  <div>
    <div class="carousel">
      <div class="carousel-item" @click="handleIndex(index)" v-for="(item, index) in imgList" :key="index">
        <img :src="item.src" alt="">
      </div>
      <span class="arrow" @click.stop="prev">
        <i class="el-icon-d-arrow-left"></i>
      </span>
      <span class="arrow2" @click.stop="next">
        <i class="el-icon-d-arrow-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [
        {
          src: require('@/assets/carousel/1.jpg')
        }, {
          src: require('@/assets/carousel/2.jpg')
        }, {
          src: require('@/assets/carousel/3.jpeg')
        }, {
          src: require('@/assets/carousel/4.jpeg')
        }, {
          src: require('@/assets/carousel/5.jpeg')
          // }, {
          //   src: require('@/assets/carousel/6.jpeg')
          // }, {
          //   src: require('@/assets/carousel/7.jpeg')
        }
      ],
      center: 2
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        const items = document.querySelectorAll('.carousel .carousel-item')
        const xOffsetStep = 100;
        const count = items.length
        const scaleStep = 0.8;
        items.forEach((e, index) => {
          const sign = Math.sign(index - this.center)
          let xOffset = (index - this.center) * xOffsetStep;
          if (index !== this.center) {
            xOffset = xOffset + sign * 100
          }
          const scale = scaleStep ** Math.abs(index - this.center)
          const rotateY = index === this.center ? 0 : 45 * sign
          e.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
          e.style.zIndex = count - Math.abs(index - this.center);
          e.style.opacity = 0.6 ** Math.abs(index - this.center);
        })
      })
    },
    handleIndex (index) {
      console.log(index, '===iii')
      this.center = index
      this.init()
    },
    // 上一步
    prev () {
      console.log('上一步', this.center)
      if (this.center == 0) return
      this.center--;
      this.init()
    },
    // 下一步
    next () {
      if (this.center >= this.imgList.length - 1) return
      this.center++;
      this.init()
    }

  }
}
</script>
<style lang='scss' scoped>
.carousel {
  width: 100%;
  margin: 0 auto;

  .arrow {
    position: absolute;
    left: 80px;
    top: 140px;
    z-index: 99;
    padding: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
    }
  }

  .arrow2 {
    position: absolute;
    right: 80px;
    top: 140px;
    z-index: 99;
    padding: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
    }
  }
}

.el-icon-d-arrow-left,
.el-icon-d-arrow-right {
  font-size: 50px;
  opacity: 0.4;
  cursor: pointer;
}

.carousel-item {
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 0;
  transition: all 500ms;

  img {
    width: 500px;
    height: 310px;
    cursor: pointer;
    // perspective: 100px;
  }
}
</style>