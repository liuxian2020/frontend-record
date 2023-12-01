<template>
  <div class="otsidebarClass">
    <div class="demo-nav">
      <div class="menu fllil ul-item">
        <div class="sub-menu ul-item" id='outsidebarid' :class="{'is-active': isShow}">
          <div class="box-item">
            <!-- 左侧 -->
            <div class="bottom-content">
              <!-- 搜索 -->
              <div class="top-search">
                <el-input v-model="inputValue" placeholder="请输入关键字" clearable></el-input>
              </div>
              <div class="content-msg">
                <!-- 选中的菜单 -->
                <div class="top-select">
                  <div class="visit-desc">
                    最近访问
                  </div>
                  <div class="rencent-visit">
                    <div class="visit-item" v-for="(item, index) in visits" :key="index">
                      <app-link  class="link-box" :to="resolvePath(item.url)">
                        <div @click="handleClose">
                          {{item.text}}
                        </div>
                      </app-link>
                    </div>
                  </div>
                  
                </div>
                <!-- 存放所有的菜单信息 -->
                <div class="menu-box">
                  <div class="product-group" v-for="(item, index) in menus" :key="index">
                    <!-- 一级菜单 -->
                    <div class="first-title" :class="{'is-menu-check': item.isCheck, 'is-menu-click': activeMenu.indexOf(item.url) > -1}">
                      <app-link  class="link-box" :to="resolvePath(item.url)">
                        <div @click="handleRecentVisit(item)">
                          {{item.text}}  
                          <!-- {{item.url}} -->
                        </div>
                      </app-link>
                    </div>
                    <!-- 二级菜单 -->
                    <div class="second-title" :class="{'is-submenu-check': activeMenu === inner.url}" v-for="(inner, index2) in item.children" :key="index2">
                      <app-link  class="link-box" v-if="inner.url" :to="resolvePath(inner.url)">
                        <div @click="handleRecentVisit(inner)" >
                          {{inner.text}}  
                          <!-- {{activeMenu === inner.url}} -->
                        </div>
                      </app-link>
                      <!-- 二级菜单下面有子菜单的 自身没有路由，不能用app-link -->
                      <div class="link-box">
                        <div @click="handleRecentVisit(inner)" v-if="!inner.url">
                          {{inner.text}}
                        </div>
                      </div>
                      <div class="star-box">
                        <i class="el-icon-star-off" @click.stop="getSelectMenu(inner)" :class="{'active': inner.isChoice}"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </div>

            <!-- 右侧定位 -->
            <div class="get-position">
              <i class="el-icon-close" @click="handleClose"></i>
              <div class="position-item" @click="getChecked(item)" v-for="(item, index) in menus" :key="index">
                {{item.text}}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import AppLink from './link'
