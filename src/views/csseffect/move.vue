<template>
  <div class="cloud-move-class">
    <!-- move -->
    <img class="topbg" src="@/assets/cloudShield/topbg.png" alt="">
    <img class="attack1" src="@/assets/cloudShield/attack1.png" alt="">
    <img class="attack2" src="@/assets/cloudShield/attack2.png" alt="">
    <!-- 往下 -->
    <img class="attack3" src="@/assets/cloudShield/attack3.png" alt="">
    <img class="attack4" src="@/assets/cloudShield/attack4.png" alt="">
    <img class="attack5" src="@/assets/cloudShield/attack5.png" alt="">
  </div>
</template>
<style lang="scss" scoped>
.cloud-move-class {
  width: 400px;
  position: relative;
  margin: 0 auto;

  .topbg {
    width: 400px;
  }

  .attack1 {
    position: absolute;
    top: 0;
    right: 30px;
    width: 130px;
    animation: up 2s ease-in-out infinite alternate;
  }

  .attack2 {
    position: absolute;
    top: 101px;
    right: -50px;
    width: 130px;
    animation: up 2s ease-in-out infinite alternate;
  }

  .attack3 {
    position: absolute;
    top: 169px;
    right: -3px;
    width: 130px;
    animation: heart 2s ease-in-out infinite alternate;
  }

  .attack4 {
    position: absolute;
    top: 71px;
    left: 12px;
    width: 130px;
    animation: up 2s ease-in-out infinite alternate;
  }

  .attack5 {
    position: absolute;
    top: 156px;
    left: 3px;
    width: 130px;
    animation: heart 2s ease-in-out infinite alternate;
  }

  @keyframes heart {
    from {
      transform: translate(0, 0)
    }

    to {
      transform: translate(0, 10px)
    }

    /* 下浮高度 */
  }

  @keyframes up {
    from {
      transform: translate(0, 0)
    }

    to {
      transform: translate(0, -10px)
    }

    /* 上浮高度 */
  }
}
</style>