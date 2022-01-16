<template>
  <div class="content" v-html="$sanitize(html)" />
</template>

<script>
export default {
  name: 'InfoModalContent',
  props: {
    html: {
      type: String,
      required: true,
    },
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
  }

  p,
  ul {
    margin-bottom: 20px;
  }

  p,
  li {
    line-height: 24px;
    letter-spacing: 0.3px;
  }

  li {
    margin-bottom: 5px;
  }
}
</style>
