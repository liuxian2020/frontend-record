<template>
  <div class="container">

    <div class="box" data-color="clr1">
      <div class="img-box">
        <img src="@/assets/carousel/1.jpg" alt="glassmorphism">
      </div>
      <div class="glass">
        <h2>
          Someone
          <br>
          <span>PM</span>
        </h2>
        <ul>
          <i class="el-icon-share"></i>
          <i class="el-icon-news"></i>
          <i class="el-icon-goods"></i>
        </ul>
      </div>
    </div>

    <div class="box" data-color="clr2">
      <div class="img-box">
        <img src="@/assets/carousel/2.jpg" alt="glassmorphism">
      </div>

      <div class="glass">
        <h2>
          Someone
          <br>
          <span>UI</span>
        </h2>

        <ul>
          <i class="el-icon-share"></i>
          <i class="el-icon-news"></i>
          <i class="el-icon-goods"></i>
        </ul>
      </div>
    </div>

    <div class="box" data-color="clr3">
      <div class="img-box">
        <img src="@/assets/carousel/3.jpeg" alt="glassmorphism">
      </div>

      <div class="glass">
        <h2>
          Someone
          <br>
          <span>RD</span>
        </h2>

        <ul>
          <i class="el-icon-share"></i>
          <i class="el-icon-news"></i>
          <i class="el-icon-goods"></i>
        </ul>
      </div>
    </div>

    <div class="box" data-color="clr4">
      <div class="img-box">
        <img src="@/assets/carousel/4.jpeg" alt="glassmorphism">
      </div>

      <div class="glass">
        <h2>
          Someone
          <br>
          <span>QA</span>
        </h2>

        <ul>
          <a href="https://github.com/vnyoon/web-magic">
            <i class="iconfont icon-GitHub"></i>
          </a>
          <a href="https://github.com/vnyoon/web-magic">
            <i class="iconfont icon-weixin"></i>
          </a>
          <a href="https://github.com/vnyoon/web-magic">
            <i class="iconfont icon-weibo"></i>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },

}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

a {
  text-decoration: none;
  color: #fff8;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #111;
  transition: background-color .5s;
}

body:has(.box[data-color="clr1"]:hover) {
  background-color: #412c2d;
}

body:has(.box[data-color="clr2"]:hover) {
  background-color: #45342a;
}

body:has(.box[data-color="clr3"]:hover) {
  background-color: #253c3f;
}

body:has(.box[data-color="clr4"]:hover) {
  background-color: #27313f;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 40px;
  overflow: hidden;
}

.container .box {
  position: relative;

  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .5s;
}

.container .box .img-box {
  position: absolute;
  inset: 0;
  border: 4px solid rgba(0, 0, 0, .2);
  border-radius: 13px;
}

.container .box .img-box img {
  border-radius: 10px;
  transition: opacity 0.5s;
}

.container .box .glass {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  /* for safari */
  border-radius: 10px;
  background: linear-gradient(#fff2, transparent);
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: 0 15px 15px rgba(0, 0, 0, .25);

  display: flex;
  justify-content: center;
  align-items: center;
  scale: 0;
  opacity: 0;
  transition: 0.5s;
}

.container .box .glass::before {
  content: "";
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.05);
}

.container .box .glass h2 {
  font-size: 1.25em;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .1em;
  text-align: center;
  line-height: 0.8em;
}

.container .box .glass h2 span {
  font-size: 0.5em;
  font-weight: 400;
}

.container .box .glass ul {
  position: absolute;
  bottom: 5px;

  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.container .box .glass ul a {
  transition: color 0.3s;
}

.container .box .glass ul a:hover {
  color: #fff;
}

.container .box .glass ul i {
  color: #fff8;
  font-size: 20px;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
}

.container .box:hover {
  transform: rotate(-15deg);
}

.container .box:hover .img-box img {
  opacity: .6;
}

.container .box:hover .glass {
  transform: rotate(20deg);
  scale: 1;
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .container {
    gap: 20px;
    padding: 10px;
  }

  .container .box {
    width: 150px;
    height: 150px;
  }
}
</style>

