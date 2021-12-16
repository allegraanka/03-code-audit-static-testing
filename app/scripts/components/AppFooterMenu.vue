<template>
  <div class="footer-menu">
    <div class="container container--main">
      <div class="row">
        <div class="col xs12 l4">
          <h3
            v-if="
              content &&
              content.newsletterSignup &&
              content.newsletterSignup.heading
            "
            class="footer-menu__newsletter-title"
          >
            {{ content.newsletterSignup.heading }}
          </h3>

          <p
            v-if="
              content &&
              content.newsletterSignup &&
              content.newsletterSignup.text
            "
            class="footer-menu__newsletter-copy body-2"
          >
            {{ content.newsletterSignup.text }}
          </p>

          <form
            class="footer-menu__newsletter-form"
            @submit.prevent="handleSubmit"
          >
            <input
              type="email"
              :placeholder="$t('newsletter.placeholder')"
              required
            />

            <app-button class="footer-menu__newsletter-button">
              {{ $t('newsletter.signUp') }}
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
                icon="caret"
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
                    <app-link class="footer-menu__link" :to="item.link">
                      {{ item.name }}
                    </app-link>
                  </li>
                </ul>
              </accordion-item>
            </template>
          </accordion>
        </div>
      </div>

      <div
        v-if="content && content.logo && content.logo.asset"
        class="footer-menu__logo"
      >
        <responsive-image
          :src="content.logo.asset.url"
          :alt="content.logoAltText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/Accordion'
import AccordionItem from '~/components/AccordionItem'
import AppButton from '~/components/AppButton'
import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppLink,
    AppButton,
    Accordion,
    AccordionItem,
    ResponsiveImage
  },

  props: {
    content: {
      type: [Object, null],
      default: () => {}
    },

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
    padding-bottom: $SPACING_3XL + $SPACING_XL + $SPACING_3XS;
    padding-top: $SPACING_XL;
    position: relative;
  }

  &__newsletter-title {
    color: $COLOR_PRIMARY;
    margin-top: 0;
  }

  &__newsletter-copy {
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-1);
    margin-bottom: $SPACING_M;
  }

  &__newsletter-form {
    display: flex;
    flex-direction: column;
  }

  &__newsletter-button {
    margin-top: $SPACING_M;
    text-transform: uppercase;
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

    /* stylelint-disable-next-line */
    &::v-deep {
      .accordion-item__control {
        .icon {
          fill: $COLOR_PRIMARY;
        }
      }

      .accordion-item__label {
        font-size: ms(1);
        margin-bottom: 0;
      }
    }
  }

  &__accordion-item {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
  }

  &__logo {
    background-color: $COLOR_BACKGROUND_LIGHT;
    border-radius: 50%;
    bottom: -30px;
    height: 94px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    width: 94px;
  }

  @include mq($until: large) {
    &__accordion {
      position: relative;

      /* stylelint-disable-next-line */
      &::v-deep {
        .accordion-item__control {
          padding-top: $SPACING_M + $SPACING_2XS;
        }
      }

      &::before {
        background-color: $COLOR_BORDER_LIGHT;
        content: '';
        display: block;
        height: 1px;
        margin: 0 -#{$SPACING_M};
      }
    }

    &__accordion-item {
      &:first-of-type {
        // border-top: 1px solid $COLOR_BORDER_LIGHT;
        padding-top: $SPACING_S;
      }
    }
  }

  @include mq($from: large) {
    .container--main {
      padding-top: ($SPACING_XL * 2) + $SPACING_3XS;
    }

    &__newsletter-copy {
      margin-bottom: $SPACING_M + ($SPACING_3XS * 3);
    }

    &__newsletter-form {
      flex-direction: row;
    }

    &__newsletter-button {
      flex-shrink: 0;
      margin-top: 0;
      min-height: 0;
      padding: 0 $SPACING_M;
    }

    &__accordion {
      display: flex;
      justify-content: space-between;
      margin-top: 0;
    }

    &__accordion-item {
      border-bottom: 0;
    }

    &__logo {
      height: 108px;
      left: $GUTTER_WIDTH * 3.5; // Match container padding
      margin: 0;
      width: 108px;
    }
  }
}
</style>
