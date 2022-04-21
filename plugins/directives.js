import Vue from 'vue'

Vue.directive('fcf', {
  inserted(el) {
    el.innerHTML = el.innerHTML.replace(/(\d+)/g, `<sub>$1</sub>`)
  },
})
