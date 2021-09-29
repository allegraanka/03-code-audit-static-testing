<template>
  <component
    :is="element"
    :to="link"
    class="announcement-banner-link subtitle-2"
  >
    <component
      :is="iconComponent"
      v-if="iconComponent"
      class="announcement-banner-link__icon"
    />

    {{ title }}
  </component>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    /**
     * Returns the dynamic element tag for a link.
     * @returns {string} - The element tag.
     */
    element() {
      return this.link ? 'nuxt-link' : 'span'
    },

    /**
     * Returns the link component.
     * @returns {null|Function} - The component.
     */
    iconComponent() {
      return this.icon
        ? () => import(`@/assets/icons/${this.icon}.svg?inline`)
        : null
    }
  }
}
</script>

<style lang="scss">
.announcement-banner-link {
  @include animation-text-link;
  @include animation-text-link(opacity);
  align-items: center;
  color: inherit;
  display: flex;
  text-decoration: none;
  white-space: nowrap;

  .icon {
    height: 20px;
    margin-right: $SPACING_XS;
    width: 20px;
  }

  &:hover {
    color: inherit;
    opacity: 0.8;
  }
}
</style>
