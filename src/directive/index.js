import Vue from 'vue'
import store from '../store/index'

Vue.directive('has', {
  inserted: function(el, binding, vnode) {
    if (store.state.app&&store.state.app.enterControls&&!store.state.app.enterControls.includes(binding.arg)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  },
})


Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  },
})
// 管理员可以看见的
Vue.directive('admin', {
  inserted: function(el) {
    // el.style.display = 'none'
    if (store.state.user.isUser) {
      el.parentNode.removeChild(el)
    }
  },
})
// 用户可以看到的
Vue.directive('user', {
  inserted: function(el) {
    // el.style.display = 'none'
    if (!store.state.user.isUser) {
      el.parentNode.removeChild(el)
    }
  },
})

// 角色权限 数组内可查看
Vue.directive('permission', {
  inserted(el, binding) {
    const { value } = binding
    let roles = store.getters && store.getters.roles
    if (roles === null) {
      roles = []
    }
    // 上级单位 ROLE_SUPER_UNIT
    // 渠道 ROLE_CHANNEL
    // 运营 ROLE_OPERATE
    // 用户 ROLE_USER
    // 管理员 ROLE_ADMIN
    // const roles = ['editor']
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  },
})
// 角色权限 数组内不可看
Vue.directive('isPermission', {
  inserted(el, binding) {
    const { value } = binding
    let roles = store.getters && store.getters.roles
    if (roles === null) {
      roles = []
    }
    // 上级单位 ROLE_SUPER_UNIT
    // 渠道 ROLE_CHANNEL
    // 运营 ROLE_OPERATE
    // 用户 ROLE_USER
    // 管理员 ROLE_ADMIN
    // const roles = ['editor']
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })

      if (hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  },
})
Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        // el.classList.add('is-disabled');
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
          //   el.classList.remove('is-disabled')
        }, binding.value || 4000)
      }
    })
  },
})



 // v-dialogDrag: 弹窗拖拽
 Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/px/g, '')
        styT = +sty.top.replace(/px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = el.querySelector('.el-dialog')
    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft
      console.log(disX,e.clientX ,  el.offsetLeft)
      document.onmousemove = function(e) {
        e.preventDefault() // 移动时禁用默认事件
        // 通过事件委托，计算移动的距离
        const l = e.clientX 
        if(l>500){
          dragDom.style.width = `${l}px`
        }
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})



 // v-dialogDrag: 弹窗拖拽
 Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/px/g, '')
        styT = +sty.top.replace(/px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = el.querySelector('.el-dialog')
    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft
      console.log(disX,e.clientX ,  el.offsetLeft)
      document.onmousemove = function(e) {
        e.preventDefault() // 移动时禁用默认事件
        // 通过事件委托，计算移动的距离
        const l = e.clientX 
        if(l>500){
          dragDom.style.width = `${l}px`
        }
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
