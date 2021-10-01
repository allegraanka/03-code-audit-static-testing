<template>
  <div class="share-links">
    <p class="share-links__label label">{{ $t('share.title') }}</p>

    <a
      v-for="link in links"
      :key="link.name"
      class="share-links__link"
      :href="link.to"
      target="_blank"
    >
      <component :is="link.icon" v-if="link.icon" />
      <span class="caption">{{ link.label }}</span>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    /**
     * Returns the encoded path for sharing.
     * @returns {string} - The encoded path.
     */
    encodedUrl() {
      let path = `https://pavers.co.uk${this.$nuxt.$route.fullPath}`

      if (process.client) {
        path = window.location.href
      }

      return encodeURIComponent(path)
    },

    /**
     * Returns the array of links with icon.
     * @returns {Array} - The links.
     */
    links() {
      return [
        {
          name: 'facebook',
          label: this.$t('share.facebook'),
          icon: () => import('@/assets/icons/social-facebook.svg?inline'),
          to: `https://www.facebook.com/sharer/sharer.php?u=${this.encodedUrl}`
        },
        {
          name: 'twitter',
          label: this.$t('share.twitter'),
          icon: () => import('@/assets/icons/social-twitter.svg?inline'),
          to: `https://twitter.com/intent/tweet?url=${this.encodedUrl}`
        },
        {
          name: 'pinterest',
          label: this.$t('share.pinterest'),
          icon: () => import('@/assets/icons/social-pinterest.svg?inline'),
          to: `http://pinterest.com/pin/create/button/?url=${this.encodedUrl}`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.share-links {
  align-items: center;
  display: flex;
  gap: $SPACING_XS;

  &__label {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 $SPACING_2XS 0 0;
  }

  &__link {
    align-items: center;
    background-color: $COLOR_BACKGROUND_MID;
    color: $COLOR_PRIMARY;
    display: inline-flex;
    padding: $SPACING_2XS 0.625rem;
    text-decoration: none;

    .icon {
      height: 14px;
      margin-right: $SPACING_2XS;
      width: 14px;
    }
  }
}
</style>
