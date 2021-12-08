<template>
  <div class="sidebar-menu container">
    <h2 v-if="menuItems.title" class="sidebar-menu__title h5">
      {{ menuItems.title }}
    </h2>

    <ul class="sidebar-menu__list sidebar-menu__list--desktop">
      <li
        v-for="item in menuItems.items"
        :key="item.name"
        class="sidebar-menu__list-item body-2"
      >
        <app-link class="sidebar-menu__link body-1" :to="item.link">
          {{ item.name }}
        </app-link>
      </li>
    </ul>

    <select
      v-if="menuItems.items"
      class="sidebar-menu__list sidebar-menu__list--mobile"
      @change="handlePageChange($event)"
    >
      <option
        v-for="item in menuItems.items"
        :key="item.name"
        :value="item.link"
        :selected="currentItem.name == item.name"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import AppLink from '~/components/AppLink'

export default {
  components: {
    AppLink
  },

  props: {
    menuItems: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    /**
     * Returns the linklist item that matches the current page
     * @returns {object} - The current page
     */
    currentItem() {
      const currentPathname = this.$route.path
      const matchingItem = this.menuItems.items.find(
        (item) => item.link == currentPathname
      )
      return matchingItem || ''
    }
  },

  methods: {
    /**
     * Sends customers to selected page in sidebar menu dropdown on mobile
     * @param {object} event - The event objects.
     */
    handlePageChange(event) {
      const selectedPath = event.target.value
      if (selectedPath === '' || selectedPath == this.currentItem?.link) {
        return
      }
      window.location.href = selectedPath
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  height: 100%;
  padding-bottom: $SPACING_XL;
  padding-top: $SPACING_2XS + $SPACING_3XS;

  &__title {
    margin: ($SPACING_L + $SPACING_3XS) 0;
  }

  &__list {
    @include list-reset;

    li {
      margin: $SPACING_2XS 0;
    }

    &#{&}--desktop {
      display: none;
    }
    &#{&}--mobile {
      height: 48px;
      margin-top: ($SPACING_XS + $SPACING_3XS);
      padding: 0 $SPACING_M;
    }
  }

  &__link.body-1 {
    color: $COLOR_TEXT_PRIMARY;
    text-decoration: none;
  }

  @include mq($until: large) {
    &__title {
      font-family: $FONT_DISPLAY;
      font-size: ms(3);
      font-weight: $WEIGHT_BOOK;
      text-transform: none;
    }
  }

  @include mq($from: large) {
    background: $COLOR_BACKGROUND_MID;
    max-width: 376px;
    padding-bottom: $SPACING_2XL;
    padding-top: $SPACING_2XL;

    &__title {
      margin: $SPACING_L 0;
    }

    &__list {
      &#{&}--mobile {
        display: none;
      }
      &#{&}--desktop {
        display: block;
      }
    }
  }
}
</style>
