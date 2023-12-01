<template>
  <div class="csseffect">
    <div class="border-right">
      <move></move>
    </div>
    <div>
      <rotate></rotate>
    </div>
    <div>
      <LabelCloud ref="labelCloud"></LabelCloud>
    </div>
  </div>
</template>
<script>
import move from './move.vue'
import rotate from './rotate.vue'
import LabelCloud from './labelCloud.vue'
export default {
  components: {
    move,
    rotate,
    LabelCloud
  },
  mounted () {
    let list = [{
      id: 1,
      children: [
        {
          id: 2
        }
      ]
    }]
    let list2 = this.flatten(list)
    this.$nextTick(function () {
      this.$refs.labelCloud.getLabelCloud()
    })
  },
  data () {
    return {

    }
  },
  methods: {
    flatten (arr) {
      return arr.reduce((result, item) => {
        return result.concat(
          item,
          Array.isArray(item.children) ? this.flatten(item.children) : []
        )
      }, [])
    }
  }
}
</script>
<style lang="scss">
.csseffect {
  margin: 20px;
  columns: 500px 2;
  border: 0.7px solid #e6e6e6;
  border-radius: 4px;
}
</style>