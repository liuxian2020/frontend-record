<template>
  <div class="sidebarClass">
    <div class="demo-nav">
      <div class="menu fllil ul-item">
        <div class="sub-menu ul-item" :class="{'is-active': isShow}">
          <div class="box-item">

            <!-- 内容 -->
            <div class="choice-box">
              <transition-group>
                <div class="choice-item" :style="{'transform': 'translateY('+index * 40+'px)'}" v-for="(item, index) in choiceResultList" :key="item+index">
                  <app-link  :to="resolvePath(item.url)">
                    <div class="choice-name">
                      {{item.name}}                      
                    </div>
                  </app-link>
                  <div class="close-box" @click.stop="handleRemove(item)">
                    <i class="el-icon-close" ></i>
                  </div>
                </div>
              </transition-group>

                <!-- <grid-layout
                  :layout.sync="layout"
                  :col-num="12"
                  :row-height="30"
                  :is-draggable="true"
                  :is-resizable="false"
                  :is-mirrored="false"
                  :vertical-compact="true"
                  :margin="[10, 10]"
                  :use-css-transforms="true"
                >
                  <grid-item v-for="item in layout"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.i">
                    {{item.i}}
                  </grid-item>
                </grid-layout> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AppLink from './link'
import VueGridLayout from 'vue-grid-layout';
import { deepClone } from '@/utils/index.js'
export default {
  components: {
    AppLink,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    choiceList: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      defaultChoiceList: [],
      menus: [],

      layout: [
        {"x":0,"y":0,"w":12,"h":1,"i":"0"},
        {"x":0,"y":0,"w":12,"h":1,"i":"1"},
        {"x":0,"y":0,"w":12,"h":1,"i":"2"},
      ],
    }
  },
  computed: {
    // 引入所有的菜单
    ...mapGetters(['permission_menus']),
    // 展示默认菜单 优先展示自定义收藏菜单，如果没有自定义进行菜单收藏，使用默认菜单
    choiceResultList() {
      let list = []
      if(this.choiceList && this.choiceList.length > 0) {
        list = this.choiceList
        return list;
      }
      return this.defaultChoiceList;
    },
  },
  watch: {

  },
  created() {
    this.defaultChoiceList = deepClone(this.permission_menus[1].children)
  },
  methods: {
    // 处理路由跳转
    resolvePath(routePath) {
      return routePath || ''
    },

    handleRemove(item) {
      let index = this.choiceResultList.findIndex(t => t.id === item.id)
      this.choiceResultList.splice(index, 1)
      this.$emit('removeSelectMenu', item)
    },


    //开始拖拽事件
      onStart(){
        this.drag=true;
      },
      //拖拽结束事件
       onEnd() {
       this.drag=false;
    },


  }
}
</script>
<style lang="scss">
.sidebarClass {
  position: absolute;
  left: 0;
  top: 60px;
  .demo-nav {
    width: 240px;
  }

  .demo-nav .box-item {
    // padding: 0 10px;
    background: #222C3A;
    color: #fff;
    position: relative;
    width: 240px;
    height: calc(100vh - 51px);
    display: inline-block;
    z-index: 99;
    .choice-box {
      position: relative;
      .choice-item {
        transition: all 200ms ease-out 0s !important;
        height: 40px;
        line-height: 40px;
        position: absolute;
        width: 100%;
        .close-box {
          // background: pink;
          float: right;
          position: absolute;
          top: 10px;
          right: 20px;
          display: none;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .el-icon-close {
          position: absolute;
          top: 3px;
          left: 3px;
        }
        &:hover {
          background: rgba($color: #000000, $alpha: .05);
          .close-box {
            display: block;
          }
        }
        .choice-name {
          cursor: pointer;
          padding-left: 20px;
          position: relative;
        }

        /*被拖拽对象的样式*/
        .item {
            padding: 6px;
            background-color: #fdfdfd;
            border: solid 1px #eee;
            margin-bottom: 10px;
            cursor: move;
        } 
        /*选中样式*/
        .chosen {
            border: solid 2px #3089dc !important;
        }

      }
      .v-enter,
			.v-leave-to {
				opacity: 0;
			}
			
			.v-enter-active,
			.v-leave-active {
				transition: all 0.6s ease;
			}
			
			.v-move{
			  transition: all 0.8s ease;
			}
    }
  }
  
  .demo-nav .box-item .ul-item {
    position: absolute;
    left: 0;
    height: 0;
    overflow: hidden;
  }

  .demo-nav .sub-menu .box-item {
    float: none;
    transition: all 0.3s ease-in-out 0s;
    border-right: 0.7px solid #434c5c;
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .demo-nav .is-active.sub-menu {
    overflow: visible;
  }

  .demo-nav .is-active.sub-menu .box-item {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>