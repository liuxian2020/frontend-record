<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'App',
  render (h) {
    return h('div', [h('h1', 'title1'), h('h2', 'title2')])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (store.getters.frontend_theme) {
        document.documentElement.setAttribute("theme", store.getters.frontend_theme);
      }
    }
  }
}
</script>
