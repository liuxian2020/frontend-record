<template>
  <div class="word-class">
    <h1>
      shadow
      <br>
      text
      <br>
      effect
    </h1>
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
.word-class {
  height: calc(100vh - 50px);
  background: linear-gradient(45deg, #bfbfbf, #e6e6e6);
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 20vmin;
  line-height: 1;
  margin: 0;
  letter-spacing: 5px;
  color: #e6e6e6;
  text-align: center;
  text-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #808080;
}
</style>