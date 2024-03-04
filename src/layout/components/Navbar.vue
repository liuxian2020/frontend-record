<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-popover placement="top-start" width="200" trigger="click">
        <div class="out-box">
          <div @click="changeSkin(item.theme)" v-for="(item, index) in skinList" :key="index" class="skin-item"
            :style="{ 'background': item.color }">
          </div>
        </div>
        <div class="skin" slot="reference">换肤</div>
      </el-popover>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/carousel/1.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data () {
    return {
      skinList: [{
        theme: 'orange',
        color: 'orange'
      }, {
        theme: 'blue',
        color: '#409eff'
      }, {
        theme: 'white',
        color: '#fff'
      }]
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout () {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changeSkin (theme) {
      this.$store.dispatch('user/getTheme', theme)
      document.documentElement.setAttribute("theme", theme);
    }
  }
}
</script>

<style lang="scss">
.skin {
  display: inline-block;
  color: var(--el-font-color);
  position: absolute;
  right: 100px;
  top: 2px;
  cursor: pointer;
}

.out-box {
  display: flex;
}

.skin-item {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  box-shadow: 1px 1px 5px #bcb7b7, -1px -1px 5px #bcb7b7;
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: var(--el-color-primary);
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
