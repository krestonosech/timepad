import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ru } from 'vuetify/locale'

export const vuetify = createVuetify({
  locale: {
    locale: 'ru',
    messages: { ru }
  },
  components,
  directives
})
