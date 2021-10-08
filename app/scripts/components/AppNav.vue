<template>
  <nav class="app-nav">
    <template v-for="item in items">
      <div
        :key="item.title"
        class="app-nav__item-container"
        @mouseenter="itemHasChildren(item) && handleItemMouseEnter($event)"
        @mouseleave="itemHasChildren(item) && handleItemMouseLeave($event)"
      >
        <component
          :is="item.link ? 'nuxt-link' : 'span'"
          :to="item.link"
          class="app-nav__item body-1"
          :class="getItemClasses(item)"
        >
          {{ item.title }}
        </component>

        <button
          v-if="itemHasChildren(item)"
          class="app-nav__mega-nav-toggle"
          @click="itemHasChildren(item) && handleMegaNavToggle($event)"
        >
          <icon-caret-down />

          <span class="visually-hidden">
            {{
              $tc('header.navigation.megaNavToggle', 1, { title: item.title })
            }}
          </span>
        </button>

        <mega-nav
          v-if="itemHasChildren(item)"
          :banner="item.promotionalBanner"
          :links="item.menuItems"
          :columns="item.columns"
          :secondary-columns="item.additionalColumns"
        />
      </div>
    </template>
  </nav>
</template>

<script>
import MegaNav from '~/components/MegaNav'

import IconCaretDown from '@/assets/icons/directional-caret-down.svg?inline'

export default {
  components: {
    IconCaretDown,
    MegaNav
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectors: {
        megaNav: '.mega-nav'
      },

      classes: {
        transitioning: 'is-transitioning',
        active: 'is-active'
      }
    }
  },

  methods: {
    /**
     * Returns the dynamic classes for a nav item.
     *
     * @param {object} item -The navigation item.
     * @returns {object} - The classes.
     */
    getItemClasses(item) {
      return {
        'app-nav__item--highlight': item.highlight,
        'app-nav__item--has-children': this.itemHasChildren(item)
      }
    },

    /**
     * Returns if the item has a mega-nav/children.
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
    },

    /**
     * Handles the item mouse enter event.
     * - Finds a mega-nav.
     * - Adds a transition class, followed by an active class.
     *
     * @param {object} event - The event object.
     */
    handleItemMouseEnter(event) {
      const target = event.currentTarget
      const megaNav = this.getItemMegaNav(target)

      if (!megaNav) {
        return
      }

      megaNav.classList.add(this.classes.transitioning)

      setTimeout(() => {
        megaNav.classList.add(this.classes.active)
      }, 0)
    },

    /**
     * Handles the item mouse leave event.
     * - Finds a mega-nav.
     * - Removes the active class, then removes the transition class.
     *
     * @param {object} event - The event object.
     */
    handleItemMouseLeave(event) {
      const target = event.currentTarget
      const megaNav = this.getItemMegaNav(target)

      if (!megaNav) {
        return
      }

      megaNav.addEventListener(
        'transitionend',
        () => {
          if (!megaNav.classList.contains(this.classes.active)) {
            megaNav.classList.remove(this.classes.transitioning)
          }
        },
        { once: true }
      )

      megaNav.classList.remove(this.classes.active)
    },

    /**
     * Handles the toggle event for a mega-nav.
     * - If the closest mega-nav is already active, close it.
     * - If the closest mega-nav is not active, open it.
     *
     * @param {object} event - The event object.
     */
    handleMegaNavToggle(event) {
      const target = event.currentTarget
      const parent = target.parentElement
      const megaNav = parent.querySelector(this.selectors.megaNav)

      if (megaNav.classList.contains(this.classes.active)) {
        this.handleItemMouseLeave(event)
        return
      }

      this.handleItemMouseEnter(event)
    },

    /**
     * Returns the mega-nav for a container element.
     *
     * @param {HTMLElement} container - The container to check.
     * @returns {HTMLElement} - The mega-nav.
     */
    getItemMegaNav(container) {
      return (
        container.querySelector(this.selectors.megaNav) ||
        container.parentElement.querySelector(this.selectors.megaNav)
      )
    }
  }
}
</script>

<style lang="scss">
.app-nav {
  $parent: &;
  display: flex;
  justify-content: center;

  &__item-container {
    align-items: center;
    display: flex;

    .mega-nav {
      display: none;
      pointer-events: none;

      &.is-transitioning {
        @include animation-overlay;
        display: block;
        opacity: 0;
      }

      &.is-active {
        opacity: 1;
        pointer-events: auto;
      }
    }

    &:hover {
      #{$parent}__item {
        &::before {
          opacity: 1;
        }
      }
    }
  }

  &__item {
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    display: block;
    margin: 0;
    padding: $SPACING_M $SPACING_L;
    position: relative;
    /* stylelint-disable-next-line */
    text-decoration: none !important;
    z-index: 0;

    &.body-1 {
      margin: 0;
    }

    &#{&}--highlight {
      color: $COLOR_SALE;
    }

    &::before {
      @include animation-overlay;
      background-color: $COLOR_BACKGROUND_MID;
      content: '';
      display: block;
      height: calc(100% + 1px);
      left: 0;
      opacity: 0;
      position: absolute;
      top: -1px;
      width: 100%;
      z-index: -1;
    }

    &:hover {
      &:not(.app-nav__item--highlight) {
        color: inherit;
      }

      &::before {
        opacity: 1;
      }
    }
  }

  &__mega-nav-toggle {
    @include button-reset;

    &:not(:focus) {
      @include visually-hidden;
    }
  }

  a {
    text-decoration: none;
  }

  @include mq($from: large) {
    &__item {
      margin-right: $SPACING_L;
    }
  }
}
</style>
