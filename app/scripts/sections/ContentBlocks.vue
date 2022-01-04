<template>
  <section class="container">
    <div class="content-blocks">
      <div v-if="contentBlocks.length > 0" class="content-blocks__blocks">
        <div
          v-for="item in contentBlocks"
          :key="item.key"
          class="content-blocks__block"
        >
          <div class="content-blocks__block-inner">
            <component
              :is="`icon-${item.icon}`"
              v-if="item.icon"
              class="content-blocks__block-icon"
            />

            <rich-content
              v-if="item.text"
              class="content-blocks__block-text body-2"
              :content="item.text"
            />
          </div>
        </div>
      </div>

      <div v-if="links" class="content-blocks__sidebar">
        <h2 v-if="title" class="content-blocks__title h3">{{ title }}</h2>

        <nav class="content-blocks__links">
          <nuxt-link
            v-for="item in links"
            :key="item._key"
            class="content-blocks__link body-1"
            :to="item.url"
          >
            {{ item.label }}
          </nuxt-link>
        </nav>

        <select
          ref="select"
          class="content-blocks__select"
          @change="handleSelectChange"
        >
          <option v-for="item in links" :key="item._key" :value="item.url">
            {{ item.label }}
          </option>
        </select>
      </div>
    </div>
  </section>
</template>

<script>
import RichContent from '~/components/RichContent'

import IconMiscEmail from '@/assets/icons/misc-email.svg?inline'
import IconMiscFax from '@/assets/icons/misc-fax.svg?inline'
import IconMiscHeart from '@/assets/icons/misc-heart.svg?inline'
import IconMiscPhone from '@/assets/icons/misc-phone.svg?inline'
import IconMiscPin from '@/assets/icons/misc-pin.svg?inline'

export default {
  components: {
    RichContent,
    IconMiscEmail,
    IconMiscFax,
    IconMiscHeart,
    IconMiscPhone,
    IconMiscPin
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    links: {
      type: Array,
      default: () => []
    },

    contentBlocks: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    /**
     * Handles the sidebar select event.
     */
    handleSelectChange() {
      if (this.$refs.select) {
        this.$router.push(this.$refs.select.value)
      }
    }
  }
}
</script>

<style lang="scss">
.content-blocks {
  &__links {
    display: none;
  }

  &__sidebar {
    margin-top: $SPACING_XL;
  }

  @include mq($until: large) {
    &__block {
      position: relative;

      &::after {
        border-bottom: 1px solid $COLOR_BORDER_LIGHT;
        bottom: 0;
        content: '';
        height: 1px;
        left: -$SPACING_M;
        position: absolute;
        right: -$SPACING_M;
      }

      &:not(:last-child) {
        margin-bottom: $SPACING_L;
      }
    }

    &__block-inner {
      display: grid;
      grid-column-gap: $SPACING_M;
      grid-template-columns: 24px 1fr;
    }

    &__block-text {
      &.body-2:last-child {
        margin-bottom: $SPACING_L;
      }
    }
  }

  @include mq($from: large) {
    display: grid;
    grid-column-gap: $LAYOUT_M;
    grid-template-columns: 1fr 2fr;

    &__blocks {
      display: grid;
      grid-auto-rows: 1fr;
      grid-column: 2 / 3;
      grid-gap: $SPACING_M;
      grid-row: 1 / 2;
      grid-template-columns: repeat(2, 1fr);
    }

    &__block {
      align-items: center;
      border: 1px solid $COLOR_BORDER_LIGHT;
      display: flex;
      justify-content: center;
      padding: $LAYOUT_M;
    }

    &__block-inner {
      text-align: center;

      .icon {
        fill: $COLOR_PRIMARY;
        margin-bottom: $SPACING_L;
      }
    }

    &__sidebar {
      background-color: $COLOR_BACKGROUND_MID;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      margin-top: 0;
      padding: $LAYOUT_M $SPACING_3XL + $SPACING_XS;
    }

    &__title {
      margin-top: 0;
    }

    &__links {
      display: block;
    }

    &__link {
      color: $COLOR_TEXT_PRIMARY;
      display: block;
      font-weight: $WEIGHT_MEDIUM;
      margin-bottom: $SPACING_S;

      &.body-1 {
        text-decoration: none;
      }
    }

    &__select {
      display: none;
    }
  }
}
</style>