import Cookies from "js-cookie";
export default {
  components: {
    AppLink
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    // permission_menus: {
    //   type: Array,
    //   default() {
    //     return []
    //   },
    // },
  },
  data() {
    return {
      inputValue: '',

      choiceList: [],

      visits: [],
      // menus: [{
      //   name: '1'
      // }],
      orginMenus: [],

      menus: [],

      permission_menus: [{"id":"c9b5cfe8aea0fa3f62cd5089d6709521","text":"统计分析","url":"/screenAnalysis","code":"LogIndex","icon":"shiyoudanwei","sortNum":1,"children":[]},{"id":"fdf5d9a6f47dcb6d857b71c57b47f6f8","text":"用户中心","url":"/systemManage","code":"UC","icon":"kongzhitai","sortNum":1,"children":[{"id":"fac61355d81a311d4172c0118e50a6ed","text":"账号安全","url":"/systemManage/control","code":"UCAccountIndex","icon":null,"sortNum":2,"children":[]}]},{"id":"f765554764a001682891022a6c422936","text":"指纹平台","url":"/fingerprint","code":"fingerprint","icon":"kaoqin","sortNum":2,"children":[{"id":"4d54fe7918c6265a66570dc7be8c0223","text":"指纹库","url":"/fingerprint/database","code":"FingerprintDatabaseIndex","icon":"avdsloudongsaomiao","sortNum":1,"children":[]},{"id":"8b38a8208857d979fe0895db47a6c67d","text":"配置管理","url":"","code":"ConfigIndex","icon":"shangchuan-","sortNum":2,"children":[{"id":"6e52a82b095a57a8c2ddec071376bb98","text":"类别管理","url":"/fingerprint/config/category","code":"ConfigIndex","icon":null,"sortNum":1,"children":[]},{"id":"ca4f145865c4f21596927aa4e25f3d94","text":"协议管理","url":"/fingerprint/config/protocal","code":"ConfigIndex","icon":null,"sortNum":2,"children":[]},{"id":"a54d86dc0160f22e447e9ec8439a1d3d","text":"服务对象管理","url":"/fingerprint/config/object","code":"ConfigIndex","icon":null,"sortNum":3,"children":[]},{"id":"d24071d265d49ebd13f5e123aee092eb","text":"指纹同步记录","url":"/fingerprint/config/record","code":"ConfigIndex","icon":null,"sortNum":4,"children":[]}]},{"id":"d1d62082d3d84d32c6eec0bf5a7fe3b9","text":"运行监控","url":"/fingerprint/control","code":"ControlIndex","icon":"fenlei","sortNum":3,"children":[]}]},{"id":"37080f6c588963ce24e159c7db5a3367","text":"威胁情报中心","url":"/threatCenter","code":"LogIndex","icon":"anquanjiance1","sortNum":3,"children":[{"id":"092a98677e3792061631f3c4d61d6e51","text":"威胁情报中心","url":"/threatCenter/threat","code":"LogIndex","icon":null,"sortNum":1,"children":[]}]},{"id":"3e472bd1061ed2cd10f57e8182030cae","text":"设备管理","url":"/deviceManage","code":"DeviceIndex","icon":"shebeiguanli","sortNum":5,"children":[{"id":"f6ca659cc82520741e83eb60806c5da6","text":"设备诊断","url":"/deviceManage/diagnose","code":"DeviceDiagnoseIndex","icon":null,"sortNum":1,"children":[]},{"id":"1319448993843f762055aec04cb3002c","text":"裸命令","url":"/deviceManage/command","code":"DeviceCommandIndex","icon":null,"sortNum":2,"children":[]},{"id":"27e0d5e265678ed028467f8b3b5f4f60","text":"go-mqtt","url":"/deviceManage/mqtt","code":"DeviceMqttIndex","icon":null,"sortNum":2,"children":[]},{"id":"7d90fc24ad69ed37475b20cad38f2c4f","text":"远程隧道","url":"/deviceManage/tunnel","code":"DeviceTunnelIndex","icon":null,"sortNum":3,"children":[]},{"id":"8cdcc85b3dbccabfba0012a7ab83613c","text":"文件资源管理","url":"/deviceManage/fileManage","code":"DeviceFileIndex","icon":null,"sortNum":4,"children":[]},{"id":"fa21197511bae3b43edc2db6a8103651","text":"知识库","url":"/deviceManage/knowledge","code":"DeviceKnowledgeIndex","icon":null,"sortNum":5,"children":[]}]},{"id":"bca391c6dc00a81b2583c4bf1789c9d2","text":"组织架构","url":"/organization","code":"OrgIndex","icon":"fenzu","sortNum":5,"children":[]},{"id":"cacf7ad8e340aad52104c23396568876","text":"权限管理","url":"/authorityManage","code":"Auth","icon":"quanxianguanli","sortNum":10,"children":[{"id":"2c7d03e349eadc4f6f531e7d265c348c","text":"角色管理","url":"/authorityManage/list","code":"AuthListIndex","icon":null,"sortNum":1,"children":[]},{"id":"d214df42e5e2520c92f14f3d7df51fc4","text":"账号管理","url":"/authorityManage/account","code":"AuthAccountIndex","icon":null,"sortNum":2,"children":[]},{"id":"c3aede84a74da1602d73df78d34b93dd","text":"菜单管理","url":"/authorityManage/menu","code":"AuthMenuIndex","icon":"","sortNum":3,"children":[]}]},{"id":"601c095a7f90a386d86bd50edd5f8703","text":"日志管理","url":"/logManage","code":"LogIndex","icon":"rizhiguanli","sortNum":14,"children":[]},{"id":"81b8513a55f6aaad38e511c9db658a74","text":"NDR文件配置管理","url":"/server","code":"LogIndex","icon":"ceshi","sortNum":15,"children":[]},{"id":"4f57919a5538fe9db78b7defc2d59cda","text":"运营中心","url":"/operationCenter","code":"LogIndex","icon":"yunying","sortNum":17,"children":[{"id":"b63aa080e8affbc691af83fafc6a0978","text":"规则库","url":"/operationCenter/knowledge","code":"OPRepositoryIndex","icon":"yunying","sortNum":1,"children":[]},{"id":"29ae81bf15ff070d3ae36a395c3fcd56","text":"设备管理","url":"/operationCenter/control","code":"LogIndex","icon":"2","sortNum":2,"children":[]},{"id":"6a74245dcd599223b5d37e68dbf33ff9","text":"处置中心","url":"/operationCenter/disposalCenter","code":"PendFallIndex","icon":null,"sortNum":3,"children":[]},{"id":"33eff65e66b284ffb1bd887f42b90a2e","text":"协同防御","url":"/operationCenter/defense","code":"LogIndex","icon":null,"sortNum":4,"children":[]}]},{"id":"277ba18baaf6c3d50dfab5cfa20fd1f8","text":"漏扫管理","url":"/leakManage","code":"LogIndex","icon":"avdsloudongsaomiao","sortNum":18,"children":[{"id":"3a9b5e11ae67446ece51bc7417ee1bfd","text":"固定漏扫节点管理","url":"/leakManage/fixedNodes","code":"LogIndex","icon":null,"sortNum":1,"children":[]},{"id":"ad604386b1648ee467fb0b8b1e8acb04","text":"漏扫节点数量配置","url":"/leakManage/DynamicNode","code":"LogIndex","icon":null,"sortNum":2,"children":[]},{"id":"37300047ab0b777ff061fe5377e6ceda","text":"不可用漏扫节点管理","url":"/leakManage/unusable","code":"LogIndex","icon":null,"sortNum":3,"children":[]},{"id":"fb10212c8aef5cdf968f5dd5086f2faa","text":"动态漏扫节点管理","url":"/leakManage/dynamic","code":"LogIndex","icon":null,"sortNum":4,"children":[]}]},{"id":"c68a5e98e71faa2c6984397a6387c0aa","text":"管理平台","url":"/plManage","code":"LogIndex","icon":"guanlipingtai","sortNum":20,"children":[{"id":"791685f2bcecb4be4f74cee0a785c598","text":"平台管理","url":"/plManage/plform","code":"LogIndex","icon":null,"sortNum":1,"children":[]},{"id":"3872e0e136e2ba1204abd694da0a4f4f","text":"版本管理","url":"/plManage/versions","code":"LogIndex","icon":null,"sortNum":2,"children":[]},{"id":"3cf766f6e3425af7fed66aa5c68c90d2","text":"服务管理","url":"/plManage/service","code":"LogIndex","icon":null,"sortNum":3,"children":[]},{"id":"a8fa03d58e6363bb270c44c07be24343","text":"客户端管理","url":"/plManage/client","code":"LogIndex","icon":null,"sortNum":4,"children":[]}]}]

    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set

      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }

      return path
    },
  },
  watch: {
    inputValue: {
      handler(newVal, oldVal) {
        if(this.inputValue) {
          let list = []
          if(this.menus && this.menus.length > 0) {
            this.menus.forEach(ele => {
              // 一级菜单名称包括就塞选出来
              if(ele.text.toLowerCase().indexOf(this.inputValue.toLowerCase()) != -1) {
                list.push(ele)
              }else {
                // 一级菜单名称不包括塞选出二级菜单包括的
                if(ele.children && ele.children.length > 0) {
                  let innerList = []
                  ele.children.forEach(inner => {
                    if(inner.text.toLowerCase().indexOf(this.inputValue.toLowerCase()) != -1) {
                      innerList.push(inner)
                    }
                  })
                  if(innerList && innerList.length > 0) {
                    let obj = ele
                    obj.children = innerList
                    list.push(obj)
                  }
                }
              }
            })
            this.menus = list
          }
          
        }else {
          // 没有内容匹配展示初始化菜单内容（用户中心、消息中心不需要展示）
          this.menus = this.deepClone(this.permission_menus)
        }
        
      },
      deep: true,
      immediate: true
    }, 
    permission_menus: {
      handler(newVal, oldVal) {
        // console.log(newVal, '====nnnn')
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      // 初始化菜单无需跟踪和选中
      this.permission_menus.forEach(ele => {
        ele.isCheck = false
        if(ele.children && ele.children.length > 0) {
          ele.children.forEach((inner) => {
            inner.isChoice = false
          })
        }
      })
      // 初始化默认访问菜单
      let visits = Cookies.get('recentVisits')
      if(visits) {
        visits = JSON.parse(visits)
        this.visits = visits.splice(0, 6)
      }
      // 初始化默认展示的菜单
      this.choiceList = this.deepClone(this.permission_menus[0].children)
      this.$emit('getChoice', this.choiceList)
      this.permission_menus[0].children.forEach(ele => {
        ele.isChoice = true
      })
      this.menus = this.deepClone(this.permission_menus)
    },
    // 快速定位一级菜单的位置
    getChecked(item) {
      if(item.isCheck) {
        let selectIndex = this.menus.findIndex(t => t.url === item.url)
        this.$set(this.menus[selectIndex], 'isCheck', false)
        this.$forceUpdate()
      } else {
        this.menus.forEach((ele, index) => {
          ele.isCheck = false
        });
        let selectIndex = this.menus.findIndex(t => t.url === item.url)
        this.$set(this.menus[selectIndex], 'isCheck', true)
        this.$forceUpdate()

        this.$nextTick(() => {
          let isCheckItem = document.querySelector('.is-menu-check')
          isCheckItem.scrollIntoView()
        }) 
      }
    },
    // 标记自定义收藏的菜单
    getSelectMenu(item) {
      item.isChoice = !item.isChoice
      // console.log('999999', item.isChoice, this.choiceList)
      if(item.isChoice) {
        this.choiceList.unshift(item)
      }else {
        let index = this.choiceList.findIndex(t => t.id === item.id)
        if(index > -1) {
          this.choiceList.splice(index, 1)
        }
      }
      this.$forceUpdate()
      this.$emit('getChoice', this.choiceList)
    },
    // 取消标记
    removeSelectMenu(item) {
      let index = this.menus.findIndex(t => t.id === item.parentId) 
      let removeIndex = this.menus[index].children.findIndex(t => t.id === item.id)
      this.menus[index].children[removeIndex].isChoice = false
      this.$forceUpdate()
    },
    // 处理路由跳转
    resolvePath(routePath) {
      return routePath || ''
    },
    // 设置最近访问
    handleRecentVisit(item) {
      let userfunc = this.$store.state.app.menus
      if(item.children && item.children.length) {
        let hasRouter = false
        for (let i = 0; i < item.children.length; i++) {
          if (userfunc.indexOf(item.children[i].code) > -1) {
            // 调用二级路由方法
            hasRouter = true
            this.$router.push({path: item.children[i].url})
            break;
          }
        }
        if(!hasRouter) {
          // this.$message({
          //   message: "菜单未配置相关页面权限,请联系管理员",
          //   type: "error"
          // })
          this.$router.push({path: '/noPression'});
        }
      }
      // 菜单点击之后关闭菜单追踪的位置
      this.menus.forEach(ele => {
        ele.isCheck = false
      })

      // 关闭菜单 -- 记住
      this.$emit('getMenuState');
      let visits = Cookies.get('recentVisits')
      if(visits) {
        visits = JSON.parse(visits)
        let index = visits.findIndex(t => t.id === item.id)
        if(index === -1 ) {
          visits.unshift(item)
          Cookies.set('recentVisits', JSON.stringify(visits))
        }
        this.visits = visits.splice(0, 6)
      }else {
        Cookies.set('recentVisits', JSON.stringify([item]))
        this.visits = [item]
      }
    },
    // 关闭菜单框
    handleClose() {
      this.$emit('getMenuState');
    },
    // 拷贝
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },


  }
}
</script>
<style lang="scss">
@import 'src/styles/mixin.scss';
.otsidebarClass {
  position: absolute;
  left: 0;
  top: 0;
  .demo-nav {
    width: 900px;
  }

  .demo-nav .box-item {
    background: #222C3A;
    color: #9297A1;
    position: absolute;
    width: 900px;
    height: calc(100vh - 51px);
    top: 60px;
    left: 0;
    display: inline-block;
    overflow: hidden;
    // background: pink;
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
    border-right: 1px solid #e6e6e6;
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
  
  .bottom-content {
    height: 100% ;
    overflow: hidden;
    width: calc(100% - 160px);
    display: inline-block;
    border-right: 0.7px solid #434c5c;
    padding-left: 20px;
    position: absolute;
    top: 0;
    left: 0;
    .top-search {
      height: 49px;
      // margin-top: 30px;
      .el-input {
        line-height: normal;
      }
      .el-input__inner {
        border-left: none;
        border-radius: 0;
        border-right: 0;
        border-top: 0;
        background: transparent;
        color: #fff;
      }
    }
    
    .content-msg{
      height: calc(100% - 65px);
      overflow-y: auto;
      width: 100%;
      @include scrollBar;
      .top-select {
        min-height: 100px;
        padding-bottom: 50px;
        .visit-desc {
          // padding: 18px;
          height: 50px;
          line-height: 50px;
          padding-left: 18px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .rencent-visit {
          line-height: 32px;
          columns: 200px 3;
          .visit-item {
            padding: 0px 8px 0 18px;
            break-inside: avoid;
          }
        }
      }
      .menu-box {
        columns: 200px 3;
      }
    }
  }

  .get-position {
    width: 160px;
    height: 100%;
    overflow-y: auto;
    display: inline-block;
    vertical-align: top;
    padding-top: 40px;
    position: absolute;
    top: 0;
    right: 0;
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
    .position-item {
      padding: 0px 12px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
    }
  }
  

  .product-group {
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    transition: all 250ms linear 0s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0px 8px 20px 8px;
    line-height: 32px;
    break-inside: avoid;
    .first-title {
      color: #fff;
      transition: all 250ms linear 0s;
      padding-left: 10px;
      font-size: 14px;
    }
    .is-menu-check {
      background: #ff6a00;
      color: #fff;
    }
    .is-menu-click {
      background: #448AFF;
      color: #fff;
    }
    .is-submenu-check {
      color: #fff !important;
    }
    .second-title {
      color: #9297A1;
      font-weight: normal;
      font-size: 14px;
      padding-left: 10px;
      cursor: pointer;
      display: flex;
      .link-box {
        flex: 1;
      }
      .star-box {
        width: 20px;
        text-align: center;
      }
      .el-icon-star-off {
        opacity: 0;
      }
      &:hover {
        .el-icon-star-off {
          opacity: 1;
        }
        background: rgba($color: #000000, $alpha: .05);
      }
      .el-icon-star-off.active {
        color: #ff6a00;
        opacity: 1;
      }
    }
  }
}
</style>

<style lang="scss" scoped>

@media screen and (max-width: 1100px) {
  .otsidebarClass {
    .demo-nav .box-item {
      width: 750px;
    }
    .content-msg {
      .top-select {
        .rencent-visit {
          columns: 200px 2;
        }
      }
      .menu-box {
        columns: 200px 2;
      }
    }
  }
}


@media screen and (min-width: 1101px) {
  .otsidebarClass {
    .demo-nav .box-item {
      width: 900px;
    }
    .content-msg {
      .top-select {
        .rencent-visit {
          columns: 200px 3;
        }
      }
      .menu-box {
        columns: 200px 3;
      }
    }
  }
}
</style>