import { h } from 'vue'
import Theme from 'vitepress/theme'
import HeaderBadge from '../components/HeaderBadge.vue'
import ErrorCard from '../components/ErrorCard.vue'
import StatusCode from '../components/StatusCode.vue'
import SuccessResponse from '../components/SuccessResponse.vue'
import './custom.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('HeaderBadge', HeaderBadge)
    app.component('ErrorCard', ErrorCard)
    app.component('StatusCode', StatusCode)
    app.component('SuccessResponse', SuccessResponse)
  }
}
