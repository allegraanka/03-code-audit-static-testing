<template>
  <div
    v-if="items.length > 0"
    class="menu-drawer-item"
    :class="{
      'menu-drawer-item--top': position === 'top',
      'is-active': active
    }"
  >
    <menu-drawer-nav :id="id" :title="navTitle" v-on="$listeners" />
    <menu-drawer-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div v-for="item in items" :key="item.title">
      <span v-if="itemHasChildren(item)" :class="getItemClasses(item)">
        <span
          class="menu-drawer-item__link"
          @click="$emit('menu-drawer-open', item._key)"
        >
          {{ item.title }}

          <icon-caret-right />
        </span>

        <slot :item="item" />
      </span>

      <nuxt-link
        v-else
        class="menu-drawer-item__link"
        :class="getItemClasses(item)"
        :to="item.link"
      >
        {{ item.title }}
      </nuxt-link>

      <button v-if="itemHasChildren(item)" class="visually-hidden">
        <span v-if="item.title">
          {{ $tc('header.navigation.megaNavToggle', 1, { title: item.title }) }}
        </span>
      </button>
    </div>

    <div
      v-if="additionalItems.length > 0"
      class="menu-drawer-item__additional-links"
    >
      <nuxt-link
        v-for="item in additionalItems"
        :id="item._key"
        :key="item.title"
        class="menu-drawer-item__additional-link"
        :class="getItemClasses(item)"
        :to="item.link"
      >
        <component :is="`icon-${item.icon}`" v-if="item.icon" />

        {{ item.title }}
      </nuxt-link>
    </div>

    <skinny-banner
      v-if="banner && banner.image && banner.image.asset"
      layout="vertical"
      :title="banner.title"
      :subtitle="banner.subtitle"
      :image-source="banner.image.asset.url"
      :button-label="banner.buttonLabel"
      :button-link="banner.buttonLink"
    />
  </div>
</template>

<script>
import MenuDrawerBreadcrumbs from '~/components/MenuDrawerBreadcrumbs'
import MenuDrawerNav from '~/components/MenuDrawerNav'
import SkinnyBanner from '~/components/SkinnyBanner'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'
import IconMiscHeart from '@/assets/icons/misc-heart.svg?inline'
import IconMiscPhone from '@/assets/icons/misc-phone.svg?inline'
import IconMiscPin from '@/assets/icons/misc-pin.svg?inline'

export default {
  components: {
    IconCaretRight,
    IconMiscHeart,
    IconMiscPhone,
    IconMiscPin,
    MenuDrawerBreadcrumbs,
    MenuDrawerNav,
    SkinnyBanner
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    additionalItems: {
      type: Array,
      default: () => []
    },

    breadcrumbs: {
      type: Array,
      default: () => []
    },

    banner: {
      type: Object,
      default: null
    },

    active: {
      type: Boolean,
      default: true
    },

    navTitle: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: ''
    },

    position: {
      type: String,
      default: ''
    }
  },

  methods: {
    /**
     * Returns the dynamic classes for a menu drawer item.
     *
     * @param {object} item -The menu drawer item.
     * @returns {object} - The classes.
     */
    getItemClasses(item) {
      return {
        'is-highlighted': item.highlight
      }
    },

    /**
     * Returns if the item has children.
     *
     * @param {object} item - The menu item.
     * @returns {boolean} - If the item has children.
     */
    itemHasChildren(item) {
      return (
        (item.menuItems && item.menuItems.length > 0) ||
        (item.columns && item.columns.length > 0) ||
        (item.additionalColumns && item.additionalColumns.length > 0) ||
        item.promotionalBanner
      )
    }
  }
}
</script>

<style lang="scss">
.menu-drawer-item {
  $parent: &;
  background: $COLOR_BACKGROUND_WHITE;
  display: none;
  left: 0;
  min-height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  &__link {
    align-items: center;
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    display: flex;
    font-size: ms(0);
    justify-content: space-between;
    margin: 0;
    padding: $SPACING_M + $SPACING_2XS $SPACING_M;
    text-decoration: none;

    &:hover {
      color: $COLOR_LINK_HOVER;
    }

    &.is-highlighted {
      color: $COLOR_SALE;
    }
  }

  &__additional-link {
    align-items: center;
    color: $COLOR_TEXT_PRIMARY;
    display: flex;
    font-size: ms(0);
    padding: $SPACING_M $SPACING_M 0 $SPACING_M;
    text-decoration: none;

    &:last-child {
      margin-bottom: $SPACING_M;
    }

    &:hover {
      color: $COLOR_LINK_HOVER;
    }

    &.is-highlighted {
      color: $COLOR_SALE;
    }

    .icon {
      fill: $COLOR_PRIMARY;
      height: 20px;
      margin-right: $SPACING_S;
      width: 20px;
    }
  }

  &.is-active {
    display: block;
  }

  &#{&}--highlight {
    color: $COLOR_SALE;
  }

  &#{&}--top {
    > #{$parent}__additional-links #{$parent}__additional-link {
      font-size: ms(-1);
      padding: $SPACING_L $SPACING_M 0 $SPACING_M;

      &:last-child {
        margin-bottom: $SPACING_L;
      }
    }
  }
}
</style>
