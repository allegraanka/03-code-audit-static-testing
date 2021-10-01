<template>
  <drawer
    class="product-details"
    :namespace="namespace"
    :force-open="forceOpen"
  >
    <template #body>
      <h3 v-if="title" class="product-details__title">{{ title }}</h3>

      <div
        v-if="highlights && highlights.length > 0"
        class="product-details__highlights"
      >
        <div
          v-for="(highlight, index) in highlights"
          :key="index"
          class="product-details__highlight"
        >
          <span class="product-details__highlight-icon">
            <icon-tick />
          </span>

          <block-content class="body-1" :content="highlight.content" />
        </div>
      </div>

      <template v-if="content">
        <block-content class="body-1" :content="content" />
      </template>

      <template v-if="specifications && specifications.length > 0">
        <h3 class="product-details__title">Product Details</h3>

        <table class="product-details__specifications">
          <tbody>
            <tr v-for="item in specifications" :key="item.label">
              <td>{{ item.label }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <slot />
    </template>

    <template #footer>
      <div class="product-details__footer">
        <app-button
          label="Back to product page"
          block
          @click.native="closeDrawer(namespace)"
        />
      </div>
    </template>
  </drawer>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import BlockContent from '~/components/BlockContent'
import Drawer from '~/components/Drawer'

import IconTick from '@/assets/icons/misc-tick.svg?inline'

export default {
  components: {
    AppButton,
    BlockContent,
    IconTick,
    Drawer
  },

  props: {
    title: {
      type: String,
      default: null
    },

    namespace: {
      type: String,
      required: true
    },

    content: {
      type: [Array, String],
      default: null
    },

    highlights: {
      type: Array,
      default: null
    },

    specifications: {
      type: Array,
      default: null
    },

    forceOpen: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer'
    })
  }
}
</script>

<style lang="scss">
.product-details {
  color: $COLOR_TEXT_SECONDARY;

  &__title {
    color: $COLOR_TEXT_PRIMARY;
    margin-bottom: $SPACING_L;

    &:not(:first-of-type) {
      margin-top: $SPACING_2XL;
    }
  }

  &__footer {
    padding: $SPACING_L $SPACING_M;
  }

  &__highlights {
    display: block;
    padding: 0.625rem 0;
  }

  &__highlight {
    align-items: center;
    display: flex;
    margin-bottom: $SPACING_M;
  }

  &__highlight-icon {
    align-items: center;
    background-color: $COLOR_SECONDARY;
    border-radius: 50%;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-right: $SPACING_M;
    width: 24px;

    .icon {
      height: 11.25px;
      width: 11.25px;
    }
  }

  &__specifications {
    td {
      border: 0;
      padding: 14px 16px;

      &:first-of-type {
        color: $COLOR_TEXT_PRIMARY;
        font-weight: $WEIGHT_MEDIUM;
      }
    }

    tr {
      background-color: $COLOR_BACKGROUND_LIGHT;

      &:nth-child(even) {
        background-color: $COLOR_BACKGROUND_WHITE;
      }
    }
  }

  @include mq($from: large) {
    &__footer {
      padding: $SPACING_3XL;
    }
  }
}
</style>
