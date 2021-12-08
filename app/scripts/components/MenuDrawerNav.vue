<template>
  <div class="menu-drawer-nav">
    <div
      v-if="title"
      class="menu-drawer-nav__inner"
      @click="$emit('menu-drawer-close', id)"
    >
      <div class="menu-drawer-nav__item">
        <icon-arrow-backward />

        <span>
          {{ $tc('drawer.back', 1, { title: title }) }}
        </span>
      </div>
    </div>

    <div v-else class="menu-drawer-nav__inner">
      <nuxt-link
        class="menu-drawer-nav__item"
        :to="isLoggedIn ? '/account' : '/account/login'"
      >
        <icon-account />

        <span v-if="isLoggedIn" class="body-1">
          {{ $t('header.account.loggedIn') }}
        </span>

        <span v-else class="body-1">
          {{ $t('header.account.loggedOut') }}
        </span>
      </nuxt-link>

      <nuxt-link class="menu-drawer-nav__item" :to="'/'">
        <icon-heart />

        <span class="body-1">
          {{ $t('header.account.wishlist') }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import IconAccount from '@/assets/icons/misc-account.svg?inline'
import IconArrowBackward from '@/assets/icons/directional-arrow-backward.svg?inline'
import IconHeart from '@/assets/icons/misc-heart.svg?inline'

export default {
  components: {
    IconAccount,
    IconArrowBackward,
    IconHeart
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      isLoggedIn: ({ customer }) => customer.loggedIn
    })
  }
}
</script>

<style lang="scss">
.menu-drawer-nav {
  border-bottom: 1px solid $COLOR_BORDER_LIGHT;

  &__inner {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: $SPACING_L $SPACING_M;
  }

  &__item {
    align-items: center;
    display: flex;
    text-decoration: none;

    .icon {
      margin-right: $SPACING_S;
    }
  }
}
</style>
