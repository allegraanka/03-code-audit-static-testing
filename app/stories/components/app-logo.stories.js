import AppLogo from '~/components/AppLogo'

export default {
  title: 'Components/App Logo'
}

export const base = () => ({
  components: {
    AppLogo
  },

  template: `
    <app-logo />
  `
})