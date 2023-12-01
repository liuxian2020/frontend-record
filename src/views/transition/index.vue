<template>
  <div style="margin-left: 300px; margin-top: 100px;">

    <transition-group tag="div" name="show-list" class="order-con">
      <div v-show="list.length " :class="getClass(index)" class="show-list-item"  v-for="(item, index) in list" :key="item">
        <div v-show="index <= 2" class="transition-item">
          {{ item }}
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [11,22,33,45]
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted() {
    this.setTimer()
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        let item = this.list.shift();
        if (item) {
          // this.nowIndex++;
          this.list.push(item);
        }
      }, 10 * 1000);
    },
    // clickNext() {
    //   clearInterval(this.timer);
    //   let item = this.list.shift();
    //   if (item) {
    //     // this.nowIndex++;
    //     this.list.push(item);
    //   }
    //   this.setTimer();
    // },
    getClass(index) {
      let className = "";
      if (index === 1) {
        className = "right";
      }
      if (index === 2) {
        className = "left";
      }
      return className;
    },
  },

}
</script>
<style lang="scss" scoped>
.transition-item {
  width: 150px;
  height: 60px;
  background: lightblue;
}
.order-con {
  position: relative;
  width: 380px;
  height: 200px;
}
.show-list-item {
  transition: all 1.2s;
  position: absolute;
  &:nth-child(1) {
    z-index: 3;
    left: 50%;
    transform: translateX(-50%);
    .order-item {
      box-shadow: 0 0 10px rgba(68, 138, 255, 1);
      background-size: 295px 155px;
      cursor: pointer;
    }
    .order-item.error {
      box-shadow: 0 0 10px rgba(227, 63, 58, 1);
    }
    .order-item.warn {
      box-shadow: 0 0 10px rgba(254, 194, 76, 1);
    }
  }
  &:nth-child(2) {
    z-index: 2;
    left: 366px;
    // right: 366px;
    transform: scale(0.9);
    opacity: 0.7;
  }
   // 最左边的
   &.left {
      z-index: 1;
      left: 0;
      // right: 230px;
      transform: scale(0.8);
      opacity: 0.4;
    }
    // 最右边的
    &.right {
      z-index: 1;
      left: 230px;
      // right: 0;
      transform: scale(0.8);
      opacity: 0.4;
    }
}
</style>