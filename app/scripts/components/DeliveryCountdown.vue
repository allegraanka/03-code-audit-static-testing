<template>
  <div class="delivery-countdown">
    <h6 v-if="title" class="delivery-countdown__title">{{ title }}</h6>

    <div v-if="timer && remaining" class="delivery-countdown__countdown">
      <span>
        <div class="delivery-countdown__part">
          <h3>{{ remaining.hours }}</h3>
          <h6>{{ $t('product.countdown.hours') }}</h6>
        </div>
      </span>

      <span>
        <div class="delivery-countdown__part">
          <h3>{{ remaining.minutes }}</h3>
          <h6>{{ $t('product.countdown.minutes') }}</h6>
        </div>
      </span>

      <span>
        <div class="delivery-countdown__part">
          <h3>{{ remaining.seconds }}</h3>
          <h6>{{ $t('product.countdown.seconds') }}</h6>
        </div>
      </span>
    </div>

    <rich-content
      v-if="body"
      class="delivery-countdown__body body-2"
      :content="body"
    />
  </div>
</template>

<script>
import RichContent from '~/components/RichContent'

export default {
  components: {
    RichContent
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    endDateTime: {
      type: Date,
      required: true
    },

    body: {
      type: [Array, String],
      default: ''
    }
  },

  data() {
    return {
      timer: null,
      remaining: null
    }
  },

  mounted() {
    this.setDefaults()
    this.constructCountdown()
  },

  methods: {
    /**
     * Sets the default state.
     */
    setDefaults() {
      const { total } = this.getTimeRemaining(this.endDateTime)

      if (total === 0 || Math.sign(total) === -1) {
        this.handleCountdownFinished()
      }
    },

    /**
     * Constructs the countdown timer.
     */
    constructCountdown() {
      this.timer = setInterval(() => {
        const remaining = this.getTimeRemaining(this.endDateTime)

        if (remaining.total <= 0) {
          this.handleCountdownFinished()
        }

        this.remaining = remaining
      }, 1000)
    },

    /**
     * Handles the finished state.
     */
    handleCountdownFinished() {
      this.$emit('finished')
    },

    /**
     * Returns the time remaining.
     *
     * @param {Date} end - The end date.
     * @returns {object} - The time remaining.
     */
    getTimeRemaining(end) {
      const total = Date.parse(end) - Date.parse(new Date())
      const seconds = Math.floor((total / 1000) % 60)
      const minutes = Math.floor((total / 1000 / 60) % 60)
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
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

  &__countdown {
    @include gap($SPACING_M);
    color: $COLOR_PRIMARY;
    display: flex;
    justify-content: center;
    margin: $SPACING_M 0 $SPACING_S 0;
  }

  &__part {
    @include gap(0.375rem);
    align-items: baseline;
    display: flex;
  }
}
</style>
