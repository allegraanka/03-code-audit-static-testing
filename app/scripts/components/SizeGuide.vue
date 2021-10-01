<template>
  <drawer class="size-guide" namespace="size-guide" :force-open="forceOpen">
    <template #body>
      <h3 class="size-guide__title">{{ $t('product.sizeGuide.title') }}</h3>

      <div v-if="content" class="size-guide__content">
        <block-content class="body-1" :content="content" />
      </div>

      <div v-for="guide in guides" :key="guide.title" class="size-guide__guide">
        <h3 v-if="guide.title" class="size-guide__guide-title">
          {{ guide.title }}
        </h3>

        <table class="size-guide__table">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.name">
                {{ column.label }}
              </th>

              <th />
            </tr>
          </thead>

          <tbody>
            <tr v-for="size in guide.sizes" :key="size.uk">
              <td v-for="column in columns" :key="column.name">
                {{ size[column.name] }}
              </td>

              <td>
                <nuxt-link v-if="size.link" :to="size.link">
                  {{ $t('product.sizeGuide.shopSize') }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template #footer>
      <div class="size-guide__footer">
        <app-button
          :label="$t('product.sizeGuide.back')"
          block
          button-type="button"
          @click.native="closeDrawer('size-guide')"
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

export default {
  components: {
    AppButton,
    BlockContent,
    Drawer
  },

  props: {
    content: {
      type: [Array, String],
      default: null
    },

    guides: {
      type: Array,
      default: () => []
    },

    forceOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      columns: [
        {
          name: 'uk',
          label: this.$t('product.sizeGuide.uk')
        },
        {
          name: 'european',
          label: this.$t('product.sizeGuide.european')
        },
        {
          name: 'us',
          label: this.$t('product.sizeGuide.us')
        },
        {
          name: 'japanese',
          label: this.$t('product.sizeGuide.japanese')
        }
      ]
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
.size-guide {
  &__guide-title {
    margin-bottom: $SPACING_L;
  }

  &__content {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_2XL;
  }

  &__guide {
    &:not(:last-child) {
      margin-bottom: $SPACING_2XL;
    }
  }

  &__table {
    font-size: ms(-1);
    table-layout: fixed;

    td,
    th {
      border: 0;
      padding: 14px 16px;
    }

    th {
      @extend %subtitle-1;
      color: $COLOR_TEXT_PRIMARY;
      font-size: ms(-1);
      font-weight: $WEIGHT_MEDIUM;
    }

    thead {
      tr {
        background-color: $COLOR_BACKGROUND_LIGHT;
      }
    }

    tbody {
      tr {
        background-color: $COLOR_BACKGROUND_LIGHT;

        &:nth-child(odd) {
          background-color: $COLOR_BACKGROUND_WHITE;
        }
      }
    }
  }

  &__footer {
    padding: $SPACING_L $SPACING_M;
  }

  @include mq($from: large) {
    &__footer {
      padding: $SPACING_3XL;
    }
  }
}
</style>
