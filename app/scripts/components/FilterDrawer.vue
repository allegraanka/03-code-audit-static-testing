<template>
  <drawer class="filter-drawer" namespace="filter-drawer">
    <template #body>
      <h3 class="filter-drawer__title">{{ $t('collection.filterTitle') }}</h3>
      <current-refinements />

      <div v-show="!activeAttribute" class="filter-drawer__attributes">
        <button
          v-for="attribute in attributes"
          :key="attribute.title"
          class="filter-drawer__attribute"
          @click="activeAttribute = attribute.name"
        >
          {{ attribute.title }}
          <icon-caret-right />
        </button>
      </div>

      <filter-drawer-attribute
        v-for="attribute in attributes"
        :key="attribute.label"
        class="filter-drawer__overlay"
        :class="{
          'filter-drawer__overlay--active': activeAttribute === attribute.name
        }"
        :title="attribute.title"
        :type="attribute.type"
        :name="attribute.name"
        @close="activeAttribute = false"
      />
    </template>

    <template #footer>
      <ais-stats>
        <template #default="{ nbHits }">
          <app-button block @click.native.prevent="handleViewResults">
            {{ $tc('collection.viewResults', 1, { count: nbHits }) }}
          </app-button>
        </template>
      </ais-stats>
    </template>
  </drawer>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import CurrentRefinements from '~/components/algolia/CurrentRefinements'
import Drawer from '~/components/Drawer'
import FilterDrawerAttribute from '~/components/FilterDrawerAttribute'

import timings from '~/helpers/timings'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

export default {
  components: {
    AppButton,
    CurrentRefinements,
    Drawer,
    IconCaretRight,
    FilterDrawerAttribute
  },

  props: {
    attributes: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeAttribute: false
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer'
    }),

    /**
     * Handles the view results click event.
     * - Closes the drawer and resets the state.
     */
    handleViewResults() {
      this.closeDrawer('filter-drawer')

      if (this.activeAttribute) {
        setTimeout(() => {
          this.activeAttribute = false
        }, timings.long)
      }
    }
  }
}
</script>

<style lang="scss">
.filter-drawer {
  &__title {
    margin: 0 0 $SPACING_S;
  }

  &__attributes {
    margin: $SPACING_M -#{$SPACING_M} 0;
  }

  &__attribute {
    @include button-reset;
    align-items: center;
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    display: flex;
    padding: ($SPACING_M + $SPACING_2XS) $SPACING_M;
    width: 100%;

    .icon {
      margin-left: auto;
      margin-right: $SPACING_XS;
    }

    &:last-child {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__overlay {
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;

    &#{&}--active {
      display: block;
    }
  }

  .drawer__body {
    position: relative;
  }

  .drawer__footer {
    padding: $SPACING_M;
  }
}
</style>
