<template>
  <drawer class="imbox-modal" namespace="imbox-modal" as-modal>
    <h3 v-if="settings && settings.title" class="imbox-modal__title">
      {{ settings.title }}
    </h3>

    <rich-content
      v-if="settings && settings.content"
      :content="settings.content"
      class="imbox-modal__content body-2"
    />
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'
import RichContent from '~/components/RichContent'

export default {
  components: {
    Drawer,
    RichContent
  },

  computed: {
    /**
     * Retruns the modal settings.
     * @returns {object} - The settings object.
     */
    settings() {
      return (
        this.$settings &&
        this.$settings.product &&
        this.$settings.product.itemAddOn &&
        this.$settings.product.itemAddOn.modal
      )
    }
  }
}
</script>

<style lang="scss">
.imbox-modal {
  &__title {
    color: $COLOR_PRIMARY;
    margin-top: 0;
  }

  &__content {
    color: $COLOR_TEXT_SECONDARY;
  }

  iframe {
    max-width: 100%;
    width: 100%;
  }

  @include mq($until: medium) {
    iframe {
      height: 280px;
    }
  }

  @include mq($until: large) {
    &.drawer {
      .drawer__overlay {
        bottom: -5%;
        max-height: 74%;
        max-width: 100%;
        top: unset;
        transform: translateX(-50%);
      }

      &.is-active {
        .drawer__overlay {
          bottom: 0;
          top: unset;
        }
      }
    }
  }

  @include mq($from: large) {
    &__title {
      margin-bottom: ($SPACING_M + $SPACING_2XS);
    }

    iframe {
      margin-top: $SPACING_XS;
    }
  }
}
</style>
