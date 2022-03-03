<template>
  <div class="content" v-html="sanitizeHtml(html)" />
</template>

<script>
import sanitizeHtml from 'sanitize-html'

export default {
  name: 'InfoModalContent',
  props: {
    html: {
      type: String,
      default: '',
    },
  },
  methods: {
    sanitizeHtml,
  },
}
</script>

<style lang="scss">
.content {
  color: #c8c9cc;
  word-break: break-word;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 15px;
    font-weight: 600;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 18px;
  }

  p,
  ul {
    margin-bottom: 20px;
  }

  p,
  li {
    line-height: 24px;
    letter-spacing: 0.3px;
    font-size: 16px;
  }

  li {
    margin-bottom: 5px;
  }
}
</style>
