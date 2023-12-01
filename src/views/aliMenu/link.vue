<template>
  <div v-bind="linkProps(to)" is="component">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink(routePath) {
      return this.isExternal(routePath);
    },
    linkProps(url) {
      if (this.isExternalLink(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      }
      return {
        is: "router-link",
        to: url
      };
    },

    isExternal(path) {
      // return /^(https?:|mailto:|tel:)/.test(path) || path.includes('/screen')
      return /^(https?:|mailto:|tel:)/.test(path)
    },

  }
};
</script>
