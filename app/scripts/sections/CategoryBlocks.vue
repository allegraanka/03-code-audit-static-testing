<template>
  <section class="category-blocks">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <div class="category-blocks__header">
            <p v-if="subtitle" class="category-blocks__subtitle body-1">
              {{ subtitle }}
            </p>

            <h2 v-if="title" class="category-blocks__title">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="row in rows"
      :key="row._key"
      class="category-blocks__row"
      :class="{
        'category-blocks__row--6up':
          row.blocks && row.blocks.length > 4 && row.blocks.length <= 6,
        'category-blocks__row--4up':
          row.blocks && row.blocks.length > 2 && row.blocks.length <= 4,
        'category-blocks__row--2up': row.blocks && row.blocks.length <= 2
      }"
    >
      <component
        :is="(block.link && 'app-link') || 'div'"
        v-for="block in row.blocks"
        :key="block._key"
        :href="block.link"
        class="category-blocks__block"
      >
        <div class="category-blocks__block-image">
          <responsive-image v-if="block.image" :src="block.image.asset.url" />
        </div>

        <h6 v-if="block.title" class="category-blocks__block-title">
          {{ block.title }}
        </h6>
      </component>
    </div>
  </section>
</template>

<script>
import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppLink,
    ResponsiveImage
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    subtitle: {
      type: String,
      default: ''
    },

    rows: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.category-blocks {
  $parent: &;

  &__header {
    text-align: center;
  }

  &__subtitle,
  &__subtitle.body-1 {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 $SPACING_S;
    text-transform: uppercase;
  }

  &__title {
    margin: 0 0 $SPACING_2XL;
  }

  &__block {
    text-decoration: none;

    &:hover {
      #{$parent}__block-image {
        height: 144px;

        &::before {
          opacity: 0.2;
        }
      }
    }
  }

  &__block-image {
    @include animation-shrink(height);
    background-color: $COLOR_BACKGROUND_LIGHT;
    height: 160px;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::before {
      @include animation-overlay;
      background-color: $COLOR_BACKGROUND_DARK;
      content: '';
      display: block;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 2;
    }

    .responsive-image {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__block-title {
    color: $COLOR_TEXT_PRIMARY;
    margin: $SPACING_S 0;
    text-align: center;
  }

  @include mq($from: large) {
    &__block-image {
      height: 208px;
    }

    &__block-title {
      margin: ($SPACING_M * 0.875) 0;
    }
  }
}
</style>
