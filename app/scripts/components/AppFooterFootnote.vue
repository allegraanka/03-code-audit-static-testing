<template functional>
  <div class="footnote">
    <div class="container container--footnote">
      <div class="footnote__social">
        <component
          :is="item"
          v-for="item in ['twitter', 'facebook', 'pinterest', 'instagram']"
          :key="item"
        />
      </div>

      <div class="footnote__body">
        <span class="caption">{{ props.copyrightNotice }}</span>
        <ul class="footnote__policies">
          <li
            v-for="item in props.policies.filter((policy) => !!policy.link)"
            :key="item.name"
            class="caption footnote__policy"
          >
            <nuxt-link :to="item.link">
              {{ item.name }}
            </nuxt-link>
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
import Twitter from '@/assets/icons/social-twitter.svg?inline'
import Facebook from '@/assets/icons/social-facebook.svg?inline'
import Pinterest from '@/assets/icons/social-pinterest.svg?inline'
import Instagram from '@/assets/icons/social-instagram.svg?inline'
import Visa from '@/assets/icons/payment-visa.svg?inline'
import Mastercard from '@/assets/icons/payment-mastercard.svg?inline'
import Paypal from '@/assets/icons/payment-paypal.svg?inline'
import AmazonPay from '@/assets/icons/payment-amazon-pay.svg?inline'
import Amex from '@/assets/icons/payment-amex.svg?inline'

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
    copyrightNotice: {
      type: String,
      default: ''
    },
    policies: {
      type: [Array, null],
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.footnote {
  background-color: $COLOR_PRIMARY;
  color: $COLOR_TEXT_INVERSE;

  .container--footnote {
    padding-bottom: $SPACING_3XL;
    padding-top: $SPACING_3XL;
  }

  &__social {
    display: flex;
    justify-content: center;

    .icon {
      margin-right: $SPACING_L;
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
      margin: 0 $SPACING_S;
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

    &-method {
      align-items: center;
      background-color: $COLOR_BACKGROUND_WHITE;
      display: flex;
      height: 18px;
      justify-content: center;
      margin-left: $SPACING_S;
    }

    svg {
      height: 18px;
      width: auto;
    }
  }

  @include mq($from: large) {
    .container--footnote {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
    }

    &__social {
      align-items: center;
      justify-content: flex-start;
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
  }
}
</style>
