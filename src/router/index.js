import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    meta: { title: 'echarts集合' },
    redirect: "/echartsIndex",
    children: [
      {
        path: '/echartsIndex',
        name: 'echartsIndex',
        component: () => import('@/views/map/echarts'),
        meta: {
          title: '折线图·饼图集合',
        }
      },
      // 地图打点图
      {
        path: '/map3',
        name: 'map3',
        component: () => import('@/views/map/index3'),
        meta: {
          title: '地图数据展示',
        }
      },
    ]
  },
  {
    path: "/vueApplications",
    component: Layout,
    children: [{
      path: "/vueApplications",
      name: "vueApplications",
      component: () => import("@/views/microApp/vue3.vue"),
      meta: { title: "microApp嵌入vue3项目", code: 'vue3' },
    }]
  },
  {
    path: "/search",
    component: Layout,
    children: [
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/index'),
        meta: {
          title: '搜索',
        }
      }
    ]
  },
  {
    path: "/robot",
    component: Layout,
    meta: { title: 'threeJs案例' },
    children: [
      {
        path: '/robot',
        name: 'robot',
        component: () => import('@/views/robot/index'),
        meta: {
          title: '机器人',
        }
        // }, {
        //   path: '/ali-demo',
        //   name: 'aliDemo',
        //   component: () => import('@/views/three/aliDemo'),
        //   meta: {
        //     title: '仿阿里官网',
        //   }
      }
    ]
  },
  // css动效
  {
    path: '/star',
    redirect: '/starIndex',
    component: Layout,
    meta: { title: '动效' },
    children: [
      {
        path: '/starIndex',
        name: 'starIndex',
        component: () => import('@/views/csseffect/star'),
        meta: {
          title: 'SASS星空效果',
        }
      },
      {
        path: '/word',
        name: 'word',
        component: () => import('@/views/csseffect/word'),
        meta: {
          title: '文字阴影',
        }
      },
      {
        path: '/carousel',
        name: 'carousel',
        component: () => import('@/views/csseffect/carousel'),
        meta: {
          title: '3d渐变轮播图',
        }
      },
      {
        path: '/water',
        name: 'water',
        component: () => import('@/views/csseffect/water'),
        meta: {
          title: '水波纹',
        }
      },
      {
        path: '/color',
        name: 'color',
        component: () => import('@/views/csseffect/color'),
        meta: {
          title: '玻璃拟态质感',
        }
      },
      // {
      //   path: '/3dHover',
      //   name: 'color',
      //   component: () => import('@/views/csseffect/3dHover'),
      //   meta: {
      //     title: '3dHover',
      //   }
      // },
      // {
      //   path: '/viewScroll',
      //   name: 'color',
      //   component: () => import('@/views/csseffect/viewScroll'),
      //   meta: {
      //     title: '视差滚动',
      //   }
      // },
      {
        path: '/csseffect',
        name: 'csseffect',
        component: () => import('@/views/csseffect/index'),
        meta: { title: 'css动效' }
      }
    ]
  },
  // {
  //   path: "/three",
  //   component: Layout,
  //   meta: {
  //     title: '3d线加载',
  //   },
  //   children: [
  //     {
  //       path: '/three',
  //       name: 'three',
  //       component: () => import('@/views/three/index'),
  //       meta: {
  //         title: 'three',
  //       }
  //     }
  //   ]
  // },
  {
    path: "/aliMenu",
    component: Layout,
    children: [
      // 仿阿里菜单实现
      {
        path: '/aliMenu',
        name: 'aliMenu',
        component: () => import('@/views/aliMenu/index'),
        meta: {
          title: 'aliMenu',
        }
      }
    ]
  },
  {
    path: "/test",
    component: Layout,
    children: [
      // 仿阿里菜单实现
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test'),
        meta: {
          title: 'test',
        }
      }
    ]
  },
  {
    path: "/preview",
    component: Layout,
    meta: { title: '文件预览' },
    children: [
      {
        path: '/preview/word',
        name: 'word',
        component: () => import('@/views/preview/word.vue'),
        meta: {
          title: 'word',
        }
      },
      {
        path: '/preview/pdf',
        name: 'pdf',
        component: () => import('@/views/preview/pdf.vue'),
        meta: {
          title: 'pdf',
        }
      }
    ]
  },
  {
    path: "/canvas",
    component: Layout,
    redirect: '/canvas1',
    meta: { title: 'canvasDemo' },
    children: [
      {
        path: '/canvas1',
        name: 'canvas1',
        component: () => import('@/views/canvas/index'),
        meta: {
          title: 'canvas',
        }
      },
      {
        path: '/canvas2',
        name: 'canvas2',
        component: () => import('@/views/canvas/index2'),
        meta: {
          title: 'canvas2',
        }
      },
      {
        path: '/canvas3',
        name: 'canvas3',
        component: () => import('@/views/canvas/index3'),
        meta: {
          title: 'canvas3',
        }
      },
      {
        path: '/canvas4',
        name: 'canvas4',
        component: () => import('@/views/canvas/index4'),
        meta: {
          title: 'canvas4',
        }
      },
      {
        path: '/canvas5',
        name: 'canvas5',
        component: () => import('@/views/canvas/index5'),
        meta: {
          title: 'canvas5',
        }
      },
      {
        path: '/canvas6',
        name: 'canvas6',
        component: () => import('@/views/canvas/index6'),
        meta: {
          title: 'canvas6',
        }
      },
      {
        path: '/canvas7',
        name: 'canvas7',
        component: () => import('@/views/canvas/index7'),
        meta: {
          title: 'canvas7',
        }
      },
      {
        path: '/canvas8',
        name: 'canvas8',
        component: () => import('@/views/canvas/index8'),
        meta: {
          title: 'canvas8',
        }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// const createRouter = () => new Router({
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

// const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.mode = 'history'
//   router.base = process.env.BASE_URL
//   router.matcher = newRouter.matcher // reset router
// }

const router = new Router({
  mode: 'history',
  routes: constantRoutes
})
export default router
