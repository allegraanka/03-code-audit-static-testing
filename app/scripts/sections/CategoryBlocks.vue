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
      <div class="category-blocks__blocks">
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
  overflow: hidden;

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

  &__row {
    &:not(:last-child) {
      margin-bottom: ($SPACING_M + $SPACING_S);
    }

    &#{&}--4up {
      @include container;

      #{$parent}__blocks {
        display: grid;
        grid-column-gap: $SPACING_XS;
        grid-row-gap: ($SPACING_M + $SPACING_2XS);
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &#{&}--2up {
      @include container;

      #{$parent}__blocks {
        display: grid;
        grid-row-gap: ($SPACING_M + $SPACING_2XS);
        grid-template-columns: 1fr;
      }

      #{$parent}__block-image {
        padding-top: 48%;
      }
    }
  }

  &__block {
    text-decoration: none;

    &:hover {
      #{$parent}__block-title {
        transform: translateY(-16px);
      }

      #{$parent}__block-image {
        &::before {
          opacity: 0.2;
        }
      }
    }
  }

  &__block-image {
    background-color: $COLOR_BACKGROUND_LIGHT;
    overflow: hidden;
    padding-top: 100%;
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
      left: 50%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }

  &__block-title {
    @include animation-modal-slide;
    background-color: $COLOR_BACKGROUND_WHITE;
    color: $COLOR_TEXT_PRIMARY;
    margin: 0;
    padding: $SPACING_S 0;
    position: relative;
    text-align: center;
    z-index: 2;
  }

  @include mq($from: large) {
    &__row {
      &:not(:last-child) {
        margin-bottom: $SPACING_XL;
      }

      &#{&}--4up {
        #{$parent}__blocks {
          grid-column-gap: $SPACING_M;
          grid-template-columns: repeat(4, 1fr);
        }

        #{$parent}__block-image {
          padding-top: 100%;
        }
      }

      &#{&}--2up {
        #{$parent}__blocks {
          grid-column-gap: $SPACING_M;
          grid-template-columns: repeat(2, 1fr);
        }

        #{$parent}__block-image {
          padding-top: 46%;
        }
      }
    }

    &__block-title {
      padding: ($SPACING_M * 0.875) 0;
    }
  }
}
</style>
