<template>
  <div class="footer-menu">
    <div class="container container--main">
      <div class="row">
        <div class="col xs12 l4">
          <h3 class="footer-menu__newsletter-title">
            Sign up to our newsletter
          </h3>
          <p class="footer-menu__newsletter-copy body-2">
            Subscribe to receive regular news and offers from Pavers. You can
            unsubscribe at any time.
          </p>
          <form
            class="footer-menu__newsletter-form"
            @submit.prevent="handleSubmit"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <app-button class="footer-menu__newsletter-button">
              Sign up
            </app-button>
          </form>
        </div>
        <div class="col xs12 l6 push-l2">
          <accordion class="footer-menu__accordion" has-desktop-columns>
            <template #default="{ handleClick, activeItems }">
              <accordion-item
                v-for="column in menuItems"
                :id="column.name"
                :key="column.name"
                class="footer-menu__accordion-item"
                :label="column.name"
                :is-active="activeItems.includes(column.name)"
                @accordion-control-click="handleClick(column.name)"
              >
                <ul class="footer-menu__list">
                  <li
                    v-for="item in column.children.filter(
                      (menuItem) => !!menuItem.link
                    )"
                    :key="item.name"
                    class="footer-menu__list-item body-2"
                  >
                    <nuxt-link class="footer-menu__link" :to="item.link">
                      {{ item.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </accordion-item>
            </template>
          </accordion>
        </div>
      </div>
      <div class="footer-menu__logo">
        <img src="~/assets/images/carbon-neutral.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/Accordion'
import AccordionItem from '~/components/AccordionItem'
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton,
    Accordion,
    AccordionItem
  },

  props: {
    menuItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleSubmit() {
      // TODO: Implement newsletter subscription
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-menu {
  background-color: $COLOR_BACKGROUND_LIGHT;

  .container--main {
    padding-bottom: $LAYOUT_M;
    padding-top: $SPACING_3XL;
    position: relative;
  }

  &__newsletter {
    &-title {
      color: $COLOR_PRIMARY;
    }

    &-copy {
      color: $COLOR_TEXT_SECONDARY;
    }

    &-form {
      display: flex;
      flex-direction: column;
    }

    &-button {
      margin-top: $SPACING_M;
      text-transform: uppercase;
    }
  }

  &__list {
    @include list-reset;

    li {
      margin-bottom: $SPACING_S;
    }
  }

  &__link {
    color: $COLOR_TEXT_SECONDARY;
    text-decoration: none;

    &:hover {
      color: $COLOR_TEXT_PRIMARY;
    }
  }

  &__accordion {
    margin-top: $SPACING_XL;

    &-item {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }

    /* stylelint-disable-next-line */
    &::v-deep .accordion-item__label {
      margin-bottom: 0;
    }
  }

  &__logo {
    background-color: $COLOR_BACKGROUND_LIGHT;
    border-radius: 50%;
    bottom: -30px;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    width: 100px;
  }

  @include mq($from: large) {
    &__newsletter {
      &-form {
        flex-direction: row;
      }

      &-button {
        flex-shrink: 0;
        margin-top: 0;
        min-height: 0;
        padding: 0 $SPACING_M;
      }
    }

    &__accordion {
      display: flex;
      justify-content: space-between;
      margin-top: 0;

      &-item {
        border-bottom: 0;
      }
    }

    &__logo {
      height: 120px;
      left: $GUTTER_WIDTH * 3.5; // Match container padding
      margin: 0;
      width: 120px;
    }
  }
}
</style>
