<template functional>
  <div class="contact-details">
    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-email />
        <div class="contact-details__text-wrapper">
          <div class="contact-details__text body-2">
            Email: helpdesk@pavers.co.uk
          </div>
        </div>
      </div>
    </div>

    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-phone />
        <div class="contact-details__text-wrapper">
          <div class="contact-details__text body-2">
            <span class="contact-details__text--bold">Customer Services:</span>
            0344 844 0809
          </div>
          <div class="contact-details__text body-2">
            <span class="contact-details__text--bold">24 hr order line:</span>
            0844 844 0203
          </div>
        </div>
      </div>
    </div>

    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-pin />
        <div class="contact-details__text-wrapper">
          <div class="contact-details__text body-2">
            Catherine House, Northminster Business Park, York, YO26 6QU
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import IconEmail from '@/assets/icons/misc-email.svg?inline'
import IconPhone from '@/assets/icons/misc-phone.svg?inline'
import IconPin from '@/assets/icons/misc-pin.svg?inline'

Vue.component('IconEmail', IconEmail)
Vue.component('IconPhone', IconPhone)
Vue.component('IconPin', IconPin)

export default {}
</script>

<style lang="scss" scoped>
.contact-details {
  border-top: 1px solid $COLOR_BORDER_LIGHT;
  color: $COLOR_TEXT_PRIMARY;

  &__section {
    align-items: center;
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    display: flex;
    padding: $SPACING_L 0;
  }

  .container--contact-details {
    align-items: center;
    display: flex;
  }

  .icon {
    fill: $COLOR_PRIMARY;
    flex-shrink: 0;
    height: 32px;
    width: 32px;
  }

  &__text-wrapper {
    margin-left: $SPACING_S;
  }

  &__text {
    margin-bottom: $SPACING_3XS;

    &--bold {
      font-weight: 500;
    }
  }

  @include mq($from: large) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .container--contact-details {
      justify-content: center;
      max-width: 380px;
    }

    &__section {
      padding: $SPACING_2XL 0;

      &:not(:last-child) {
        border-right: 1px solid $COLOR_BORDER_LIGHT;
      }
    }
  }
}
</style>
