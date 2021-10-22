<template functional>
  <div class="footnote">
    <div class="container container--footnote">
      <div class="footnote__social">
        <a
          v-if="props.content.twitter"
          class="footnote__social-link"
          :href="props.content.twitter"
        >
          <twitter />
        </a>
        <a
          v-if="props.content.facebook"
          class="footnote__social-link"
          :href="props.content.facebook"
        >
          <facebook />
        </a>
        <a
          v-if="props.content.pinterest"
          class="footnote__social-link"
          :href="props.content.pinterest"
        >
          <pinterest />
        </a>
        <a
          v-if="props.content.instagram"
          class="footnote__social-link"
          :href="props.content.instagram"
        >
          <instagram />
        </a>
      </div>

      <div class="footnote__body">
        <span v-if="props.content.copyrightNotice" class="caption">
          {{ props.content.copyrightNotice }}
        </span>

        <ul v-if="props.content.linkList" class="footnote__policies">
          <li
            v-for="item in props.content.linkList.filter(
              (policy) => !!policy.link
            )"
            :key="item.name"
            class="caption"
          >
            <app-link :href="item.link">
              {{ item.name }}
            </app-link>
          </li>
        </ul>
      </div>

      <div class="footnote__payment">
        <div
          v-for="item in ['visa', 'mastercard', 'paypal', 'amazon-pay', 'amex']"
          :key="item"
          class="footnote__payment-method"
        >
          <component :is="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import AppLink from '~/components/AppLink'

import Twitter from '@/assets/icons/social-twitter.svg?inline'
import Facebook from '@/assets/icons/social-facebook.svg?inline'
import Pinterest from '@/assets/icons/social-pinterest.svg?inline'
import Instagram from '@/assets/icons/social-instagram.svg?inline'
import Visa from '@/assets/icons/payment-visa.svg?inline'
import Mastercard from '@/assets/icons/payment-mastercard.svg?inline'
import Paypal from '@/assets/icons/payment-paypal.svg?inline'
import AmazonPay from '@/assets/icons/payment-amazon-pay.svg?inline'
import Amex from '@/assets/icons/payment-amex.svg?inline'

Vue.component('AppLink', AppLink)
Vue.component('Twitter', Twitter)
Vue.component('Facebook', Facebook)
Vue.component('Pinterest', Pinterest)
Vue.component('Instagram', Instagram)
Vue.component('Visa', Visa)
Vue.component('Mastercard', Mastercard)
Vue.component('Paypal', Paypal)
Vue.component('AmazonPay', AmazonPay)
Vue.component('Amex', Amex)

export default {
  props: {
    content: {
      type: [Object, null],
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.footnote {
  background-color: $COLOR_PRIMARY;
  color: $COLOR_TEXT_INVERSE;

  .container--footnote {
    padding-bottom: $SPACING_L + $SPACING_2XS;
    padding-top: $SPACING_2XL + $SPACING_2XS;
  }

  &__social {
    display: flex;
    justify-content: center;

    .icon {
      margin: 0 ($SPACING_L + $SPACING_2XS);
    }
  }

  &__social-link {
    color: $COLOR_BACKGROUND_WHITE;
    text-decoration: none;

    &:hover {
      color: $COLOR_BACKGROUND_WHITE;
    }
  }

  &__body {
    margin-top: $SPACING_L;
    text-align: center;
  }

  &__policies {
    @include list-reset;
    margin-top: $SPACING_M;

    li {
      display: inline-block;
      margin: 0 $SPACING_XS $SPACING_2XS;
    }

    a {
      color: $COLOR_TEXT_INVERSE;
      text-decoration: none;

      &:hover {
        color: $COLOR_TEXT_INVERSE;
      }
    }
  }

  &__payment {
    display: flex;
    justify-content: center;
    margin-top: $SPACING_M;

    svg {
      height: inherit;
      width: auto;
    }
  }

  &__payment-method {
    align-items: center;
    background-color: $COLOR_BACKGROUND_WHITE;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-left: $SPACING_M;
  }

  @include mq($from: large) {
    .container--footnote {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      padding-bottom: $SPACING_2XL + $SPACING_3XS;
    }

    &__social {
      align-items: center;
      justify-content: flex-start;

      .icon {
        margin: 0 $SPACING_M 0 0;
      }
    }

    &__body {
      margin-top: 0;
    }

    &__policies {
      margin-top: $SPACING_S;
    }

    &__payment {
      align-items: center;
      justify-content: flex-end;
      margin-top: 0;
    }

    &__payment-method {
      height: 18px;
      margin-left: $SPACING_S;
    }
  }
}
</style>
