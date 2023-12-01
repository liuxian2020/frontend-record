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
  // css动效
  {
    path: '/',
    redirect: '/csseffect',
    component: Layout,
    meta: { title: '动效' },
    children: [
      {
        path: '/csseffect',
        name: 'csseffect',
        component: () => import('@/views/csseffect/index'),
        meta: { title: 'css动效' }
      },
      {
        path: '/transition',
        name: 'transition',
        component: () => import('@/views/transition/index'),
        meta: {
          title: 'transition',
        }
      }
    ]
  },
  {
    path: "/robot",
    component: Layout,
    children: [
      // 利用threeJS实现的机器人
      {
        path: '/robot',
        name: 'robot',
        component: () => import('@/views/robot/index'),
        meta: {
          title: '机器人',
        }
      }
    ]
  },
  {
    path: "/map",
    component: Layout,
    meta: { title: '3d地图展示' },
    children: [
      // 攻击图 数据图 地图下钻 收集三类即可 目前缺
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/map/index'),
        meta: {
          title: '地图趋势图',
        }
      },
      {
        path: '/map2',
        name: 'map2',
        component: () => import('@/views/map/index2'),
        meta: {
          title: '地图下钻',
        }
      },
      // 地图打点图
      {
        path: '/map3',
        name: 'map3',
        component: () => import('@/views/map/index3'),
        meta: {
          title: '地图打点',
        }
      }
    ]
  },
  {
    path: "/openlayer",
    component: Layout,
    children: [
      {
        path: '/openlayer',
        name: 'openlayer',
        component: () => import('@/views/openlayer/index'),
        meta: {
          title: 'openlayer',
        }
      }
    ]
  },
  {
    path: "/three",
    component: Layout,
    meta: {
      title: '3d线加载',
    },
    children: [
      {
        path: '/three',
        name: 'three',
        component: () => import('@/views/three/index'),
        meta: {
          title: 'three',
        }
      }
      // {
      //   path: '/three2',
      //   name: 'three2',
      //   component: () => import('@/views/three/index2'),
      //   meta: {
      //     title: 'three2',
      //   }
      // }
    ]
  },
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
    path: "/canvas",
    component: Layout,
    meta: { title: 'canvasDemo' },
    children: [
      {
        path: '/canvas',
        name: 'canvas',
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
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
