import Vue from 'vue'

import { Tooltip, Dialog, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Tooltip.name, Tooltip)
Vue.component(Dialog.name, Dialog)
Loading.install(Vue)
