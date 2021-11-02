<template>
  <div
    class="delivery-countdown"
    :class="{ 'delivery-countdown--light': light }"
  >
    <h3 v-if="title" class="delivery-countdown__title h6">{{ title }}</h3>

    <div v-if="timer && remaining" class="delivery-countdown__countdown">
      <span>
        <div class="delivery-countdown__part">
          <h4 class="delivery-countdown__part-title h3">
            {{ remaining.hours }}
          </h4>

          <h5 class="delivery-countdown__part-label h6">
            {{ $t('product.countdown.hours') }}
          </h5>
        </div>
      </span>

      <span>
        <div class="delivery-countdown__part">
          <h4 class="delivery-countdown__part-title h3">
            {{ remaining.minutes }}
          </h4>

          <h5 class="delivery-countdown__part-label h6">
            {{ $t('product.countdown.minutes') }}
          </h5>
        </div>
      </span>

      <span>
        <div class="delivery-countdown__part">
          <h4 class="delivery-countdown__part-title h3">
            {{ remaining.seconds }}
          </h4>

          <h5 class="delivery-countdown__part-label h6">
            {{ $t('product.countdown.seconds') }}
          </h5>
        </div>
      </span>
    </div>

    <rich-content
      v-if="content"
      class="delivery-countdown__body body-2"
      :content="content"
    />
  </div>
</template>

<script>
import RichContent from '~/components/RichContent'

import { days, months, dateWithOrdinal, addDay } from '~/helpers/date'

export default {
  components: {
    RichContent
  },

  props: {
    light: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      timer: null,
      remaining: null,
      date: new Date()
    }
  },

  computed: {
    /**
     * Returns the title of the countdown.
     * @returns {string} - The title.
     */
    title() {
      return (
        this.$settings.cart &&
        this.$settings.cart.expressDeliveryCountdown &&
        this.$settings.cart.expressDeliveryCountdown.title
      )
    },

    /**
     * Returns the content for the countdown.
     * @returns {string} - The content.
     */
    content() {
      const content =
        this.$settings.cart &&
        this.$settings.cart.expressDeliveryCountdown &&
        this.$settings.cart.expressDeliveryCountdown.content

      if (!content || !content.includes('{date}')) {
        return content
      }

      const delivery = addDay(this.date)
      const day = delivery.getDay()
      const date = delivery.getDate()
      const month = delivery.getMonth()
      const formatted = `${days[day]} ${dateWithOrdinal(date)} ${months[month]}`

      return content.replace('{date}', `<strong>${formatted}</strong>`)
    },

    /**
     * Sets the delivery countdown date time.
     * @returns {Date} - The date time object.
     */
    dateTime() {
      const sundayFriday =
        this.$settings.cart &&
        this.$settings.cart.expressDeliveryCountdown &&
        this.$settings.cart.expressDeliveryCountdown.sundayThroughFriday

      const saturday =
        this.$settings.cart &&
        this.$settings.cart.expressDeliveryCountdown &&
        this.$settings.cart.expressDeliveryCountdown.saturday

      const day = this.date.getDay()
      const current = day === 6 ? saturday : sundayFriday

      return current ? this.getDate(current) : null
    }
  },

  mounted() {
    this.setDefaults()
    this.constructCountdown()
  },

  methods: {
    /**
     * Returns the date object for a given time, based on the current date.
     *
     * @param {string} time - The time.
     * @returns {Date} - The countdown date.
     */
    getDate(time) {
      const toSet = new Date(this.date)
      const hour = time.split(':')[0]
      const minute = time.split(':')[1]

      toSet.setHours(hour)
      toSet.setMinutes(minute)

      return toSet
    },

    /**
     * Sets the default state.
     */
    setDefaults() {
      const { total } = this.getTimeRemaining(this.dateTime)

      if (total === 0 || Math.sign(total) === -1) {
        this.handleCountdownFinished()
      }
    },

    /**
     * Constructs the countdown timer.
     */
    constructCountdown() {
      this.handleTimerInterval()
      this.timer = setInterval(this.handleTimerInterval, 1000)
    },

    /**
     * Handles the timer interval event.
     */
    handleTimerInterval() {
      const remaining = this.getTimeRemaining(this.dateTime)

      if (remaining.total <= 0) {
        this.handleCountdownFinished()
      }

      this.remaining = remaining
    },

    /**
     * Handles the finished state.
     */
    handleCountdownFinished() {
      const date = new Date(this.date)

      if (date) {
        date.setDate(date.getDate() + 1)
      }

      this.date = date
    },

    /**
     * Returns the time remaining.
     *
     * @param {Date} end - The end date.
     * @returns {object} - The time remaining.
     */
    getTimeRemaining(end) {
      const total = Date.parse(end) - Date.parse(new Date())
      const totalTime = Math.floor(total / 1000)
      const seconds = totalTime % 60
      const minutes = Math.floor(totalTime / 60) % 60
      const hours = Math.floor(totalTime / (60 * 60)) % 24
      const days = Math.floor(total / (1000 * 60 * 60 * 24))

      return {
        total,
        days,
        hours,
        minutes,
        seconds
      }
    }
  }
}
</script>

<style lang="scss">
.delivery-countdown {
  background-color: $COLOR_BACKGROUND_LIGHT;
  padding: $SPACING_L;
  text-align: center;

  &__body {
    color: $COLOR_TEXT_SECONDARY;
  }

  &__title,
  &__title.h6 {
    margin-top: 0;
  }

  &__countdown {
    @include gap($SPACING_M);
    color: $COLOR_PRIMARY;
    display: flex;
    justify-content: center;
    margin-bottom: $SPACING_S / 2;
  }

  &__part {
    @include gap(($SPACING_M * 0.375));
    align-items: baseline;
    display: flex;
  }

  &__part-title,
  &__part-title.h3 {
    margin-bottom: ($SPACING_M * 0.375) / 2;
  }

  &__part-label,
  &__part-label.h6 {
    margin-bottom: ($SPACING_M * 0.375) / 2;
    text-transform: none;
  }

  &#{&}--light {
    background-color: $COLOR_BACKGROUND_WHITE;
  }

  @include mq($from: large) {
    padding: $SPACING_XL;
  }
}
</style>
