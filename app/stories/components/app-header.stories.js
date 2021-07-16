import AppHeader from '~/components/AppHeader'

export default {
  title: 'Components/App Header',
  component: AppHeader
}

export const base = () => ({
  components: {
    AppHeader
  },

  template: `
    <app-header />
  `
})
