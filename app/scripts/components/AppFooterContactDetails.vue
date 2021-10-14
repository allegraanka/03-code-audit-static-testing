<template>
  <div class="contact-details">
    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-email />
        <div class="contact-details__text-wrapper">
          <div
            v-if="contactDetails && contactDetails.email"
            class="contact-details__text body-2"
          >
            <span
              v-if="contactDetails.email.title"
              class="contact-details__text--bold"
            >
              {{ contactDetails.email.title }}
            </span>
            {{ contactDetails.email.text }}
          </div>
        </div>
      </div>
    </div>

    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-phone />
        <div class="contact-details__text-wrapper">
          <div
            v-if="contactDetails && contactDetails.phone"
            class="contact-details__text body-2"
          >
            <span
              v-if="contactDetails.phone"
              class="contact-details__text--bold"
            >
              {{ contactDetails.phone.primaryPhoneTitle }}
            </span>
            {{ contactDetails.phone.primaryPhoneText }}
          </div>

          <div
            v-if="contactDetails && contactDetails.phone"
            class="contact-details__text body-2"
          >
            <span
              v-if="contactDetails.phone.secondaryPhoneTitle"
              class="contact-details__text--bold"
            >
              {{ contactDetails.phone.secondaryPhoneTitle }}
            </span>
            {{ contactDetails.phone.secondaryPhoneText }}
          </div>
        </div>
      </div>
    </div>

    <div class="contact-details__section">
      <div class="container container--contact-details">
        <icon-pin />
        <div class="contact-details__text-wrapper">
          <div
            v-if="contactDetails && contactDetails.addressFirstLine"
            class="contact-details__text body-2"
          >
            {{ contactDetails.addressFirstLine }}
          </div>
          <div
            v-if="contactDetails && contactDetails.addressSecondLine"
            class="contact-details__text body-2"
          >
            {{ contactDetails.addressSecondLine }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconEmail from '@/assets/icons/misc-email.svg?inline'
import IconPhone from '@/assets/icons/misc-phone.svg?inline'
import IconPin from '@/assets/icons/misc-pin.svg?inline'

export default {
  components: {
    IconEmail,
    IconPhone,
    IconPin
  },

  props: {
    contactDetails: {
      type: Object,
      default: () => {}
    }
  }
}
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

  @include mq($until: large) {
    &__text {
      font-size: ms(-1);
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
