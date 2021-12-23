<template>
  <email-popup :settings-newsletter="settingsNewsletter" />
</template>

<script>
/**
 * @typedef {object} settingsNewsletter
 * @property {object} [image] - image object
 * @property {string} [image.url] - image url
 * @property {string} [image.altText] - image alt text
 * @property {string} [signUpMessage] - signup message
 * @property {string} [successMessage] - success message
 */

export default {
  components: {
    EmailPopup: () => import('~/components/EmailPopup')
  },

  data() {
    return {
      /** @type {settingsNewsletter} */
      settingsNewsletter: {
        image: {
          url: '/images/woman-sitting.jpg',
          altText: this.$t('newsletterSignup.defaults.imageAltText')
        },
        signUpMessage: this.$t('newsletterSignup.defaults.signUpMessage'),
        successMessage: this.$t('newsletterSignup.defaults.successMessage')
      }
    }
  },

  created() {
    /** Parse settings global to create newsletter settings prop */
    if (this.$settings?.newsletter) {
      const settingsNewsletter = this.$settings.newsletter
      this.settingsNewsletter = {
        image: {
          url:
            settingsNewsletter?.image?.asset?.url ??
            this.settingsNewsletter.image.url,
          altText:
            settingsNewsletter?.image?.altText ??
            this.settingsNewsletter.image.altText
        },
        signUpMessage:
          settingsNewsletter?.signUpMessage ??
          this.settingsNewsletter.signUpMessage,
        successMessage:
          settingsNewsletter?.successMessage ??
          this.settingsNewsletter.successMessage
      }
    }
  }
}
</script>
