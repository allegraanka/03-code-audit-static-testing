<template>
  <div class="mega-nav">
    <div class="mega-nav__container">
      <div class="mega-nav__main">
        <div class="container">
          <div class="row">
            <div class="col xs12">
              <div class="mega-nav__columns">
                <div v-if="links.length > 0" class="mega-nav__links">
                  <component
                    :is="item.link ? 'nuxt-link' : 'span'"
                    v-for="(item, index) in links"
                    :key="`link-${index}`"
                    :to="item.link"
                    class="mega-nav__link body-1"
                    :class="getLinkClasses(item)"
                  >
                    {{ item.title }}
                  </component>
                </div>

                <mega-nav-column
                  v-for="(column, index) in columns"
                  :key="`column-${index}`"
                  :title="column.title"
                  :items="column.menuItems"
                  :grid="column.displayAsGrid"
                />
              </div>

              <skinny-banner
                v-if="banner && banner.image && banner.image.asset"
                class="mega-nav__banner"
                :title="banner.title"
                :subtitle="banner.subtitle"
                :image-source="banner.image.asset.url"
                :button-label="banner.buttonLabel"
                :button-link="banner.buttonLink"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasFooter" class="mega-nav__footer">
        <div class="container">
          <div class="row no-margin-bottom">
            <div class="col xs12">
              <div class="mega-nav__columns">
                <mega-nav-column
                  v-for="(column, index) in secondaryColumns"
                  :key="`secondary-column-${index}`"
                  :title="column.title"
                  :items="column.menuItems"
                  :grid="column.displayAsGrid"
                  wide
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkinnyBanner from '~/components/SkinnyBanner'
import MegaNavColumn from '~/components/MegaNavColumn'

export default {
  components: {
    SkinnyBanner,
    MegaNavColumn
  },

  props: {
    banner: {
      type: Object,
      default: null
    },

    links: {
      type: Array,
      default: () => []
    },

    columns: {
      type: Array,
      default: () => []
    },

    secondaryColumns: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    /**
     * Returns true if the mega nav has a footer.
     * @returns {boolean} - The footer state.
     */
    hasFooter() {
      return this.secondaryColumns.length > 0
    }
  },

  methods: {
    /**
     * Returns the dynamic classes for the link.
     *
     * @param {object} link - The link object.
     * @returns {object} - The classes.
     */
    getLinkClasses(link) {
      return {
        'mega-nav__link--highlighted': link.highlight
      }
    }
  }
}
</script>

<style lang="scss">
.mega-nav {
  $parent: &;
  width: 100%;

  &__container {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    max-height: calc(100vh - var(--header-offset));
    overflow-y: auto;
    width: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__link {
    display: block;
    text-decoration: none;

    &.body-1 {
      margin: 0 0 $SPACING_XS 0;
      text-decoration: inherit;
    }

    &#{&}--highlighted {
      color: $COLOR_SALE;
    }
  }

  &__columns {
    display: grid;
    gap: $LAYOUT_L;
    grid-template-columns: repeat(6, 1fr);
    padding: $SPACING_2XL 0;
  }

  &__banner {
    margin-bottom: $SPACING_M;
  }

  &__footer {
    background-color: $COLOR_SECONDARY;

    .mega-nav-column__title {
      color: $COLOR_TEXT_PRIMARY;
      margin-bottom: $SPACING_S;
    }
  }

  .mega-nav-column {
    &--grid {
      grid-column: span 2;
    }
  }

  &::before {
    background-color: rgba($COLOR_BACKGROUND_DARK, 0.4);
    content: '';
    display: block;
    height: 100vh;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
