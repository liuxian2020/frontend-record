<template>
  <div id="app">
    <!-- iii -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  render(h) {
    console.log(h('div', [h('h1', 'title1'), h('h2', 'title2')]), '====hhh')
    return h('div', [h('h1', 'title1'), h('h2', 'title2')])
  }
}
</script>
