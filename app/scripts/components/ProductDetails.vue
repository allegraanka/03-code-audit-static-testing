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
        <highlight-list :items="highlights" />
      </div>

      <template v-if="content">
        <rich-content class="body-1" :content="content" />
      </template>

      <template v-if="specifications && specifications.length > 0">
        <h3 class="product-details__title">
          {{ $t('product.details') }}
        </h3>

        <table class="product-details__specifications">
          <tbody>
            <tr v-for="item in specifications" :key="item.label">
              <td class="subtitle-1">{{ item.label }}</td>
              <td class="body-1">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <slot />
    </template>

    <template #footer>
      <div class="product-details__footer">
        <app-button
          :label="$t('product.back')"
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
import RichContent from '~/components/RichContent'
import Drawer from '~/components/Drawer'
import HighlightList from '~/components/HighlightList'

export default {
  components: {
    AppButton,
    RichContent,
    Drawer,
    HighlightList
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    namespace: {
      type: String,
      required: true
    },

    content: {
      type: [Array, String],
      default: ''
    },

    highlights: {
      type: Array,
      default: () => []
    },

    specifications: {
      type: Array,
      default: () => []
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
    padding: ($SPACING_M * 0.625) 0;
  }

  &__specifications {
    td {
      border: 0;
      padding: 14px 16px;

      &:first-of-type {
        color: $COLOR_TEXT_PRIMARY;
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

    &__specifications {
      .subtitle-1,
      .body-1 {
        font-size: ms(-1);
      }
    }
  }
}
</style>
