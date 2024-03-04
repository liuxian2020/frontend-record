<template>
  <div class="star-class">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="title">
      SASS星空
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
// ellipse at bottom 径向渐变
.star-class {
  height: calc(100vh - 50px);
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  position: relative;
}

.title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
  background: linear-gradient(#fff, #38485a);
  background-clip: text;
  color: transparent;
}


@function getShadows($n) {
  $shadow: '#{random(100)}vw #{random(100)}vh #fff';

  @for $i from 2 through $n {
    $shadow: '#{$shadow}, #{random(100)}vw #{random(100)}vh #fff';
  }

  @return unquote($shadow)
}

$duration: 400s;
$count: 1000;

@for $i from 1 through 3 {
  $duration: floor($duration/2);
  $size: #{$i}px;
  $count: floor($count/2);

  .layer#{$i} {
    position: fixed;
    left: 0;
    top: 0;
    width: $size;
    height: $size;
    border-radius: 50%;
    background: #fff;
    box-shadow: getShadows($count);
    animation: moveUp $duration linear infinite;

    &::after {
      position: fixed;
      left: 0;
      top: calc(100vh - 50px);
      width: $size;
      height: $size;
      background: #fff;
      content: '';
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}


@keyframes moveUp {
  100% {
    transform: translateY(-100vh);
  }
}
</style>