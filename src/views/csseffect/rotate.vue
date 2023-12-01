<template>
  <div class="out_circle">
    <div class="slide">
      <img class="bg" src="@/assets/cloudShield/bg.png" alt="">

    </div>
    <div class="scan">
      <img class="bg2" src="@/assets/cloudShield/bg2.png" alt="">
    </div>
    <div class="nav_circle r1">
      <div class="img_top img">
        <img src="@/assets/cloudShield/img1.png">
      </div>
      <div class="img_bottom2 img">
        <img src="@/assets/cloudShield/img3.png">
      </div>
    </div>
    <div class="nav_circle r2">
      <!-- <div class="img_top2 img">
        <img src="@/assets/cloudShield/img2.png">
      </div> -->
      <div class="img_bottom img">
        <img src="@/assets/cloudShield/img4.png">
      </div>
    </div>
    <div class="nav_circle rblue">
      <div class="img_topblue img">
        <img src="@/assets/cloudShield/img2.png">
      </div>
    </div>

    <div class="nav_circle r3">
      <div class="img_top3 img">
        <img src="@/assets/cloudShield/small.png">
      </div>
    </div>
    <div class="nav_circle r4">
      <div class="img_bottom4 img">
        <img src="@/assets/cloudShield/small.png">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.out_circle {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  .slide {
    position: relative;
    .bg {
      width: 380px;
      height: 380px;
      margin-top: 10px;
    }
  }
  .scan {
    width: 400px;
    height: 400px;
    // border:100px solid black;
    // border-top-color:pink;
    // border-radius:50%;
    position: absolute;
    top: 0;
    left: 0;
    .bg2 {
      position: absolute;
      width: 200px;
      right: 0;
      top: 40px;
    }
    animation: fadenum 5s linear infinite;
  }

  @keyframes fadenum {
    100% {
      transform: rotate(360deg);
    }
  }

  .nav_circle {
    width: 110px;
    height: 400px;
    float: left;
    position: absolute;
    top: 0;
    left: 145px;
    text-align: center;
  }

  .img_top {
    top: 15px;
    -webkit-transform: rotate(0deg);
  }

  .img_bottom {
    top: 305px;
    -webkit-transform: rotate(0deg);
  }

  .img_bottom2 {
    top: 250px;
    -webkit-transform: rotate(0deg);
  }

  .img_top2 {
    top: 35px;
    -webkit-transform: rotate(0deg);
  }

  .img_bottom4 {
    top: 310px;
    -webkit-transform: rotate(0deg);
  }

  .img_top3 {
    top: 35px;
    -webkit-transform: rotate(0deg);
  }

  .img_topblue {
    top: -5px;
    -webkit-transform: rotate(0deg);
  }

  .img_top img,
  .img_bottom img,
  .img_bottom2 img,
  .img_top2 img,
  .img_bottom4 img,
  .img_top3 img,
  .img_topblue img {
    width: 58px;
    // height: 77px;
  }

  .img_top,
  .img_top2,
  .img_bottom,
  .img_bottom2,
  .img_bottom4,
  .img_top3,
  .img_topblue {
    position: relative;
    z-index: 1;
  }

  .r1 {
    transform: rotate(0deg) skew(0deg) scale(1);
    animation: rotate 70s linear infinite;
  }

  .r1 .img {
    transform: rotate(0deg) skew(0deg) scale(1);
    animation: rotate_c1 70s linear infinite;
  }

  .r2 {
    transform: rotate(45deg) skew(0deg) scale(1);
    animation: rotatef 70s linear infinite;
  }

  .r2 .img {
    transform: rotate(-45deg) skew(0deg) scale(1);
    animation: rotate_c2 70s linear infinite;
  }

  .rblue {
    transform: rotate(65deg) skew(0deg) scale(1);
    animation: rotateblue 70s linear infinite;
  }

  .rblue .img {
    transform: rotate(-65deg) skew(0deg) scale(1);
    animation: rotate_blue 70s linear infinite;
  }

  .r3 {
    transform: rotate(130deg) skew(0deg) scale(1);
    animation: rotates 70s linear infinite;
  }

  .r3 .img {
    transform: rotate(-130deg) skew(0deg) scale(1);
    animation: rotate_c3 70s linear infinite;
  }

  .r4 {
    transform: rotate(105deg) skew(0deg) scale(1);
    animation: rotatet 70s linear infinite;
  }

  .r4 .img {
    transform: rotate(-105deg) skew(0deg) scale(1);
    animation: rotate_c4 70s linear infinite;
  }
   @keyframes rotatet {
    0% {
      transform: rotate(105deg) skew(0deg) scale(1);
    }
    100% {
      transform: rotate(465deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotate_c4 {
    0% {
      transform: rotate(-105deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(-465deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) skew(0deg) scale(1);
      -ms-transform: rotate(0deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(0deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(0deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(0deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(360deg) skew(0deg) scale(1);
      -ms-transform: rotate(360deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(360deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(360deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(360deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotatef {
    0% {
      transform: rotate(45deg) skew(0deg) scale(1);
      -ms-transform: rotate(45deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(45deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(45deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(45deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(405deg) skew(0deg) scale(1);
      -ms-transform: rotate(405deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(405deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(405deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(405deg) skew(0deg) scale(1);
    }
  }
  @keyframes rotateblue {
    0% {
      transform: rotate(65deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(425deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotates {
    0% {
      transform: rotate(130deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(490deg) skew(0deg) scale(1);
    }
  }

 

  @keyframes rotate_c1 {
    0% {
      transform: rotate(0deg) skew(0deg) scale(1);
      -ms-transform: rotate(0deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(0deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(0deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(0deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(-360deg) skew(0deg) scale(1);
      -ms-transform: rotate(-360deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(-360deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(-360deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(-360deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotate_c2 {
    0% {
      transform: rotate(-45deg) skew(0deg) scale(1);
      -ms-transform: rotate(-45deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(-45deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(-45deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(-45deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(-405deg) skew(0deg) scale(1);
      -ms-transform: rotate(-405deg) skew(0deg) scale(1);
      /* IE 9 */
      -moz-transform: rotate(-405deg) skew(0deg) scale(1);
      /* Firefox */
      -webkit-transform: rotate(-405deg) skew(0deg) scale(1);
      /* Safari ºÍ Chrome */
      -o-transform: rotate(-405deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotate_blue {
    0% {
      transform: rotate(-65deg) skew(0deg) scale(1);

    }

    100% {
      transform: rotate(-425deg) skew(0deg) scale(1);
    }
  }

  @keyframes rotate_c3 {
    0% {
      transform: rotate(-130deg) skew(0deg) scale(1);
    }

    100% {
      transform: rotate(-490deg) skew(0deg) scale(1);
    }
  }

  
}
</style>