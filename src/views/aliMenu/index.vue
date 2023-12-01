<template>
  <div>
    <!-- v-waves -->
    <div v-waves class="open-icon" @click = "getMenuState">
       <i class="el-icon-menu"></i>
    </div>
    <div class="menu-sidebar">
      <!-- getChoice 设置收藏的菜单 -->
      <!-- getMenuState  控制菜单打开/关闭 -->
      <!-- isShow 控制菜单是否展示 -->
      <!-- menus 展示的菜单 关键参数： url: 菜单路由 name：菜单名称 id：菜单ID parentId:菜单的父级id -->
      <outSidebar ref="outSidebar" :isShow="isShow" @getChoice="getChoice"  @getMenuState="getMenuState"></outSidebar>
    </div>
  </div>
</template>
<script>
import outSidebar from './outSidebar.vue'
export default {
  components: {
    outSidebar
  },
  data() {
    return {
      isShow: false,
    }
  },
  created() {

  },
  methods: {
    // 菜单打开状态
    getMenuState() {
      this.isShow = !this.isShow
    },
    // 获取自定义收藏的菜单
    getChoice(val) {
      this.choiceList = val
    },
  }
}
</script>
<style lang="scss" scoped>
.open-icon {
    width: 60px;
    background: #168dff;
    height: 60px;

    &:hover {
      cursor: pointer;
    }
    .el-icon-menu {
      color: #fff;
      font-size: 34px;
      margin-left: 10px;
      margin-top: 10px;
    }
    .menu-sidebar {
      z-index: 9999;
    }
  }
</style>