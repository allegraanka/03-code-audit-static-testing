<template>
  <email-popup
    v-if="dotdigitalModuleRegistered"
    :settings-newsletter="settingsNewsletter"
  />
</template>

<script>
const getDotdigitalModule = () => import('@/store-modules/dotdigital')

/**
 * @typedef {object} settingsNewsletter
 * @property {object} [image] - image object
 * @property {string} [image.url] - image url
 * @property {string} [image.altText] - image alt text
 * @property {string} [signUpMessage] - signup message
 * @property {string} [successMessage] - success message
 */

export default {
  components: { EmailPopup: () => import('~/components/EmailPopup') },
  data: function () {
    return {
      dotdigitalModuleRegistered: false,
      /** @type {settingsNewsletter} */
      settingsNewsletter: {
        image: {
          url: '',
          altText: ''
        },
        signUpMessage: '',
        successMessage: ''
      }
    }
  },
  created() {
    // Parse settings global to create newsletter settings prop
    if (this.$settings?.newsletter) {
      const settingsNewsletter = this.$settings.newsletter
      this.settingsNewsletter = {
        image: {
          url: settingsNewsletter?.image?.asset?.url ?? '',
          altText: settingsNewsletter?.image?.altText ?? ''
        },
        signUpMessage: settingsNewsletter?.signUpMessage ?? '',
        successMessage: settingsNewsletter?.successMessage ?? ''
      }
    }
  },
  beforeMount() {
    // Lazily mount dotdigital store
    getDotdigitalModule().then((dotdigitalModule) => {
      if (!this.dotdigitalModuleRegistered) {
        this.$store.registerModule('dotdigital', dotdigitalModule.default)
        this.dotdigitalModuleRegistered = true
      }
    })
  },
  beforeDestroy() {
    // Remove dotdigital store once done
    if (this.dotdigitalModuleRegistered) {
      this.$store.unregisterModule('dotdigital')
    }
  }
}
</script>

<style lang="scss">
.emailpopup-modal {
  &__flex {
    display: flex;
    flex-wrap: wrap;
  }

  &__image-block {
    display: none;
    overflow: hidden;
  }

  &__image {
    height: 100%;
    max-width: initial;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }

  &__inner {
    padding: $SPACING_L;
  }

  &__heading {
    color: $COLOR_PRIMARY;
    margin-top: 0;
  }

  &__button {
    width: 100%;
  }

  /**
   * Draw overrides
   */
  &.drawer {
    .drawer__body {
      padding: 0;
      text-align: left;
    }
  }

  /**
   * Media queries.
   */
  @include mq($from: large) {
    &__flex {
      align-items: stretch;
      flex-direction: row-reverse;
      height: 546px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
    }

    &__inner {
      padding: $SPACING_3XL;
    }

    &__image-block {
      display: block;
      width: 50%;
    }
  }
}
</style>
