<template>
  <div class="water-class">
    <div class="water-box">
      <div class="circle"></div>
      <input type="range" v-model="value" min="0" max="100" @change="handleInput">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 50
    }
  },
  created () {
  },
  methods: {
    handleInput () {
      this.$nextTick(() => {
        const circle = document.querySelector('.water-class')
        // const completion = window.getComputedStyle(circle).getPropertyValue('--completion')
        circle.style.setProperty('--completion', this.value + '%')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.water-class {
  background: #000;
  height: calc(100vh - 50px);

  .water-box {
    width: 100%;
    height: 100%;
    padding-top: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  --completion: 50%;

  .circle {
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    background: #fff;
    border: 4px double #fff;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;

    &::after {
      width: 40vh;
      height: 40vh;
      content: '';
      position: absolute;
      left: 50%;
      top: calc(100% - var(--completion));
      border-radius: 15vh;
      translate: -50% 0;
      background-color: #a4eafd;
      animation: rotateCircle 5s linear infinite;
    }

    &::before {
      width: 40vh;
      height: 40vh;
      content: '';
      position: absolute;
      left: 50%;
      top: calc(100% - var(--completion));
      border-radius: 15vh;
      translate: -50% 0;
      background-color: #70cfe9;
      transform: rotate(20deg);
      animation: rotateCircle 5s linear infinite;
    }

  }

  @keyframes rotateCircle {
    100% {
      transform: rotate(360deg);
    }
  }

}
</style>