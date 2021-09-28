<template>
  <drawer class="size-guide-drawer" namespace="size-guide">
    <template #body>
      <h3 class="size-guide-drawer__title">Size Guide</h3>

      <div v-if="content" class="size-guide-drawer__content">
        <block-content class="body-1" :content="content" />
      </div>

      <div
        v-for="guide in guides"
        :key="guide.title"
        class="size-guide-drawer__guide"
      >
        <h3 v-if="guide.title" class="size-guide-drawer__guide-title">
          {{ guide.title }}
        </h3>

        <table class="size-guide-drawer__table">
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
                  Shop Size
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template #footer>
      <div class="size-guide-drawer__footer">
        <app-button
          label="Back to product page"
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
      type: Array,
      default: null
    },

    guides: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      columns: [
        {
          name: 'uk',
          label: 'UK'
        },
        {
          name: 'european',
          label: 'European'
        },
        {
          name: 'us',
          label: 'US'
        },
        {
          name: 'japanese',
          label: 'Japanese'
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
.size-guide-drawer {
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
