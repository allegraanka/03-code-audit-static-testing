<template>
  <div class="mega-nav">
    <div class="mega-nav__container">
      <div class="container">
        <div class="row">
          <div class="col xs12">
            <div class="mega-nav__columns">
              <div
                v-for="(column, index) in columns"
                :key="index"
                class="mega-nav__column"
              >
                <p class="mega-nav__column-title label">{{ column.name }}</p>

                <div
                  v-if="column.menuItems && column.menuItems.length > 0"
                  class="mega-nav__column-list"
                >
                  <component
                    :is="item.link ? 'nuxt-link' : 'span'"
                    v-for="(item, itemIndex) in column.menuItems"
                    :key="`column-${index}-${itemIndex}`"
                    :to="item.link"
                    class="mega-nav__column-link body-2"
                  >
                    {{ item.name }}
                  </component>
                </div>
              </div>
            </div>

            <skinny-banner
              v-if="banner"
              class="mega-nav__banner"
              :title="banner.title"
              :subtitle="banner.subtitle"
              :image-source="banner.image.asset.url"
              :button="banner.button"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkinnyBanner from '~/components/SkinnyBanner'

export default {
  components: {
    SkinnyBanner
  },

  props: {
    banner: {
      type: Object,
      default: null
    },

    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.mega-nav {
  width: 100%;

  &__container {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    width: 100%;
  }

  &__columns {
    display: grid;
    gap: $SPACING_L;
    grid-template-columns: repeat(6, 1fr);
    padding: $SPACING_2XL 0;
  }

  &__column-title {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: $SPACING_XS;
  }

  &__column-list {
    display: flex;
    flex-direction: column;
    gap: $SPACING_XS;
  }

  &__column-link {
    display: block;
    margin: 0;
    text-decoration: none;

    &.body-2 {
      margin: inherit;
      text-decoration: inherit;
    }
  }

  &__banner {
    margin-bottom: $SPACING_M;
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
